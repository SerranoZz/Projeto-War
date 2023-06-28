import Continent from "./continent.js";
import Country from "./country";

export default class TerritoryController {
    #continents;
    #countries;

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

    async loadCountries(gl, scale, camera) {
        const countriesJson = await fetch("./assets/data/country-constructor.json");
        const countries = await countriesJson.json();

        for(let i = 0; i < countries.data.length; i++) {
            const continent = this.#continents.find(value => value.name === countries.data[i].continent);

            let newCountry = new Country(countries.data[i].name, countries.data[i].path, continent, countries.data[i].neighbors);
            await newCountry.loadMesh(countries.data[i].path, gl, scale, countries.data[i].point);

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
        if(!(base instanceof(Country)) || !(destiny instanceof(Country)) || !(typeof qtd==="number")){
            throw new Error("Parametro invalido");       
        }
        if(base.findNeighbor(destiny)){
            if(base.soldiers <= qtd){
                throw new Error("quantidade de tropas invalidas");
            }
            base.soldiers -= qtd;
            destiny.soldiers += qtd;
        }
    }

    continentsOfPlayer(player){
        const out = [];

        for(const continent of this.#continents){
            if(continent.owner === player)
                out.push(continent.name);
        }

        return out;
    }
    //verificar se precisa retornar alguma coisa

    clickedCountry(x, y, camera){
        for(let country of this.#countries){
            if(country.mesh.pointCollision(x, y, camera))
                return country;
        }
    
        return null;
    }

    clone() {
        let continentClone = Object.assign([], this.#continents);
        for(let i = 0; i < continentClone.length; i++) {
            continentclone[i] = Object.assign(new Continent(0, 0), continentClone[i]);
        }

        let countryClone = Object.assign([], this.#countries);
        for(let i = 0; i < countryClone.length; i++) {
            countryclone[i] = Object.assign(new Country(0, 0, 0, 0), countryClone[i]);
        }

        let clone = Object.assign(new TerritoryController(), this);
        clone.#continents = continentclone;
        clone.#countries = countryClone;
        return clone;
    }
}