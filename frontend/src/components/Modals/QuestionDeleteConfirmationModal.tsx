import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import {
  // setQuestionId,
  toggleConfirmationModelVisibility,
} from "../../redux/slices/quizSlice";
import { useDeleteQuestionMutation } from "../../redux/slices/quizApiSlice";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ReusableComponents/Button";
import { useCloseOnOutsideOrEsc } from "../../hooks/useCloseOnOutsideOrEsc";

const QuestionDeleteConfirmationModel = () => {
  const dispatch = useDispatch();
  const questionDeleteConfirmationModalRef = useRef<HTMLDivElement | null>(
    null,
  );
  const question = useSelector((state: RootState) => state.quizSlice.question);
  const confirmationModelVisibility = useSelector(
    (state: RootState) => state.quizSlice.confirmationModelVisibility,
  );

  useCloseOnOutsideOrEsc({
    ref: questionDeleteConfirmationModalRef,
    onClose: () => dispatch(toggleConfirmationModelVisibility()),
    enabled: confirmationModelVisibility,
  });

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
      toast.success("Question deleted!");
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
          className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={questionDeleteConfirmationModalRef}
            className="relative flex flex-col gap-2 justify-between w-[300px] sm:w-[400px] h-fit bg-slate-500/30 backdrop-blur-xs rounded-md border-2 border-slate-600"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="sticky top-0 px-4 pt-4">
              <AiOutlineExclamationCircle className="text-4xl sm:text-6xl text-slate-400" />
              <h4 className="text-xl font-semibold text-slate-300">
                You want to delete this question?
              </h4>
            </div>
            <div className="px-4">
              <p className="text-sm text-slate-300 sm:text-lg">
                Q. {question?.question}
              </p>
              <ol className="flex flex-col ml-4 gap-1 list-disc list-inside">
                {question?.options
                  ?.filter((item) => item.trim() !== "")
                  .map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="text-[12px] text-slate-300 sm:text-sm"
                      >
                        {item}
                      </li>
                    );
                  })}
              </ol>
            </div>
            <div className="sticky bottom-0 flex mt-2">
              <div className="px-4 pb-4 flex gap-2 sm:gap-4">
                <Button
                  onClick={handleCancel}
                  className="flex justify-center items-center mt-2 w-18 sm:w-20 h-7 sm:h-8 text-slate-300 bg-slate-800 border-2 border-slate-500 rounded-md cursor-pointer font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleDelete(question?._id)}
                  className={`flex justify-center items-center w-18 sm:w-20 h-7 sm:h-8 mt-2 ${
                    isLoading ? "bg-slate-400" : "bg-slate-300"
                  }  text-slate-800 border-2 border-slate-800 rounded-md cursor-pointer font-semibold`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin border-2 border-slate-800 border-t-transparent rounded-full w-4 h-4"></span>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default QuestionDeleteConfirmationModel;
