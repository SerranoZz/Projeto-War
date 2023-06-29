export default class TurnsManager{
    #state;
    #state2 = 0;
    #state_name;
    #currPlayerIndex;
    #players;

    #fortifyOpened = false;

    #round = 1;

    #conquered = false;

    static DISTRIBUCTION = 0;
    static ATTACK = 1;
    static REASSIGNMENT = 2;
    static EXCHANGE_CARDS = 3;

    constructor(players){
        this.#players = players;
        this.#currPlayerIndex = -1;
        this.#state = null;
        this.#state_name = '';
        this.nextPlayer();
    }

    nextPlayer(){
        if(this.#conquered){
            console.log('dando carta');
            this.#players[this.#currPlayerIndex].receiveCard();   
        }

        this.#currPlayerIndex = this.#currPlayerIndex+1;

        if(this.#currPlayerIndex >= this.#players.length){
            this.#round++;
            this.#currPlayerIndex = 0;
        }

        this.#state = TurnsManager.DISTRIBUCTION;
        this.#players[this.#currPlayerIndex].receiveTroop();

        this.#conquered = false;
    }

    set conquered(conq){
        this.#conquered = conq;
    }

    get player(){
        return this.#players[this.#currPlayerIndex];
    }

    get state(){
        return this.#state;
    }

    get state_name(){
        let state;
        switch(this.#state) {
            case 0:
                state = "Distribuição de Tropas";
                break;
            case 1:
                state = "Fase de Ataque";
                break;
            case 2:
                state = "Remanejo de Tropas";
                break;
            case 3:
                state = "Troca de Cartas";
                break;
            default:
                state = "Distribuição de Tropas";
                break;
        }
        this.#state_name = state;
        return this.#state_name;
    }

    get fortifyOpened(){
        return this.#fortifyOpened;
    }

    openFortify(){
        this.#fortifyOpened = true;
    }

    closeFortify(){
        this.#fortifyOpened = false;
    }

    nextState(game, player){
        if(this.#state === 0 && this.#players[this.#currPlayerIndex].freeTroops > 0){
            alert("Distribua todas as suas tropas");
            return;
        }

        this.#state++;
        this.#state2++;
        console.log(this.#state, this.#state2, game.turnsManager.state_name);

        if(this.#state2 === 4 || this.#round === 1 && this.#state2===1){
            this.#state2 = 0;
            game.showCards.initCards(game.gl, game.turnsManager.player.cards);
            this.nextPlayer();
            game.gameScreen.changePlayer(game.turnsManager.player.name, game.turnsManager.state_name, game.turnsManager.player.color);
            game.gameScreen.initGoal(game.gl, game.turnsManager.player);
        }
    }
}