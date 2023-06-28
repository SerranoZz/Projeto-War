import ImageGL from "./view/image";
import Scene from "./webgl/scene";
import { Player } from "./model/player/player";
import TerritoryController from "./model/map/territories/territory-controller";
import TurnsManager from "./model/player/turns_manager";
import EventsHandler from "./events/events_manager";
import TroopsView from "./view/troopsView";
import CanvasImage from "./view/canvasImage";
import Goal from "./model/tools/goal";

class Game{
    #menuScene;
    #gameScene;
    #guiScene;
    #background;
    #tView;

    #territoryController;

    #scale = 4.5;

    #inGame = false;
    #toGame = false;

    #players = [];
    #turnsManager;

    #countryEvents;

    #fortify;
    #gameScreen;
    #show_cards;

    #goal;
    #goal_path;

    get tView(){
        return this.#tView;
    }

    get inGame(){
        return this.#inGame;
    }

    get gameScene(){
        return this.#gameScene;
    }
    
    get turnsManager(){
        return this.#turnsManager;
    }

    get territoryController(){
        return this.#territoryController;
    }

    get showCards(){
        return this.#show_cards;
    }

    get fortify(){
        return this.#fortify;
    }

    get gameScreen(){
        return this.#gameScreen;
    }

    get guiScene(){
        return this.#guiScene;
    }

    static async build(canvas){
        const game = new Game();
        await game.init(canvas);

        return game;
    }

    async init(canvas){
        this.gl = canvas.getContext("webgl2");
        await this.#createMenuScene();
        //Depois talvez carregar o jogo apenas quando for dado o play
        

        const names = ["Player 1", "Player 2"];

        
        //azul, amarelo, vermelho, preto, verde
        const colors = [
            [0.0, 0.0, 1.0, 1.0],
            [1.0, 1.0, 0.0, 1.0],
            [1.0, 0.0, 0.0, 1.0],
            [1.0, 1.0, 1.0, 1.0],
            [0.0, 0.0, 0.0, 1.0],
            [0.0, 0.4, 0.0, 1.0]
        ];
        
        const goal = new Goal();
        await goal.loadGoals();

        this.#territoryController = new TerritoryController();
        
        for(let i = 0; i < names.length; i++){
            const index = Math.floor(Math.random() * colors.length);
            const color = colors[index];

            goal.sortGoal(names[5-i], color);
            let playerGoal = goal.getGoal;
            
            colors.splice(index, 1);
            this.#goal_path = playerGoal.path;
            this.#players[i] = new Player(names[i], color, playerGoal, this.#territoryController);

        }

        await this.#territoryController.init(this.gl, this.#scale);

        const countries = [...this.#territoryController.countries];

        const countriesPerPlayer = Math.floor(countries.length/this.#players.length); 
        
        for(let player of this.#players){
            for(let i = 0; i<countriesPerPlayer; i++){
                if(!countries.length) break;
                
                const index = Math.floor(Math.random()*countries.length);

                countries[index].owner = player;
                countries[index].soldiers = 1;

                countries.splice(index, 1);
            }
        }

        //tratar o lance de sobrar países

        this.#turnsManager = new TurnsManager(this.#players);

        await this.#createGameScreenAlt();

        this.#countryEvents = new EventsHandler(this);
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
                if(!this.#inGame)
                    this.#toGame = true;
            }
    
        })
    }

    async #createGameScreenAlt(){
        const background = new ImageGL();
        await background.init(this.gl, "./assets/game/fundo.jpg");
        
        background.scaleY = 1.85;
        background.scaleX = 1.01;
        background.depth = -0.01;
        this.#background = background;
        
