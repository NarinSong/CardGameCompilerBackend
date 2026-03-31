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

    static async authenticateUser(username: string, password: string): Promise<{token: string, displayName: string} | null> {
        const passwordHashArray = await Database.getHashByUsername(username);
        
        if (!passwordHashArray || !passwordHashArray[0]) return null;

        const passwordHash = passwordHashArray[0].password; // Grab the first result from the database
        const matched = await argon2.verify(passwordHash, password);

        if (!matched) return null;

        const buf = await Auth.randomBytes();
        if (!buf) return null;

        const sessionId = buf.toString('hex');
        ACTIVE_USERS[sessionId] = username;

        return {token: sessionId, displayName: passwordHashArray[0].displayName};
    }

    static async createNewUser(username: string, password: string, displayName: string): Promise<string | null> {
        const passwordHashArray = await Database.getHashByUsername(username);
        
        if (passwordHashArray) return null; // User account already exists

        const passwordHash = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 12288,
            hashLength: 50,
            timeCost: 3,
            parallelism: 1
        });

        const saveSuccess = await Database.saveUserCredentials(username, passwordHash, displayName);

        if (!saveSuccess) return null;

        const buf = await Auth.randomBytes();
        if (!buf) return null;

        const sessionId = buf.toString('hex');
        ACTIVE_USERS[sessionId] = username;

        return sessionId;
    }

    static async signOut(token: string): Promise<boolean> {
        if (!ACTIVE_USERS[token]) return false;
        delete ACTIVE_USERS[token];
        return true;
    }

    static async signOutEverywhere(username: string): Promise<boolean> {
    let found = false;

    for (const [token, user] of Object.entries(ACTIVE_USERS)) {
        if (user === username) {
            delete ACTIVE_USERS[token];
            found = true;
        }
    }

    return found;
}

}