class AI {
    constructor(game) {
        this.#currentState = new Board(game, 0);
    }

    play() {
        return this.#currentState.bestBoard();
    }
}