        const goal = new ImageGL();
        await goal.init(this.gl, this.#goal_path);
        goal.scaleX = 0.4;
        goal.scaleY = 0.6;
        this.#goal = goal;
        
        const gameScreen = new GameScreen();
        await gameScreen.init(this.gl, this.#turnsManager);
        this.#gameScreen = gameScreen;

        const show_cards = new ShowCards();
        await show_cards.init(this.gl);
        this.#show_cards = show_cards;

        const fortify = new Fortify();
        await fortify.init(this.gl);
        this.#fortify = fortify;

        this.#gameScene = new Scene(this.gl);
        this.#gameScene.createCamera(canvas);
        this.#gameScene.camera.camPosition[2] = 1.8;
        //this.#gameScene.camera.camPosition[1] = -0.2;
        this.#gameScene.createLight([1.0, 0.0, 0.3]);

        this.#guiScene = new Scene(this.gl);
    
        this.#tView = new TroopsView();
        await this.#tView.init(this.#territoryController.countries, this.#scale, this.gl);
    
        this.#gameScene.appendElement(...this.#territoryController.countries);
        this.#guiScene.appendElement(gameScreen, show_cards, fortify);

        this.#gameScene.appendElement(this.#tView);

        for(let country of this.#territoryController.countries){
            country.loadUniforms(this.#gameScene.camera);
        }
    
    }

    logic(){
        this.#fortify.logic();
        this.#show_cards.logic();
    }

    draw(){
        if(this.#inGame){
            this.#background.draw();
            this.#gameScene.draw();
            this.#guiScene.draw();
            //this.#goal.draw();
        }
        else{
            this.#menuScene.draw();
        }
    }

    run(){
        const run_aux = ()=>{
            this.logic();
            this.draw();

            if(this.#toGame){
                this.#inGame = true;
                this.#toGame = false;
            }

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
    #gl;

    async init(gl, turnsManager){
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
        await this.current_player.init(gl, "./assets/game/current_player1.png");
        this.current_player.scale = [0.4, 0.6]; 
        GameScreen.setInitialPosition(0, -0.85, 0.2, this.current_player);

        this.current_player_text = new CanvasImage();
        await this.current_player_text.init(gl);

        this.changePlayer(turnsManager.player.name, "Distribuição de tropas", turnsManager.player.color);

        this.current_player_text.scale = [0.4, 0.3];
        this.current_player_text.positionY = -0.85;

        this.show_players = new ImageGL();
        await this.show_players.init(gl, "./assets/game/show_players.png");
        this.show_players.scale = [0.065, 0.115]; 
        GameScreen.setInitialPosition(-0.92, -0.85, 0.2, this.show_players);

        this.changeStateBtn = new ImageGL();
        await this.changeStateBtn.init(gl, "./assets/game/next_turn.png");
        this.changeStateBtn.scale = [0.065, 0.11]; 
        GameScreen.setInitialPosition(0.60, -0.85, 0.2, this.changeStateBtn);

        this.#gl = gl;
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
        this.current_player_text.draw(camera);
        this.show_players.draw(camera);
        this.changeStateBtn.draw(camera);
    }

    clickedWidget(x, y){
        if (this.changeStateBtn.pointCollision(x, y)){
            return "changeTurn";
        }else if (this.card_button.pointCollision(x, y)){
            return "showCards";
        }
    }

    changePlayer(player, state, color){
        this.current_player_text.clear();

        console.log(color);
        const newColor = color.map(val => Math.round(val*255));

        this.current_player_text.update(ctx => {
            if(!(ctx instanceof CanvasRenderingContext2D)) return

            ctx.fillStyle = `rgb(${newColor})`.replaceAll("'", "");
                
            ctx.font = "200px Arial";
            ctx.fillText("Vez do "+ player, 300, 210, 400);

            ctx.fillStyle = "white";
            
            console.log(ctx.fillStyle);
            ctx.fillText(state, 185, 650, 650);
        }, this.#gl);
    }
}

class ShowCards{
    #up = false;
    #down =  false;
    #xPos = 0;
    #yPos = 0;
    #cards;

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

    async initCards(gl, cards){
        this.#cards = [];
        let step = 0;
        if(cards.length > 0){
            for(let i = 0; i < cards.length; i++){
                const card = new ImageGL();
                if(cards[i] == 0){
                    await card.init(gl, "./assets/game/cards/square.png");
                }else if(cards[i] == 1){
                    await card.init(gl, "./assets/game/cards/circle.png");
                }else if(cards[i] == 2){
                    await card.init(gl, "./assets/game/cards/triangle.png");
                }else if(cards[i] == 3){
                    await card.init(gl, "./assets/game/cards/joker.png");
                }
                this.#cards.push(card);
            }
    
            for(let j = 0; j < this.#cards.length; j++){
                this.#cards[j].scale = [0.055, 0.095];
                ShowCards.setInitialPosition(-0.161 + step, -0.85 - 1, 0.4, this.#cards[j]);
                step += 0.08;
            }
        }

        this.cardsNumber = new CanvasImage();
        await this.cardsNumber.init(gl, 500);
        this.cardsNumber.update(ctx => {
            if(!(ctx instanceof CanvasRenderingContext2D)) return

            ctx.fillStyle = "black";
                
            ctx.font = "30px Arial";
            ctx.fillText(this.#cards.length.toString(), 250, 250);
        }, gl);

        this.cardsNumber.scale = [0.8, 1.8];
        ShowCards.setInitialPosition(0.74, -0.94, 0.5, this.cardsNumber);

    }

    static setInitialPosition(x, y, depth, widget){
        widget.positionX = x;
        widget.positionY = y;
        widget.depth = depth;
    }

    moveAll(amountX, amountY){
        this.cards_info.positionX += amountX
        this.cancel_button.positionY += amountY;
        this.ok_button.positionY += amountY;
        this.show_cards.positionY += amountY;
        if(this.#cards.length > 0){
            for(let i = 0; i < this.#cards.length; i++){
                this.#cards[i].positionY += amountY;
            }
        }
    }

    draw(camera){
        this.show_cards.draw(camera);
        this.cancel_button.draw(camera);
        this.ok_button.draw(camera);
        this.cards_info.draw(camera);
        this.cardsNumber.draw(camera);
        if(this.#cards.length > 0){
            for(let i = 0; i < this.#cards.length; i++){
                this.#cards[i].draw(camera);
            }
        }
    }

    /*drawCards(camera){
        if(this.#cards.length > 0){
            for(let i = 0; i < this.#cards.length; i++){
                this.#cards[i].draw(camera);
            }
        }
    }*/

    up(){
        this.#up = true;
        this.#down = false;
    }

    down(){
        this.#down = true;
        this.#up = false;
    }

    logic(){
        const step = 0.01;

        if(this.#up || this.#down){
            if(this.#up){
                this.#yPos += step;
                this.#xPos -= step;
    
                if(this.#yPos>=1.0){
                    this.#yPos = 1.0;
                    this.#xPos = 0.0;
                    this.#up = false;
                }else
                    this.moveAll(-step, step);
            }else if(this.#down){
                this.#yPos -= step;
                this.#xPos += step;
    
                if(this.#yPos<=0.0){
                    this.#yPos = 0.0;
                    this.#xPos = 1.0;
                    this.#down = false;
                }else
                    this.moveAll(step, -step);
            }
        }
    }
    
    clickedWidget(x, y){
        if(this.#cards.length > 0){
            for(let i = 0; i < this.#cards.length; i++){
                if(this.#cards[i].pointCollision(x, y)){
                    alert("alo");
                }
            }
        }
        if(this.cancel_button.pointCollision(x, y)){
            return "cancel";
        }else if(this.ok_button.pointCollision(x, y)){
            return "ok";
        }
    }


}

class Fortify{
    #up = false;
    #yPos = 0;
    #gl;

    #down =  false;

    get opened(){
        return (!this.#up && this.#yPos === 1.0);
    }

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

        this.numberImage = new CanvasImage();
        await this.numberImage.init(gl, 500);

        this.numberImage.update(ctx => {
            if(!(ctx instanceof CanvasRenderingContext2D)) return

            ctx.fillStyle = "white";
                
            ctx.font = "30px Arial";
            ctx.fillText("0", 250, 250);
        }, gl);

        this.numberImage.depth = 0.5;
        this.numberImage.scaleY = 1.5;

        Fortify.setInitialPosition(-0.05, -0.86 - 1, 0.4, this.numberImage);

        this.#gl = gl;
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
        this.numberImage.positionY += amount;
    }

    up(){
        this.#up = true;
        this.#down = false;
    }

    down(){
        this.#down = true;
        this.#up = false;
    }

    logic(){
        const step = 0.01;

        if(this.#up || this.#down){
            if(this.#up){
                this.#yPos += step;
    
                if(this.#yPos>=1.0){
                    this.#yPos = 1.0;
                    this.#up = false;
                }else
                    this.moveAll(step);
            }else if(this.#down){
                this.#yPos -= step;
    
                if(this.#yPos<=0.0){
                    this.#yPos = 0.0;
                    this.#down = false;
                }else
                    this.moveAll(-step);
            }
        }

    }

    draw(camera){
        this.fortify.draw(camera);
        this.cancel_button.draw(camera);
        this.ok_button.draw(camera);
        this.plus_button.draw(camera);
        this.minus_button.draw(camera);
        this.numberImage.draw(camera);
    }

    clickedWidget(x, y){
        if(this.cancel_button.pointCollision(x, y)){
            return "cancel";
        }else if(this.ok_button.pointCollision(x, y)){
            return "ok";
        }else if(this.plus_button.pointCollision(x, y)){
            return "+";
        }else if(this.minus_button.pointCollision(x, y)){
            return "-";
        }
    }

    changeNumber(number){
        this.numberImage.clear();

        this.numberImage.update(ctx => {
            if(!(ctx instanceof CanvasRenderingContext2D)) return

            ctx.fillStyle = "white";
                
            ctx.font = "30px Arial";
            ctx.fillText(""+number, 250, 250);
        }, this.#gl);
    }

}

const canvas = document.querySelector("#game-screen");

Game.build(canvas).then(game => {
    game.run();
});
