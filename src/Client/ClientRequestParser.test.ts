import { describe, it, expect, vi, beforeEach } from "vitest";
import {
    clientRequestPing,
    clientRequestGetAvailableGames,
    clientRequestGetAvailableBlocks,
    clientRequestSignOut,
    clientRequestSignUp,
    clientRequestSignIn,
} from "./ClientRequestParser.js";
import GameManager from "../GameManager.js";
import { execPath } from "node:process";

vi.mock("../GameManager.js", () => ({
    default: {
        clientFromId: vi.fn(),
    }
}));

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
});

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

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

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

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

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
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
    
    it("calls callback(null) if client.displayName is null", async () => {
        const fakeClient = makeFakeClient({isAuthenticated: false, displayName: null});
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);


        const callback = vi.fn();
        await clientRequestSignIn(1, "dadawdawasdwadaw", "dadawdawasdwadaw", callback);

        expect(callback).toHaveBeenCalledWith(null);
    });

    it("calls callback(success) when sign in succeeds", async () => {
        const fakeClient = makeFakeClient({isAuthenticated: false, signIn: vi.fn().mockResolvedValue("success")});
        vi.mocked(GameManager.clientFromId).mockReturnValue(fakeClient as any);


        const callback = vi.fn();
        await clientRequestSignIn(1, "dadawdawasdwadaw", "dadawdawasdwadaw", callback);

        expect(callback).toHaveBeenCalledWith("success", "TestUser");
    });
});

// Didnt continue after signout