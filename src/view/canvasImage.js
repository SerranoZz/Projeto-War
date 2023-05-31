import Mesh from "../webgl/mesh";
import ImageGL from "./image";

export default class CanvasImage extends ImageGL{
    #canvas;

    async init(gl, canvasDimension = 1000){
        const canvas = document.createElement("canvas");
        const image = canvas.toDataURL("image/png");

        [canvas.width, canvas.height] = [canvasDimension, canvasDimension];

        await super.init(gl, image);
        this.#canvas = canvas;
    }

    async update(drawCanvas = ()=>{}, gl){
        const ctx = this.#canvas.getContext("2d");

        drawCanvas(ctx);

        const image = this.#canvas.toDataURL("image/png");
        const imageElement = await ImageGL.loadImage(image);
    
        Mesh.changeTex(gl, this._tex, imageElement);
    }

}