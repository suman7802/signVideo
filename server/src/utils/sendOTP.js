import dotenv from "dotenv";
import { google } from "googleapis";
import nodemailer from "nodemailer";

dotenv.config({ path: "../.env" });

const {
  USER_EMAIL,
  NODEMAILER_CLIENT_ID,
  NODEMAILER_REFRESH_TOKEN,
  NODEMAILER_CLIENT_SECRET,
  ACESS_TOKEN,
} = process.env;

const { OAuth2 } = google.auth;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    NODEMAILER_CLIENT_ID,
    NODEMAILER_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground",
  );

  oauth2Client.setCredentials({
    refresh_token: NODEMAILER_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((error, token) => {
      if (error) reject(error);
      resolve(token);
    });
  });

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: USER_EMAIL,
      clientId: NODEMAILER_CLIENT_ID,
      clientSecret: NODEMAILER_CLIENT_SECRET,
      refreshToken: NODEMAILER_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
};

const sendMailForOtp = (otp, email) => {
  const emailConfig = {
    from: USER_EMAIL,
    subject: "OTP Verification",
    text: `Your OTP is : ${otp}\nExpiring in 3 minute..`,
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
