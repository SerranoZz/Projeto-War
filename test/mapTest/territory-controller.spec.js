import TerritoryController from "../../src/model/map/territories/territory-controller";
import Continent from "../../src/model/map/territories/continent";
import Country from "../../src/model/map/territories/country";

// Mocking the fetch function to return a resolved Promise with a JSON response
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: [] }),
  })
);

describe('TerritoryController', () => {
  let territoryController;

  beforeEach(() => {
    territoryController = new TerritoryController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize continents and countries', async () => {
    await territoryController.init();

    expect(territoryController.continents).toEqual([]);
    expect(territoryController.countries).toEqual([]);
  });

  it('should load continents', async () => {
    await territoryController.loadContinents();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('./assets/data/continent-constructor.json');
  });

  it('should load countries', async () => {
    await territoryController.loadCountries();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('./assets/data/country-constructor.json');
  });

//   it('should conquer a country', () => {
//     territoryController.conquerCountry('Brazil', 'Player 1');

//     expect(country1.owner).toBe('Player 1');
//   });

//   it('should not conquer a non-existing country', () => {
//     territoryController.conquerCountry('Chile', 'Player 1');

//     expect(country1.owner).toBeUndefined();
//     expect(country2.owner).toBeUndefined();
//   });

});
