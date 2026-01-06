import express from "express";
import cors from "cors";
import { questionsRouter } from "./router/questions.router.js";
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
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/admin", adminRouter);
app.use("/question", questionsRouter);

connectDB();
app.listen(port, () => {
  console.log(`Server Started on port: ${port}: ${uuidv4()}`);
});
