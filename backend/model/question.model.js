import { model, Schema } from "mongoose";

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: [String],
  correct_answer: {
    type: String,
    required: true,
  },
});

export const QuestionModel = new model("Question", questionSchema);
