import TurnsManager from "../model/player/turns_manager";
import { Player } from "../model/player/player";

export default class EventsHandler{
    #country = null;

    #mapDebug = false;

    #actions = new Map();

    mapDebug(){
        this.#mapDebug = true;
    }

    constructor(game){
        this.#actions.set(TurnsManager.DISTRIBUCTION, new DistribuctionAction());
        this.#actions.set(TurnsManager.ATTACK, new AttackAction());
        this.#actions.set(TurnsManager.REASSIGNMENT, new ReassignmentAction());
        
        const troca = new ExchangeCardsAction();

        game.showCards.initCards(game.gl, game.turnsManager.player.cards);
        game.gameScreen.initGoal(game.gl, game.turnsManager.player);

        game.gl.canvas.addEventListener("click",async e=>{
            if(game.turnsManager.state === TurnsManager.FREEZE) return;

            if(!game.inGame) return;
    
            const point = EventsHandler.mapClickInCanvas(e.clientX, e.clientY, game.gl.canvas);

            //troca.execute(game, ...point)

            if(game.showCards.opened){
                await troca.getCards(game, ...point);
            }

            if(game.fortify.opened){
                this.#actions.get(game.turnsManager.state).applyFort(game, ...point);
                return;
            }

            const widget2 = game.showCards.clickedWidget(...point);

            if(widget2 === "cancel"){
                troca.resetCards(game);
            }

            const widget = game.gameScreen.clickedWidget(...point);

            if(widget === "changeTurn"){
                game.turnsManager.nextState(game);
                return;
            }else if(widget === "showCards"){
                game.showCards.up();
            }else if(widget === "goal"){
                game.gameScreen.moveGoal();
            }
    
            const country = game.territoryController.clickedCountry(...point, game.gameScene.camera);

            // country events é um dicionário de funções, onde as chaves são os estados
            // essa linha chama uma função de acordo com o estado do jogo atual

            if(country) {
                alert(country.name);
                this.#country = country;

                const action = this.#actions.get(game.turnsManager.state);

                action.execute(game, country, ...point);
                for(let i = 0; i < game.players.length; i++){
                    let result;

                    if(game.players[i].goalId >= 0 && game.players[i].goalId <= 5){
                        result = game.goal.verifyContinent(game.players[i]);
                    }else if(game.players[i].goalId == 6 || game.players[i].goalId == 7){
                        result = game.goal.verifyTerritory(game.players[i]);
                    }else if(game.players[i].goalId >= 8 && game.players[i].goalId <= 13){
                        result = game.goal.verifyDestroy(game.players[i], game.players);
                    }

                    if(result){
                        alert("Parabéns jogador "+game.players[i].name+", ganhaste!! ;)");
                        break;
                    }
                }
            };

        });

        let child;

        document.body.addEventListener("keydown", e=>{
            if(!this.#mapDebug) return;

            if(e.key==="d" && this.#country) {
                child = this.#country.mesh.drawBorder;
                document.body.appendChild(child);
            }

            if(e.key === "s"){
                document.body.removeChild(child);
            }
        })
        
    }

    static mapClickInCanvas(x, y, canvas){
        const mappedOnCenter = [
            (x - canvas.offsetLeft) - canvas.width/2, 
            (canvas.height/2) - (y - canvas.offsetTop)
        ];
    
        return [mappedOnCenter[0]*2/canvas.width, mappedOnCenter[1]*2/canvas.height];
    }
}

class AttackAction{
    base = null;
    destiny = null;
    neighbors = null;
    amount = 1;

    execute(game, country){
        const player = game.turnsManager.player;
        const territoryController = game.territoryController;
    
        if(!this.base) {
            if(country.owner !== player) return;

            const neighbors = territoryController.countries.filter(c =>{
                if(country.neighbors.indexOf(c.name) !== -1 && c.owner !== country.owner)
                    return c;
            })

            if(neighbors.length === 0) return;

            this.changePositions(game, country, neighbors);

            this.base = country;
            this.neighbors = neighbors;

        }else{
            if(this.neighbors.indexOf(country) === -1) return;
    
            alert(`from ${this.base.name} to ${country.name}`);
    
            player.attack(this.base, country);

            game.tView.update();

            if(country.soldiers === 0){
                game.fortify.changeNumber(1);
                game.fortify.up();
                this.destiny = country;

                game.turnsManager.player.conquestTerritory(country);

                game.turnsManager.conquered = true;

                return;
            }

            this.resetPositions(game);
    
            this.base = null;
            this.neighbors = null;
        }
    }

    applyFort(game, x, y){
        const btn = game.fortify.clickedWidget(x, y);

        if(btn === "-" && this.amount > 1){
            this.amount--;
            game.fortify.changeNumber(this.amount);
        }else if(btn === "+" && this.amount < this.base.soldiers - 1){
            this.amount++;
            game.fortify.changeNumber(this.amount);
        }else if(btn==="ok"){

            game.territoryController.troop_reassignment(this.base, this.destiny, this.amount);
            game.tView.update();
            
            this.resetPositions(game);
            game.fortify.down();
            game.fortify.changeNumber(0);
            this.amount = 1;
            this.base = null;
            this.neighbors = null;
            this.destiny = null;
        } 
    }

    changePositions(game, country, neighbors){
        game.gameScene.switchLight();

        country.mesh.position[2] = 0.03;
        country.mesh.scale[2] = 2;

        game.gameScene.light.createUniforms(country.mesh);

        neighbors.forEach(neighbor => {
            neighbor.mesh.position[2] = 0.03;
            neighbor.mesh.scale[2] = 2;

            game.gameScene.light.createUniforms(neighbor.mesh);
        });
    }

