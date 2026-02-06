// This code will be a placeholder until we hook up the unity front end
// It will connect to a simple web interface

import { createServer } from "http";
import { Server, Socket } from "socket.io";

const sockets: Record<string, Socket> = {};
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*", // localhost:8020, doesn't matter since it's just a dev env.
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`Socket connected: ${socket.id}`);

  sockets[socket.id] = socket;

  socket.on("example:event", (data: any) => {
    // This is where Client Triggers will be sent in. We will forward this information to the "Client" class
    console.log("example:event", data);
  });

  socket.on("disconnect", (reason: any) => {
    // When the player leaves, we will need to delete the room they were in as well. We will probably need a game manager to handle this
    console.log(`Socket disconnected: ${socket.id} (${reason})`);
    delete sockets[socket.id];
  });
});

httpServer.listen(8020, () => {
  console.log("Socket.IO server listening on port 8020");
});
