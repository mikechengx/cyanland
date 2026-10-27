/* Offline behavioral checks for city-local calendars, daylight and controls. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
require('./environment.js');
require('./atmosphere.js');
const E = global.CyanEnvironment, A = global.CyanAtmosphere;
const cities = [
  { id:'qingdao',name:'青岛',lat:36.067,lon:120.383,timeZone:'Asia/Shanghai',utcOffset:8,sea:[.14,.56,.60] },
  { id:'goldcoast',name:'黄金海岸',lat:-28.0027,lon:153.431,timeZone:'Australia/Brisbane',utcOffset:10,sea:[.06,.58,.69],seaMix:.76 },
  { id:'jeju',name:'济州岛',lat:33.462,lon:126.307,timeZone:'Asia/Seoul',utcOffset:9,sea:[.02,.70,.65],seaMix:.80 },
  { id:'rinku',name:'临空城',lat:34.407,lon:135.290,timeZone:'Asia/Tokyo',utcOffset:9,sea:[.16,.53,.64],seaMix:.74 },
  { id:'joetsu',name:'上越',lat:37.184,lon:138.242,timeZone:'Asia/Tokyo',utcOffset:9,sea:[.035,.23,.43],seaMix:.84 }
];
const checks = [], samples = [];
const note = s => checks.push(s);
const roundLabel = (date,city) => E.formatDate(new Date(Math.round(+date/60000)*60000),city).time;
const fixed = new Date('2026-10-26T14:30:00Z');
assert.equal(E.formatDate(fixed).time,'22:30');
assert.equal(E.formatDate(fixed,null).time,'22:30');
assert.equal(E.formatDate(fixed,cities[0]).isoDate,'2026-10-26');
assert.equal(E.formatDate(fixed,cities[1]).isoDate,'2026-10-27');
assert.equal(E.formatDate(fixed,cities[1]).time,'00:30');
assert.equal(E.formatDate(fixed,cities[2]).time,'23:30');
const japanRollover=new Date('2026-10-26T15:30:00Z');
assert.equal(E.formatDate(japanRollover,cities[0]).isoDate,'2026-10-26');
assert.equal(E.formatDate(japanRollover,cities[3]).isoDate,'2026-10-27');
assert.notEqual(E.lunar(japanRollover,cities[0]),E.lunar(japanRollover,cities[3]));
for(const city of cities){
  for(const iso of ['2026-01-01','2026-06-21','2026-12-31']){
    const d=E.fromLocal(iso,6.5,city),p=E.formatDate(d,city);
    assert.equal(p.isoDate,iso);assert.equal(p.time,'06:30');
    assert.equal(p.utcOffset,city.utcOffset);assert.equal(p.timeZone,city.timeZone);
    assert.equal(p.timezone,`GMT+${String(city.utcOffset).padStart(2,'0')}:00`);
    assert.equal(+E.fromLocal(iso,24,city)-+E.fromLocal(iso,0,city),86400000);
  }
  const localDay=E.fromLocal('2026-10-27',12,city);
  assert.equal(E.lunar(localDay,city),E.lunar(E.fromLocal('2026-10-27',12,cities[0]),cities[0]));
}
assert(Number.isNaN(+E.fromLocal('2026-02-30',12,cities[2])));
assert(Number.isNaN(+E.fromLocal('bad',12,cities[2])));
note('UTC+8/9/10 midnight boundaries, Intl lunar local dates, validated local date/hour round trips');

for(const city of cities){
  for(const iso of ['2026-01-15','2026-06-21','2026-10-27','2026-12-21']){
    const d=E.fromLocal(iso,12,city),times=E.dayTimes(d,city);
    assert(times.sunriseDate<times.solarNoonDate&&times.solarNoonDate<times.sunsetDate);
    assert.equal(times.sunrise,roundLabel(times.sunriseDate,city));
    assert.equal(times.sunset,roundLabel(times.sunsetDate,city));
    assert.equal(times.timezone,E.formatDate(d,city).timezone);
    for(const event of [times.sunriseDate,times.sunsetDate]){
      assert.equal(E.formatDate(event,city).isoDate,iso);
      assert(Math.abs(E.solar(event,city.lat,city.lon).altitude+.833)<.02);
    }
    const tide=E.tide(d,city);
    assert.equal(tide.nextHigh,roundLabel(tide.nextHighDate,city));
    assert.equal(tide.nextLow,roundLabel(tide.nextLowDate,city));
    assert(tide.nextHighDate>d&&tide.nextLowDate>d);
    samples.push({city:city.id,date:iso,sunrise:times.sunrise,sunset:times.sunset,daylightHours:times.daylightHours,timezone:times.timezone});
  }
}
note('Five coasts × four dates: rise/set within local day, solar horizon consistency, local tide event labels');
const northSummer=E.sample(E.fromLocal('2026-06-21',12,cities[0]),cities[0]);
const southWinter=E.sample(E.fromLocal('2026-06-21',12,cities[1]),cities[1]);
const southSummer=E.sample(E.fromLocal('2026-12-21',12,cities[1]),cities[1]);
assert.equal(northSummer.season,'夏');assert.equal(southWinter.season,'冬');assert.equal(southSummer.season,'夏');
assert(southSummer.summer>southWinter.summer+.7);
assert(southWinter.tropical<.6&&southWinter.tropical>0);
const winterLength=E.dayTimes(E.fromLocal('2026-06-21',12,cities[1]),cities[1]).daylightHours;
const summerLength=E.dayTimes(E.fromLocal('2026-12-21',12,cities[1]),cities[1]).daylightHours;
assert(winterLength<11&&summerLength>13.5&&summerLength>winterLength+3);
note('Gold Coast southern-hemisphere seasons and daylight invert; tropical climate uses absolute latitude');
const jeju=E.sample(E.fromLocal('2026-06-21',12,cities[2]),cities[2]);
const joetsu=E.sample(E.fromLocal('2026-06-21',12,cities[4]),cities[4]);
assert(jeju.seaColor[1]>joetsu.seaColor[1]+.30);
assert(joetsu.seaColor[2]>joetsu.seaColor[1]+.10);
const jejuSky=A.sample(E.fromLocal('2026-06-21',12,cities[2]),cities[2],jeju);
const joetsuSky=A.sample(E.fromLocal('2026-06-21',12,cities[4]),cities[4],joetsu);
assert(jejuSky.ocean[1]>joetsuSky.ocean[1]+.12);
assert(jejuSky.seaTint[1]>joetsuSky.seaTint[1]+.15);
note('Jeju emerald and Joetsu deep blue remain distinct in both simulated water and atmospheric ocean');

async function appChecks(){
  const context={Date,Math,Number,String,Object,Array,Float32Array,Set,Map,Promise,
    devicePixelRatio:1,localStorage:{getItem:()=>null,setItem:()=>{}},
    setTimeout:()=>1,clearTimeout:()=>{},requestAnimationFrame:fn=>fn(),
    CITY_DEFS:cities,CyanEnvironment:E,CyanAtmosphere:{sample:A.sample,draw:()=>{},resize:()=>{}},
    C$:()=>null,Geo:{data:[],quad:()=>{}},cClamp:(x,a,b)=>Math.max(a,Math.min(b,x)),
    cMix:(a,b,t)=>a+(b-a)*t,cyanRenderer:null,
    buildCity:()=>({data:new Float32Array(),height:()=>-1,landmarks:[],stats:{}}),
    buildWater:()=>({surface:new Float32Array(),walls:[],rim:new Float32Array()})};
  context.window=context;
  const source=fs.readFileSync(path.join(__dirname,'app.js'),'utf8').replace(/bootCyanland\(\);\s*$/,'');
  vm.runInNewContext(source,context,{filename:'app.js'});
  const app=context.CyanApp,state=context.__cyanland.state;
  state.date=new Date(fixed);state.live=false;
  for(const city of cities){
    const before=+state.date;
    await app.setCity(city.id);
    assert.equal(+state.date,before,'switch city preserves the instant');
    app.setDate('2026-12-21');assert.equal(E.formatDate(state.date,city).isoDate,'2026-12-21');
    app.setHour(6.5);assert.equal(E.formatDate(state.date,city).time,'06:30');
    const beforeInvalid=+state.date;app.setDate('2026-02-30');assert.equal(+state.date,beforeInvalid);
    app.setMoment('sunrise');
    const rise=E.dayTimes(state.date,city).sunriseDate;
    assert.equal(+state.date-+rise,5*60000);
    app.setMoment('sunset');
    const set=E.dayTimes(state.date,city).sunsetDate;
    assert.equal(+set-+state.date,10*60000);
    assert.equal(state.live,false);assert.equal(state.playing,false);
  }
  note('App integration: city switches preserve instants; date/hour controls and sunrise/sunset presets use each city calendar');
}
appChecks().then(()=>{
  const result={pass:true,checks,samples,seaColors:{jeju:jeju.seaColor,joetsu:joetsu.seaColor}};
  fs.writeFileSync(path.join(__dirname,'international-time-test-results.json'),JSON.stringify(result,null,2));
  console.log(JSON.stringify({pass:true,checks,sampleCount:samples.length},null,2));
}).catch(e=>{console.error(e);process.exitCode=1;});