    resetPositions(game){
        game.gameScene.switchLight();
    
        this.neighbors.forEach(neighbor => {
            neighbor.mesh.position[2] = 0.0;
            neighbor.mesh.scale[2] = 1;

            game.gameScene.light.createUniforms(neighbor.mesh);
        });
        
        this.base.mesh.position[2] = 0.0;
        this.base.mesh.scale[2] = 1;
    }
}

class DistribuctionAction{
    country = null;
    amount = 0;

    execute(game, country){
        if(!this.country && country.owner === game.turnsManager.player){
            game.gameScene.switchLight();

            this.changePositions(game, country);
    
            game.fortify.up();
    
            this.country = country;
    
            game.turnsManager.openFortify();
    
        }
    }

    applyFort(game, x, y){
        const btn = game.fortify.clickedWidget(x, y);

        if(btn === "-" && this.amount > 0){
            this.amount--;
            game.fortify.changeNumber(this.amount);
        }else if(btn === "+" && this.amount < game.turnsManager.player.freeTroops){
            this.amount++;
            game.fortify.changeNumber(this.amount);
        }else if(btn === "cancel"){
            game.fortify.down();
            this.resetPositions(game);
            game.amount = 0;
            game.fortify.changeNumber(0);
        }else if(btn === "ok"){
            game.turnsManager.player.addTroops(this.country, this.amount);
            game.tView.update();
            this.resetPositions(game);
            game.fortify.down();
            game.fortify.changeNumber(0);
            this.amount = 0;
        }
    }

    changePositions(game, country){
        country.mesh.position[2] = 0.03;
        country.mesh.scale[2] = 2;
    
        game.gameScene.light.createUniforms(country.mesh);
    }
    
    resetPositions(game){
        game.gameScene.switchLight();
        
        this.country.mesh.position[2] = 0.0;
        this.country.mesh.scale[2] = 1;

        this.country = null;
    }
}

class ReassignmentAction{
    base = null;
    neighbors = null;
    destiny = null;
    amount = 0;

    execute(game, country){
        const player = game.turnsManager.player;
        const territoryController = game.territoryController;
    
        if(!this.base) {
            if(country.owner !== player) return

            const neighbors = territoryController.countries.filter(c =>{
                if(country.neighbors.indexOf(c.name) !== -1 && c.owner === country.owner)
                    return c;
            })

            if(neighbors.length === 0) return;

            this.base = country;
            this.neighbors = neighbors;
            this.changePositions(game, country, neighbors);
    
        }else if(!this.destiny){
            if(this.neighbors.indexOf(country) === -1) return;

            this.destiny = country;
            
            game.fortify.up();
        }
    }

    applyFort(game, x, y){

        const btn = game.fortify.clickedWidget(x, y);

        if(btn === "-" && this.amount > 0){
            this.amount--;
            game.fortify.changeNumber(this.amount);
        }else if(btn === "+" && this.amount+1 < this.base.soldiers){
            this.amount++;
            game.fortify.changeNumber(this.amount);
        }else if(btn === "cancel" || btn==="ok"){

            if(btn === "ok"){
                game.territoryController.troop_reassignment(this.base, this.destiny, this.amount);
                game.tView.update();
            }

            this.resetPositions(game);
            game.fortify.down();
            game.fortify.changeNumber(0);
            this.amount = 0;
            this.base = null;
            this.neighbors = null;
            this.destiny = null;
        } 
        
    }

    changePositions(game, country, neighbors){
        country.mesh.scale[2] = 3;
        country.mesh.position[2] = 0.03;
        country.mesh.scale[2] = 2;

        game.gameScene.switchLight();

        game.gameScene.light.createUniforms(country.mesh);

        neighbors.forEach(neighbor => {
            if(neighbor.owner === this.base.player) return;

            neighbor.mesh.position[2] = 0.03;
            neighbor.mesh.scale[2] = 2;

            game.gameScene.light.createUniforms(neighbor.mesh);
        });
    }

    resetPositions(game){
        game.gameScene.switchLight();

        this.neighbors.forEach(neighbor => {
            neighbor.mesh.position[2] = 0.0;
            neighbor.mesh.scale[2] = 1;

            game.gameScene.light.createUniforms(neighbor.mesh);
        });
        
        this.base.mesh.position[2] = 0.0;
        this.base.mesh.scale[2] = 1;
    }
}

class ExchangeCardsAction{
    #selectCards = [];

    execute(game, x, y){

    }

    async getCards(game, x, y) {
        if(this.#selectCards.length === 0){
            this.#selectCards = game.showCards.cards;
        }

        const widget = game.showCards.clickedWidget(x,y);

        if(widget === "ok"){
            const selectedCards = this.#selectCards.filter(card => card.selected);

            if(selectedCards.length<3) return;

            game.turnsManager.player.exchangeCards(...selectedCards);

            await this.resetCards(game);

            return;
        }

        if(widget === -1 || widget==="cancel") return;

        this.#selectCards[widget].selected = !this.#selectCards[widget].selected;

        if(this.#selectCards[widget].selected) 
            game.showCards.highlightCard(widget) 
        else
            game.showCards.deshighlightCard(widget);

    }

    async resetCards(game){
        for(let i = 0; i<this.#selectCards.length; i++){
            game.showCards.deshighlightCard(i);
        }

        this.#selectCards = [];

        game.showCards.down();

        //await game.showCards.initCards(game.gl, game.turnsManager.player.cards);
    }
}