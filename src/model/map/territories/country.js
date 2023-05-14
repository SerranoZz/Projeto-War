import "/continent.js";

class Country {
    constructor(name, path, continent, neighbors) {
        this.name = name;
        this.path = path;
        this.neighbors = neighbors;
        this.owner = null;
        this.continent = null;
        this.setContinent(continent);
        this.soldiers = 0;
    }
    
    getName() {
        return this.name;
    }
    
    getPath() {
        return this.path;
    }
    
    getNeighbors() {
        return this.neighbors;
    }
    
    getOwner() {
        return this.owner;
    }
    
    getContinent() {
        return this.continent;
    }

    getSoldiers() {
        return this.soldiers;
    }
    
    setContinent(continent) {
        this.continent = continent;
        continent.addCountry(this);
    }

    setOwner(newOwner) {
        //todo (Conquista de territorio)
    }

    setSoldiers(soldiers) {
        this.soldiers = soldiers;
    }
}