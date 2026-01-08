import { model, Schema } from "mongoose";

export const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: [String],
  correct_answer: {
    type: String,
    required: true,
  },
  candidateAnswer: {
    type: String,
  },
  status: {
    type: String,
    default: "unattended",
    enum: ["unattended", "correct", "incorrect"],
  },
  attempt: {
    type: Boolean,
    default: false,
  },
});
