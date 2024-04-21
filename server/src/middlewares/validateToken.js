import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';

import User from '../models/userModel.js';
import customError from '../errors/customError.js';

dotenv.config();

export default async function validateToken(req, res, next) {
  const token = req.cookies['signVideo'];
  if (!token) {
    const error = new customError('Token not found', 401);
    return next(error);
  }

  const verified = JWT.verify(token, process.env.JWT_SECRET);
  if (!verified) {
    const error = new customError('Unauthorized', 401);
    return next(error);
  }

  const user = await User.findOne({email: verified.email});

  req.user = user;
  next();
}
