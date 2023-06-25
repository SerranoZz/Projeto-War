export default class TurnsManager{
    #state;
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