import JWT from 'jsonwebtoken';

import User from '../models/userModel.js';
import catchAsync from '../errors/catchAsync.js';
import customError from '../errors/customError.js';
import getCreateUser from '../utils/getCreateUser.js';

const userController = {
  reqOTP: catchAsync(async (req, res) => {
    const {email, adminPassword} = req.body;

    const role =
      adminPassword === process.env.ADMIN_PASSWORD ? 'admin' : 'user';

    await getCreateUser(email, role).then((response) => {
      return res.send(response);
    });
  }),

  auth: catchAsync(async (req, res, next) => {
    const {email, otp} = req.body;

    if (!email || !otp) {
      return next(new customError('Please provide email and otp', 400));
    }

    const user = await User.findOne({email});

    if (!user) {
      return next(new customError('User not found', 404));
    }
    if (user.otpExpireDate.getTime() - new Date().getTime() < 0) {
      return next(new customError('OTP expired', 400));
    }
    if (user.otp !== otp) {
      return next(new customError('OTP not match', 400));
    }

    const token = JWT.sign({email: user.email}, process.env.JWT_SECRET);

    return res
      .cookie('signVideo', token, {
        path: '/',
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .json({
        status: 200,
        message: 'login success',
        user: user,
      });
  }),
};

export default userController;
