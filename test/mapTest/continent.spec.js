import Continent from '../../src/model/map/territories/continent';
import Country from '../../src/model/map/territories/country';

describe('Continent', () => {
  let continent;

  beforeEach(() => {
    continent = new Continent('ContinentName', 5);
  });

  it('deve ter os valores corretos nas propriedades após a criação', () => {
    expect(continent.name).toBe('ContinentName');
    expect(continent.countries).toEqual([]);
    expect(continent.bonus).toBe(5);
    expect(continent.owner).toBeNull();
  });

  it('deve permitir adicionar um país corretamente', () => {
    const country = new Country('CountryName', 'path', continent, []);
    continent.addCountry(country);
    expect(continent.countries).toEqual([country]);
  });

  it('deve permitir definir o dono corretamente', () => {
    const newOwner = 'NewOwner';
    continent.owner = newOwner;
    expect(continent.owner).toBe(newOwner);
  });

});
