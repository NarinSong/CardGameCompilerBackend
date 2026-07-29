import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockConn, mockPool } = vi.hoisted(() => {
  const mockConn = {
    query: vi.fn(),
    release: vi.fn(),
  };

  const mockPool = {
    getConnection: vi.fn(() => Promise.resolve(mockConn)),
  };

  return { mockConn, mockPool };
});

// Database.ts opens a real connection pool the moment it's imported, so
// mariadb has to be mocked before that import happens. Same deal as mocking
// node:worker_threads in Room.test.ts/RoomWorker.test.ts.
vi.mock("mariadb", () => ({
  createPool: vi.fn(() => mockPool),
}));

vi.mock("dotenv", () => ({
  config: vi.fn(),
}));

import Database from "./Database.js";

beforeEach(() => {
  vi.clearAllMocks();
  mockPool.getConnection.mockResolvedValue(mockConn as any);
});

describe("Database.getHashByUsername", () => {
  it("returns the row array on success and releases the connection", async () => {
    mockConn.query.mockResolvedValue([
      { id: 1, passwordHash: "hash", displayName: "Alice", color: "#ffffff" },
    ]);

    const result = await Database.getHashByUsername("alice");

    expect(result).toEqual([{ id: 1, passwordHash: "hash", displayName: "Alice", color: "#ffffff" }]);
    expect(mockConn.release).toHaveBeenCalled();
  });

  it("returns null if the query throws", async () => {
    mockConn.query.mockRejectedValue(new Error("connection lost"));

    const result = await Database.getHashByUsername("alice");

    expect(result).toBeNull();
    expect(mockConn.release).toHaveBeenCalled();
  });

  // Flagging this, not endorsing it. The zod .parse() call is supposed to
  // validate what came back from the DB, but "password" is already assigned
  // from conn.query() a line earlier. So even when parse() throws and gets
  // caught below, the function hands back that same malformed data anyway
  // instead of null.
  it("currently returns malformed rows anyway if they fail schema validation", async () => {
    const malformedRow = { id: "not-a-number", passwordHash: "hash" }; // missing displayName/color
    mockConn.query.mockResolvedValue([malformedRow]);

    const result = await Database.getHashByUsername("alice");

    expect(result).toEqual([malformedRow]);
  });
});

describe("Database.saveUserCredentials", () => {
  // Looks like leftover local-testing scaffolding. Worth flagging: username
  // "test" never touches the database at all, and always reports
  // insertId: 2 - which could collide with a real row that happens to have
  // that id.
  it("short-circuits for username 'test' without touching the database", async () => {
    const result = await Database.saveUserCredentials("test", "hash", "Test User", "#ffffff");

    expect(result).toEqual({ affectedRows: 1, insertId: 2, warningStatus: 0 });
    expect(mockPool.getConnection).not.toHaveBeenCalled();
  });

  it("returns the insert result on success", async () => {
    mockConn.query.mockResolvedValue({ affectedRows: 1, insertId: 5, warningStatus: 0 });

    const result = await Database.saveUserCredentials("newuser", "hash", "New User", "#ffffff");

    expect(result).toEqual({ affectedRows: 1, insertId: 5, warningStatus: 0 });
  });

  it("returns null if the insert fails", async () => {
    mockConn.query.mockRejectedValue(new Error("duplicate key"));

    const result = await Database.saveUserCredentials("newuser", "hash", "New User", "#ffffff");

    expect(result).toBeNull();
  });
});

describe("Database's simple 'update one column' methods", () => {
  // saveUserColor/saveUserDisplayName/saveUserDescription/saveUserProfilePicture
  // all follow the exact same true/false pattern, so covering them together
  // instead of four nearly-identical describe blocks.
  const cases: [string, () => Promise<boolean>][] = [
    ["saveUserColor", () => Database.saveUserColor("alice", "#123456")],
    ["saveUserDisplayName", () => Database.saveUserDisplayName("alice", "Alice2")],
    ["saveUserDescription", () => Database.saveUserDescription("alice", "hello")],
    ["saveUserProfilePicture", () => Database.saveUserProfilePicture("alice", "http://example.com/a.png")],
  ];

  for (const [name, call] of cases) {
    it(`${name} returns true on success`, async () => {
      mockConn.query.mockResolvedValue({ affectedRows: 1 });

      expect(await call()).toBe(true);
    });

    it(`${name} returns false if the query throws`, async () => {
      mockConn.query.mockRejectedValue(new Error("db down"));

      expect(await call()).toBe(false);
    });
  }
});

