import { describe, it, expect, vi, beforeEach } from "vitest";

import Game from "./Game.js";
import GameState from "./GameState.js";
import Player from "./Player.js";

import { PlayerType, TriggerType } from "../schemas/types.js";

vi.mock("../Components/Logger.js", () => ({
  default: {
    debug: vi.fn(),
  },
}));

vi.mock("../Components/TreeParser.js", () => ({
  evaluate: vi.fn(() => true),
}));

vi.mock("./GameState.js", () => {
  return {
    default: class MockGameState {
      players: any = {};

      numPlayers = 0;

      currentStep: any = null;

      gameLabels = {
        getFromLabel: vi.fn(),
      };
    },
  };
});

describe("Game", () => {
  let definition: any;

  let game: Game;

  beforeEach(() => {
    definition = {
      maxPlayers: 4,

      minPlayers: 2,

      player: {
        piles: [],

        counters: [],
      },

      getStartingStep: vi.fn(() => ({
        actions: [],
      })),
    };

    game = new Game(definition);
  });

  it("creates game with definition", () => {
    expect(game.definition).toBe(definition);

    expect(game.gameState).toBeInstanceOf(GameState);
  });

  it("adds player successfully", () => {
    const player = game.handlePlayerJoin(PlayerType.HUMAN);

    expect(player).toBeInstanceOf(Player);

    expect(game.numPlayers).toBe(1);
  });

  it("assigns increasing player ids", () => {
    const p1 = game.handlePlayerJoin(PlayerType.HUMAN);

    const p2 = game.handlePlayerJoin(PlayerType.HUMAN);

    expect(p1?.id).toBe(0);

    expect(p2?.id).toBe(1);
  });

  it("rejects players when full", () => {
    definition.maxPlayers = 1;

    game.handlePlayerJoin(PlayerType.HUMAN);

    const result = game.handlePlayerJoin(PlayerType.HUMAN);

    expect(result).toBeNull();
  });

  it("starts game and adds bots", () => {
    game.startGame();

    expect(game.numPlayers).toBe(2);

    expect(definition.getStartingStep).toHaveBeenCalled();
  });

  it("sets starting step", () => {
    const step = {
      actions: [],
    };

    definition.getStartingStep = vi.fn(() => step);

    game.startGame();

    expect(game.currentStep).toBe(step);
  });

  it("returns false without actions", () => {
    game.currentStep = null;

    expect(game.clickAction("test")).toBe(false);
  });

  it("returns false for invalid label", () => {
    game.currentStep = {
      actions: [
        {
          trigger: {
            type: TriggerType.CLICK,

            target: "BUTTON",
          },
        },
      ],
    } as any;

    game.gameLabels.getFromLabel = vi.fn(() => undefined);

    expect(game.clickAction("bad")).toBe(false);
  });

  it("executes click action", async () => {
    const obj = {
      actionRoles: ["BUTTON"],
    };

    game.currentStep = {
      actions: [
        {
          trigger: {
            type: TriggerType.CLICK,

            target: "BUTTON",
          },

          filter: {},

          result: {},
        },
      ],
    } as any;

    game.gameLabels.getFromLabel = vi.fn(() => obj);

    const result = game.clickAction("button");

    expect(result).toBe(true);
  });

  it("gets player", () => {
    game.gameState.players[5] = {
      id: 5,
    };

    expect(game.getPlayer(5)).toEqual({
      id: 5,
    });
  });

  it("increments nextPlayerId", () => {
    expect(game.nextPlayerId).toBe(0);

    expect(game.nextPlayerId).toBe(1);
  });
});
