import { vec3, mat4 } from "gl-matrix";
import GLUtil from "./gl-util";

export default class Mesh{
    #position = vec3.fromValues(0.0, 0.0, 0.0);
    #rotation = vec3.fromValues(0.0, 0.0, 0.0);
    #scale = vec3.fromValues(1.0, 1.0, 1.0);

    #modelMatrix = mat4.create();

    #vertShader = null;
    #fragShader = null;

    #program = null;

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

    createShader(gl) {
        this.#vertShader = Shader.createShader(gl, gl.VERTEX_SHADER, vertShaderSrc);
        this.#fragShader = Shader.createShader(gl, gl.FRAGMENT_SHADER, fragShaderSrc);
        this.program = Shader.createProgram(gl, this.vertShd, this.fragShd);
    
        gl.useProgram(this.program);
      }

    createShader(gl) {
        this.vertShd = Shader.createShader(gl, gl.VERTEX_SHADER, vertShaderSrc);
        this.fragShd = Shader.createShader(gl, gl.FRAGMENT_SHADER, fragShaderSrc);
        this.program = Shader.createProgram(gl, this.vertShd, this.fragShd);
    
        gl.useProgram(this.program);
      }

    updateModelMatrix(){
        mat4.identity(this.#modelMatrix);

        mat4.translate(this.#modelMatrix, this.#modelMatrix, this.#position);
        mat4.rotateX(this.#modelMatrix, this.#modelMatrix, this.#rotation[0]);
        mat4.rotateY(this.#modelMatrix, this.#modelMatrix, this.#rotation[1]);
        mat4.rotateZ(this.#modelMatrix, this.#modelMatrix, this.#rotation[2]);
        mat4.scale(this.#modelMatrix, this.#modelMatrix, this.#scale);
    }

}