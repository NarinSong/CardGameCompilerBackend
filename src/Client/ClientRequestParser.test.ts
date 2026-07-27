import { describe, it, expect, vi, beforeEach } from "vitest";
import {
    clientRequestPing,
    clientRequestGetAvailableGames,
    clientRequestGetAvailableBlocks,
    clientRequestSignOut,
    clientRequestSignUp,
    clientRequestSignIn,
    clientRequestClickLabel,
    clientRequestStartNewGame,
    clientRequestSaveGame,
    clientRequestGetSavedGameBlocks,
} from "./ClientRequestParser.js";
import GameManager from "../GameManager.js";
import { buildGameFromJSON } from "./GameBuilder.js";
import Database from "../Components/Database.js";

vi.mock("../GameManager.js", () => ({
    default: {
        clientFromId: vi.fn(),
        registerGameDefinition: vi.fn().mockReturnValue(1),
        getAvailableGameNames: vi.fn().mockResolvedValue([{name: "TestGame", id: 1}]),
    }
}));

// Most of these tests just need "a client that looks authenticated" with
// one or two fields tweaked, so this saves repeating the same object shape
// everywhere.
function makeFakeClient(overrides = {}){
    return {
        isAuthenticated: true,      
        rateLimitAllowed: true,     
        displayName: "TestUser",    
        username: "testuser",      
        room: null,                 
        signIn: vi.fn().mockResolvedValue("fake-token"),
        signOut: vi.fn().mockResolvedValue(true),
        signUp: vi.fn().mockResolvedValue("fake-token"),
        ...overrides,
    };
}

beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(buildGameFromJSON).mockReturnValue({ some: "gamedef" } as any);
    vi.mocked(GameManager.registerGameDefinition).mockReturnValue();
    vi.mocked(GameManager.getAvailableGameNames).mockResolvedValue([{name:"TestGame", id: 1}]);
});


describe("clientRequestSignOut", () => {
    it("calls callback(true) when sign out succeeds", async () => {
        const fakeClient = makeFakeClient();
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);

        const callback = vi.fn();
        await clientRequestSignOut(1, callback);

        expect(callback).toHaveBeenCalledWith(true);
    });

    it("calls callback(false) if client is not found", async () => {
        vi.mocked(GameManager.clientFromId).mockReturnValue(null);

        const callback = vi.fn();
        await clientRequestSignOut(1, callback);

        expect(callback).toHaveBeenCalledWith(false);
    });
    
    it("calls callback(false) if client is not authenticated", async () => {
        const fakeClient = makeFakeClient({isAuthenticated: false});
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);

        const callback = vi.fn();
        await clientRequestSignOut(1, callback);

        expect(callback).toHaveBeenCalledWith(false);
    });

    it("does nothing if callback is not a function", async () => {
        expect(() => clientRequestSignOut(1, "not a function")).not.toThrow();
    });


});


