import "/country.js";

class Continent {
    constructor(name) {
        this.name = name;
        this.countries = [];
    }

    addCountry(country) {
        this.countries.push(country);
    }
}