import Camera from "./camera";

export default class Scene{
    #drawnables = [];
    #lights = [];
    #camera = null;

    get camera(){
        return this.#camera;
    }

    constructor(gl, clearColor = [0.0, 0.0, 0.0, 1.0]){
        if(!(gl instanceof WebGL2RenderingContext))
            return;

        const devicePixelRatio = window.devicePixelRatio || 1;
        gl.canvas.width = 1024 * devicePixelRatio;
        gl.canvas.height = 768 * devicePixelRatio;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        if(!clearColor || !clearColor.length || clearColor.length !== 4)
            throw new Error("The clear color need to be a array with 4 floats");

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    createCamera(canvas){
        this.#camera = new Camera(canvas);
    }

    appendElement(drawnable){
        if(!drawnable.draw)
            throw new Error("Element need to have a draw function");

        this.#drawnables.push(drawnable);
    }

    draw(gl){
        for(let element of this.#drawnables){
            element.draw(this.#camera);
        }
    }

}