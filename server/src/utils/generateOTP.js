import otpGenerator from 'otp-generator';

export default function generateOTP() {
  return otpGenerator.generate(5, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
}
