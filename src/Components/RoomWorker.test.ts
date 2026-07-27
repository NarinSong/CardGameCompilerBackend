import { describe, it, expect, beforeEach, vi } from "vitest";

const mockState = vi.hoisted(() => ({
  messageHandler: null as any,

  postMessage: vi.fn(),
}));

// --------------------
// Mock worker_threads
// --------------------

vi.mock("node:worker_threads", () => ({
  parentPort: {
    on: vi.fn((event, callback) => {
      if (event === "message") {
        mockState.messageHandler = callback;
      }
    }),

    postMessage: mockState.postMessage,
  },

  workerData: {
    gameDefinitionJson: JSON.stringify({
      test: "game",
    }),
  },
}));

// --------------------
// Mock ClientView
// --------------------

vi.mock("../Client/ClientView.js", () => ({
  default: {
    fromGamestate: vi.fn(() => ({
      cards: [],
    })),
  },
}));

// --------------------
// Mock GameBuilder
// --------------------

const mockGame = {
  startGame: vi.fn(),

  clickAction: vi.fn(),

  handlePlayerJoin: vi.fn(),

  gameState: {
    players: {
      1: {
        id: 1,
      },

      2: {
        id: 2,
      },
    },

    // Worker checks this after every click to see if it needs to flush any
    // popups out to the room - keep it empty so click tests don't have to
    // deal with popups they're not testing.
    popups: [] as any[],
  },
};

vi.mock("../Client/GameBuilder.js", () => ({
  buildGameFromJSON: vi.fn(() => ({
    createGame: vi.fn(() => mockGame),
  })),
}));

// Import worker after mocks
await import("./RoomWorker.js");

describe("RoomWorker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // START_GAME should kick off the game and immediately push a full state
  // snapshot back out - one view per player currently in gameState.
  it("starts game and sends GAME_STATE", () => {
    mockState.messageHandler({
      type: "START_GAME",
    });

    expect(mockGame.startGame).toHaveBeenCalled();

    expect(mockState.postMessage).toHaveBeenCalledWith({
      type: "GAME_STATE",

      views: [
        {
          playerId: 1,

          view: {
            cards: [],
          },
        },

        {
          playerId: 2,

          view: {
            cards: [],
          },
        },
      ],
    });
  });

  it("handles player click and sends updated state when action succeeds", () => {
    mockGame.clickAction.mockReturnValue(true);

    mockState.messageHandler({
      type: "PLAYER_CLICK",

      label: "PILE",
      cardId: 5,
      playerId: 42,
      buttonValue: undefined,
    });

    expect(mockGame.clickAction).toHaveBeenCalledWith("PILE", 5, 42, undefined);

    expect(mockState.postMessage).toHaveBeenCalled();
  });

  // If the click didn't actually do anything (e.g. it wasn't a valid move),
  // there's no updated state worth sending - the worker should stay quiet.
  it("does not send state when player click fails", () => {
    mockState.postMessage.mockClear();

    mockGame.clickAction.mockReturnValue(false);

    mockState.messageHandler({
      type: "PLAYER_CLICK",

      label: "PILE",
      cardId: 5,
      playerId: 42,
      buttonValue: undefined,
    });

    expect(mockState.postMessage).not.toHaveBeenCalled();
  });

  it("handles player joining", () => {
    mockGame.handlePlayerJoin.mockReturnValue({
      id: 5,
    });

    mockState.messageHandler({
      type: "JOIN_ROOM",

      playerType: "HUMAN",
      playerName: "Alice",
    });

    expect(mockGame.handlePlayerJoin).toHaveBeenCalledWith("HUMAN", "Alice");

    expect(mockState.postMessage).toHaveBeenCalledWith({
      type: "PLAYER_JOINED",

      playerId: 5,
    });
  });

  // handlePlayerJoin can come back empty (room full, bad player type, etc) -
  // worker should still respond, just with a null playerId instead of erroring.
  it("returns null when join fails", () => {
    mockGame.handlePlayerJoin.mockReturnValue(undefined);

    mockState.messageHandler({
      type: "JOIN_ROOM",

      playerType: "HUMAN",
    });

    expect(mockState.postMessage).toHaveBeenCalledWith({
      type: "PLAYER_JOINED",

      playerId: null,
    });
  });
});
