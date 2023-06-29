
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