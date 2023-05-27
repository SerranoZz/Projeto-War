import { vec3, mat4 } from "gl-matrix";
import GLUtil from "./gl-util";

export default class Mesh{

    _gl;

    position = [0.0, 0.0, 0.0];
    rotation = [0.0, 0.0, 0.0];
    scale = [1.0, 1.0, 1.0];

    static #textureI = 0;

    #modelMatrix = mat4.create();

    #attributes = [];

    #vertShader = null;
    #fragShader = null;

    _program = null;

    _primitive;

    #count;

    _vaoLoc;

    #uTexture;
    #texture;

    _useModelMatrix = true;
    
    get modelMatrix(){
        this._updateModelMatrix();
        return this.#modelMatrix;
    }

    set useModelMatrix(use){
        if(!(use instanceof Boolean))
            throw new Error("useModelMatrix need to be a boolean value");
        
        this._useModelMatrix = use;
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
            loc: this._gl.getAttribLocation(this._program, name),
            buffer: GLUtil.createBuffer(this._gl, this._gl.ARRAY_BUFFER,f32Array),
            dimension: pointDim
        })
    }

    constructor(gl, vertShaderSrc, fragShaderSrc, primitive){
        this._primitive = primitive;
        
        this._gl = gl;
        //restringir os tipos

        this.createShader(vertShaderSrc, fragShaderSrc);
    }

    createShader(vertShaderSrc, fragShaderSrc) {
        this.#vertShader = GLUtil.createShader(this._gl, this._gl.VERTEX_SHADER, vertShaderSrc);
        this.#fragShader = GLUtil.createShader(this._gl, this._gl.FRAGMENT_SHADER, fragShaderSrc);
        this._program = GLUtil.createProgram(this._gl, this.#vertShader, this.#fragShader);
    
        this._gl.useProgram(this._program);
    }

    createVAO() {
        this._vaoLoc = GLUtil.createVAO(this._gl, ...this.#attributes);
    }

    _updateModelMatrix(){
        mat4.identity(this.#modelMatrix);

        mat4.translate(this.#modelMatrix, this.#modelMatrix, this.position);
        mat4.rotateX(this.#modelMatrix, this.#modelMatrix, this.rotation[0]);
        mat4.rotateY(this.#modelMatrix, this.#modelMatrix, this.rotation[1]);
        mat4.rotateZ(this.#modelMatrix, this.#modelMatrix, this.rotation[2]);
        mat4.scale(this.#modelMatrix, this.#modelMatrix, this.scale);
    }

    createTex(texData, textureName){
        this.#uTexture = this._gl.getUniformLocation(this._program, textureName);
        this.#texture = this._gl.createTexture();
        this._gl.activeTexture(this._gl[`TEXTURE${Mesh.#textureI}`]);
        this._gl.bindTexture(this._gl.TEXTURE_2D, this.#texture);

        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);

        this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA32F, this._gl.RGBA, this._gl.FLOAT, texData);

        this._gl.useProgram(this._program);
        this._gl.uniform1i(this.#uTexture, Mesh.#textureI);

        Mesh.#textureI++;

        return {tex: this.#texture, index: Mesh.#textureI - 1};
    }

    setUniformValue(name, value, type){
        const uniformLoc = this._gl.getUniformLocation(this._program, name);
        
        if(uniformLoc === -1)
            throw new Error("This uniform doesn't exist in the shader code.");

        this._gl.useProgram(this._program);

        if(type.startsWith("Matrix"))
            this._gl["uniform"+type](uniformLoc, false, value);
        else
            this._gl["uniform"+type](uniformLoc, value);
    }

    draw(cam){
        this._gl.frontFace(this._gl.CCW);

        this._gl.enable(this._gl.CULL_FACE);
        this._gl.cullFace(this._gl.BACK);

        this._updateModelMatrix();

        this._gl.bindVertexArray(this._vaoLoc);

        this._gl.useProgram(this._program);

        const modelLoc = this._gl.getUniformLocation(this._program, "model");
        const mvLoc = this._gl.getUniformLocation(this._program, "modelView");
        const mvpLoc = this._gl.getUniformLocation(this._program, "mvp");

        if(modelLoc){
            this._gl.uniformMatrix4fv(modelLoc, false, this.#modelMatrix);
        }else if(mvLoc){
            const mv = mat4.create();

            if(cam)
                mat4.multiply(mv, cam.viewMatrix, this.#modelMatrix);
            else
                mat4.copy(mv, this.#modelMatrix);
            
            this._gl.uniformMatrix4fv(mvLoc, false, mv);

        }else if(mvpLoc){
            const mvp = mat4.create();

            if(cam)
                mat4.multiply(mvp, cam.viewProjection, this.#modelMatrix);
            else
                mat4.copy(mvp, this.#modelMatrix);
                
            this._gl.uniformMatrix4fv(mvpLoc, false, mvp);
        }

        this._gl.drawArrays(this._primitive, 0, this.#count);

        this._gl.disable(this._gl.CULL_FACE);
    }

    static changeTex(gl, {tex, index}, texData){
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, gl.RGBA, gl.FLOAT, texData);
    }
}
