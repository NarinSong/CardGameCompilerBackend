import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../index.js", () => ({
  sendLobbyClosed: vi.fn(),
  sendLobbyStatus: vi.fn(),
}));

import Lobby from "./Lobby.js";
import GameManager from "../GameManager.js";

describe("Lobby", () => {
  beforeEach(() => {
    // reset global state between tests
    GameManager.clients = {};
    GameManager.lobbies = {};
    GameManager.rooms = {};
  });

  function createMockClient(id: number, username: string) {
    return {
      identifier: id,
      username,
      displayName: username + " Display",
      // Client.color is always a hex string (see Client.ts), never a named color
      color: "#ff0000",

      isAuthenticated: true,

      inLobby: false,
      lobby: null,

      inGame: false,
      roomId: null,
    } as any;
  }

  it("creates a random join code", () => {
    const code = Lobby.createRandomJoinCode();

    expect(code).toBeDefined();
    expect(code.length).toBe(6);
  });

  it("creates a lobby with a host", () => {
    const host = createMockClient(1, "host");

    GameManager.clients[host.identifier] = host;

    const code = Lobby.createRandomJoinCode();

    const lobby = new Lobby(host, code);

    expect(lobby.joinCode).toBe(code);
    expect(lobby.host).toBe(host.identifier);
    expect(lobby.hostName).toBe("host");

    expect(host.inLobby).toBe(true);
    expect(host.lobby).toBe(code);
  });

  it("allows a player to join the lobby", () => {
    const host = createMockClient(1, "host");
    const player = createMockClient(2, "player");

    GameManager.clients[host.identifier] = host;
    GameManager.clients[player.identifier] = player;

    const lobby = new Lobby(host, Lobby.createRandomJoinCode());

    const result = lobby.joinGame(player);

    expect(result).toBe(true);
    expect(player.inLobby).toBe(true);
    expect(player.lobby).toBe(lobby.joinCode);
  });

  it("removes a player from the lobby", () => {
    const host = createMockClient(1, "host");
    const player = createMockClient(2, "player");

    GameManager.clients[host.identifier] = host;
    GameManager.clients[player.identifier] = player;

    const lobby = new Lobby(host, Lobby.createRandomJoinCode());

    lobby.joinGame(player);

    lobby.removeFromLobbyById(player.identifier);

    expect(player.inLobby).toBe(false);
    expect(player.lobby).toBe(null);
  });

  // These two were marked "NEEDS TESTING" right in the source - nobody had
  // gotten around to it yet, so adding coverage here instead of just noting it.

  it("promotes another player to host when the host leaves", () => {
    const host = createMockClient(1, "host");
    const player = createMockClient(2, "player");

    GameManager.clients[host.identifier] = host;
    GameManager.clients[player.identifier] = player;

    const lobby = new Lobby(host, Lobby.createRandomJoinCode());
    lobby.joinGame(player);

    lobby.removeFromLobbyById(host.identifier);

    expect(lobby.host).toBe(player.identifier);
    expect(lobby.hostName).toBe("player");
  });

  it("deletes the lobby once the last player leaves", () => {
    const host = createMockClient(1, "host");
    GameManager.clients[host.identifier] = host;

    const lobby = new Lobby(host, Lobby.createRandomJoinCode());
    const deleteSpy = vi.spyOn(GameManager, "deleteLobby");

    lobby.removeFromLobbyById(host.identifier);

    expect(deleteSpy).toHaveBeenCalledWith(lobby.joinCode);
  });

  it("removeFromLobby finds a player by username and removes them", () => {
    const host = createMockClient(1, "host");
    const player = createMockClient(2, "player");

    GameManager.clients[host.identifier] = host;
    GameManager.clients[player.identifier] = player;

    const lobby = new Lobby(host, Lobby.createRandomJoinCode());
    lobby.joinGame(player);

    const result = lobby.removeFromLobby("player");

    expect(result).toBe(true);
    expect(player.inLobby).toBe(false);
  });

  it("removeFromLobby returns false for a username that isn't in the lobby", () => {
    const host = createMockClient(1, "host");
    GameManager.clients[host.identifier] = host;

    const lobby = new Lobby(host, Lobby.createRandomJoinCode());

    expect(lobby.removeFromLobby("nobody")).toBe(false);
  });
});
