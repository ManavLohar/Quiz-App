import { model, Schema } from "mongoose";
import { questionSchema } from "./question.model.js";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);

const testHistorySchema = new Schema(
  {
    candidateName: {
      type: String,
      required: true,
    },
    adminId: {
      type: String,
      required: true,
    },
    testId: {
      type: String,
      required: true,
    },
    totalQuestions: {
      unattended: {
        count: {
          type: Number,
          required: true,
          default: 0,
        },
        label: {
          type: String,
          default: "Unattended",
        },
      },
      correct: {
        count: {
          type: Number,
          required: true,
          default: 0,
        },
        label: {
          type: String,
          default: "Correct",
        },
      },
      incorrect: {
        count: {
          type: Number,
          required: true,
          default: 0,
        },
        label: {
          type: String,
          default: "Incorrect",
        },
      },
    },
  },
  { timestamps: true }
);

export const AdminModel = new model("Admin", adminSchema);
export const TestHistoryModel = new model("TestHistory", testHistorySchema);
