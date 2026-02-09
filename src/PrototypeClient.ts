const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

export default class PrototypeClient {
    constructor() {
        const app = express();
        const server = createServer(app);
        const io = new Server(server);

        app.get('/', (req: any, res: any) => {
            console.log(__dirname);
            res.sendFile('C:\\Users\\Sam\\Documents\\code\\CardGameCompiler\\CardGameCompilerBackend\\client-prototype\\index.html');
        });

        io.on('connection', (socket: any) => {
            console.log('a user connected');
        });

        server.listen(8020, () => {
            console.log('server running at http://localhost:8020');
        });
    }
}

