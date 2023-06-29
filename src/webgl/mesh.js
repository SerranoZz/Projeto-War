import { vec3, mat4 } from "gl-matrix";
import GLUtil from "./gl-util";

export default class Mesh{
    _gl;

    position = [0.0, 0.0, 0.0];
    rotation = [0.0, 0.0, 0.0];
    scale = [1.0, 1.0, 1.0];

    #modelMatrix = mat4.create();

    #attributes = [];

    #vertShader = null;
    #fragShader = null;

    _program = null;

    _primitive;

    #count;

    _vaoLoc;

    #uTexture;
    #textures = [];;

    #vao_updated = false;

    useDepthTest = false;
    
    get modelMatrix(){
        this.updateModelMatrix();
        return this.#modelMatrix;
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

        this.#vao_updated = false;
    }

    constructor(gl, vertShaderSrc, fragShaderSrc, primitive){
        this._primitive = primitive;
        
        this._gl = gl;
        //restringir os tipos

        this.#createShader(vertShaderSrc, fragShaderSrc);
    }

    #createShader(vertShaderSrc, fragShaderSrc) {
        this.#vertShader = GLUtil.createShader(this._gl, this._gl.VERTEX_SHADER, vertShaderSrc);
        this.#fragShader = GLUtil.createShader(this._gl, this._gl.FRAGMENT_SHADER, fragShaderSrc);
        this._program = GLUtil.createProgram(this._gl, this.#vertShader, this.#fragShader);
    
        this._gl.useProgram(this._program);
    }

    #createVAO() {
        this._vaoLoc = GLUtil.createVAO(this._gl, ...this.#attributes);
    }

    updateModelMatrix(){
        mat4.identity(this.#modelMatrix);

        mat4.translate(this.#modelMatrix, this.#modelMatrix, this.position);
        mat4.rotateX(this.#modelMatrix, this.#modelMatrix, this.rotation[0]);
        mat4.rotateY(this.#modelMatrix, this.#modelMatrix, this.rotation[1]);
        mat4.rotateZ(this.#modelMatrix, this.#modelMatrix, this.rotation[2]);
        mat4.scale(this.#modelMatrix, this.#modelMatrix, this.scale);
    }

    loadMVP(camera){
        const modelLoc = this._gl.getUniformLocation(this._program, "model");
        const mvLoc = this._gl.getUniformLocation(this._program, "modelView");
        const mvpLoc = this._gl.getUniformLocation(this._program, "mvp");

        const viewLoc = this._gl.getUniformLocation(this._program, "view");
        const viewProjLoc = this._gl.getUniformLocation(this._program, "viewProjection");
        const projectionLoc = this._gl.getUniformLocation(this._program, "projection");

        if(modelLoc){
            this._gl.uniformMatrix4fv(modelLoc, false, this.#modelMatrix);
        }else if(mvLoc){
            const mv = mat4.create();

            if(camera)
                mat4.multiply(mv, camera.viewMatrix, this.#modelMatrix);
            else
                mat4.copy(mv, this.#modelMatrix);
            
            this._gl.uniformMatrix4fv(mvLoc, false, mv);

        }else if(mvpLoc){
            const mvp = mat4.create();

            if(camera)
                mat4.multiply(mvp, camera.viewProjection, this.#modelMatrix);
            else
                mat4.copy(mvp, this.#modelMatrix);
                
            this._gl.uniformMatrix4fv(mvpLoc, false, mvp);
        }

        if(viewLoc)
            this._gl.uniformMatrix4fv(modelLoc, false, camera.viewMatrix);

        if(projectionLoc)
            this._gl.uniformMatrix4fv(modelLoc, false, camera.projMatrix);
    
        if(viewProjLoc)
            this._gl.uniformMatrix4fv(modelLoc, false, camera.viewProjection);
    }

    createTex(texData, textureName){
        const uTexture = this._gl.getUniformLocation(this._program, textureName);

        if(!uTexture)
            throw new Error(`The uniform ${textureName} doesn't exists in shader code.`);

        const texture = new Texture(uTexture, this._gl.createTexture(), texData);

        this.#textures.push(texture);

        const texI = this.#textures.length - 1;

        this._gl.activeTexture(this._gl[`TEXTURE${texI}`]);
        this._gl.bindTexture(this._gl.TEXTURE_2D, this.#textures[texI].texture);

        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);

        this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA32F, this._gl.RGBA, this._gl.FLOAT, texData);

        this._gl.useProgram(this._program);
        this._gl.uniform1i(this.#uTexture, texI);

        return {tex: this.#textures[texI], index: texI};
    }

    bindTextures(){
        this.#textures.forEach(texture =>{
            texture.bind(this._gl);
        })
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
        if(!this.#vao_updated){
            this.#vao_updated = true;
            this.#createVAO();
        }

        this._gl.frontFace(this._gl.CCW);

        this._gl.enable(this._gl.CULL_FACE);
        this._gl.cullFace(this._gl.BACK);

        if(this.useDepthTest){
            this._gl.enable(this._gl.DEPTH_TEST);
            this._gl.depthFunc(this._gl.LESS);
        }

        this.updateModelMatrix();

        this._gl.bindVertexArray(this._vaoLoc);

        this._gl.useProgram(this._program);

        this.loadMVP(cam);

        this.bindTextures();

        this._gl.drawArrays(this._primitive, 0, this.#count);

        this._gl.disable(this._gl.CULL_FACE);

        if(this.useDepthTest)
            this.gl.disable(this._gl.DEPTH_TEST);
    }

    static changeTex(gl, {tex, index}, texData){
        tex.data = texData;
    }
}

class Texture{
    #uniform;
    #texture;
    #data;
    #changed = false;

    constructor(uniform, texture, data){
        this.#uniform = uniform;
        this.#texture = texture;
        this.#data = data;
    }

    get uniform(){
        return this.#uniform;
    }

    get texture(){
        return this.#texture;
    }

    get data(){
        return this.#data;
    }

    set data(newData){
        this.#data = newData;
        this.#changed = true;
    }

    bind(gl){
        gl.bindTexture(gl.TEXTURE_2D, this.#texture);
        
        if(this.#changed){
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, gl.RGBA, gl.FLOAT, this.#data);
            this.#changed = false;
        }
    }
}
