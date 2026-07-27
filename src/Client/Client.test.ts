import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../Components/Auth.js", () => ({
  default: {
    authenticateUser: vi.fn(),
    createNewUser: vi.fn(),
    signOut: vi.fn(),
  },
}));

vi.mock("../index.js", () => ({
  sendClientGamestate: vi.fn(),
}));

vi.mock("./ClientView.js", () => ({
  default: {
    fromGamestate: vi.fn(() => ({ cards: [] })),
  },
}));

import Client from "./Client.js";
import Auth from "../Components/Auth.js";
import ClientView from "./ClientView.js";
import { sendClientGamestate } from "../index.js";

describe("Client constructor", () => {
  it("starts unauthenticated with a white default color", () => {
    const client = new Client();

    expect(client.isAuthenticated).toBe(false);
    expect(client.displayName).toBeNull();
    expect(client.username).toBeNull();
    expect(client.databaseId).toBe(0);
    expect(client.color).toBe("#ffffff");
  });

  // Room and GameManager both key off client.identifier, so two clients
  // made back to back can't end up sharing one.
  it("assigns increasing unique ids", () => {
    const a = new Client();
    const b = new Client();

    expect(b.identifier).toBeGreaterThan(a.identifier);
  });
});

describe("Client.signIn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // signIn just delegates to Auth. A rejection there shouldn't leave the
  // client half-authenticated.
  it("returns null and stays unauthenticated when Auth rejects", async () => {
    vi.mocked(Auth.authenticateUser).mockResolvedValue(null);
    const client = new Client();

    const result = await client.signIn("alice", "wrongpass");

    expect(result).toBeNull();
    expect(client.isAuthenticated).toBe(false);
  });

  it("authenticates and adopts the account's info on success", async () => {
    vi.mocked(Auth.authenticateUser).mockResolvedValue({
      token: "tok-123",
      displayName: "Alice",
      color: "#abcdef",
      databaseId: 7,
    });
    const client = new Client();

    const result = await client.signIn("alice", "correctpass");

    expect(result).toBe("tok-123");
    expect(client.isAuthenticated).toBe(true);
    expect(client.displayName).toBe("Alice");
    expect(client.username).toBe("alice");
    expect(client.databaseId).toBe(7);
    // color comes from the account, not the client's own randomColor()
    expect(client.color).toBe("#abcdef");
  });
});

describe("Client.signUp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Same idea as the signIn failure test above.
  it("returns null when Auth.createNewUser fails (e.g. username taken)", async () => {
    vi.mocked(Auth.createNewUser).mockResolvedValue(null);
    const client = new Client();

    const result = await client.signUp("bob", "pw", "Bob");

    expect(result).toBeNull();
    expect(client.isAuthenticated).toBe(false);
  });

  it("signs the client in immediately after a successful sign up", async () => {
    vi.mocked(Auth.createNewUser).mockResolvedValue({ session: "sess-1", databaseId: 9 });
    const client = new Client();

    const result = await client.signUp("bob", "pw", "Bob");

    expect(result).toEqual({ session: "sess-1", databaseId: 9 });
    expect(client.isAuthenticated).toBe(true);
    expect(client.username).toBe("bob");
    expect(client.displayName).toBe("Bob");
    // color should be *some* hex string from randomColor(), not left at the default
    expect(client.color).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

describe("Client.signOut", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns false if the client was never signed in", async () => {
    const client = new Client();

    expect(await client.signOut()).toBe(false);
  });

  // signIn first so there's an actual token to sign out of, instead of
  // calling signOut cold.
  it("clears authState and returns true on success", async () => {
    vi.mocked(Auth.authenticateUser).mockResolvedValue({
      token: "tok-123",
      displayName: "Alice",
      color: "#abcdef",
      databaseId: 7,
    });
    vi.mocked(Auth.signOut).mockResolvedValue(true);

    const client = new Client();
    await client.signIn("alice", "pw");

    const result = await client.signOut();

    expect(result).toBe(true);
    expect(client.isAuthenticated).toBe(false);
    expect(client.username).toBeNull();
  });
});

describe("Client.updateGamestate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // A spectator/lobby client with no player assigned yet shouldn't trigger
  // a lookup at all.
  it("does nothing if the client has no player yet", () => {
    const client = new Client();
    const game = { getPlayer: vi.fn() } as any;

    client.updateGamestate(game);

    expect(game.getPlayer).not.toHaveBeenCalled();
    expect(sendClientGamestate).not.toHaveBeenCalled();
  });

  // client.player is set here, but the game no longer recognizes that id
  // (say, they got removed). Should quietly no-op rather than throw.
  it("does nothing if the game has no matching player", () => {
    const client = new Client();
    client.player = 5;
    const game = { getPlayer: vi.fn(() => undefined) } as any;

    client.updateGamestate(game);

    expect(sendClientGamestate).not.toHaveBeenCalled();
  });

  it("sends the client's view once a matching player is found", () => {
    const client = new Client();
    client.player = 5;
    const fakePlayer = { id: 5 };
    const game = { getPlayer: vi.fn(() => fakePlayer) } as any;

    client.updateGamestate(game);

    expect(ClientView.fromGamestate).toHaveBeenCalledWith(game, fakePlayer);
    expect(sendClientGamestate).toHaveBeenCalledWith(client.identifier, { cards: [] });
  });
});

describe("Client.updateDisplayName", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates the display name for a signed-in client", async () => {
    vi.mocked(Auth.authenticateUser).mockResolvedValue({
      token: "tok-123",
      displayName: "Alice",
      color: "#abcdef",
      databaseId: 7,
    });

    const client = new Client();
    await client.signIn("alice", "pw");

    client.updateDisplayName("New Name");

    expect(client.displayName).toBe("New Name");
  });
});
