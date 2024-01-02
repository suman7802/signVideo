import customError from '../errors/customError.js';
const connectedUsers = {};

export default function socket(io) {
  io.use((socket, next) => {
    const userId = socket.handshake.headers.cookie.signVideo;
    if (!userId) {
      const error = new customError('Unauthorized', 401);
      return next(error);
    }
    if (connectedUsers[userId] && connectedUsers[userId].length > 0) {
      const error = new customError(
        'user already logged in from from another location',
        401
      );
      socket.emit(error);
      return next(error);
    }
    next();
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.headers.cookie.signVideo;

    if (!userId) {
      const error = new customError('Unauthorized', 401);
      return next(error);
    }

    if (!connectedUsers[userId]) {
      connectedUsers[userId] = [];
    }

    connectedUsers[userId].push(socket.id);

    console.log(
      `User ${userId} logged in. Connections: ${connectedUsers[userId].length}`
    );

    socket.on('logout', () => {
      if (userId && connectedUsers[userId]) {
        const index = connectedUsers[userId].indexOf(socket.id);
        if (index !== -1) {
          connectedUsers[userId].splice(index, 1);
          console.log(
            `User ${userId} logged out. Connections: ${connectedUsers[userId].length}`
          );
        }
      }
    });

    socket.on('disconnect', () => {
      if (userId) {
        const index = connectedUsers[userId].indexOf(socket.id);
        if (index !== -1) {
          connectedUsers[userId].splice(index, 1);
          console.log(
            `User ${userId} disconnected. Connections: ${connectedUsers[userId].length}`
          );
        }
      }
    });
  });
}
