import { describe, it, expect, beforeEach, vi } from "vitest";

// --------------------
// Mock Worker
// --------------------

const mockWorkerState = vi.hoisted(() => ({
  instance: null as any,
}));

vi.mock("node:worker_threads", () => {
  class MockWorker {
    listeners: Record<string, Function[]> = {};

    postMessage = vi.fn();

    terminate = vi.fn();

    constructor() {
      mockWorkerState.instance = this;
    }

    on(event: string, callback: Function) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }

      this.listeners[event].push(callback);

      return this;
    }

    off(event: string, callback: Function) {
      this.listeners[event] = (this.listeners[event] || []).filter(
        (cb) => cb !== callback,
      );

      return this;
    }

    emit(event: string, data: any) {
      for (const callback of this.listeners[event] || []) {
        callback(data);
      }
    }
  }

  return {
    Worker: MockWorker,
  };
});

// --------------------
// Mock GameManager
// --------------------

vi.mock("../GameManager.js", () => ({
  default: {
    getRegisteredGameDefinitionJson: vi.fn(() => ({
      test: "game",
    })),

    clientFromId: vi.fn(),
  },
}));

// --------------------
// Mock index.js
// --------------------

vi.mock("../index.js", () => ({
  sendClientGamestate: vi.fn(),
}));

import Room from "./Room.js";
import GameManager from "../GameManager.js";
import { sendClientGamestate } from "../index.js";

describe("Room", () => {
  let room: Room;
  let worker: any;

  beforeEach(() => {
    vi.clearAllMocks();

    room = new Room("game1" as any, "room1", "ABC123");

    worker = mockWorkerState.instance;
  });

  it("creates a room with correct defaults", () => {
    expect(room.gameId).toBe("game1");

    expect(room.name).toBe("room1");

    expect(room.lobby).toBe("ABC123");

    expect(room.started).toBe(false);

    expect(room.clients).toEqual({});
  });

  it("creates worker with game definition", () => {
    expect(GameManager.getRegisteredGameDefinitionJson).toHaveBeenCalledWith(
      "game1",
    );
  });

  it("starts the game", () => {
    expect(room.startGame()).toBe(true);

    expect(worker.postMessage).toHaveBeenCalledWith({
      type: "START_GAME",
    });
  });

  it("does not start game twice", () => {
    room.startGame();

    expect(room.startGame()).toBe(false);

    expect(worker.postMessage).toHaveBeenCalledTimes(1);
  });

  it("handles player click when game started", () => {
    room.started = true;

    room.handlePlayerClick("PILE", 5);

    expect(worker.postMessage).toHaveBeenCalledWith({
      type: "PLAYER_CLICK",
      label: "PILE",
    });
  });

  it("ignores player click before game starts", () => {
    room.handlePlayerClick("PILE", 5);

    expect(worker.postMessage).not.toHaveBeenCalled();
  });

  it("joins player successfully", async () => {
    const client = {
      identifier: 10,

      inGame: false,

      roomId: null,

      player: null,
    };

    vi.mocked(GameManager.clientFromId).mockReturnValue(client as any);

    const promise = room.handleJoinRoom(10 as any);

    worker.emit("message", {
      type: "PLAYER_JOINED",
      playerId: 99,
    });

    const result = await promise;

    expect(result).toBe(true);

    expect(room.clients[10]).toBe(99);

    expect(client.inGame).toBe(true);

    expect(client.roomId).toBe("room1");

    expect(client.player).toBe(99);
  });

  it("fails joining missing client", async () => {
    vi.mocked(GameManager.clientFromId).mockReturnValue(undefined);

    expect(await room.handleJoinRoom(10 as any)).toBe(false);
  });

  it("cannot join after game starts", async () => {
    room.started = true;

    expect(await room.handleJoinRoom(10 as any)).toBe(false);
  });

  it("emits game state", () => {
    const client = {
      identifier: 5,
    };

    vi.mocked(GameManager.clientFromId).mockReturnValue(client as any);

    room.clients[5] = 20 as any;

    const view = {
      cards: [],
    };

    room.emitGameState([
      {
        playerId: 20,
        view: view as any,
      },
    ]);

    expect(sendClientGamestate).toHaveBeenCalledWith(5, view);
  });

  it("destroys worker", () => {
    room.destroy();

    expect(worker.terminate).toHaveBeenCalled();
  });
});
