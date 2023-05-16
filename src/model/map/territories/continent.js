import "/country.js";

class Continent {
    constructor(name, bonus) {
        this.#name = name;
        this.#countries = [];
        this.#bonus = bonus;
    }

    addCountry(country) {
        this.#countries.push(country);
    }

    get name() {
        return this.#name;
    }

    get countries() {
        return this.#countries;
    }

    get bonus() {
        return this.#bonus;
    }
}