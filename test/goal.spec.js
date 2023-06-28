import Goal from '../src/model/tools/goal.js';

describe('Goal', () => {
  let goal;

  beforeEach(() => {
    goal = new Goal();
  });

  test('should verify continent for player with goalId 0', () => {
    const player = {
      goalId: 0,
      continentsOwned: 3,
      vetContinentsOwned: ["Europa", "Oceania", "Outro"]
    };

    const result = goal.verifyContinent(player);

    expect(result).toBe(true);
  });

  test('should verify continent for player with goalId 0', () => {
    const player = {
      goalId: 0,
      continentsOwned: 3,
      vetContinentsOwned: ["Outro", "Outro", "Europa"]
    };

    const result = goal.verifyContinent(player);

    expect(result).toBe(false);
  });

  test('should verify continent for player with goalId 0', () => {
    const player = {
      goalId: 0,
      continentsOwned: 1,
      vetContinentsOwned: ["Europa"]
    };

    const result = goal.verifyContinent(player);

    expect(result).toBe(false);
  });

  

  // Add more test cases for other goalIds as needed
});