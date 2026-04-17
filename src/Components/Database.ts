import * as mariadb from 'mariadb';
import { config } from 'dotenv';
import Logger from './Logger.js';

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
    static async getHashByUsername(username: string): Promise<{ passwordHash: string; displayName: string }[] | null> {
        let conn;
        let password = null;

        try {
            conn = await pool.getConnection();
            password = await conn.query("SELECT passwordHash, displayName FROM users WHERE username = ?", [username]);
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
     * @returns Promise for true if successfully saved, else false.
     */
    static async saveUserCredentials(username: string, passwordHash: string, displayName: string): Promise<boolean> {
        if (username === 'test') return true;
        
        let conn;

        try {
            conn = await pool.getConnection();
            await conn.query("INSERT INTO users (username, passwordHash, displayName) VALUES (?, ?, ?)", [username, passwordHash, displayName]);
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            if (conn) conn.release();
        }

        return true;
    }

    /**
     * Save the game definition JSON.
     * @param game - The game JSON.
     * @param name - Name of the game.
     * @param owner - Owner of the game.
     * @param parent - The id of the parent game this was derived from, if any.
     * @param description - description of the game.
     * @param isPrivate - Whether the game will be private or public.
     * @returns Promise for true if successfully saved, else false.
     */
    static async saveGameJson(game: string, name: string, owner: string, parent: number | null, description: string | null, isPrivate: boolean) {
        let conn;

        try {
            conn = await pool.getConnection();
            await conn.query("INSERT INTO savedrules (gameRules, gameName, creator, parent, gameDescription, privateGame) VALUES (?, ?, ?, ?, ?, ?)", 
                [game, name, owner, parent, description, isPrivate]);
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            if (conn) conn.release();
        }

        return true;
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