describe("Database.saveGameEditorBlocks", () => {
  const game: any = {
    gameMeta: { name: "MyGame", description: "desc", private: true },
  };

  it("returns the new id on success", async () => {
    mockConn.query.mockResolvedValue({ affectedRows: 1, insertId: 11, warningStatus: 0 });

    const result = await Database.saveGameEditorBlocks(9, game);

    expect(result).toBe(11);
  });

  it("returns null if the insert fails", async () => {
    mockConn.query.mockRejectedValue(new Error("db down"));

    const result = await Database.saveGameEditorBlocks(9, game);

    expect(result).toBeNull();
  });

  // This INSERT was missing its VALUES (...) clause. 6 columns declared, 6
  // params passed in, nowhere for them to go - invalid SQL that would've
  // failed against a real database every time. Fixed alongside adding this
  // test; matches the pattern saveGameJson below already uses correctly.
  it("includes a VALUES clause matching its 6 params", async () => {
    mockConn.query.mockResolvedValue({ affectedRows: 1, insertId: 11, warningStatus: 0 });

    await Database.saveGameEditorBlocks(9, game);

    const [sql, params] = mockConn.query.mock.calls[0]!;
    expect(sql).toContain("VALUES");
    expect(params).toHaveLength(6);
  });
});

describe("Database.updateGameEditorBlocks", () => {
  const game: any = {
    gameMeta: { name: "MyGame", description: "desc", private: true },
  };

  it("returns the update result on success", async () => {
    mockConn.query.mockResolvedValue({ affectedRows: 1, warningStatus: 0 });

    const result = await Database.updateGameEditorBlocks(3, game);

    expect(result).toEqual({ affectedRows: 1, warningStatus: 0 });
  });

  it("returns null if the update fails", async () => {
    mockConn.query.mockRejectedValue(new Error("db down"));

    const result = await Database.updateGameEditorBlocks(3, game);

    expect(result).toBeNull();
  });
});

describe("Database's 'get saved editor blocks' methods", () => {
  it("getSavedEditorBlocksById returns rows on success", async () => {
    mockConn.query.mockResolvedValue([{ creator: 4 }]);

    expect(await Database.getSavedEditorBlocksById(1)).toEqual([{ creator: 4 }]);
  });

  it("getSavedEditorBlocksById returns null if the query fails", async () => {
    mockConn.query.mockRejectedValue(new Error("db down"));

    expect(await Database.getSavedEditorBlocksById(1)).toBeNull();
  });

  it("getFullSavedEditorBlocksById returns rows on success", async () => {
    mockConn.query.mockResolvedValue([{ blockeditorstate: "{}", creator: 4 }]);

    expect(await Database.getFullSavedEditorBlocksById(1)).toEqual([{ blockeditorstate: "{}", creator: 4 }]);
  });

  it("getAllGameEditorBlocks returns rows on success", async () => {
    mockConn.query.mockResolvedValue([{ gamename: "G", creator: 1, parent: 0, id: 1, privateGame: 0 }]);

    const result = await Database.getAllGameEditorBlocks();

    expect(result).toEqual([{ gamename: "G", creator: 1, parent: 0, id: 1, privateGame: 0 }]);
  });

  it("getAllGameEditorBlocks returns null if the query fails", async () => {
    mockConn.query.mockRejectedValue(new Error("db down"));

    expect(await Database.getAllGameEditorBlocks()).toBeNull();
  });
});

describe("Database.saveGameJson", () => {
  const game: any = {
    gameMeta: { id: 1, name: "MyGame", description: "desc", private: true },
  };

  it("includes a real VALUES clause matching its 7 params (unlike saveGameEditorBlocks)", async () => {
    mockConn.query.mockResolvedValue({ affectedRows: 1, insertId: 1, warningStatus: 0 });

    await Database.saveGameJson(9, game);

    const [sql, params] = mockConn.query.mock.calls[0]!;
    expect(sql).toContain("VALUES");
    expect(params).toHaveLength(7);
  });

  it("returns null if the insert fails", async () => {
    mockConn.query.mockRejectedValue(new Error("db down"));

    expect(await Database.saveGameJson(9, game)).toBeNull();
  });
});

describe("Database.getGameFromId / getGamesList", () => {
  it("getGameFromId returns the row on success", async () => {
    mockConn.query.mockResolvedValue([{ gameRules: "{}" }]);

    expect(await Database.getGameFromId(1)).toEqual([{ gameRules: "{}" }]);
  });

  it("getGameFromId returns null if the query fails", async () => {
    mockConn.query.mockRejectedValue(new Error("db down"));

    expect(await Database.getGameFromId(1)).toBeNull();
  });

  it("getGamesList returns the list on success", async () => {
    mockConn.query.mockResolvedValue([{ name: "Poker", id: 1 }]);

    expect(await Database.getGamesList()).toEqual([{ name: "Poker", id: 1 }]);
  });

  it("getGamesList returns null if the query fails", async () => {
    mockConn.query.mockRejectedValue(new Error("db down"));

    expect(await Database.getGamesList()).toBeNull();
  });
});
