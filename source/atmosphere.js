/* Cyanland atmosphere. All sky, cloud, ocean and celestial pixels are generated
   locally. The Sun follows CyanEnvironment's dated solar solution. Moonlight is
   an artistic atmosphere direction, NOT an astronomical lunar ephemeris.

   API: init(stage); sample(date, city, environment, state) -> palette;
   draw(palette, elapsedSeconds, camera?); paintTo(ctx, width, height); resize().
   paintTo redraws the current environment at the target resolution for capture.
   The stage canvas is pointer-transparent and updates at no more than 24 FPS.
*/
(function (global) {
  'use strict';
  const TAU = Math.PI * 2, RAD = Math.PI / 180;
  const clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const mix = (a, b, t) => a.map((v, i) => lerp(v, b[i], t));
  const smooth = (a, b, value) => { const t = clamp((value - a) / (b - a)); return t * t * (3 - 2 * t); };
  const css = (c, a = 1) => `rgba(${c.map(v => Math.round(clamp(v) * 255)).join(',')},${clamp(a)})`;
  const hash = n => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
  const paletteMix = (a, b, t) => Object.fromEntries(Object.keys(a).map(key => [key, mix(a[key], b[key], t)]));
  const NIGHT = {
    skyTop: [0.025, 0.055, 0.13], skyMiddle: [0.08, 0.15, 0.25], horizon: [0.24, 0.30, 0.40],
    ocean: [0.055, 0.14, 0.23], seaTint: [0.13, 0.31, 0.43], sunTint: [0.67, 0.80, 1], ambientTint: [0.30, 0.43, 0.63]
  };
  const MORNING = {
    skyTop: [0.36, 0.48, 0.68], skyMiddle: [0.83, 0.62, 0.58], horizon: [1, 0.78, 0.47],
    ocean: [0.27, 0.47, 0.54], seaTint: [0.33, 0.67, 0.68], sunTint: [1, 0.66, 0.33], ambientTint: [0.91, 0.76, 0.62]
  };
  const EVENING = {
    skyTop: [0.25, 0.28, 0.49], skyMiddle: [0.72, 0.43, 0.58], horizon: [1, 0.67, 0.38],
    ocean: [0.30, 0.34, 0.49], seaTint: [0.39, 0.46, 0.62], sunTint: [1, 0.55, 0.29], ambientTint: [0.77, 0.55, 0.70]
  };
  const DAY = {
    skyTop: [0.40, 0.67, 0.81], skyMiddle: [0.67, 0.83, 0.88], horizon: [0.91, 0.92, 0.85],
    ocean: [0.29, 0.59, 0.65], seaTint: [0.24, 0.70, 0.73], sunTint: [1, 0.94, 0.76], ambientTint: [0.77, 0.90, 0.95]
  };
  let stage = null, canvas = null, ctx = null;
  let latest = null, latestTime = 0, lastDraw = -Infinity, lastKey = '', dirty = true;
  let width = 0, height = 0, observer = null;

  function sample(date, city, environment, state = {}) {
    const d = date instanceof Date ? date : new Date(date);
    const env = environment || global.CyanEnvironment.sample(d, city, state.weather);
    const sun = env.sun || env.solar;
    const altitude = Number.isFinite(sun.altitude) ? sun.altitude : sun.elevation;
    const azimuth = sun.azimuth;
    const times = global.CyanEnvironment ? global.CyanEnvironment.dayTimes(d, city) : null;
    // Solar noon is dated per city and season; this never assumes 06:00/18:00.
    const morning = times && times.solarNoonDate
      ? d.getTime() < new Date(times.solarNoonDate).getTime()
      : Math.sin(azimuth * RAD) >= 0;
    const daylight = smooth(-13, 1, altitude);
    const highDay = smooth(6, 30, altitude);
    const night = 1 - smooth(-12, -2, altitude);
    const warmth = smooth(-8, 0, altitude) * (1 - smooth(8, 28, altitude));
    let p = paletteMix(NIGHT, morning ? MORNING : EVENING, daylight);
    p = paletteMix(p, DAY, highDay);
    const clouds = clamp(env.cloudCover == null ? 0.12 : env.cloudCover);
    const weatherGray = env.weather === 'rain' ? 0.52 : env.weather === 'fog' ? 0.45 : clouds * 0.16;
    if (weatherGray) {
      const gray = mix([0.18, 0.24, 0.33], [0.68, 0.74, 0.75], 1 - night);
      for (const key of ['skyTop', 'skyMiddle', 'horizon', 'ocean']) p[key] = mix(p[key], gray, weatherGray);
    }
    const moonPhase = clamp(env.tide && Number.isFinite(env.tide.moonPhase) ? env.tide.moonPhase : 0.5);
    const illumination = (1 - Math.cos(moonPhase * TAU)) * 0.5;
    const moonStrength = night * (0.23 + illumination * 0.77) * (1 - clouds * 0.56);
    const glow = mix(mix([1, 0.93, 0.70], p.sunTint, warmth * 0.72), [0.64, 0.81, 1], night);
    p.seaTint = mix(p.seaTint, p.sunTint, warmth * (morning ? 0.23 : 0.16));
    // Preserve the coast's own water: Jeju emerald, Joetsu deep blue, etc.
    // Morning/evening reflections remain in the shared atmosphere palette.
    if (city && Number.isFinite(Number(city.seaMix)) && Array.isArray(env.seaColor)) {
      const regionWeight = 0.60 * (1 - warmth * 0.62) * (1 - night * 0.48);
      p.seaTint = mix(p.seaTint, env.seaColor, regionWeight);
      p.ocean = mix(p.ocean, env.seaColor, regionWeight * 0.76);
    }
    const moonAzimuth = (azimuth + 180) * RAD;
    const moonAltitude = 0.48 + 0.18 * illumination;
    const moonDirection = [Math.sin(moonAzimuth) * Math.cos(moonAltitude), Math.sin(moonAltitude), -Math.cos(moonAzimuth) * Math.cos(moonAltitude)];
    const disc = { x01: 0.5 - Math.sin(azimuth * RAD) * 0.27,
      y01: 0.43 - Math.sin(altitude * RAD) * 0.36, radius: 0.07,
      visible: altitude > -9 && altitude < 90, altitude };
    const moonDisc = { x01: clamp(0.5 + Math.sin(azimuth * RAD) * 0.25, 0.20, 0.80),
      y01: 0.16 + (1 - illumination) * 0.05, radius: 0.043, phase: moonPhase, illumination };
    const phase = altitude < -11 ? 'night' : altitude < -3 ? 'twilight' : altitude < 14 ? (morning ? 'dawn' : 'sunset') : 'day';
    const label = phase === 'night' ? '月色入海，星光渐深。' : phase === 'twilight'
      ? (morning ? '天光初醒，潮声仍轻。' : '晚霞将尽，海岸入蓝。')
      : phase === 'dawn' ? '晨光铺金，浅滩初醒。' : phase === 'sunset' ? '落日熔金，紫霞入海。' : '晴空照水，海风正好。';
    return { ...p, glow, reflectionTint: glow.slice(), phase, label, night, warmth, daylight, lightAltitude: altitude,
      sunAltitude: altitude, sunAzimuth: azimuth, lightIntensity: (env.lightIntensity || 0) + moonStrength * 0.24,
      moonDirection, moonStrength, moonPhase, moonIllumination: illumination, disc, moonDisc,
      morning, cloudCover: clouds, weather: env.weather || 'clear', rain: env.rain || 0,
      visibility: env.visibility == null ? 1 : env.visibility,
      horizon01: 0.43, atmosphere: state.atmosphere === 'studio' ? 'studio' : 'immersive',
      sunrise: times ? times.sunrise : '—', sunset: times ? times.sunset : '—',
      model: '太阳随日期时刻变化；月光方位为氛围示意',
      stamp: d.getTime(), cityId: city && (city.id || city.name) || '' };
  }

  function init(element) {
    if (!element || !element.prepend) return null;
    if (stage === element && canvas) return canvas;
    if (observer) observer.disconnect();
    if (canvas) canvas.remove();
    stage = element;
    canvas = document.createElement('canvas'); canvas.id = 'atmosphereCanvas';
    canvas.setAttribute('aria-hidden', 'true');
    Object.assign(canvas.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: '0' });
    ctx = canvas.getContext('2d', { alpha: false });
    stage.prepend(canvas);
    if (typeof ResizeObserver !== 'undefined') { observer = new ResizeObserver(resize); observer.observe(stage); }
    resize(); return canvas;
  }
  function resize() {
    if (!stage || !canvas) return;
    const box = stage.getBoundingClientRect();
    width = Math.max(1, box.width); height = Math.max(1, box.height);
    const dpr = Math.min(global.devicePixelRatio || 1, 1.3);
    const w = Math.round(width * dpr), h = Math.round(height * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; dirty = true; }
  }
  function radial(c, x, y, radius, color, alpha, inner = 0) {
    if (radius <= 0) return;
    const g = c.createRadialGradient(x, y, inner, x, y, radius);
    g.addColorStop(0, css(color, alpha)); g.addColorStop(0.32, css(color, alpha * 0.42)); g.addColorStop(1, css(color, 0));
    c.fillStyle = g; c.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
  function ellipse(c, x, y, rx, ry, color, alpha) {
    c.save(); c.translate(x, y); c.scale(1, ry / rx); radial(c, 0, 0, rx, color, alpha); c.restore();
  }

  function stars(c, w, horizon, p, t) {
    const alpha = p.night * (1 - p.cloudCover * 0.82);
    if (alpha < 0.015) return;
    for (let i = 0; i < 115; i++) {
      const x = hash(i + 5) * w, y = hash(i + 520) * horizon * 0.91;
      const r = (0.4 + hash(i + 900) * 1.05) * (w < 500 ? 0.86 : 1);
      const a = (0.36 + hash(i + 110) * 0.64) * alpha * (0.80 + 0.20 * Math.sin(t * 0.7 + i));
      c.fillStyle = css([0.89, 0.94, 1], a); c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
      if (i % 29 === 0) {
        c.strokeStyle = css([0.90, 0.95, 1], a * 0.38); c.lineWidth = 0.6;
        c.beginPath(); c.moveTo(x - 3.5, y); c.lineTo(x + 3.5, y); c.moveTo(x, y - 3.5); c.lineTo(x, y + 3.5); c.stroke();
      }
    }
    // A broad, quiet band rather than a photograph or a procedural star texture.
    c.save(); c.translate(w * 0.58, horizon * 0.41); c.rotate(-0.18);
    ellipse(c, 0, 0, w * 0.39, horizon * 0.19, [0.48, 0.59, 0.79], alpha * 0.055); c.restore();
  }

  function solarDisc(c, w, h, p) {
    const d = p.disc, horizon = h * p.horizon01, x = d.x01 * w, y = d.y01 * h;
    const r = clamp(w * d.radius, 33, 61);
    const visibility = smooth(-8, -0.6, p.sunAltitude) * (1 - p.cloudCover * 0.48);
    if (visibility < 0.01) return;
    c.save(); c.beginPath(); c.rect(0, 0, w, horizon); c.clip();
    radial(c, x, y, r * 4.8, p.sunTint, visibility * (0.23 + p.warmth * 0.22));
    radial(c, x, y, r * 2.0, [1, 0.88, 0.58], visibility * 0.29);
    const sunGradient = c.createLinearGradient(x, y - r, x, y + r);
    sunGradient.addColorStop(0, css([1, 0.98, 0.83], visibility));
    sunGradient.addColorStop(0.6, css(mix([1, 0.94, 0.72], p.sunTint, p.warmth * 0.8), visibility));
    sunGradient.addColorStop(1, css(mix([1, 0.86, 0.54], [1, 0.48, 0.25], p.warmth), visibility));
    c.fillStyle = sunGradient; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
    c.restore();
  }

  function lunarDisc(c, w, h, p) {
    if (p.night < 0.015) return;
    const d = p.moonDisc, x = d.x01 * w, y = d.y01 * h, r = clamp(w * d.radius, 25, 33);
    const visibility = p.night * (1 - p.cloudCover * 0.65);
    radial(c, x, y, r * 4.6, [0.64, 0.79, 1], visibility * (0.12 + d.illumination * 0.12));
    radial(c, x, y, r * 1.7, [0.81, 0.89, 1], visibility * 0.14);
    c.save(); c.globalAlpha = visibility;
    c.fillStyle = css([0.20, 0.28, 0.39], 0.84); c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
    const cosine = Math.cos(d.phase * TAU), waxing = Math.sin(d.phase * TAU) >= 0;
    const g = c.createLinearGradient(x - r, y - r, x + r, y + r);
    g.addColorStop(0, '#f7f1da'); g.addColorStop(0.5, '#e2e9e5'); g.addColorStop(1, '#becfdf'); c.fillStyle = g;
    c.beginPath();
    for (let py = -r; py < r; py += 0.75) {
      const extent = Math.sqrt(Math.max(0, r * r - py * py));
      const left = waxing ? cosine * extent : -extent;
      const right = waxing ? extent : -cosine * extent;
      if (right > left) c.rect(x + left, y + py, right - left + 0.3, 0.9);
    }
    c.clip(); c.fillRect(x - r, y - r, r * 2, r * 2);
    for (let i = 0; i < 13; i++) {
      const px = (hash(i + 80) - 0.5) * r * 1.5, py = (hash(i + 580) - 0.5) * r * 1.5;
      c.fillStyle = css([0.40, 0.49, 0.55], 0.07 + hash(i + 180) * 0.07);
      c.beginPath(); c.arc(x + px, y + py, r * (0.05 + hash(i + 20) * 0.10), 0, TAU); c.fill();
    }
    c.restore();
  }

  function clouds(c, w, h, p, t) {
    const horizon = h * p.horizon01;
    const cloudLit = mix([0.71, 0.83, 0.91], mix([1, 0.84, 0.64], [1, 0.65, 0.57], p.morning ? 0.14 : 0.65), p.warmth);
    const cloudColor = mix(cloudLit, [0.27, 0.37, 0.51], p.night * 0.83);
    const count = 7 + Math.round(p.cloudCover * 5);
    for (let i = 0; i < count; i++) {
      const wind = t * (0.7 + hash(i + 17) * 1.0);
      const x = ((hash(i + 390) * (w + 400) + wind) % (w + 400)) - 200;
      const y = horizon * (0.10 + hash(i + 950) * 0.78);
      const cw = w * (0.10 + hash(i + 840) * 0.13), ch = h * (0.010 + hash(i + 13) * 0.024);
      const alpha = (0.16 + p.cloudCover * 0.24) * (0.80 + hash(i + 23) * 0.2);
      ellipse(c, x, y, cw, ch, cloudColor, alpha);
      ellipse(c, x + cw * 0.27, y - ch * 0.16, cw * 0.74, ch * 0.7, cloudColor, alpha * 0.68);
      // The underside receives the peach edge of dawn and sunset.
      if (p.warmth > 0.1) ellipse(c, x - cw * 0.05, y + ch * 0.25, cw * 0.87, ch * 0.38, p.sunTint, alpha * p.warmth * 0.70);
    }
    // Thin horizon haze and a low cloud bank give the scene depth.
    ellipse(c, w * 0.49, horizon - h * 0.018, w * 0.68, h * 0.032, mix(p.horizon, [1, 0.9, 0.76], 0.25), (1 - p.night * 0.6) * 0.31);
  }

  function sea(c, w, h, p, t) {
    const horizon = h * p.horizon01;
    const g = c.createLinearGradient(0, horizon, 0, h);
    g.addColorStop(0, css(mix(p.horizon, p.ocean, 0.56)));
    g.addColorStop(0.16, css(mix(p.ocean, p.seaTint, 0.18)));
    g.addColorStop(0.70, css(p.ocean)); g.addColorStop(1, css(mix(p.ocean, p.seaTint, 0.10)));
    c.fillStyle = g; c.fillRect(0, horizon, w, h - horizon);
    const horizonLine = c.createLinearGradient(0, horizon - 1, 0, horizon + 4);
    horizonLine.addColorStop(0, css(p.horizon, 0.4)); horizonLine.addColorStop(1, css(p.horizon, 0));
    c.fillStyle = horizonLine; c.fillRect(0, horizon - 1, w, 5);
    // Distant, tiny headlands. These are atmospheric silhouettes, not city GIS.
    c.fillStyle = css(mix(p.skyMiddle, p.ocean, 0.55), 0.17);
    c.beginPath(); c.moveTo(w * 0.70, horizon + 1);
    c.bezierCurveTo(w * 0.77, horizon - h * 0.015, w * 0.77, horizon - h * 0.022, w * 0.83, horizon - h * 0.013);
    c.bezierCurveTo(w * 0.88, horizon - h * 0.032, w * 0.95, horizon - h * 0.014, w, horizon - h * 0.018);
    c.lineTo(w, horizon + 2); c.closePath(); c.fill();
    const useMoon = p.night > 0.5;
    const disc = useMoon ? p.moonDisc : p.disc;
    const reflectionColor = useMoon ? [0.71, 0.85, 1] : mix([1, 0.92, 0.67], p.sunTint, 0.50);
    const reflectionStrength = useMoon ? p.moonStrength * 0.65 : smooth(-5, 3, p.sunAltitude) * (1 - p.cloudCover * 0.6) * (0.21 + p.warmth * 0.52);
    const rx = w * disc.x01;
    c.save(); c.beginPath(); c.rect(0, horizon, w, h - horizon); c.clip();
    // Reflected light is a soft volume, never a hard-edged triangular beam.
    ellipse(c, rx, horizon + (h - horizon) * 0.31, w * 0.115, (h - horizon) * 0.75,
      reflectionColor, reflectionStrength * 0.18);
    ellipse(c, rx, horizon + 3, w * 0.075, h * 0.022, reflectionColor, reflectionStrength * 0.24);
    for (let i = 0; i < 105; i++) {
      const depth = (i + 0.5) / 105, y = horizon + Math.pow(depth, 1.52) * (h - horizon);
      const shimmer = 0.55 + 0.45 * Math.sin(t * (0.9 + hash(i + 4)) + i * 4.3);
      const half = w * (0.008 + depth * 0.12) * (0.48 + hash(i + 81) * 0.52);
      const x = rx + Math.sin(i * 13.4 + t * 0.45) * w * depth * 0.017;
      c.strokeStyle = css(reflectionColor, reflectionStrength * shimmer * (1 - depth * 0.58));
      c.lineWidth = 0.55 + depth * 1.4;
      c.beginPath(); c.moveTo(x - half, y);
      c.quadraticCurveTo(x - half * 0.1, y + Math.sin(i + t) * 0.7, x + half * (0.18 + hash(i + 61) * 0.70), y); c.stroke();
      if (i % 3 !== 0) {
        c.beginPath(); c.moveTo(x + half * 0.80, y + 0.9);
        c.lineTo(x + half * (0.96 + hash(i + 44) * 0.6), y + 0.5); c.stroke();
      }
    }
    for (let i = 0; i < 145; i++) {
      const depth = hash(i + 440), y = horizon + Math.pow(depth, 1.5) * (h - horizon);
      const x = hash(i + 540) * w + Math.sin(t * 0.30 + i) * 5;
      const len = (8 + hash(i + 780) * 43) * (0.15 + depth);
      c.strokeStyle = css(mix(p.horizon, p.seaTint, 0.55), (0.055 + depth * 0.06) * (1 - p.night * 0.35));
      c.lineWidth = 0.5 + depth * 0.5; c.beginPath(); c.moveTo(x - len, y);
      c.quadraticCurveTo(x, y + Math.sin(t * 0.5 + i) * 0.6, x + len, y); c.stroke();
    }
    c.restore();
  }

  function render(c, w, h, p, t) {
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, w, h);
    // Work in CSS pixels so the Sun/Moon retain their intended apparent size on
    // retina phones, the DPR-capped live canvas, and full-resolution exports.
    const density = width > 0 ? w / width : 1;
    c.scale(density, density); w /= density; h /= density;
    if (p.atmosphere === 'studio') {
      c.fillStyle = css(mix([238 / 255, 238 / 255, 231 / 255], [16 / 255, 27 / 255, 43 / 255], p.night)); c.fillRect(0, 0, w, h);
      const disc = p.night > 0.5 ? p.moonDisc : p.disc;
      const color = p.night > 0.5 ? [0.59, 0.74, 0.93] : p.sunTint;
      radial(c, w * disc.x01, h * 0.28, Math.min(w, h) * 0.48, color, p.night > 0.5 ? 0.30 : 0.34);
      c.restore(); return;
    }
    const horizon = h * p.horizon01;
    const sky = c.createLinearGradient(0, 0, 0, horizon);
    sky.addColorStop(0, css(p.skyTop)); sky.addColorStop(0.57, css(p.skyMiddle)); sky.addColorStop(1, css(p.horizon));
    c.fillStyle = sky; c.fillRect(0, 0, w, h);
    stars(c, w, horizon, p, t);
    solarDisc(c, w, h, p); lunarDisc(c, w, h, p);
    clouds(c, w, h, p, t); sea(c, w, h, p, t);
    if (p.weather === 'fog') {
      const fog = c.createLinearGradient(0, h * 0.22, 0, h * 0.85);
      fog.addColorStop(0, css(p.horizon, 0)); fog.addColorStop(0.38, css(p.horizon, 0.35)); fog.addColorStop(1, css(p.horizon, 0));
      c.fillStyle = fog; c.fillRect(0, 0, w, h);
    }
    // Delicate edge darkening keeps the island foreground legible in every phase.
    const vignette = c.createRadialGradient(w * 0.50, h * 0.43, w * 0.18, w * 0.50, h * 0.46, Math.max(w, h) * 0.82);
    vignette.addColorStop(0, 'rgba(12,31,45,0)'); vignette.addColorStop(1, `rgba(12,31,45,${0.055 + p.night * 0.10})`);
    c.fillStyle = vignette; c.fillRect(0, 0, w, h); c.restore();
  }

  function draw(snapshot, time = 0) {
    latest = snapshot || latest; latestTime = Number.isFinite(time) ? time : latestTime;
    if (!latest || !canvas || !ctx) return false;
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const key = `${latest.atmosphere}:${latest.cityId}:${latest.phase}:${latest.weather}:${Math.round(latest.stamp / 10000)}`;
    if (!dirty && now - lastDraw < 1000 / 24) return false;
    // Date scrubbing settles on the next atmosphere frame (at most 42 ms).
    lastKey = key; lastDraw = now; dirty = false;
    render(ctx, canvas.width, canvas.height, latest, latestTime); return true;
  }
  function paintTo(target, targetWidth, targetHeight) {
    if (!latest || !target) return false;
    render(target, Math.max(1, targetWidth), Math.max(1, targetHeight), latest, latestTime); return true;
  }
  global.CyanAtmosphere = Object.freeze({ init, sample, draw, paintTo, resize });
})(typeof window !== 'undefined' ? window : globalThis);
