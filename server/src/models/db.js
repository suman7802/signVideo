import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default async function connectDB() {
  console.log(process.env.MONGO_URI);
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log(`connected to db`));
}
