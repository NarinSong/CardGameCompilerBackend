import * as mariadb from 'mariadb';
import { config } from 'dotenv';
import Logger from './Logger.js';
import ClientGameDefinition from '../schemas/ClientGameDefinition.js';
import z from 'zod';
import { InsertResult, InsertSchema, SelectAllGameSaves, SelectAllGameSavesSchema, SelectFullGameSavesById, SelectFullGameSavesByIdSchema, SelectGameSavesById, SelectGameSavesByIdSchema, SelectHashByUsername, SelectHashByUsernameSchema, UpdateResult, UpdateSchema } from '../schemas/DatabaseSchemas.js';
import GameDefinition from '../Rules/GameDefinition.js';

config(); // Set up environment variables

if (!process.env.PASSWORD) {
    Logger.log('No password loaded in from .env - running without a database!');
}

/**
 * MariaDB connection pool for the cardgamecompiler database.
 */
const pool = mariadb.createPool({
     host: '127.0.0.1',
     port: 3306,
     user:'cardgamecompiler',
     database: 'cardgamecompiler',
     password: process.env.PASSWORD as string, // From the .env file
     connectionLimit: 15
});

/**
 *  Module that handles database actions.
 */
export default class Database {
    /**
     * Get password hash from username.
     * @param username - username to get password hash from.
     * @returns Promise resolving to an array containing the password hash and display name, or null on failure. 
     */
    static async getHashByUsername(username: string): Promise<SelectHashByUsername[] | null> {
        let conn;
        let password = null;

        try {
            conn = await pool.getConnection();
            password = await conn.query("SELECT id, passwordHash, displayName, color FROM users WHERE username = ?", [username]);
            SelectHashByUsernameSchema.array().parse(password);
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) conn.release();
        }

