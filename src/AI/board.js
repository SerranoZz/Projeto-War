class Board {

    constructor(game, depthLevel, player) {
        this.#game = game.clone();
        this.#depthLevel = depthLevel;
        if(depthLevel < 1) {
            this.#boards = openBoard();
        }
        this.#player = player;
        this.#bestPlay = null;
    }

    bestBoard() {
        let bestBoard = this;
        let bestEvaluate = this.evaluate();
        for(let i = 0; i < this.#boards.length; i++) {
            let actualEvaluate = this.#boards[i].evaluate();
            if(actualEvaluate >= bestEvaluate) {
                bestEvaluate = actualEvaluate;
                bestBoard = this.#boards[i];
            }
        }
        return bestBoard;
    }

    openBoard() {
        //will generate all possible boards this game can go to.
    }

    evaluate() {
        //Pega o valor total do tabuleiro
        this.evaluateDefense() + this.evaluateObjective() + this.evaluateTerritories;
    }

    evaluateDefense() {
        //Pega a média dos valores individuais de defesa obtido na evaluateCountryDefense()
        let sum = 0;
        for(let i = 0; i < player.territoriesOwned.length; i++) {
            let actual = player.territoriesOwned[i];
            let tempSum = 0;
            for(let j = 0; j < actual.neighbors.length; j++) {
                tempSum += this.evaluateCountryDefense(actual, actual.neighbors[i]);
            }
            sum += tempSum/actual.neighbors.length;
        }
        return sum/player.territoriesOwned.length;
    }

    evaluateCountryDefense(from, to) {
        return Math.atan(3.5*from.soldiers/to.soldiers);
    }

    evaluateObjective() {
        //Pega a porcentagem de conclusão do objetivo e aplica em uma função (a ser definida)
    }

    evaluateTerritories() {
        //Soma os valores dos continentes com os valores dos países
        this.evaluateContinents() + this.evaluateCountries();
    }

    evaluateCountries() {
        return this.player
    }

    evaluateContinents() {
        //Função que usa a quantidade de continentes conquistados
    }
}