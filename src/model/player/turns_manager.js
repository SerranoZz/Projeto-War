export default class TurnsManager{
    #state;
    #state_name;
    #currPlayerIndex;
    #players;

    #fortifyOpened = false;

    #round = 1;

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
        this.#currPlayerIndex = this.#currPlayerIndex+1;

        if(this.#currPlayerIndex >= this.#players.length){
            this.#round++;
            this.#currPlayerIndex = 0;
        }

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
        if(this.#state === 0 && this.#players[this.#currPlayerIndex].freeTroops > 0){
            alert("Distribua todas as suas tropas");
            return;
        }

        this.#state++;

        if(this.#state === 4 || this.#round === 1 && this.#state===1){
            this.#state = 0;
            this.nextPlayer();

        }
    }
}