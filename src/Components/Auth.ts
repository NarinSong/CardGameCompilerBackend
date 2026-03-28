import Database from "./Database";
import argon2 from 'argon2';
import { randomBytes } from "node:crypto";

const ACTIVE_USERS: Record<string, string> = {}; // token, username

export default class Auth {
    // all usernames are in lowercase before arriving here. Those are sanitized in the ClientRequestParser
    // verifyUser is for a client who is already signed in and just wants to reconnect
    static verifyUser(username: string, token: string) {
        const account = ACTIVE_USERS[token];

        if (!account)
            return null;

        return account == username;
    }

    // Despite NonSharedBuffer being deprecated, it's what the randomBytes built-in function returns, so it's what we're using
    static async randomBytes(): Promise<NonSharedBuffer | null> {
        // Have to wrap the callback-based randomBytes function in a promise
         return new Promise((resolve) => {
            randomBytes(128, (err, buf) => {
                if (err) {
                    console.error(err);
                    return resolve(null);
                }
                
                resolve(buf);
            });
        });
    }

    static async authenticateUser(username: string, password: string): Promise<string> {
        const passwordHashArray = await Database.getHashByUsername(username);
        
        if (!passwordHashArray || !passwordHashArray[0]) return '';

        const passwordHash = passwordHashArray[0].password; // Grab the first result from the database
        const matched = await argon2.verify(passwordHash, password);

        if (!matched) return '';

        const buf = await Auth.randomBytes();
        if (!buf) return '';

        const sessionId = buf.toString('hex');
        ACTIVE_USERS[sessionId] = username;

        return sessionId;
    }

}