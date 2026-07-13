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
    });

    expect(mockGame.clickAction).toHaveBeenCalledWith("PILE");

    expect(mockState.postMessage).toHaveBeenCalled();
  });

  it("does not send state when player click fails", () => {
    mockState.postMessage.mockClear();

    mockGame.clickAction.mockReturnValue(false);

    mockState.messageHandler({
      type: "PLAYER_CLICK",

      label: "PILE",
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
    });

    expect(mockGame.handlePlayerJoin).toHaveBeenCalledWith("HUMAN");

    expect(mockState.postMessage).toHaveBeenCalledWith({
      type: "PLAYER_JOINED",

      playerId: 5,
    });
  });

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
