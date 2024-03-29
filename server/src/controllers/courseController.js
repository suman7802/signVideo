import User from '../models/userModel.js';
import Course from '../models/courseModel.js';
import catchAsync from '../errors/catchAsync.js';
import customError from '../errors/customError.js';

const courseController = {
  buyCourse: catchAsync(async (req, res, next) => {
    const {email} = req.user;
    const {courses} = req.body;

    if (!courses) {
      return next(new customError('Please provide a course group', 400));
    }

    const user = await User.findOne({email});

    if (!user) {
      return next(new customError('User not found', 404));
    }

    const existingCourses = await Course.find();

    if (!existingCourses) {
      return next(new customError('No courses found', 404));
    }

    const existingCoursesName = existingCourses.map(
      (course) => course.category
    );

    const validCourses = courses.filter((course) =>
      existingCoursesName.includes(course.course_name)
    );

    if (validCourses.length !== courses.length) {
      const invalidCourses = courses.filter(
        (course) => !existingCoursesName.includes(course.course_name)
      );
      const invalidCourseNames = invalidCourses
        .map((course) => course.course_name)
        .join(', ');
      return next(
        new customError(`Invalid courses found: ${invalidCourseNames}`, 400)
      );
    }

    const usersExistingCourses = user.courses.map((course) => course.course);

    const duplicateCourses = courses.filter((course) =>
      usersExistingCourses.includes(course.course_name)
    );

    if (duplicateCourses.length > 0) {
      const duplicateCourseNames = duplicateCourses
        .map((course) => course.course_name)
        .join(', ');
      return next(
        new customError(
          `Already Enrolled courses found: ${duplicateCourseNames}`,
          400
        )
      );
    }

    courses.forEach((course) => {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + course.quantity);

      user.courses.push({
        course: course.course_name,
        expirationDate: expirationDate,
      });
    });

    await user.save();
    return res.status(200).send(user);
  }),

  getThumbnail: catchAsync(async (req, res, next) => {
    const {category} = req.params;
    const filter = category ? {category} : {};
    const courses = await Course.find(filter);
    return res.status(200).send(courses);
  }),
};

export default courseController;
