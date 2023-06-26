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
        countryDefense.soldiers -= attackWins;
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

    constructor(name, color, goal) {
      this.#name = name;
      this.#color = color; // pode ser usado como ID 
      this.#territoriesOwned = [];
      this.#continentsOwned = [];
      this.#goal = goal;
      this.#freeTroops = 0;
    }
  
    conquestTerritory(territorio) {
      this.#territoriesOwned.push(territorio);
    }
    

    receiveTroop(){

        //calcula a quantidade de tropas a ser recebida devio a quantidade de territorios        
        let qtdreceivedTroops = Math.floor(this.#territoriesOwned.length / 2);

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
        const att = new Attack();
        att.attackPlayer(base, to);
        console.log(base.soldiers, to.soldiers);
        if(to.soldiers===0){
            to.owner = this;
            to.changeColor();
        }
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

    get continentsOwned(){
        return this.#continentsOwned.length;
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
}
