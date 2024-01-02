import express from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/reqOTP', userController.reqOTP); // register
userRouter.post('/auth', userController.auth); // login

export default userRouter;
