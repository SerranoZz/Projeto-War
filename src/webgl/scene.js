import Country from "../model/map/territories/country";
import Camera from "./camera";
import Light from "./light";
import Mesh from "./mesh";

export default class Scene{
    #drawnables = [];
    #light;
    #camera;

    #fadeLight;

    #fadeMode = false;

    get camera(){
        return this.#camera;
    }

    get light(){
        return this.#light;
    }

    constructor(gl, clearColor = [0.0, 0.0, 0.0, 1.0]){
        if(!(gl instanceof WebGL2RenderingContext))
            return;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        if(!clearColor || !clearColor.length || clearColor.length !== 4)
            throw new Error("The clear color need to be a array with 4 floats");

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        this.gl = gl;
    }

    createCamera(canvas){
        this.#camera = new Camera(canvas);
    }

    createLight(position){
        this.#light = new Light(position);
        this.#fadeLight = new Light(position);

        this.#fadeLight.ambK = 0.3;
        this.#fadeLight.difK = 0.4;
        this.#fadeLight.espK = 0.3;

        this.#fadeLight.ambColor = [0.5, 0.5, 0.5]; 
    }

    appendElement(...drawnables){
        drawnables.forEach(drawnable => {
            if(!drawnable.draw)
                throw new Error("Element need to have a draw function");

            this.#drawnables.push(drawnable);

            if(this.#light && drawnable instanceof Mesh) this.#light.createUniforms(drawnable);
            
            if(this.#light && drawnable instanceof Country) this.#light.createUniforms(drawnable.mesh);
        });
    }

    switchLight(){
        if(!this.#light) 
            throw new Error("there is no lights to be switched.");

            this.#fadeMode = !this.#fadeMode;

        const light = (this.#fadeMode)? this.#fadeLight: this.#light;

        this.#drawnables.forEach(drawnable =>{
            if(drawnable instanceof Mesh)
                light.createUniforms(drawnable);

            if(drawnable instanceof Country)
                light.createUniforms(drawnable.mesh);
        });
    }

    draw(){
        for(let element of this.#drawnables){
            element.draw(this.#camera);
        }
    }

}