import mariadb from 'mariadb';
import { config } from 'dotenv';
import Logger from './Logger';

config(); // Set up environment variables

const pool = mariadb.createPool({
     host: '127.0.0.1',
     port: 3306,
     user:'cardgamecompiler',
     database: 'cardgamecompiler',
     password: process.env.PASSWORD, // From the .env file
     connectionLimit: 15
});

export default class Database {
    static async getHashByUsername(username: string): Promise<{ password: string; }[] | null> {
        let conn;
        let password;

        try {
            conn = await pool.getConnection();
            password = await conn.query("SELECT password FROM users WHERE username = ?", username);
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) conn.release();
        }

        return password;
    }
}