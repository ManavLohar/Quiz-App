import express from "express";
import {
  adminLogin,
  adminRegister,
  deleteGeneratedTestLink,
  deleteQuestion,
  getAdmin,
  getGeneratedLinksForCandidate,
  getQuestions,
  getQuestionsForCandidate,
  getTestHistory,
  logoutAdmin,
  postCandidateName,
  postCheckAnswer,
  postGenerateLinkForTest,
  postQuestion,
  postSubmitTest,
  updateQuestion,
} from "../controller/admin.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

export const adminRouter = router
  .post("/sign-up", adminRegister)
  .post("/login", adminLogin)
  .get("/", verifyToken, getAdmin)
  .post("/logout", verifyToken, logoutAdmin)
  .post("/question", verifyToken, postQuestion)
  .get("/questions", verifyToken, getQuestions)
  .patch("/question", verifyToken, updateQuestion)
  .delete("/question", verifyToken, deleteQuestion)
  .get("/questions/candidate/:adminId/:testId", getQuestionsForCandidate)
  .post("/candidate/name", postCandidateName)
  .post("/check-answer", postCheckAnswer)
  .post("/submit-test", postSubmitTest)
  .get("/test-history/:testId", verifyToken, getTestHistory)
  .post("/generate-test-link", verifyToken, postGenerateLinkForTest)
  .delete(
    "/delete-generated-test-link/:testId",
    verifyToken,
    deleteGeneratedTestLink
  )
  .get("/generated-test-link", verifyToken, getGeneratedLinksForCandidate);
