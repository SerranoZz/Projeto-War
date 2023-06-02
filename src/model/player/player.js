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
    
        const dicesAttack =  this.calcDices(countryAttack);
        const dicesDefense = this.calcDices(countryDefense);
    
        const attackDiceRolls = Dice.rollDice(dicesAttack);
        const defendDiceRolls = Dice.rollDice(dicesDefense);
    
        let attackWins = 0;
        let defenseWins = 0;
    
        for (let i = 0; i < Math.min(dicesAttack, dicesDefense); i++) {
            if (attackDiceRolls[i] > defendDiceRolls[i]) {
                attackWins++;
            } else {
                defenseWins++;
            }
        }
        countryAttack.soldier -= defenseWins;
        countryDefense.soldier -= attackWins;
    }
    
    calcDices(country) {
        if(country.soldiers >= 3 || country.soldiers >= 1) {
            let dice =  3;
        }else if(country.soldiers < 3 || country.soldiers >= 1) {
            let dice = 2;
        }else if(country.soldiers < 2 || country.soldiers >=1) {
            let dice = 1;
        }
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
    #goal;
    #freeTroops;

    constructor(name, color, goal) {
      this.#name = name;
      this.#color = color; // pode ser usado como ID 
      this.#territoriesOwned = [];
      this.#goal = goal;
      this.#freeTroops = 0;
    }
  
    conquestTerritory(territorio) {
      this.#territoriesOwned.push(territorio);
    }
    

    receiveTroop(){

        //calcula a quantidade de tropas a ser recebida devio a quantidade de territorios        
        const qtdreceivedTroops = Math.floor(this.#territoriesOwned.length / 2);

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
}
