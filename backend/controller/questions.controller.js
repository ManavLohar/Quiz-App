import { QuestionModel } from "../model/question.model.js";

export const postQuestion = async (req, res) => {
  try {
    const { question, options, correct_answer } = req.body;
    const data = {
      question,
      options,
      correct_answer,
    };
    const newQuestion = await QuestionModel.create(data);
    setTimeout(() => {
      return res.status(200).json({
        success: true,
        message: "Data fetched!",
        data: newQuestion,
      });
    }, 1000);
  } catch (error) {
    console.log("Error from post questions: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await QuestionModel.find();
    setTimeout(() => {
      return res.status(200).json({
        success: true,
        message: "Questions fetched!",
        data: questions,
      });
    }, 1000);
  } catch (error) {
    console.log("Error from get questions: ", error);
    res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const data = req.body;
    const question = await QuestionModel.findByIdAndUpdate(data._id, data, {
      new: true,
    });
    setTimeout(() => {
      return res.status(200).json({
        success: true,
        message: "Question updated!",
        data: question,
      });
    }, 1000);
  } catch (error) {}
};

export const deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.body;
    if (!questionId) {
      return res.status(400).json({
        success: false,
        message: "Please provide question id!",
      });
    }
    const questions = await QuestionModel.findByIdAndDelete({
      _id: questionId,
    });
    setTimeout(() => {
      return res.status(200).json({
        success: true,
        message: "Question is successfully deleted!",
        data: questions,
      });
    }, 1000);
  } catch (error) {
    console.log("Error from delete question: ", error);
    res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};
