-- Create the database
CREATE DATABASE IF NOT EXISTS cardgamecompiler;
USE cardgamecompiler;

-- Create the user
CREATE USER IF NOT EXISTS 'cardgamecompiler'@'localhost' IDENTIFIED BY 'password';
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'cardgamecompiler'@'localhost';

-- Create the tables
CREATE TABLE IF NOT EXISTS users (
    id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(16) NOT NULL UNIQUE, -- Always lower case. Max 16 characters. Must be unique
    displayName VARCHAR(16) NOT NULL, -- Upper and lower case, spaces allowed, max 16 characters
    profileUrl TEXT, -- a url to a png file. Can be null
    profileDescription VARCHAR(500), -- user-inputted text. Can be null. Max 500 characters
    passwordHash TEXT NOT NULL, -- created by argon2ID
    color CHAR(7) DEFAULT '#ffffff' NOT NULL, -- a hex code color, starting with # and followed by 6 0-f values
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- should be automatic based on date of creation
);

CREATE TABLE IF NOT EXISTS savedrules (
    id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    gameRules JSON NOT NULL, -- The most important part. Could be very long
    gameName VARCHAR(16) NOT NULL, -- non-unique name, shouldn't be very long, maybe 16 characters
    creator MEDIUMINT NOT NULL, -- the user who created it
    parent MEDIUMINT, -- can be null. It references another savedrules instance, which it was derived from
    gameDescription TEXT NOT NULL, -- player input, can be fairly long
    lastEditDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- should be automatic based on when this is updated
    privateGame BOOLEAN NOT NULL, -- either hidden or not hidden
    blockeditorsaveid MEDIUMINT NOT NULL,

    FOREIGN KEY (creator) REFERENCES users(id),
    FOREIGN KEY (parent) REFERENCES savedrules(id)
);

CREATE TABLE IF NOT EXISTS blockeditorsaves (
    id MEDIUMINT NOT NULL,
    revision MEDIUMINT NOT NULL DEFAULT 0, -- incremements with each saved revision. Only the most recent X are saved (X TBD)
    blockeditorstate TEXT NOT NULL, -- Structured JSON of the block state. Sent back to client exactly as received
    creator MEDIUMINT NOT NULL, -- the user who created the game
    parent MEDIUMINT, -- can be null. The savedrules that this was derived from
    gameDescription TEXT NOT NULL, -- player input
    lastEditDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- should be automatic based on when this is updated
    privateGame BOOLEAN NOT NULL, -- either hidden or not hidden
    gameid MEDIUMINT, -- can be null. The game id of the game created from these blocks

    PRIMARY KEY (id, revision),

    FOREIGN KEY (creator) REFERENCES users(id),
    FOREIGN KEY (parent) REFERENCES blockeditorsaves(id)
);

-- These are used to set the starting user ID's to large numbers, so that they don't conflict with true/false checks at 0
-- ALTER TABLE savedrules AUTO_INCREMENT=1001;
-- ALTER TABLE users AUTO_INCREMENT=1001;

CREATE TABLE IF NOT EXISTS favorites (
    user MEDIUMINT NOT NULL,
    game MEDIUMINT NOT NULL,

    FOREIGN KEY (user) REFERENCES users(id),
    FOREIGN KEY (game) REFERENCES savedrules(id),
    PRIMARY KEY(user, game)
);

-- Set up permissions. Read, write, update, delete for records on all three tables
GRANT SELECT, INSERT, UPDATE, DELETE ON cardgamecompiler.* TO 'cardgamecompiler'@'localhost';