// The Client is one distinct actual connection
// The Client vs Player distinction is important
//      A "Player" is in a Game
//      A Client may have an associated player (or not)
//      A Player may be a robot / AI and have no associated client
// Clients have a method of sending information to the user (sockets for prototype, whatever Unity uses for that)

import Game from "../Game/Game.js";
import Player from "../Game/Player.js";
import Room from "../Components/Room.js";
import GameDefinition from "../Rules/GameDefinition.js";
import ClientView from "./ClientView.js";
import { buildGameFromJSON } from "./GameBuilder.js";
import { sendClientGamestate } from "../index.js";
import Auth from "../Components/Auth.js";

/**
 * Client's state of authentication 
 */
type AuthState =
  | {
      isAuthenticated: true;
      displayName: string;
      username: string;
      token: string;
    }
  | {
      isAuthenticated: false;
      displayName: null;
      username: null;
      token: null;
    };


/**
 * Defines the properties of a client.
 * 
 * A Client consists of its id, room associated to (if any), and authState. 
 */
export default class Client {
    static #nextId : number = 1000;
    identifier: number;
    room: Room | null = null;
    private authState: AuthState = {
        isAuthenticated: false,
        displayName: null,
        username: null,
        token: null
    };

    /**
     * Creates a client.
     */
    constructor()  {
        this.identifier = Client.nextId;
    }

    /**
     * 
     * Signs a client into his/her account.
     * 
     * @param username - The client's username.
     * @param password - The clients password.
     * @returns A token if authentication is successful, otherwise null.
     */
    async signIn(username: string, password: string) {
        const success = await Auth.authenticateUser(username, password);
        if (!success) return null;


        this.authState = {
            username: username,
            token: success.token,
            displayName: success.displayName,
            isAuthenticated: true,
        };

        return success.token;
    }

    /**
     * Creates a new account for the client.
     * @param username - The client's username.
     * @param password - The client's password.
     * @param displayName - The clients name which is displayed to other users.
     * @returns If successful it returns a sessionId, otherwise null.
     */
    async signUp(username: string, password: string, displayName: string) {
        const success = await Auth.createNewUser(username, password, displayName);
        if (!success) return null;

        this.authState = {
            username: username,
            token: success,
            displayName: displayName,
            isAuthenticated: true,
        };

        return success;
    }

    /**
     * Signs a client out of his/her account and clears the clients authState.
     * @returns True if sign out is successful, otherwise false.
     */
    async signOut() {
        if (!this.isAuthenticated || !this.authState.token) return false;

        const success = await Auth.signOut(this.authState.token);

        this.authState = {
            isAuthenticated: false,
            displayName: null,
            username: null,
            token: null
        };

        return success;
    }

    /**
     * Submiting the game rules that the client creates.
     * @param rules - JSON containing game information and rules.
     * @returns void, as the resulting game definition isnt used yet.
     * @todo use the game definition somewhere
     */
    submitRulesFromEditor(rules: unknown) {
        try {
            const game: GameDefinition | null = buildGameFromJSON(rules);
            if (game == null) return;

            // TODO: use the game definition somewhere
        } catch (error) {
            console.debug(error);
        }
    }

    /**
     * Send the updated game state to the client.
     * @param game - Current game instance.
     * @param player - The player associated with the client.
     * @todo I expect a reference to "Player" or at least "PlayerID" will be stored in the client class eventually
     */
    updateGamestate(game: Game, player: Player) {
        sendClientGamestate(this.identifier, ClientView.fromGamestate(game, player));
    }

    static get nextId() {
        return Client.#nextId++;
    }

    get rateLimitAllowed() {
        return true; // TODO: Potentially add sign in / sign up rate limiting
    }

    get isAuthenticated() {
        return this.authState.isAuthenticated;
    }

    get displayName() {
        return this.authState.displayName;
    }

    get username() {
        return this.authState.username;
    }
}