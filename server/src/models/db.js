import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default async function connectDB() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log(`connected to db`));
}
