import dotenv from 'dotenv';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

dotenv.config({ path: '../.env' });

const { USER_EMAIL, CLIENT_ID, REFRESH_TOKEN, CLIENT_SECRET } = process.env;

const { OAuth2 } = google.auth;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });

  const { token, expiry_date } = await oauth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: USER_EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: token,
      expires: expiry_date,
    },
  });
};

const sendMailForOtp = (otp, email) => {
  const emailConfig = {
    from: USER_EMAIL,
    subject: 'OTP Verification',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #f60;">OTP Verification</h2>
        <p>Your OTP is:</p>
        <p style="font-size: 24px; color: #f60;">${otp}</p>
        <p>Expiring in 3 minutes...</p>
      </div>
    `,
    to: email,
  };

  return new Promise(async (resolve, reject) => {
    return await createTransporter().then((transporter) => {
      transporter.sendMail(emailConfig, (err, info) => {
        if (err) return reject(err);
        return resolve(info);
      });
    });
  });
};

export default sendMailForOtp;
