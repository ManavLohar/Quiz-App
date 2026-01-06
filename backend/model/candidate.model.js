import { Schema, model } from "mongoose";
import { questionSchema } from "./question.model.js";

const candidateSchema = new Schema(
  {
    candidate: {
      name: {
        type: String,
      },
      status: {
        type: String,
        default: "not-started",
        enum: ["not-started", "in-progress", "completed"],
      },
    },
    adminId: {
      type: String,
    },
    testId: {
      type: String,
    },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);

export const CandidateModel = new model("Candidate", candidateSchema);
