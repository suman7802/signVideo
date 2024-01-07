import express from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/reqOTP', userController.reqOTP);
userRouter.post('/auth', userController.auth);

export default userRouter;
