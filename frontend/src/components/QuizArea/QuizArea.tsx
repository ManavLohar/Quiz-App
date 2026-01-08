import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import {
  useGetQuestionsForCandidateQuery,
  usePostCandidateNameMutation,
  usePostCheckAnswerMutation,
  usePostSubmitTestMutation,
} from "../../redux/slices/quizApiSlice";
import toast, { Toaster } from "react-hot-toast";
import { getErrorMessage } from "../../lib";
import { setNextAndPreviousNumber } from "../../redux/slices/quizSlice";

const QuizArea = () => {
  const dispatch = useDispatch();
  const [candidateName, setCandidateName] = useState<string>("");
  const { adminId, testId } = useParams();

  const {
    data: candidateData,
    isError,
    isLoading,
  } = useGetQuestionsForCandidateQuery({
    adminId,
    testId,
  });

  const questionIndex = useSelector(
    (state: RootState) => state.quizSlice.questionNumber
  );
  const questionLength = candidateData?.data.questions.length;
  const isQuestionEnd = questionLength === questionIndex + 1 ? true : false;
  const isCandidateAnsweredAllQuestions = candidateData?.data.questions.every(
    (item: any) => item.status !== "unattended"
  );

  const [postCandidateName] = usePostCandidateNameMutation();

  const handlePostCandidateName = async () => {
    if (candidateName.length >= 2) {
      try {
        await postCandidateName({
          name: candidateName,
          testId,
        }).unwrap();
      } catch (error) {
        console.log("Something went wrong!", error);
      }
    } else {
      toast.error(
        getErrorMessage({
          data: {
            message: "Please provide atleast two or more letter for name!",
          },
        })
      );
    }
  };

  const [postCheckAnswer, { error }] = usePostCheckAnswerMutation();

  const handleOptionClick = async (
    candidateAnswer: string,
    questionId: string
  ) => {
    try {
      const data = { candidateAnswer, testId, questionId, adminId };
      await postCheckAnswer(data).unwrap();
    } catch (err) {
      toast.error(getErrorMessage(error));
    }
  };

  const [
    postSubmitTest,
    { error: submitTestError, isLoading: submitTestLoading },
  ] = usePostSubmitTestMutation();

  const handleSubmitTest = async () => {
    try {
      await postSubmitTest({ testId: testId }).unwrap();
    } catch (error) {
      toast.error(getErrorMessage(submitTestError));
    }
  };

  return (
    <div className="flex h-screen justify-center items-center w-full bg-slate-800">
      {isLoading ? (
        <p className="text-slate-300 text-center">Loading...</p>
      ) : !testId || isError ? (
        <p className="text-slate-300 text-2xl text-center">
          Currently no questions here!
        </p>
      ) : candidateData?.data.status === "completed" ? (
        <p className="text-2xl text-slate-300 text-center">
          This test is successfully submited!
        </p>
      ) : !candidateData?.data.name ? (
        <div className="w-[300px] sm:w-[350px] bg-slate-500/30 backdrop-blur-xs border-2 border-slate-600 rounded-md">
          <div className="p-4 py-2">
            <h4 className="text-xl text-slate-300">Enter your name</h4>
          </div>
          <div className="px-4 py-2">
            <input
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="border-2 border-slate-500 text-slate-300 p-0.5 sm:p-1 rounded-md outline-none w-full"
              type="name"
            />
          </div>
          <div className="px-4 py-2">
            <button
              onClick={handlePostCandidateName}
              type="submit"
              className="px-4 py-1 w-fit text-lg bg-slate-800 text-slate-300 border-2 border-slate-500 rounded-lg cursor-pointer"
            >
              Start
            </button>
          </div>
        </div>
      ) : (
        <div className="sm:min-h-[300px] flex flex-col gap-4 w-[300px] sm:w-full sm:max-w-[500px] bg-slate-300/10 backdrop-blur-xs border-2 border-slate-600 p-4 rounded-lg">
          <h4 className="text-lg text-slate-300">
            {candidateData?.data.questions[questionIndex].question}
          </h4>
          <ul className="flex flex-col gap-2">
            {candidateData?.data.questions[questionIndex].options.map(
              (item: any, index: number) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      handleOptionClick(
                        item,
                        candidateData?.data.questions[questionIndex]._id
                      );
                      // setCorrectAnswer(item);
                    }}
                    className={`p-1 sm:p-2 border-2 border-slate-600 rounded text-[12px] text-slate-300 sm:text-sm cursor-pointer text-left
                   ${
                     // candidateData?.data.questions[questionIndex].attempt ===
                     //  "unattended"
                     //    ? "border-slate-400"
                     //    : item ===
                     //      candidateData?.data.questions[questionIndex]
                     //        .correct_answer
                     //    ? "border-green-500 bg-[#50ff5036]"
                     //    : item ===
                     //      candidateData?.data.questions[questionIndex]
                     //        .candidateAnswer
                     //    ? "border-red-500 bg-[#ff00001a]"
                     //    : "border-slate-400"
                     candidateData?.data.questions[questionIndex]
                       .candidateAnswer === item
                       ? "border-blue-500 bg-slate-600"
                       : "border-slate-400"
                   }
                    `}
                    disabled={
                      candidateData?.data.questions[questionIndex].attempt
                    }
                  >
                    {item}
                  </button>
                );
              }
            )}
          </ul>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={handleSubmitTest}
                type="button"
                className={`flex justify-center items-center border-2 border-slate-500 px-3 py-1 w-30 h-8 text-[16px] ${
                  isQuestionEnd || isCandidateAnsweredAllQuestions
                    ? "bg-slate-800"
                    : " bg-slate-600"
                } text-slate-300 font-semibold rounded-lg cursor-pointer`}
                disabled={!isQuestionEnd && !isCandidateAnsweredAllQuestions}
              >
                {submitTestLoading ? (
                  <span className="animate-spin border-2 border-slate-300 border-t-transparent rounded-full w-4 h-4"></span>
                ) : (
                  "Submit Test"
                )}
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => dispatch(setNextAndPreviousNumber("dec"))}
                type="button"
                className="px-2 py-1 w-fit text-lg border-2 font-extrabold border-slate-400 text-slate-400 rounded-lg cursor-pointer"
                disabled={questionIndex + 1 === 1 ? true : false}
              >
                {"<"}
              </button>
              <p className="font-semibold w-10 text-slate-400 text-center">
                {questionIndex + 1}/{questionLength}
              </p>
              <button
                onClick={() => dispatch(setNextAndPreviousNumber("inc"))}
                type="button"
                className="px-2 py-1 w-fit text-lg border-2 font-extrabold border-slate-400 text-slate-400 rounded-lg cursor-pointer"
                disabled={isQuestionEnd}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default QuizArea;
