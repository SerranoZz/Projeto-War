import ImageGL from "../view/image";
import GLUtil from "./gl-util";
import HalfEdgeDS from "./half-edge";
import Mesh from "./mesh";
import { mat4 } from "gl-matrix";

export default class IndexedMeshT extends Mesh{
    #hEdge;
    #indicesLoc = -1;
    #border;

    #vao_updated = false;

    set border(border){
        this.#border = border;
    }

    constructor(gl, vertShaderSrc, fragShaderSrc, indexes){
        super(gl, vertShaderSrc, fragShaderSrc, gl.TRIANGLES);

        this.#hEdge = new HalfEdgeDS(indexes);
    }

    addAttribute(name, info, pointDim = 4){
        if(!(info instanceof Array))
            throw new Error("The info parameter needs to be a Array.");

        info.forEach(val => {
            if(typeof val !== "number") 
                throw new Error("The info array need to be numeric.");
        });

        if(this._gl.getAttribLocation(this._program, name)===-1)
            throw new Error(`the attribute ${name} doesn't exists in the shader code.`);


        this.#hEdge.setAttribute(info, pointDim, name);  
        
        this.#vao_updated = false;
    }

    #createVAO() {
        const vbos = this.#hEdge.createVBOs();

        const attributes = Array.from(vbos.attributes.entries()).map(entry => {

            return {
                loc: this._gl.getAttribLocation(this._program, entry[0]),
                buffer: GLUtil.createBuffer(this._gl, this._gl.ARRAY_BUFFER, new Float32Array(entry[1])),
                dimension: Math.round(entry[1].length/vbos.count)
            }
        })

        this._vaoLoc = GLUtil.createVAO(this._gl, ...attributes);
        this.#indicesLoc = GLUtil.createBuffer(this._gl, this._gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(vbos.indexes));

