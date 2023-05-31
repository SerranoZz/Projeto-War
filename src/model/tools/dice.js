export default class Dice{
    static rollDice(numDice) {
        const diceRolls = [];
        for (let i = 0; i < numDice; i++) {
            diceRolls.push(Math.floor(Math.random() * 6) + 1);
        }
        return diceRolls;
    }
}