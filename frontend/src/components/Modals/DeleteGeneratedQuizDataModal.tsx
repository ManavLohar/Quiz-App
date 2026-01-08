import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { toggleDeleteGeneratedQuizDataVisibility } from "../../redux/slices/quizSlice";
import { useDeleteGeneratedTestLinkMutation } from "../../redux/slices/quizApiSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";

const DeleteGeneratedQuizDataModel = () => {
  const dispatch = useDispatch();
  const deleteGeneratedQuizDataVisibility = useSelector(
    (state: RootState) => state.quizSlice.deleteGeneratedQuizDataVisibility
  );
  const generatedLinkId = useSelector(
    (state: RootState) => state.quizSlice.generatedLinkId
  );

  const handleCancel = () => {
    dispatch(toggleDeleteGeneratedQuizDataVisibility(""));
  };

  const [deleteQuizData, { isLoading, isSuccess, isError }] =
    useDeleteGeneratedTestLinkMutation();

  const handleDelete = async () => {
    try {
      await deleteQuizData({ testId: generatedLinkId }).unwrap();
    } catch (error: any) {
      console.log("Something went wrong: ", error.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Record deleted successfully!");
      dispatch(toggleDeleteGeneratedQuizDataVisibility(""));
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, dispatch]);
  return (
    <AnimatePresence>
      {deleteGeneratedQuizDataVisibility ? (
        <motion.div
          className="fixed inset-0 flex justify-center items-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative flex flex-col gap-2 justify-between w-[300px] sm:w-[400px] h-fit bg-slate-500/30 backdrop-blur-xs rounded-md border-2 border-slate-600"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="sticky top-0 px-4 pt-4">
              <AiOutlineExclamationCircle className="text-6xl text-slate-400" />
              <h4 className="text-[16px] text-slate-300 sm:text-xl font-semibold">
                You want to delete this Quiz?
              </h4>
            </div>
            <div className="sticky bottom-0 flex sm:mt-2">
              <div className="px-4 pb-4 flex gap-2 sm:gap-4">
                <button
                  onClick={handleCancel}
                  className="flex justify-center items-center mt-2 w-18 sm:w-20 h-7 sm:h-8 text-slate-300 bg-slate-800 border-2 border-slate-500 rounded-md cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className={`flex justify-center items-center w-18 sm:w-20 h-7 sm:h-8 mt-2 ${
                    isLoading ? "bg-slate-400" : "bg-slate-300"
                  }  text-slate-800 border-2 border-slate-800 rounded-md cursor-pointer font-semibold`}
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

export default DeleteGeneratedQuizDataModel;
