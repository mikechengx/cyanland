/* Cyanland environment, entirely offline. Coordinate axes: east +X, up +Y,
   south +Z. All Date arguments are absolute UTC instants; calendar labels and
   rise/set times use the selected city's IANA time zone, regardless of browser.
   Missing city metadata retains China Standard Time (UTC+08:00).

   Solar equations: NOAA General Solar Position Calculations, fractional-year
   approximation, https://gml.noaa.gov/grad/solcalc/solareqns.PDF . Approximate
   geometric solar direction; local horizon, elevation and weather refraction
   are not surveyed. Rise/set use the standard 90.833 degree solar zenith.

   Tides are an illustrative harmonic model, NOT harbor forecasts or measured
   heights: lunar semidiurnal 12.4206 h + stylized diurnal 24 h, modulated over
   the mean synodic month. See NOAA Tides and Tidal Datums, chapter 3:
   https://tidesandcurrents.noaa.gov/publications/Understanding_Tides_by_Steacy_finalFINAL11_30.pdf
   City phases/amplitudes are artistic sand-table parameters, not gauge data.
   No network requests, external libraries or manually invented lunar dates.
*/
(function (global) {
  'use strict';
  const TAU = Math.PI * 2;
  const RAD = Math.PI / 180;
  const DEG = 180 / Math.PI;
  const HOUR = 3600000;
  const DAY = 24 * HOUR;
  const SYNODIC_HOURS = 29.530588853 * 24;
  const TIDE_EPOCH = Date.UTC(2000, 0, 6, 18, 14);
  const WM = TAU / 12.4206;
  const WD = TAU / 24;
  const WL = TAU / SYNODIC_HOURS;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const mod = (x, n) => ((x % n) + n) % n;
  const lerp = (a, b, t) => a + (b - a) * t;
  const mix = (a, b, t) => a.map((v, i) => lerp(v, b[i], t));
  const smooth = (a, b, value) => {
    const t = clamp((value - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };
  const pad = n => String(n).padStart(2, '0');
  const asDate = value => {
    const d = value instanceof Date ? value : new Date(value);
    if (!Number.isFinite(d.getTime())) throw new TypeError('Cyanland: invalid date');
    return d;
  };
  const zoneFormatters = new Map();
  function cityZone(city) {
    const raw = city ? Number(city.utcOffset) : NaN;
    return { timeZone: city && typeof city.timeZone === 'string' ? city.timeZone : 'Asia/Shanghai',
      utcOffset: Number.isFinite(raw) && Math.abs(raw) <= 14 ? raw : 8 };
  }
  function zoneLabel(offset) {
    const minutes = Math.round(Math.abs(offset) * 60);
    return `GMT${offset < 0 ? '-' : '+'}${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
  }
  function zoneFormatter(zone) {
    if (!zoneFormatters.has(zone)) {
      let formatter = null;
      try { formatter = new Intl.DateTimeFormat('en-GB-u-ca-gregory-nu-latn', {
        timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
      }); } catch (_) { /* Fixed-offset fallback also works offline without Intl. */ }
      zoneFormatters.set(zone, formatter);
    }
    return zoneFormatters.get(zone);
  }
  function localParts(date, city) {
    const dateValue = asDate(date), zone = cityZone(city), formatter = zoneFormatter(zone.timeZone);
    let p;
    if (formatter) {
      try {
        const values = Object.fromEntries(formatter.formatToParts(dateValue)
          .filter(v => v.type !== 'literal').map(v => [v.type, Number(v.value)]));
        p = { year: values.year, month: values.month, day: values.day,
          hour: values.hour % 24, minute: values.minute, second: values.second };
      } catch (_) { /* Fall back to the explicit offset rather than browser time. */ }
    }
    if (!p || !Object.values(p).every(Number.isFinite)) {
      const d = new Date(dateValue.getTime() + zone.utcOffset * HOUR);
      p = { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate(),
        hour: d.getUTCHours(), minute: d.getUTCMinutes(), second: d.getUTCSeconds() };
    }
    const stamp = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    const utcOffset = (stamp - Math.floor(dateValue.getTime() / 1000) * 1000) / HOUR;
    return { ...p, weekday: new Date(Date.UTC(p.year, p.month - 1, p.day)).getUTCDay(),
      utcOffset, timeZone: zone.timeZone, timezone: zoneLabel(utcOffset) };
  }
  function fromLocal(isoDate, hour = 0, city) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(isoDate)) || !Number.isFinite(Number(hour))) return new Date(NaN);
    const [year, month, day] = isoDate.split('-').map(Number);
    const calendar = new Date(Date.UTC(year, month - 1, day));
    if (calendar.getUTCFullYear() !== year || calendar.getUTCMonth() + 1 !== month || calendar.getUTCDate() !== day)
      return new Date(NaN);
    const nominal = +calendar + Number(hour) * HOUR;
    let instant = nominal - cityZone(city).utcOffset * HOUR;
    // Resolve the IANA offset at the requested instant; no browser-local Date parsing.
    // Selected coasts use fixed offsets; iteration also supports future DST cities.
    for (let i = 0; i < 4; i++) {
      const next = nominal - localParts(new Date(instant), city).utcOffset * HOUR;
      if (next === instant) break;
      instant = next;
    }
    return new Date(instant);
  }
  function cityCoordinates(city) {
    const lat = Number(city && (city.lat ?? city.latitude));
    const lon = Number(city && (city.lon ?? city.lng ?? city.longitude));
    return { lat: Number.isFinite(lat) ? clamp(lat, -89.9, 89.9) : 36.067,
      lon: Number.isFinite(lon) ? clamp(lon, -180, 180) : 120.383 };
  }
  function solarTerms(date) {
    const d = asDate(date), year = d.getUTCFullYear();
    const yearStart = Date.UTC(year, 0, 1);
    const days = (Date.UTC(year + 1, 0, 1) - yearStart) / DAY;
    // Continuous fractional day in UTC: no integer-day jumps while scrubbing.
    const gamma = TAU / days * ((d.getTime() - yearStart) / DAY - 0.5);
    const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(gamma)
      - 0.032077 * Math.sin(gamma) - 0.014615 * Math.cos(2 * gamma)
      - 0.040849 * Math.sin(2 * gamma));
    const decl = 0.006918 - 0.399912 * Math.cos(gamma)
      + 0.070257 * Math.sin(gamma) - 0.006758 * Math.cos(2 * gamma)
      + 0.000907 * Math.sin(2 * gamma) - 0.002697 * Math.cos(3 * gamma)
      + 0.00148 * Math.sin(3 * gamma);
    return { eq, decl };
  }
  function solar(date, latitude, longitude) {
    const d = asDate(date);
    const lat = clamp(Number.isFinite(+latitude) ? +latitude : 36.067, -89.9, 89.9) * RAD;
    const lon = Number.isFinite(+longitude) ? +longitude : 120.383;
    const { eq, decl } = solarTerms(d);
    const utcMinutes = d.getUTCHours() * 60 + d.getUTCMinutes()
      + d.getUTCSeconds() / 60 + d.getUTCMilliseconds() / 60000;
    const solarMinutes = mod(utcMinutes + eq + 4 * lon, 1440);
    const hourAngle = (solarMinutes / 4 - 180) * RAD;
    const altitudeRad = Math.asin(clamp(Math.sin(lat) * Math.sin(decl)
      + Math.cos(lat) * Math.cos(decl) * Math.cos(hourAngle), -1, 1));
    const azimuthRad = mod(Math.atan2(Math.sin(hourAngle),
      Math.cos(hourAngle) * Math.sin(lat) - Math.tan(decl) * Math.cos(lat)) + Math.PI, TAU);
    const altitude = altitudeRad * DEG;
    const azimuth = azimuthRad * DEG;
    const cosAlt = Math.cos(altitudeRad);
    return { altitude, azimuth,
      direction: [Math.sin(azimuthRad) * cosAlt, Math.sin(altitudeRad), -Math.cos(azimuthRad) * cosAlt],
      daylight: smooth(-8, 4, altitude),
      elevation: altitude, declination: decl * DEG, equationOfTime: eq,
      solarTime: solarMinutes / 60, hourAngle: hourAngle * DEG,
      isDay: altitude >= -0.833, model: 'NOAA太阳位置近似' };
  }
  const dayCache = new Map();
  function dayTimes(date, city) {
    const { year, month, day, timeZone, timezone } = localParts(date, city);
    const { lat, lon } = cityCoordinates(city);
    const key = `${year}-${month}-${day}:${lat}:${lon}:${timeZone}:${timezone}`;
    if (dayCache.has(key)) return { ...dayCache.get(key) };
    // NOAA event minutes are measured from UTC midnight of the city's calendar
    // date. Formatting each resulting instant in the city zone avoids a +8 bias.
    const midnight = Date.UTC(year, month - 1, day);
    let noon = 720 - 4 * lon;
    for (let i = 0; i < 3; i++) {
      const terms = solarTerms(new Date(midnight + noon * 60000));
      noon = 720 - 4 * lon - terms.eq;
    }
    const noonDate = new Date(midnight + noon * 60000);
    const decl = solarTerms(noonDate).decl;
    const cosHour = (Math.cos(90.833 * RAD) - Math.sin(lat * RAD) * Math.sin(decl))
      / (Math.cos(lat * RAD) * Math.cos(decl));
    let sunrise = null, sunset = null;
    if (cosHour >= -1 && cosHour <= 1) {
      const angle = Math.acos(cosHour) * DEG;
      sunrise = noon - angle * 4;
      sunset = noon + angle * 4;
      // Re-evaluate declination at each event instead of using noon all day.
      for (let i = 0; i < 2; i++) {
        const event = minute => {
          const terms = solarTerms(new Date(midnight + minute * 60000));
          const c = (Math.cos(90.833 * RAD) - Math.sin(lat * RAD) * Math.sin(terms.decl))
            / (Math.cos(lat * RAD) * Math.cos(terms.decl));
          return { eq: terms.eq, angle: Math.acos(clamp(c, -1, 1)) * DEG };
        };
        const rise = event(sunrise), set = event(sunset);
        sunrise = 720 - 4 * (lon + rise.angle) - rise.eq;
        sunset = 720 - 4 * (lon - set.angle) - set.eq;
      }
    }
    const label = minutes => minutes == null ? '—' : timeLabel(midnight + minutes * 60000, city);
    const result = { sunrise: label(sunrise), sunset: label(sunset), solarNoon: label(noon),
      sunriseDate: sunrise == null ? null : new Date(midnight + sunrise * 60000),
      sunsetDate: sunset == null ? null : new Date(midnight + sunset * 60000),
      solarNoonDate: noonDate,
      daylightHours: sunrise == null ? (cosHour < -1 ? 24 : 0) : (sunset - sunrise) / 60,
      polarDay: cosHour < -1, polarNight: cosHour > 1, timeZone, timezone };
    if (dayCache.size > 40) dayCache.clear();
    dayCache.set(key, result);
    return { ...result };
  }
  function cityPhase(city) {
    if (Number.isFinite(Number(city && city.tidePhase))) return Number(city.tidePhase);
    const name = String(city && (city.id || city.name) || 'qingdao');
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
    return (hash % 1000) / 1000 * TAU;
  }
  function tideParameters(city) {
    const rawAmplitude = Number(city && city.tideAmplitude);
    const amplitude = Number.isFinite(rawAmplitude) ? Math.max(0, rawAmplitude) : 0.38;
    const rawMix = Number(city && city.diurnalWeight);
    const diurnal = Number.isFinite(rawMix) ? clamp(rawMix, 0.05, 0.65) : 0.22;
    return { amplitude, phase: cityPhase(city), diurnal };
  }
  function tideWave(hours, parameters) {
    const { amplitude, phase, diurnal } = parameters;
    const lunarAngle = hours * WL;
    const cosLunar = Math.cos(lunarAngle);
    const envelope = 0.7 + 0.3 * cosLunar * cosLunar;
    const envelopePrime = -0.3 * WL * Math.sin(2 * lunarAngle);
    const mainAngle = hours * WM + phase;
    const dailyAngle = hours * WD + phase * 0.67 + 0.5;
    const wave = (1 - diurnal) * Math.cos(mainAngle) + diurnal * Math.cos(dailyAngle);
    const wavePrime = -(1 - diurnal) * WM * Math.sin(mainAngle) - diurnal * WD * Math.sin(dailyAngle);
    return { height: amplitude * envelope * wave,
      derivative: amplitude * (envelopePrime * wave + envelope * wavePrime),
      envelope, moonPhase: mod(hours / SYNODIC_HOURS, 1),
      phase0to1: mod(mainAngle / TAU, 1) };
  }
  const tideEventCache = new Map();
  function nextTideEvents(date, parameters, key) {
    const stamp = asDate(date).getTime();
    const prior = tideEventCache.get(key);
    if (prior && Math.abs(stamp - prior.stamp) < 60000
      && prior.high > stamp && prior.low > stamp) return prior;
    const startHours = (stamp - TIDE_EPOCH) / HOUR;
    let high = null, low = null;
    let left = startHours + 1 / 3600000;
    let leftSlope = tideWave(left, parameters).derivative;
    for (let step = 1; step <= 192 && (high == null || low == null); step++) {
      const right = startHours + step * 0.25;
      const rightSlope = tideWave(right, parameters).derivative;
      if ((leftSlope >= 0 && rightSlope < 0) || (leftSlope <= 0 && rightSlope > 0)) {
        let a = left, b = right;
        const isHigh = leftSlope >= 0;
        for (let i = 0; i < 24; i++) {
          const middle = (a + b) * 0.5;
          const positive = tideWave(middle, parameters).derivative >= 0;
          if (positive === isHigh) a = middle; else b = middle;
        }
        const event = TIDE_EPOCH + (a + b) * 0.5 * HOUR;
        if (isHigh && high == null) high = event;
        if (!isHigh && low == null) low = event;
      }
      left = right; leftSlope = rightSlope;
    }
    const result = { stamp, high, low };
    if (tideEventCache.size > 20) tideEventCache.clear();
    tideEventCache.set(key, result);
    return result;
  }
  const timeLabel = (stamp, city) => {
    if (stamp == null) return '—';
    const p = localParts(new Date(Math.round(stamp / 60000) * 60000), city);
    return `${pad(p.hour)}:${pad(p.minute)}`;
  };
  function tide(date, city) {
    const d = asDate(date), parameters = tideParameters(city);
    const hours = (d.getTime() - TIDE_EPOCH) / HOUR;
    const wave = tideWave(hours, parameters);
    const key = `${parameters.amplitude}:${parameters.phase}:${parameters.diurnal}`;
    const events = parameters.amplitude === 0 ? { high: null, low: null }
      : nextTideEvents(d, parameters, key);
    return { height: wave.height, phase0to1: wave.phase0to1,
      level01: parameters.amplitude > 0 ? clamp(wave.height / parameters.amplitude * 0.5 + 0.5, 0, 1) : 0.5,
      trend: parameters.amplitude === 0 ? '平潮' : (wave.derivative >= 0 ? '涨潮' : '落潮'),
      rate: wave.derivative, amplitude: parameters.amplitude,
      nextHigh: timeLabel(events.high, city), nextLow: timeLabel(events.low, city),
      nextHighDate: events.high == null ? null : new Date(events.high),
      nextLowDate: events.low == null ? null : new Date(events.low),
      moonPhase: wave.moonPhase, springFactor: wave.envelope,
      model: '周期模拟', isMeasured: false,
      timeZone: localParts(d, city).timeZone, timezone: localParts(d, city).timezone };
  }
  const WEATHER = Object.freeze({
    clear: { label: '晴', light: 1, ambient: 1, tint: [0.02, 0.55, 0.65], tintMix: 0, visibility: 1, clouds: 0.12, rain: 0 },
    cloudy: { label: '多云', light: 0.60, ambient: 0.95, tint: [0.22, 0.43, 0.48], tintMix: 0.30, visibility: 0.80, clouds: 0.74, rain: 0 },
    rain: { label: '小雨', light: 0.30, ambient: 0.82, tint: [0.18, 0.34, 0.37], tintMix: 0.50, visibility: 0.55, clouds: 0.95, rain: 1 },
    fog: { label: '薄雾', light: 0.40, ambient: 0.95, tint: [0.43, 0.57, 0.57], tintMix: 0.45, visibility: 0.38, clouds: 0.50, rain: 0 }
  });
  function sample(date, city, weather) {
    const d = asDate(date), coordinates = cityCoordinates(city);
    const sun = solar(d, coordinates.lat, coordinates.lon);
    const tideState = tide(d, city);
    const wKey = typeof weather === 'string' ? weather : weather && weather.type;
    const mode = Object.hasOwn(WEATHER, wKey) ? wKey : 'clear';
    const w = WEATHER[mode];
    const calendar = localParts(d, city), month = calendar.month;
    const southern = coordinates.lat < 0;
    const seasonMonth = southern ? mod(month - 1 + 6, 12) : month - 1;
    const season = ['冬', '冬', '春', '春', '春', '夏', '夏', '夏', '秋', '秋', '秋', '冬'][seasonMonth];
    // Climatic palette, not a temperature/current/bloom forecast.
    const yearProgress = (d.getTime() - Date.UTC(d.getUTCFullYear(), 0, 1)) / (365.2425 * DAY);
    const summer = 0.5 + 0.5 * Math.cos(TAU * (yearProgress - (southern ? 0.04 : 0.54)));
    const tropical = 1 - smooth(20, 34, Math.abs(coordinates.lat));
    const winterColor = mix([0.10, 0.40, 0.48], [0.035, 0.59, 0.59], tropical);
    const summerColor = mix([0.035, 0.55, 0.61], [0.01, 0.70, 0.66], tropical);
    let seaColor = mix(winterColor, summerColor, summer);
    const citySea = city && (city.seaColor || city.sea);
    if (Array.isArray(citySea) && citySea.length >= 3 && citySea.slice(0, 3).every(v => Number.isFinite(Number(v)))) {
      const weight = Number.isFinite(Number(city.seaMix)) ? clamp(Number(city.seaMix), 0, 1) : 0.32;
      seaColor = mix(seaColor, citySea.slice(0, 3).map(v => clamp(Number(v), 0, 1)), weight);
    }
    seaColor = mix(seaColor, w.tint, w.tintMix);
    const daylight = sun.daylight;
    seaColor = mix([0.018, 0.085, 0.15], seaColor, 0.20 + 0.80 * daylight);
    const warmth = 1 - smooth(1, 28, sun.altitude);
    const sunColor = mix([1, 0.95, 0.80], [1, 0.47, 0.23], warmth * 0.85);
    const direct = smooth(-1, 12, sun.altitude) * (0.45 + 0.55 * Math.max(0, sun.direction[1]));
    const ambient = lerp(0.17, 0.53, daylight) * w.ambient;
    return { sun, solar: sun, tide: tideState, sunColor,
      lightDirection: sun.direction.slice(), lightIntensity: direct * w.light * 1.4,
      ambient, ambientColor: mix([0.24, 0.31, 0.48], [0.77, 0.87, 0.89], daylight),
      seaColor, shallowColor: mix(seaColor, [0.39, 0.84, 0.78], 0.38 * daylight + 0.12),
      deepColor: mix(seaColor, [0.018, 0.18, 0.32], 0.54),
      skyColor: mix([0.035, 0.065, 0.13], mix([0.77, 0.87, 0.89], [0.64, 0.69, 0.70], w.clouds * 0.65), daylight),
      season, summer, tropical, hemisphere: southern ? 'south' : 'north', weather: mode, weatherLabel: w.label,
      visibility: w.visibility, cloudCover: w.clouds, rain: w.rain,
      isNight: sun.altitude < -6, goldenHour: sun.altitude > -4 && sun.altitude < 12,
      windVisual: ({ clear: 0.25, cloudy: 0.45, rain: 0.75, fog: 0.12 })[mode],
      model: '季节光照与周期潮汐模拟', timeZone: calendar.timeZone, timezone: calendar.timezone };
  }
  let chineseFormatter = null;
  try {
    const formatter = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', {
      timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric'
    });
    if (formatter.resolvedOptions().calendar === 'chinese') chineseFormatter = formatter;
  } catch (_) { /* Honest fallback on browsers without Chinese calendar support. */ }
  const lunarDay = number => {
    const digits = '一二三四五六七八九';
    if (number >= 1 && number <= 9) return `初${digits[number - 1]}`;
    if (number === 10) return '初十';
    if (number > 10 && number < 20) return `十${digits[number - 11]}`;
    if (number === 20) return '二十';
    if (number > 20 && number < 30) return `廿${digits[number - 21]}`;
    if (number === 30) return '三十';
    return String(number);
  };
  function lunar(date, city) {
    const instant = asDate(date);
    // Feed the city's civil date to the offline Chinese-calendar formatter.
    const d = new Date(+instant + localParts(instant, city).utcOffset * HOUR);
    if (!chineseFormatter) return '农历：此浏览器暂不支持';
    try {
      const parts = chineseFormatter.formatToParts(d);
      const find = type => (parts.find(part => part.type === type) || {}).value || '';
      const yearName = find('yearName');
      const relatedYear = find('relatedYear') || find('year');
      const month = find('month');
      const dayNumber = Number(find('day'));
      if (!month || !Number.isFinite(dayNumber)) return `农历 ${chineseFormatter.format(d)}`;
      return `农历 ${yearName || relatedYear}年 ${month}${lunarDay(dayNumber)}`;
    } catch (_) { return '农历：此浏览器暂不支持'; }
  }
  function formatDate(date, city) {
    const d = asDate(date), p = localParts(d, city);
    return { gregorian: `${p.year}年${p.month}月${p.day}日 星期${'日一二三四五六'[p.weekday]}`,
      lunar: lunar(d, city), time: `${pad(p.hour)}:${pad(p.minute)}`,
      timezone: p.timezone, timeZone: p.timeZone, utcOffset: p.utcOffset,
      isoDate: `${p.year}-${pad(p.month)}-${pad(p.day)}`,
      year: p.year, month: p.month, day: p.day, hour: p.hour,
      minute: p.minute, second: p.second };
  }
  global.CyanEnvironment = Object.freeze({ solar, tide, sample, lunar, formatDate, dayTimes,
    localParts, fromLocal, dateFromLocal: fromLocal });
})(typeof window !== 'undefined' ? window : globalThis);
