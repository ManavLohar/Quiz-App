import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database connected ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error: ", error.message);
    process.exit(1);
  }
};
