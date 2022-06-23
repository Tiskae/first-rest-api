let io;
const { Server } = require("socket.io");

module.exports = {
  init: (httpServer) => {
    io = new Server(httpServer);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket hasn't been initialized");
    }
    return io;
  },
};
