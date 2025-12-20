import { useDispatch } from "react-redux";
import {
  setCurrentQuestion,
  setQuestionId,
  toggleConfirmationModelVisibility,
  toggleQuestionModelVisibility,
} from "../../../redux/slices/quizSlice";
import Skeleton from "react-loading-skeleton";
import { useGetQuestionsQuery } from "../../../redux/slices/quizApiSlice";
import type { QuestionType } from "../../../Schema";

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

  const handleDeleteQuestion = (id: any) => {
    dispatch(setQuestionId(id));
    dispatch(toggleConfirmationModelVisibility());
  };
  return (
    <div className="flex flex-col p-3 h-full rounded-md overflow-hidden">
      <div className="sticky flex justify-between items-center top-0">
        <h4 className="text-xl text-slate-300">Here is your Questions</h4>
        <button
          onClick={() => {
            dispatch(setQuestionId(""));
            dispatch(toggleQuestionModelVisibility());
            dispatch(setCurrentQuestion(initialQuestionValues));
          }}
          className="w-fit mt-2 px-4 py-1 bg-slate-300 rounded-md cursor-pointer font-semibold"
        >
          Add Question
        </button>
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
                  <div className="flex gap-2">
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
                <h4 className="text-xl text-slate-300">
                  {`Q.${index + 1}`} {question.question}
                </h4>
                <ol className="flex flex-wrap gap-3 list-decimal list-inside">
                  {question?.options
                    ?.filter((item) => item.trim() !== "")
                    ?.map((item, index) => {
                      return (
                        <li key={index} className="text-slate-300">
                          {item}
                        </li>
                      );
                    })}
                </ol>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleUpdateQuestion(question)}
                    className="w-fit mt-2 px-4 py-1 bg-slate-300 rounded-md cursor-pointer font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(question._id)}
                    className="w-fit mt-2 px-4 py-1 bg-slate-900 text-white rounded-md cursor-pointer font-semibold"
                  >
                    Delete
                  </button>
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
              dispatch(setQuestionId(""));
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
    </div>
  );
};

export default Questions;
