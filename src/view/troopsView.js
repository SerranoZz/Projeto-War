import CanvasImage from "./canvasImage";

export default class TroopsView{
    #image;

    async init(countries, scale, gl){
        const cImage = new CanvasImage();
        await cImage.init(gl);

        cImage.scale = [2.5, 5.0];

        cImage.depth = 0.1;
    
        await cImage.update(ctx =>{
            if (!(ctx instanceof CanvasRenderingContext2D)) return

            countries.forEach(country => {
                const center = country.mesh.center;

                ctx.fillStyle = "white";
                
                console.log(center);

                ctx.font = "30px Arial";
                ctx.fillText(country.soldiers+"", (center[0] + 0.5)*1000 - 10, (-center[1]+0.5)*1000)+10;
            });

        }, gl);

        this.#image = cImage;
    }

    draw(camera){
        this.#image.draw(camera);
    }
}
