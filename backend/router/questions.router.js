import express from "express";
import {
  getQuestions,
  postQuestion,
  deleteQuestion,
  updateQuestion,
} from "../controller/questions.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

export const questionsRouter = router
  .post("/", verifyToken, postQuestion)
  .get("/", verifyToken, getQuestions)
  .delete("/", verifyToken, deleteQuestion)
  .patch("/", verifyToken, updateQuestion);
