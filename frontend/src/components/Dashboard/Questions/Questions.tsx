import { useDispatch } from "react-redux";
import {
  setCurrentQuestion,
  // setQuestionId,
  toggleConfirmationModelVisibility,
  toggleGenerateLinkModelVisibility,
  toggleQuestionModelVisibility,
} from "../../../redux/slices/quizSlice";
import Skeleton from "react-loading-skeleton";
import {
  useGenerateTestLinkMutation,
  useGetQuestionsQuery,
} from "../../../redux/slices/quizApiSlice";
import type { QuestionType } from "../../../Schema";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../lib";
import { Button } from "../../ReusableComponents/Button";
import { motion } from "motion/react";

const Questions = () => {
  const dispatch = useDispatch();
  const initialQuestionValues = {
    _id: "",
    question: "",
    options: ["", "", "", ""],
    correct_answer: "",
  };

  const { data, isLoading } = useGetQuestionsQuery({});

  const handleUpdateQuestion = (question: QuestionType) => {
    dispatch(setCurrentQuestion(question));
    dispatch(toggleQuestionModelVisibility());
  };

  const handleDeleteQuestion = (question: QuestionType) => {
    // dispatch(setQuestionId(id));
    dispatch(setCurrentQuestion(question));
    dispatch(toggleConfirmationModelVisibility());
  };

  const [generateLink, { isLoading: isGenerateLinkLoading }] =
    useGenerateTestLinkMutation();

  const handleGenerateLink = async () => {
    try {
      const res = await generateLink({}).unwrap();
      dispatch(toggleGenerateLinkModelVisibility(res?.data.testId));
    } catch (error: any) {
      toast.error(getErrorMessage(error?.message));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col p-3 h-full rounded-md overflow-hidden"
    >
      <div className="sticky flex flex-col sm:flex-row sm:justify-between sm:items-center top-0">
        <h4 className="text-xl text-slate-300">Here is your Questions</h4>
        <div className="flex gap-2">
          {data?.data.length >= 5 ? (
            <Button
              onClick={() => handleGenerateLink()}
              className="flex justify-center items-center mt-2 w-30 h-8 sm:w-32 sm:h-10 bg-slate-300 rounded-md cursor-pointer font-semibold"
            >
              {isGenerateLinkLoading ? (
                <span className="animate-spin border-2 border-slate-800 border-t-transparent rounded-full w-4 h-4"></span>
              ) : (
                <>
                  <span>Generate Link</span>
                </>
              )}
            </Button>
          ) : null}

          <Button
            onClick={() => {
              // dispatch(setQuestionId(""));
              dispatch(toggleQuestionModelVisibility());
              dispatch(setCurrentQuestion(initialQuestionValues));
            }}
            className="w-30 h-8 sm:w-32 sm:h-10 mt-2 bg-slate-300 rounded-md cursor-pointer font-semibold"
          >
            Add Question
          </Button>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {isLoading &&
          Array(3)
            .fill("")
            .map((_, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col gap-4 w-full h-fit p-3 bg-slate-700 rounded-md"
                >
                  <Skeleton count={1} width="100%" height={25} />
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Skeleton count={1} width="80px" height={24} />
                    <Skeleton count={1} width="80px" height={24} />
                    <Skeleton count={1} width="80px" height={24} />
                    <Skeleton count={1} width="80px" height={24} />
                  </div>
                  <div className="flex gap-4">
                    <Skeleton count={1} width="80px" height={25} />
                    <Skeleton count={1} width="80px" height={25} />
                  </div>
                </div>
              );
            })}
        {data?.data.length > 0 ? (
          data?.data?.map((question: QuestionType, index: number) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-2 p-3 bg-slate-700 rounded-md"
              >
                <h4 className="text-lg sm:text-xl text-slate-300">
                  {`Q.${index + 1}`} {question.question}
                </h4>
                <ol className="flex flex-col sm:flex-row flex-wrap gap-3 list-[upper-alpha] list-inside">
                  {question?.options
                    ?.filter((item) => item.trim() !== "")
                    ?.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="text-[14px] sm:text-[16px] text-slate-300"
                        >
                          {item}
                        </li>
                      );
                    })}
                </ol>
                <div className="flex gap-2 sm:gap-4">
                  <Button
                    onClick={() => handleUpdateQuestion(question)}
                    className="w-fit text-sm sm:text-[16px] mt-2 px-3 sm:px-4 py-1 h-fit bg-slate-300 rounded-md cursor-pointer font-semibold"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteQuestion(question)}
                    className="w-fit mt-2 text-sm sm:text-[16px] px-3 sm:px-4 py-1 h-fit bg-slate-900 text-white rounded-md cursor-pointer font-semibold"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p className="text-slate-300">Currently there is no question!</p>
          </div>
        )}
        <div className="flex justify-center">
          <p
            onClick={() => {
              // dispatch(setQuestionId(""));
              dispatch(toggleQuestionModelVisibility());
              dispatch(setCurrentQuestion(initialQuestionValues));
            }}
            className="flex w-fit text-slate-300 cursor-pointer"
            title="You can add more questions."
          >
            + Add more question
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Questions;
