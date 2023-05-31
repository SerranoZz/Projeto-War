import ImageGL from "./view/image";
import IndexedMeshT from "./webgl/indexed-mesh";
import countryVert from "./shaders/countryVert";
import phongFrag from "./shaders/phongFrag";
import CanvasImage from "./view/canvasImage";
import Scene from "./webgl/scene";

class Game{
    #menuScene;
    #gameScene;
    #guiScene;

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

        const logoWar = new ImageGL();
        await logoWar.init(this.gl, "./assets/menu/logo_war.png");

        const playButton = new ImageGL();
        await playButton.init(this.gl, "./assets/menu/play_button.png");

        const settingsButton = new ImageGL();
        await settingsButton.init(this.gl, "./assets/menu/settings_button.png");
        
        const maxButton = new ImageGL();
        await maxButton.init(this.gl, "./assets/menu/max_button.png");

        //scales
        background.scaleY = 1.85
        logoWar.scale = [0.35, 0.56] 
        playButton.scale = [0.15, 0.26]
        settingsButton.scale = [0.046, 0.08]  
        maxButton.scale = [0.046, 0.08]  

        //position
        logoWar.positionY = 0.25
        
        playButton.positionY = -0.55
        
        settingsButton.positionX = 0.9
        settingsButton.positionY = 0.57

        maxButton.positionX = 0.9
        maxButton.positionY = 0.8

        this.#menuScene.appendElement(background, logoWar, playButton, settingsButton, maxButton);

        this.gl.canvas.addEventListener("click", e=>{
            // e.clientX e e.clientY são a posição do mouse
    
            const point = Game.mapClickInCanvas(e.clientX, e.clientY, this.gl.canvas);
    
            if(playButton.pointCollision(...point)){
                this.#inGame = true;
            }
    
        })
    }

    async #createGameScreen(){
        //init
        const mapa = new ImageGL();
        await mapa.init(this.gl, "./assets/mapa.jpg");

        const settingsButton = new ImageGL();
        await settingsButton.init(this.gl, "./assets/menu/settings_button.png");

        const maxButton = new ImageGL();
        await maxButton.init(this.gl, "./assets/menu/max_button.png");

        const card_button = new ImageGL();
        await card_button.init(this.gl, "./assets/game/card_button.png");

        const objective_button = new ImageGL();
        await objective_button.init(this.gl, "./assets/game/objective_button.png");

        const current_player = new ImageGL();
        await current_player.init(this.gl, "./assets/game/current_player.png");

        const show_players = new ImageGL();
        await show_players.init(this.gl, "./assets/game/show_players.png");

        const show_cards = new ShowCards();
        await show_cards.init(this.gl);

        const fortify = new Fortify();
        await fortify.init(this.gl);
    
        //scales
        mapa.scale = [2.7, 2.7];
        settingsButton.scale = [0.046, 0.08];
        maxButton.scale = [0.046, 0.08];  
        card_button.scale = [0.5, 0.8];
        objective_button.scale = [0.47, 0.8];
        current_player.scale = [1.5, 2.5];
        show_players.scale = [0.47, 0.8];

        settingsButton.positionX = 0.9
        settingsButton.positionY = 0.57
        settingsButton.depth = 0.2;

        maxButton.positionX = 0.9
        maxButton.positionY = 0.8
        maxButton.depth = 0.2;

        card_button.positionX = 2.9;
        card_button.positionY = -3.2;
        card_button.depth = 0.2;

        objective_button.positionX = 3.6;
        objective_button.positionY = -3.2;
        objective_button.depth = 0.2;

        show_players.positionX = -3.6;
        show_players.positionY = -3.2;
        show_players.depth = 0.2;

        current_player.positionY = -3.375;
        current_player.depth = 0.2;
    
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

        this.#guiScene = new Scene(this.gl);
    
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
        this.#guiScene.appendElement(settingsButton);
    
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
        if(this.#inGame){
            this.#gameScene.draw();
            this.#guiScene.draw();
        }
        else{
            this.#menuScene.draw();
        }
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

class ShowCards{
    async init(gl){
        this.show_cards = new ImageGL();
        await this.show_cards.init(gl, "./assets/game/show_cards.png");
        this.show_cards.scale = [1.7 , 3];
        console.log(this.show_cards.positionX);
        ShowCards.setInitialPosition(this.show_cards.positionX, (-3.355 - 3), 0.3, this.show_cards);
        
        this.cancel_button = new ImageGL();
        await this.cancel_button.init(gl, "./assets/game/cancel_button.png");
        this.cancel_button.scale = [0.27, 0.48];
        ShowCards.setInitialPosition(-1.42, (-3.2 - 3), 0.4, this.cancel_button);

        this.ok_button = new ImageGL();
        await this.ok_button.init(gl, "./assets/game/ok_button.png");
        this.ok_button.scale = [0.27, 0.48];
        ShowCards.setInitialPosition(1.42, (-3.2 - 3), 0.4, this.ok_button);

        this.cards_info = new ImageGL();
        await this.cards_info.init(gl, "assets/game/cards_info.png");
        this.cards_info.scale = [0.8, 1.35];
        ShowCards.setInitialPosition((3.35 + 3), this.cards_info.positionY, 0.3, this.cards_info); 
    }

    static setInitialPosition(x, y, depth, widget){
        widget.positionX = x;
        widget.positionY = y;
        widget.depth = depth;
    }

    moveAll(amountX, amountY){
        this.show_cards.positionY += amountY;
        this.cancel_button.positionY += amountY;
        this.ok_button.positionY += amountY;
        this.cards_info.positionX += amountX
    }

    draw(camera){
        this.show_cards.draw(camera);
        this.cancel_button.draw(camera);
        this.ok_button.draw(camera);
        this.cards_info.draw(camera);
    }

}

class Fortify{
    async init(gl){
        this.fortify = new ImageGL();
        await this.fortify.init(gl, "./assets/game/fortify.png");
        this.fortify.scale = [1.7 , 3];
        Fortify.setInitialPosition(this.fortify.positionX, -3.25, 0.3, this.fortify);

        this.cancel_button = new ImageGL();
        await this.cancel_button.init(gl, "./assets/game/cancel_button.png");
        this.cancel_button.scale = [0.27, 0.48];
        ShowCards.setInitialPosition(1.42, -3.2, 0.4, this.cancel_button);

        this.ok_button = new ImageGL();
        await this.ok_button.init(gl, "./assets/game/ok_button.png");
        this.ok_button.scale = [0.27, 0.48];
        ShowCards.setInitialPosition(1.42, -3.2, 0.4, this.ok_button);
    }

    static setInitialPosition(x, y, depth, widget){
        widget.positionX = x;
        widget.positionY = y;
        widget.depth = depth;
    }

    moveAll(amount){
        this.fortify.positionY += amount;
        this.cancel_button.positionY += amount;
        this.ok_button.positionY += amount;
    }

    draw(camera){
        this.fortify.draw(camera);
        this.cancel_button.draw(camera);
        this.ok_button.draw(camera);
    }
}

const canvas = document.querySelector("#game-screen");

Game.build(canvas).then(game => {
    game.run();
});
