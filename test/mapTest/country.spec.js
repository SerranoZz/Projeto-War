// Importe a classe e as dependências necessárias para os testes
import Country from '../../src/model/map/territories/country';

describe('Country', () => {
  let country;

  beforeEach(() => {
    // Crie uma nova instância da classe antes de cada teste
    country = new Country('CountryName', 'path', 'continent', ['neighbor1', 'neighbor2']);
  });

  it('deve ter os valores corretos nas propriedades após a criação', () => {
    expect(country.name).toBe('CountryName');
    expect(country.path).toBe('path');
    expect(country.continent).toBe('continent');
    expect(country.neighbors).toEqual(['neighbor1', 'neighbor2']);
    expect(country.owner).toBeNull();
    expect(country.soldiers).toBe(1);
  });

  it('deve permitir definir o dono corretamente', () => {
    const newOwner = 'NewOwner';
    country.owner = newOwner;
    expect(country.owner).toBe(newOwner);
  });

  it('deve permitir definir o número de soldados corretamente', () => {
    const newSoldiers = 10;
    country.soldiers = newSoldiers;
    expect(country.soldiers).toBe(newSoldiers);
  });

  it('deve encontrar o vizinho corretamente', () => {
    const neighborIndex = country.findNeighbor('neighbor2');
    expect(neighborIndex).toBe(1);
  });

});
