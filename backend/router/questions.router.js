import express from "express";
import {
  getQuestion,
  postQuestion,
} from "../controller/questions.controller.js";

const router = express.Router();

export const questionsRouter = router
  .post("/", postQuestion)
  .get("/", getQuestion);