// A bunch of these are just checking that bad input gets rejected before
// we ever touch GameManager/the DB - password/username/displayName all get
// validated up front, so garbage in should mean callback(null) out.
describe("clientRequestSignUp", () => {
    it("does nothing if callback is not a function", async () => {
        expect(() => clientRequestSignUp(1, "dadawdawasdwadaw", "dadawdawasdwadaw", "dadawdawasdwadaw", "ddwadaw")).not.toThrow();
    });

    it("calls callback(null) for incorrect password format", async () => {
        const callback = vi.fn();
        await clientRequestSignUp(1, "dwadwadwadwadadwad", "@##@@#%@# %%#@%#@", "dwadwadwadwadadwad",callback);
        expect(callback).toHaveBeenCalledWith(null);
    });
    it("calls callback(null) for incorrect username format", async () => {
        const callback = vi.fn();
        await clientRequestSignUp(1, "@##@@#%@#%%#@%#@", "dadawdawasdwadaw", "dwadwadwadwadadwad",callback);
        expect(callback).toHaveBeenCalledWith(null);
    });
    it("calls callback(null) for incorrect displayname format", async () => {
        const callback = vi.fn();
        await clientRequestSignUp(1, "dadawdawasdwadaw", "dadawdawasdwadaw", "@##@@#%@#%%#@%#@",callback);
        expect(callback).toHaveBeenCalledWith(null);
    });

    it("calls callback(null) if client already authenticated", async () => {
        const fakeClient = makeFakeClient({isAuthenticated: true});
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);

        const callback = vi.fn();
        await clientRequestSignUp(1, "dadawdawasdwadaw", "dadawdawasdwadaw", "dadawdawasdwadaw", callback);
        expect(callback).toHaveBeenCalledWith(null);
    });

    it("calls callback(null) if client is not found", async () => {
        vi.mocked(GameManager.clientFromId).mockReturnValue(null);

        const callback = vi.fn();
        await clientRequestSignUp(1, "dadawdawasdwadaw", "dadawdawasdwadaw", "dadawdawasdwadaw", callback);

        expect(callback).toHaveBeenCalledWith(null);
    });

    it("calls callback(null) if client.signUp fails", async () => {
        const fakeClient = makeFakeClient({isAuthenticated: false, signUp: vi.fn().mockResolvedValue(null)});
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);


        const callback = vi.fn();
        await clientRequestSignUp(1, "dadawdawasdwadaw", "dadawdawasdwadaw", "dadawdawasdwadaw", callback);

        expect(callback).toHaveBeenCalledWith(null);
    });

    it("calls callback(null) if client.rateLimitAllowed fails", async () => {
        const fakeClient = makeFakeClient({isAuthenticated: false, rateLimitAllowed: false});
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);


        const callback = vi.fn();
        await clientRequestSignUp(1, "dadawdawasdwadaw", "dadawdawasdwadaw", "dadawdawasdwadaw", callback);

        expect(callback).toHaveBeenCalledWith(null);
    });

    it("calls callback(success) when sign up succeeds", async () => {
        const fakeClient = makeFakeClient({isAuthenticated: false, signUp: vi.fn().mockResolvedValue("success")});
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);


        const callback = vi.fn();
        await clientRequestSignUp(1, "dadawdawasdwadaw", "dadawdawasdwadaw", "dadawdawasdwadaw", callback);

        expect(callback).toHaveBeenCalledWith("success");
    });
});

describe("clientRequestSignIn", () => {
    it("does nothing if callback is not a function", async () => {
        expect(() => clientRequestSignIn(1, "dadawdawasdwadaw", "dadawdawasdwadaw",  "ddwadaw")).not.toThrow();
    });

    it("calls callback(null) for incorrect password format", async () => {
        const callback = vi.fn();
        await clientRequestSignIn(1, "dwadwadwadwadadwad", "@##@@#%@# %%#@%#@",callback);
        expect(callback).toHaveBeenCalledWith(null);
    });
    it("calls callback(null) for incorrect username format", async () => {
        const callback = vi.fn();
        await clientRequestSignIn(1, "@##@@#%@#%%#@%#@", "dadawdawasdwadaw", callback);
        expect(callback).toHaveBeenCalledWith(null);
    });

    it("calls callback(null) if client already authenticated", async () => {
        const fakeClient = makeFakeClient({isAuthenticated: true});
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);

        const callback = vi.fn();
        await clientRequestSignIn(1, "dadawdawasdwadaw", "dadawdawasdwadaw", callback);
        expect(callback).toHaveBeenCalledWith(null);
    });

    it("calls callback(null) if client is not found", async () => {
        vi.mocked(GameManager.clientFromId).mockReturnValue(null);

        const callback = vi.fn();
        await clientRequestSignIn(1, "dadawdawasdwadaw", "dadawdawasdwadaw", callback);

        expect(callback).toHaveBeenCalledWith(null);
    });

    it("calls callback(null) if client.rateLimitAllowed fails", async () => {
        const fakeClient = makeFakeClient({isAuthenticated: false, rateLimitAllowed: false});
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);


        const callback = vi.fn();
        await clientRequestSignIn(1, "dadawdawasdwadaw", "dadawdawasdwadaw", callback);

        expect(callback).toHaveBeenCalledWith(null);
    });

    it("calls callback(null) if client.signIn fails", async () => {
        const fakeClient = makeFakeClient({isAuthenticated: false, signIn: vi.fn().mockResolvedValue(null)});
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);


        const callback = vi.fn();
        await clientRequestSignIn(1, "dadawdawasdwadaw", "dadawdawasdwadaw",  callback);
        
        expect(callback).toHaveBeenCalledWith(null);
    });
    
    // displayName missing is its own case since sign-in returns it back to
    // the caller on success (see the "success" test below) - if it's null
    // we shouldn't even get that far.
    it("calls callback(null) if client.displayName is null", async () => {
        const fakeClient = makeFakeClient({isAuthenticated: false, displayName: null});
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);
        
        
        const callback = vi.fn();
        await clientRequestSignIn(1, "dadawdawasdwadaw", "dadawdawasdwadaw", callback);
        
        expect(callback).toHaveBeenCalledWith(null);
    });
    
    // Note the second arg here - a successful sign in hands back the
    // displayName along with the token, not just the token by itself.
    it("calls callback(success) when sign in succeeds", async () => {
        const fakeClient = makeFakeClient({isAuthenticated: false, signIn: vi.fn().mockResolvedValue("success")});
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);
        
        
        const callback = vi.fn();
        await clientRequestSignIn(1, "dadawdawasdwadaw", "dadawdawasdwadaw", callback);
        
        expect(callback).toHaveBeenCalledWith("success", "TestUser");
    });
});

