import Goal from '../../src/model/tools/goal.js';

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

  // test('should verify destroy for player with goalId 8 and no continents owned by matching color', () => {
  //   const player = {
  //     goalId: 8,
  //     vetContinentsOwned: [],
  //   };

  //   const vetPlayer = [
  //     { color: [0, 0, 1, 1], continentsOwned: 0 },
  //     { color: [1, 1, 0, 1], continentsOwned: 0 },
  //     { color: [1, 0, 0, 1], continentsOwned: 0 },
  //     { color: [1, 1, 1, 1], continentsOwned: 0 },
  //     { color: [0, 0, 0, 1], continentsOwned: 0 },
  //     { color: [0, 0.4, 0, 1], continentsOwned: 0 },
  //   ];

  //   const result = goal.verifyDestroy(player, vetPlayer);

  //   expect(result).toBe(true);
  // });

  // test('should not verify destroy for player with goalId 8 and continents owned by matching color', () => {
  //   const player = {
  //     goalId: 8,
  //     vetContinentsOwned: [],
  //   };

  //   const vetPlayer = [
  //     { color: [0, 0, 1, 1], continentsOwned: 1 },
  //     { color: [1, 1, 0, 1], continentsOwned: 0 },
  //     { color: [1, 0, 0, 1], continentsOwned: 0 },
  //     { color: [1, 1, 1, 1], continentsOwned: 0 },
  //     { color: [0, 0, 0, 1], continentsOwned: 0 },
  //     { color: [0, 0.4, 0, 1], continentsOwned: 0 },
  //   ];

  //   const result = goal.verifyDestroy(player, vetPlayer);

  //   expect(result).toBe(false);
  // });


  // //verificar o owner

  // test('should assign a goal to player with color azul', () => {
  //   const player = {
  //     color: [0, 0, 1, 1],
  //   };

  //   goal.sortGoal(player, 'azul');

  //   expect(goal.getGoal).toBeDefined();
  //   expect(goal.getGoal.owner).toBe(player);
  //   expect(goal.getGoal.owner.color).toBe(player.color);
  // });

  // test('should assign a goal to player with color amarelo', () => {
  //   const player = {
  //     color: [1, 1, 0, 1],
  //   };

  //   goal.sortGoal(player, 'amarelo');

  //   expect(goal.getGoal).toBeDefined();
  //   expect(goal.getGoal.owner).toBe(player);
  //   expect(goal.getGoal.owner.color).toBe(player.color);
  // });

  // test('should verify territory for player with goalId 6 and sufficient territories owned with required troops', () => {
  //   const player = {
  //     goalId: 6,
  //     territoriesOwned: 4,
  //     vetTerritoriesOwned: [
  //       { soldiers: 2 },
  //       { soldiers: 7 },
  //       { soldiers: 3 },
  //       { soldiers: 5 },
  //       // ... (18 territories in total)
  //     ],
  //   };

  //   const result = goal.verifyTerritory(player);

  //   expect(result).toBe(true);
  // });

  // test('should not verify territory for player with goalId 6 and insufficient territories owned', () => {
  //   const player = {
  //     goalId: 6,
  //     territoriesOwned: 10,
  //     vetTerritoriesOwned: [
  //       { soldiers: 2 },
  //       { soldiers: 2 },
  //       // ... (10 territories in total)
  //     ],
  //   };

  //   const result = goal.verifyTerritory(player);

  //   expect(result).toBe(false);
  // });

  test('should not verify territory for player with goalId 6 and territories owned but insufficient troops', () => {
    const player = {
      goalId: 6,
      territoriesOwned: 18,
      vetTerritoriesOwned: [
        { soldiers: 1 },
        { soldiers: 2 },
        // ... (18 territories in total)
      ],
    };

    const result = goal.verifyTerritory(player);

    expect(result).toBe(false);
  });


  test('should return "azul" for color [0, 0, 1, 1]', () => {
    const color = [0, 0, 1, 1];

    const result = goal.colorName(color);

    expect(result).toBe('azul');
  });

  test('should return "amarelo" for color [1, 1, 0, 1]', () => {
    const color = [1, 1, 0, 1];

    const result = goal.colorName(color);

    expect(result).toBe('amarelo');
  });
  // Add more test cases for other goalIds as needed
});