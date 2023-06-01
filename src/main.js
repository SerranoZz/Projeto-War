import ImageGL from "./view/image";
import CanvasImage from "./view/canvasImage";
import Scene from "./webgl/scene";
import { Player } from "./model/player/player";
import TerritoryController from "./model/map/territories/territory-controller";
import TurnsManager from "./model/player/turns_manager";
import CountryEventsHandler from "./events/events_manager";

class Game{
    #menuScene;
    #gameScene;
    #guiScene;

    #territoryController;

    #scale = 4.5;

    #inGame = false;

    #players = [];
    #turnsManager;

    #countryEvents;

    static async build(canvas){
        const game = new Game();
        await game.init(canvas);

        return game;
    }

    async init(canvas){
        this.gl = canvas.getContext("webgl2");
        await this.#createMenuScene();
        //Depois talvez carregar o jogo apenas quando for dado o play
        

        const names = ["claudio", "et bilu", "dom pedro", "saci", "uantedeguemon", "Serrano"];

        //preto(acizentado), branco, amarelo, azul, vermelho e cinza
        const colors = [
            [0.2, 0.2, 0.2, 1.0],
            [0.9, 0.9, 0.9, 1.0],
            [0.0, 0.8, 0.8, 1.0],
            [0.0, 0.0, 0.8, 1.0],
            [0.8, 0.0, 0.0, 1.0],
            [0.5, 0.5, 0.5, 1.0]
        ];


        for(let i = 0; i < 6; i++){
            const index = Math.floor(Math.random()*colors.length);
            const color = colors[index];

            colors.splice(index, 1);

            this.#players[i] = new Player(names[i], color, "mata todo mundo");
        }

        this.#territoryController = new TerritoryController();
        await this.#territoryController.init(this.gl, this.#scale);

        const countries = [...this.#territoryController.countries];

        const countriesPerPlayer = Math.floor(countries.length/this.#players.length); 

        for(let player of this.#players){
            for(let i = 0; i<countriesPerPlayer; i++){
                if(!countries.length) break;

                const index = Math.floor(Math.random()*countries.length);

                console.log(countries)

                countries[index].owner = player;
                countries[index].troops = 1;

                countries.splice(index, 1);
            }
        }

        //tratar o lance de sobrar países

        this.#turnsManager = new TurnsManager(this.#players);

        await this.#createGameScreenAlt();

        this.#countryEvents = new CountryEventsHandler(
            this.gl.canvas, this.#turnsManager, this.#territoryController, this.#gameScene.camera
        );
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
        settingsButton.positionY = 0.8

        this.#menuScene.appendElement(background, logoWar, playButton, settingsButton);

        this.gl.canvas.addEventListener("click", e=>{
            // e.clientX e e.clientY são a posição do mouse
    
            const point = Game.mapClickInCanvas(e.clientX, e.clientY, this.gl.canvas);
    
            if(playButton.pointCollision(...point)){
                this.#inGame = true;
            }
    
        })
    }

    async #createGameScreenAlt(){

        const gameScreen = new GameScreen();
        await gameScreen.init(this.gl);

        const show_cards = new ShowCards();
        await show_cards.init(this.gl);

        const fortify = new Fortify();
        await fortify.init(this.gl);

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
    
        this.#gameScene.appendElement(...this.#territoryController.countries);
        this.#guiScene.appendElement(gameScreen, show_cards, fortify);
    
        //colocar a view e a projection

        for(let country of this.#territoryController.countries){
            country.mesh.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
            country.mesh.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
            country.mesh.setUniformValue("color", country.owner.color, "4fv");
        }
    
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

class GameScreen{
    async init(gl){
        this.settingsButton = new ImageGL();
        await this.settingsButton.init(gl, "./assets/menu/settings_button.png");
        this.settingsButton.scale = [0.046, 0.08]; 
        GameScreen.setInitialPosition(0.9, 0.8, 0.2, this.settingsButton);

        this.card_button = new ImageGL();
        await this.card_button.init(gl, "./assets/game/card_button.png");
        this.card_button.scale = [0.08, 0.15]; 
        GameScreen.setInitialPosition(0.76, -0.85, 0.2, this.card_button);

        this.objective_button = new ImageGL();
        await this.objective_button.init(gl, "./assets/game/objective_button.png");
        this.objective_button.scale = [0.065, 0.11]; 
        GameScreen.setInitialPosition(0.92, -0.85, 0.2, this.objective_button);

        this.current_player = new ImageGL();
        await this.current_player.init(gl, "./assets/game/current_player.png");
        this.current_player.scale = [0.4, 0.6]; 
        GameScreen.setInitialPosition(0, -0.85, 0.2, this.current_player);

        this.show_players = new ImageGL();
        await this.show_players.init(gl, "./assets/game/show_players.png");
        this.show_players.scale = [0.065, 0.115]; 
        GameScreen.setInitialPosition(-0.92, -0.85, 0.2, this.show_players);
    }

    static setInitialPosition(x, y, depth, widget){
        widget.positionX = x;
        widget.positionY = y;
        widget.depth = depth;
    }

    moveAll(amountY){
        this.card_button.positionY += amountY;
        this.objective_button._tex.positionY += amountY;
        this.current_player.positionY += amountY;
    }

    draw(camera){
        this.settingsButton.draw(camera);
        this.card_button.draw(camera);
        this.objective_button.draw(camera);
        this.current_player.draw(camera);
        this.show_players.draw(camera);
    }


}

class ShowCards{
    async init(gl){
        this.show_cards = new ImageGL();
        await this.show_cards.init(gl, "./assets/game/show_cards.png");
        this.show_cards.scale = [0.4, 0.7];
        ShowCards.setInitialPosition(this.show_cards.positionX, -0.85 - 1, 0.3, this.show_cards);
        
        this.cancel_button = new ImageGL();
        await this.cancel_button.init(gl, "./assets/game/cancel_button.png");
        this.cancel_button.scale = [0.046, 0.083];
        ShowCards.setInitialPosition(-0.34, -0.81 - 1, 0.4, this.cancel_button);

        this.ok_button = new ImageGL();
        await this.ok_button.init(gl, "./assets/game/ok_button.png");
        this.ok_button.scale = [0.046, 0.083];
        ShowCards.setInitialPosition(0.34, -0.81 - 1, 0.4, this.ok_button);

        this.cards_info = new ImageGL();
        await this.cards_info.init(gl, "assets/game/cards_info.png");
        this.cards_info.scale = [0.2, 0.35];
        ShowCards.setInitialPosition(0.832 + 1, this.cards_info.positionY, 0.3, this.cards_info); 
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
        this.fortify.scale = [0.4, 0.7];
        Fortify.setInitialPosition(this.fortify.positionX, -0.825 - 1, 0.3, this.fortify);

        this.cancel_button = new ImageGL();
        await this.cancel_button.init(gl, "./assets/game/cancel_button.png");
        this.cancel_button.scale = [0.046, 0.083];
        Fortify.setInitialPosition(-0.34, -0.81 - 1, 0.4, this.cancel_button);

        this.ok_button = new ImageGL();
        await this.ok_button.init(gl, "./assets/game/ok_button.png");
        this.ok_button.scale = [0.046, 0.083];
        Fortify.setInitialPosition(0.34, -0.81 - 1, 0.4, this.ok_button);

        this.plus_button = new ImageGL();
        await this.plus_button.init(gl, "./assets/game/plus_button.png");
        this.plus_button.scale = [0.046, 0.083];
        Fortify.setInitialPosition(0.168, -0.86 - 1, 0.4, this.plus_button);

        this.minus_button = new ImageGL();
        await this.minus_button.init(gl, "./assets/game/minus_button.png");
        this.minus_button.scale = [0.046, 0.083];
        Fortify.setInitialPosition(-0.168, -0.86 - 1, 0.4, this.minus_button);
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
        this.plus_button.positionY += amount;
        this.minus_button.positionY += amount;
    }

    draw(camera){
        this.fortify.draw(camera);
        this.cancel_button.draw(camera);
        this.ok_button.draw(camera);
        this.plus_button.draw(camera);
        this.minus_button.draw(camera);
    }
}

const canvas = document.querySelector("#game-screen");

Game.build(canvas).then(game => {
    game.run();
});
