import Continent from "./continent.js";
import Country from "./country";

export default class TerritoryController {
    #continents;
    #countries;

    /*constructor() {
        this.#continents = [];
        this.#countries = [];
        
        this.loadContinents();
        this.loadCountries();
    }*/

    async init(){
        this.#continents = [];
        this.#countries = [];
        
        await this.loadContinents();
        await this.loadCountries();
    }

    async loadContinents() {
        const continents = await fetch("./assets/data/continent-constructor.json");
        const data = await continents.json();

        for(let i = 0; i < data.length; i++) {
            let newContinent = new Continent(data[i].name, data[i].bonus);
            this.#continents.push(newContinent);
        }
    }

    async loadCountries() {
        const countries = await fetch("./assets/data/country-constructor.json");
        const data = await countries.json();

        for(let i = 0; i < data.length; i++) {
            let newCountry = new Country(data[i].name, data[i].path, data[i].continent, data[i].neighbors);
            this.#countries.push(newCountry);
        }
    }

    conquerCountry(country, newOwner) {
        countryFound = this.findCountry(country);
        if(!countryFound) {
            countryFound.owner = newOwner;
        }
    }

    findCountry(country) {
        for(let i = 0; i < this.#countries; i++) {
            if(this.#countries[i].name == country) {
                return this.#countries[i];
            }
        }
        return null;
    }

    get continents() {
        return this.#continents;
    }

    get countries() {
        return this.#countries;
    }

    troop_reassignment(base, destiny, qtd){
        if(!(base instanceof(Country)) || !(destiny instanceof(Country)) || !(qtd instanceof int)){
            throw new Error("Parametro invalido");       
        }
        if(base.findNeighbor(destiny)){
            if(!(base.soldier > qtd)){
                throw new Error("quantidade de tropas invalidas");
            }
            base.soldier -= qtd;
            destiny.soldier += qtd;
        }
    }
    //verificar se precisa retornar alguma coisa
}