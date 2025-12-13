import express from "express";
import cors from "cors";
import { questionsRouter } from "./router/questions.router.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use("/question", questionsRouter);

app.listen(port, () => {
  console.log("Server Started");
});
