/* Cyanland • procedural coastal specimens. All meshes are generated locally.
   Geographic names identify artistic studies; these are not surveyed terrain. */
const CITY_DEFS = [
  {id:'qingdao',name:'青岛',en:'QINGDAO',lat:36.067,lon:120.383,subtitle:'礁石海岸 · 黄海',poem:['风过礁岸，','海色漫长。'],description:'花岗岩的灰、红瓦的暖，与黄海的蓝在一方切片中相遇。沿着礁岸转一圈，看浪花擦亮石缝，潮水慢慢收起浅滩。',features:['花岗岩礁岸','红瓦海边小屋','松林与灯塔','潮间带岩池'],seed:173,sea:[0.095,0.55,0.62],tideAmplitude:0.29,habitat:'岩礁 · 松林',climate:'温带季风',terrainLabel:'岩滩与起伏海岬'},
  {id:'dalian',name:'大连',en:'DALIAN',lat:38.914,lon:121.614,subtitle:'丘陵崖岸 · 黄渤海',poem:['山脊向海，','松风有声。'],description:'起伏山脊伸入海中，灰白崖壁托起一片墨绿松林。海岬的转折处，航标安静站立；深蓝近海与浅色岩层一同显露。',features:['高差丘陵','切削海崖','海岬松林','山脊步道'],seed:397,sea:[0.075,0.43,0.55],tideAmplitude:0.24,habitat:'海崖 · 针叶林',climate:'温带季风',terrainLabel:'高山脊与陡峭崖壁'},
  {id:'xiamen',name:'厦门',en:'XIAMEN',lat:24.479,lon:118.089,subtitle:'弯湾双岛 · 台湾海峡',poem:['湾藏小岛，','潮送远帆。'],description:'一弯细沙抱住温柔海湾，两座小岛隔水相望。榕树与海边小屋之间，木栈道通向码头；浅湾把流动的天光留得更久。',features:['弧形沙湾','双岛水道','滨海阔叶林','木栈桥与帆船'],seed:827,sea:[0.075,0.64,0.66],tideAmplitude:0.31,habitat:'沙湾 · 岛屿',climate:'亚热带海洋',terrainLabel:'弯曲海湾与离岸双岛'},
  {id:'beihai',name:'北海',en:'BEIHAI',lat:21.481,lon:109.119,subtitle:'银沙浅滩 · 北部湾',poem:['银沙铺岸，','浅浪生光。'],description:'宽阔的浅滩铺开柔白沙纹，岸线很低，天空很远。潮退时，沙洲从浅青色海水中慢慢浮现，细碎贝壳和沙丘草留下温柔的尺度。',features:['宽阔白沙滩','低缓沙丘','浅海沙洲','贝壳与滨海草'],seed:1201,sea:[0.13,0.69,0.70],tideAmplitude:0.18,habitat:'沙滩 · 浅潮滩',climate:'亚热带海洋',terrainLabel:'低缓白沙与宽广浅滩'},
  {id:'sanya',name:'三亚',en:'SANYA',lat:18.252,lon:109.512,subtitle:'热带珊瑚湾 · 南海',poem:['椰影入海，','珊瑚藏光。'],description:'热带山丘披着深绿，椰影在白沙上轻轻摆动。清澈浅海保留珊瑚与鱼群的颜色，让一整片流动的蓝，像果冻般被阳光托起。',features:['热带双岛','椰林白沙','彩色珊瑚礁','透明浅海鱼群'],seed:2221,sea:[0.025,0.73,0.70],tideAmplitude:0.21,habitat:'珊瑚 · 椰林',climate:'热带海洋',terrainLabel:'热带高岛与珊瑚浅礁'},
  {id:'goldcoast',name:'黄金海岸',en:'GOLD COAST',country:'澳大利亚',countryCode:'AU',region:'australia',timeZone:'Australia/Brisbane',utcOffset:10,lat:-28.0027,lon:153.4298,subtitle:'冲浪金沙 · 珊瑚海',poem:['长浪吻岸，','金砂映城。'],description:'一线金沙展开在珊瑚海与城市之间。低沙丘留住滨海草与露兜树的影子，冲浪板、救生塔和高楼在绵长浪线上各占一角。南半球的季节，随着当地日光缓缓变化。',features:['绵长金色沙滩','沙丘与冲浪浪线','背岸高楼天际线','微型救生塔'],seed:3191,sea:[.06,.58,.69],seaMix:.76,tideAmplitude:.23,habitat:'金沙 · 沙丘植被',climate:'亚热带海洋',terrainLabel:'长直金沙岸与低沙丘'},
  {id:'jeju',name:'济州岛',en:'JEJU · HYEOPJAE',country:'韩国',countryCode:'KR',region:'korea',timeZone:'Asia/Seoul',utcOffset:9,lat:33.394,lon:126.239,subtitle:'挟才翡翠湾 · 济州海峡',poem:['黑岩抱玉，','白沙听潮。'],description:'挟才的浅海呈现清透翡翠色，白沙从黑色玄武岩之间伸入水中。彼岸的飞扬岛是一枚圆润的火山剪影，低石墙与村屋安静地留在风中。这里是以海岸特征重构的微缩意境。',features:['翡翠色浅海','白沙与黑色玄武岩','飞扬岛火山轮廓','低石墙与村落'],seed:4567,sea:[.02,.70,.65],seaMix:.80,tideAmplitude:.25,habitat:'火山岩 · 贝壳沙岸',climate:'温带海洋',terrainLabel:'黑岩白沙湾与离岸火山岛'},
  {id:'rinku',name:'临空城',en:'RINKU · IZUMISANO',country:'日本',countryCode:'JP',region:'japan',timeZone:'Asia/Tokyo',utcOffset:9,lat:34.409,lon:135.294,subtitle:'泉佐野白石海岸 · 大阪湾',poem:['白石入湾，','云帆临空。'],description:'泉佐野临空城的 Marble Beach 铺着白色圆润大理石砾石。整齐海堤、滨海步道与摩天轮面向大阪湾，远处的机场岛和跨海桥把海岸连向天空。白色来自石砾，而非热带细沙。',features:['白色大理石砾滩','人工弧形海堤','临空城摩天轮','机场岛与跨海桥'],seed:5939,sea:[.16,.53,.64],seaMix:.74,tideAmplitude:.19,habitat:'白石砾滩 · 人工海岸',climate:'温带季风',terrainLabel:'人工白色砾岸与大阪湾机场岛'},
  {id:'joetsu',name:'上越',en:'JOETSU · TANIHAMA',country:'日本',countryCode:'JP',region:'japan',timeZone:'Asia/Tokyo',utcOffset:9,lat:37.165,lon:138.174,subtitle:'谷浜深蓝海 · 日本海',poem:['山青向海，','深蓝入梦。'],description:'上越谷浜的深蓝海水沿粗砂与碎砾岸铺开，背后是起伏山脊与滨海村落。铁路顺着山海之间的窄地带延伸，港口的防波堤收住一小片平静水面。',features:['深蓝日本海','粗砂与碎砾岸','近海山脊与小村','滨海铁路与渔港'],seed:7177,sea:[.035,.23,.43],seaMix:.84,tideAmplitude:.13,habitat:'碎砾岸 · 海岸林',climate:'温带日本海',terrainLabel:'山脊、沿岸铁路与深蓝海岸'}
];
const CYANLAND_BUILDERS = new Map();
// Small coastal keepsakes are part of the artistic specimen, not a species survey.
const CYANLAND_LOCAL_DETAILS = {
  qingdao:{note:'礁缝边留着螺壳、卷起的渔网与木浮标；微型潮池随海水涨落，浅海中有游鱼和海草。',features:['螺壳与渔具','微型潮池']},
  dalian:{note:'冷色岩岸上有贝壳与海带，浅海的海参形小生物藏在石间，山径沿崖转弯。',features:['贝壳与海带','海参形海底小生物']},
  xiamen:{note:'一叶木渔船停在湾边，绳圈与网具留在干沙上；贝壳和细小蟹足点缀潮线。',features:['木渔船与绳圈','湾边小沙蟹']},
  beihai:{note:'白沙上散着成对珠母色贝壳，小贝壳与遮阳伞只占一角，留下开阔的浅滩。',features:['珠母色贝壳','白沙遮阳伞']},
  sanya:{note:'椰树下留着几枚椰子与一顶小阳伞，珊瑚边的小鱼在清浅海水里结伴游动。',features:['椰子与沙滩小伞','珊瑚边游鱼']},
  goldcoast:{note:'金沙上点缀着冲浪板、救生设施与贝壳，低沙丘留出一片开阔海风。微型游鱼成群经过透明的近岸海水。',features:['冲浪板与救生设施','沙丘草与海滨树影']},
  jeju:{note:'白色贝壳沙与黑色玄武岩交错，矮石墙围着海边小村；浅海里藏着银绿色小鱼和海草。',features:['黑色石墙与海女意象','贝壳沙与银绿鱼群']},
  rinku:{note:'白色圆石在潮线旁露出细碎高光，整齐步道边留着长椅与路灯；机场与摩天轮构成临空城的海湾剪影。',features:['白色圆石与滨海长椅','海湾鱼群']},
  joetsu:{note:'碎砾与漂木散落潮线，山间列车沿岸而行；小渔港、渔具与冷色海草点出日本海的日常尺度。',features:['漂木与岸边渔具','深蓝水下银色鱼群']}
};
for(const city of CITY_DEFS){const local=CYANLAND_LOCAL_DETAILS[city.id];city.localNote=local.note;city.features.push(...local.features);city.country??='中国';city.countryCode??='CN';city.region??='china';city.timeZone??='Asia/Shanghai';city.utcOffset??=8;}
function registerCity(def,builder){
  if(!def || !def.id || typeof builder !== 'function') throw new TypeError('A city needs an id and a procedural builder.');
  const old=CITY_DEFS.findIndex(c=>c.id===def.id);
  if(old<0) CITY_DEFS.push(def); else CITY_DEFS[old]=def;
  CYANLAND_BUILDERS.set(def.id,builder);
}
function buildCity(id){
  const def=CITY_DEFS.find(c=>c.id===id)||CITY_DEFS[0];
  if(CYANLAND_BUILDERS.has(def.id)) return CYANLAND_BUILDERS.get(def.id)(def,Geo);
  Geo.data=[];
  const floor=-3.8,N=112,step=12/N;
  let rngState=def.seed>>>0;
  const random=()=>{rngState=(1664525*rngState+1013904223)>>>0;return rngState/4294967296;};
  const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
  const mix=(a,b,t)=>a+(b-a)*t;
  const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
  const color=c=>typeof c==='string'?[parseInt(c.slice(1,3),16)/255,parseInt(c.slice(3,5),16)/255,parseInt(c.slice(5,7),16)/255]:c;
  const tint=(a,b,t)=>a.map((v,i)=>mix(v,b[i],t));
  const hash=(x,z)=>{const q=Math.sin(x*127.1+z*311.7+def.seed*0.313)*43758.5453123;return q-Math.floor(q);};
  function noise(x,z){const ix=Math.floor(x),iz=Math.floor(z),fx=x-ix,fz=z-iz,u=fx*fx*(3-2*fx),v=fz*fz*(3-2*fz);return mix(mix(hash(ix,iz),hash(ix+1,iz),u),mix(hash(ix,iz+1),hash(ix+1,iz+1),u),v);}
  const fbm=(x,z)=>noise(x,z)*0.55+noise(x*2.17,z*2.17)*0.27+noise(x*4.33,z*4.33)*0.13+noise(x*8.17,z*8.17)*0.05;
  const gauss=(x,z,cx,cz,rx,rz)=>Math.exp(-(((x-cx)/rx)**2+((z-cz)/rz)**2));
  const ellipse=(x,z,cx,cz,rx,rz)=>1-Math.hypot((x-cx)/rx,(z-cz)/rz);
  let rawHeight;
  if(def.id==='qingdao') rawHeight=(x,z)=>{
    const n=fbm(x*.67,z*.67)-.5,d=-z-.55+.5*Math.sin(x*.76)-.12*x;
    const hill=1.2*gauss(x,z,-2.8,-3.3,2.2,1.8)+.5*gauss(x,z,2.7,-4.3,1.9,2);
    const spit=.54*gauss(x,z,2.9,-.6,1.25,.86);
    return clamp(.015+d*.265+smooth(-.1,2.1,d)*(hill+n*.5)+spit+n*.105,-2.28,3.4);
  };
  else if(def.id==='dalian') rawHeight=(x,z)=>{
    const n=fbm(x*.74,z*.74)-.5,d=-z-1.6+.24*x+.42*Math.sin(x*.72);
    const ridge=2.6*gauss(x,z,-2.8,-3.3,2.4,1.35)+2.0*gauss(x,z,.45,-4.35,2.0,1.2)+1.1*gauss(x,z,3.65,-3,1.4,2);
    return clamp(-.57+d*.17+smooth(-.52,.45,d)*(1.15+ridge+n*.63)+n*.075,-2.35,4.1);
  };
  else if(def.id==='xiamen') rawHeight=(x,z)=>{
    const n=fbm(x*.63,z*.63)-.5,d=Math.max(-z-2.27+.48*Math.cos(x*.65),-x-3.5-.17*z);
    const mainland=.025+d*.23+smooth(0,2,d)*(.78*gauss(x,z,-3.55,-3.1,2.1,2.7)+n*.4);
    const i1=ellipse(x,z,2.45,1.05,1.62,1.18),i2=ellipse(x,z,3.4,-1.8,.95,1.2);
    const island1=i1>0?.035+Math.pow(i1,1.3)*1.5+n*.1:-.07+i1*.75;
    const island2=i2>0?.025+Math.pow(i2,1.1)*.95+n*.1:-.11+i2*.72;
    return clamp(Math.max(mainland,island1,island2)+n*.06,-2.25,2.6);
  };
  else if(def.id==='beihai') rawHeight=(x,z)=>{
    const d=-z-.7+.27*Math.sin(x*.43),n=fbm(x*.7,z*.55)-.5;
    const dune=.21*gauss(x,z,-3,-3.65,1.4,1.1)+.15*gauss(x,z,2,-4.65,2,1.1);
    const shoal=.18*gauss(x,z,1.1,2.0,3.2,.55);
    return clamp(.015+d*(d>0?.085:.13)+dune+shoal+n*.055,-1.3,.72);
  };
  else if(def.id==='goldcoast') rawHeight=(x,z)=>{
    const n=fbm(x*.82,z*.62)-.5,d=-z-1.02+.055*Math.sin(x*.68);
    const dune=.22*gauss(x,z,-3.1,-3.15,1.65,.48)+.19*gauss(x,z,.65,-3.0,2.4,.58);
    const cityTerrace=.16*smooth(2.5,3.3,d),bar=.075*gauss(x,z,0,1.55,6,.44);
    return clamp(.022+d*(d>0?.125:.23)+dune+cityTerrace+bar+n*(d>2.7?.012:.035),-2.25,1.05);
  };
  else if(def.id==='jeju') rawHeight=(x,z)=>{
    const n=fbm(x*.91,z*.91)-.5,d=-z-1.22+.13*Math.sin(x*.9)-.53*gauss(x,z,-1.65,-.7,2,1.6);
    const inland=1.0*gauss(x,z,-3.9,-4.9,2.2,1.4)+.52*gauss(x,z,1.9,-5.2,2.6,1.3);
    const mainland=.025+d*.22+smooth(.6,2.6,d)*(inland+n*.15);
    const e=ellipse(x,z,3.15,1.1,1.10,1.15),cone=e>0?.035+Math.pow(e,1.0)*1.68-.23*gauss(x,z,3.12,1.09,.25,.26):-.075+e*.76;
    const reef=-1.7+.50*gauss(x,z,-2.1,.95,2.4,1.2);
    return clamp(Math.max(mainland,cone,reef)+n*.025,-2.4,2.7);
  };
  else if(def.id==='rinku') rawHeight=(x,z)=>{
    const d=-z-.97+.10*x-.26*Math.exp(-(((x+1.1)/2.65)**2)),n=fbm(x*.8,z*.8)-.5;
    const mainland=.026+d*(d>0?.155:.26)+.10*smooth(2.35,2.8,d);
    // A deliberately flat, narrow airport island: an artistic compression of Osaka Bay.
    const airportEdge=Math.min(1.65-Math.abs(x+3.9),.35-Math.abs(z-.9));
    const airport=airportEdge>0?.36+.06*smooth(0,.11,airportEdge):-.10+airportEdge*.96;
    return clamp(Math.max(mainland,airport)+n*(d>2.3?.003:.013),-2.45,.98);
  };
  else if(def.id==='joetsu') rawHeight=(x,z)=>{
    const n=fbm(x*.72,z*.72)-.5,d=-z-.30+.12*Math.sin(x*.49);
    const ridge=1.85*gauss(x,z,-3.2,-5.15,2.3,1.12)+2.22*gauss(x,z,2.65,-5.4,2.1,1.12);
    return clamp(.018+d*(d>0?.19:.34)+smooth(2.0,3.5,d)*(ridge+n*.36)+n*.034,-2.55,3.6);
  };
  else rawHeight=(x,z)=>{
    const n=fbm(x*.7,z*.7)-.5,d=ellipse(x,z,-1.65,-1.8,3.76,2.92),is=ellipse(x,z,3.35,-3.0,1.05,1.28);
    const p=d>0?.025+Math.pow(d,1.4)*2.55+smooth(.1,.6,d)*n*.62:-.06+d*1.15;
    const q=is>0?.02+Math.pow(is,1.3)*1.2+n*.08:-.07+is*.7;
    const reef=-1.9+1.25*gauss(x,z,2.2,2.05,2.4,1.25);
    return clamp(Math.max(p,q,reef)+n*.04,-2.2,3.65);
  };
  const tidePools=[];
  if(def.id==='qingdao'||def.id==='dalian')for(let j=0;j<1200&&tidePools.length<4;j++){
    const x=-5.1+hash(j,31)*10.2,z=-4.8+hash(j,72)*9.4,h=rawHeight(x,z),slope=Math.hypot(rawHeight(x+.1,z)-rawHeight(x-.1,z),rawHeight(x,z+.1)-rawHeight(x,z-.1))/.2;
    if(h>.015&&h<.16&&slope<.68&&tidePools.every(p=>Math.hypot(x-p[0],z-p[1])>1.25))tidePools.push([x,z,.25+hash(j,14)*.12]);
  }
  const height=(x,z)=>{
    let raw=rawHeight(x,z);
    for(const p of tidePools)raw-=.22*gauss(x,z,p[0],p[1],p[2],p[2]*.78);
    const ripple=.014*Math.sin(x*13.1+Math.sin(z*2.2)*.62)*Math.exp(-Math.abs(raw+.4)*1.8),grain=(noise(x*17,z*17)-.5)*.009;
    const h=raw+(raw<.3? ripple+grain:0);return h<0?h*1.35:h;
  };
  function push(p,n,c,kind=0,a0=0,a1=0){Geo.data.push(p[0],p[1],p[2],n[0],n[1],n[2],c[0],c[1],c[2],kind,a0,a1);}
  function normal(a,b,c){const u=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],v=[c[0]-a[0],c[1]-a[1],c[2]-a[2]],n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],l=Math.hypot(...n)||1;return n.map(x=>x/l);}
  function tri(a,b,c,col,kind=0,phase=0,amp=0){const n=normal(a,b,c),cc=color(col);push(a,n,cc,kind,phase,amp);push(b,n,cc,kind,phase,amp);push(c,n,cc,kind,phase,amp);}
  function quad(a,b,c,d,col,kind=0,phase=0,amp=0){tri(a,b,c,col,kind,phase,amp);tri(a,c,d,col,kind,phase,amp);}
  function box(x,y,z,w,h,d,col,rot=0){
    const cs=Math.cos(rot),sn=Math.sin(rot),p=(a,b,c)=>[x+a*cs-c*sn,y+b,z+a*sn+c*cs],a=-w/2,b=w/2,c=-d/2,e=d/2;
    quad(p(a,0,c),p(a,h,c),p(b,h,c),p(b,0,c),col);quad(p(b,0,e),p(b,h,e),p(a,h,e),p(a,0,e),col);
    quad(p(a,0,e),p(a,h,e),p(a,h,c),p(a,0,c),col);quad(p(b,0,c),p(b,h,c),p(b,h,e),p(b,0,e),col);
    quad(p(a,h,c),p(a,h,e),p(b,h,e),p(b,h,c),col);quad(p(a,0,e),p(a,0,c),p(b,0,c),p(b,0,e),col);
  }
  function beam(a,b,r,col,sides=6,kind=0,r1=r){
    const d=b.map((v,i)=>v-a[i]),l=Math.hypot(...d)||1,n=d.map(v=>v/l),q=Math.abs(n[1])<.9?[0,1,0]:[1,0,0];
    let u=[n[1]*q[2]-n[2]*q[1],n[2]*q[0]-n[0]*q[2],n[0]*q[1]-n[1]*q[0]],ul=Math.hypot(...u);u=u.map(v=>v/ul);
    const v=[n[1]*u[2]-n[2]*u[1],n[2]*u[0]-n[0]*u[2],n[0]*u[1]-n[1]*u[0]];
    const p=(base,angle,rad)=>base.map((w,i)=>w+rad*(u[i]*Math.cos(angle)+v[i]*Math.sin(angle)));
    for(let j=0;j<sides;j++){const t=j/sides*Math.PI*2,s=(j+1)/sides*Math.PI*2;quad(p(a,t,r),p(a,s,r),p(b,s,r1),p(b,t,r1),col,kind);tri(b,p(b,t,r1),p(b,s,r1),col,kind);}
  }
  function orb(x,y,z,rx,ry,rz,col,segments=7,rings=4,kind=0,rough=0){
    const cc=color(col),phase=random()*6.28,p=(i,j)=>{const a=i/segments*Math.PI*2,b=j/rings*Math.PI,rr=1+rough*(Math.sin(a*3+phase)*Math.sin(b*2.3)+.3*Math.cos(a*7+b*4));return[x+Math.sin(b)*Math.cos(a)*rx*rr,y+Math.cos(b)*ry*rr,z+Math.sin(b)*Math.sin(a)*rz*rr];};
    for(let j=0;j<rings;j++)for(let i=0;i<segments;i++){
      const a=p(i,j),b=p(i+1,j),c=p(i+1,j+1),d=p(i,j+1),variation=.95+.1*random(),cl=cc.map(v=>clamp(v*variation));
      if(j!==0)tri(a,b,c,cl,kind,phase,kind===3?.6:0);if(j!==rings-1)tri(a,c,d,cl,kind,phase,kind===3?.6:0);
    }
  }
  const palettes={
    qingdao:{sand:'#d3c29a',deep:'#a6b5a1',grass:'#657b46',rock:'#a3a18b',soil:'#8b8a66'},
    dalian:{sand:'#bfc4af',deep:'#99b1a6',grass:'#667d45',rock:'#a4a899',soil:'#777d62'},
    xiamen:{sand:'#eee0b3',deep:'#a4c5b8',grass:'#718b49',rock:'#b8b49b',soil:'#88916a'},
    beihai:{sand:'#f1ead2',deep:'#bbd6c5',grass:'#9da278',rock:'#d4d2b7',soil:'#bdc19a'},
    sanya:{sand:'#f0e5bf',deep:'#b2d3bd',grass:'#4d7943',rock:'#a8b7a0',soil:'#768d5f'},
    goldcoast:{sand:'#e6c986',deep:'#a2c6b5',grass:'#8c9f61',rock:'#b0aa8d',soil:'#a49a6b'},
    jeju:{sand:'#eee8d3',deep:'#abd0bc',grass:'#648955',rock:'#424e4c',soil:'#777e5b'},
    rinku:{sand:'#e9e9de',deep:'#afc7bf',grass:'#81976c',rock:'#d1d6d1',soil:'#aaad96'},
    joetsu:{sand:'#b2a58b',deep:'#789d9d',grass:'#4c754c',rock:'#777c75',soil:'#6c7961'}
  },palette=palettes[def.id]||palettes.sanya;
  const grid=[],norms=[],cols=[];
  let land=0,maxElevation=-Infinity,minElevation=Infinity,plantCount=0,rockCount=0,coralCount=0,fishCount=0,shellCount=0,smallDetailCount=0;
  const fishMotion=[],coastalMetrics={pebbleGroups:0,algaePatches:0,shellGroups:0,spongeGardens:0,palmGroves:0};
  for(let iz=0;iz<=N;iz++)for(let ix=0;ix<=N;ix++){const x=-6+ix*step,z=-6+iz*step,h=height(x,z);grid.push([x,h,z]);if(h>0)land++;maxElevation=Math.max(maxElevation,h);minElevation=Math.min(minElevation,h);}
  for(let iz=0;iz<=N;iz++)for(let ix=0;ix<=N;ix++){
    const i=iz*(N+1)+ix,p=grid[i],dx=(grid[iz*(N+1)+Math.min(N,ix+1)][1]-grid[iz*(N+1)+Math.max(0,ix-1)][1])/(ix===0||ix===N?step:2*step),dz=(grid[Math.min(N,iz+1)*(N+1)+ix][1]-grid[Math.max(0,iz-1)*(N+1)+ix][1])/(iz===0||iz===N?step:2*step),l=Math.hypot(dx,1,dz),slope=Math.hypot(dx,dz),n=fbm(p[0]*3.2,p[2]*3.2);
    norms.push([-dx/l,1/l,-dz/l]);
    let c;
    if(p[1]<-.05){const blend=smooth(-.05,-1.8,p[1]);c=tint(color(palette.sand),color(palette.deep),blend*.7);const ripple=Math.sin(p[0]*11.4+Math.sin(p[2]*1.7)*.8)*.025;c=c.map(v=>clamp(v+ripple+(n-.5)*.035));
      // Submerged rock and sand share a quiet mottled substrate, rather than a flat wash.
      const bedMottle=smooth(.58,.82,noise(p[0]*5.7,p[2]*5.7))*.12;c=tint(c,color(palette.rock),bedMottle);}
    else{const beach=def.id==='beihai'?.3:def.id==='goldcoast'?.36:def.id==='rinku'?.37:def.id==='sanya'?.18:.22;c=tint(color(palette.sand),color(palette.grass),smooth(beach*.65,beach+.38,p[1]));c=tint(c,color(palette.rock),smooth(.4,1.1,slope)*.88);c=c.map(v=>clamp(v*(.94+n*.13)));}
    if(def.id==='jeju'){
      const onVolcano=Math.hypot((p[0]-3.15)/1.10,(p[2]-1.1)/1.15)<1.03;
      const blackShore=(smooth(1.1,2.8,p[0])+1-smooth(-4.9,-3.6,p[0]))*(1-smooth(.20,.48,Math.abs(p[1])));
      c=tint(c,color(palette.rock),clamp(blackShore*.64+(onVolcano&&p[1]<.23?.60:0)));
      if(onVolcano&&p[1]>.25)c=tint(c,color(palette.grass),smooth(.25,.80,p[1])*.78);
    }
    if(def.id==='rinku'&&p[0]<-2.15&&Math.abs(p[2]-.9)<.35&&p[1]>.08)c=tint(color('#aebbb5'),color('#c4cbc2'),n);
    if(def.id==='joetsu'&&p[1]>-.1&&p[1]<.32){const gravel=smooth(.43,.71,noise(p[0]*29,p[2]*29));c=tint(c,color('#858981'),gravel*.30);}
    // Damp sand, wind-combed grains and pale seams keep the shoreline continuous.
    const damp=(1-smooth(.04,.24,Math.abs(p[1])))*.17;c=c.map((v,k)=>clamp(v*(1-damp)+[.012,.015,.008][k]*damp));
    if(p[1]>-.12&&p[1]<.35){const sandRipple=Math.sin(p[0]*22.4+p[2]*4.1+Math.sin(p[2]*2.7)*1.5)*.012; c=c.map(v=>clamp(v+sandRipple));
      const wrackBand=Math.exp(-(((p[1]-.065)/.047)**2))*smooth(.51,.78,noise(p[0]*9.4,p[2]*9.4));c=tint(c,[.43,.48,.32],wrackBand*.10);}
    if(p[1]>.3){const vein=Math.pow(.5+.5*Math.sin(p[0]*11+p[2]*4.3+noise(p[0]*2,p[2]*2)*5),11)*smooth(.45,1.2,slope);c=tint(c,[.71,.72,.61],vein*.18);
      const pathDistance=Math.abs(p[2]-(-3.45+.33*Math.sin(p[0]*1.15)));
      if(def.id!=='beihai'&&pathDistance<.085&&slope<.8)c=tint(c,color(palette.sand),.45*(1-pathDistance/.085));
    }
    cols.push(c);
  }
  for(let iz=0;iz<N;iz++)for(let ix=0;ix<N;ix++){
    const a=iz*(N+1)+ix,b=a+1,c=a+N+1,d=c+1;
    for(const i of[a,c,b,b,c,d])push(grid[i],norms[i],cols[i]);
  }
  // Four geological cut faces, with continuous sand, shell-limestone and crystalline strata.
  const edges=[Array.from({length:N+1},(_,i)=>i),Array.from({length:N+1},(_,i)=>i*(N+1)+N),Array.from({length:N+1},(_,i)=>N*(N+1)+N-i),Array.from({length:N+1},(_,i)=>(N-i)*(N+1))];
  const layerCols=({goldcoast:['#e8d293','#c8c39f','#9cc1ad','#82b6ad'],jeju:['#e6dfc7','#69756b','#769d8c','#75b5aa'],rinku:['#e9e9df','#b1beb4','#9dbbb1','#80a9a9'],joetsu:['#b9af96','#8a9382','#7faaa2','#6e99a2']})[def.id]||['#e6d8b3','#b9bea3','#a0c8b5','#88b6aa'];
  for(const edge of edges)for(let j=0;j<N;j++){
    const a=grid[edge[j]],b=grid[edge[j+1]],depthA=a[1]-floor,depthB=b[1]-floor;
    const la=[a[1],a[1]-Math.min(.17,depthA*.23),a[1]-Math.min(.43,depthA*.56),floor+.10,floor],lb=[b[1],b[1]-Math.min(.17,depthB*.23),b[1]-Math.min(.43,depthB*.56),floor+.10,floor];
    for(let k=0;k<4;k++){
      const s=.96+.055*Math.sin(j*.65+k*2),cc=color(layerCols[k]).map(v=>v*s);
      quad([a[0],la[k],a[2]],[b[0],lb[k],b[2]],[b[0],lb[k+1],b[2]],[a[0],la[k+1],a[2]],cc);
    }
    if(j%5===0){const yy=mix(la[1],la[2],.3+.35*random()),dx=b[0]-a[0],dz=b[2]-a[2],ox=dz*.006,oz=-dx*.006;
      const center=[mix(a[0],b[0],.4)+ox,yy,mix(a[2],b[2],.4)+oz],r=.018+random()*.018;
      tri([center[0]-dx*.21,center[1],center[2]-dz*.21],[center[0]+dx*.21,center[1],center[2]+dz*.21],[center[0],center[1]+r,center[2]],'#e7ead2');
    }
  }
  quad([-6,floor,-6],[6,floor,-6],[6,floor,6],[-6,floor,6],'#82ab9c');
  function rock(x,z,size=.35,raised=0){const y=height(x,z)+raised;orb(x,y+size*.25,z,size,size*(.52+random()*.4),size*(.65+random()*.45),tint(color(palette.rock),[.64,.61,.51],random()*.28),9,5,0,.11);rockCount++;}
  function grass(x,z,s=.3,underwater=false){
    const y=height(x,z),phase=random()*6.28,cc=underwater?(def.id==='joetsu'?'#3e7065':def.id==='jeju'?'#477d62':'#357c6b'):(def.id==='goldcoast'?'#a5ac77':'#92a26a');
    for(let k=0;k<5;k++){const angle=k*2.4+phase,l=s*(.5+random()*.65),bx=x+Math.cos(angle)*.045,bz=z+Math.sin(angle)*.045,wx=Math.cos(angle+1.57)*.016,wz=Math.sin(angle+1.57)*.016,tip=[bx+Math.cos(angle)*l*.24,y+l,bz+Math.sin(angle)*l*.24],mid=[bx+Math.cos(angle)*l*.07,y+l*.55,bz+Math.sin(angle)*l*.07];
      quad([bx-wx,y,bz-wz],[bx+wx,y,bz+wz],[mid[0]+wx*.65,mid[1],mid[2]+wz*.65],[mid[0]-wx*.65,mid[1],mid[2]-wz*.65],cc,3,phase,.8);tri([mid[0]-wx*.65,mid[1],mid[2]-wz*.65],[mid[0]+wx*.65,mid[1],mid[2]+wz*.65],tip,cc,3,phase,1);
    }plantCount++;
  }
  function shrub(x,z,s=.28){const y=height(x,z);orb(x,y+s*.32,z,s,s*.55,s*.8,'#718750',8,4,3,.09);plantCount++;}
  function pine(x,z,s=1){const y=height(x,z),lean=(random()-.5)*.12;beam([x,y,z],[x+lean,y+s*.7,z],s*.035,'#776e51',6,0,s*.018);orb(x+lean,y+s*.7,z,s*.37,s*.23,s*.3,'#3f6546',9,4,3,.12);orb(x+lean*.5+s*.1,y+s*.89,z-s*.04,s*.29,s*.19,s*.24,'#53734b',9,4,3,.1);plantCount++;}
  function broadleaf(x,z,s=.8){const y=height(x,z);beam([x,y,z],[x+s*.04,y+s*.66,z],s*.048,'#827856',6,0,s*.027);orb(x,y+s*.75,z,s*.36,s*.34,s*.33,'#527b4a',9,4,3,.11);orb(x+s*.19,y+s*.62,z+s*.06,s*.27,s*.26,s*.25,'#648b4c',8,4,3,.1);plantCount++;}
  function palm(x,z,s=1){
    const y=height(x,z),angle=random()*6.28,lean=.19*s,top=[x+Math.cos(angle)*lean,y+s*1.18,z+Math.sin(angle)*lean];
    let prev=[x,y,z];for(let k=1;k<=5;k++){const t=k/5,next=[x+Math.cos(angle)*lean*t*t,y+s*1.18*t,z+Math.sin(angle)*lean*t*t];beam(prev,next,s*(.041-.017*t),'#ad9770',5,0,s*(.038-.017*t));prev=next;}
    const phase=random()*6.28;
    for(let k=0;k<8;k++){
      const a=k/8*Math.PI*2+phase,dx=Math.cos(a),dz=Math.sin(a),len=s*(.6+random()*.18),ww=s*.09;
      const point=t=>[top[0]+dx*len*t,top[1]+s*(.19*Math.sin(t*Math.PI)-.18*t*t),top[2]+dz*len*t];
      for(let j=0;j<3;j++){const t=j/3,u=(j+1)/3,p=point(t),q=point(u),w=ww*Math.sin((t+.04)*Math.PI),v=ww*Math.sin(u*Math.PI);quad([p[0]-dz*w,p[1],p[2]+dx*w],[p[0]+dz*w,p[1],p[2]-dx*w],[q[0]+dz*v,q[1],q[2]-dx*v],[q[0]-dz*v,q[1],q[2]+dx*v],k%2?'#4b7e43':'#658f47',3,phase,1);}
    }orb(top[0],top[1]-.07*s,top[2],s*.055,s*.07,s*.055,'#8b7748',5,3);plantCount++;
  }
  function star(x,z,s=.12){const y=height(x,z)+.025,c=[x,y+.025,z],a=random()*6.28;for(let k=0;k<10;k++){const t=a+k/10*Math.PI*2,u=a+(k+1)/10*Math.PI*2,r=k%2?s*.4:s,rr=(k+1)%2?s*.4:s;tri(c,[x+Math.cos(u)*rr,y,z+Math.sin(u)*rr],[x+Math.cos(t)*r,y,z+Math.sin(t)*r],k%2?'#c88e6d':'#e9ad80');}}
  function shell(x,z,s=.09){const y=height(x,z)+.014,a=random()*6.28;for(let k=0;k<9;k++){const t=a+(-.85+k/9*1.7),u=a+(-.85+(k+1)/9*1.7),v=s*(.7+.3*Math.cos(t-a));tri([x,y+s*.3,z],[x+Math.cos(u)*v,y,z+Math.sin(u)*v],[x+Math.cos(t)*v,y,z+Math.sin(t)*v],k%2?'#f0e6cc':'#d3c4aa');}shellCount++;}
  function coral(x,z,s=.3){
    const y=height(x,z),cc=['#d49d88','#e5c18d','#8cae8d','#a59aaa'][Math.floor(random()*4)];
    if((def.id!=='sanya'&&def.id!=='xiamen')||random()<.42){orb(x,y+s*.28,z,s,s*.5,s*.75,cc,7,4,0,.18);for(let k=0;k<3;k++)orb(x+(random()-.5)*s,y+s*.55,z+(random()-.5)*s,s*.22,s*.26,s*.22,'#c4c895',5,3);}
    else{const base=[x,y,z];for(let k=0;k<4;k++){const a=k*2.4,end=[x+Math.cos(a)*s*.48,y+s*(.8+random()*.5),z+Math.sin(a)*s*.48],mid=[mix(x,end[0],.6),mix(y,end[1],.6),mix(z,end[2],.6)];beam(base,end,s*.045,cc,5,0,s*.018);beam(mid,[end[0]+Math.cos(a+1)*s*.24,end[1]+s*.14,end[2]+Math.sin(a+1)*s*.24],s*.025,cc,5,0,s*.01);}}
    coralCount++;
  }
  function fish(x,y,z,s=.12,angle=0,motion={}){
    const phase=motion.phase??random()*Math.PI*2,amp=motion.amplitude??(.13+random()*.12),cc=def.id==='sanya'?(random()<.42?'#c7b77b':'#86b7ad'):def.id==='beihai'?'#b0bdb2':def.id==='goldcoast'?'#b8c8c1':def.id==='jeju'?'#b3c6ad':def.id==='rinku'?'#b9c7ca':def.id==='joetsu'?'#b9cbd1':'#9eb8b5',p=(a,b,c)=>[x+a*Math.cos(angle)-c*Math.sin(angle),y+b,z+a*Math.sin(angle)+c*Math.cos(angle)],fin=tint(color(cc),[.37,.55,.55],.28);
    const nose=p(s,0,0),tail=p(-s*.7,0,0),top=p(0,s*.37,0),bot=p(0,-s*.32,0),left=p(0,0,s*.19),right=p(0,0,-s*.19);
    for(const a of[[nose,top,left],[nose,left,bot],[nose,right,top],[nose,bot,right],[tail,left,top],[tail,bot,left],[tail,top,right],[tail,right,bot]])tri(...a,cc,4,phase,amp);
    tri(tail,p(-s*1.15,s*.35,0),p(-s*1.15,-s*.35,0),fin,4,phase,amp);
    tri(p(s*.19,s*.02,s*.2),p(s*.58,s*.04,s*.13),p(s*.5,s*.09,s*.17),'#354d4d',4,phase,amp);
    let maxBottom=-Infinity;const bodyRadius=s*1.16;for(let j=0;j<64;j++){const t=j/64*Math.PI*2;for(let k=0;k<8;k++){const a=k/8*Math.PI*2;maxBottom=Math.max(maxBottom,height(x+Math.sin(t)*amp+Math.cos(a)*bodyRadius,z+Math.cos(t)*amp*.6+Math.sin(a)*bodyRadius));}}
    fishMotion.push({center:[x,y,z],phase,amplitude:amp,size:s,angle,school:motion.school??0,bodyRadius,seabedClearance:+(y-.035-s*.37-maxBottom).toFixed(3),lowTideClearance:+(-def.tideAmplitude-.14-y-.035-s*.37).toFixed(3)});fishCount++;
  }
  const landmarks=[];
  function house(x,z,s=.65,rot=0,roof='#b66b4e'){
    const y=height(x,z),w=s,d=s*.75,h=s*.53,cs=Math.cos(rot),sn=Math.sin(rot),p=(a,b,c)=>[x+a*cs-c*sn,y+b,z+a*sn+c*cs];
    box(x,y-.035,z,w+.08,.07,d+.08,'#a8a88d',rot);box(x,y,z,w,h,d,'#ede6cf',rot);
    const a=p(-w*.57,h,d*.58),b=p(w*.57,h,d*.58),c=p(w*.57,h,-d*.58),e=p(-w*.57,h,-d*.58),r1=p(-w*.57,h+s*.27,0),r2=p(w*.57,h+s*.27,0);
    quad(a,b,r2,r1,roof);quad(r1,r2,c,e,roof);tri(p(-w*.5,h,-d*.5),p(-w*.5,h+s*.24,0),p(-w*.5,h,d*.5),'#e6dcc3');tri(p(w*.5,h,d*.5),p(w*.5,h+s*.24,0),p(w*.5,h,-d*.5),'#e6dcc3');
    for(const xx of[-.25,.25]){const a=p(xx*w-.06,h*.49,d*.505),b=p(xx*w+.06,h*.49,d*.505),c=p(xx*w+.06,h*.79,d*.505),e=p(xx*w-.06,h*.79,d*.505);quad(a,b,c,e,'#567c79');}
    const door=p(0,0,d*.51);box(door[0],door[1],door[2],s*.12,h*.64,.014,'#8a8064',rot);
    // Fine roof ridges read as ceramic tiles at close range.
    for(let i=-3;i<=3;i++){const a=p(i*w/7,h+.008,d*.58),b=p(i*w/7,h+s*.27+.009,0),c=p(i*w/7,h+.008,-d*.58);beam(a,b,.005,'#c78b63',4);beam(b,c,.005,'#c78b63',4);}
  }
  function lighthouse(x,z,s=1){
    const y=height(x,z);orb(x,y-.015,z,s*.4,s*.12,s*.33,'#b6b59e',8,3);beam([x,y,z],[x,y+s*1.05,z],s*.12,'#eee9d9',10,0,s*.09);beam([x,y+s*.61,z],[x,y+s*.76,z],s*.104,'#b86a52',10,0,s*.1);beam([x,y+s*1.05,z],[x,y+s*1.29,z],s*.115,'#c6d9ca',8);beam([x,y+s*1.29,z],[x,y+s*1.43,z],s*.17,'#617d70',8,0,.001);orb(x,y+s*1.18,z,s*.043,s*.043,s*.043,'#efdca7',6,3,5);landmarks.push({label:'海岬灯塔',pos:[x,y+s*1.52,z],detail:'岸线的微型航标；随日夜照明变化。'});
  }
  function boardwalk(points,width=.22,rail=false){
    for(let j=0;j<points.length-1;j++){const a=points[j],b=points[j+1],dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz),count=Math.ceil(len/.09),nx=-dz/len,nz=dx/len;
      for(let k=0;k<count;k++){const t=(k+.5)/count,x=mix(a[0],b[0],t),z=mix(a[1],b[1],t),y=Math.max(height(x,z)+.065,.15);box(x,y,z,width,.035,len/count*.9,k%3===0?'#a69c7e':'#b7aa88',Math.atan2(-dx,dz));if(rail&&k%4===0)for(const dir of[-1,1])beam([x+nx*width*.43,y,z+nz*width*.43],[x+nx*width*.43,y+.15,z+nz*width*.43],.012,'#8e8d73',4);}
    }
  }
  function sailboat(x,z,s=.45,angle=-.3){const y=.06,p=(a,b,c)=>[x+a*Math.cos(angle)-c*Math.sin(angle),y+b,z+a*Math.sin(angle)+c*Math.cos(angle)];orb(x,y-.018,z,s*.49,s*.12,s*.19,'#eee9d6',8,3);beam(p(0,0,0),p(0,s*.9,0),.008,'#7c8174',5);tri(p(.02,s*.84,0),p(.02,s*.14,0),p(s*.43,s*.16,0),'#f2ebd7');tri(p(-.015,s*.72,0),p(-s*.32,s*.15,0),p(-.015,s*.15,0),'#d7b58e');}
  function driftwood(x,z,s=.45){
    const a=random()*6.28,y=height(x,z)+.025,dx=Math.cos(a),dz=Math.sin(a),p=t=>[x+dx*s*t,y+.025*Math.sin(t*4),z+dz*s*t];
    for(let j=0;j<4;j++)beam(p(-.5+j*.25),p(-.25+j*.25),.025-j*.003,j%2?'#b3a181':'#a08e70',7,0,.024-j*.003);
    beam(p(.12),[x+dx*s*.12-dz*.13,y+.05,z+dz*s*.12+dx*.13],.014,'#ae9c7e',5,0,.005);smallDetailCount++;
  }
  function crab(x,z,s=.075){
    const y=height(x,z)+.018,col='#bd8868';orb(x,y+s*.17,z,s*.55,s*.27,s*.44,col,7,3);
    for(const side of[-1,1])for(let j=0;j<3;j++){const a=[x+side*s*.35,y+s*.1,z+(j-1)*s*.28],b=[x+side*s*.92,y+s*.08,z+(j-1)*s*.56];beam(a,b,.0045,col,4);beam(b,[b[0]+side*s*.12,y-.005,b[2]+s*.13],.0035,col,4);}
    for(const side of[-1,1]){beam([x+side*s*.35,y+s*.1,z-s*.22],[x+side*s*.72,y+s*.3,z-s*.65],.006,col,4);tri([x+side*s*.72,y+s*.3,z-s*.65],[x+side*s*.92,y+s*.45,z-s*.84],[x+side*s*.78,y+s*.38,z-s*.51],'#cf9b78');}smallDetailCount++;
  }
  function ropeCoil(x,y,z,r=.13){for(let turn=0;turn<2;turn++)for(let j=0;j<15;j++){const a=j/15*Math.PI*2,b=(j+1)/15*Math.PI*2,rr=r*(1-turn*.26);beam([x+Math.cos(a)*rr,y+turn*.01,z+Math.sin(a)*rr],[x+Math.cos(b)*rr,y+turn*.01,z+Math.sin(b)*rr],.006,'#b8a477',4);}smallDetailCount++;}
  function fishingGear(x,z){
    const y=height(x,z)+.025;ropeCoil(x,y,z,.12);
    for(let j=0;j<5;j++){const zz=z+.16+j*.035;beam([x-.17,y,zz],[x+.16,y+.015,zz+.07],.0035,'#6b8678',4);beam([x-.14+j*.07,y,z+.12],[x-.11+j*.07,y+.013,z+.38],.0035,'#6b8678',4);}
    for(const dx of[-.12,.12])orb(x+dx,y+.025,z+.38,.025,.03,.025,'#c7ae7b',6,3);smallDetailCount++;
  }
  function smallBoat(x,z,s=.55){
    const y=height(x,z)+.065,a=-.4,cs=Math.cos(a),sn=Math.sin(a),p=(u,v,w)=>[x+u*cs-w*sn,y+v,z+u*sn+w*cs];
    const hull=[p(-s*.55,0,0),p(-s*.37,.08,s*.21),p(s*.39,.075,s*.19),p(s*.61,.065,0),p(s*.39,.075,-s*.19),p(-s*.37,.08,-s*.21)],bottom=p(0,-.045,0);
    for(let j=0;j<6;j++)tri(bottom,hull[(j+1)%6],hull[j],j%2?'#a38a64':'#9e7956');
    quad(p(-s*.36,.037,-s*.16),p(-s*.36,.037,s*.16),p(s*.38,.037,s*.16),p(s*.38,.037,-s*.16),'#c5ac80');
    for(let j=0;j<6;j++)beam(hull[j],hull[(j+1)%6],.014,'#7d7560',5);
    for(const u of[-.22,.09])beam(p(u,.078,-s*.16),p(u,.078,s*.16),.023,'#af976d',5);
    beam(p(-.25,.08,-.14),p(.45,.1,.33),.01,'#987e59',5);orb(...p(.47,.1,.35),.04,.012,.075,'#b59a71',6,3);ropeCoil(...p(-.11,.083,0),.065);smallDetailCount++;
  }
  function umbrella(x,z,s=.42){
    const y=height(x,z);beam([x,y,z],[x,y+s*.94,z],.012,'#aa9570',6);
    const top=[x,y+s*1.05,z];for(let j=0;j<10;j++){const a=j/10*Math.PI*2,b=(j+1)/10*Math.PI*2;tri(top,[x+Math.cos(b)*s*.52,y+s*.83,z+Math.sin(b)*s*.52],[x+Math.cos(a)*s*.52,y+s*.83,z+Math.sin(a)*s*.52],j%2?'#dfd4b0':'#a7b8a0');}
    box(x+.18,y+.018,z+.19,.14,.018,.3,'#e6d7b1',.2);smallDetailCount++;
  }
  function spiralShell(x,z,s=.07){
    const y=height(x,z)+.025;orb(x,y+s*.3,z,s*.8,s*.52,s*.62,'#dbc8a4',9,4);
    for(let j=0;j<15;j++){const a=j/15*Math.PI*3.6,b=(j+1)/15*Math.PI*3.6,ra=s*(.65-j*.031),rb=s*(.65-(j+1)*.031);beam([x+Math.cos(a)*ra,y+s*.76,z+Math.sin(a)*ra],[x+Math.cos(b)*rb,y+s*.77,z+Math.sin(b)*rb],.004,'#b79c77',4);}smallDetailCount++;
  }
  // Small clustered details sit in the same natural tide line; the broad sand remains open.
  function pebbleCluster(x,z,s=.035){
    const angle=random()*6.28;
    for(let j=0;j<5;j++){const xx=x+Math.cos(angle)*((j-2)*s*1.05)+(random()-.5)*s,zz=z+Math.sin(angle)*((j-2)*s*1.05)+(random()-.5)*s,h=height(xx,zz);if(h<-.22||h>.27)continue;orb(xx,h+s*.19,zz,s*(.55+random()*.35),s*(.26+random()*.16),s*(.48+random()*.35),tint(color(palette.rock),color(palette.sand),.3+random()*.35),6,3,0,.08);}
    coastalMetrics.pebbleGroups++;smallDetailCount++;
  }
  function tideAlgae(x,z,s=.12){
    const y=height(x,z)+.012,phase=random()*6.28;
    for(let j=0;j<4;j++){const a=phase+j*1.7,l=s*(.65+random()*.5),p=[x+Math.cos(a)*l,y+.006,z+Math.sin(a)*l];tri([x-.017,y,z+.014],p,[x+.02,y,z-.012],j%2?'#6f8860':'#78957d');}
    coastalMetrics.algaePatches++;smallDetailCount++;
  }
  function spongeGarden(x,z,s=.085){
    const y=height(x,z);for(let j=0;j<3;j++){const a=j*2.4,xx=x+Math.cos(a)*s*.75,zz=z+Math.sin(a)*s*.75,h=height(xx,zz),r=s*(.3+random()*.17),t=s*(.65+random()*.55);beam([xx,h,zz],[xx,h+t,zz],r,j%2?'#b8b59b':'#b4bda6',6,0,r*.7);const top=h+t+.001;for(let k=0;k<6;k++){const a=k/6*Math.PI*2,b=(k+1)/6*Math.PI*2;tri([xx,top,zz],[xx+Math.cos(a)*r*.42,top,zz+Math.sin(a)*r*.42],[xx+Math.cos(b)*r*.42,top,zz+Math.sin(b)*r*.42],'#748b7d');}}
    coastalMetrics.spongeGardens++;smallDetailCount++;
  }
  const detailReservations=({qingdao:[[-1.5,-2.3,.5],[-.62,-2.65,.4],[.38,-2.87,.5],[-2.22,-2.82,.4],[2.85,-.62,.5]],dalian:[[3.7,-2.32,.45],[-3.8,-4.8,.4]],xiamen:[[-3.8,-1.6,.5],[-2.8,-3.25,.4],[2.4,.93,.35]],beihai:[[-2.8,-3.7,.45],[-1.7,-3.55,.45],[-.6,-3.53,.45],[.5,-3.67,.45]],sanya:[[-2.8,-.75,.4]]})[def.id]||[];
  const clearDetail=(x,z,r=.12)=>detailReservations.every(p=>Math.hypot(x-p[0],z-p[1])>r+p[2]);
  function addCoastalObject(predicate,fn,r=.35){for(let j=0;j<900;j++){const x=-4.8+random()*9.6,z=-4.7+random()*8.9,h=height(x,z);if(predicate(x,z,h)&&clearDetail(x,z,r)&&slopeAt(x,z)<.4){fn(x,z,h);detailReservations.push([x,z,r]);return true;}}return false;}
  const place=(amount,predicate,fn)=>{let made=0;for(let tries=0;tries<amount*55&&made<amount;tries++){const x=-5.65+random()*11.3,z=-5.65+random()*11.3,h=height(x,z);if(predicate(x,z,h)){fn(x,z,h,made);made++;}}return made;};
  const slopeAt=(x,z)=>Math.hypot(height(x+.08,z)-height(x-.08,z),height(x,z+.08)-height(x,z-.08))/.16;
  let cityDetails={};
  if(typeof CyanCoastalDetails!=='undefined'&&['goldcoast','jeju','rinku','joetsu'].includes(def.id)){
    cityDetails=CyanCoastalDetails.add({def,height,random,noise,fbm,color,tint,tri,quad,box,beam,orb,rock,grass,shrub,pine,broadleaf,palm,house,lighthouse,boardwalk,sailboat,landmarks,coastalMetrics,palette,place,slopeAt,clamp,mix,smooth,detailReservations,clearDetail,addCoastalObject,shell,umbrella,ropeCoil,smallBoat,crab})||{};
  }
  if(def.id==='qingdao'){
    place(75,(x,z,h)=>h>-.3&&h<.35,(x,z,h)=>rock(x,z,.10+random()*.26));
    place(42,(x,z,h)=>h>.58&&h<2.4&&slopeAt(x,z)<.65,(x,z)=>pine(x,z,.46+random()*.38));
    place(50,(x,z,h)=>h>.3&&h<1.9,(x,z)=>shrub(x,z,.12+random()*.16));
    for(const [x,z,s,r]of[[-1.5,-2.3,.57,.13],[-.62,-2.65,.48,-.11],[.38,-2.87,.62,.1],[-2.22,-2.82,.43,.15]])house(x,z,s,r);
    lighthouse(2.85,-.62,.75);boardwalk([[-2,-3.15],[-.8,-3.3],[.4,-3.37],[1.5,-2.9]],.16);
    landmarks.push({label:'红瓦海岸',pos:[-.6,height(-.6,-2.65)+.7,-2.65],detail:'红瓦小屋与花岗岩礁岸构成青岛海滨意象。'},{label:'潮间带岩池',pos:[-2.6,.1,.2],detail:'涨潮隐没、退潮显露的礁石与潮池。'});
  }else if(def.id==='dalian'){
    place(58,(x,z,h)=>h>.7&&slopeAt(x,z)<1.2,(x,z)=>pine(x,z,.48+random()*.42));
    place(46,(x,z,h)=>h>.5&&h<3.1,(x,z)=>shrub(x,z,.13+random()*.17));
    place(34,(x,z,h)=>h>-.65&&h<.35,(x,z)=>rock(x,z,.15+random()*.28));
    lighthouse(3.7,-2.32,.65);boardwalk([[-4.2,-3.1],[-3,-3.5],[-1.8,-4.1],[-.6,-4.4],[.8,-4.5]],.14,true);house(-3.8,-4.8,.45,.15,'#718b80');
    landmarks.push({label:'海岬松林',pos:[-2.7,height(-2.7,-3.3)+.65,-3.3],detail:'高耸山脊上的针叶林与弯曲山径。'},{label:'灰白海崖',pos:[-.5,1.05,-1.65],detail:'陡峭岸线展示岩层切面与清晰地形高差。'});
  }else if(def.id==='xiamen'){
    place(42,(x,z,h)=>h>.35&&slopeAt(x,z)<1.3,(x,z)=>broadleaf(x,z,.45+random()*.32));
    place(37,(x,z,h)=>h>.15&&h<1.4,(x,z)=>shrub(x,z,.13+random()*.16));
    place(13,(x,z,h)=>h>.08&&h<.4&&slopeAt(x,z)<.8,(x,z)=>palm(x,z,.48+random()*.25));
    place(23,(x,z,h)=>h>-.4&&h<.12,(x,z)=>rock(x,z,.12+random()*.23));
    house(-3.8,-1.6,.58,.12);house(-2.8,-3.25,.48,-.15);house(2.4,.93,.38,.18,'#9c755b');boardwalk([[-3.7,-.85],[-2.95,-.15],[-2.1,.35]],.2,true);sailboat(.4,1.6,.5);sailboat(3.7,3.1,.36,.15);
    landmarks.push({label:'湾心双岛',pos:[2.45,height(2.45,1.05)+.38,1.05],detail:'两座形态独立的小岛，与陆岸围合出沙湾。'},{label:'临海栈桥',pos:[-2.1,.4,.35],detail:'木栈桥探入浅湾，远处保留帆船尺度。'});
  }else if(def.id==='beihai'){
    place(88,(x,z,h)=>h>.17&&z<-1.1,(x,z)=>grass(x,z,.13+random()*.14));
    place(23,(x,z,h)=>h>.28&&z<-3.1,(x,z)=>shrub(x,z,.12+random()*.13));
    place(11,(x,z,h)=>h>.21&&z<-3.5,(x,z)=>palm(x,z,.56+random()*.24));
    // A restrained line of beach pavilions makes the immense low foreshore legible.
    for(let j=0;j<4;j++){const x=-2.8+j*1.1,z=-3.7+.18*Math.sin(j),y=height(x,z);for(const dx of[-.16,.16])for(const dz of[-.14,.14])beam([x+dx,y,z+dz],[x+dx,y+.35,z+dz],.014,'#9c9372',5);const roof=y+.36;quad([x-.23,roof,z-.21],[x-.23,roof+.08,z+.21],[x+.23,roof+.08,z+.21],[x+.23,roof,z-.21],j%2?'#bcaa81':'#d0c6a1');}
    boardwalk([[-4.9,-4.5],[-2.5,-4.4],[0,-4.5],[2.8,-4.65]],.19);place(42,(x,z,h)=>h>-.2&&h<.16,(x,z)=>shell(x,z,.04+random()*.05));
    landmarks.push({label:'白沙与低丘',pos:[-2.3,.6,-2.4],detail:'低缓沙丘与宽阔白色沙面，保留北海海岸的平展感。'},{label:'潮下沙洲',pos:[1.1,.08,2.0],detail:'水位变化时，浅滩的金色沙纹会逐渐显露。'});
  }else if(def.id==='goldcoast'){
    place(62,(x,z,h)=>h>.28&&h<.72&&z>-3.95&&clearDetail(x,z,.12),(x,z)=>grass(x,z,.11+random()*.16));
    place(19,(x,z,h)=>h>.46&&z<-2.5&&clearDetail(x,z,.25),(x,z)=>broadleaf(x,z,.37+random()*.21));
    place(5,(x,z,h)=>h>.32&&z<-2&&clearDetail(x,z,.32),(x,z)=>palm(x,z,.61+random()*.21));
    place(19,(x,z,h)=>h>.33&&h<.66&&clearDetail(x,z,.15),(x,z)=>shrub(x,z,.12+random()*.10));
    landmarks.push({label:'绵长金沙与低沙丘',pos:[-.7,.58,-2.3],detail:'受黄金海岸启发的长直岸线；海风越过滨海草与柔金色沙面。'});
  }else if(def.id==='jeju'){
    place(48,(x,z,h)=>h>-.27&&h<.34&&(x>1.2||x<-3.4)&&clearDetail(x,z,.12),(x,z)=>rock(x,z,.09+random()*.16));
    place(24,(x,z,h)=>h>.40&&z<-2.4&&clearDetail(x,z,.2),(x,z)=>broadleaf(x,z,.36+random()*.22));
    place(38,(x,z,h)=>h>.30&&h<1.6&&clearDetail(x,z,.13),(x,z)=>shrub(x,z,.11+random()*.14));
    place(16,(x,z,h)=>Math.hypot(x-3.15,z-1.1)<.85&&h>.35,(x,z)=>grass(x,z,.07+random()*.10));
    landmarks.push({label:'飞扬岛',pos:[3.15,height(3.15,1.1)+.16,1.1],detail:'以挟才远望的离岸火山岛为灵感，圆润锥体与黑色岸缘构成海上剪影。'},{label:'挟才白沙与玄武岩',pos:[-1.7,.21,-.85],detail:'贝壳质浅色沙岸被黑色火山岩抱住，向外过渡到翡翠色浅海。'});
  }else if(def.id==='rinku'){
    place(12,(x,z,h)=>h>.48&&z<-3.0&&clearDetail(x,z,.23),(x,z)=>pine(x,z,.41+random()*.20));
    place(10,(x,z,h)=>h>.45&&z<-3.1&&clearDetail(x,z,.22),(x,z)=>broadleaf(x,z,.35+random()*.16));
    place(24,(x,z,h)=>h>.32&&h<.57&&z<-1.7&&clearDetail(x,z,.12),(x,z)=>shrub(x,z,.10+random()*.08));
    // Pale, round pebbles give Marble Beach a visibly different grain from a sand beach.
    place(78,(x,z,h)=>h>-.10&&h<.30&&z<.0&&clearDetail(x,z,.08),(x,z,h)=>{
      for(let j=0;j<4;j++){const a=random()*6.28,r=random()*.13,xx=x+Math.cos(a)*r,zz=z+Math.sin(a)*r,sz=.026+random()*.022;orb(xx,height(xx,zz)+sz*.25,zz,sz,sz*.43,sz*.82,j%2?'#e4e7df':'#f1f0e4',6,3,0,.04);}coastalMetrics.pebbleGroups++;
    });
    landmarks.push({label:'Marble Beach 白色石砾',pos:[.0,.22,-1.6],detail:'这里是白色大理石圆砾构成的人工海滩；近看能分辨石砾，而非细沙。'});
  }else if(def.id==='joetsu'){
    place(34,(x,z,h)=>h>1.12&&z<-3.55&&slopeAt(x,z)<1.55&&clearDetail(x,z,.20),(x,z)=>pine(x,z,.49+random()*.26));
    place(27,(x,z,h)=>h>.65&&z<-3&&slopeAt(x,z)<1.15&&clearDetail(x,z,.22),(x,z)=>broadleaf(x,z,.43+random()*.23));
    place(25,(x,z,h)=>h>.36&&h<1.9&&clearDetail(x,z,.15),(x,z)=>shrub(x,z,.12+random()*.13));
    place(25,(x,z,h)=>h>-.25&&h<.27&&clearDetail(x,z,.12),(x,z)=>rock(x,z,.035+random()*.055));
    landmarks.push({label:'谷浜山海',pos:[-2.8,height(-2.8,-4.5)+.25,-4.5],detail:'山地靠近日本海，村落与沿岸铁路在山海之间留出一条细长的生活带。'});
  }else{
    place(39,(x,z,h)=>h>.5&&slopeAt(x,z)<1.4,(x,z)=>broadleaf(x,z,.45+random()*.37));
    place(16,(x,z,h)=>h>.08&&h<.62&&slopeAt(x,z)<.75,(x,z)=>palm(x,z,.58+random()*.35));
    place(38,(x,z,h)=>h>.25&&h<2,(x,z)=>shrub(x,z,.15+random()*.16));
    place(22,(x,z,h)=>h>-.35&&h<.12,(x,z)=>rock(x,z,.12+random()*.22));
    house(-2.8,-.75,.43,.15,'#b4a079');boardwalk([[-3.8,-.8],[-4.1,.0],[-4.0,.5]],.18);sailboat(4.25,1.6,.36,.6);
    landmarks.push({label:'椰影白沙',pos:[-2.6,.65,.7],detail:'椰树沿温暖海湾生长，白沙连接热带植被。'},{label:'浅海珊瑚花园',pos:[2.2,-.25,2.05],detail:'清澈水体下的枝状珊瑚、团状珊瑚与热带鱼群。'});
  }
  const tropical=def.id==='sanya',southern=tropical||def.id==='xiamen';
  // A few modest objects establish human scale without filling the coast with props.
  addCoastalObject((x,z,h)=>h>.06&&h<.24,(x,z)=>driftwood(x,z,.42),.32);
  addCoastalObject((x,z,h)=>h>.08&&h<.3,(x,z)=>driftwood(x,z,.27),.24);
  if(def.id==='qingdao'){
    addCoastalObject((x,z,h)=>h>.1&&h<.35,(x,z)=>fishingGear(x,z),.42);
    addCoastalObject((x,z,h)=>h>.02&&h<.2,(x,z)=>spiralShell(x,z,.115),.17);
  }else if(def.id==='dalian'){
    place(7,(x,z,h)=>h<-.6&&h>-1.25&&(x>1||x<-1),(x,z,h)=>{
      const a=random()*6.28,xx=Math.cos(a),zz=Math.sin(a),s=.06+random()*.025;
      for(let j=0;j<4;j++)orb(x+(j-1.5)*s*.55*xx,h+.04,z+(j-1.5)*s*.55*zz,s*.46,s*.36,s*.46,j%2?'#626a4d':'#798264',6,3);
      for(let j=0;j<5;j++){const q=(j-2)*s*.37;tri([x+q*xx-.012,h+.065,z+q*zz],[x+q*xx+.012,h+.065,z+q*zz],[x+q*xx,h+.092,z+q*zz],'#8f9873');}smallDetailCount++;
    });
    place(6,(x,z,h)=>h>-.32&&h<.04,(x,z,h)=>{const y=h+.015;for(let k=0;k<3;k++){const a=k*2.4;quad([x,y,z],[x+.022,y,z],[x+Math.cos(a)*.21,y+.01,z+Math.sin(a)*.21],[x+Math.cos(a)*.2-.02,y+.01,z+Math.sin(a)*.2],'#667c49');}smallDetailCount++;});
  }else if(def.id==='xiamen'){
    addCoastalObject((x,z,h)=>h>.025&&h<.15,(x,z)=>smallBoat(x,z,.61),.65);
    addCoastalObject((x,z,h)=>h>.12&&h<.3,(x,z,h)=>{ropeCoil(x,h+.025,z,.12);fishingGear(x+.21,z);},.48);
  }else if(def.id==='beihai'){
    addCoastalObject((x,z,h)=>h>.12&&h<.29,(x,z)=>umbrella(x,z,.52),.48);
    addCoastalObject((x,z,h)=>h>.08&&h<.2,(x,z,h)=>{shell(x-.06,z,.14);shell(x+.07,z-.015,.12);orb(x-.015,h+.038,z+.012,.018,.018,.018,'#f4efd7',7,4);},.27);
  }else if(def.id==='sanya'){
    addCoastalObject((x,z,h)=>h>.09&&h<.3,(x,z)=>umbrella(x,z,.48),.48);
    addCoastalObject((x,z,h)=>h>.07&&h<.25,(x,z,h)=>{for(let j=0;j<3;j++)orb(x+(j-1)*.075,h+.045,z+Math.sin(j*2)*.05,.052,.046,.046,j%2?'#a18b57':'#7e8150',8,4);smallDetailCount++;},.25);
  }else if(def.id==='goldcoast'){
    addCoastalObject((x,z,h)=>h>.13&&h<.31,(x,z)=>umbrella(x,z,.43),.42);
    addCoastalObject((x,z,h)=>h>.06&&h<.21,(x,z)=>spiralShell(x,z,.075),.18);
  }else if(def.id==='jeju'){
    addCoastalObject((x,z,h)=>h>.07&&h<.27&&x<-1.1,(x,z)=>fishingGear(x,z),.42);
    addCoastalObject((x,z,h)=>h>.025&&h<.18&&x<1.1,(x,z)=>{shell(x-.05,z,.09);shell(x+.065,z,.07);},.22);
  }else if(def.id==='rinku'){
    addCoastalObject((x,z,h)=>h>.04&&h<.23&&z<0,(x,z)=>shell(x,z,.055),.14);
  }else if(def.id==='joetsu'){
    addCoastalObject((x,z,h)=>h>.08&&h<.28,(x,z)=>fishingGear(x,z),.40);
    addCoastalObject((x,z,h)=>h>.04&&h<.17,(x,z)=>smallBoat(x,z,.40),.44);
  }
  if(tropical){
    // Three loose groves leave gaps of white sand for the moving palm shadows.
    for(const center of [[-3.9,-1.4],[-1.7,.45],[.65,-1.05]]){let count=0;for(let j=0;j<55&&count<3;j++){const a=random()*6.28,r=.12+random()*.44,x=center[0]+Math.cos(a)*r,z=center[1]+Math.sin(a)*r,h=height(x,z);if(h>.1&&h<.77&&slopeAt(x,z)<.78&&clearDetail(x,z,.1)){palm(x,z,.68+random()*.22);count++;}}if(count)coastalMetrics.palmGroves++;}
  }
  for(const pool of tidePools)for(let j=0;j<5;j++){const a=j/5*Math.PI*2;rock(pool[0]+Math.cos(a)*pool[2]*.88,pool[1]+Math.sin(a)*pool[2]*.7,.045+random()*.035);}
  place(def.id==='beihai'?23:36,(x,z,h)=>h>-.18&&h<.25&&clearDetail(x,z,.06),(x,z)=>rock(x,z,.015+random()*.027));
  place(def.id==='beihai'?10:14,(x,z,h)=>h>-.18&&h<.19&&clearDetail(x,z,.14),(x,z)=>pebbleCluster(x,z,.022+random()*.017));
  place(def.id==='qingdao'||def.id==='dalian'?12:7,(x,z,h)=>h>-.25&&h<.09&&clearDetail(x,z,.13),(x,z)=>tideAlgae(x,z,.065+random()*.075));
  place(6,(x,z,h)=>h>.015&&h<.19&&clearDetail(x,z,.13),(x,z)=>{for(let j=0;j<3;j++){const xx=x+(random()-.5)*.16,zz=z+(random()-.5)*.16;shell(xx,zz,.026+random()*.022);}coastalMetrics.shellGroups++;smallDetailCount++;});
  place(42,(x,z,h)=>h>.02&&h<.3&&clearDetail(x,z,.05),(x,z)=>shell(x,z,.026+random()*.028));
  place(6,(x,z,h)=>h>.03&&h<.2&&clearDetail(x,z,.11),(x,z)=>crab(x,z,.055+random()*.025));
  place(def.id==='beihai'?25:35,(x,z,h)=>h>.24&&h<1.3&&slopeAt(x,z)<.7&&clearDetail(x,z,.09),(x,z)=>grass(x,z,.075+random()*.1));
  place(tropical?39:22,(x,z,h)=>h<-.3&&h>-1.7,(x,z,h)=>grass(x,z,.16+random()*.25,true));
  place(tropical?27:southern?13:8,(x,z,h)=>h<-.35&&h>-1.6,(x,z)=>coral(x,z,.13+random()*(tropical?.24:.12)));
  place(tropical?6:4,(x,z,h)=>h<-.75&&h>-1.8,(x,z)=>spongeGarden(x,z,.07+random()*.045));
  place(18,(x,z,h)=>h<-.08&&h>-1.7,(x,z)=>star(x,z,.065+random()*.065));
  place(30,(x,z,h)=>h<.15&&h>-1.6,(x,z)=>shell(x,z,.04+random()*.06));
  // Each fish is one rigid animated mesh: every vertex shares phase and swim amplitude.
  // Sample the whole orbit plus body radius against terrain and conservative low tide.
  const fishHubs=[],fishPaths=[];
  const preferredHubs=({qingdao:[[-3.6,2.25],[.0,3.65],[3.4,2.25]],dalian:[[-3.4,1.45],[0,3.5],[3.5,2.0]],xiamen:[[.15,3.85],[2.3,4.75],[4.6,3.7]],beihai:[[-3.3,4.95],[.0,4.95],[3.4,5.0]],sanya:[[-3.3,2.4],[.25,3.4],[3.8,2.75]],goldcoast:[[-3.5,3.15],[0,4.1],[3.5,3.35]],jeju:[[-3.5,3.0],[-.2,3.9],[3.9,4.0]],rinku:[[-3.6,3.8],[.0,3.5],[3.4,2.8]],joetsu:[[-3.5,2.8],[.0,3.8],[3.5,2.9]]})[def.id]||[[-3.5,3.5],[0,4.1],[3.5,3.5]];
  // Look for three different clear windows through the water, with no fish underneath land.
  for(const preferred of preferredHubs){
    for(let j=0;j<400;j++){const radius=j<120?.5:1.25,a=random()*6.28,r=random()*radius,x=preferred[0]+Math.cos(a)*r,z=preferred[1]+Math.sin(a)*r;
      if(Math.abs(x)>4.9||z<1.0||z>5.0||fishHubs.some(p=>Math.hypot(x-p[0],z-p[1])<1.65))continue;
      let bed=-Infinity;for(let ix=-2;ix<=2;ix++)for(let iz=-2;iz<=2;iz++)bed=Math.max(bed,height(x+ix*.3,z+iz*.26));
      if(bed<(def.id==='beihai'?-.79:-.99)){fishHubs.push([x,z]);break;}
    }
  }
  const fishTarget=tropical?24:21,perSchool=tropical?8:7;
  for(let school=0;school<fishHubs.length;school++){
    const hub=fishHubs[school],schoolPhase=random()*Math.PI*2,angle=.12+school*.13;
    let made=0;
    for(let j=0;j<420&&made<perSchool;j++){
      const x=hub[0]+(random()-.5)*1.10,z=hub[1]+(random()-.5)*.88,s=.112+random()*(tropical?.053:.042),amp=.13+random()*.07;
      if(Math.abs(x)>5.2||z>5.2||z<.9||fishPaths.some(p=>Math.hypot(x-p[0],z-p[1])<.17))continue;
      const radius=amp+s*1.18;let highest=-Infinity;
      // Cover the full swept body box, not just its center orbit.
      for(let ix=-3;ix<=3;ix++)for(let iz=-3;iz<=3;iz++)highest=Math.max(highest,height(x+ix/3*radius,z+iz/3*(amp*.6+s*1.18)));
      const surfaceLimit=-def.tideAmplitude-.14-.035-s*.37-.065;
      const y=Math.max(-.77,highest+.23+.035+s*.37);
      if(y>surfaceLimit)continue;
      const phase=schoolPhase+made*.17+(random()-.5)*.045;
      fish(x,y,z,s,angle,{phase,amplitude:amp,school});fishPaths.push([x,z]);made++;
    }
  }
  // Face-on specimen shells in the limestone, and a few tidal boulders below the surface.
  place(9,(x,z,h)=>h<-.55&&h>-1.75,(x,z)=>rock(x,z,.10+random()*.15));
  return {data:new Float32Array(Geo.data),height,landmarks,stats:{vertices:Geo.data.length/12,triangles:Geo.data.length/36,landPercent:Math.round(land/grid.length*100),maxElevation:+maxElevation.toFixed(2),minElevation:+minElevation.toFixed(2),plants:plantCount,rocks:rockCount,corals:coralCount,fish:fishCount,fishPaths:fishMotion,shells:shellCount,coastalDetails:smallDetailCount,coastalClusters:coastalMetrics,cityDetails,fishSchools:fishHubs.length,fishTarget,tidePools:tidePools.length,localNote:def.localNote,habitat:def.habitat,terrain:def.terrainLabel,scale:'艺术化地形 · 非实测',seed:def.seed}};
}
