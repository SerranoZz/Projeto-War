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


        game.gl.canvas.addEventListener("click", e=>{
            if(game.turnsManager.state === TurnsManager.FREEZE) return;

            if(!game.inGame) return;
    
            const point = EventsHandler.mapClickInCanvas(e.clientX, e.clientY, game.gl.canvas);

            if(game.fortify.opened){
                this.#actions.get(game.turnsManager.state).applyFort(game, ...point);
                return;
            }

            const widget = game.gameScreen.clickedWidget(...point);

            if(widget === "changeTurn"){
                game.turnsManager.nextState();
                alert("chanja aí");
                return;
            }
    
            const country = game.territoryController.clickedCountry(...point, game.gameScene.camera);

            // country events é um dicionário de funções, onde as chaves são os estados
            // essa linha chama uma função de acordo com o estado do jogo atual

            if(country) {
                alert(country.name);
                this.#country = country;

                const action = this.#actions.get(game.turnsManager.state);

                action.execute(game, country, ...point);
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

            if(country.soldiers === 0){
                game.fortify.changeNumber(1);
                game.fortify.up();
                game.tView.update();
                this.destiny = country;
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

            //alert("base soldiers:"+this.base.soldiers+" amount: "+this.amount)


            game.territoryController.troop_reassignment(this.base, this.destiny, this.amount);
            game.tView.update();
            
            this.resetPositions(game);
            game.fortify.down();
            game.fortify.changeNumber(0);
            this.amount = 0;
            this.base = null;
            this.neighbors = null;
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
            alert(this.amount)
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

        alert("entrou em execute")

        console.log(this)
    
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
    
            alert(`from ${this.base.name} to ${country.name}`);

            this.destiny = country;
            
            game.fortify.up();
        }
    }

    applyFort(game, x, y){
        alert(this.base.soldiers)

        const btn = game.fortify.clickedWidget(x, y);

        if(btn === "-" && this.amount > 0){
            this.amount--;
            game.fortify.changeNumber(this.amount);
        }else if(btn === "+" && this.amount+1 < this.base.soldiers){
            this.amount++;
            game.fortify.changeNumber(this.amount);
        }else if(btn === "cancel" || btn==="ok"){

            alert("base soldiers:"+this.base.soldiers+" amount: "+this.amount)

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