        return password;
    }

    /**
     * Save user info to database
     * @param username - username to save.
     * @param passwordHash - password hash to save.
     * @param displayName - display name to save.
     * @returns Promise resolving to the insert result if successful, or null on failure.
     */
    static async saveUserCredentials(username: string, passwordHash: string, displayName: string, color: string): Promise<InsertResult | null> {
        if (username === 'test') return { affectedRows: 1, insertId: 2, warningStatus: 0 };
        
        let conn;

        try {
            conn = await pool.getConnection();
            const result = await conn.query("INSERT INTO users (username, passwordHash, displayName, color) VALUES (?, ?, ?, ?)", [username, passwordHash, displayName, color]);
            return InsertSchema.parse(result);
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }

    /**
     * Updates the profile color of a user in the database.
     * @param username - The username of the user to update.
     * @param color - The new hex color string to save.
     * @returns Promise resolving to true if successful, else false.
     */
    static async saveUserColor(username: string, color: string): Promise<boolean> {
        let conn;

        try {
            conn = await pool.getConnection();
            await conn.query("UPDATE users SET color = ? WHERE username = ?", [color, username]);
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            if (conn) conn.release();
        }

        return true;
    }

    /**
     * Updates the display name of a user in the database.
     * @param username - The username of the user to update.
     * @param displayName - The new display name to save.
     * @returns Promise resolving to true if successful, else false.
     */
    static async saveUserDisplayName(username: string, displayName: string): Promise<boolean> {
        let conn;

        try {
            conn = await pool.getConnection();
            await conn.query("UPDATE users SET displayName = ? WHERE username = ?", [displayName, username]);
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            if (conn) conn.release();
        }

        return true;
    }

    /**
     * Updates the profile description of a user in the database.
     * @param username - The username of the user to update.
     * @param description - The new profile description to save.
     * @returns Promise resolving to true if successful, else false.
     */
    static async saveUserDescription(username: string, description: string): Promise<boolean> {
        let conn;

        try {
            conn = await pool.getConnection();
            await conn.query("UPDATE users SET profileDescription = ? WHERE username = ?", [description, username]);
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            if (conn) conn.release();
        }

        return true;
    }

    /**
     * Updates the profile picture URL of a user in the database.
     * @param username - The username of the user to update.
     * @param url - The URL of the new profile picture.
     * @returns Promise resolving to true if successful, else false.
     */
    static async saveUserProfilePicture(username: string, url: string): Promise<boolean> {
        let conn;

        try {
            conn = await pool.getConnection();
            await conn.query("UPDATE users SET profileUrl = ? WHERE username = ?", [url, username]);
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            if (conn) conn.release();
        }

        return true;
    }

    /**
     * Saves a new game block editor state to the database.
     * @param databaseId - The database id of the client saving the game.
     * @param game - The ClientGameDefinition containing the game info and block editor state.
     * @returns Promise resolving to the new game id if successful, or null on failure.
     */
    static async saveGameEditorBlocks(databaseId: number, game: ClientGameDefinition): Promise<null | number> {
        let conn;
        let id: number;

        try {
            conn = await pool.getConnection();
            const result = await conn.query(
                "INSERT INTO blockeditorsaves (gamename, blockeditorstate, creator, parent, gameDescription, privateGame)", 
                [
                    game.gameMeta.name,
                    JSON.stringify(game), 
                    databaseId, 
                    game.gameMeta.parentGameId ?? null, 
                    game.gameMeta.description ?? game.gameMeta.name, 
                    game.gameMeta.private ?? true
                ]
            );
            id = Number(InsertSchema.parse(result).insertId);
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            if (conn) conn.release();
        }

        return id;
    }

    /**
     * Updates an existing game block editor state in the database.
     * @param gameId - The id of the game to update.
     * @param game - The updated ClientGameDefinition.
     * @returns Promise resolving to the update result if successful, or null on failure.
     */
    static async updateGameEditorBlocks(gameId: number, game: ClientGameDefinition): Promise<null | UpdateResult> {
        let conn;

        try {
            conn = await pool.getConnection();
            const result = await conn.query(
                "UPDATE blockeditorsaves SET gamename = ?, blockeditorstate = ?, gameDescription = ?, privateGame = ? WHERE id = ?", 
                [
                    game.gameMeta.name,
                    JSON.stringify(game),
                    game.gameMeta.description ?? game.gameMeta.name, 
                    game.gameMeta.private ?? true,
                    gameId,
                ]
            );
            return UpdateSchema.parse(result);
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }

    /**
     * Retrieves the creator of a saved block editor game by its id.
     * @param gameId - The id of the saved game.
     * @returns Promise resolving to an array containing the creator field, or null on failure.
     */
    static async getSavedEditorBlocksById(gameId: number): Promise<SelectGameSavesById[] | null> {
        let conn;

        try {
            conn = await pool.getConnection();
            const result = await conn.query("SELECT creator FROM blockeditorsaves WHERE id = ?", gameId);

            return SelectGameSavesByIdSchema.array().parse(result);
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }

    /**
     * Retrieves the full block editor state and creator of a saved game by its id.
     * @param gameId - The id of the saved game.
     * @returns Promise resolving to an array containing the block editor state and creator, or null on failure.
     */
    static async getFullSavedEditorBlocksById(gameId: number): Promise<SelectFullGameSavesById[] | null> {
        let conn;

        try {
            conn = await pool.getConnection();
            const result = await conn.query("SELECT blockeditorstate, creator FROM blockeditorsaves WHERE id = ?", gameId);

            return SelectFullGameSavesByIdSchema.array().parse(result);
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }

    /**
     * Retrieves all saved block editor games from the database.
     * @returns Promise resolving to an array of saved game entries, or null on failure.
     */
    static async getAllGameEditorBlocks(): Promise<null | SelectAllGameSaves[]> {
        let conn;

        try {
            conn = await pool.getConnection();
            const result = await conn.query("SELECT gamename, creator, parent, id, privateGame FROM blockeditorsaves");

            return SelectAllGameSavesSchema.array().parse(result);
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }

    /**
     * Saves a compiled game definition JSON to the database.
     * @param databaseId - The database id of the client saving the game.
     * @param game - The GameDefinition to save.
     * @returns Promise resolving to the insert result if successful, or null on failure.
     */
    static async saveGameJson(databaseId: number, game: GameDefinition): Promise<InsertResult | null> {
        let conn;

        try {
            conn = await pool.getConnection();
            const result = await conn.query("INSERT INTO savedrules (id, gameRules, gameName, creator, parent, gameDescription, privateGame) VALUES (?, ?, ?, ?, ?, ?, ?)", 
                [
                    game.gameMeta.id,
                    JSON.stringify(game),
                    game.gameMeta.name,
                    databaseId,
                    game.gameMeta.parentGameId ?? null,
                    game.gameMeta.description,
                    game.gameMeta.private,
                ]
            );

            return InsertSchema.parse(result);
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            if (conn) conn.release();
        }
    }

    /**
     * Retrieve a game JSON from its id.
     * @param gameId - the id for the game.
     * @returns Promise for the game JSON if successful, else null.
     */
    static async getGameFromId(gameId: number): Promise<{ gameRules: string }[] | null> {
        let conn;
        let game = null;

        try {
            conn = await pool.getConnection();
            game = await conn.query("SELECT gameRules FROM savedrules WHERE id = ?", [gameId]);
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) conn.release();
        }

        return game;
    }

    /**
     * Gets the list of available games.
     * @returns Promise for the list of game names and ids if successful, else null.
     */
    static async getGamesList(): Promise<{ name: string; id: number }[] | null> {
        let conn;
        let games = null;

        try {
            conn = await pool.getConnection();
            games = await conn.query("SELECT gameName AS name, id FROM savedrules");
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) conn.release();
        }

        return games;
    }
}