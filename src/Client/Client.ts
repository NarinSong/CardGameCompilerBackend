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

    constructor()  {
        this.identifier = Client.nextId;
    }

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

    submitRulesFromEditor(rules: unknown) {
        try {
            const game: GameDefinition | null = buildGameFromJSON(rules);
            if (game == null) return;

            // TODO: use the game definition somewhere
        } catch (error) {
            console.debug(error);
        }
    }

    // TODO: I expect a reference to "Player" or at least "PlayerID" will be stored in the client class eventually
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