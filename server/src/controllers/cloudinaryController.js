import Course from '../models/courseModel.js';
import catchAsync from '../errors/catchAsync.js';
import customError from '../errors/customError.js';
import {uploadMedia, generateSecureUrl} from '../cloudinary/cloudinary.js';
import getCourseFromPublic_id from '../utils/getCourseFromPublic_id.js';

const cloudinary = {
  upload: catchAsync(async (req, res, next) => {
    const {category, title} = req.body;

    const author = req.user.email.split('@')[0];
    const files = (req.files && Object.values(req.files)) || [];

    if (req.user.role !== 'admin') {
      return next(new customError('Not authorized', 401));
    }

    if (!title || !category || files.length < 0 || files.length > 2) {
      return next(new customError('please provide proper details', 400));
    }

    const titleExist = await Course.findOne({title});
    if (titleExist) {
      return next(new customError('title exist', 400));
    }

    await Promise.all(uploadMedia(files, category, title, author))
      .then((response) => {
        response.filter(async (item) => {
          if (item?.resource_type === 'image') {
            await Course.create({
              title,
              category,
              author,
              videoPublicId: item?.public_id,
              thumbnail_url: item?.secure_url,
            }).catch((error) => {
              return next(new customError(error, 400));
            });
          }
        });
        return res.status(200).send(response);
      })
      .catch((error) => {
        return next(new customError(error, 400));
      });
  }),

  generateSecureUrl: catchAsync(async (req, res, next) => {
    const {user} = req;
    const {public_id} = req.body;

    if (!user) {
      return next(new customError('Please login', 400));
    }

    if (!public_id) {
      return next(new customError('Provide public_id', 400));
    }

    const course = getCourseFromPublic_id(public_id);

    if (course instanceof customError) {
      return next(course);
    }

    const courseExist =
      user.courses.filter((item) => item.course === course).length > 0;

    if (!courseExist) {
      return next(new customError('Not access for this course', 401));
    }

    const response = await generateSecureUrl(public_id);
    return res.status(200).send(response);
  }),
};

export default cloudinary;
