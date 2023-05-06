import { mat4, vec3 } from "gl-matrix";

export default class Camera{
    #view_matrix = mat4.create();
    #proj_matrix = mat4.create();
    #viewProjMatrix = mat4.create();

    camPosition = [0,0,1];
    lookDirection = [0,0,0];
    upDirection = [0,1,0];

    left = -4.0;
    right = 4.0;
    bottom = -4.0;
    top = 4.0;
    near = 1.0;
    far = 9.0;

    fovy = Math.PI/1.3;
    aspect;

    constructor(canvas){
        this.aspect = canvas.width / canvas.height;
    }

    #typeOfProjection = "perspective";

    set projectionType(type){
        if(type !== "orthogonal" && type !== "perspective") 
            throw new Error("Invalid type of projection.");

        this.typeOfProjection = type;
    }

    get viewMatrix(){
        this.#updateViewMatrix();
        return this.#view_matrix;
    }

    get projMatrix(){
        this.#updateProjMatrix();
        return this.#proj_matrix;
    }

    #updateViewMatrix(){
        mat4.identity(this.#view_matrix);
        mat4.lookAt(this.#view_matrix, this.camPosition, this.lookDirection, this.upDirection);
    }

    #updateProjMatrix(){
        mat4.identity(this.#proj_matrix);
        if(this.typeOfProjection == "perspective")
            mat4.perspective(this.#proj_matrix, this.fovy, this.aspect, this.near, this.far);
        else
            mat4.ortho(this.#proj_matrix, this.left * 1024/768, this.right * 1024/768, this.bottom, this.top, this.left, this.right);
    }

    get viewProjection(){
        this.#updateViewMatrix();
        this.#updateProjMatrix();
        mat4.identity(this.#viewProjMatrix);
        mat4.multiply(this.#viewProjMatrix, this.#proj_matrix, this.#view_matrix);

        return this.#viewProjMatrix;
    }
}