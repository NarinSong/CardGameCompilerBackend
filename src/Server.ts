// This code is where the main thread lives
// It will take in messages from the client and redirect them to the correct rooms
// It will also be the main file (e.g. execution begins here)

import Logger from './Components/Logger';
import PrototypeClient from './PrototypeClient';

Logger.LOG_LEVEL = 5;

Logger.log('The server is open for business.');

const clientHandler = new PrototypeClient();

import v from './AST/PrototypeParser';

console.log(v);