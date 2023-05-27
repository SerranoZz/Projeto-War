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
//
import "./continent.js";
import ContinentJson from "dist/assets/data/continent-constructor.json";
import CountryJson from "dist/assets/data/country-constructor.json";

class Attack {
    constructor() {
        this.continents = [];
        this.countries = [];
        
        this.loadContinents();
        this.loadCountries();
    }
//teste de commit

    attackPlayer(contryAttack, countryDefense) {
        if(!this.isValidCountry(contryAttack) || !this.isValidCountry(countryDefense)) {
            console.log("Invalid countries");
            return;
        }
    
        const dicesAttack =  calcDices(contryAttack);
        const dicesDefense = this.calcDices(countryDefense);
    
        const attackDiceRolls = this.rollDice(dicesAttack);
        const defendDiceRolls = this.rollDice(dicesDefense);
    
        let attackWins = 0;
        let defenseWins = 0;
    
        for (let i = 0; i < Math.min(dicesAttack, dicesDefense); i++) {
            if (attackDiceRolls[i] > defendDiceRolls[i]) {
                attackWins++;
            } else {
                defenseWins++;
            }
        }
        contryAttack.soldier -= defenseWins;
        countryDefense.soldier -= attackWins;
    }
    
    rollDice(numDice) {
        const diceRolls = [];
        for (let i = 0; i < numDice; i++) {
            diceRolls.push(Math.floor(Math.random() * 6) + 1);
        }
        return diceRolls;
    }
    
    calcDices(contry) {
        if(contry.soldier >= 3 || contry.soldier >= 1) {
            let dice =  3;
            return dice;
        }else if(contry.soldier < 3 || contry.soldier >= 1) {
            let dice = 2;
            return dice;
        }else if(contry.soldier < 2 || contry.soldier >=1) {
            let dice = 1;
            return dice;
        }
    }
    getCountryObject(country) {
        return this.countries.find((c) => c.name === country);
    }
////
    isValidCountry(country) {
        return this.countries.includes(country);
    }
}
