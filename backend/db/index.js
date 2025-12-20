import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb://127.0.0.1:27017/quizApp"
    );
    console.log(`Database connected ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error: ", error.message);
    process.exit(1);
  }
};
