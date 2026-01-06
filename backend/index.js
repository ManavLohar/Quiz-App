import express from "express";
import cors from "cors";
// import { connectDB, isConnected } from "./db/index.js";
import { adminRouter } from "./router/admin.router.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/admin", adminRouter);

let isConnected = false;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log(`Database connected ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error: ", error.message);
    process.exit(1);
  }
};

app.use((req, res, next) => {
  if (!isConnected) {
    connectDB();
  }
  next();
});

// connectDB();
// app.listen(port, () => {
//   console.log(`Server Started on port: ${port}: ${uuidv4()}`);
// });

export { app };
