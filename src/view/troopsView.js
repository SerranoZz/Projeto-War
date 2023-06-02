import CanvasImage from "./canvasImage";

export default class TroopsView{
    #image;
    #countries;
    #gl;
    #cImage

    async init(countries, scale, gl){
        this.#countries = countries;
        this.#gl = gl;
        this.#cImage = new CanvasImage();
        await this.#cImage.init(gl);

        this.#cImage.scale = [2.5, 5.0];

        this.#cImage.depth = 0.1;
    
        await this.update();

        this.#image = this.#cImage;
    }

    async update() {

        await this.#cImage.update(ctx =>{
            ctx.clearRect(0, 0, this.#gl.canvas.width, this.#gl.canvas.height);
            if (!(ctx instanceof CanvasRenderingContext2D)) return

            this.#countries.forEach(country => {
                const center = country.mesh.center;

                ctx.fillStyle = "white";
                
                ctx.font = "30px Arial";
                ctx.fillText(country.soldiers+"", (center[0] + 0.5)*1000 - 10, (-center[1]+0.5)*1000)+10;
            });

        }, this.#gl);
    }

    draw(camera){
        this.#image.draw(camera);
    }
}