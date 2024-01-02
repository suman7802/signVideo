import express from 'express';
import validateToken from '../middlewares/validateToken.js';
import cloudinary from '../controllers/cloudinaryController.js';
import courseController from '../controllers/courseController.js';

const courseRoute = express.Router();

courseRoute.post('/upload', validateToken, cloudinary.upload);
courseRoute.post('/buy', validateToken, courseController.buyCourse);
courseRoute.get('/getThumbnail/:category', courseController.getThumbnail);
courseRoute.get('/getThumbnail/', courseController.getThumbnail);

export default courseRoute;
