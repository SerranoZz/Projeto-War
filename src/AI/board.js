class Board {

    constructor(game, depthLevel) {
        game.clone();
        this.#depthLevel = depthLevel;
        if(depthLevel < 1) {
            this.#boards = openBoard();
        }
    }

    openBoard() {
        //will generate all possible boards this game can go to.
    }

    evaluate() {
        //Pega o valor total do tabuleiro
        this.evaluateDefense() + this.evaluateObjective() + this.evaluateTerritories;
    }

    evaluateDefense() {
        //Pega a média dos valores individuais de defesa obtido na evaluateCountryDefenseAll()
    }

    evaluateCountryDefenseAll() {
        //Pega a média da defesa com todas as fronteiras que não seja dele. (caso não tenha, retornará um valor constante)
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
        //Função que usa a quantidade de países
    }

    evaluateContinents() {
        //Função que usa a quantidade de continentes conquistados
    }
}