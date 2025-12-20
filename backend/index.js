import express from "express";
import cors from "cors";
import { questionsRouter } from "./router/questions.router.js";
import { connectDB } from "./db/index.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use("/question", questionsRouter);

connectDB();
app.listen(port, () => {
  console.log(`Server Started on port: ${port}`);
});
