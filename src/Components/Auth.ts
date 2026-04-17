import Database from "./Database.js";
import argon2 from 'argon2';
import { randomBytes } from "node:crypto";
import Logger from "./Logger.js";

const ACTIVE_USERS: Record<string, string> = {}; // token, username

/**
 * function to log any reason for failure
 * @param reason - reason for failure.
 * @returns null
 */
function failureReason(reason: string): null {
    Logger.log(reason);
    return null;
}

/**
 *  Used to authenticate users.
 */
export default class Auth {

    /**
     * Verify that user trying to reconnect is already signed in.
     * @param username - name of the user trying to reconnect.
     * @param token - session token.
     * @returns true if token matches username, null if the token is invalid.
     */
    // all usernames are in lowercase before arriving here. Those are sanitized in the ClientRequestParser
    // verifyUser is for a client who is already signed in and just wants to reconnect
    static verifyUser(username: string, token: string) {
        const account = ACTIVE_USERS[token];

        if (!account)
            return failureReason('verifyUser() failed: invalid token');

        return account == username;
    }

    /**
     * Asynchronous random bytes generator.
     * @returns a Promise resolving to a buffer of 128 random bytes, or null on failure.
     */
    // Despite NonSharedBuffer being deprecated, it's what the randomBytes built-in function returns, so it's what we're using
    static async randomBytes(): Promise<NonSharedBuffer | null> {
        // Have to wrap the callback-based randomBytes function in a promise
        return new Promise((resolve) => {
            randomBytes(128, (err, buf) => {
                if (err) {
                    console.error(err);
                    return resolve(failureReason('randomBytes() failed'));
                }
                
                resolve(buf);
            });
        });
    }

    /**
     * Authenticates user if username and password combination is correct and exists in the database.
     * @param username - username of the user.
     * @param password - password that user inputs.
     * @returns an object with a token and display name of the user.
     */
    static async authenticateUser(username: string, password: string): Promise<{token: string, displayName: string} | null> {
        const passwordHashArray = await Database.getHashByUsername(username);
        
        if (!passwordHashArray || !passwordHashArray[0]) return failureReason('authenticateUser() failed: no such user');

        const passwordHash = passwordHashArray[0].passwordHash; // Grab the first result from the database
        const matched = await argon2.verify(passwordHash, password);

        if (!matched) return failureReason('authenticateUser() failed: passwordHash mismatch');

        const buf = await Auth.randomBytes();
        if (!buf) return failureReason('authenticateUser() failed: randomBytes failed');

        const sessionId = buf.toString('hex');
        ACTIVE_USERS[sessionId] = username;

        return {token: sessionId, displayName: passwordHashArray[0].displayName};
    }

    /**
     * Creates a new user.
     * @param username - username of the new user.
     * @param password - password for the new user.
     * @param displayName - display name for the new user.
     * @returns a session id if successful else null if fails.
     */
    static async createNewUser(username: string, password: string, displayName: string): Promise<string | null> {
        const passwordHashArray = await Database.getHashByUsername(username);
        
        if (passwordHashArray && passwordHashArray[0]) return failureReason('createNewUser() failed: account already exists'); // User account already exists

        const passwordHash = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 12288,
            hashLength: 50,
            timeCost: 3,
            parallelism: 1
        });

        const saveSuccess = await Database.saveUserCredentials(username, passwordHash, displayName);

        if (!saveSuccess) return failureReason('createNewUser() failed: database query failed');

        const buf = await Auth.randomBytes();
        if (!buf) return failureReason('createNewUser() failed: randomBytes failed');

        const sessionId = buf.toString('hex');
        ACTIVE_USERS[sessionId] = username;

        return sessionId;
    }

    /**
     * Signs the user out.
     * @param token - token of the user to be signed out.
     * @returns true if successful, or false if no active user has this token.
     */
    static async signOut(token: string): Promise<boolean> {
        if (!ACTIVE_USERS[token]) return false;
        delete ACTIVE_USERS[token];
        return true;
    }

    /**
     * Signs out a user given their username in all sessions.
     * @param username - username of the user signing out.
     * @returns true if user found, false if not.
     */
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