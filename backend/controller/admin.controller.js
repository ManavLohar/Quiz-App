import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AdminModel, TestHistoryModel } from "../model/admin.model.js";
import { v4 as uuidv4 } from "uuid";
import { CandidateModel } from "../model/candidate.model.js";

export const adminRegister = async (req, res) => {
  try {
    const { name, email, password, candidate, testId, questions } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide mandatory fields?",
      });
    }
    const isAdminExist = await AdminModel.findOne({ email });
    if (isAdminExist) {
      return res.status(400).json({
        success: false,
        message: "This email is already registered!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const data = {
      name,
      email,
      password: hashedPassword,
      candidate,
      testId,
      questions,
    };
    await AdminModel.create(data);
    return res.status(200).json({
      success: true,
      message: "Account created!",
    });
  } catch (error) {
    console.log("Error from create admin: ", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password!",
      });
    }
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Email not found!",
      });
    }
    const isPassMatch = await bcrypt.compare(password, admin.password);
    if (!isPassMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    return res
      .status(200)
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Login successfully!",
      });
  } catch (error) {
    console.log("Error from login admin: ", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const { email } = req.user;
    const admin = await AdminModel.findOne({ email }).select("-password");
    if (!admin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Admin data fetched!",
      data: admin,
    });
  } catch (error) {
    console.log("Error from get admin: ", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const logoutAdmin = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Logout successfully!",
      });
  } catch (error) {
    console.log("Error from logout admin: ", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const postQuestion = async (req, res) => {
  try {
    const { question, options, correct_answer } = req.body;
    const { email } = req.user;
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found!",
      });
    }
    const data = {
      question,
      options,
      correct_answer,
    };
    admin.questions.push(data);
    await admin.save();
    return res.status(200).json({
      success: true,
      message: "Data fetched!",
      data: admin.questions[admin.questions.length - 1],
    });
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
    const { email } = req.user;
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Questions fetched!",
      data: admin.questions,
    });
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
    const { email } = req.user;
    const { _id: questionId, question, options, correct_answer } = req.body;
    if (!questionId || !question || !options || !correct_answer) {
      return res.status(400).json({
        status: false,
        message: "All fields are mandatory!",
      });
    }

    const updatedAdmin = await AdminModel.findOneAndUpdate(
      {
        email,
        "questions._id": questionId,
      },
      {
        $set: {
          "questions.$.question": question,
          "questions.$.options": options,
          "questions.$.correct_answer": correct_answer,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Question is not found",
      });
    }

    const updatedQuestion = updatedAdmin.questions.id(questionId);

    return res.status(200).json({
      success: true,
      message: "Question updated!",
      data: updatedQuestion,
    });
  } catch (error) {
    console.log("Error from update question", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { email } = req.user;
    const { questionId } = req.body;

    if (!questionId) {
      return res.status(400).json({
        success: false,
        message: "Question Id is required!",
      });
    }

    const updatedAdmin = await AdminModel.findOneAndUpdate(
      {
        email,
      },
      {
        $pull: {
          questions: { _id: questionId },
        },
      },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found!",
      });
    }

    const isDeletedQuestionExist = updatedAdmin.questions.id(questionId);

    if (isDeletedQuestionExist) {
      return res.status(400).json({
        success: false,
        message: "Question could not be deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your question is successfully deleted!",
    });
  } catch (error) {
    console.log("Error from delete question", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const getQuestionsForCandidate = async (req, res) => {
  try {
    const { adminId, testId } = req.params;
    const admin = await AdminModel.findOne({ _id: adminId });
    const candidate = await CandidateModel.findOne({ testId });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found!",
      });
    }
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Questions not found!",
      });
    }
    const isTestIdMatch = testId === candidate.testId;
    if (!testId || !isTestIdMatch) {
      return res.status(400).json({
        success: false,
        message: "Currently no questions here!",
      });
    }
    const candidateData = {
      name: candidate.candidate.name,
      status: candidate.candidate.status,
      questions: candidate.questions,
    };
    return res.status(200).json({
      success: true,
      message: "Questions fetched!",
      data: candidateData,
    });
  } catch (error) {
    console.log("Error in getQuestionsForCandidate: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const postCandidateName = async (req, res) => {
  try {
    const { name, testId } = req.body;
    const candidateData = await CandidateModel.findOne({ testId });
    candidateData.candidate.name = name;
    candidateData.candidate.status = "in-progress";
    await candidateData.save();
    return res.status(200).json({
      success: true,
      message: "Your name is successfully posted!",
    });
  } catch (error) {
    console.log("Error in postCandidateName: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const postCheckAnswer = async (req, res) => {
  try {
    const { candidateAnswer, testId, questionId } = req.body;
    const candidateData = await CandidateModel.findOne(
      {
        testId,
        "questions._id": questionId,
      },
      {
        "questions.$": 1,
      }
    );
    if (!candidateData) {
      return res.status(404).json({
        success: false,
        message: "Question not found!",
      });
    }
    const question = candidateData.questions[0];
    const status =
      question.correct_answer === candidateAnswer ? "correct" : "incorrect";
    await CandidateModel.updateOne(
      {
        testId,
        "questions._id": questionId,
      },
      {
        $set: {
          "questions.$.candidateAnswer": candidateAnswer,
          "questions.$.status": status,
          "questions.$.attempt": true,
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: "Answer submitted successfully!",
    });
  } catch (error) {
    console.log("Error in postCheckAnswer", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const postGenerateLinkForTest = async (req, res) => {
  try {
    const { email } = req.user;
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found!",
      });
    }
    const questions = admin.questions;
    const data = {
      testId: uuidv4(),
      candidate: {
        name: "",
      },
      questions,
      adminId: admin._id,
    };
    const candidate = await CandidateModel.create(data);
    return res.status(200).json({
      success: true,
      message: "Link Generated successfully!",
      data: candidate,
    });
  } catch (error) {
    console.log("Error in generateLink", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteGeneratedTestLink = async (req, res) => {
  try {
    const { testId } = req.params;
    const candidateData = await CandidateModel.findOne({ testId });
    if (!candidateData) {
      return res.status(404).json({
        success: false,
        message: "Admin not found!",
      });
    }
    await CandidateModel.deleteOne({ testId });
    await TestHistoryModel.deleteOne({ testId });
    return res.status(200).json({
      success: true,
      message: "Record deleted successfully!",
    });
  } catch (error) {
    console.log("Error in deleteGeneratedTestLink", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const postSubmitTest = async (req, res) => {
  try {
    const { testId } = req.body;
    const candidateData = await CandidateModel.findOne({ testId });

    if (!candidateData) {
      return res.status(404).json({
        success: false,
        message: "Data not found!",
      });
    }

    const questions = candidateData.questions;

    let correct = 0;
    let incorrect = 0;
    let unattended = 0;

    for (const q of questions) {
      if (q.status === "unattended") {
        unattended++;
      } else if (q.status === "correct") {
        correct++;
      } else if (q.status === "incorrect") {
        incorrect++;
      }
    }

    candidateData.candidate.status = "completed";
    await candidateData.save();

    await TestHistoryModel.create({
      adminId: candidateData.adminId,
      testId: candidateData.testId,
      candidateName: candidateData.candidate.name,
      totalQuestions: {
        unattended: {
          count: unattended,
        },
        correct: {
          count: correct,
        },
        incorrect: {
          count: incorrect,
        },
      },
    });
    return res.status(200).json({
      success: true,
      message: "Test is completed!",
    });
  } catch (error) {
    console.log("Error in postCheckAnswer", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTestHistory = async (req, res) => {
  try {
    const { email } = req.user;
    const { testId } = req.params;
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found!",
      });
    }
    let history;
    if (testId !== "undefined") {
      history = await TestHistoryModel.findOne({ testId });
    } else {
      history = await TestHistoryModel.find({ adminId: admin._id });
    }
    return res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.log("Error in postCheckAnswer", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getGeneratedLinksForCandidate = async (req, res) => {
  try {
    const { email } = req.user;
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found!",
      });
    }
    const candidatesData = await CandidateModel.find({
      adminId: admin._id,
    });
    return res.status(200).json({
      success: true,
      message: "Data fetched!",
      data: candidatesData,
    });
  } catch (error) {
    console.log("Error in postCheckAnswer", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
