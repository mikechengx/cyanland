// Cyanland — procedural geometry, no external assets or libraries.
const C$=id=>document.getElementById(id);
const cClamp=(n,a,b)=>Math.max(a,Math.min(b,n)),cMix=(a,b,t)=>a+(b-a)*t;
const CV={sub:(a,b)=>a.map((v,i)=>v-b[i]),cross:(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],norm:a=>{const n=Math.hypot(...a)||1;return a.map(x=>x/n)},dot:(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0)};
const CM={mul:(a,b)=>{const o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let k=0;k<4;k++)o[c*4+r]+=a[k*4+r]*b[c*4+k];return o},look:(eye,target)=>{const z=CV.norm(CV.sub(eye,target)),x=CV.norm(CV.cross([0,1,0],z)),y=CV.cross(z,x);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-CV.dot(x,eye),-CV.dot(y,eye),-CV.dot(z,eye),1])},ortho:(l,r,b,t,n,f)=>new Float32Array([2/(r-l),0,0,0,0,2/(t-b),0,0,0,0,1/(n-f),0,(l+r)/(l-r),(t+b)/(b-t),n/(n-f),1])};
const colorCache=new Map();
const Geo={data:[],color(c){if(Array.isArray(c)||ArrayBuffer.isView(c))return c;if(!colorCache.has(c)){let n=parseInt(c.replace('#',''),16);colorCache.set(c,[((n>>16)&255)/255,((n>>8)&255)/255,(n&255)/255]);}return colorCache.get(c);},
tri(a,b,c,col,kind=0,aux=[0,0],normals){const color=this.color(col),n=CV.norm(CV.cross(CV.sub(b,a),CV.sub(c,a)));[a,b,c].forEach((p,i)=>this.data.push(...p,...(normals?.[i]||n),...color,kind,...aux));},
quad(a,b,c,d,col,kind=0,aux=[0,0]){this.tri(a,b,c,col,kind,aux);this.tri(a,c,d,col,kind,aux);},
box(x,y,z,w,h,d,col,rot=0){const p=[];for(let i=0;i<8;i++){let a=(i&1?1:-1)*w/2,b=(i&2?1:-1)*h/2,c=(i&4?1:-1)*d/2;p.push([x+a*Math.cos(rot)+c*Math.sin(rot),y+b,z-a*Math.sin(rot)+c*Math.cos(rot)]);}for(const f of [[0,4,6,2],[1,3,7,5],[0,1,5,4],[2,6,7,3],[0,2,3,1],[4,5,7,6]])this.quad(...f.map(i=>p[i]),col);},
sphere(x,y,z,rx,ry,rz,col,segments=8,rings=5,kind=0){for(let j=0;j<rings;j++)for(let i=0;i<segments;i++){const at=(u,v)=>[x+rx*Math.sin(v)*Math.cos(u),y+ry*Math.cos(v),z+rz*Math.sin(v)*Math.sin(u)],a=i/segments*Math.PI*2,b=(i+1)/segments*Math.PI*2,v=j/rings*Math.PI,w=(j+1)/rings*Math.PI;const p=[at(a,v),at(a,w),at(b,w),at(b,v)],ns=p.map(q=>CV.norm([(q[0]-x)/(rx*rx),(q[1]-y)/(ry*ry),(q[2]-z)/(rz*rz)]));this.tri(p[0],p[1],p[2],col,kind,[0,0],[ns[0],ns[1],ns[2]]);this.tri(p[0],p[2],p[3],col,kind,[0,0],[ns[0],ns[2],ns[3]]);}},
beam(a,b,r,col,sides=6,kind=0){const d=CV.norm(CV.sub(b,a)),u=CV.norm(CV.cross(d,Math.abs(d[1])>.9?[1,0,0]:[0,1,0])),v=CV.cross(d,u),at=(p,t)=>p.map((q,j)=>q+r*(u[j]*Math.cos(t)+v[j]*Math.sin(t)));for(let i=0;i<sides;i++)this.quad(at(a,i/sides*Math.PI*2),at(b,i/sides*Math.PI*2),at(b,(i+1)/sides*Math.PI*2),at(a,(i+1)/sides*Math.PI*2),col,kind);},
cylinder(x,y,z,r0,r1,h,col,sides=10,kind=0){for(let i=0;i<sides;i++){const a=i/sides*Math.PI*2,b=(i+1)/sides*Math.PI*2,p=[x+r0*Math.cos(a),y-h/2,z+r0*Math.sin(a)],q=[x+r0*Math.cos(b),y-h/2,z+r0*Math.sin(b)],r=[x+r1*Math.cos(b),y+h/2,z+r1*Math.sin(b)],s=[x+r1*Math.cos(a),y+h/2,z+r1*Math.sin(a)];this.quad(p,s,r,q,col,kind);if(r0>0)this.tri([x,y-h/2,z],p,q,col,kind);if(r1>0)this.tri([x,y+h/2,z],r,s,col,kind);}}
};
function buildWater(height){
 const saved=Geo.data;Geo.data=[];const n=92,s=12/n;
 for(let j=0;j<n;j++)for(let i=0;i<n;i++){const x=-6+i*s,z=-6+j*s,p=[[x,0,z],[x,0,z+s],[x+s,0,z+s],[x+s,0,z]];for(const idx of [[0,1,2],[0,2,3]])for(const k of idx){const q=p[k];Geo.data.push(...q,0,1,0,.25,.7,.69,1,height(q[0],q[2]),0);}}
 const surface=new Float32Array(Geo.data);Geo.data=[];const walls=[];
 for(let side=0;side<4;side++){Geo.data=[];for(let i=0;i<64;i++)for(let j=0;j<14;j++){const a=-6+i*12/64,b=a+12/64,y=-3.8+j*3.8/14,yy=y+3.8/14,at=(u,v)=>side===0?[u,v,6]:side===1?[6,v,-u]:side===2?[-u,v,-6]:[-6,v,u];const points=[at(a,y),at(b,y),at(b,yy),at(a,yy)];for(const idx of [[0,1,2],[0,2,3]])for(const k of idx){const q=points[k],nn=[[0,0,1],[1,0,0],[0,0,-1],[-1,0,0]][side];Geo.data.push(...q,...nn,.24,.74,.7,2,height(q[0],q[2]),(q[1]+3.8)/3.8);}}walls.push(new Float32Array(Geo.data));}
 Geo.data=[];for(let side=0;side<4;side++){const at=u=>side===0?[u,0,6]:side===1?[6,0,-u]:side===2?[-u,0,-6]:[-6,0,u];for(let i=0;i<64;i++)Geo.beam(at(-6+i*12/64),at(-6+(i+1)*12/64),.011,'#d9f7e5',4,7);}
 const rim=new Float32Array(Geo.data);Geo.data=saved;return {surface,walls,rim};
}
