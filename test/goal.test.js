import Goal from "../src/model/tools/goal.js";

describe("Goal", () => {
  let goal;

  beforeEach(() => {
    goal = new Goal();
  });

  test("should return false if colorName is empty", () => {
    const player = { goalId: 14 }; // Assuming an invalid goalId
    const vetPlayer = []; // Assuming an empty array of players
    const result = goal.verifyDestroy(player, vetPlayer);
    expect(result).toBe(false);
  });

  test("should return false if any player with matching color has continentsOwned > 0", () => {
    const player = { goalId: 8 }; // Assuming goalId of 8 (azul)
    const vetPlayer = [
      { color: [0, 0, 1, 1], continentsOwned: 0 }, // azul player with continentsOwned 0
      { color: [1, 1, 0, 1], continentsOwned: 1 }, // amarelo player with continentsOwned 1
    ];
    const result = goal.verifyDestroy(player, vetPlayer);
    expect(result).toBe(false);
  });

  test("should return true if no player with matching color has continentsOwned > 0", () => {
    const player = { goalId: 8 }; // Assuming goalId of 8 (azul)
    const vetPlayer = [
      { color: [0, 0, 1, 1], continentsOwned: 0 }, // azul player with continentsOwned 0
      { color: [1, 1, 0, 1], continentsOwned: 0 }, // amarelo player with continentsOwned 0
    ];
    const result = goal.verifyDestroy(player, vetPlayer);
    expect(result).toBe(true);
  });
});