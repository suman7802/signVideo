import dotenv from 'dotenv';
import customError from '../errors/customError.js';
import {server, io} from '../server.js';

dotenv.config();
const connectedUsers = {};

export default function blockMultipleUserFromSameAccount(req, res, next) {
  io.use((socket, next) => {
    const userId =
      socket.handshake.headers.cookie &&
      socket.handshake.headers.cookie.signVideo;

    if (userId && connectedUsers[userId] && connectedUsers[userId].length > 0) {
      const error = new customError(
        'User is already logged in from another location.',
        401
      );
      socket.emit('login_error', error);
      return next(error);
    }
    next();
  });
}
