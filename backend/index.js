import express from "express";
import cors from "cors";
import { connectDB } from "./db/index.js";
import { adminRouter } from "./router/admin.router.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://quiz-app-f8lo.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed" });
  }
});
app.use("/admin", adminRouter);

// connectDB();
// app.listen(port, () => {
//   console.log(`Server Started on port: ${port}: ${uuidv4()}`);
// });

export default app;
