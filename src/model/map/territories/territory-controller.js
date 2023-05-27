import "./continent.js";
import ContinentJson from "dist/assets/data/continent-constructor.json";
import CountryJson from "dist/assets/data/country-constructor.json";


class TerritoryController {
    constructor() {
        this.#continents = [];
        this.#countries = [];
        
        this.loadContinents();
        this.loadCountries();
    }

    loadContinents() {
        for(let i = 0; i < ContinentJson.data.length; i++) {
            let newContinent = new Continent(ContinentJson.data[i].name, ContinentJson.data[i].bonus);
            this.#continents.push(newContinent);
        }
    }

    loadCountries() {
        for(let i = 0; i < CountryJson.data.length; i++) {
            let newCountry = new Country(CountryJson.data[i].name, CountryJson.data[i].path, CountryJson.data[i].continent, CountryJson.data[i].neighbors);
            this.#countries.push(newCountry);
        }
    }

    get continents() {
        return this.#continents;
    }

    get countries() {
        return this.#countries;
    }
}