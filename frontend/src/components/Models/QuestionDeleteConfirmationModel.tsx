import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import {
  // setQuestionId,
  toggleConfirmationModelVisibility,
} from "../../redux/slices/quizSlice";
import { useDeleteQuestionMutation } from "../../redux/slices/quizApiSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";

const QuestionDeleteConfirmationModel = () => {
  const dispatch = useDispatch();
  const question = useSelector((state: RootState) => state.quizSlice.question);
  const confirmationModelVisibility = useSelector(
    (state: RootState) => state.quizSlice.confirmationModelVisibility
  );

  const handleCancel = () => {
    dispatch(toggleConfirmationModelVisibility());
  };

  const [deleteQuestion, { isSuccess, isError, isLoading }] =
    useDeleteQuestionMutation();

  const handleDelete = async (questionId: string | undefined) => {
    if (questionId) {
      try {
        const res = await deleteQuestion({ questionId }).unwrap();
        console.log(res);
      } catch (error) {
        console.log("Delete failed", error);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("This question is successfully deleted!");
      dispatch(toggleConfirmationModelVisibility());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError]);

  return (
    <AnimatePresence>
      {confirmationModelVisibility ? (
        <motion.div
          className="fixed inset-0 flex justify-center items-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative flex flex-col gap-2 justify-between w-[400px] h-fit bg-slate-300 rounded-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <div className="sticky top-0 px-4 pt-4">
              <AiOutlineExclamationCircle className="text-6xl text-slate-700" />
              <h4 className="text-xl font-semibold">
                You want to delete this question?
              </h4>
            </div>
            <div className="px-4">
              <p className="text-lg">Q. {question?.question}</p>
              <ol className="flex flex-col ml-4 gap-1 list-disc list-inside">
                {question?.options
                  ?.filter((item) => item.trim() !== "")
                  .map((item, index) => {
                    return (
                      <li key={index} className="text-sm">
                        {item}
                      </li>
                    );
                  })}
              </ol>
            </div>
            <div className="sticky bottom-0 border-t border-t-zinc-400 flex mt-2">
              <div className="px-4 pb-4 flex gap-4">
                <button
                  onClick={handleCancel}
                  className="w-fit mt-2 px-4 py-1 bg-slate-300 border border-slate-800 rounded-md cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(question?._id)}
                  className={`flex justify-center items-center w-20 mt-2 px-4 py-1 ${
                    isLoading ? "bg-slate-600" : "bg-slate-800"
                  }  text-slate-300 rounded-md cursor-pointer font-semibold`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin border-2 border-slate-300 border-t-transparent rounded-full w-4 h-4"></span>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default QuestionDeleteConfirmationModel;
