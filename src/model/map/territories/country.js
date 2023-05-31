import Continent from "./continent";

export default class Country {
    #name;
    #path;
    #neighbors;
    #owner;
    #continent;
    #soldiers;

    constructor(name, path, continent, neighbors) {
        this.#name = name;
        this.#path = path;
        this.#neighbors = neighbors;
        this.#owner = null;
        this.#continent = null;
        this.continent = continent;
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
        this.#owner = newOwner;
    }

    set soldiers(soldiers) {
        this.#soldiers = soldiers;
    }

    //Retorna o indíce do vizinho, se tiver e se não tiver retorna -1
    findNeighbor(name) {
        for(let i = 0; i < this.#neighbors.length; i++) {
            if(this.#neighbors[i] == name) {
                return i;
            }
        }
        return -1;
    }
}