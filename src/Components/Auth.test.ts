import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./Database.js", () => ({
  default: {
    getHashByUsername: vi.fn(),
    saveUserCredentials: vi.fn(),
  },
}));

vi.mock("argon2", () => ({
  default: {
    verify: vi.fn(),
    hash: vi.fn(),
    argon2id: "argon2id",
  },
}));

// randomBytes is callback-style in real node:crypto. Mocking it gives control
// over exactly what "random" session tokens come out, and makes it possible
// to force the failure path without touching the OS's actual entropy source.
vi.mock("node:crypto", () => ({
  randomBytes: vi.fn(),
}));

import Auth from "./Auth.js";
import Database from "./Database.js";
import argon2 from "argon2";
import { randomBytes } from "node:crypto";

function mockRandomToken(hex: string) {
  vi.mocked(randomBytes).mockImplementation(((_size: number, cb: any) => {
    cb(null, Buffer.from(hex, "hex"));
  }) as any);
}

function mockRandomBytesFailure() {
  vi.mocked(randomBytes).mockImplementation(((_size: number, cb: any) => {
    cb(new Error("entropy source unavailable"), undefined);
  }) as any);
}

describe("Auth.authenticateUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fails when no account exists for the username", async () => {
    vi.mocked(Database.getHashByUsername).mockResolvedValue(null);

    const result = await Auth.authenticateUser("ghost", "whatever");

    expect(result).toBeNull();
  });

  it("fails when the password hash doesn't match", async () => {
    vi.mocked(Database.getHashByUsername).mockResolvedValue([
      { id: 1, passwordHash: "hash", displayName: "Alice", color: "#ffffff" },
    ]);
    vi.mocked(argon2.verify).mockResolvedValue(false);

    const result = await Auth.authenticateUser("alice", "wrongpassword");

    expect(result).toBeNull();
  });

  it("returns a session token and account info on success", async () => {
    vi.mocked(Database.getHashByUsername).mockResolvedValue([
      { id: 42, passwordHash: "hash", displayName: "Alice", color: "#abcdef" },
    ]);
    vi.mocked(argon2.verify).mockResolvedValue(true);
    mockRandomToken("aa");

    const result = await Auth.authenticateUser("alice", "correctpassword");

    expect(result).toEqual({
      token: "aa",
      displayName: "Alice",
      color: "#abcdef",
      databaseId: 42,
    });
  });

  // Right password, but token generation itself fails. Should still fail
  // clean instead of handing back something broken.
  it("fails if a session token can't be generated even with a correct password", async () => {
    vi.mocked(Database.getHashByUsername).mockResolvedValue([
      { id: 1, passwordHash: "hash", displayName: "Alice", color: "#ffffff" },
    ]);
    vi.mocked(argon2.verify).mockResolvedValue(true);
    mockRandomBytesFailure();

    const result = await Auth.authenticateUser("alice", "correctpassword");

    expect(result).toBeNull();
  });
});

describe("Auth.createNewUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fails if the username is already taken", async () => {
    vi.mocked(Database.getHashByUsername).mockResolvedValue([
      { id: 1, passwordHash: "existing", displayName: "Bob", color: "#ffffff" },
    ]);

    const result = await Auth.createNewUser("bob", "pw", "Bob", "#ffffff");

    expect(result).toBeNull();
    // Should bail out before ever hashing a password for a name that's taken.
    expect(argon2.hash).not.toHaveBeenCalled();
  });

  it("fails if saving the new account to the database fails", async () => {
    vi.mocked(Database.getHashByUsername).mockResolvedValue(null);
    vi.mocked(argon2.hash).mockResolvedValue("hashed-pw" as any);
    vi.mocked(Database.saveUserCredentials).mockResolvedValue(null);

    const result = await Auth.createNewUser("newuser", "pw", "New User", "#ffffff");

    expect(result).toBeNull();
  });

  it("hashes the password and returns a session on success", async () => {
    vi.mocked(Database.getHashByUsername).mockResolvedValue(null);
    vi.mocked(argon2.hash).mockResolvedValue("hashed-pw" as any);
    vi.mocked(Database.saveUserCredentials).mockResolvedValue({
      affectedRows: 1,
      insertId: 7,
      warningStatus: 0,
    });
    mockRandomToken("bb");

    const result = await Auth.createNewUser("newuser", "pw", "New User", "#ffffff");

    expect(argon2.hash).toHaveBeenCalledWith("pw", expect.objectContaining({ type: "argon2id" }));
    expect(Database.saveUserCredentials).toHaveBeenCalledWith("newuser", "hashed-pw", "New User", "#ffffff");
    expect(result).toEqual({ session: "bb", databaseId: 7 });
  });
});

describe("Auth.verifyUser / signOut / signOutEverywhere", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("verifyUser returns null for a token that was never issued", () => {
    expect(Auth.verifyUser("someone", "never-issued-token")).toBeNull();
  });

  it("signs a user in, verifies them, then signs them out", async () => {
    vi.mocked(Database.getHashByUsername).mockResolvedValue([
      { id: 1, passwordHash: "hash", displayName: "Carl", color: "#ffffff" },
    ]);
    vi.mocked(argon2.verify).mockResolvedValue(true);
    mockRandomToken("cc");

    const signInResult = await Auth.authenticateUser("carl", "pw");
    const token = signInResult!.token;

    // token belongs to carl, not some other username
    expect(Auth.verifyUser("carl", token)).toBe(true);
    expect(Auth.verifyUser("someone-else", token)).toBe(false);

    const signedOut = await Auth.signOut(token);
    expect(signedOut).toBe(true);

    // once signed out, the token shouldn't verify anyone anymore
    expect(Auth.verifyUser("carl", token)).toBeNull();
  });

  it("signOut returns false for a token that isn't active", async () => {
    expect(await Auth.signOut("not-a-real-token")).toBe(false);
  });

  it("signOutEverywhere clears every session for a username, but not other users'", async () => {
    vi.mocked(Database.getHashByUsername).mockResolvedValue([
      { id: 1, passwordHash: "hash", displayName: "Dana", color: "#ffffff" },
    ]);
    vi.mocked(argon2.verify).mockResolvedValue(true);

    mockRandomToken("d1");
    await Auth.authenticateUser("dana", "pw");
    mockRandomToken("d2");
    await Auth.authenticateUser("dana", "pw"); // e.g. signed in on a second device

    mockRandomToken("ee");
    await Auth.authenticateUser("erin", "pw"); // unrelated user, should be untouched

    const found = await Auth.signOutEverywhere("dana");

    expect(found).toBe(true);
    expect(Auth.verifyUser("dana", "d1")).toBeNull();
    expect(Auth.verifyUser("dana", "d2")).toBeNull();
    expect(Auth.verifyUser("erin", "ee")).toBe(true);
  });

  it("signOutEverywhere returns false when the username has no active sessions", async () => {
    expect(await Auth.signOutEverywhere("nobody-signed-in")).toBe(false);
  });
});
