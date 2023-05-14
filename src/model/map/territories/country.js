import "/continent.js";

class Country {
    constructor(name, path, continent, neighbors) {
        this.#name = name;
        this.#path = path;
        this.#neighbors = neighbors;
        this.#owner = null;
        this.#continent = null;
        this.#setContinent(continent);
        this.#soldiers = 0;
    }
    
    get name() {
        return this.#name;
    }
    
    get path() {
        return this.#path;
    }
    
    get neighbors() {
        return this.#neighbors;
    }
    
    get owner() {
        return this.#owner;
    }
    
    get continent() {
        return this.#continent;
    }

    get soldiers() {
        return this.#soldiers;
    }
    
    set continent(continent) {
        this.#continent = continent;
        continent.addCountry(this);
    }

    set owner(newOwner) {
        //todo (Conquista de territorio)
    }

    set soldiers(soldiers) {
        this.#soldiers = soldiers;
    }
}