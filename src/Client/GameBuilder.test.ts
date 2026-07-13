import { describe, it, expect, vi, beforeEach } from "vitest";

import { buildGameFromJSON, buildGameFromDatabase } from "./GameBuilder.js";

import Database from "../Components/Database.js";
import GameDefinition from "../Rules/GameDefinition.js";

import { verifyClientGameDefintion } from "../schemas/ClientGameDefinition.js";

vi.mock("../schemas/ClientGameDefinition.js", () => ({
  verifyClientGameDefintion: vi.fn(),
}));

vi.mock("../Components/Database.js", () => ({
  default: {
    getGameFromId: vi.fn(),
  },
}));

describe("buildGameFromJSON", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when JSON validation fails", () => {
    vi.mocked(verifyClientGameDefintion).mockReturnValue(null);

    const result = buildGameFromJSON({});

    expect(result).toBeNull();
  });

  it("creates a game definition from valid JSON", () => {
    vi.mocked(verifyClientGameDefintion).mockReturnValue({
      gameMeta: {
        minPlayers: 2,

        maxPlayers: 4,
      },

      playerDefinition: {
        piles: [],

        counters: [],
      },

      boardDefinition: {
        piles: [],

        counters: [],
      },

      phases: [],
    } as any);

    const result = buildGameFromJSON({});

    expect(result).toBeInstanceOf(GameDefinition);

    expect(result?.minPlayers).toBe(2);

    expect(result?.maxPlayers).toBe(4);
  });

  it("adds player piles", () => {
    const spy = vi.spyOn(GameDefinition.prototype, "addPlayerPile");

    vi.mocked(verifyClientGameDefintion).mockReturnValue({
      gameMeta: {},

      playerDefinition: {
        piles: [
          {
            label: "hand",
          },
        ],
      },

      boardDefinition: {},

      phases: [],
    } as any);

    buildGameFromJSON({});

    expect(spy).toHaveBeenCalledWith({
      label: "hand",
    });
  });

  it("adds board counters", () => {
    const spy = vi.spyOn(GameDefinition.prototype, "addBoardCounter");

    vi.mocked(verifyClientGameDefintion).mockReturnValue({
      gameMeta: {},

      playerDefinition: {},

      boardDefinition: {
        counters: [
          {
            label: "score",
          },
        ],
      },

      phases: [],
    } as any);

    buildGameFromJSON({});

    expect(spy).toHaveBeenCalledWith({
      label: "score",
    });
  });

  it("creates phases, steps, and actions", () => {
    const phaseSpy = vi.spyOn(GameDefinition.prototype, "addPhase");

    const stepSpy = vi.spyOn(GameDefinition.prototype, "addStepToPhase");

    const actionSpy = vi.spyOn(GameDefinition.prototype, "addActionToStep");

    vi.mocked(verifyClientGameDefintion).mockReturnValue({
      gameMeta: {},

      playerDefinition: {},

      boardDefinition: {},

      phases: [
        {
          name: "main",

          steps: [
            {
              name: "draw",

              actions: [
                {
                  trigger: "CLICK",

                  filter: null,

                  result: {},
                },
              ],
            },
          ],
        },
      ],
    } as any);

    buildGameFromJSON({});

    expect(phaseSpy).toHaveBeenCalledWith("main");

    expect(stepSpy).toHaveBeenCalledWith("main", "draw");

    expect(actionSpy).toHaveBeenCalled();
  });
});

describe("buildGameFromDatabase", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when database has no game", async () => {
    vi.mocked(Database.getGameFromId).mockResolvedValue([]);

    const result = await buildGameFromDatabase(1);

    expect(result).toBeNull();
  });

  it("builds game from database JSON", async () => {
    vi.mocked(Database.getGameFromId).mockResolvedValue([
      {
        gameRules: JSON.stringify({
          test: "game",
        }),
      },
    ] as any);

    vi.mocked(verifyClientGameDefintion).mockReturnValue({
      gameMeta: {},

      playerDefinition: {},

      boardDefinition: {},

      phases: [],
    } as any);

    const result = await buildGameFromDatabase(1);

    expect(result).toBeInstanceOf(GameDefinition);

    expect(Database.getGameFromId).toHaveBeenCalledWith(1);
  });
});
