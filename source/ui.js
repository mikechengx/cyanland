(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
  let cities = [], last = {}, currentCity = null, panelOpen = false, toastTimer = 0, restoreFocus = null, catalogRegion = 'all', catalogQuery = '';
  const shortNames={goldcoast:'黄金海岸',jeju:'济州岛',rinku:'临空城',joetsu:'上越'};
  const countries={china:'中国',japan:'日本',korea:'韩国',australia:'澳洲'};
  const regionOf=c=>c.region||({goldcoast:'australia',jeju:'korea',rinku:'japan',joetsu:'japan'}[c.id]||'china');
  const countryOf=c=>c.country||countries[regionOf(c)]||'中国';
  const zoneNames={'Asia/Shanghai':'中国标准时间','Asia/Seoul':'韩国标准时间','Asia/Tokyo':'日本标准时间','Australia/Brisbane':'昆士兰时间'};
  const coordinate=(v,axis)=>`${Math.abs(Number(v)).toFixed(2)}° ${axis==='lat'?(v<0?'S':'N'):(v<0?'W':'E')}`;
  const officialSources={
    goldcoast:[['黄金海岸 · 冲浪者天堂','https://experiencegoldcoast.com/places-to-go/central-gold-coast/things-to-do/surfers-paradise-beach-au0062244']],
    jeju:[['济州旅游公社 · 挟才海岸','https://visitjeju.net/en/detail/view?contentsid=CONT_000000000500697&menuId=DOM_700000000010773']],
    rinku:[['临空公园 · 大理石海滩','https://rinku.osaka-park.or.jp/18387'],['泉佐野市 · 临空公园','https://visitizumisanojpn.com/en/rinku-park-2/']],
    joetsu:[['上越观光 · 谷浜海岸','https://joetsukankonavi.jp/spot/detail.php?id=58'],['海岸铁路 · 日本海翡翠线','https://www.echigo-tokimeki.co.jp/guide/hisui-line/']]
  };
  function filterCatalog(){
    let count=0;const query=catalogQuery.trim().toLocaleLowerCase();
    cities.forEach(city=>{const alias=city.id==='rinku'?'泉佐野 泉左野 临空城 大理石 白色海滩 rinku marble izumisano':city.id==='jeju'?'济州 济洲 翡翠 果冻海 hyeopjae':city.id==='goldcoast'?'澳洲 澳大利亚 黄金海岸 黄金海滩 冲浪者天堂 surfers paradise':city.id==='joetsu'?'上越 谷浜 日本海 深蓝 joetsu tanihama':'';const haystack=[city.name,city.en,countryOf(city),city.subtitle,alias,...(city.features||[]),...([city.name,countryOf(city),city.subtitle,...(city.features||[])].map(value=>window.CyanI18n?.english(value||'')||value))].join(' ').toLocaleLowerCase();const show=(catalogRegion==='all'||regionOf(city)===catalogRegion)&&(!query||haystack.includes(query));const button=$('cityCards').querySelector(`[data-city="${city.id}"]`);if(button)button.hidden=!show;if(show)count++;});
    $('coastResults').textContent=count?`${count} 座海岸 · ${catalogRegion==='all'?'随光漫游':countries[catalogRegion]}`:'没有找到这座海岸，试试城市名或国家。';
    $('regionFilters').querySelectorAll('button').forEach(b=>setPressed(b,b.dataset.region===catalogRegion));
  }
  const phaseNames = { day: '晴光入水', dawn: '金色晨光', sunrise: '日出时分', sunset: '紫红落日', twilight: '蓝调时刻', bluehour: '蓝调时刻', night: '月光海岸' };
  const weatherNames = { clear: '晴朗', cloudy: '多云', rain: '细雨', fog: '薄雾' };
  const cityEcology = {
    dalian: '丘陵与崖岸沿海面起伏。海草在岩底生长，低潮时露出的岸缘，留着风和浪反复刻下的线条。',
    qingdao: '花岗岩礁石铺开成岩滩，潮水进出石隙。海草、藻丛与潮间带小生物，在剖开的清水里缓缓显现。',
    xiamen: '海湾围住细沙与近岸小岛。湾内的水色比外海温柔，潮间带草丛与沙纹随光线一起改变。',
    beihai: '平缓白沙滩向浅海延伸，潮退后，宽阔浅滩才露出细腻的脉络。海草与小型底栖生物藏在沙床之间。',
    sanya: '热带岛屿被清澈浅海环抱。棕榈与珊瑚、海草与游鱼，从岸上的暖绿过渡到水下的青蓝。'
  };
  function call(method, ...args) {
    const fn = window.CyanApp?.[method];
    if (typeof fn !== 'function') return;
    try {
      const result = fn(...args);
      if (result?.catch) result.catch((error) => toast(error?.message || '这一步暂时没有完成，请再试一次。'));
      return result;
    } catch (error) { toast(error?.message || '这一步暂时没有完成，请再试一次。'); }
  }
  function toast(message) {
    const node = $('toast'); node.textContent = message; node.classList.add('visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => node.classList.remove('visible'), 3000);
  }
  function setPressed(node, pressed) { if (node) node.setAttribute('aria-pressed', String(Boolean(pressed))); }
  function setPanel(open, focus = false) {
    panelOpen = Boolean(open); document.body.dataset.panel = String(panelOpen);
    $('sceneDrawer').inert = !panelOpen; $('mobileAdjust').setAttribute('aria-expanded', String(panelOpen));
    $('adjustOpen').setAttribute('aria-expanded', String(panelOpen));
    if (panelOpen && document.body.dataset.explore === 'true') { call('setExplore', false); document.body.dataset.explore = 'false'; }
    if (!panelOpen && $('sceneDrawer').contains(document.activeElement)) { document.activeElement.blur(); $('mobileAdjust').focus({ preventScroll: true }); }
    if (focus && panelOpen) setTimeout(() => $('adjustClose').focus({ preventScroll: true }), 30);
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    setTimeout(() => window.dispatchEvent(new Event('resize')), 360);
  }
  function toggleExplore() {
    const explore = document.body.dataset.explore !== 'true'; setPanel(false); call('setExplore', explore);
    document.body.dataset.explore = String(explore);
    toast(explore ? '自由探索 · 拖动环绕，滑水拨浪，双指缩放' : '已返回海岸手记');
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
  }
  function openAbout() {
    restoreFocus = document.activeElement;
    const dialog = $('aboutDialog'); if (!dialog.open) dialog.showModal();
  }
  function closeAbout() { $('aboutDialog').close(); restoreFocus?.focus?.({ preventScroll: true }); }
  function localFields(date, city = currentCity) {
    const local=window.CyanEnvironment?.localParts?.(date,city);if(local)return {iso:`${local.year}-${String(local.month).padStart(2,'0')}-${String(local.day).padStart(2,'0')}`,hour:local.hour,minute:local.minute,time:`${String(local.hour).padStart(2,'0')}:${String(local.minute).padStart(2,'0')}:${String(local.second).padStart(2,'0')}`};
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: city?.timeZone || 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).formatToParts(date);
    const part = (type) => parts.find(p => p.type === type)?.value || '00';
    return { iso: `${part('year')}-${part('month')}-${part('day')}`, hour: Number(part('hour')), minute: Number(part('minute')), time: `${part('hour')}:${part('minute')}:${part('second')}` };
  }
  function dateFormat(date, city = currentCity) {
    let output;
    try { output = window.CyanEnvironment?.formatDate?.(date, city); } catch (_) {}
    const fallback = localFields(date);
    if (window.CyanI18n?.lang === 'en') {
      const timeZone=city?.timeZone || 'Asia/Shanghai';
      let lunar='Lunar date unavailable';
      try { lunar='Lunar · '+new Intl.DateTimeFormat('en-u-ca-chinese',{timeZone,year:'numeric',month:'long',day:'numeric'}).format(date); } catch (_) {}
      return {...output,gregorian:new Intl.DateTimeFormat('en-GB',{timeZone,year:'numeric',month:'short',day:'numeric',weekday:'short'}).format(date),lunar,time:output?.time||fallback.time};
    }
    if (!output?.gregorian) output = { ...output, gregorian: new Intl.DateTimeFormat('zh-CN', { timeZone: city?.timeZone || 'Asia/Shanghai', year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }).format(date) };
    if (!output?.lunar) {
      try { output.lunar = '农历 ' + new Intl.DateTimeFormat('zh-CN-u-ca-chinese', { timeZone: city?.timeZone || 'Asia/Shanghai', year: 'numeric', month: 'long', day: 'numeric' }).format(date); }
      catch (_) { output.lunar = '农历日期暂不可用'; }
    }
    output.time ||= fallback.time; return output;
  }
  function dayTimes(date, city) {
    try { return window.CyanEnvironment?.dayTimes?.(date, city) || {}; } catch (_) { return {}; }
  }
  function timeText(value) {
    if (value instanceof Date) return localFields(value).time.slice(0, 5);
    if (typeof value === 'number') { if (value > 100000) return localFields(new Date(value)).time.slice(0, 5); const total = ((Math.round(value * 60) % 1440) + 1440) % 1440; return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`; }
    return typeof value === 'string' ? value : '—';
  }
  function timeHours(value, fallback) {
    if (value instanceof Date) { const f = localFields(value); return f.hour + f.minute / 60; }
    if (typeof value === 'number') return value;
    if (typeof value === 'string') { const m = value.match(/(\d{1,2}):(\d{2})/); if (m) return Number(m[1]) + Number(m[2]) / 60; }
    return fallback;
  }
  function selectCity(city) {
    if (!city) return; currentCity = city;
    const selectedCard=$('cityCards').querySelector(`[data-city="${city.id}"]`);if(selectedCard?.hidden){catalogRegion=regionOf(city);catalogQuery='';$('coastSearch').value='';filterCatalog();}
    const i = Math.max(0, cities.findIndex(c => c.id === city.id));
    $('coastEyebrow').textContent = `COAST NO. ${String(i + 1).padStart(2, '0')} / ${(city.en || city.id).toUpperCase()}`;
    const poem = Array.isArray(city.poem) ? city.poem : ['一方海岸，', '晴光入水。'];
    $('coastTitle').replaceChildren(); poem.forEach((line, j) => { if (j) $('coastTitle').append(document.createElement('br')); $('coastTitle').append(document.createTextNode(line)); });
    $('coastPoem').textContent = city.subtitle || '山脊映着日光，浅湾收藏细碎的浪。';
    $('coastSummary').textContent = city.description || '在海与陆的边缘，观察光、潮汐与一座海岸的呼吸。';
    $('cityName').textContent = city.name; $('cityEnglish').textContent = (city.en || city.id).toUpperCase();
    $('coordinates').textContent = `${countryOf(city)} · ${coordinate(city.lat,'lat')} · ${coordinate(city.lon,'lon')}`;
    $('mobileCityName').textContent = shortNames[city.id] || city.name;
    $('sceneNumber').textContent = `${String(i + 1).padStart(2, '0')} / ${String(cities.length).padStart(2, '0')}`;
    document.querySelectorAll('[data-city]').forEach(node => setPressed(node, node.dataset.city === city.id));
    $('aboutEyebrow').textContent = `A COASTAL FIELD NOTE / ${String(i + 1).padStart(2, '0')}`;
    $('aboutTitle').textContent = `${city.name} · 海岸手记`;
    $('aboutDescription').textContent = city.description || city.subtitle || '';
    $('aboutFeatures').replaceChildren(); (city.features || []).forEach(feature => { const span = document.createElement('span'); span.textContent = feature; $('aboutFeatures').append(span); });
    $('aboutLocation').textContent = `${coordinate(city.lat,'lat')} / ${coordinate(city.lon,'lon')}`;
    $('aboutEcology').textContent = city.ecology || cityEcology[city.id] || '观察水下随波摆动的海草、礁石与沙纹，让一座海岸慢慢进入视线。';
    $('aboutLocalNote').textContent = city.localNote || ''; $('aboutLocalNote').hidden = !city.localNote;
    $('aboutSources').replaceChildren();(officialSources[city.id]||[]).forEach(([label,url])=>{const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label+' ↗';$('aboutSources').append(a);});
    requestAnimationFrame(()=>{const active=$('cityNav').querySelector(`[data-city="${city.id}"]`);if(active){const ribbon=$('cityNav');ribbon.scrollTo({left:active.offsetLeft-ribbon.offsetLeft-ribbon.clientWidth/2+active.clientWidth/2,behavior:'smooth'});}});
  }
    
  function buildCities(defs) {
    cities = Array.isArray(defs) ? defs : Object.values(defs || {});
    ['cityNav', 'cityCards'].forEach(id => {
      const container = $(id); container.replaceChildren();
      cities.forEach(city => {
        const button = document.createElement('button'); button.dataset.city = city.id; button.setAttribute('aria-pressed', 'false');
        if (id === 'cityCards') { button.className = 'city-card'; const strong = document.createElement('strong'), small = document.createElement('small'); strong.textContent = city.name; small.textContent = countryOf(city)+' · '+(city.subtitle || (city.features || []).slice(0, 2).join(' · ') || city.en); button.append(strong, small); }
        else button.textContent = shortNames[city.id] || city.name;
        button.addEventListener('click', () => { call('setCity', city.id); selectCity(city); if (id === 'cityCards' && matchMedia('(max-width:700px)').matches) setPanel(false); });
        container.append(button);
      });
    });
    $('regionFilters').replaceChildren();for(const [id,label] of [['all','全部'],...Object.entries(countries)]){const count=cities.filter(c=>id==='all'||regionOf(c)===id).length;if(!count)continue;const b=document.createElement('button');b.type='button';b.dataset.region=id;b.textContent=label+' '+count;b.addEventListener('click',()=>{catalogRegion=id;filterCatalog();});$('regionFilters').append(b);}
    filterCatalog();const initial = cities.find(c => c.id === currentCity?.id) || cities.find(c => c.id === 'qingdao') || cities[0]; if (initial) selectCity(initial);
  }
  function updateInteraction(mode) {
    const water = mode === 'water';
    document.body.dataset.interaction = water ? 'water' : 'orbit';
    setPressed($('interactionOrbit'), !water); setPressed($('interactionWater'), water); setPressed($('waterInteract'), water);
    $('waterInteract').setAttribute('aria-label', water ? '当前为拨浪模式，点击切换环绕' : '切换拨浪模式');
    $('waterInteract').title = water ? '拨浪中 · 点击返回环绕' : '拨浪 · 滑动海水画出涟漪';
    $('waterInteract').querySelector('span').textContent = water ? '环绕' : '拨浪';
  }
  function selectInteraction(mode, announce = false) {
    updateInteraction(mode); call('setInteraction', mode);
    if (announce) toast(mode === 'water' ? '拨浪模式 · 滑动海面画出涟漪；双指缩放，长按平移。' : '已回到环绕模式 · 滑过海面也能拨动水波。');
  }
  function activeIs(id) { return document.activeElement === $(id); }
  function update(state = {}) {
    last = { ...last, ...state }; const s = last;
    let city = s.city; if (typeof city === 'string') city = cities.find(c => c.id === city);
    if (city && currentCity?.id !== city.id) selectCity(city);
    const date = s.date instanceof Date ? s.date : new Date(s.date || Date.now());
    const safeDate = Number.isNaN(date.valueOf()) ? new Date() : date;
    const env = s.environment || {}, sun = env.sun || {}, tide = env.tide || {}, fields = localFields(safeDate, city || currentCity), display = dateFormat(safeDate, city || currentCity), times = dayTimes(safeDate, city || currentCity);
    const selected=city||currentCity;const zone=selected?.timeZone||'Asia/Shanghai';$('timezoneLabel').textContent=`${display.timezone||'GMT+08:00'} · ${zoneNames[zone]||'当地时间'}`;
    $('gregorianDate').textContent = display.gregorian; $('lunarDate').textContent = window.CyanI18n?.lang === 'en' ? display.lunar : (/^农历/.test(display.lunar) ? display.lunar : `农历 ${display.lunar}`); $('localTime').textContent = display.time; $('localTime').dateTime = safeDate.toISOString();
    if (!activeIs('sceneDate')) $('sceneDate').value = fields.iso;
    if (!activeIs('sceneHour')) $('sceneHour').value = String(fields.hour + fields.minute / 60);
    if (!activeIs('sceneHour')) $('hourOutput').textContent = `${String(fields.hour).padStart(2, '0')}:${String(fields.minute).padStart(2, '0')}`;
    const live = s.live !== false; setPressed($('modeLive'), live); setPressed($('modeDemo'), !live);
    const playing = Boolean(s.playing); setPressed($('timePlay'), playing); $('timePlay').setAttribute('aria-label', playing ? '暂停时间' : '播放时间'); $('timePlay').innerHTML = icon(playing ? 'pause' : 'play');
    if (!activeIs('timeSpeed') && s.speed != null) $('timeSpeed').value = String(s.speed);
    $('sceneMode').textContent = live ? '此刻海岸 · 与时间同行' : (playing ? '时光流转 · 一日海岸' : '此刻停留 · 海岸漫游');
    setPressed($('dayCycle'), playing && Number(s.speed) === 1440);
    $('dayCycle').innerHTML = `${icon(playing && Number(s.speed) === 1440 ? 'pause' : 'play')}<span>${playing && Number(s.speed) === 1440 ? '暂停流转' : '流转一天'}</span>`;
    $('timeModeNote').textContent = live ? `按${shortNames[selected?.id]||selected?.name||'海岸'}当地时间同步；${Number(selected?.lat)<0?'南半球，季节与北半球相反。':'天光随日期与纬度变化。'}` : `演示当地时间 · ${display.timezone||'GMT+08:00'} · 调整日期与时刻。`;
    const season = env.season || ''; $('seasonLabel').textContent = season ? `${season}季` : '';
    $('sunMetric').innerHTML = `${Number.isFinite(sun.altitude) ? sun.altitude.toFixed(1) : '—'}<small>°</small>`;
    const tideLevel = Math.max(0, Math.min(100, Math.round((tide.level01 ?? tide.phase0to1 ?? tide.phase ?? 0) * 100)));
    $('tideMetric').textContent = tide.trend ? `${tide.trend} · ${tideLevel}%` : '周期模拟';
    $('tideProgress').setAttribute('aria-valuenow', String(tideLevel));
    $('tideProgressFill').style.width = `${tideLevel}%`;
    const weather = s.weather || env.weather || 'clear'; $('weatherMetric').textContent = `${season || '—'} · ${weatherNames[weather] || weather}`;
    document.querySelectorAll('[data-weather]').forEach(button => setPressed(button, button.dataset.weather === weather));
    $('compactWeather').textContent = `${season || '—'} · ${weatherNames[weather] || weather}`;
    const atmospheric = s.atmospheric || {}, phase = atmospheric.phase || (sun.altitude < -8 ? 'night' : sun.altitude < 12 ? (fields.hour < 12 ? 'dawn' : 'sunset') : 'day');
    document.body.dataset.phase = phase === 'twilight' ? 'bluehour' : phase === 'dawn' ? 'sunrise' : phase;
    document.documentElement.style.setProperty('--night', String(Number(atmospheric.night) || 0));
    $('phaseLabel').textContent = phaseNames[phase] || '晴光入水';
    $('phaseCorner').textContent = atmospheric.label || '让光与潮汐，慢慢流过。';
    if (s.atmosphere) { document.body.dataset.atmosphere = s.atmosphere; setPressed($('atmosphereImmersive'), s.atmosphere === 'immersive'); setPressed($('atmosphereStudio'), s.atmosphere === 'studio'); }
    document.querySelectorAll('[data-moment]').forEach(button => setPressed(button, (button.dataset.moment === 'night' && phase === 'night') || (button.dataset.moment === 'sunset' && phase === 'sunset') || (button.dataset.moment === 'sunrise' && ['dawn', 'sunrise'].includes(phase))));
    if (s.jelly != null && !activeIs('jellyAmount')) { $('jellyAmount').value = s.jelly; $('jellyOutput').textContent = `${Math.round(s.jelly * 100)}%`; }
    if (s.wave != null && !activeIs('waveAmount')) { $('waveAmount').value = s.wave; $('waveOutput').textContent = `${Math.round(s.wave * 100)}%`; }
    if (s.cutaway != null) $('cutawayToggle').checked = s.cutaway;
    if (s.annotations != null) $('annotationToggle').checked = s.annotations;
    if (Number.isFinite(s.annotationOpacity)) {
      if (!activeIs('annotationOpacity')) $('annotationOpacity').value = s.annotationOpacity;
      $('annotationOpacityOutput').textContent = `${Math.round(s.annotationOpacity * 100)}%`;
      document.documentElement.style.setProperty('--annotation-opacity', String(s.annotationOpacity));
    }
    if (Number.isFinite(s.waterOpacity)) {
      if (!activeIs('waterOpacity')) $('waterOpacity').value = s.waterOpacity;
      $('waterOpacityOutput').textContent = `${Math.round((1 - s.waterOpacity) * 100)}%`;
    }
    if (Number.isFinite(s.sunStrength)) {
      if (!activeIs('sunStrength')) $('sunStrength').value = s.sunStrength;
      $('sunStrengthOutput').textContent = `${Math.round(s.sunStrength * 100)}%`;
    }
    if (s.interaction != null) updateInteraction(s.interaction);

    if (s.explore != null) document.body.dataset.explore = String(s.explore);
    if (s.fps != null) $('fpsLabel').textContent = `${Math.max(0, Math.round(s.fps))} FPS`;
    if (s.renderer) $('rendererLabel').textContent = `${String(s.renderer).toUpperCase()} · PROCEDURAL WORLD`;
    if (s.loading != null) $('sceneLoading').hidden = !s.loading;
    const rise = timeHours(times.sunrise, 6), set = timeHours(times.sunset, 18), hour = fields.hour + fields.minute / 60;
    const progress = Math.max(0, Math.min(1, (hour - rise) / Math.max(1, set - rise))), theta = Math.PI * (1 - progress), x = 86 + 72 * Math.cos(theta), y = 65 - 39.5 * Math.sin(theta);
    ['sunPoint', 'sunGlowPoint'].forEach(id => { $(id).setAttribute('cx', x.toFixed(2)); $(id).setAttribute('cy', y.toFixed(2)); });
    $('sunPoint').style.opacity = sun.altitude != null && sun.altitude < -6 ? '.35' : '1'; $('sunGlowPoint').style.opacity = sun.altitude != null && sun.altitude < 0 ? '0' : '1';
    const tidePhase = Number(tide.phase0to1 ?? tide.phase ?? 0), tx = 14 + tidePhase * 144, ty = 65 - Math.sin(tidePhase * Math.PI * 4) * 3.5;
    $('tidePoint').setAttribute('cx', tx.toFixed(2)); $('tidePoint').setAttribute('cy', ty.toFixed(2));
    $('sunriseLabel').textContent = timeText(times.sunrise); $('sunsetLabel').textContent = timeText(times.sunset);
    $('sunriseTime').textContent = timeText(times.sunrise); $('sunsetTime').textContent = timeText(times.sunset);
    $('arcTitle').textContent = `太阳高度 ${Number(sun.altitude || 0).toFixed(1)} 度；${tide.trend || '潮汐模拟'}；日出 ${timeText(times.sunrise)}，日落 ${timeText(times.sunset)}`;
    $('arcCaption').textContent = sun.altitude != null && sun.altitude < 0 ? 'NIGHT & TIDE' : 'LIGHT & TIDE';
    $('aboutSeason').textContent = `${season || '—'}季 · ${weatherNames[weather] || weather}`;
    $('aboutSun').textContent = `${timeText(times.sunrise)} / ${timeText(times.sunset)}`;
    $('aboutTide').textContent = `${tide.trend || '周期模拟'}${Number.isFinite(tide.height) ? ` · ${tide.height >= 0 ? '+' : ''}${tide.height.toFixed(2)} 沙盘单位` : ''}`;
  }
  function setError(message, detail) {
    $('sceneLoading').hidden = true; $('sceneError').hidden = !message;
    if (message) $('sceneErrorText').textContent = message;
    if (detail) $('sceneErrorDetail').textContent = detail;
  }
  function syncViewport() {
    const viewport = window.visualViewport;
    document.documentElement.style.setProperty('--app-height', `${Math.round(viewport?.height || innerHeight)}px`);
    document.documentElement.style.setProperty('--viewport-top', `${Math.round(viewport?.offsetTop || 0)}px`);
    requestAnimationFrame(() => {
      const field = document.activeElement;
      if (!field || !/^(INPUT|SELECT|TEXTAREA)$/.test(field.tagName)) return;
      const box = field.getBoundingClientRect(), drawerBox = $('sceneDrawer').getBoundingClientRect(), headerBox = $('sceneDrawer').querySelector('.drawer-header').getBoundingClientRect();
      if ($('sceneDrawer').contains(field)) { const top = headerBox.bottom + 9, bottom = drawerBox.bottom - 12; if (box.bottom > bottom) $('sceneDrawer').scrollTop += box.bottom - bottom; else if (box.top < top) $('sceneDrawer').scrollTop -= top - box.top; }
    });
  }
  $('coastSearch').addEventListener('input',event=>{catalogQuery=event.target.value;filterCatalog();});
  $('adjustOpen').addEventListener('click', () => setPanel(!panelOpen));
  $('mobileAdjust').addEventListener('click', () => setPanel(!panelOpen));
  $('mobileCity').addEventListener('click', () => { setPanel(true); $('sceneDrawer').scrollTop = 0; });
  $('adjustClose').addEventListener('click', () => setPanel(false));
  ['exploreOpen', 'mobileExplore', 'exploreExit'].forEach(id => $(id).addEventListener('click', toggleExplore));
  ['aboutOpen', 'drawerAbout'].forEach(id => $(id).addEventListener('click', openAbout));
  $('aboutClose').addEventListener('click', closeAbout);
  $('aboutDialog').addEventListener('click', event => { const box = $('aboutDialog').getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeAbout(); });
  $('modeLive').addEventListener('click', () => call('setLive', true));
  $('modeDemo').addEventListener('click', () => { call('setLive', false); toast('时间已停留；拖动时刻滑块，或播放一天。'); });
  $('sceneDate').addEventListener('change', event => { if (!event.target.value || !event.target.validity.valid) return; call('setLive', false); call('setDate', event.target.value); });
  $('sceneHour').addEventListener('input', event => { const hour = Number(event.target.value), total = Math.min(1439, Math.round(hour * 60)); $('hourOutput').textContent = `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`; call('setLive', false); call('setHour', hour); });
  $('atmosphereImmersive').addEventListener('click', () => call('setAtmosphere', 'immersive'));
  $('atmosphereStudio').addEventListener('click', () => call('setAtmosphere', 'studio'));
  document.querySelectorAll('[data-moment]').forEach(button => button.addEventListener('click', () => { call('setMoment', button.dataset.moment); setPanel(false); }));
  $('dayCycle').addEventListener('click', () => { const pause = Boolean(last.playing) && Number(last.speed) === 1440; call('setLive', false); if (!pause) call('setSpeed', 1440); call('setPlaying', !pause); if (!pause) toast('让一天缓缓流转 · 再点一次即可停留'); });
  $('timePlay').addEventListener('click', () => { call('setLive', false); call('setPlaying', !last.playing); });
  $('timeSpeed').addEventListener('change', event => { call('setLive', false); call('setSpeed', Number(event.target.value)); });
  document.querySelectorAll('[data-weather]').forEach(button => button.addEventListener('click', () => call('setWeather', button.dataset.weather)));
  $('jellyAmount').addEventListener('input', event => { const value = Number(event.target.value); $('jellyOutput').textContent = `${Math.round(value * 100)}%`; call('setJelly', value); });
  $('waveAmount').addEventListener('input', event => { const value = Number(event.target.value); $('waveOutput').textContent = `${Math.round(value * 100)}%`; call('setWave', value); });
  $('cutawayToggle').addEventListener('change', event => call('setCutaway', event.target.checked));
  $('annotationToggle').addEventListener('change', event => call('setAnnotations', event.target.checked));
  $('annotationOpacity').addEventListener('input', event => {
    const value = Number(event.target.value); $('annotationOpacityOutput').textContent = `${Math.round(value * 100)}%`;
    document.documentElement.style.setProperty('--annotation-opacity', String(value)); call('setAnnotationOpacity', value);
  });
  $('waterOpacity').addEventListener('input', event => {
    const value = Number(event.target.value); $('waterOpacityOutput').textContent = `${Math.round((1 - value) * 100)}%`; call('setWaterOpacity', value);
  });
  $('sunStrength').addEventListener('input', event => {
    const value = Number(event.target.value); $('sunStrengthOutput').textContent = `${Math.round(value * 100)}%`; call('setSunStrength', value);
  });
  $('interactionOrbit').addEventListener('click', () => selectInteraction('orbit'));
  $('interactionWater').addEventListener('click', () => selectInteraction('water'));
  $('waterInteract').addEventListener('click', () => selectInteraction(document.body.dataset.interaction === 'water' ? 'orbit' : 'water', true));

  ['resetScene', 'drawerReset'].forEach(id => $(id).addEventListener('click', () => { call('resetView'); toast('视角已归位'); }));
  ['squishScene', 'drawerSquish'].forEach(id => $(id).addEventListener('click', () => call('squish')));
  $('saveImage').addEventListener('click', () => { call('screenshot'); });
  $('fullscreenScene').addEventListener('click', async () => { try { if (document.fullscreenElement) await document.exitFullscreen(); else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen(); else { if (document.body.dataset.explore !== 'true') toggleExplore(); toast('已进入自由探索 · 本浏览器未提供网页全屏'); } } catch (_) { toast('浏览器暂未允许全屏，可以使用自由探索。'); } });
  $('sceneRetry').addEventListener('click', () => location.reload());
  document.querySelector('.wordmark').addEventListener('click', event => { event.preventDefault(); setPanel(false); if (document.body.dataset.explore === 'true') toggleExplore(); call('resetView'); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('aboutDialog').open) { if (panelOpen) setPanel(false); else if (document.body.dataset.explore === 'true') toggleExplore(); } });
  window.addEventListener('resize', syncViewport); window.visualViewport?.addEventListener('resize', syncViewport); window.visualViewport?.addEventListener('scroll', syncViewport); document.addEventListener('focusin', () => setTimeout(syncViewport, 80));
  syncViewport();
  window.CyanUI = { init: buildCities, update, toast, setPanel, setError };
  window.addEventListener('cyanlanguagechange',()=>{buildCities(cities);update(last);window.CyanI18n?.refresh();window.dispatchEvent(new Event('resize'));});
})();
