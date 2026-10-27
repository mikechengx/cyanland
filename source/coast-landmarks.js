/* Cyanland • small, locally generated coastal landmarks.
   Geographic details are artistic studies at a deliberately compressed scale. */
window.CyanCoastalDetails = (() => {
  function add(c) {
    const {def,height,random,color,tint,tri,quad,box,beam,orb,pine,palm,house,boardwalk,landmarks,detailReservations=[]} = c;
    const supported=['goldcoast','jeju','rinku','joetsu'];
    if(!supported.includes(def.id)) return {};
    const metric={city:def.id,buildings:0,towers:0,boats:0,flags:0,stoneWalls:0,trees:0,details:0,warmWindows:0};
    const mix=(a,b,t)=>a+(b-a)*t;
    const reserve=(x,z,r=.5)=>detailReservations.push([x,z,r]);
    const label=(text,x,y,z,detail)=>landmarks.push({label:text,pos:[x,y,z],detail});
    const ground=(x,z)=>height(x,z)+.015;
    const local=(x,y,z,a=0)=>(u,v,w)=>[x+u*Math.cos(a)-w*Math.sin(a),y+v,z+u*Math.sin(a)+w*Math.cos(a)];
    function flatPaving(points,width=.35,shade='#c6c6b3') {
      for(let j=0;j<points.length-1;j++){
        const a=points[j],b=points[j+1],len=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.max(1,Math.ceil(len/.15)),angle=Math.atan2(b[0]-a[0],b[1]-a[1]);
        for(let k=0;k<n;k++){
          const t=(k+.5)/n,x=mix(a[0],b[0],t),z=mix(a[1],b[1],t),y=ground(x,z);
          box(x,y,z,width,.018,len/n*.99,shade,-angle);reserve(x,z,width*.64);
        }
      }
    }
    function bench(x,z,a=0) {
      const y=ground(x,z),p=local(x,y,z,a);
      for(const u of[-.11,.11])beam(p(u,0,0),p(u,.1,0),.012,'#727d73',4);
      for(const w of[-.045,0,.045]){const q=p(0,.11,w);box(q[0],q[1],q[2],.32,.018,.035,'#b2a080',a);}
      for(const v of[.17,.21])beam(p(-.16,v,-.065),p(.16,v,-.065),.009,'#b2a080',4);metric.details++;
    }
    function person(x,z,s=.13,shirt='#d5bf8d',a=0) {
      const y=ground(x,z),p=local(x,y,z,a),head=p(0,s*.84,0);
      orb(head[0],head[1],head[2],s*.13,s*.15,s*.13,'#d8b99c',5,3);
      beam(p(0,s*.38,0),p(0,s*.7,0),s*.16,shirt,5,0,s*.18);
      for(const d of[-1,1]){beam(p(d*s*.08,s*.4,0),p(d*s*.11,0,d*s*.05),s*.045,'#667376',4);beam(p(d*s*.18,s*.64,0),p(d*s*.26,s*.39,0),s*.035,'#d8b99c',4);}metric.details++;
    }
    function modernTower(x,z,w,d,h,floors,shade='#b2cccb',style=0) {
      const y=ground(x,z),stone='#d5d2ba',glass=color(shade);
      box(x,y-.04,z,w+.12,.10,d+.12,stone);
      box(x,y+.04,z,w*.72,h,d*.75,tint(glass,[.26,.43,.45],.24));
      const step=h/floors;
      for(let j=0;j<floors;j++){
        const yy=y+.08+j*step,shrink=style===1?1-.13*Math.pow(j/floors,3):1;
        box(x,yy,z,w*shrink,step*.71,d*shrink,tint(glass,[.75,.84,.77],j%3===0?.14:.02));
        box(x,yy+step*.76,z,w*shrink+.07,.027,d*shrink+.08,stone);
        for(const side of[-1,1]){
          const zz=z+side*(d*shrink*.5+.043),cy=yy+step*.76;
          quad([x-w*shrink*.47,cy+.05,zz],[x+w*shrink*.47,cy+.05,zz],[x+w*shrink*.47,cy+.06,zz],[x-w*shrink*.47,cy+.06,zz],'#cbd5c9');
          for(const xx of[-.29,0,.29]){
            const px=x+w*shrink*xx;
            quad([px-.004,cy,zz],[px+.004,cy,zz],[px+.004,cy+.06,zz],[px-.004,cy+.06,zz],'#e5e1ca');
          }
        }
        // The pale mullions break the glass into slender, legible bays.
        for(const xx of[-.25,.25]){
          const px=x+w*xx,zz=z+d*.501;
          quad([px-.008,yy+.02,zz],[px+.008,yy+.02,zz],[px+.008,yy+step*.67,zz],[px-.008,yy+step*.67,zz],'#d6dccb');
        }
        // A few occupied rooms, rather than a uniformly illuminated facade.
        // Kind 5 uses the same restrained day / warm night material as the beacons.
        if(j%3===1){
          const front=z+d*shrink*.5+.004,low=yy+step*.19,high=yy+step*.54;
          const bays=(j+Math.round(x*10))%2===0?[-.38,.12]:[-.12,.38];
          for(const bay of bays){
            const left=x+w*shrink*(bay-.065),right=x+w*shrink*(bay+.065);
            quad([left,low,front],[right,low,front],[right,high,front],[left,high,front],j%6===1?'#e7c588':'#d8b779',5);
            metric.warmWindows++;
          }
          if(j%6===1){
            const side=x+w*shrink*.5+.004,near=z+d*shrink*.10,far=z+d*shrink*.28;
            quad([side,low,far],[side,low,near],[side,high,near],[side,high,far],'#dfbd7d',5);metric.warmWindows++;
          }
        }
      }
      box(x,y+h+.1,z,w*.74,.11,d*.74,stone);
      if(style===1){beam([x,y+h+.20,z],[x,y+h+.64,z],w*.18,'#b7c8c0',7,0,.006);beam([x,y+h+.6,z],[x,y+h+.85,z],.006,'#b5c9c0',4);}
      metric.towers++;metric.buildings++;reserve(x,z,Math.hypot(w,d)*.58+.10);return y+h+.2;
    }
    function flag(x,z,s=.5,scheme='rescue') {
      const y=ground(x,z),top=[x,y+s,z];beam([x,y,z],top,.009,'#d3d1bb',5);
      if(scheme==='rescue'){
        quad(top,[x+.22*s,y+s-.025,z+.018],[x+.22*s,y+s-.13,z+.018],[x,y+s-.105,z],'#d2aa4f');
        quad([x,y+s-.105,z],[x+.22*s,y+s-.13,z+.018],[x+.22*s,y+s-.23,z+.018],[x,y+s-.21,z],'#bd6551');
      }else tri(top,[x+.17*s,y+s-.045,z+.015],[x,y+s-.16,z],'#c67253');
      metric.flags++;
    }
    function surfboard(x,z,s=.42,a=-.25,shade='#dfbb74',standing=false) {
      const y=ground(x,z),p=local(x,y,z,a),points=[];
      for(let j=0;j<12;j++){const t=j/12*Math.PI*2,u=Math.sin(t)*s*.13,v=Math.cos(t)*s*.5;points.push(standing?p(u,v+s*.5,.015*Math.sin(t)):p(u,.025,v));}
      const center=standing?p(0,s*.5,0):p(0,.028,0);
      for(let j=0;j<12;j++)tri(center,points[(j+1)%12],points[j],j%3===0?'#f1e8d0':shade);
      const tip=standing?p(0,s*.9,.015):p(0,.033,s*.4),end=standing?p(0,s*.1,.015):p(0,.033,-s*.4);beam(end,tip,.006,'#f4e7cd',4);metric.details++;
    }
    function rescueTower(x,z) {
      const y=ground(x,z),p=local(x,y,z,-.08);
      for(const u of[-.22,.22])for(const w of[-.18,.18])beam(p(u,0,w),p(u*.83,.68,w*.83),.019,'#ac9270',5);
      box(x,y+.65,z,.54,.045,.45,'#c8bb96',-.08);box(x,y+.7,z,.42,.27,.35,'#e3d6b4',-.08);
      quad(p(-.20,.83,.177),p(.20,.83,.177),p(.20,.96,.177),p(-.20,.96,.177),'#5e9fa1');
      box(x,y+1.02,z,.68,.035,.59,'#c2b38a',-.08);
      for(let k=0;k<6;k++)beam(p(-.19,.1+k*.1,.26),p(.02,.1+k*.1,.26),.008,'#aa936e',4);
      for(const u of[-.22,.05])beam(p(u,0,.28),p(u,.68,.21),.011,'#aa936e',4);
      flag(x+.43,z,.67);metric.buildings++;reserve(x,z,.6);
    }
    function stoneCottage(x,z,s=.65,a=0,cafe=false) {
      const y=ground(x,z),p=local(x,y,z,a),w=s,d=s*.76,h=s*.43;
      box(x,y-.03,z,w+.08,.07,d+.08,'#7e8173',a);box(x,y,z,w,h,d,cafe?'#e8e3ce':'#a5a99a',a);
      for(let row=0;row<3;row++)for(let j=0;j<6;j++){
        const u=(j-2.5)*w/6+(row%2?w/24:0),q=p(u,.04+row*h*.28,d*.503);
        box(q[0],q[1],q[2],w*.14,h*.20,.018,j%3===0?'#68766f':'#7f897b',a);
      }
      if(cafe){
        quad(p(-w*.42,.06,d*.52),p(w*.42,.06,d*.52),p(w*.42,h*.90,d*.52),p(-w*.42,h*.90,d*.52),'#5d8e86');
        for(const xx of[-.22,.22])beam(p(xx*w,.06,d*.53),p(xx*w,h*.9,d*.53),.009,'#d5d2b9',4);
        box(x,y+h+.025,z,w+.13,.065,d+.13,'#4f665f',a);
        const q=p(0,.05,d*.85);box(q[0],q[1],q[2],w*1.35,.035,d*.55,'#ad9c7d',a);
        for(const u of[-w*.35,w*.3]){const q=p(u,.18,d*.83);beam(p(u,.05,d*.83),q,.012,'#7f826e',5);orb(q[0],q[1],q[2],s*.12,.018,s*.12,'#d2c6a1',8,3);}
      }else{
        const ridgeA=p(-w*.56,h+s*.21,0),ridgeB=p(w*.56,h+s*.21,0);
        quad(p(-w*.57,h,d*.60),p(w*.57,h,d*.60),ridgeB,ridgeA,'#58675e');
        quad(ridgeA,ridgeB,p(w*.57,h,-d*.60),p(-w*.57,h,-d*.60),'#657267');
        for(let j=-4;j<=4;j++){const u=j*w/8;beam(p(u,h+.008,d*.60),p(u,h+s*.21+.008,0),.008,'#738075',4);beam(p(u,h+s*.21+.008,0),p(u,h+.008,-d*.60),.008,'#738075',4);}
      }
      metric.buildings++;reserve(x,z,s*.9);
    }
    function stoneWall(points) {
      for(let k=0;k<points.length-1;k++){
        const a=points[k],b=points[k+1],len=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.ceil(len/.16);
        for(let j=0;j<n;j++)for(let row=0;row<2;row++){
          const t=Math.min(.99,(j+.35+row*.25)/n),x=mix(a[0],b[0],t),z=mix(a[1],b[1],t),y=ground(x,z);
          orb(x,y+.06+row*.09,z,.09,.062,.075,j%3?'#53695d':'#657668',6,3,0,.14);
        }
        reserve((a[0]+b[0])*.5,(a[1]+b[1])*.5,len*.45+.12);
      }metric.stoneWalls++;
    }
    function dolharubang(x,z,s=.42,a=0) {
      const y=ground(x,z),p=local(x,y,z,a),stone='#748475';
      let q=p(0,s*.26,0);orb(...q,s*.19,s*.27,s*.14,stone,8,4,0,.07);
      q=p(0,s*.64,0);orb(...q,s*.19,s*.23,s*.15,'#81907b',8,4,0,.05);
      q=p(0,s*.83,0);orb(...q,s*.24,s*.075,s*.20,'#63796a',9,3);
      q=p(0,s*.91,0);orb(...q,s*.15,s*.105,s*.14,'#667b6b',8,3);
      q=p(0,s*.65,s*.15);orb(...q,s*.058,s*.105,s*.065,'#92a18a',6,3);
      for(const u of[-1,1]){q=p(u*s*.075,s*.71,s*.145);orb(...q,s*.019,s*.018,s*.012,'#425c51',5,3);beam(p(u*s*.17,s*.36,s*.02),p(u*s*.09,s*.28,s*.15),s*.045,stone,5);}
      beam(p(-s*.08,s*.52,s*.14),p(s*.08,s*.52,s*.14),s*.009,'#506b5c',4);metric.details++;reserve(x,z,s*.5);
    }
    function tangerineTree(x,z,s=.46) {
      const y=ground(x,z);beam([x,y,z],[x,y+s*.47,z],.018,'#8c7e56',5,0,.011);
      orb(x,y+s*.66,z,s*.35,s*.30,s*.30,'#517c43',8,4,3,.08);
      for(let j=0;j<6;j++){
        const a=j*2.4,xx=x+Math.cos(a)*s*.26,zz=z+Math.sin(a)*s*.25;
        orb(xx,y+s*(.56+.20*Math.sin(a*1.3)),zz,s*.044,s*.046,s*.043,'#d7a64b',5,3);
      }metric.trees++;
    }
    function ferrisWheel(x,z,r=.64) {
      const y=ground(x,z),cy=y+r+.21;
      for(const d of[-1,1])for(const zz of[-.12,.12])beam([x+d*r*.51,y,z+zz],[x,cy,z+zz],.028,'#a6bcb5',6);
      for(const zz of[-.09,.09]){
        for(let j=0;j<32;j++){
          const a=j/32*Math.PI*2,b=(j+1)/32*Math.PI*2;
          beam([x+Math.cos(a)*r,cy+Math.sin(a)*r,z+zz],[x+Math.cos(b)*r,cy+Math.sin(b)*r,z+zz],.011,'#c9d5c9',4);
        }
        for(let j=0;j<12;j++){const a=j/12*Math.PI*2;beam([x,cy,z+zz],[x+Math.cos(a)*r,cy+Math.sin(a)*r,z+zz],.007,'#bfcec3',4);}
      }
      for(let j=0;j<12;j++){
        const a=j/12*Math.PI*2,xx=x+Math.cos(a)*r,yy=cy+Math.sin(a)*r-.06;
        beam([xx,yy+.07,z-.09],[xx,yy+.07,z+.09],.009,'#9baea5',4);
        box(xx,yy-.085,z,.103,.13,.15,j%3===0?'#bd8974':j%3===1?'#8ba9a5':'#c9b787');
        box(xx,yy-.07,z+.078,.077,.078,.009,'#4f7c7d');
        box(xx,yy+.04,z,.122,.022,.17,'#d7ddca');
      }
      orb(x,cy,z+.11,.06,.06,.025,'#e0d6ac',8,3);reserve(x,z,r+.18);metric.details++;return cy+r;
    }
    function airportIsland(x,z,w=1.35,d=.65,a=-.18) {
      const y=Math.max(.44,ground(x,z)),p=local(x,y,z,a);
      box(x,y-.20,z,w+.13,.2,d+.13,'#9eaaa0',a);box(x,y,z,w,.027,d,'#a7b5a8',a);
      box(x,y+.03,z,w*.88,.006,d*.33,'#677e7a',a);
      for(let j=-4;j<=4;j++){const q=p(j*w*.085,.043,0);box(q[0],q[1],q[2],w*.043,.004,.009,'#e9e5ca',a);}
      const q=p(0,.05,-d*.35);box(q[0],q[1],q[2],w*.44,.07,d*.18,'#c5d1c4',a);
      for(const u of[-.21,0,.21]){const q=p(u*w,.105,-d*.35);box(q[0],q[1],q[2],w*.1,.016,d*.23,'#bacdc3',a);}
      const tower=p(w*.34,.05,-d*.33);beam(tower,[tower[0],tower[1]+.24,tower[2]],.026,'#c3cdc0',5);box(tower[0],tower[1]+.22,tower[2],.1,.065,.085,'#607e7a',a);
      // A tiny static aircraft is intentionally scenery, not a live flight trace.
      const pp=local(x+w*.13,y+.057,z,a),nose=pp(.15,.015,0),tail=pp(-.15,.015,0);
      beam(tail,nose,.018,'#e2e5d4',7,0,.008);
      quad(pp(-.02,.02,-.19),pp(.065,.02,0),pp(-.02,.02,.19),pp(-.065,.02,0),'#d3ded3');
      tri(pp(-.11,.018,0),pp(-.17,.12,0),pp(-.17,.018,0),'#8ca5a3');
      box(x,y-.035,z,w+.23,.035,d+.2,'#b3bbaa',a);metric.details++;
    }
    function viaduct(points,width=.19,shade='#b8c0af') {
      for(let j=0;j<points.length-1;j++){
        const a=points[j],b=points[j+1],len=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.ceil(len/.19),angle=-Math.atan2(b[0]-a[0],b[1]-a[1]);
        for(let k=0;k<n;k++){
          const t=(k+.5)/n,x=mix(a[0],b[0],t),z=mix(a[1],b[1],t),y=.49;
          box(x,y,z,width,.045,len/n*1.03,shade,angle);
          if(k%3===0){beam([x,Math.max(-.45,height(x,z)),z],[x,y,z],.032,'#9daea3',5);}
          if(k%2===0)for(const side of[-1,1]){
            const nx=Math.cos(angle),nz=Math.sin(angle);beam([x+nx*width*.46,y,z+nz*width*.46],[x+nx*width*.46,y+.07,z+nz*width*.46],.006,'#bdc8b8',4);
          }
        }
      }metric.details++;
    }
    function fishingBoat(x,z,s=.52,a=0) {
      const y=.045,p=local(x,y,z,a),ends=[];
      for(const [u,w]of[[-.5,0],[-.33,.19],[.35,.17],[.55,0],[.35,-.17],[-.33,-.19]])ends.push(p(u*s,.045,w*s));
      const bottom=p(0,-s*.12,0);for(let j=0;j<6;j++)tri(bottom,ends[(j+1)%6],ends[j],j%2?'#d2d8c4':'#8aafaa');
      for(let j=0;j<6;j++)beam(ends[j],ends[(j+1)%6],.009,'#dfe3ce',5);
      const q=p(-s*.13,s*.07,0);box(q[0],q[1],q[2],s*.29,s*.22,s*.25,'#c6d9cc',a);
      const win=p(-s*.13,s*.21,s*.132);box(win[0],win[1],win[2],s*.22,s*.08,.008,'#527f7c',a);
      beam(p(s*.05,.06,0),p(s*.05,s*.64,0),.007,'#9fb4a7',5);beam(p(-s*.30,s*.5,0),p(s*.35,s*.5,0),.007,'#a8b7ab',4);
      for(const w of[-1,1])beam(p(s*.04,s*.6,0),p(-s*.31,.08,s*.15*w),.0035,'#b8c6b4',4);
      orb(...p(s*.29,.08,0),s*.12,.018,s*.12,'#9eaa89',7,3);metric.boats++;
    }
    function harbor(x,z) {
      const a=-.07,p=local(x,0,z,a),shape=[[-.8,-.15],[-.85,.8],[-.5,1.1],[.64,1.1],[.9,.8]];
      for(let j=0;j<shape.length-1;j++){
        const q=shape[j],r=shape[j+1],len=Math.hypot(r[0]-q[0],r[1]-q[1]),n=Math.ceil(len/.16);
        for(let k=0;k<n;k++){
          const t=(k+.5)/n,pp=p(mix(q[0],r[0],t),.13,mix(q[1],r[1],t));
          box(pp[0],-.30,pp[2],.18,.52,.19,k%2?'#aab5a4':'#b9bfae',a);
          if(k%2===0)orb(pp[0]+.05,.04,pp[2]+.1,.12,.11,.1,'#93a69a',6,3);
        }
      }
      const light=p(.87,.27,.81);beam(light,[light[0],.66,light[2]],.03,'#bc7b67',6,0,.022);orb(light[0],.68,light[2],.042,.042,.042,'#e6d4a1',6,3,5);
      for(const u of[-.4,.3]){const q=p(u,.15,-.25);box(q[0],.04,q[2],.12,.16,.65,'#b5bba6',a);}
      for(const [u,w,aa]of[[-.32,.34,.14],[.22,.57,-.06],[.42,.06,.06]]){const q=p(u,0,w);fishingBoat(q[0],q[2],.45,aa);}
      metric.details++;return [light[0],.8,light[2]];
    }
    function railLine(points) {
      for(let j=0;j<points.length-1;j++){
        const a=points[j],b=points[j+1],dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz),nx=-dz/len,nz=dx/len,n=Math.ceil(len/.12);
        for(let k=0;k<n;k++){
          const t=k/n,u=(k+1)/n,x=mix(a[0],b[0],t),z=mix(a[1],b[1],t),xx=mix(a[0],b[0],u),zz=mix(a[1],b[1],u),y=ground(x,z)+.047,yy=ground(xx,zz)+.047;
          box(x,y-.028,z,.20,.035,len/n*1.08,'#8f9581',-Math.atan2(dx,dz));
          beam([x-nx*.085,y,z-nz*.085],[x+nx*.085,y,z+nz*.085],.012,'#827a61',4);
          for(const sign of[-1,1])beam([x+nx*.055*sign,y+.012,z+nz*.055*sign],[xx+nx*.055*sign,yy+.012,zz+nz*.055*sign],.007,'#bcc4b4',4);
          reserve(x,z,.17);
        }
      }metric.details++;
    }
    function littleTrain(x,z,cars=3,a=0) {
      const p=local(x,0,z,a);
      for(let j=0;j<cars;j++){
        const q=p((j-(cars-1)*.5)*.48,0,0),y=ground(q[0],q[2])+.1,pp=local(q[0],y,q[2],a);
        box(q[0],y,q[2],.43,.19,.18,'#d1d9c5',a);box(q[0],y+.038,q[2],.435,.045,.184,'#7b9e9e',a);
        for(const side of[-1,1])for(let k=0;k<4;k++){
          const pt=pp(-.142+k*.095,.105,side*.092);box(pt[0],pt[1],pt[2],.066,.06,.008,'#4d7476',a);
        }
        box(q[0],y+.19,q[2],.44,.029,.19,'#8c9b95',a);
        for(const u of[-.145,.145])for(const s of[-1,1])orb(...pp(u,-.008,s*.08),.026,.026,.012,'#566966',6,3);
        if(j===cars-1)for(const s of[-1,1])orb(...pp(.219,.065,s*.052),.012,.012,.008,'#e6d4a4',5,3,5);
      }metric.details++;
    }

    if(def.id==='goldcoast') {
      const buildings=[[-4.25,-4.47,.45,.43,1.56,8,0],[-3.14,-4.58,.53,.49,2.18,10,0],[-1.95,-4.53,.47,.44,2.80,13,1],[-.77,-4.5,.62,.46,1.67,8,0],[.48,-4.47,.48,.44,2.46,12,0],[1.65,-4.5,.63,.5,1.85,9,0],[2.92,-4.41,.50,.47,2.15,10,0],[4.12,-4.48,.46,.43,1.56,8,0]];
      for(const [x,z,w,d,h,f,style]of buildings)modernTower(x,z,w,d,h,f,style?'#9bb8b6':'#b7cdca',style);
      flatPaving([[-5.1,-3.15],[-2.5,-3.2],[0,-3.16],[2.6,-3.2],[5.1,-3.08]],.34,'#c8c9ad');
      for(const x of[-4.6,-2.9,-.5,1.8,4.1]){bench(x,-3.45);palm(x+.32,-3.51,.59);reserve(x+.32,-3.51,.36);metric.trees++;}
      rescueTower(1.18,-1.68);flag(-2.68,-1.62,.61);flag(-.9,-1.58,.61);
      for(const [x,z,a,col]of[[-2.32,-1.43,-.4,'#d7ad67'],[-1.78,-1.55,.19,'#a9c1b4'],[1.76,-1.91,.11,'#c49078']])surfboard(x,z,.43,a,col);
      for(const [x,z,col]of[[-2,-2.26,'#ceb68a'],[-1.76,-2.32,'#a3bdaf'],[.4,-3.2,'#d1ae84'],[3.42,-3.15,'#b7c6b4']])person(x,z,.18,col);
      label('冲浪者天堂',-1.95,ground(-1.95,-4.53)+3.7,-4.53,'细高的滨海塔楼、层层阳台与步道，构成黄金海岸的微缩天际线。');
      label('红黄旗海滩',-.9,.85,-1.6,'救生瞭望塔与红黄旗点出澳洲海滩尺度；冲浪板静静留在金色沙面上。');
    }else if(def.id==='jeju') {
      stoneCottage(-2.3,-3.45,.70,.08);stoneCottage(-.82,-3.55,.62,-.08);stoneCottage(1.03,-3.53,.82,.02,true);
      stoneWall([[-3.75,-2.88],[-2.4,-2.79],[-1.2,-2.85]]);stoneWall([[-.85,-2.85],[.1,-2.75],[1.73,-2.80],[2.73,-2.75]]);
      stoneWall([[-3.76,-2.9],[-3.96,-3.72],[-3.46,-4.18]]);
      flatPaving([[-3.9,-2.43],[-2.1,-2.45],[-.3,-2.47],[1.8,-2.39],[3.5,-2.5]],.19,'#b9bda2');
      for(const [x,z]of[[-3.10,-3.76],[-1.65,-4.20],[.13,-4.13],[1.95,-4.05]]){tangerineTree(x,z,.49);reserve(x,z,.30);}
      dolharubang(-.12,-2.66,.45,-.08);dolharubang(.33,-2.66,.45,.08);
      bench(2.34,-2.62,-.05);person(.90,-2.45,.16,'#c6ad89');
      label('玄武岩石墙与海边小屋',-1.35,1.04,-3.34,'低矮玄武岩墙围住石屋、咖啡馆与几株橘树，石像只是轻巧的济州点缀。');
      label('挟才海岸',1.4,.64,-1.8,'白色浅滩与黑色玄武岩相邻；离岸的飞扬岛火山丘保留独立轮廓。');
    }else if(def.id==='rinku') {
      const towerTop=modernTower(-1.42,-4.50,.55,.50,2.50,14,'#a4c1bc',0);
      box(-1.42,towerTop-.14,-4.5,.65,.18,.58,'#b6cbc0');beam([-1.42,towerTop+.04,-4.5],[-1.42,towerTop+.31,-4.5],.026,'#d3d7c4',6,0,.003);
      const wheelTop=ferrisWheel(1.33,-4.22,.63);
      flatPaving([[-5,-2.64],[-2.8,-2.62],[-.5,-2.73],[1.9,-2.7],[3.2,-2.81]],.30,'#c5cdba');
      for(const x of[-4.55,-3.50,-2.25,.35,2.62]){pine(x,-3.22,.56);metric.trees++;bench(x+.26,-2.99,.05);reserve(x,-3.22,.38);}
      // The causeway and island are deliberately tiny, keeping the marble strand dominant.
      airportIsland(-3.9,.9,3.03,.63,0);viaduct([[-3.80,-2.00],[-3.75,-1.15],[-3.67,-.28],[-3.60,.59]],.19);
      person(-.22,-2.67,.16,'#c6b89b');person(.02,-2.70,.15,'#9fb9b0');
      label('临空城天际线',-1.42,towerTop+.43,-4.5,'临空 Gate Tower 与微型摩天轮是大阪湾岸的地标意象；比例经过艺术化压缩。');
      label('白色大理石海滩',-1.45,.68,-1.30,'这里是白色圆大理石砾石铺成的 Marble Beach，并非天然的热带白沙滩。');
      label('海上机场岛',-3.9,.78,.9,'小小的人工岛、联络桥与静态飞机，提示海对面的关西国际机场。');
    }else if(def.id==='joetsu') {
      const points=[[-5.13,-3.45],[-3.5,-3.55],[-1.8,-3.51],[0,-3.44],[1.8,-3.45],[3.2,-3.63],[4.65,-3.80]];
      railLine(points);littleTrain(-1.8,-3.51,3,.01);
      for(const [x,z,s,a]of[[-3.73,-2.02,.53,.08],[-2.65,-2.12,.59,-.04],[-1.46,-2.01,.54,.04],[-.32,-2.10,.57,-.04],[.95,-2.14,.51,.02]]){house(x,z,s,a,'#687d76');metric.buildings++;reserve(x,z,s*.82);}
      flatPaving([[-4.2,-1.65],[-2.1,-1.6],[.1,-1.69],[1.36,-1.65]],.16,'#bbc0a9');
      const harborLight=harbor(3.0,-.57);
      for(const [x,z]of[[-4.50,-2.24],[-3.30,-3.65],[.52,-3.75],[2.72,-3.70]]){pine(x,z,.57);metric.trees++;reserve(x,z,.33);}
      person(.37,-1.74,.17,'#9fb9ac');
      label('山麓海岸铁路',-1.8,ground(-1.8,-3.51)+.65,-3.51,'山麓贴着海岸延伸，一列袖珍列车经过灰瓦小村；铁路是地方海岸景观的艺术化意象。');
      label('日本海的小渔港',harborLight[0],harborLight[1],harborLight[2],'短防波堤保护着微型渔船；深蓝近海与日本海山麓构成冷暖层次。');
    }
    return metric;
  }
  return {add};
})();
