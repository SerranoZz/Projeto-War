import "/continent.js";

class Country {
    constructor(name, path, continent) {
        this.name = name;
        this.path = path;
        this.neighbors = [];
        this.owner = null;
        this.continent = null;
        this.addContinent(continent);
    }

    addContinent(continent) {
        this.continent = continent;
        continent.addCountry(this);
    }
}