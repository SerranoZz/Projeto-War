export default class TurnsManager{
    #state;
    #state_name;
    #currPlayerIndex;
    #players;

    #fortifyOpened = false;

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
        this.#currPlayerIndex = (this.#currPlayerIndex+1)%this.#players.length;
        this.#state = TurnsManager.DISTRIBUCTION;
        this.#players[this.#currPlayerIndex].receiveTroop();
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

    nextState(){
        this.#state++;

        if(this.#state === 4){
            this.#state = 0;
            this.nextPlayer();

        }
    }
}