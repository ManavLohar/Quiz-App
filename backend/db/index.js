import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URL, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
//     console.log(`Database connected ${connectionInstance.connection.host}`);
//   } catch (error) {
//     console.log("MongoDB connection error: ", error.message);
//     process.exit(1);
//   }
// };
