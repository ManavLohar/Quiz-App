import express from "express";
import {
  getQuestions,
  postQuestion,
  deleteQuestion,
  updateQuestion
} from "../controller/questions.controller.js";

const router = express.Router();

export const questionsRouter = router
  .post("/", postQuestion)
  .get("/", getQuestions)
  .delete("/", deleteQuestion)
  .patch("/", updateQuestion);
