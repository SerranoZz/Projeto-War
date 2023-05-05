import { vec3, mat4 } from "gl-matrix";
import GLUtil from "./gl-util";

export default class Mesh{
    
    /*static get UNIFORM_INT(){
        return ""
    }*/

    #gl;

    position = [0.0, 0.0, 0.0];
    rotation = [0.0, 0.0, 0.0];
    scale = [1.0, 1.0, 1.0];

    static #textureI = 0;

    #modelMatrix = mat4.create();

    #attributes = [];

    #vertShader = null;
    #fragShader = null;

    #program = null;

    #primitive;

    #count;

    #vaoLoc;

    #uTexture;
    #texture;

    #useModelMatrix = true;
    
    set useModelMatrix(use){
        if(!(use instanceof Boolean))
            throw new Error("useModelMatrix need to be a boolean value");
        
        this.#useModelMatrix = use;
    }

    addAttribute(name, info, pointDim = 4){
        if(!(info instanceof Array))
            throw new Error("The info parameter needs to be a Array.");

        info.forEach(val => {
            if(typeof val !== "number") 
                throw new Error("The info array need to be numeric.");
        });

        const count = info.length/pointDim;

        if(!this.#count) this.#count = count;

        else if(count !== this.#count) 
            throw new Error("The VBOs need to contain the same number of vertex.");

        const f32Array = new Float32Array(info);

        this.#attributes.push({
            loc: this.#gl.getAttribLocation(this.#program, name),
            buffer: GLUtil.createBuffer(this.#gl, this.#gl.ARRAY_BUFFER,f32Array),
            dimension: pointDim
        })
    }

    constructor(gl, vertShaderSrc, fragShaderSrc, primitive){
        this.#primitive = primitive;
        
        this.#gl = gl;
        //restringir os tipos

        this.createShader(vertShaderSrc, fragShaderSrc);
    }

    createShader(vertShaderSrc, fragShaderSrc) {
        this.#vertShader = GLUtil.createShader(this.#gl, this.#gl.VERTEX_SHADER, vertShaderSrc);
        this.#fragShader = GLUtil.createShader(this.#gl, this.#gl.FRAGMENT_SHADER, fragShaderSrc);
        this.#program = GLUtil.createProgram(this.#gl, this.#vertShader, this.#fragShader);
    
        this.#gl.useProgram(this.#program);
    }

    createVAO() {
        this.#vaoLoc = GLUtil.createVAO(this.#gl, ...this.#attributes);
    }

    #updateModelMatrix(){
        mat4.identity(this.#modelMatrix);

        mat4.translate(this.#modelMatrix, this.#modelMatrix, this.position);
        mat4.rotateX(this.#modelMatrix, this.#modelMatrix, this.rotation[0]);
        mat4.rotateY(this.#modelMatrix, this.#modelMatrix, this.rotation[1]);
        mat4.rotateZ(this.#modelMatrix, this.#modelMatrix, this.rotation[2]);
        mat4.scale(this.#modelMatrix, this.#modelMatrix, this.scale);
    }

    createTex(texData, textureName){
        this.#uTexture = this.#gl.getUniformLocation(this.#program, textureName);
        this.#texture = this.#gl.createTexture();
        this.#gl.activeTexture(this.#gl[`TEXTURE${Mesh.#textureI}`]);
        this.#gl.bindTexture(this.#gl.TEXTURE_2D, this.#texture);

        this.#gl.texParameteri(this.#gl.TEXTURE_2D, this.#gl.TEXTURE_WRAP_S, this.#gl.CLAMP_TO_EDGE);
        this.#gl.texParameteri(this.#gl.TEXTURE_2D, this.#gl.TEXTURE_WRAP_T, this.#gl.CLAMP_TO_EDGE);
        this.#gl.texParameteri(this.#gl.TEXTURE_2D, this.#gl.TEXTURE_MIN_FILTER, this.#gl.NEAREST);
        this.#gl.texParameteri(this.#gl.TEXTURE_2D, this.#gl.TEXTURE_MAG_FILTER, this.#gl.NEAREST);

        this.#gl.texImage2D(this.#gl.TEXTURE_2D, 0, this.#gl.RGBA32F, this.#gl.RGBA, this.#gl.FLOAT, texData);

        this.#gl.useProgram(this.#program);
        this.#gl.uniform1i(this.#uTexture, Mesh.#textureI);

        console.log(Mesh.#textureI);

        Mesh.#textureI++;
    }

    setUniformValue(name, value, type){
        const uniformLoc = this.#gl.getUniformLocation(this.#program, name);
        
        if(uniformLoc === -1)
            throw new Error("This uniform doesn't exist in the shader code.");

        this.#gl.useProgram(this.#program);
        this.#gl["uniform"+type](uniformLoc, value);
    }

    draw(cam){
        this.#gl.frontFace(this.#gl.CCW);

        this.#gl.enable(this.#gl.CULL_FACE);
        this.#gl.cullFace(this.#gl.BACK);

        this.#updateModelMatrix();

        const mvp = (this.#useModelMatrix)? this.#modelMatrix: mat4.create();

        if(cam){
            const viewProj = cam.viewProjection;
            mat4.multiply(mvp, viewProj, mvp);
        }

        this.#gl.useProgram(this.#program);

        const mvpLoc = this.#gl.getUniformLocation(this.#program, "mvp");

        if(mvp !== -1){ 
            this.#gl.uniformMatrix4fv(mvpLoc, false, mvp);
        }

        this.#gl.drawArrays(this.#primitive, 0, this.#count);

        this.#gl.disable(this.#gl.CULL_FACE);
    }

}