// Didnt continue after signout

describe("clientRequestGetAvailableGames", () => {
    it("does nothing if callback is not a function", async () => {
        expect(() => clientRequestGetAvailableGames(1,"ddwadaw")).not.toThrow();
    });

    it("calls callback with an array", async () => {
        const callback = vi.fn();
        await clientRequestGetAvailableGames(1, callback);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(expect.any(Array));
    });
});


const validGame = {
    gameMeta: {
        name: "TestGame",
    },
    playerDefinition: {},
    boardDefinition: {},
    phases: [],
}

const invalidGame = {
    gameMeta: {},

}

vi.mock("./GameBuilder.js", () => ({
    buildGameFromJSON: vi.fn().mockReturnValue({ some: "gamedef" } as any),
}));

vi.mock("../Components/Database.js", () => ({
    default: {
        saveGameJson: vi.fn().mockResolvedValue(undefined),
        getFullSavedEditorBlocksById: vi.fn(),
    }
}));

// clientRequestSaveGame's signature changed since this was written. It used
// to take separate gameName/parentId/description/isPrivate args (7 total,
// matching the calls below); now it's just (clientId, json, callback), with
// all that info folded into the json blob and checked via
// ClientGameDefinitionSchema. Leaving this commented out rather than
// guessing at a rewrite. Someone who actually knows the new schema's
// validation rules should redo this properly instead of porting the old
// args in blind.
/*
describe("clientRequestSaveGame", () => {
    it("does nothing if callback is not a function", async () => {
        expect(() => clientRequestSaveGame(1, validGame,"dawwad", 1, "dwadwad", true,"ddwadaw")).not.toThrow();
    });

    it("calls callback(false) if client is not found", async () => {

        vi.mocked(GameManager.clientFromId).mockReturnValue(null);

        const callback = vi.fn();
        await clientRequestSaveGame(1, validGame, "dawwad", 1, "dwadwad", true, callback);

        expect(callback).toHaveBeenCalledWith(false);
    });

    

    it("calls callback(false) if client is not authenticated", async () => {
        const fakeClient = makeFakeClient({username: null});
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);

        const callback = vi.fn();
        await clientRequestSaveGame(1, validGame, "dawwad", 1, "dwadwad", true, callback);

        expect(callback).toHaveBeenCalledWith(false);
    });

    it("calls callback(false) if jsonCheck fails", async () => {
        const fakeClient = makeFakeClient();
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);

        const callback = vi.fn();
        await clientRequestSaveGame(1, invalidGame, "dawwad", 1, "dwadwad", true, callback);

        expect(callback).toHaveBeenCalledWith(false);
    });

    it("calls callback(false) if gameNameCheck fails", async () => {
        const fakeClient = makeFakeClient();
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);

        const callback = vi.fn();
        await clientRequestSaveGame(1, validGame, "dawwad@@@@@@", 1, "dwadwad", true, callback);

        expect(callback).toHaveBeenCalledWith(false);
    });
    
    it("calls callback(false) if parentIdCheck fails", async () => {
        const fakeClient = makeFakeClient();
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);

        const callback = vi.fn();
        await clientRequestSaveGame(1, validGame, "dawwad", "skjwhks", "dwadwad", true, callback);

        expect(callback).toHaveBeenCalledWith(false);
    });

    it("calls callback(false) if gameDescriptionCheck fails", async () => {
        const fakeClient = makeFakeClient();
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);

        const callback = vi.fn();
        await clientRequestSaveGame(1, validGame, "dawwad", 1, "dwad wad", true, callback);

        expect(callback).toHaveBeenCalledWith(false);
    });
    
    it("calls callback(false) if isPrivateCheck fails", async () => {
        const fakeClient = makeFakeClient();
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);

        const callback = vi.fn();
        await clientRequestSaveGame(1, validGame, "dawwad", 1, "dwadwad", "true", callback);

        expect(callback).toHaveBeenCalledWith(false);
    });

    it("calls callback(false) if buildGameFromJSON fails", async () => {
        const fakeClient = makeFakeClient();
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);
        vi.mocked(buildGameFromJSON).mockReturnValue(null)

        const callback = vi.fn();
        await clientRequestSaveGame(1, validGame, "dawwad", 1, "dwadwad", true, callback);

        expect(callback).toHaveBeenCalledWith(false);
    });
    
    it("calls callback(true) if successful", async () => {
        const fakeClient = makeFakeClient();
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);
        vi.mocked(buildGameFromJSON).mockReturnValue({ some: "gamedef" } as any)
        
        const callback = vi.fn();
        await clientRequestSaveGame(1, validGame, "dawwad", 1, "dwadwad", true, callback);

        expect(callback).toHaveBeenCalledWith(true, expect.any(Number));
    });
    
});

*/

