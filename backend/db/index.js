import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log(`Database connected ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error: ", error.message);
    process.exit(1);
  }
};

export { isConnected };
