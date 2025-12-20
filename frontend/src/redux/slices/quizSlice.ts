import { createSlice } from "@reduxjs/toolkit";
import type { Questions } from "../../Schema";

const initialState: Questions = {
  questions: [],
  questionModelVisibility: false,
  confirmationModelVisibility: false,
  question: {
    _id: "",
    question: "",
    options: ["", "", "", ""],
    correct_answer: "",
  },
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
    addQuestion: (state, action) => {
      state.questions = action.payload;
    },
    setQuestionId: (state, action) => {
      state.questionId = action.payload;
    },
    setCurrentQuestion: (state, action) => {
      state.question = { ...action.payload };
    },
  },
});

export const {
  toggleQuestionModelVisibility,
  toggleConfirmationModelVisibility,
  addQuestion,
  setQuestionId,
  setCurrentQuestion,
} = quizSlice.actions;
export default quizSlice.reducer;
