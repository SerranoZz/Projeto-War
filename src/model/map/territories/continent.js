import "/country.js";

class Continent {
    constructor(name, bonus) {
        this.name = name;
        this.countries = [];
        this.bonus = bonus;
    }

    addCountry(country) {
        this.countries.push(country);
    }

    getName() {
        return this.name;
    }

    getCountries() {
        return this.countries;
    }

    getBonus() {
        return this.bonus;
    }
}