import ImageGL from "./view/image";
import IndexedMeshT from "./webgl/indexed-mesh";
import countryVert from "./shaders/countryVert";
import phongFrag from "./shaders/phongFrag";
import CanvasImage from "./view/canvasImage";
import Scene from "./webgl/scene";

class Game{
    #menuScene;
    #gameScene;

    #inGame = false;

    static async build(canvas){
        const game = new Game();
        await game.init(canvas);

        return game;
    }

    async init(canvas){
        this.gl = canvas.getContext("webgl2");
        await this.#createMenuScene();
        //Depois talvez carregar o jogo apenas quando for dado o play
        await this.#createGameScreen();
    }

    async #createMenuScene(){
        this.#menuScene = new Scene(this.gl);

        const background = new ImageGL();
        await background.init(this.gl, "./assets/menu/fundo.jpg");

        const logo_war = new ImageGL();
        await logo_war.init(this.gl, "./assets/menu/logo_war.png");

        const play_button = new ImageGL();
        await play_button.init(this.gl, "./assets/menu/play_button.png");

        const settings_button = new ImageGL();
        await settings_button.init(this.gl, "./assets/buttons/Group_17settings_button.png");
    
        const max_button = new ImageGL();
        await max_button.init(this.gl, "./assets/menu/max_button.png");

        //scales
        background.scaleY = 1.85
        logo_war.scale = [0.35, 0.56] 
        play_button.scale = [0.15, 0.26]
        settings_button.scale = [0.05, 0.08]  
        max_button.scale = [0.05, 0.08]  

        //position
        logo_war.positionY = 0.25
        
        play_button.positionY = -0.55
        
        settings_button.positionX = 0.9
        settings_button.positionY = 0.8

        max_button.positionX = 0.9
        max_button.positionY = 0.57

        this.#menuScene.appendElement(background, logo_war, play_button, settings_button, max_button);

        this.gl.canvas.addEventListener("click", e=>{
            // e.clientX e e.clientY são a posição do mouse
    
            const point = Game.mapClickInCanvas(e.clientX, e.clientY, this.gl.canvas);
    
            if(play_button.pointCollision(...point)){
                this.#inGame = true;
            }
    
        })
    }

    async #createGameScreen(){
        const mapa = new ImageGL();
        await mapa.init(this.gl, "./assets/mapa.jpg");
    
        mapa.scale = [2.7, 2.7];
    
        const brasil = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/brasil-rotacionado.obj", 
            this.gl, countryVert, phongFrag
        );
        brasil.scale = [1.2, 1.2, 1];
        brasil.position = [0*-1.2, 0*-0.9, 0.3];
        brasil.rotation[1] = -0.2;
    
        const argentina = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/argentina.obj", 
            this.gl, countryVert, phongFrag
        );
        argentina.scale = [1.6, 1.6, 1.5];
        argentina.position = [-0.21, -0.35, 0.3];
    
        this.#gameScene = new Scene(this.gl);
    
        this.#gameScene.createCamera(canvas);
        this.#gameScene.camera.camPosition[2] = 1.8;
        this.#gameScene.camera.camPosition[1] = -0.3;
    
        this.#gameScene.createLight([1.0, 0.0, 0.3]);
    
        const cImage = new CanvasImage();
        await cImage.init(this.gl);
    
        await cImage.update(ctx =>{
            if (!(ctx instanceof CanvasRenderingContext2D)) return
    
            ctx.fillStyle = "white";
    
            ctx.ellipse(500, 500, 400, 500, 0, 0, Math.PI*2);
    
            ctx.lineWidth = 100;
    
            ctx.stroke();
    
            ctx.font = "600px Arial";
            ctx.fillText("1", 320, 600);
        }, this.gl);
    
        cImage.scale = [0.1, 0.1];
        cImage.positionY = 0.2;
    
        this.#gameScene.appendElement(mapa, brasil, argentina, cImage);
    
        //colocar a view e a projection
        brasil.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        brasil.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        brasil.setUniformValue("color", [1.0, 0.0, 0.0, 1.0], "4fv");
    
        argentina.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        argentina.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        argentina.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        this.gl.canvas.addEventListener("click", e=>{
            // e.clientX e e.clientY são a posição do mouse
    
            if(!this.#inGame) return;

            const point = Game.mapClickInCanvas(e.clientX, e.clientY, this.gl.canvas);
    
            if(brasil.pointCollision(...point)){
                alert("foi");
            }

            if(argentina.pointCollision(...point)){
                alert("argentina");
            }
    
        })
    }

    draw(){
        if(this.#inGame)
            this.#gameScene.draw();
        else
            this.#menuScene.draw();
    }

    run(){
        const run_aux = ()=>{
            this.draw();
            requestAnimationFrame(run_aux);
        }

        run_aux();
    }

    static mapClickInCanvas(x, y, canvas){
        const mappedOnCenter = [
            (x - canvas.offsetLeft) - canvas.width/2, 
            (canvas.height/2) - (y - canvas.offsetTop)
        ];

        return [mappedOnCenter[0]*2/canvas.width, mappedOnCenter[1]*2/canvas.height];
    }
}

const canvas = document.querySelector("#game-screen");

Game.build(canvas).then(game => {
    game.run();
});
