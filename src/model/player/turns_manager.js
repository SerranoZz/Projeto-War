export default class TurnsManager{
    #state;
    #currPlayerIndex;
    #players;

    static DISTRIBUCTION = 0;
    static ATTACK = 1;
    static REMELATION = 2;
    static EXCHANGE_CARDS = 3;
    static FREEZE = 4; // freeze events until next player be provided

    constructor(players){
        this.#players = players;
        this.#currPlayerIndex = 0;
        this.#state = TurnsManager.DISTRIBUCTION;
    }

    nextPlayer(){
        this.#currPlayerIndex++;
        this.#state = TurnsManager.DISTRIBUCTION;
    }

    get player(){
        this.#players[this.#currPlayerIndex];
    }

    get state(){
        return this.#state;
    }

    nextState(){
        if(this.#state < TurnsManager.FREEZE)
            this.#state++;
    }
}