        this._count = vbos.indexes.length;
        this.#vao_updated = true;
    }

    draw(cam){
        if(!this.#vao_updated)    
            this.#createVAO();

        if(this.useDepthTest){
            this._gl.enable(this._gl.DEPTH_TEST);
            this._gl.depthFunc(this._gl.LESS);
        }
        
        this._gl.frontFace(this._gl.CCW);

        this._gl.enable(this._gl.CULL_FACE);
        this._gl.cullFace(this._gl.BACK);

        this._gl.bindVertexArray(this._vaoLoc);

        this._gl.useProgram(this._program);

        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this.#indicesLoc);

        const modelLoc = this._gl.getUniformLocation(this._program, "model");
        const mvLoc = this._gl.getUniformLocation(this._program, "modelView");
        const mvpLoc = this._gl.getUniformLocation(this._program, "mvp");

        if(modelLoc){
            this._gl.uniformMatrix4fv(modelLoc, false, this.modelMatrix);
        }else if(mvLoc){
            const mv = mat4.create();
            mat4.multiply(mv, cam.viewMatrix, this.modelMatrix);
            this._gl.uniformMatrix4fv(modelLoc, false, mv);
        }else if(mvpLoc){
            const mvp = mat4.create();
            mat4.multiply(mvp, cam.viewProjection, this.modelMatrix);
            this._gl.uniformMatrix4fv(modelLoc, false, mvp);
        }
        
        this._gl.drawElements(this._primitive, this._count, this._gl.UNSIGNED_INT, 0);

        this._gl.disable(this._gl.CULL_FACE);

        if(this.useDepthTest)
            this._gl.disable(this._gl.DEPTH_TEST);
    }

    pointCollision(x, y, camera){
        //colocar o throw dps
        if(!this.#border) return false;

        return this.#border.pointCollision(x, y, camera, this);
    }

    get drawBorder(){
        return this.#border.draw();
    }

    static async loadMeshFromObj(path, gl, vertShader, fragShader, texturePath){
        const obj = await fetch(path);
        const text = await obj.text();

        const border = new Map();
    
        const lines = text.split("\n");

        const vertices = [];
        const normals = [];
        const texCoords = [];
        const indexes = [];

        let borderIndex = 0;

        for(let line of lines){
            if(line.startsWith("vn")){
                const values = line.replace("vn ", "").split(" ").map(Number.parseFloat);
                normals.push(...values, 1);

                const d = Math.sqrt(dotProduct(values, values));

                if(Math.abs(dotProduct(values, [0, 0, 1])/d)<0.5){
                    const key = values.join(",");
                    if(!border.get(key)) border.set(key, borderIndex);
                }

                borderIndex++;
            }else if(line.startsWith("vt")){
                const values = line.replace("vt ", "").split(" ").map(Number.parseFloat);
                texCoords.push(...values);
            }else if(line.startsWith("v")){
                const values = line.replace("v ", "").split(" ").map(Number.parseFloat);
                vertices.push(...values, 1);
            }else if(line.startsWith("f")){
                const values = line.replace("f ", "").split(" ").map(val => {
                    const init = val.indexOf("/");
                    const vIndex = val.slice(0, init);
                    return Number.parseInt(vIndex)-1;
                });
                indexes.push(...values);
            }

        }

        const border1 = new Border(border, vertices, gl);

        const mesh = new IndexedMeshT(gl, vertShader, fragShader, indexes);
        mesh.addAttribute("position", vertices);
        mesh.addAttribute("normal", normals);

        mesh.useDepthTest = true;

        if(texCoords.length!==0){
            if(!texturePath)
                throw new Error("This mesh need to a texture path");

            mesh.addAttribute("texCoord", texCoords, 3);

            const image = await ImageGL.loadImage(texturePath);

            mesh.createTex(image, "uTexture");
        }

        mesh.border = border1;

        return mesh;
    }
}

const dotProduct = (v1, v2) =>{
    return v1.reduce((ac, curr, i)=>ac+=curr*v2[i], 0);
}

class Border{
    #borderMap;
    #coords;
    #lastClickMin;
    #lastClickMax;
    #min;
    #max;

    constructor(border, coords){
        this.#borderMap = border;
        this.#coords = coords;

        let min = Infinity;
        let max = -Infinity;

        for(let i = 0; i<this.#coords.length; i+=4){
            if(this.#coords[i+2]<min) min = this.#coords[i+2];
            if(this.#coords[i+2]>max) max = this.#coords[i+2];
        }

        this.#min = min;
        this.#max = max;
    }

    pointCollision(x, y, camera, mesh){
        /*let init = this.#min;
        const distance = (this.#max - this.#min)/100;

        while(init<this.#max){

        }
        */
        this.#lastClickMin = null;
        this.#lastClickMax = null;

        return this.#pointCollision(x, y, this.#min, camera, mesh) || 
            this.#pointCollision(x, y, this.#max, camera, mesh);

        //return this.#pointCollision(x, y, 0, camera, mesh);
    }

    #pointCollision(x, y, z, camera, mesh){
    
        const mvp = mat4.create();
        mat4.copy(mvp, mesh.modelMatrix);
    
        if(camera){
            const viewProj = camera.viewProjection;
            mat4.multiply(mvp, viewProj, mvp);
        }
    
        const inverse = mat4.create();
    
        mat4.invert(inverse, mvp);
    
        const near = (camera)?camera.near: 1;
        const far = (camera)?camera.far: 1;

        const p1 = Border.multiplyMatWithVec(inverse, [x, y, near, 1]);
        const p2 = Border.multiplyMatWithVec(inverse, [x, y, far, 1]);

        const p1Norm = Border.scalarMulti(p1, 1/p1[3]);
        const p2Norm = Border.scalarMulti(p2, 1/p2[3]);

        const line = new Line(p2Norm, p1Norm);

        const pointT = line.pointWhenZIs(z);

        if(!this.#lastClickMin) this.#lastClickMin = pointT;
        else this.#lastClickMax = pointT;
    
        let collided = this.#collideAlt(pointT);

        return collided;
    }

    #collideAlt(point){
        let [minX, minY] = [Infinity, Infinity];
        
        let [maxX, maxY] = [-Infinity, -Infinity];


        for(let entry of this.#borderMap.entries()){
            const i = entry[1]*4;
            const coord = [this.#coords[i], this.#coords[i+1]];

            if(coord[0]<minX) minX = coord[0];
            if(coord[1]<minY) minY = coord[1];

            if(coord[0]>maxX) maxX = coord[0];
            if(coord[1]>maxY) maxY = coord[1];
        }

        console.log(minX, maxX, minY, maxY, point);

        return (point[0]>=minX && point[0]<=maxX && point[1]>=minY && point[1]<=maxY);
    }

    #collide(point){
        let first;
        let prev;

        let intersecsCount = 0;

        for(let entry of this.#borderMap.entries()){
            const i = entry[1]*4;
            const coord = [this.#coords[i], this.#coords[i+1]];

            if(!first){
                first = coord;
                prev = coord;
                continue;
            }

            const compare = this.leftToEdge(point, prev, coord);

            if(compare === 2) return true;

            if(compare) {
                intersecsCount++;
            }

            prev = coord;
        }

        if(this.leftToEdge(point, prev, first)) intersecsCount++;

        //console.log(intersecsCount);

        return (intersecsCount % 2 === 1);
    }

    leftToEdge(point, prev, coord){
        if(coord[0] === point[0] && coord[1] === point[1]) return true;
        if(prev[0] === point[0] && prev[1] === point[1]) return true;

        const y = [coord[1], prev[1]];
        y.sort();
        const [minY, maxY] = y;

        if(point[1]>=maxY || point[1]<=minY) return false;

        const deltaX = prev[0]-coord[0];

        if(!deltaX) return point[0]<=prev[0];

        const ang = (prev[1]-coord[1])/deltaX;
        
        const coefLin = prev[0] - prev[0]*ang;

        return (point[0] <= (point[1]-coefLin)/ang);
    }

    draw(){
        const canvas = document.createElement("canvas");
        canvas.width = 1000;
        canvas.height = 1000;
        canvas.style.backgroundColor = "rgb(100, 0, 0)";

        const ctx = canvas.getContext("2d");
        ctx.beginPath();

        let first;

        for(let entry of this.#borderMap.entries()){
            const i = entry[1]*4;
            const coord = [this.#coords[i], this.#coords[i+1], this.#coords[i+2]];

            if(!first) {
                first = coord;
                ctx.moveTo(coord[0]*500+250, (-coord[1]+1.0)*500);
            } else ctx.lineTo(coord[0]*500+250, (-coord[1]+1.0)*500);

        }
        ctx.lineTo(first[0]*500+250, (-first[1]+1.0)*500)
        ctx.stroke();

        if(this.#lastClickMin)
            ctx.fillRect(this.#lastClickMin[0]*500+250, (-this.#lastClickMin[1]+1.0)*500, 5, 5);
            
        if(this.#lastClickMax)
            ctx.fillRect(this.#lastClickMax[0]*500+250, (-this.#lastClickMax[1]+1.0)*500, 5, 5);

        return canvas;
    }

    static multiplyMatWithVec(mat, vec){
        const out = new Array(vec.length).fill(0);
    
        if(Math.round(vec.length**2) !== mat.length)
            return;
    
        for(let i = 0; i<vec.length; i++)
            for(let j = 0; j<mat.length; j+=4)
                out[i]+=mat[j+i]*vec[j/4];

        return out;
    }

    static scalarMulti(vector, scalar){
        return vector.map(coord => coord*scalar);
    }
}

class Line{
    #origin;
    #direction;

    constructor(extreme, origin){
        const vDir = this.#getDirection(extreme, origin);

        this.#direction = vDir;
        this.#origin = origin;
    }

    getPoint(t){
        return this.#origin.map((coord, index) => coord+t*this.#direction[index]);
    }

    pointWhenZIs(z){
        const t = (z - this.#origin[2])/this.#direction[2];

        return this.getPoint(t);
    }

    #getDirection(extreme, origin){
        const v = extreme.map((coord, index)=>coord-origin[index]);

        const size = Math.sqrt(v.reduce((ac, coord) => ac+coord**2, 0));

        const vDir = v.map(val=> val/size);

        return vDir;
    }
}