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

    async init(gl, scale){

        this.#continents = [];
        this.#countries = [];
        
        await this.loadContinents();
        await this.loadCountries(gl, scale);
    }

    async loadContinents() {
        const json = await fetch("./assets/data/continent-constructor.json");
        const continents = await json.json();

        for(let i = 0; i < continents.data.length; i++) {
            let newContinent = new Continent(continents.data[i].name, continents.data[i].bonus);
            this.#continents.push(newContinent);
        }
    }

    async loadCountries(gl, scale) {
        const countriesJson = await fetch("./assets/data/country-constructor.json");
        const countries = await countriesJson.json();

        for(let i = 0; i < countries.data.length; i++) {
            const continent = this.#continents.find(value => value.name === countries.data[i].continent);

            let newCountry = new Country(countries.data[i].name, countries.data[i].path, continent, countries.data[i].neighbors);
            await newCountry.loadMesh(countries.data[i].path, gl, scale);

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

    clickedCountry(x, y, camera){
        for(let country of this.#countries){
            if(country.mesh.pointCollision(x, y, camera))
                return country;
        }
    
        return null;
    }
}