import Country from "./country";

export default class Continent {
    #name;
    #countries;
    #bonus;
    #owner;

    constructor(name, bonus) {
        this.#name = name;
        this.#countries = [];
        this.#bonus = bonus;
        this.#owner = null;
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

    get owner(){
        return this.#owner;
    }

    set owner(owner){
        this.#owner = owner;
    }
}