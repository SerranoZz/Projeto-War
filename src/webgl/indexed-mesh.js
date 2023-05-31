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
    #lastClick;
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
        //return this.#pointCollision(x, y, 0, camera, mesh);

        return this.#pointCollision(x, y, this.#min, camera, mesh) || 
            this.#pointCollision(x, y, this.#max, camera, mesh);
    }

    #pointCollision(x, y, z, camera, mesh){
        const point = [x, y, z, 1];
    
        const mvp = mat4.create();
        mat4.copy(mvp, mesh.modelMatrix);
    
        if(camera){
            const viewProj = camera.viewMatrix;
            mat4.multiply(mvp, viewProj, mvp);
        }
    
        const inverse = mat4.create();
    
        mat4.invert(inverse, mvp);
    
        let pointT = Border.multiplyMatWithVec(inverse, point);

        console.log(point, pointT);
    
        let collided = this.#collide(pointT);

        if(collided) this.#lastClick = point;

        return collided;
    }

    #collide(point){
        let first;
        let prev;

        let intersecsCount = 0;
        console.log("collide");
        console.log(point);

        for(let entry of this.#borderMap.entries()){
            const i = entry[1]*4;
            const coord = [this.#coords[i], this.#coords[i+1], this.#coords[i+2]];

            if(!first){
                first = coord;
                prev = coord;
                continue;
            }

            const x = [coord[0], prev[0]];
            x.sort();
            const [minX, maxX] = x;
            
            const y = [coord[1], prev[1]];
            y.sort();
            const [minY, maxY] = y;

            const ang = (minY-maxY)/(minX-maxX);
            const coefLin = minY - minX*ang;

            if(point[1] <= maxY && point[1] >= minY && point[0] <= (point[1] - coefLin)/ang) {
                intersecsCount++;
                console.log(prev, coord, (point[1]-coefLin)/ang);

            }

            prev = coord;
        }

        const maxX = Math.max(first[0], prev[0]);
            
        const y = [first[1], prev[1]];
        y.sort();
        const [minY, maxY] = y;

        if(point[1] <= maxY && point[1] >= minY && point[0] <= maxX) intersecsCount++;

        return (intersecsCount % 2 === 1);
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

        if(this.#lastClick)
            ctx.fillRect(this.#lastClick[0]*500+250, (-this.#lastClick[1]+1.0)*500, 5, 5);
            

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
}