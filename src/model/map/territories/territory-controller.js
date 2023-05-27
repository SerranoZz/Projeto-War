import "./continent.js";
import ContinentJson from "dist/assets/data/continent-constructor.json";
import CountryJson from "dist/assets/data/country-constructor.json";



class TerritoryController {
    constructor() {
        this.continents = [];
        this.countries = [];
        
        this.loadContinents();
        this.loadCountries();
    }

    loadContinents() {
        for(let i = 0; i < ContinentJson.data.length; i++) {
            let newContinent = new Continent(ContinentJson.data[i].name, ContinentJson.data[i].bonus);
            this.continents.push(newContinent);
        }
    }

    loadCountries() {
        for(let i = 0; i < CountryJson.data.length; i++) {
            let newCountry = new Country(CountryJson.data[i].name, CountryJson.data[i].path, CountryJson.data[i].continent, CountryJson.data[i].neighbors);
            this.countries.push(newCountry);
        }
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