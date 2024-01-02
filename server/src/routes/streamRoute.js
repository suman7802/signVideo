import express from 'express';
import validateToken from '../middlewares/validateToken.js';
import cloudinary from '../controllers/cloudinaryController.js';

const streamRouter = express.Router();

streamRouter.post('/', validateToken, cloudinary.generateSecureUrl);

export default streamRouter;
