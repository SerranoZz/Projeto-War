import { vec3, mat4 } from "gl-matrix";
import GLUtil from "./gl-util";

export default class Mesh{
    #position = vec3.fromValues(0.0, 0.0, 0.0);
    #rotation = vec3.fromValues(0.0, 0.0, 0.0);
    #scale = vec3.fromValues(1.0, 1.0, 1.0);

    #modelMatrix = mat4.create();

    #attributes = [];

    #vertShader = null;
    #fragShader = null;

    #program = null;

    #primitive;

    #count;

    #vaoLoc;

    get position(){
        return this.#position;
    }

    set position(pos){
        if(!(pos instanceof vec3))  
            throw new Error("Position need to be a vec3.");

        this.#position = vec3.fromValues(...pos, 1.0);
    }

    get rotation(){
        return this.#rotation;
    }

    set rotation(rotation){
        if(!(pos instanceof vec3))  
            throw new Error("Rotation need to be a vec3.");

        this.#rotation = vec3.fromValues(...rotation, 1.0);
    }

    get scale(){
        return this.#scale;
    }

    set scale(scale){
        if(!(pos instanceof vec3))  
            throw new Error("Scale need to be a vec3.");

        this.#scale = vec3.fromValues(...scale, 1.0);
    }

    addAttribute(gl, name, info, pointDim = 4){
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
            loc: gl.getAttribLocation(this.#program, name),
            buffer: GLUtil.createBuffer(gl, gl.ARRAY_BUFFER,f32Array),
            dimension: pointDim
        })

    }

    constructor(gl, vertShaderSrc, fragShaderSrc, primitive){
        this.#primitive = primitive;
        
        //restringir os tipos

        this.createShader(gl, vertShaderSrc, fragShaderSrc);
    }

    createShader(gl, vertShaderSrc, fragShaderSrc) {
        this.#vertShader = GLUtil.createShader(gl, gl.VERTEX_SHADER, vertShaderSrc);
        this.#fragShader = GLUtil.createShader(gl, gl.FRAGMENT_SHADER, fragShaderSrc);
        this.#program = GLUtil.createProgram(gl, this.#vertShader, this.#fragShader);
    
        gl.useProgram(this.#program);
    }

    createVAO(gl) {
        this.#vaoLoc = GLUtil.createVAO(gl, ...this.#attributes);
      }

    #updateModelMatrix(){
        mat4.identity(this.#modelMatrix);

        mat4.translate(this.#modelMatrix, this.#modelMatrix, this.#position);
        mat4.rotateX(this.#modelMatrix, this.#modelMatrix, this.#rotation[0]);
        mat4.rotateY(this.#modelMatrix, this.#modelMatrix, this.#rotation[1]);
        mat4.rotateZ(this.#modelMatrix, this.#modelMatrix, this.#rotation[2]);
        mat4.scale(this.#modelMatrix, this.#modelMatrix, this.#scale);
    }

    draw(gl){

        gl.frontFace(gl.CCW);

        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);

        this.#updateModelMatrix();

        const model = this.#modelMatrix;

        gl.useProgram(this.#program);

        gl.drawArrays(this.#primitive, 0, this.#count);

        gl.disable(gl.CULL_FACE);
    }

}