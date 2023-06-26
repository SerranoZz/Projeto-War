(()=>{"use strict";var t=1e-6,e="undefined"!=typeof Float32Array?Float32Array:Array;function i(){var t=new e(16);return e!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}function s(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}function r(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function o(t,e){var i=e[0],s=e[1],r=e[2],o=e[3],n=e[4],a=e[5],h=e[6],c=e[7],l=e[8],u=e[9],g=e[10],d=e[11],m=e[12],f=e[13],p=e[14],w=e[15],_=i*a-s*n,v=i*h-r*n,b=i*c-o*n,x=s*h-r*a,y=s*c-o*a,M=r*c-o*h,E=l*f-u*m,T=l*p-g*m,C=l*w-d*m,A=u*p-g*f,P=u*w-d*f,I=g*w-d*p,S=_*I-v*P+b*A+x*C-y*T+M*E;return S?(S=1/S,t[0]=(a*I-h*P+c*A)*S,t[1]=(r*P-s*I-o*A)*S,t[2]=(f*M-p*y+w*x)*S,t[3]=(g*y-u*M-d*x)*S,t[4]=(h*C-n*I-c*T)*S,t[5]=(i*I-r*C+o*T)*S,t[6]=(p*b-m*M-w*v)*S,t[7]=(l*M-g*b+d*v)*S,t[8]=(n*P-a*C+c*E)*S,t[9]=(s*C-i*P-o*E)*S,t[10]=(m*y-f*b+w*_)*S,t[11]=(u*b-l*y-d*_)*S,t[12]=(a*T-n*A-h*E)*S,t[13]=(i*A-s*T+r*E)*S,t[14]=(f*v-m*x-p*_)*S,t[15]=(l*x-u*v+g*_)*S,t):null}function n(t,e,i){var s=e[0],r=e[1],o=e[2],n=e[3],a=e[4],h=e[5],c=e[6],l=e[7],u=e[8],g=e[9],d=e[10],m=e[11],f=e[12],p=e[13],w=e[14],_=e[15],v=i[0],b=i[1],x=i[2],y=i[3];return t[0]=v*s+b*a+x*u+y*f,t[1]=v*r+b*h+x*g+y*p,t[2]=v*o+b*c+x*d+y*w,t[3]=v*n+b*l+x*m+y*_,v=i[4],b=i[5],x=i[6],y=i[7],t[4]=v*s+b*a+x*u+y*f,t[5]=v*r+b*h+x*g+y*p,t[6]=v*o+b*c+x*d+y*w,t[7]=v*n+b*l+x*m+y*_,v=i[8],b=i[9],x=i[10],y=i[11],t[8]=v*s+b*a+x*u+y*f,t[9]=v*r+b*h+x*g+y*p,t[10]=v*o+b*c+x*d+y*w,t[11]=v*n+b*l+x*m+y*_,v=i[12],b=i[13],x=i[14],y=i[15],t[12]=v*s+b*a+x*u+y*f,t[13]=v*r+b*h+x*g+y*p,t[14]=v*o+b*c+x*d+y*w,t[15]=v*n+b*l+x*m+y*_,t}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});var a;class h{static createShader(t,e,i){const s=t.createShader(e);if(t.shaderSource(s,i),t.compileShader(s),!t.getShaderParameter(s,t.COMPILE_STATUS)){const e=t.getShaderInfoLog(s);throw new Error("Shader compilation error: "+e)}return s}static createProgram(t,e,i){const s=t.createProgram();if(t.attachShader(s,e),t.attachShader(s,i),t.linkProgram(s),!t.getProgramParameter(s,t.LINK_STATUS)){const e=t.getProgramInfoLog(s);throw new Error("Could not compile WebGL program:"+e)}return s}static createBuffer(t,e,i){if(0==i.length)return null;if(!(i&&i.buffer instanceof ArrayBuffer&&void 0!==i.byteLength))return console.warn("Data is not an instance of ArrayBuffer"),null;const s=t.createBuffer();return t.bindBuffer(e,s),t.bufferData(e,i,t.STATIC_DRAW),s}static createVAO(t,...e){if(!(t instanceof WebGL2RenderingContext))return;const i=t.createVertexArray();let s,r;t.bindVertexArray(i);for(let i of e)null!=i.loc&&null!=i.loc&&(t.enableVertexAttribArray(i.loc),s=i.dimension,r=t.FLOAT,t.bindBuffer(t.ARRAY_BUFFER,i.buffer),t.vertexAttribPointer(i.loc,s,r,!1,0,0));return i}}class c{_gl;position=[0,0,0];rotation=[0,0,0];scale=[1,1,1];static#t=0;#e=i();#i=[];#s=null;#r=null;_program=null;_primitive;#o;_vaoLoc;#n;#a;#h=!1;useDepthTest=!1;get modelMatrix(){return this.updateModelMatrix(),this.#e}addAttribute(t,e,i=4){if(!(e instanceof Array))throw new Error("The info parameter needs to be a Array.");e.forEach((t=>{if("number"!=typeof t)throw new Error("The info array need to be numeric.")}));const s=e.length/i;if(this.#o){if(s!==this.#o)throw new Error("The VBOs need to contain the same number of vertex.")}else this.#o=s;const r=new Float32Array(e);this.#i.push({loc:this._gl.getAttribLocation(this._program,t),buffer:h.createBuffer(this._gl,this._gl.ARRAY_BUFFER,r),dimension:i}),this.#h=!1}constructor(t,e,i,s){this._primitive=s,this._gl=t,this.#c(e,i)}#c(t,e){this.#s=h.createShader(this._gl,this._gl.VERTEX_SHADER,t),this.#r=h.createShader(this._gl,this._gl.FRAGMENT_SHADER,e),this._program=h.createProgram(this._gl,this.#s,this.#r),this._gl.useProgram(this._program)}#l(){this._vaoLoc=h.createVAO(this._gl,...this.#i)}updateModelMatrix(){var t,e,i,s,o,n,a,h,c,l,u,g,d,m,f,p,w,_;r(this.#e),t=this.#e,e=this.#e,p=(i=this.position)[0],w=i[1],_=i[2],e===t?(t[12]=e[0]*p+e[4]*w+e[8]*_+e[12],t[13]=e[1]*p+e[5]*w+e[9]*_+e[13],t[14]=e[2]*p+e[6]*w+e[10]*_+e[14],t[15]=e[3]*p+e[7]*w+e[11]*_+e[15]):(s=e[0],o=e[1],n=e[2],a=e[3],h=e[4],c=e[5],l=e[6],u=e[7],g=e[8],d=e[9],m=e[10],f=e[11],t[0]=s,t[1]=o,t[2]=n,t[3]=a,t[4]=h,t[5]=c,t[6]=l,t[7]=u,t[8]=g,t[9]=d,t[10]=m,t[11]=f,t[12]=s*p+h*w+g*_+e[12],t[13]=o*p+c*w+d*_+e[13],t[14]=n*p+l*w+m*_+e[14],t[15]=a*p+u*w+f*_+e[15]),function(t,e,i){var s=Math.sin(i),r=Math.cos(i),o=e[4],n=e[5],a=e[6],h=e[7],c=e[8],l=e[9],u=e[10],g=e[11];e!==t&&(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[4]=o*r+c*s,t[5]=n*r+l*s,t[6]=a*r+u*s,t[7]=h*r+g*s,t[8]=c*r-o*s,t[9]=l*r-n*s,t[10]=u*r-a*s,t[11]=g*r-h*s}(this.#e,this.#e,this.rotation[0]),function(t,e,i){var s=Math.sin(i),r=Math.cos(i),o=e[0],n=e[1],a=e[2],h=e[3],c=e[8],l=e[9],u=e[10],g=e[11];e!==t&&(t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=o*r-c*s,t[1]=n*r-l*s,t[2]=a*r-u*s,t[3]=h*r-g*s,t[8]=o*s+c*r,t[9]=n*s+l*r,t[10]=a*s+u*r,t[11]=h*s+g*r}(this.#e,this.#e,this.rotation[1]),function(t,e,i){var s=Math.sin(i),r=Math.cos(i),o=e[0],n=e[1],a=e[2],h=e[3],c=e[4],l=e[5],u=e[6],g=e[7];e!==t&&(t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=o*r+c*s,t[1]=n*r+l*s,t[2]=a*r+u*s,t[3]=h*r+g*s,t[4]=c*r-o*s,t[5]=l*r-n*s,t[6]=u*r-a*s,t[7]=g*r-h*s}(this.#e,this.#e,this.rotation[2]),function(t,e,i){var s=i[0],r=i[1],o=i[2];t[0]=e[0]*s,t[1]=e[1]*s,t[2]=e[2]*s,t[3]=e[3]*s,t[4]=e[4]*r,t[5]=e[5]*r,t[6]=e[6]*r,t[7]=e[7]*r,t[8]=e[8]*o,t[9]=e[9]*o,t[10]=e[10]*o,t[11]=e[11]*o,t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]}(this.#e,this.#e,this.scale)}loadMVP(t){const e=this._gl.getUniformLocation(this._program,"model"),r=this._gl.getUniformLocation(this._program,"modelView"),o=this._gl.getUniformLocation(this._program,"mvp"),a=this._gl.getUniformLocation(this._program,"view"),h=this._gl.getUniformLocation(this._program,"viewProjection"),c=this._gl.getUniformLocation(this._program,"projection");if(e)this._gl.uniformMatrix4fv(e,!1,this.#e);else if(r){const e=i();t?n(e,t.viewMatrix,this.#e):s(e,this.#e),this._gl.uniformMatrix4fv(r,!1,e)}else if(o){const e=i();t?n(e,t.viewProjection,this.#e):s(e,this.#e),this._gl.uniformMatrix4fv(o,!1,e)}a&&this._gl.uniformMatrix4fv(e,!1,t.viewMatrix),c&&this._gl.uniformMatrix4fv(e,!1,t.projMatrix),h&&this._gl.uniformMatrix4fv(e,!1,t.viewProjection)}createTex(t,e){return this.#n=this._gl.getUniformLocation(this._program,e),this.#a=this._gl.createTexture(),this._gl.activeTexture(this._gl[`TEXTURE${c.#t}`]),this._gl.bindTexture(this._gl.TEXTURE_2D,this.#a),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_S,this._gl.CLAMP_TO_EDGE),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_T,this._gl.CLAMP_TO_EDGE),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_MIN_FILTER,this._gl.NEAREST),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_MAG_FILTER,this._gl.NEAREST),this._gl.texImage2D(this._gl.TEXTURE_2D,0,this._gl.RGBA32F,this._gl.RGBA,this._gl.FLOAT,t),this._gl.useProgram(this._program),this._gl.uniform1i(this.#n,c.#t),c.#t++,{tex:this.#a,index:c.#t-1}}setUniformValue(t,e,i){const s=this._gl.getUniformLocation(this._program,t);if(-1===s)throw new Error("This uniform doesn't exist in the shader code.");this._gl.useProgram(this._program),i.startsWith("Matrix")?this._gl["uniform"+i](s,!1,e):this._gl["uniform"+i](s,e)}draw(t){this.#h||(this.#h=!0,this.#l()),this._gl.frontFace(this._gl.CCW),this._gl.enable(this._gl.CULL_FACE),this._gl.cullFace(this._gl.BACK),this.useDepthTest&&(this._gl.enable(this._gl.DEPTH_TEST),this._gl.depthFunc(this._gl.LESS)),this.updateModelMatrix(),this._gl.bindVertexArray(this._vaoLoc),this._gl.useProgram(this._program),this.loadMVP(t),this._gl.drawArrays(this._primitive,0,this.#o),this._gl.disable(this._gl.CULL_FACE),this.useDepthTest&&this.gl.disable(this._gl.DEPTH_TEST)}static changeTex(t,{tex:e,index:i},s){t.bindTexture(t.TEXTURE_2D,e),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,t.RGBA,t.FLOAT,s)}}a=new e(3),e!=Float32Array&&(a[0]=0,a[1]=0,a[2]=0);class l{#u;#g;#d;get width(){return this.#g}get height(){return this.#d}set scaleX(t){if(t<=0)throw new Error("the scale of a image need to be greater than 0");this.#u.scale[0]=t}set scaleY(t){if(t<=0)throw new Error("the scale of a image need to be greater than 0");this.#u.scale[1]=t}set positionX(t){this.#u.position[0]=t}set positionY(t){this.#u.position[1]=t}set depth(t){this.#u.position[2]=t}set rotation(t){this.#u.rotation[2]=t}set scale(t){if(!(t instanceof Array)||2!==t.length)throw new Error("scale need to be a vector with two positions.");this.#u.scale=function(t,i,s){var r=new e(3);return r[0]=t,r[1]=i,r[2]=1,r}(t[0],t[1])}set opacity(t){this.#u.setUniformValue("alpha",t,"1f")}get positionX(){return this.#u.position[0]}get positionY(){return this.#u.position[1]}async init(t,e){this.#u=new c(t,"#version 300 es\n    precision highp float;\n\n    uniform mat4 mvp;\n\n    in vec4 position;\n    in vec2 texCoord;\n\n    out vec2 fTexCoord;\n\n    void main() {\n        gl_Position  = mvp * position;\n        fTexCoord = texCoord;\n    }\n","#version 300 es\n    precision highp float;\n    \n    in vec2 fTexCoord;\n\n    uniform sampler2D uTexture;\n    uniform float alpha;\n\n    out vec4 color;\n\n    void main() {\n        color = texture(uTexture, fTexCoord);\n\n        if(color.a < 0.2) discard;\n\n        color *= alpha;\n    }\n",t.TRIANGLES);const i=await this.#m(e),s=this.#f(...i);this.#u.addAttribute("position",s.coords),this.#u.addAttribute("texCoord",s.texCoords,2),this.opacity=1}static async loadImage(t){return new Promise((e=>{const i=new Image;i.addEventListener("load",(()=>{e(i)})),i.src=t}))}async#m(t){const e=await l.loadImage(t);await e.decode();const i=await createImageBitmap(e);return this._tex=this.#u.createTex(e,"uTexture"),[i.width,i.height]}#f(t,e){const i=t/e;let s=1,r=1;i<1?s*=i:r/=i,this.#g=s,this.#d=r;const o=[-s,-r,0,1],n=[s,-r,0,1],a=[s,r,0,1],h=[-s,r,0,1];return{coords:[...o,...n,...a,...o,...a,...h],texCoords:[0,1,1,1,1,0,0,1,1,0,0,0]}}useDepthTest(){this.#u.useDepthTest=!0}pointCollision(t,e,r){const a=i();s(a,this.#u.modelMatrix),r&&n(a,r.viewProjection,a);const h=i();o(h,a);const c=r?r.near:1,l=r?r.far:1,m=g(h,[t,e,c,1]),f=g(h,[t,e,l,1]),p=u(m,1/m[3]),w=u(f,1/f[3]),_=new d(w,p).pointWhenZIs(0);return Math.abs(_[0])<this.#g&&Math.abs(_[1])<this.#d}draw(t){this.#u&&this.#u.draw(t)}}function u(t,e){return t.map((t=>t*e))}function g(t,e){const i=new Array(e.length).fill(0);if(Math.round(e.length**2)===t.length){for(let s=0;s<e.length;s++)for(let r=0;r<t.length;r+=4)i[s]+=t[r+s]*e[r/4];return i}}class d{#p;#w;constructor(t,e){const i=this.#_(t,e);this.#w=i,this.#p=e}getPoint(t){return this.#p.map(((e,i)=>e+t*this.#w[i]))}pointWhenZIs(t){const e=this.#w[2]?(t-this.#p[2])/this.#w[2]:0;return this.getPoint(e)}#_(t,e){const i=t.map(((t,i)=>t-e[i])),s=Math.sqrt(i.reduce(((t,e)=>t+e**2),0));return s?i.map((t=>t/s)):i}}class m{attributes=new Map;id;hEdge;constructor(t){this.id=t}}class f{opositte;next;vertex;constructor(t){this.vertex=t}}class p{hEdge;constructor(t){this.hEdge=t}}class w{#v=[];#b=[];#x=[];constructor(t){for(let e=0;e<t.length;e+=3){const i=t[e],s=t[e+1],r=t[e+2];this.#b[i]||(this.#b[i]=new m(i)),this.#b[s]||(this.#b[s]=new m(s)),this.#b[r]||(this.#b[r]=new m(r));const o=new f(this.#b[i]),n=new f(this.#b[s]),a=new f(this.#b[r]);o.next=n,n.next=a,a.next=o;const h=new p(o);this.#v[e]=o,this.#v[e+1]=n,this.#v[e+2]=a,this.#x[Math.round(e/3)]=h}this.setOposittes()}setOposittes(){for(let t of this.#v){const e=t.vertex,i=t.next.vertex;if(e.hEdge||(e.hEdge=t),!t.opositte)for(let s of this.#v)if(s.vertex===i&&s.next.vertex===e){t.opositte=s,s.opositte=t;break}}}setAttribute(t,e,i){if(t.length/e!==this.#b.length)throw new Error(`Mesh haves ${this.#b.length} vertices, but only ${t.length/e} were given.`);for(let s=0;s<t.length;s+=e){const r=t.slice(s,s+e);this.#b[Math.round(s/e)].attributes.set(i,r)}}createVBOs(){const t=new Map,e=[];for(let e of this.#b)for(let i of e.attributes.keys())t.get(i)||t.set(i,[]),t.get(i).push(...e.attributes.get(i));for(let t of this.#v)e.push(t.vertex.id);return{attributes:t,indexes:e,count:this.#b.length}}}class _ extends c{#y;#M=-1;#E;#h=!1;set border(t){this.#E=t}constructor(t,e,i,s){super(t,e,i,t.TRIANGLES),this.#y=new w(s)}addAttribute(t,e,i=4){if(!(e instanceof Array))throw new Error("The info parameter needs to be a Array.");if(e.forEach((t=>{if("number"!=typeof t)throw new Error("The info array need to be numeric.")})),-1===this._gl.getAttribLocation(this._program,t))throw new Error(`the attribute ${t} doesn't exists in the shader code.`);this.#y.setAttribute(e,i,t),this.#h=!1}#l(){const t=this.#y.createVBOs(),e=Array.from(t.attributes.entries()).map((e=>({loc:this._gl.getAttribLocation(this._program,e[0]),buffer:h.createBuffer(this._gl,this._gl.ARRAY_BUFFER,new Float32Array(e[1])),dimension:Math.round(e[1].length/t.count)})));this._vaoLoc=h.createVAO(this._gl,...e),this.#M=h.createBuffer(this._gl,this._gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(t.indexes)),this._count=t.indexes.length,this.#h=!0}draw(t){this.#h||this.#l(),this.useDepthTest&&(this._gl.enable(this._gl.DEPTH_TEST),this._gl.depthFunc(this._gl.LESS)),this._gl.frontFace(this._gl.CCW),this._gl.enable(this._gl.CULL_FACE),this._gl.cullFace(this._gl.BACK),this._gl.bindVertexArray(this._vaoLoc),this._gl.useProgram(this._program),this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER,this.#M);const e=this._gl.getUniformLocation(this._program,"model"),s=this._gl.getUniformLocation(this._program,"modelView"),r=this._gl.getUniformLocation(this._program,"mvp");if(e)this._gl.uniformMatrix4fv(e,!1,this.modelMatrix);else if(s){const s=i();n(s,t.viewMatrix,this.modelMatrix),this._gl.uniformMatrix4fv(e,!1,s)}else if(r){const s=i();n(s,t.viewProjection,this.modelMatrix),this._gl.uniformMatrix4fv(e,!1,s)}this._gl.drawElements(this._primitive,this._count,this._gl.UNSIGNED_INT,0),this._gl.disable(this._gl.CULL_FACE),this.useDepthTest&&this._gl.disable(this._gl.DEPTH_TEST)}pointCollision(t,e,i){return!!this.#E&&this.#E.pointCollision(t,e,i,this)}get center(){return this.#E.center}get drawBorder(){return this.#E.draw()}static async loadMeshFromObj(t,e,i,s,r){const o=await fetch(t),n=await o.text(),a=new Map,h=n.split("\n"),c=[],u=[],g=[],d=[];let m=0;for(let t of h)if(t.startsWith("vn")){const e=t.replace("vn ","").split(" ").map(Number.parseFloat);u.push(...e,1);const i=Math.sqrt(v(e,e));if(Math.abs(v(e,[0,0,1])/i)<.5){const t=e.join(",");a.get(t)||a.set(t,m)}m++}else if(t.startsWith("vt")){const e=t.replace("vt ","").split(" ").map(Number.parseFloat);g.push(...e)}else if(t.startsWith("v")){const e=t.replace("v ","").split(" ").map(Number.parseFloat);c.push(...e,1)}else if(t.startsWith("f")){const e=t.replace("f ","").split(" ").map((t=>{const e=t.indexOf("/"),i=t.slice(0,e);return Number.parseInt(i)-1}));d.push(...e)}const f=new b(a,c,e),p=new _(e,i,s,d);if(p.addAttribute("position",c),p.addAttribute("normal",u),p.useDepthTest=!0,0!==g.length){if(!r)throw new Error("This mesh need to a texture path");p.addAttribute("texCoord",g,3);const t=await l.loadImage(r);p.createTex(t,"uTexture")}return p.border=f,p}}const v=(t,e)=>t.reduce(((t,i,s)=>t+i*e[s]),0);class b{#T;#C;#A;#P;#I;#S;constructor(t,e){this.#T=t,this.#C=e;let i=1/0,s=-1/0,r=1/0,o=-1/0,n=1/0,a=-1/0;for(let t=0;t<this.#C.length;t+=4)this.#C[t+2]<i&&(i=this.#C[t+2]),this.#C[t+2]>s&&(s=this.#C[t+2]),this.#C[t]<r&&(r=this.#C[t]),this.#C[t]>o&&(o=this.#C[t]),this.#C[t+1]<n&&(n=this.#C[t+1]),this.#C[t+1]>a&&(a=this.#C[t+1]);this.#I=i,this.#S=s,this.center=[(o+r)/2,(n+a)/2]}pointCollision(t,e,i,s){return this.#A=null,this.#P=null,this.#k(t,e,this.#I,i,s)||this.#k(t,e,this.#S,i,s)}#k(t,e,r,a,h){const c=i();s(c,h.modelMatrix),a&&n(c,a.viewProjection,c);const l=i();o(l,c);const u=a?a.near:1,g=a?a.far:1,d=b.multiplyMatWithVec(l,[t,e,u,1]),m=b.multiplyMatWithVec(l,[t,e,g,1]),f=b.scalarMulti(d,1/d[3]),p=b.scalarMulti(m,1/m[3]),w=new x(p,f).pointWhenZIs(r);return this.#A?this.#P=w:this.#A=w,this.#L(w)}#L(t){let[e,i]=[1/0,1/0],[s,r]=[-1/0,-1/0];for(let t of this.#T.entries()){const o=4*t[1],n=[this.#C[o],this.#C[o+1]];n[0]<e&&(e=n[0]),n[1]<i&&(i=n[1]),n[0]>s&&(s=n[0]),n[1]>r&&(r=n[1])}return t[0]>=e&&t[0]<=s&&t[1]>=i&&t[1]<=r}#R(t){let e,i,s=0;for(let r of this.#T.entries()){const o=4*r[1],n=[this.#C[o],this.#C[o+1]];if(!e){e=n,i=n;continue}const a=this.leftToEdge(t,i,n);if(2===a)return!0;a&&s++,i=n}return this.leftToEdge(t,i,e)&&s++,s%2==1}leftToEdge(t,e,i){if(i[0]===t[0]&&i[1]===t[1])return!0;if(e[0]===t[0]&&e[1]===t[1])return!0;const s=[i[1],e[1]];s.sort();const[r,o]=s;if(t[1]>=o||t[1]<=r)return!1;const n=e[0]-i[0];if(!n)return t[0]<=e[0];const a=(e[1]-i[1])/n,h=e[0]-e[0]*a;return t[0]<=(t[1]-h)/a}draw(){const t=document.createElement("canvas");t.width=1e3,t.height=1e3,t.style.backgroundColor="rgb(100, 0, 0)";const e=t.getContext("2d");let i;e.beginPath();for(let t of this.#T.entries()){const s=4*t[1],r=[this.#C[s],this.#C[s+1],this.#C[s+2]];i?e.lineTo(500*r[0]+250,500*(1-r[1])):(i=r,e.moveTo(500*r[0]+250,500*(1-r[1])))}return e.lineTo(500*i[0]+250,500*(1-i[1])),e.stroke(),this.#A&&e.fillRect(500*this.#A[0]+250,500*(1-this.#A[1]),5,5),this.#P&&e.fillRect(500*this.#P[0]+250,500*(1-this.#P[1]),5,5),t}static multiplyMatWithVec(t,e){const i=new Array(e.length).fill(0);if(Math.round(e.length**2)===t.length){for(let s=0;s<e.length;s++)for(let r=0;r<t.length;r+=4)i[s]+=t[r+s]*e[r/4];return i}}static scalarMulti(t,e){return t.map((t=>t*e))}}class x{#p;#w;constructor(t,e){const i=this.#_(t,e);this.#w=i,this.#p=e}getPoint(t){return this.#p.map(((e,i)=>e+t*this.#w[i]))}pointWhenZIs(t){const e=(t-this.#p[2])/this.#w[2];return this.getPoint(e)}#_(t,e){const i=t.map(((t,i)=>t-e[i])),s=Math.sqrt(i.reduce(((t,e)=>t+e**2),0));return i.map((t=>t/s))}}class y{#U;#D;#O;#j;#V;#F;#u;constructor(t,e,i,s){this.#U=t,this.#D=e,this.#O=s,this.#j=null,this.#V=null,this.continent=i,this.#F=1}get name(){return this.#U}get path(){return this.#D}get neighbors(){return this.#O}get owner(){return this.#j}get continent(){return this.#V}get soldiers(){return this.#F}get mesh(){return this.#u}set continent(t){this.#V=t,t.addCountry(this)}set owner(t){this.#j=t}set soldiers(t){this.#F=t}findNeighbor(t){for(let e=0;e<this.#O.length;e++)if(this.#O[e]==t)return e;return-1}async loadMesh(t,e,i){this.#u=await _.loadMeshFromObj(t,e,"#version 300 es\n    precision highp float;\n\n    uniform mat4 model;\n    uniform mat4 view;\n    uniform mat4 projection;\n    uniform vec4 color;\n\n    in vec4 position;\n    in vec4 normal;\n\n    out vec4 fPos;\n    out vec4 fColor;\n    out vec4 fNormal;\n\n    void main() {\n        gl_Position = (projection*view*model) * position;\n        gl_Position /= gl_Position.w;\n        fColor = color;\n        fPos = position;\n        fNormal = normal;\n    }\n","#version 300 es\n    precision highp float;\n    \n    uniform mat4 model;\n    uniform mat4 view;\n    uniform mat4 projection;\n\n    uniform vec3 amb_c;\n    uniform vec3 dif_c;\n    uniform vec3 esp_c;\n    uniform vec3 pos;\n    uniform float amb_k;\n    uniform float dif_k;\n    uniform float esp_k;\n    uniform float esp_p;\n\n    in vec4 fColor;\n    in vec4 normal;\n    in vec4 fPos;\n    in vec4 fNormal;\n\n    out vec4 color;\n\n    void main() {\n        mat4 modelView = view*model;\n\n        vec3 lightPos = (view * vec4(pos, 1.0)).xyz;\n        vec3 pos = -(modelView * fPos).xyz;\n\n        vec3 vNormal = normalize(inverse(transpose(modelView)) * fNormal).xyz;\n        vec3 vDistance = normalize(pos - lightPos);\n\n        vec3 normalPos = normalize(pos);\n\n        vec3 halfVector= normalize(vDistance + normalPos);\n\n        vec3 amb = amb_k * amb_c;\n\n        vec3 diff = max(dot(vNormal, vDistance), 0.0) * dif_k * dif_c;\n\n        vec3 spec = max(pow(dot(vNormal, halfVector), esp_p), 0.0) * esp_c * esp_k;\n\n        vec3 color3 = vec3(fColor);\n        \n        color3 = 0.5*color3 + 0.5*(diff + amb + spec);\n\n        color = vec4(color3, 1.0);\n    }\n"),this.#u.scale=[i,i,1],this.#u.center}draw(t){this.#u.draw(t)}}class M{#B=i();#G=i();#N=i();camPosition=[0,0,1];lookDirection=[0,0,0];upDirection=[0,1,0];left=-4;right=4;bottom=-4;top=4;near=1;far=9;fovy=Math.PI/2;aspect;constructor(t){this.aspect=t.width/t.height}#Y="perspective";set projectionType(t){if("orthogonal"!==t&&"perspective"!==t)throw new Error("Invalid type of projection.");this.#Y=t}get viewMatrix(){return this.#X(),this.#B}get projMatrix(){return this.#W(),this.#G}#X(){r(this.#B),function(e,i,s,o){var n,a,h,c,l,u,g,d,m,f,p=i[0],w=i[1],_=i[2],v=o[0],b=o[1],x=o[2],y=s[0],M=s[1],E=s[2];Math.abs(p-y)<t&&Math.abs(w-M)<t&&Math.abs(_-E)<t?r(e):(g=p-y,d=w-M,m=_-E,n=b*(m*=f=1/Math.hypot(g,d,m))-x*(d*=f),a=x*(g*=f)-v*m,h=v*d-b*g,(f=Math.hypot(n,a,h))?(n*=f=1/f,a*=f,h*=f):(n=0,a=0,h=0),c=d*h-m*a,l=m*n-g*h,u=g*a-d*n,(f=Math.hypot(c,l,u))?(c*=f=1/f,l*=f,u*=f):(c=0,l=0,u=0),e[0]=n,e[1]=c,e[2]=g,e[3]=0,e[4]=a,e[5]=l,e[6]=d,e[7]=0,e[8]=h,e[9]=u,e[10]=m,e[11]=0,e[12]=-(n*p+a*w+h*_),e[13]=-(c*p+l*w+u*_),e[14]=-(g*p+d*w+m*_),e[15]=1)}(this.#B,this.camPosition,this.lookDirection,this.upDirection)}#W(){r(this.#G),"perspective"===this.#Y?function(t,e,i,s,r){var o,n=1/Math.tan(e/2);t[0]=n/i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=r&&r!==1/0?(o=1/(s-r),t[10]=(r+s)*o,t[14]=2*r*s*o):(t[10]=-1,t[14]=-2*s)}(this.#G,this.fovy,this.aspect,this.near,this.far):function(t,e,i,s,r,o,n){var a=1/(e-i),h=1/(s-r),c=1/(o-n);t[0]=-2*a,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*h,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*c,t[11]=0,t[12]=(e+i)*a,t[13]=(r+s)*h,t[14]=(n+o)*c,t[15]=1}(this.#G,this.left*this.aspect,this.right*this.aspect,this.bottom,this.top,this.left,this.right)}get viewProjection(){return this.#X(),this.#W(),r(this.#N),n(this.#N,this.#G,this.#B),this.#N}}class E{ambColor=[0,0,0];ambK=.5;difColor=[.3,.3,.3];difK=.4;espColor=[1,1,1];espK=.1;espExp=20;pos;constructor(t){this.pos=t}createUniforms(t){t.setUniformValue("amb_c",this.ambColor,"3fv"),t.setUniformValue("amb_k",this.ambK,"1f"),t.setUniformValue("dif_c",this.difColor,"3fv"),t.setUniformValue("dif_k",this.difK,"1f"),t.setUniformValue("esp_c",this.espColor,"3fv"),t.setUniformValue("esp_k",this.espK,"1f"),t.setUniformValue("esp_p",this.espExp,"1f")}}class T{#K=[];#$;#q;#z;#H=!1;get camera(){return this.#q}get light(){return this.#$}constructor(t,e=[0,0,0,1]){if(t instanceof WebGL2RenderingContext){if(t.viewport(0,0,t.canvas.width,t.canvas.height),!e||!e.length||4!==e.length)throw new Error("The clear color need to be a array with 4 floats");t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),this.gl=t}}createCamera(t){this.#q=new M(t)}createLight(t){this.#$=new E(t),this.#z=new E(t),this.#z.ambK=.3,this.#z.difK=.4,this.#z.espK=.3,this.#z.ambColor=[.5,.5,.5]}appendElement(...t){t.forEach((t=>{if(!t.draw)throw new Error("Element need to have a draw function");this.#K.push(t),this.#$&&t instanceof c&&this.#$.createUniforms(t),this.#$&&t instanceof y&&this.#$.createUniforms(t.mesh)}))}switchLight(){if(!this.#$)throw new Error("there is no lights to be switched.");this.#H=!this.#H;const t=this.#H?this.#z:this.#$;this.#K.forEach((e=>{e instanceof c&&t.createUniforms(e),e instanceof y&&t.createUniforms(e.mesh)}))}draw(){for(let t of this.#K)t.draw(this.#q)}}class C{static rollDice(t){const e=[];for(let i=0;i<t;i++)e.push(Math.floor(6*Math.random())+1);return e}}class A{attackPlayer(t,e){const i=this.calcDices(t,!0),s=this.calcDices(e,!1);if(0===i)return alert("Ataque invalido");const r=C.rollDice(i),o=C.rollDice(s);let n=0,a=0;r.sort().reverse(),o.sort().reverse(),console.log(r),console.log(o);for(let t=0;t<Math.min(i,s);t++)r[t]>o[t]?n++:a++;console.log(`vitórias do ataque: ${n}, vitórias da defesa: ${a}`),t.soldiers-=a,e.soldiers-=n}calcDices(t,e){var i;return e?((i=t.soldiers-1)>3&&(i=3),i):((i=t.soldiers)>3&&(i=3),i)}getCountryObject(t){return this.countries.find((e=>e.name===t))}isValidCountry(t){return this.countries.includes(t)}}class P{#U;#Z;#J;#Q;#tt;#et;constructor(t,e,i){this.#U=t,this.#Z=e,this.#J=[],this.#Q=[],this.#tt=i,this.#et=0}conquestTerritory(t){this.#J.push(t)}receiveTroop(){const t=Math.floor(this.#J.length/2);this.#et=t}addTroops(t,e){e<=this.#et&&(t.soldiers=t.soldiers+e,this.#et-=e)}attack(t,e){(new A).attackPlayer(t,e),console.log(t.soldiers,e.soldiers)}get name(){return this.#U}get color(){return this.#Z}get freeTroops(){return this.#et}get territoriesOwned(){return this.#J.length}get vetTerritoriesOwned(){return this.#J}get continentsOwned(){return this.#Q.length}get vetContinentsOwned(){return this.#Q}get goal(){return this.#tt.goal}get goalId(){return this.#tt.id}}class I{#U;#it;#st;#j;constructor(t,e){this.#U=t,this.#it=[],this.#st=e,this.#j=null}addCountry(t){this.#it.push(t)}get name(){return this.#U}get countries(){return this.#it}get bonus(){return this.#st}get owner(){return this.#j}set owner(t){this.#j=t}}class S{#rt;#it;async init(t,e){this.#rt=[],this.#it=[],await this.loadContinents(),await this.loadCountries(t,e)}async loadContinents(){const t=await fetch("./assets/data/continent-constructor.json"),e=await t.json();for(let t=0;t<e.data.length;t++){let i=new I(e.data[t].name,e.data[t].bonus);this.#rt.push(i)}}async loadCountries(t,e){const i=await fetch("./assets/data/country-constructor.json"),s=await i.json();for(let i=0;i<s.data.length;i++){const r=this.#rt.find((t=>t.name===s.data[i].continent));let o=new y(s.data[i].name,s.data[i].path,r,s.data[i].neighbors);await o.loadMesh(s.data[i].path,t,e),this.#it.push(o)}}conquerCountry(t,e){countryFound=this.findCountry(t),countryFound||(countryFound.owner=e)}findCountry(t){for(let e=0;e<this.#it;e++)if(this.#it[e].name==t)return this.#it[e];return null}get continents(){return this.#rt}get countries(){return this.#it}troop_reassignment(t,e,i){if(!(t instanceof y&&e instanceof y&&i instanceof int))throw new Error("Parametro invalido");if(t.findNeighbor(e)){if(!(t.soldier>i))throw new Error("quantidade de tropas invalidas");t.soldier-=i,e.soldier+=i}}clickedCountry(t,e,i){for(let s of this.#it)if(s.mesh.pointCollision(t,e,i))return s;return null}}class k{#ot;#nt;#at;static DISTRIBUCTION=0;static ATTACK=1;static REASSIGNMENT=2;static EXCHANGE_CARDS=3;static FREEZE=4;constructor(t){this.#at=t,this.#nt=0,this.#ot=k.DISTRIBUCTION,this.#at[this.#nt].receiveTroop()}nextPlayer(){this.#nt=(this.#nt+1)%this.#at.length,this.#ot=k.DISTRIBUCTION,this.#at[this.#nt].receiveTroop()}get player(){return this.#at[this.#nt]}get state(){return this.#ot}nextState(){this.#ot<k.FREEZE&&this.#ot++}}class L{#ht=null;constructor(t){let e;t.gl.canvas.addEventListener("click",(e=>{if(console.log(t.inGame,t.turnsManager.state),!t.inGame)return;const i=L.mapClickInCanvas(e.clientX,e.clientY,t.gl.canvas),s=t.territoryController.clickedCountry(...i,t.gameScene.camera);s&&alert(s.name),s&&R.get(k.ATTACK)(t,s),this.#ht=s,this.#ht.mesh.pointCollision(...i,t.gameScene.camera)})),document.body.addEventListener("keydown",(t=>{"d"===t.key&&this.#ht&&(e=this.#ht.mesh.drawBorder,document.body.appendChild(e)),"s"===t.key&&document.body.removeChild(e)}))}static mapClickInCanvas(t,e,i){const s=[t-i.offsetLeft-i.width/2,i.height/2-(e-i.offsetTop)];return[2*s[0]/i.width,2*s[1]/i.height]}}const R=new Map,U={},D=null;R.set(k.ATTACK,((t,e)=>{const i=t.turnsManager.player,s=t.territoryController;if(U.base){if(-1===U.neighbors.indexOf(e))return;alert(`from ${U.base.name} to ${e.name}`),i.attack(U.base,e),t.gameScene.switchLight(),U.neighbors.forEach((e=>{e.owner!==i&&(e.mesh.position[2]=0,e.mesh.scale[2]=1,t.gameScene.light.createUniforms(e.mesh))})),U.base.mesh.position[2]=0,U.base.mesh.scale[2]=1,U.base=null,U.neighbors=null,t.tView.update()}else if(e.owner===i){alert("entrou");const r=s.countries.filter((t=>{if(-1!==e.neighbors.indexOf(t.name)&&t.owner!==e.owner)return t}));if(0===r.length)return;t.gameScene.switchLight(),U.base=e,e.mesh.position[2]=.03,e.mesh.scale[2]=2,t.gameScene.light.createUniforms(e.mesh),r.forEach((e=>{e.owner!==i&&(e.mesh.position[2]=.03,e.mesh.scale[2]=2,t.gameScene.light.createUniforms(e.mesh))})),console.log(r),U.neighbors=r}})),R.set(k.DISTRIBUCTION,((t,e)=>{console.log("dist",D),D||e.owner!==t.turnsManager.player||(t.gameScene.switchLight(),U.base=e,e.mesh.position[2]=.03,e.mesh.scale[2]=2,t.gameScene.light.createUniforms(e.mesh),console.log(t.fortify),t.fortify.up(),D=e)})),R.set(k.REASSIGNMENT,((t,e)=>{}));class O extends l{#ct;async init(t,e=1e3){const i=document.createElement("canvas"),s=i.toDataURL("image/png");[i.width,i.height]=[e,e],await super.init(t,s),this.#ct=i}async update(t=(()=>{}),e){t(this.#ct.getContext("2d"));const i=this.#ct.toDataURL("image/png"),s=await l.loadImage(i);c.changeTex(e,this._tex,s)}}class j{#lt;#it;#ut;#gt;async init(t,e,i){this.#it=t,this.#ut=i,this.#gt=new O,await this.#gt.init(i),this.#gt.scale=[2.5,5],this.#gt.depth=.1,await this.update(),this.#lt=this.#gt}async update(){await this.#gt.update((t=>{t.clearRect(0,0,this.#ut.canvas.width,this.#ut.canvas.height),t instanceof CanvasRenderingContext2D&&this.#it.forEach((e=>{const i=e.mesh.center;t.fillStyle="white",t.font="30px Arial",t.fillText(e.soldiers+"",1e3*(i[0]+.5)-10,1e3*(.5-i[1]))}))}),this.#ut)}draw(t){this.#lt.draw(t)}}class V{#dt=[];#mt;#ft;get getGoal(){return this.#ft}async loadGoals(){const t=await fetch("./assets/data/goals.json"),e=await t.json();this.#mt=e.data.length;for(let t=0;t<this.#mt;t++){let i=e.data[t];this.#dt.push(i)}}async sortGoal(t,e){const i=this.colorName(e);let s=Math.floor(Math.random()*this.#mt);""==this.#dt[s].owner?8==this.#dt[s].id&&"azul"==i||9==this.#dt[s].id&&"amarelo"==i||10==this.#dt[s].id&&"vermelho"==i||11==this.#dt[s].id&&"preto"==i||12==this.#dt[s].id&&"branco"==i||13==this.#dt[s].id&&"verde"==i?this.sortGoal(t,e):(this.#dt[s].owner=t,this.#ft=this.#dt[s]):this.sortGoal(t,e)}verifyDestroy(t,e){let i;switch(t.goalId){case 8:i="azul";break;case 9:i="amarelo";break;case 10:i="vermelho";break;case 11:i="preto";break;case 12:i="branco";break;case 13:i="verde";break;default:i=""}if(""==i)return!1;for(let t=0;t<6;t++)if(this.colorName(e[t].color)==i&&0!=e[t].continentsOwned)return!1;return!0}verifyContinent(t){let e,i=[],s=!1;switch(t.goalId){case 0:e=3,i=["Europa","Oceania"];break;case 1:e=2,i=["Ásia","América do Sul"];break;case 2:e=3,i=["Europa","América do Sul"];break;case 3:e=2,i=["Ásia","África"];break;case 4:e=2,i=["América do Norte","África"];break;case 5:e=2,i=["América do Norte","Oceania"]}return t.continentsOwned>=e&&(s=i.every((e=>t.vetContinentsOwned.includes(e)))),s}verifyTerritory(t){let e,i,s;switch(t.goalId){case 6:e=18,i=2;break;case 7:e=24,i=1}if(t.territoriesOwned>=e)for(let e=0;e<t.territoriesOwned;e++){if(!(t.vetTerritoriesOwned[e].soldiers>=i))return!1;s=!0}return s}colorName(t){return"0,0,1,1"==`${t}`?"azul":"1,1,0,1"==`${t}`?"amarelo":"1,0,0,1"==`${t}`?"vermelho":"1,1,1,1"==`${t}`?"preto":"0,0,0,1"==`${t}`?"branco":"0,0.4,0,1"==`${t}`?"verde":void 0}}class F{#pt;#wt;#_t;#vt;#bt;#xt;#yt=4.5;#Mt=!1;#Et=!1;#at=[];#Tt;#Ct;#At;#tt;#Pt;get tView(){return this.#bt}get inGame(){return this.#Mt}get gameScene(){return this.#wt}get turnsManager(){return this.#Tt}get territoryController(){return this.#xt}get fortify(){return this.#At}static async build(t){const e=new F;return await e.init(t),e}async init(t){this.gl=t.getContext("webgl2"),await this.#It();const e=["Player 1","Player 2","Player 3","Player 4","Player 5","Player 6"],i=[[0,0,1,1],[1,1,0,1],[1,0,0,1],[1,1,1,1],[0,0,0,1],[0,.4,0,1]],s=new V;await s.loadGoals();for(let t=0;t<6;t++){const r=Math.floor(Math.random()*i.length),o=i[r];s.sortGoal(e[5-t],o);let n=s.getGoal;i.splice(r,1),this.#Pt=n.path,this.#at[t]=new P(e[t],o,n)}this.#xt=new S,await this.#xt.init(this.gl,this.#yt);const r=[...this.#xt.countries],o=Math.floor(r.length/this.#at.length);for(let t of this.#at)for(let e=0;e<o&&r.length;e++){const e=Math.floor(Math.random()*r.length);r[e].owner=t,r[e].soldiers=1,r.splice(e,1)}this.#Tt=new k(this.#at),await this.#St(),this.#Ct=new L(this)}async#It(){this.#pt=new T(this.gl);const t=new l;await t.init(this.gl,"./assets/menu/fundo.jpg");const e=new l;await e.init(this.gl,"./assets/menu/logo_war.png");const i=new l;await i.init(this.gl,"./assets/menu/play_button.png");const s=new l;await s.init(this.gl,"./assets/menu/settings_button.png");const r=new l;await r.init(this.gl,"./assets/menu/max_button.png"),t.scaleY=1.85,e.scale=[.35,.56],i.scale=[.15,.26],s.scale=[.046,.08],r.scale=[.046,.08],e.positionY=.25,i.positionY=-.55,s.positionX=.9,s.positionY=.8,this.#pt.appendElement(t,e,i,s),this.gl.canvas.addEventListener("click",(t=>{const e=F.mapClickInCanvas(t.clientX,t.clientY,this.gl.canvas);i.pointCollision(...e)&&(this.#Mt||(this.#Et=!0))}))}async#St(){const t=new l;await t.init(this.gl,"./assets/game/fundo.jpg"),t.scaleY=1.85,t.scaleX=1.01,t.depth=-.01,this.#vt=t;const e=new l;await e.init(this.gl,this.#Pt),e.scaleX=.4,e.scaleY=.6,this.#tt=e;const i=new B;await i.init(this.gl);const s=new G;await s.init(this.gl);const r=new N;await r.init(this.gl),this.#At=r,this.#wt=new T(this.gl),this.#wt.createCamera(Y),this.#wt.camera.camPosition[2]=1.8,this.#wt.camera.camPosition[1]=-.2,this.#wt.createLight([1,0,.3]),this.#_t=new T(this.gl),this.#bt=new j,await this.#bt.init(this.#xt.countries,this.#yt,this.gl),this.#wt.appendElement(...this.#xt.countries),this.#_t.appendElement(i,s,r),this.#wt.appendElement(this.#bt);for(let t of this.#xt.countries)t.mesh.setUniformValue("view",this.#wt.camera.viewMatrix,"Matrix4fv"),t.mesh.setUniformValue("projection",this.#wt.camera.projMatrix,"Matrix4fv"),t.mesh.setUniformValue("color",t.owner.color,"4fv")}logic(){this.#At.logic()}draw(){this.#Mt?(this.#vt.draw(),this.#wt.draw(),this.#_t.draw()):this.#pt.draw()}run(){const t=()=>{this.logic(),this.draw(),this.#Et&&(this.#Mt=!0,this.#Et=!1),requestAnimationFrame(t)};t()}static mapClickInCanvas(t,e,i){const s=[t-i.offsetLeft-i.width/2,i.height/2-(e-i.offsetTop)];return[2*s[0]/i.width,2*s[1]/i.height]}}class B{async init(t){this.settingsButton=new l,await this.settingsButton.init(t,"./assets/menu/settings_button.png"),this.settingsButton.scale=[.046,.08],B.setInitialPosition(.9,.8,.2,this.settingsButton),this.card_button=new l,await this.card_button.init(t,"./assets/game/card_button.png"),this.card_button.scale=[.08,.15],B.setInitialPosition(.76,-.85,.2,this.card_button),this.objective_button=new l,await this.objective_button.init(t,"./assets/game/objective_button.png"),this.objective_button.scale=[.065,.11],B.setInitialPosition(.92,-.85,.2,this.objective_button),this.current_player=new l,await this.current_player.init(t,"./assets/game/current_player.png"),this.current_player.scale=[.4,.6],B.setInitialPosition(0,-.85,.2,this.current_player),this.show_players=new l,await this.show_players.init(t,"./assets/game/show_players.png"),this.show_players.scale=[.065,.115],B.setInitialPosition(-.92,-.85,.2,this.show_players)}static setInitialPosition(t,e,i,s){s.positionX=t,s.positionY=e,s.depth=i}moveAll(t){this.card_button.positionY+=t,this.objective_button._tex.positionY+=t,this.current_player.positionY+=t}draw(t){this.settingsButton.draw(t),this.card_button.draw(t),this.objective_button.draw(t),this.current_player.draw(t),this.show_players.draw(t)}}class G{async init(t){this.show_cards=new l,await this.show_cards.init(t,"./assets/game/show_cards.png"),this.show_cards.scale=[.4,.7],G.setInitialPosition(this.show_cards.positionX,-1.85,.3,this.show_cards),this.cancel_button=new l,await this.cancel_button.init(t,"./assets/game/cancel_button.png"),this.cancel_button.scale=[.046,.083],G.setInitialPosition(-.34,-1.81,.4,this.cancel_button),this.ok_button=new l,await this.ok_button.init(t,"./assets/game/ok_button.png"),this.ok_button.scale=[.046,.083],G.setInitialPosition(.34,-1.81,.4,this.ok_button),this.cards_info=new l,await this.cards_info.init(t,"assets/game/cards_info.png"),this.cards_info.scale=[.2,.35],G.setInitialPosition(.832+1,this.cards_info.positionY,.3,this.cards_info)}static setInitialPosition(t,e,i,s){s.positionX=t,s.positionY=e,s.depth=i}moveAll(t,e){this.show_cards.positionY+=e,this.cancel_button.positionY+=e,this.ok_button.positionY+=e,this.cards_info.positionX+=t}draw(t){this.show_cards.draw(t),this.cancel_button.draw(t),this.ok_button.draw(t),this.cards_info.draw(t)}}class N{#kt=!1;#Lt=0;async init(t){this.fortify=new l,await this.fortify.init(t,"./assets/game/fortify.png"),this.fortify.scale=[.4,.7],N.setInitialPosition(this.fortify.positionX,-1.825,.3,this.fortify),this.cancel_button=new l,await this.cancel_button.init(t,"./assets/game/cancel_button.png"),this.cancel_button.scale=[.046,.083],N.setInitialPosition(-.34,-1.81,.4,this.cancel_button),this.ok_button=new l,await this.ok_button.init(t,"./assets/game/ok_button.png"),this.ok_button.scale=[.046,.083],N.setInitialPosition(.34,-1.81,.4,this.ok_button),this.plus_button=new l,await this.plus_button.init(t,"./assets/game/plus_button.png"),this.plus_button.scale=[.046,.083],N.setInitialPosition(.168,-.86-1,.4,this.plus_button),this.minus_button=new l,await this.minus_button.init(t,"./assets/game/minus_button.png"),this.minus_button.scale=[.046,.083],N.setInitialPosition(-.168,-.86-1,.4,this.minus_button),t.canvas.addEventListener("click",(t=>{}))}static setInitialPosition(t,e,i,s){s.positionX=t,s.positionY=e,s.depth=i}moveAll(t){console.log("am: ",t),this.fortify.positionY+=t,this.cancel_button.positionY+=t,this.ok_button.positionY+=t,this.plus_button.positionY+=t,this.minus_button.positionY+=t}up(){this.#kt=!0}logic(){this.#kt&&(this.#Lt+=.01,this.#Lt>=1?(this.#Lt=1,this.#kt=!1):this.moveAll(.01))}draw(t){this.fortify.draw(t),this.cancel_button.draw(t),this.ok_button.draw(t),this.plus_button.draw(t),this.minus_button.draw(t)}getWidget(t,e,i){}}const Y=document.querySelector("#game-screen");F.build(Y).then((t=>{t.run()}))})();
//# sourceMappingURL=main.bundle.js.map