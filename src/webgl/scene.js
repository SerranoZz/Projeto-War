import Camera from "./camera";
import Light from "./light";
import Mesh from "./mesh";

export default class Scene{
    #drawnables = [];
    #light;
    #camera;

    get camera(){
        return this.#camera;
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
    }

    appendElement(...drawnables){
        drawnables.forEach(drawnable => {
            if(!drawnable.draw)
                throw new Error("Element need to have a draw function");

            this.#drawnables.push(drawnable);

            if(this.#light && drawnable instanceof Mesh) this.#light.createUniforms(drawnable);
        });
    }

    draw(){
        for(let element of this.#drawnables){
            element.draw(this.#camera);
        }
    }

}