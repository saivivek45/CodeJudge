import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MONGO DB CONNECTION SUCCESSFUL");
  } catch (error) {
    console.log("MONGO DB CONNECTION FAILURE", error.message);
  }
};

export default connectDB;
