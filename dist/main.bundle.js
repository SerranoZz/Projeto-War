(()=>{"use strict";var t=1e-6,i="undefined"!=typeof Float32Array?Float32Array:Array;function e(){var t=new i(16);return i!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}function s(t,i){return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],t}function o(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function n(t,i){var e=i[0],s=i[1],o=i[2],n=i[3],r=i[4],a=i[5],h=i[6],c=i[7],l=i[8],g=i[9],u=i[10],m=i[11],d=i[12],f=i[13],p=i[14],_=i[15],w=e*a-s*r,v=e*h-o*r,x=e*c-n*r,b=s*h-o*a,M=s*c-n*a,E=o*c-n*h,T=l*f-g*d,A=l*p-u*d,P=l*_-m*d,C=g*p-u*f,y=g*_-m*f,S=u*_-m*p,L=w*S-v*y+x*C+b*P-M*A+E*T;return L?(L=1/L,t[0]=(a*S-h*y+c*C)*L,t[1]=(o*y-s*S-n*C)*L,t[2]=(f*E-p*M+_*b)*L,t[3]=(u*M-g*E-m*b)*L,t[4]=(h*P-r*S-c*A)*L,t[5]=(e*S-o*P+n*A)*L,t[6]=(p*x-d*E-_*v)*L,t[7]=(l*E-u*x+m*v)*L,t[8]=(r*y-a*P+c*T)*L,t[9]=(s*P-e*y-n*T)*L,t[10]=(d*M-f*x+_*w)*L,t[11]=(g*x-l*M-m*w)*L,t[12]=(a*A-r*C-h*T)*L,t[13]=(e*C-s*A+o*T)*L,t[14]=(f*v-d*b-p*w)*L,t[15]=(l*b-g*v+u*w)*L,t):null}function r(t,i,e){var s=i[0],o=i[1],n=i[2],r=i[3],a=i[4],h=i[5],c=i[6],l=i[7],g=i[8],u=i[9],m=i[10],d=i[11],f=i[12],p=i[13],_=i[14],w=i[15],v=e[0],x=e[1],b=e[2],M=e[3];return t[0]=v*s+x*a+b*g+M*f,t[1]=v*o+x*h+b*u+M*p,t[2]=v*n+x*c+b*m+M*_,t[3]=v*r+x*l+b*d+M*w,v=e[4],x=e[5],b=e[6],M=e[7],t[4]=v*s+x*a+b*g+M*f,t[5]=v*o+x*h+b*u+M*p,t[6]=v*n+x*c+b*m+M*_,t[7]=v*r+x*l+b*d+M*w,v=e[8],x=e[9],b=e[10],M=e[11],t[8]=v*s+x*a+b*g+M*f,t[9]=v*o+x*h+b*u+M*p,t[10]=v*n+x*c+b*m+M*_,t[11]=v*r+x*l+b*d+M*w,v=e[12],x=e[13],b=e[14],M=e[15],t[12]=v*s+x*a+b*g+M*f,t[13]=v*o+x*h+b*u+M*p,t[14]=v*n+x*c+b*m+M*_,t[15]=v*r+x*l+b*d+M*w,t}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var t=0,i=arguments.length;i--;)t+=arguments[i]*arguments[i];return Math.sqrt(t)});var a;class h{static createShader(t,i,e){const s=t.createShader(i);if(t.shaderSource(s,e),t.compileShader(s),!t.getShaderParameter(s,t.COMPILE_STATUS)){const i=t.getShaderInfoLog(s);throw new Error("Shader compilation error: "+i)}return s}static createProgram(t,i,e){const s=t.createProgram();if(t.attachShader(s,i),t.attachShader(s,e),t.linkProgram(s),!t.getProgramParameter(s,t.LINK_STATUS)){const i=t.getProgramInfoLog(s);throw new Error("Could not compile WebGL program:"+i)}return s}static createBuffer(t,i,e){if(0==e.length)return null;if(!(e&&e.buffer instanceof ArrayBuffer&&void 0!==e.byteLength))return console.warn("Data is not an instance of ArrayBuffer"),null;const s=t.createBuffer();return t.bindBuffer(i,s),t.bufferData(i,e,t.STATIC_DRAW),s}static createVAO(t,...i){if(!(t instanceof WebGL2RenderingContext))return;const e=t.createVertexArray();let s,o;t.bindVertexArray(e);for(let e of i)null!=e.loc&&null!=e.loc&&(t.enableVertexAttribArray(e.loc),s=e.dimension,o=t.FLOAT,t.bindBuffer(t.ARRAY_BUFFER,e.buffer),t.vertexAttribPointer(e.loc,s,o,!1,0,0));return e}}class c{_gl;position=[0,0,0];rotation=[0,0,0];scale=[1,1,1];static#t=0;#i=e();#e=[];#s=null;#o=null;_program=null;_primitive;#n;_vaoLoc;#r;#a;#h=!1;useDepthTest=!1;get modelMatrix(){return this.updateModelMatrix(),this.#i}addAttribute(t,i,e=4){if(!(i instanceof Array))throw new Error("The info parameter needs to be a Array.");i.forEach((t=>{if("number"!=typeof t)throw new Error("The info array need to be numeric.")}));const s=i.length/e;if(this.#n){if(s!==this.#n)throw new Error("The VBOs need to contain the same number of vertex.")}else this.#n=s;const o=new Float32Array(i);this.#e.push({loc:this._gl.getAttribLocation(this._program,t),buffer:h.createBuffer(this._gl,this._gl.ARRAY_BUFFER,o),dimension:e}),this.#h=!1}constructor(t,i,e,s){this._primitive=s,this._gl=t,this.#c(i,e)}#c(t,i){this.#s=h.createShader(this._gl,this._gl.VERTEX_SHADER,t),this.#o=h.createShader(this._gl,this._gl.FRAGMENT_SHADER,i),this._program=h.createProgram(this._gl,this.#s,this.#o),this._gl.useProgram(this._program)}#l(){this._vaoLoc=h.createVAO(this._gl,...this.#e)}updateModelMatrix(){var t,i,e,s,n,r,a,h,c,l,g,u,m,d,f,p,_,w;o(this.#i),t=this.#i,i=this.#i,p=(e=this.position)[0],_=e[1],w=e[2],i===t?(t[12]=i[0]*p+i[4]*_+i[8]*w+i[12],t[13]=i[1]*p+i[5]*_+i[9]*w+i[13],t[14]=i[2]*p+i[6]*_+i[10]*w+i[14],t[15]=i[3]*p+i[7]*_+i[11]*w+i[15]):(s=i[0],n=i[1],r=i[2],a=i[3],h=i[4],c=i[5],l=i[6],g=i[7],u=i[8],m=i[9],d=i[10],f=i[11],t[0]=s,t[1]=n,t[2]=r,t[3]=a,t[4]=h,t[5]=c,t[6]=l,t[7]=g,t[8]=u,t[9]=m,t[10]=d,t[11]=f,t[12]=s*p+h*_+u*w+i[12],t[13]=n*p+c*_+m*w+i[13],t[14]=r*p+l*_+d*w+i[14],t[15]=a*p+g*_+f*w+i[15]),function(t,i,e){var s=Math.sin(e),o=Math.cos(e),n=i[4],r=i[5],a=i[6],h=i[7],c=i[8],l=i[9],g=i[10],u=i[11];i!==t&&(t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15]),t[4]=n*o+c*s,t[5]=r*o+l*s,t[6]=a*o+g*s,t[7]=h*o+u*s,t[8]=c*o-n*s,t[9]=l*o-r*s,t[10]=g*o-a*s,t[11]=u*o-h*s}(this.#i,this.#i,this.rotation[0]),function(t,i,e){var s=Math.sin(e),o=Math.cos(e),n=i[0],r=i[1],a=i[2],h=i[3],c=i[8],l=i[9],g=i[10],u=i[11];i!==t&&(t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15]),t[0]=n*o-c*s,t[1]=r*o-l*s,t[2]=a*o-g*s,t[3]=h*o-u*s,t[8]=n*s+c*o,t[9]=r*s+l*o,t[10]=a*s+g*o,t[11]=h*s+u*o}(this.#i,this.#i,this.rotation[1]),function(t,i,e){var s=Math.sin(e),o=Math.cos(e),n=i[0],r=i[1],a=i[2],h=i[3],c=i[4],l=i[5],g=i[6],u=i[7];i!==t&&(t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15]),t[0]=n*o+c*s,t[1]=r*o+l*s,t[2]=a*o+g*s,t[3]=h*o+u*s,t[4]=c*o-n*s,t[5]=l*o-r*s,t[6]=g*o-a*s,t[7]=u*o-h*s}(this.#i,this.#i,this.rotation[2]),function(t,i,e){var s=e[0],o=e[1],n=e[2];t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=i[3]*s,t[4]=i[4]*o,t[5]=i[5]*o,t[6]=i[6]*o,t[7]=i[7]*o,t[8]=i[8]*n,t[9]=i[9]*n,t[10]=i[10]*n,t[11]=i[11]*n,t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15]}(this.#i,this.#i,this.scale)}loadMVP(t){const i=this._gl.getUniformLocation(this._program,"model"),o=this._gl.getUniformLocation(this._program,"modelView"),n=this._gl.getUniformLocation(this._program,"mvp"),a=this._gl.getUniformLocation(this._program,"view"),h=this._gl.getUniformLocation(this._program,"viewProjection"),c=this._gl.getUniformLocation(this._program,"projection");if(i)this._gl.uniformMatrix4fv(i,!1,this.#i);else if(o){const i=e();t?r(i,t.viewMatrix,this.#i):s(i,this.#i),this._gl.uniformMatrix4fv(o,!1,i)}else if(n){const i=e();t?r(i,t.viewProjection,this.#i):s(i,this.#i),this._gl.uniformMatrix4fv(n,!1,i)}a&&this._gl.uniformMatrix4fv(i,!1,t.viewMatrix),c&&this._gl.uniformMatrix4fv(i,!1,t.projMatrix),h&&this._gl.uniformMatrix4fv(i,!1,t.viewProjection)}createTex(t,i){return this.#r=this._gl.getUniformLocation(this._program,i),this.#a=this._gl.createTexture(),this._gl.activeTexture(this._gl[`TEXTURE${c.#t}`]),this._gl.bindTexture(this._gl.TEXTURE_2D,this.#a),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_S,this._gl.CLAMP_TO_EDGE),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_T,this._gl.CLAMP_TO_EDGE),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_MIN_FILTER,this._gl.NEAREST),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_MAG_FILTER,this._gl.NEAREST),this._gl.texImage2D(this._gl.TEXTURE_2D,0,this._gl.RGBA32F,this._gl.RGBA,this._gl.FLOAT,t),this._gl.useProgram(this._program),this._gl.uniform1i(this.#r,c.#t),c.#t++,{tex:this.#a,index:c.#t-1}}setUniformValue(t,i,e){const s=this._gl.getUniformLocation(this._program,t);if(-1===s)throw new Error("This uniform doesn't exist in the shader code.");this._gl.useProgram(this._program),e.startsWith("Matrix")?this._gl["uniform"+e](s,!1,i):this._gl["uniform"+e](s,i)}draw(t){this.#h||(this.#h=!0,this.#l()),this._gl.frontFace(this._gl.CCW),this._gl.enable(this._gl.CULL_FACE),this._gl.cullFace(this._gl.BACK),this.useDepthTest&&(this._gl.enable(this._gl.DEPTH_TEST),this._gl.depthFunc(this._gl.LESS)),this.updateModelMatrix(),this._gl.bindVertexArray(this._vaoLoc),this._gl.useProgram(this._program),this.loadMVP(t),this._gl.drawArrays(this._primitive,0,this.#n),this._gl.disable(this._gl.CULL_FACE),this.useDepthTest&&this.gl.disable(this._gl.DEPTH_TEST)}static changeTex(t,{tex:i,index:e},s){t.bindTexture(t.TEXTURE_2D,i),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,t.RGBA,t.FLOAT,s)}}a=new i(3),i!=Float32Array&&(a[0]=0,a[1]=0,a[2]=0);class l{#g;#u;#m;get width(){return this.#u}get height(){return this.#m}set scaleX(t){if(t<=0)throw new Error("the scale of a image need to be greater than 0");this.#g.scale[0]=t}set scaleY(t){if(t<=0)throw new Error("the scale of a image need to be greater than 0");this.#g.scale[1]=t}set positionX(t){this.#g.position[0]=t}set positionY(t){this.#g.position[1]=t}set depth(t){this.#g.position[2]=t}set rotation(t){this.#g.rotation[2]=t}set scale(t){if(!(t instanceof Array)||2!==t.length)throw new Error("scale need to be a vector with two positions.");this.#g.scale=function(t,e,s){var o=new i(3);return o[0]=t,o[1]=e,o[2]=1,o}(t[0],t[1])}set opacity(t){this.#g.setUniformValue("alpha",t,"1f")}get positionX(){return this.#g.position[0]}get positionY(){return this.#g.position[1]}async init(t,i){this.#g=new c(t,"#version 300 es\n    precision highp float;\n\n    uniform mat4 mvp;\n\n    in vec4 position;\n    in vec2 texCoord;\n\n    out vec2 fTexCoord;\n\n    void main() {\n        gl_Position  = mvp * position;\n        fTexCoord = texCoord;\n    }\n","#version 300 es\n    precision highp float;\n    \n    in vec2 fTexCoord;\n\n    uniform sampler2D uTexture;\n    uniform float alpha;\n\n    out vec4 color;\n\n    void main() {\n        color = texture(uTexture, fTexCoord);\n\n        if(color.a < 0.2) discard;\n\n        color *= alpha;\n    }\n",t.TRIANGLES);const e=await this.#d(i),s=this.#f(...e);this.#g.addAttribute("position",s.coords),this.#g.addAttribute("texCoord",s.texCoords,2),this.opacity=1}static async loadImage(t){return new Promise((i=>{const e=new Image;e.addEventListener("load",(()=>{i(e)})),e.src=t}))}async#d(t){const i=await l.loadImage(t);await i.decode();const e=await createImageBitmap(i);return this._tex=this.#g.createTex(i,"uTexture"),[e.width,e.height]}#f(t,i){const e=t/i;let s=1,o=1;e<1?s*=e:o/=e,this.#u=s,this.#m=o;const n=[-s,-o,0,1],r=[s,-o,0,1],a=[s,o,0,1],h=[-s,o,0,1];return{coords:[...n,...r,...a,...n,...a,...h],texCoords:[0,1,1,1,1,0,0,1,1,0,0,0]}}pointCollision(t,i,o){const a=e();s(a,this.#g.modelMatrix),o&&r(a,o.viewProjection,a);const h=e();n(h,a);const c=o?o.near:1,l=o?o.far:1,d=u(h,[t,i,c,1]),f=u(h,[t,i,l,1]),p=g(d,1/d[3]),_=g(f,1/f[3]),w=new m(_,p).pointWhenZIs(0);return Math.abs(w[0])<this.#u&&Math.abs(w[1])<this.#m}draw(t){this.#g&&this.#g.draw(t)}}function g(t,i){return t.map((t=>t*i))}function u(t,i){const e=new Array(i.length).fill(0);if(Math.round(i.length**2)===t.length){for(let s=0;s<i.length;s++)for(let o=0;o<t.length;o+=4)e[s]+=t[o+s]*i[o/4];return e}}class m{#p;#_;constructor(t,i){const e=this.#w(t,i);this.#_=e,this.#p=i}getPoint(t){return this.#p.map(((i,e)=>i+t*this.#_[e]))}pointWhenZIs(t){const i=this.#_[2]?(t-this.#p[2])/this.#_[2]:0;return this.getPoint(i)}#w(t,i){const e=t.map(((t,e)=>t-i[e])),s=Math.sqrt(e.reduce(((t,i)=>t+i**2),0));return s?e.map((t=>t/s)):e}}class d{attributes=new Map;id;hEdge;constructor(t){this.id=t}}class f{opositte;next;vertex;constructor(t){this.vertex=t}}class p{hEdge;constructor(t){this.hEdge=t}}class _{#v=[];#x=[];#b=[];constructor(t){for(let i=0;i<t.length;i+=3){const e=t[i],s=t[i+1],o=t[i+2];this.#x[e]||(this.#x[e]=new d(e)),this.#x[s]||(this.#x[s]=new d(s)),this.#x[o]||(this.#x[o]=new d(o));const n=new f(this.#x[e]),r=new f(this.#x[s]),a=new f(this.#x[o]);n.next=r,r.next=a,a.next=n;const h=new p(n);this.#v[i]=n,this.#v[i+1]=r,this.#v[i+2]=a,this.#b[Math.round(i/3)]=h}this.setOposittes()}setOposittes(){for(let t of this.#v){const i=t.vertex,e=t.next.vertex;if(i.hEdge||(i.hEdge=t),!t.opositte)for(let s of this.#v)if(s.vertex===e&&s.next.vertex===i){t.opositte=s,s.opositte=t;break}}}setAttribute(t,i,e){if(t.length/i!==this.#x.length)throw new Error(`Mesh haves ${this.#x.length} vertices, but only ${t.length/i} were given.`);for(let s=0;s<t.length;s+=i){const o=t.slice(s,s+i);this.#x[Math.round(s/i)].attributes.set(e,o)}}createVBOs(){const t=new Map,i=[];for(let i of this.#x)for(let e of i.attributes.keys())t.get(e)||t.set(e,[]),t.get(e).push(...i.attributes.get(e));for(let t of this.#v)i.push(t.vertex.id);return{attributes:t,indexes:i,count:this.#x.length}}}class w extends c{#M;#E=-1;#T;#h=!1;set border(t){this.#T=t}constructor(t,i,e,s){super(t,i,e,t.TRIANGLES),this.#M=new _(s)}addAttribute(t,i,e=4){if(!(i instanceof Array))throw new Error("The info parameter needs to be a Array.");if(i.forEach((t=>{if("number"!=typeof t)throw new Error("The info array need to be numeric.")})),-1===this._gl.getAttribLocation(this._program,t))throw new Error(`the attribute ${t} doesn't exists in the shader code.`);this.#M.setAttribute(i,e,t),this.#h=!1}#l(){const t=this.#M.createVBOs(),i=Array.from(t.attributes.entries()).map((i=>({loc:this._gl.getAttribLocation(this._program,i[0]),buffer:h.createBuffer(this._gl,this._gl.ARRAY_BUFFER,new Float32Array(i[1])),dimension:Math.round(i[1].length/t.count)})));this._vaoLoc=h.createVAO(this._gl,...i),this.#E=h.createBuffer(this._gl,this._gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(t.indexes)),this._count=t.indexes.length,this.#h=!0}draw(t){this.#h||this.#l(),this.useDepthTest&&(this._gl.enable(this._gl.DEPTH_TEST),this._gl.depthFunc(this._gl.LESS)),this._gl.frontFace(this._gl.CCW),this._gl.enable(this._gl.CULL_FACE),this._gl.cullFace(this._gl.BACK),this._gl.bindVertexArray(this._vaoLoc),this._gl.useProgram(this._program),this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER,this.#E);const i=this._gl.getUniformLocation(this._program,"model"),s=this._gl.getUniformLocation(this._program,"modelView"),o=this._gl.getUniformLocation(this._program,"mvp");if(i)this._gl.uniformMatrix4fv(i,!1,this.modelMatrix);else if(s){const s=e();r(s,t.viewMatrix,this.modelMatrix),this._gl.uniformMatrix4fv(i,!1,s)}else if(o){const s=e();r(s,t.viewProjection,this.modelMatrix),this._gl.uniformMatrix4fv(i,!1,s)}this._gl.drawElements(this._primitive,this._count,this._gl.UNSIGNED_INT,0),this._gl.disable(this._gl.CULL_FACE),this.useDepthTest&&this._gl.disable(this._gl.DEPTH_TEST)}pointCollision(t,i,e){return!!this.#T&&this.#T.pointCollision(t,i,e,this)}get drawBorder(){return this.#T.draw()}static async loadMeshFromObj(t,i,e,s,o){const n=await fetch(t),r=await n.text(),a=new Map,h=r.split("\n"),c=[],g=[],u=[],m=[];let d=0;for(let t of h)if(t.startsWith("vn")){const i=t.replace("vn ","").split(" ").map(Number.parseFloat);g.push(...i,1);const e=Math.sqrt(v(i,i));if(Math.abs(v(i,[0,0,1])/e)<.5){const t=i.join(",");a.get(t)||a.set(t,d)}d++}else if(t.startsWith("vt")){const i=t.replace("vt ","").split(" ").map(Number.parseFloat);u.push(...i)}else if(t.startsWith("v")){const i=t.replace("v ","").split(" ").map(Number.parseFloat);c.push(...i,1)}else if(t.startsWith("f")){const i=t.replace("f ","").split(" ").map((t=>{const i=t.indexOf("/"),e=t.slice(0,i);return Number.parseInt(e)-1}));m.push(...i)}const f=new x(a,c,i),p=new w(i,e,s,m);if(p.addAttribute("position",c),p.addAttribute("normal",g),p.useDepthTest=!0,0!==u.length){if(!o)throw new Error("This mesh need to a texture path");p.addAttribute("texCoord",u,3);const t=await l.loadImage(o);p.createTex(t,"uTexture")}return p.border=f,p}}const v=(t,i)=>t.reduce(((t,e,s)=>t+e*i[s]),0);class x{#A;#P;#C;#y;#S;#L;constructor(t,i){this.#A=t,this.#P=i;let e=1/0,s=-1/0;for(let t=0;t<this.#P.length;t+=4)this.#P[t+2]<e&&(e=this.#P[t+2]),this.#P[t+2]>s&&(s=this.#P[t+2]);this.#S=e,this.#L=s}pointCollision(t,i,e,s){return this.#C=null,this.#y=null,this.#U(t,i,this.#S,e,s)||this.#U(t,i,this.#L,e,s)}#U(t,i,o,a,h){const c=e();s(c,h.modelMatrix),a&&r(c,a.viewProjection,c);const l=e();n(l,c);const g=a?a.near:1,u=a?a.far:1,m=x.multiplyMatWithVec(l,[t,i,g,1]),d=x.multiplyMatWithVec(l,[t,i,u,1]),f=x.scalarMulti(m,1/m[3]),p=x.scalarMulti(d,1/d[3]),_=new b(p,f).pointWhenZIs(o);return this.#C?this.#y=_:this.#C=_,this.#R(_)}#R(t){let i,e,s=0;for(let o of this.#A.entries()){const n=4*o[1],r=[this.#P[n],this.#P[n+1]];if(!i){i=r,e=r;continue}const a=this.leftToEdge(t,e,r);if(2===a)return!0;a&&s++,e=r}return this.leftToEdge(t,e,i)&&s++,s%2==1}leftToEdge(t,i,e){if(e[0]===t[0]&&e[1]===t[1])return!0;if(i[0]===t[0]&&i[1]===t[1])return!0;const s=[e[1],i[1]];s.sort();const[o,n]=s;if(t[1]>=n||t[1]<=o)return!1;const r=i[0]-e[0];if(!r)return t[0]<=i[0];const a=(i[1]-e[1])/r,h=i[0]-i[0]*a;return t[0]<=(t[1]-h)/a}draw(){const t=document.createElement("canvas");t.width=1e3,t.height=1e3,t.style.backgroundColor="rgb(100, 0, 0)";const i=t.getContext("2d");let e;i.beginPath();for(let t of this.#A.entries()){const s=4*t[1],o=[this.#P[s],this.#P[s+1],this.#P[s+2]];e?i.lineTo(500*o[0]+250,500*(1-o[1])):(e=o,i.moveTo(500*o[0]+250,500*(1-o[1])))}return i.lineTo(500*e[0]+250,500*(1-e[1])),i.stroke(),this.#C&&i.fillRect(500*this.#C[0]+250,500*(1-this.#C[1]),5,5),this.#y&&i.fillRect(500*this.#y[0]+250,500*(1-this.#y[1]),5,5),t}static multiplyMatWithVec(t,i){const e=new Array(i.length).fill(0);if(Math.round(i.length**2)===t.length){for(let s=0;s<i.length;s++)for(let o=0;o<t.length;o+=4)e[s]+=t[o+s]*i[o/4];return e}}static scalarMulti(t,i){return t.map((t=>t*i))}}class b{#p;#_;constructor(t,i){const e=this.#w(t,i);this.#_=e,this.#p=i}getPoint(t){return this.#p.map(((i,e)=>i+t*this.#_[e]))}pointWhenZIs(t){const i=(t-this.#p[2])/this.#_[2];return this.getPoint(i)}#w(t,i){const e=t.map(((t,e)=>t-i[e])),s=Math.sqrt(e.reduce(((t,i)=>t+i**2),0));return e.map((t=>t/s))}}const M="#version 300 es\n    precision highp float;\n\n    uniform mat4 model;\n    uniform mat4 view;\n    uniform mat4 projection;\n    uniform vec4 color;\n\n    in vec4 position;\n    in vec4 normal;\n\n    out vec4 fPos;\n    out vec4 fColor;\n    out vec4 fNormal;\n\n    void main() {\n        gl_Position = (projection*view*model) * position;\n        gl_Position /= gl_Position.w;\n        fColor = color;\n        fPos = position;\n        fNormal = normal;\n    }\n",E="#version 300 es\n    precision highp float;\n    \n    uniform mat4 model;\n    uniform mat4 view;\n    uniform mat4 projection;\n\n    uniform vec3 amb_c;\n    uniform vec3 dif_c;\n    uniform vec3 esp_c;\n    uniform vec3 pos;\n    uniform float amb_k;\n    uniform float dif_k;\n    uniform float esp_k;\n    uniform float esp_p;\n\n    in vec4 fColor;\n    in vec4 normal;\n    in vec4 fPos;\n    in vec4 fNormal;\n\n    out vec4 color;\n\n    void main() {\n        mat4 modelView = view*model;\n\n        vec3 lightPos = (view * vec4(pos, 1.0)).xyz;\n        vec3 pos = -(modelView * fPos).xyz;\n\n        vec3 vNormal = normalize(inverse(transpose(modelView)) * fNormal).xyz;\n        vec3 vDistance = normalize(pos - lightPos);\n\n        vec3 normalPos = normalize(pos);\n\n        vec3 halfVector= normalize(vDistance + normalPos);\n\n        vec3 amb = amb_k * amb_c;\n\n        vec3 diff = max(dot(vNormal, vDistance), 0.0) * dif_k * dif_c;\n\n        vec3 spec = max(pow(dot(vNormal, halfVector), esp_p), 0.0) * esp_c * esp_k;\n\n        vec3 color3 = vec3(fColor);\n        \n        color3 = 0.5*color3 + 0.5*(diff + amb + spec);\n\n        color = vec4(color3, 1.0);\n    }\n";class T extends l{#k;async init(t,i=1e3){const e=document.createElement("canvas"),s=e.toDataURL("image/png");[e.width,e.height]=[i,i],await super.init(t,s),this.#k=e}async update(t=(()=>{}),i){t(this.#k.getContext("2d"));const e=this.#k.toDataURL("image/png"),s=await l.loadImage(e);c.changeTex(i,this._tex,s)}}class A{#I=e();#V=e();#F=e();camPosition=[0,0,1];lookDirection=[0,0,0];upDirection=[0,1,0];left=-4;right=4;bottom=-4;top=4;near=1;far=9;fovy=Math.PI/2;aspect;constructor(t){this.aspect=t.width/t.height}#j="perspective";set projectionType(t){if("orthogonal"!==t&&"perspective"!==t)throw new Error("Invalid type of projection.");this.#j=t}get viewMatrix(){return this.#D(),this.#I}get projMatrix(){return this.#X(),this.#V}#D(){o(this.#I),function(i,e,s,n){var r,a,h,c,l,g,u,m,d,f,p=e[0],_=e[1],w=e[2],v=n[0],x=n[1],b=n[2],M=s[0],E=s[1],T=s[2];Math.abs(p-M)<t&&Math.abs(_-E)<t&&Math.abs(w-T)<t?o(i):(u=p-M,m=_-E,d=w-T,r=x*(d*=f=1/Math.hypot(u,m,d))-b*(m*=f),a=b*(u*=f)-v*d,h=v*m-x*u,(f=Math.hypot(r,a,h))?(r*=f=1/f,a*=f,h*=f):(r=0,a=0,h=0),c=m*h-d*a,l=d*r-u*h,g=u*a-m*r,(f=Math.hypot(c,l,g))?(c*=f=1/f,l*=f,g*=f):(c=0,l=0,g=0),i[0]=r,i[1]=c,i[2]=u,i[3]=0,i[4]=a,i[5]=l,i[6]=m,i[7]=0,i[8]=h,i[9]=g,i[10]=d,i[11]=0,i[12]=-(r*p+a*_+h*w),i[13]=-(c*p+l*_+g*w),i[14]=-(u*p+m*_+d*w),i[15]=1)}(this.#I,this.camPosition,this.lookDirection,this.upDirection)}#X(){o(this.#V),"perspective"===this.#j?function(t,i,e,s,o){var n,r=1/Math.tan(i/2);t[0]=r/e,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=r,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=o&&o!==1/0?(n=1/(s-o),t[10]=(o+s)*n,t[14]=2*o*s*n):(t[10]=-1,t[14]=-2*s)}(this.#V,this.fovy,this.aspect,this.near,this.far):function(t,i,e,s,o,n,r){var a=1/(i-e),h=1/(s-o),c=1/(n-r);t[0]=-2*a,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*h,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*c,t[11]=0,t[12]=(i+e)*a,t[13]=(o+s)*h,t[14]=(r+n)*c,t[15]=1}(this.#V,this.left*this.aspect,this.right*this.aspect,this.bottom,this.top,this.left,this.right)}get viewProjection(){return this.#D(),this.#X(),o(this.#F),r(this.#F,this.#V,this.#I),this.#F}}class P{ambColor=[0,0,0];ambK=3;difColor=[.3,.3,.3];difK=4;espColor=[1,1,1];espK=3;espExp=20;pos;constructor(t){this.pos=t}createUniforms(t){t.setUniformValue("amb_c",this.ambColor,"3fv"),t.setUniformValue("amb_k",this.ambK,"1f"),t.setUniformValue("dif_c",this.difColor,"3fv"),t.setUniformValue("dif_k",this.difK,"1f"),t.setUniformValue("esp_c",this.espColor,"3fv"),t.setUniformValue("esp_k",this.espK,"1f"),t.setUniformValue("esp_p",this.espExp,"1f")}}class C{#Y=[];#B;#O;get camera(){return this.#O}constructor(t,i=[0,0,0,1]){if(t instanceof WebGL2RenderingContext){if(t.viewport(0,0,t.canvas.width,t.canvas.height),!i||!i.length||4!==i.length)throw new Error("The clear color need to be a array with 4 floats");t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),this.gl=t}}createCamera(t){this.#O=new A(t)}createLight(t){this.#B=new P(t)}appendElement(...t){t.forEach((t=>{if(!t.draw)throw new Error("Element need to have a draw function");this.#Y.push(t),this.#B&&t instanceof c&&this.#B.createUniforms(t)}))}draw(){for(let t of this.#Y)t.draw(this.#O)}}class y{#N;#W;#G;#K=!1;static async build(t){const i=new y;return await i.init(t),i}async init(t){this.gl=t.getContext("webgl2"),await this.#z(),await this.#H()}async#z(){this.#N=new C(this.gl);const t=new l;await t.init(this.gl,"./assets/menu/fundo.jpg");const i=new l;await i.init(this.gl,"./assets/menu/logo_war.png");const e=new l;await e.init(this.gl,"./assets/menu/play_button.png");const s=new l;await s.init(this.gl,"./assets/menu/settings_button.png");const o=new l;await o.init(this.gl,"./assets/menu/max_button.png"),t.scaleY=1.85,i.scale=[.35,.56],e.scale=[.15,.26],s.scale=[.046,.08],o.scale=[.046,.08],i.positionY=.25,e.positionY=-.55,s.positionX=.9,s.positionY=.57,o.positionX=.9,o.positionY=.8,this.#N.appendElement(t,i,e,s,o),this.gl.canvas.addEventListener("click",(t=>{const i=y.mapClickInCanvas(t.clientX,t.clientY,this.gl.canvas);e.pointCollision(...i)&&(this.#K=!0)}))}async#H(){const t=new l;await t.init(this.gl,"./assets/mapa.jpg");const i=new l;await i.init(this.gl,"./assets/menu/settings_button.png");const e=new l;await e.init(this.gl,"./assets/menu/max_button.png");const s=new l;await s.init(this.gl,"./assets/game/card_button.png");const o=new l;await o.init(this.gl,"./assets/game/objective_button.png");const n=new l;await n.init(this.gl,"./assets/game/current_player.png");const r=new l;await r.init(this.gl,"./assets/game/show_players.png");const a=new S;await a.init(this.gl);const h=new L;await h.init(this.gl),t.scale=[2.7,2.7],i.scale=[.046,.08],e.scale=[.046,.08],s.scale=[.5,.8],o.scale=[.47,.8],n.scale=[1.5,2.5],r.scale=[.47,.8],i.positionX=.9,i.positionY=.57,i.depth=.2,e.positionX=.9,e.positionY=.8,e.depth=.2,s.positionX=2.9,s.positionY=-3.2,s.depth=.2,o.positionX=3.6,o.positionY=-3.2,o.depth=.2,r.positionX=-3.6,r.positionY=-3.2,r.depth=.2,n.positionY=-3.375,n.depth=.2;const c=await w.loadMeshFromObj("./assets/meshes/brasil-rotacionado.obj",this.gl,M,E);c.scale=[1.2,1.2,1],c.position=[-0,-0,.3],c.rotation[1]=-.2;const g=await w.loadMeshFromObj("./assets/meshes/argentina.obj",this.gl,M,E);g.scale=[1.6,1.6,1.5],g.position=[-.21,-.35,.3],this.#W=new C(this.gl),this.#W.createCamera(U),this.#W.camera.camPosition[2]=1.8,this.#W.camera.camPosition[1]=-.3,this.#W.createLight([1,0,.3]),this.#G=new C(this.gl);const u=new T;await u.init(this.gl),await u.update((t=>{t instanceof CanvasRenderingContext2D&&(t.fillStyle="white",t.ellipse(500,500,400,500,0,0,2*Math.PI),t.lineWidth=100,t.stroke(),t.font="600px Arial",t.fillText("1",320,600))}),this.gl),u.scale=[.1,.1],u.positionY=.2,this.#W.appendElement(t,c,g,u),this.#G.appendElement(i),c.setUniformValue("view",this.#W.camera.viewMatrix,"Matrix4fv"),c.setUniformValue("projection",this.#W.camera.projMatrix,"Matrix4fv"),c.setUniformValue("color",[1,0,0,1],"4fv"),g.setUniformValue("view",this.#W.camera.viewMatrix,"Matrix4fv"),g.setUniformValue("projection",this.#W.camera.projMatrix,"Matrix4fv"),g.setUniformValue("color",[0,0,1,1],"4fv"),this.gl.canvas.addEventListener("click",(t=>{if(!this.#K)return;const i=y.mapClickInCanvas(t.clientX,t.clientY,this.gl.canvas);c.pointCollision(...i)&&alert("foi"),g.pointCollision(...i)&&alert("argentina")}))}draw(){this.#K?(this.#W.draw(),this.#G.draw()):this.#N.draw()}run(){const t=()=>{this.draw(),requestAnimationFrame(t)};t()}static mapClickInCanvas(t,i,e){const s=[t-e.offsetLeft-e.width/2,e.height/2-(i-e.offsetTop)];return[2*s[0]/e.width,2*s[1]/e.height]}}class S{async init(t){this.show_cards=new l,await this.show_cards.init(t,"./assets/game/show_cards.png"),this.show_cards.scale=[1.7,3],console.log(this.show_cards.positionX),S.setInitialPosition(this.show_cards.positionX,-6.355,.3,this.show_cards),this.cancel_button=new l,await this.cancel_button.init(t,"./assets/game/cancel_button.png"),this.cancel_button.scale=[.27,.48],S.setInitialPosition(-1.42,-6.2,.4,this.cancel_button),this.ok_button=new l,await this.ok_button.init(t,"./assets/game/ok_button.png"),this.ok_button.scale=[.27,.48],S.setInitialPosition(1.42,-6.2,.4,this.ok_button),this.cards_info=new l,await this.cards_info.init(t,"assets/game/cards_info.png"),this.cards_info.scale=[.8,1.35],S.setInitialPosition(6.35,this.cards_info.positionY,.3,this.cards_info)}static setInitialPosition(t,i,e,s){s.positionX=t,s.positionY=i,s.depth=e}moveAll(t,i){this.show_cards.positionY+=i,this.cancel_button.positionY+=i,this.ok_button.positionY+=i,this.cards_info.positionX+=t}draw(t){this.show_cards.draw(t),this.cancel_button.draw(t),this.ok_button.draw(t),this.cards_info.draw(t)}}class L{async init(t){this.fortify=new l,await this.fortify.init(t,"./assets/game/fortify.png"),this.fortify.scale=[1.7,3],L.setInitialPosition(this.fortify.positionX,-3.25,.3,this.fortify),this.cancel_button=new l,await this.cancel_button.init(t,"./assets/game/cancel_button.png"),this.cancel_button.scale=[.27,.48],S.setInitialPosition(1.42,-3.2,.4,this.cancel_button),this.ok_button=new l,await this.ok_button.init(t,"./assets/game/ok_button.png"),this.ok_button.scale=[.27,.48],S.setInitialPosition(1.42,-3.2,.4,this.ok_button)}static setInitialPosition(t,i,e,s){s.positionX=t,s.positionY=i,s.depth=e}moveAll(t){this.fortify.positionY+=t,this.cancel_button.positionY+=t,this.ok_button.positionY+=t}draw(t){this.fortify.draw(t),this.cancel_button.draw(t),this.ok_button.draw(t)}}const U=document.querySelector("#game-screen");y.build(U).then((t=>{t.run()}))})();
//# sourceMappingURL=main.bundle.js.map