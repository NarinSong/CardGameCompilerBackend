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
import { PlayerID } from "../schemas/types.js";

/**
 * Client's state of authentication.
 * 
 * When authenticated, holds the username, display name, session token, and database id.
 * When unauthenticated, all fields are null or 0.
 */
type AuthState =
  | {
      isAuthenticated: true;
      displayName: string;
      username: string;
      token: string;
      databaseId: number;
    }
  | {
      isAuthenticated: false;
      displayName: null;
      username: null;
      token: null;
      databaseId: 0;
    };


/**
 * Defines the properties of a client.
 * 
 * A Client consists of its identifier, auth state, lobby and room membership,
 * player id (if in a game), and display color.
 */
export default class Client {
    static #nextId : number = 1000;
    identifier: number;
    roomId: string | null = null;
    lobby: string | null = null;
    inLobby: boolean = false;
    inGame: boolean = false;
    player: PlayerID | null = null;
    color: string = "#ffffff";

    private authState: AuthState = {
        isAuthenticated: false,
        displayName: null,
        username: null,
        token: null,
        databaseId: 0,
    };

    /**
     * Creates a client.
     */
    constructor()  {
        this.identifier = Client.nextId;
    }

    /**
     * Returns a random pastel color hex string.
     * @returns A randomly selected hex color string.
     */
    randomColor() {
        let colors = [
            '#ffcccc',
            '#ffd9cc',
            '#ffe5cc',
            '#fff2cc',
            '#e6ffcc',
            '#d9ffcc',
            '#ccfff2',
            '#ccf2ff',
            '#cce5ff',
            '#d9ccff',
            '#e6ccff',
            '#ffccf2'
        ];

        return colors[Math.floor(Math.random() * colors.length)] ?? '#ffcccc';
    }

    /**
     * Signs a client into his/her account.
     * @param username - The client's username.
     * @param password - The client's password.
     * @returns A token if authentication is successful, otherwise null.
     */
    async signIn(username: string, password: string) {
        const success = await Auth.authenticateUser(username, password); //{username: username, token: '1234', displayName: username, color: '#ffffff', databaseId: 1024 };
        if (!success) return null;


        this.authState = {
            username: username,
            token: success.token,
            displayName: success.displayName,
            isAuthenticated: true,
            databaseId: success.databaseId,
        };

        this.color = success.color;

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
        let color = this.randomColor();
        const success = await Auth.createNewUser(username, password, displayName, color);
        if (!success) return null;

        this.authState = {
            username: username,
            token: success.session,
            displayName: displayName,
            isAuthenticated: true,
            databaseId: success.databaseId,
        };

        this.color = color;

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
            token: null,
            databaseId: 0,
        };

        return success;
    }

    /**
     * Sends the updated game state to the client.
     * Resolves the player from the game using the client's stored player id.
     * @param game - The current game instance.
     */
    updateGamestate(game: Game) {
        if (this.player === null) return;
        const player = game.getPlayer(this.player);
        if (!player) return;
        sendClientGamestate(this.identifier, ClientView.fromGamestate(game, player));
    }

    /**
     * Updates the client's display name in the auth state.
     * @param name - The new display name.
     */
    updateDisplayName(name: string) {
        this.authState.displayName = name;
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

    /**
     * The database id of the authenticated user, or 0 if unauthenticated.
     */
    get databaseId() {
        return this.authState.databaseId;
    }
}