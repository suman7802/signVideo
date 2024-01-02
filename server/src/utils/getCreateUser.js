import dotenv from 'dotenv';
import User from '../models/userModel.js';
import generateOTP from './generateOTP.js';
import sendMailForOtp from './sendOTP.js';
import otpExpireDuration from './otpExpireDuration.js';

dotenv.config();

export default async function getCreateUser(email, role) {
  const user = await User.findOne({email});

  if (!user) {
    const otp = generateOTP();
    const otpExpireDate = otpExpireDuration();
    return await sendMailForOtp(otp, email).then(async (response) => {
      await User.create({email, role, otp, otpExpireDate});
      return response;
    });
  }

  const currentDate = new Date();
  const notExpired = user.otpExpireDate.getTime() - currentDate.getTime() > 0;

  if (user && !notExpired) {
    const otp = generateOTP();
    const otpExpireDate = otpExpireDuration();
    return await sendMailForOtp(otp, email).then(async (response) => {
      await User.findOneAndUpdate({email}, {otp, otpExpireDate});
      return response;
    });
  } else {
    return 'OTP already sent.';
  }
}