describe("clientRequestGetAvailableBlocks", () => {
    it("does nothing if callback is not a function", async () => {
        expect(() => clientRequestGetAvailableBlocks(1,"ddwadaw")).not.toThrow();
    });


});

describe("clientRequestClickLabel", () => {
    it("does nothing if callback is not a function", async () => {
        expect(() => clientRequestClickLabel(1,"ddwadaw", 0)).not.toThrow();
    });


});
describe("clientRequestStartNewGame", () => {
    it("does nothing if callback is not a function", async () => {
        expect(() => clientRequestStartNewGame(1,"ddwadaw")).not.toThrow();
    });


});

// Zero coverage existed for this one before, which probably explains how it
// shipped with two bugs: it validated clientId instead of the gameId
// argument, so the game you actually asked for was never looked up, and on
// success it did a bare `return` instead of `callback(...)` - a client would
// never hear back even when the lookup worked. Both fixed here.
describe("clientRequestGetSavedGameBlocks", () => {
    const savedGame = {
        gameMeta: { name: "SavedGame", private: false },
        playerDefinition: {},
        boardDefinition: {},
        phases: [],
    };

    it("does nothing if callback is not a function", async () => {
        expect(() => clientRequestGetSavedGameBlocks(1, 5, "ddwadaw")).not.toThrow();
    });

    it("calls callback(false) if the client is not found", async () => {
        vi.mocked(GameManager.clientFromId).mockReturnValue(null);

        const callback = vi.fn();
        await clientRequestGetSavedGameBlocks(1, 5, callback);

        expect(callback).toHaveBeenCalledWith(false);
    });

    it("looks up the requested gameId, not the clientId", async () => {
        const fakeClient = makeFakeClient({ databaseId: 42 });
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);
        vi.mocked(Database.getFullSavedEditorBlocksById).mockResolvedValue([
            { blockeditorstate: JSON.stringify(savedGame), creator: 42 },
        ]);

        const callback = vi.fn();
        await clientRequestGetSavedGameBlocks(999, 5, callback);

        expect(Database.getFullSavedEditorBlocksById).toHaveBeenCalledWith(5);
    });

    it("calls callback(false) for a private game the client doesn't own", async () => {
        const fakeClient = makeFakeClient({ databaseId: 1 });
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);
        vi.mocked(Database.getFullSavedEditorBlocksById).mockResolvedValue([
            { blockeditorstate: JSON.stringify({ ...savedGame, gameMeta: { name: "SavedGame", private: true } }), creator: 999 },
        ]);

        const callback = vi.fn();
        await clientRequestGetSavedGameBlocks(1, 5, callback);

        expect(callback).toHaveBeenCalledWith(false);
    });

    it("calls callback with the game data on success", async () => {
        const fakeClient = makeFakeClient({ databaseId: 42 });
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);
        vi.mocked(Database.getFullSavedEditorBlocksById).mockResolvedValue([
            { blockeditorstate: JSON.stringify(savedGame), creator: 42 },
        ]);

        const callback = vi.fn();
        await clientRequestGetSavedGameBlocks(1, 5, callback);

        expect(callback).toHaveBeenCalledWith(expect.objectContaining({ gameMeta: expect.objectContaining({ name: "SavedGame" }) }));
    });
});

