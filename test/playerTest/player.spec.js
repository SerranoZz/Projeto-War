// import { Player } from '../../src/model/player/player';
// import Territory from '../../src/model/map/territories/territory-controller';

// describe('Player', () => {
//   let player;
//   let territoryController;

//   beforeEach(() => {
//     territoryController = {
//       continentsOfPlayer: jest.fn().mockReturnValue(['Europa', 'Oceania']),
//     };
//     player = new Player('Player1', 'blue', { id: 0, goal: 'Goal 1' }, territoryController);
//   });

//   test('should add conquered territory to player', () => {
//     const territory = new Territory('Territory1', 'blue');
//     player.conquestTerritory(territory);

//     expect(player.territoriesOwned).toBe(1);
//     expect(player.vetTerritoriesOwned).toContain(territory);
//   });

//   test('should receive a card', () => {
//     player.receiveCard();

//     expect(player.cards.length).toBe(1);
//   });

//   test('should receive troops based on owned territories', () => {
//     player.conquestTerritory(new Territory('Territory1', 'blue'));
//     player.conquestTerritory(new Territory('Territory2', 'blue'));

//     player.receiveTroop();

//     expect(player.freeTroops).toBe(3);
//   });

//   test('should add troops to a country', () => {
//     const country = new Territory('Territory1', 'blue');
//     player.conquestTerritory(country);

//     player.addTroops(country, 2);

//     expect(country.soldiers).toBe(2);
//     expect(player.freeTroops).toBe(1);
//   });

//   test('should attack another country and receive a card if successful', () => {
//     const base = new Territory('Territory1', 'blue', 3);
//     const to = new Territory('Territory2', 'red', 2);

//     player.attack(base, to);

//     expect(player.cards.length).toBe(1);
//     expect(to.owner).toBe(player);
//     expect(to.color).toBe('blue');
//   });
// });



import Dice from '../../src/model/tools/dice';

describe('Dice', () => {
  it('should roll the specified number of dice', () => {
    const numDice = 3;
    const diceRolls = Dice.rollDice(numDice);

    expect(diceRolls).toHaveLength(numDice);
  });

  it('should return numbers between 1 and 6', () => {
    const numDice = 5;
    const diceRolls = Dice.rollDice(numDice);

    for (const roll of diceRolls) {
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(6);
    }
  });
});