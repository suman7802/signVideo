import mongoose from 'mongoose';
const {model, Schema} = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  otp: {
    type: String,
    required: [true, 'Please provide a otp'],
  },
  courses: [
    {
      course: {
        type: String,
        required: [true, 'Please provide a course'],
      },
      expirationDate: {
        type: Date,
        required: [true, 'Please provide a expiration date'],
      },
    },
  ],
  otpExpireDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

const User = model('User', userSchema);

export default User;
