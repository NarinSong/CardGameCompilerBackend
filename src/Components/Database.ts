import * as mariadb from 'mariadb';
import { config } from 'dotenv';
import Logger from './Logger.js';

config(); // Set up environment variables

if (!process.env.PASSWORD) {
    Logger.log('No password loaded in from .env - running without a database!');
}

const pool = mariadb.createPool({
     host: '127.0.0.1',
     port: 3306,
     user:'cardgamecompiler',
     database: 'cardgamecompiler',
     password: process.env.PASSWORD as string, // From the .env file
     connectionLimit: 15
});

export default class Database {
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

    static async saveUserCredentials(username: string, passwordHash: string, displayName: string): Promise<boolean> {
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
}