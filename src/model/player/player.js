//FASE DE ATAQUE
// escolher o territorio que ele deseja utilizar para atacar
// escolher o territorio inimigo que ele deseja atacar
// verificar o territorio inimigo 
// calcular se o ataque foi vencedor
// se vencedor, o jogador recebe um novo continente
// se perdedor atualiza o n de tropas 
// verificar se o jogador ainda possui tropas para fazer outro ataque
// passa para o proximo jogador
//Perguntar ao Bruno como importar o json de maneira correta***

import TerritoryController from "../map/territories/territory-controller.js";
import Dice from "../tools/dice.js";

class Attack {
    attackPlayer(countryAttack, countryDefense) {
        /*if(!this.isValidCountry(countryAttack) || !this.isValidCountry(countryDefense)) {
            throw new Error("Invalid countries");
        }*/
    
        const dicesAttack =  this.calcDices(countryAttack, true);
        const dicesDefense = this.calcDices(countryDefense, false);

        if(dicesAttack === 0) return alert("Ataque invalido");
    
        const attackDiceRolls = Dice.rollDice(dicesAttack);
        const defendDiceRolls = Dice.rollDice(dicesDefense);


        let attackWins = 0;
        let defenseWins = 0;
    
        attackDiceRolls.sort().reverse();
        defendDiceRolls.sort().reverse();

        console.log(attackDiceRolls);
        console.log(defendDiceRolls);

        for (let i = 0; i < Math.min(dicesAttack, dicesDefense); i++) {
            if (attackDiceRolls[i] > defendDiceRolls[i]) {
                attackWins++;
            } else {
                defenseWins++;
            }
        }

        console.log(`vitórias do ataque: ${attackWins}, vitórias da defesa: ${defenseWins}`);

        countryAttack.soldiers -= defenseWins;
        console.log("soldiers ataque: ",countryAttack.soldiers);
        countryDefense.soldiers -= attackWins;

        return attackWins;
    }

    calcDices(country, isAttack) {
        if(isAttack) {
            var dice = country.soldiers-1;
            if(dice > 3) dice = 3;
            return dice;
        }

        var dice = country.soldiers;
        if(dice > 3) dice = 3;
        return dice;
    }

    getCountryObject(country) {
        return this.countries.find((c) => c.name === country);
    }

    isValidCountry(country) {
        return this.countries.includes(country);
    }
}

export class Player {
    #name;
    #color;
    #territoriesOwned;
    #continentsOwned;
    #goal;
    #freeTroops;
    #territoryController;
    #cards;

    #cardsIncrement = 4;

    constructor(name, color, goal, territoryController) {
      this.#name = name;
      this.#color = color; // pode ser usado como ID 
      this.#territoriesOwned = [];
      this.#continentsOwned = [];
      this.#cards= [];
      this.#goal = goal;
      this.#freeTroops = 0;
      this.#territoryController = territoryController;
    }
  
    conquestTerritory(territory) {
      this.#territoriesOwned.push(territory);
    }

    lostTerritory(territory){
        const index = this.#territoriesOwned.indexOf(territory);

        this.#territoriesOwned.splice(index, 1);
    }

    // por definição, a carta com valor 0 é o coringa.
    receiveCard(){
        this.#cards.push(Math.floor(Math.random() * 4));
    }
    
    receiveTroop(){
       
        let qtdreceivedTroops = Math.floor(this.#territoriesOwned.length / 2);

        console.log(this.#territoriesOwned);

        if(qtdreceivedTroops<3) qtdreceivedTroops = 3;

        //calcula a quantidade de tropas a ser recebida devio aos bonus de continente
        
        //a fazer

        this.#freeTroops = qtdreceivedTroops;
    }

    addTroops(country,qtdTroops){
        if(qtdTroops <=  this.#freeTroops){
            country.soldiers = country.soldiers + qtdTroops;
            this.#freeTroops -= qtdTroops;
        }
    }

    attack(base, to){
        let win = 0;
        const att = new Attack();
        win = att.attackPlayer(base, to);
        console.log(base.soldiers, to.soldiers);
        console.log(win);

        if(to.soldiers===0){
            to.owner = this;
            to.changeColor();
        }

        return win>0;
    }

    exchangeCards(card1, card2, card3){

        if(card1.card === 3 || card2.card === 3 || card3.card === 3 ||
        (card1.card === card2.card && card1.card === card2.card) || 
        (card1.card !== card2.card && card2.card !== card3.card && card3.card !== card1.card)){

            const indexes = [card1.index, card2.index, card3.index];
            
            const newCards = this.#cards.filter((value, index) => {
                
                return indexes.indexOf(index)===-1;
            });

            this.#cards = newCards;
            console.log("new cards", newCards);

            this.#freeTroops += this.#cardsIncrement;

            this.#cardsIncrement += 2;

            return true;
        }

        return false;
    }
    
    get name(){
        return this.#name;
    }

    get color(){
        return this.#color;
    }

    get freeTroops(){
        return this.#freeTroops;
    }

    get territoriesOwned(){
        return this.#territoriesOwned.length;
    }

    get vetTerritoriesOwned(){
        return this.#territoriesOwned;
    }

    get vetContinentsOwned(){
        return this.#continentsOwned;
    }

    get goal(){
        return this.#goal.goal;
    }

    get goalId(){
        return this.#goal.id;
    }

    get goalPath(){
        return this.#goal.path;
    }

    get continentsOwned(){
        return this.#territoryController.continentsOfPlayer(this);
    }

    get cards(){
        return this.#cards;
    }

    set cards(cards){
        this.#cards = cards;
    }
}
