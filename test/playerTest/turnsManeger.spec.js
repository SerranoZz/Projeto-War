import TurnsManager from "../../src/model/player/turns_manager";
import Player from "../../src/model/player/player";

jest.mock("../../src/model/player/player");

describe("TurnsManager", () => {
  let player1;
  let player2;
  let players;
  let turnsManager;

  beforeEach(() => {
    player1 = new Player();
    player2 = new Player();
    players = [player1, player2];
    turnsManager = new TurnsManager(players);
  });

  it("deve iniciar o turno corretamente", () => {
    expect(turnsManager.player).toBe(player1);
    expect(turnsManager.state).toBe(TurnsManager.DISTRIBUCTION);
    expect(turnsManager.state_name).toBe("Distribuição de Tropas");
  });

  it("deve avançar para o próximo jogador corretamente", () => {
    turnsManager.nextPlayer();

    expect(turnsManager.player).toBe(player2);
    expect(turnsManager.state).toBe(TurnsManager.DISTRIBUCTION);
    expect(turnsManager.state_name).toBe("Distribuição de Tropas");
  });

  it("deve avançar para o próximo estado corretamente", () => {
    turnsManager.nextState();

    expect(turnsManager.state).toBe(TurnsManager.ATTACK);
    expect(turnsManager.state_name).toBe("Fase de Ataque");

    turnsManager.nextState();

    expect(turnsManager.state).toBe(TurnsManager.REASSIGNMENT);
    expect(turnsManager.state_name).toBe("Remanejo de Tropas");

    turnsManager.nextState();

    expect(turnsManager.state).toBe(TurnsManager.EXCHANGE_CARDS);
    expect(turnsManager.state_name).toBe("Troca de Cartas");

    turnsManager.nextState();

    expect(turnsManager.state).toBe(TurnsManager.DISTRIBUCTION);
    expect(turnsManager.state_name).toBe("Distribuição de Tropas");
    expect(turnsManager.round).toBe(2);
    expect(turnsManager.player.freeTroops).toBeGreaterThan(0);
  });

  it("deve abrir e fechar a fortificação corretamente", () => {
    expect(turnsManager.fortifyOpened).toBe(false);

    turnsManager.openFortify();

    expect(turnsManager.fortifyOpened).toBe(true);

    turnsManager.closeFortify();

    expect(turnsManager.fortifyOpened).toBe(false);
  });
});
