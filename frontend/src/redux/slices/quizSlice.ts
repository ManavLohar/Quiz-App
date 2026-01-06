import { createSlice } from "@reduxjs/toolkit";
import type { Questions } from "../../Schema";

const initialState: Questions = {
  questions: [],
  questionModelVisibility: false,
  confirmationModelVisibility: false,
  logoutConfirmationModelVisibility: false,
  loginModelVisibility: false,
  generateLinkModelVisibility: false,
  generatedLinkId: "",
  testResultModelVisibility: false,
  deleteGeneratedQuizDataVisibility: false,
  question: {
    _id: "",
    question: "",
    options: ["", "", "", ""],
    correct_answer: "",
  },
  questionNumber: 0,
  testResultId: "",
};

export const quizSlice = createSlice({
  name: "QuizSlice",
  initialState,
  reducers: {
    toggleQuestionModelVisibility: (state) => {
      state.questionModelVisibility = !state.questionModelVisibility;
    },
    toggleConfirmationModelVisibility: (state) => {
      state.confirmationModelVisibility = !state.confirmationModelVisibility;
    },
    toggleLogoutConfirmationModelVisibility: (state) => {
      state.logoutConfirmationModelVisibility =
        !state.logoutConfirmationModelVisibility;
    },
    toggleLoginModelVisibility: (state) => {
      state.loginModelVisibility = !state.loginModelVisibility;
    },
    toggleGenerateLinkModelVisibility: (state, action) => {
      state.generateLinkModelVisibility = !state.generateLinkModelVisibility;
      state.generatedLinkId = action.payload;
    },
    toggleTestResultModelVisibility: (state) => {
      state.testResultModelVisibility = !state.testResultModelVisibility;
    },
    toggleDeleteGeneratedQuizDataVisibility: (state, action) => {
      state.deleteGeneratedQuizDataVisibility =
        !state.deleteGeneratedQuizDataVisibility;
      state.generatedLinkId = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions = action.payload;
    },
    setTestResultId: (state, action) => {
      state.testResultId = action.payload;
    },
    setCurrentQuestion: (state, action) => {
      state.question = { ...action.payload };
    },
    setNextAndPreviousNumber: (state, action) => {
      switch (action.payload) {
        case "inc":
          state.questionNumber++;
          break;
        case "dec":
          state.questionNumber--;
          break;
        default:
          break;
      }
    },
  },
});

export const {
  toggleQuestionModelVisibility,
  toggleConfirmationModelVisibility,
  toggleLogoutConfirmationModelVisibility,
  toggleLoginModelVisibility,
  toggleGenerateLinkModelVisibility,
  toggleTestResultModelVisibility,
  addQuestion,
  toggleDeleteGeneratedQuizDataVisibility,
  setTestResultId,
  setCurrentQuestion,
  setNextAndPreviousNumber,
} = quizSlice.actions;
export default quizSlice.reducer;
