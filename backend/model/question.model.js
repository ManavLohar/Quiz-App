import { Model, Schema } from "mongoose";

const questionsSchema = new Schema([
  {
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        option: {
          type: String,
        },
      },
    ],
    correct_answer: {
      type: String,
      required: true,
    },
  },
]);

export const questionModel = new Model("Questions", questionsSchema);
