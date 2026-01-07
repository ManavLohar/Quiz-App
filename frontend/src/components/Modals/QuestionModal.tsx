import { TfiClose } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentQuestion,
  toggleQuestionModelVisibility,
} from "../../redux/slices/quizSlice";
import { useFormik } from "formik";
import { formValidationSchema } from "../../Schema/formValidationSchema";
import {
  usePostQuestionMutation,
  useUpdateQuestionMutation,
} from "../../redux/slices/quizApiSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import type { RootState } from "../../redux/store";
import { motion, AnimatePresence } from "motion/react";

const QuestionModal = () => {
  const dispatch = useDispatch();
  const initialValues = {
    _id: "",
    question: "",
    options: ["", "", "", ""],
    correct_answer: "",
  };
  const questionModelVisibility = useSelector(
    (state: RootState) => state.quizSlice.questionModelVisibility
  );
  const selectedQuestion = useSelector(
    (state: RootState) => state.quizSlice.question
  );

  const isEditMode = Boolean(selectedQuestion?._id);

  const [postQuestion, { isLoading, isSuccess, isError }] =
    usePostQuestionMutation();
  const [
    updateQuestion,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
    },
  ] = useUpdateQuestionMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Your question is successfully posted!");
      dispatch(toggleQuestionModelVisibility());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
    if (isUpdateSuccess) {
      toast.success("Your question is successfully updated!");
      dispatch(toggleQuestionModelVisibility());
      dispatch(setCurrentQuestion(initialValues));
    }
    if (isUpdateError) {
      toast.error("Something went wrong?");
    }
  }, [isSuccess, isUpdateSuccess, isError, isUpdateError, dispatch]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: selectedQuestion ?? initialValues,
      validationSchema: formValidationSchema,
      onSubmit: async (values, { resetForm }) => {
        const newQuestion = {
          ...values,
        };
        if (isEditMode) {
          const res = await updateQuestion(newQuestion);
          console.log(res);
        } else {
          const res = await postQuestion(newQuestion);
          console.log(res);
        }
        resetForm();
      },
    });
  return (
    <AnimatePresence>
      {questionModelVisibility ? (
        <motion.div
          className="fixed inset-0 flex justify-center items-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="flex flex-col h-fit w-[300px] sm:w-[450px] bg-slate-300 rounded-md p-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <div className="flex justify-between">
              <h2 className="text-xl">
                {isEditMode ? "Edit Question" : "Add Question"}
              </h2>
              <TfiClose
                onClick={() => {
                  dispatch(toggleQuestionModelVisibility());
                  dispatch(setCurrentQuestion(initialValues));
                }}
                className="text-2xl cursor-pointer font-light"
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col mt-2 gap-2 sm:gap-3"
            >
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor=""
                  className="text-[12px] sm:text-[14px] text-slate-600 font-semibold"
                >
                  Question
                </label>
                <input
                  className="border border-slate-500 p-0.5 sm:p-1 rounded-md outline-none"
                  type="text"
                  name="question"
                  value={values.question}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.question && errors.question ? (
                  <p className="text-red-600 text-[12px]">{errors.question}</p>
                ) : null}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor=""
                  className="text-[12px] sm:text-[14px] text-slate-600 font-semibold"
                >
                  Options
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {values.options.map((item, index) => {
                    return (
                      <input
                        key={index}
                        name={`options[${index}]`}
                        value={item}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        type="text"
                        className="border border-slate-500 p-0.5 sm:p-1 rounded-md outline-none w-full placeholder:text-[12px]"
                        placeholder={`Option ${index + 1}`}
                      />
                    );
                  })}
                </div>
                {touched.options && typeof errors.options === "string" && (
                  <p className="text-red-600 text-[12px]">{errors.options}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor=""
                  className="text-[12px] sm:text-[14px] text-slate-600 font-semibold"
                >
                  Correct Answer
                </label>
                <input
                  type="text"
                  name="correct_answer"
                  value={values.correct_answer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border border-slate-500 p-0.5 sm:p-1 rounded-md outline-none"
                />
                {touched.correct_answer && errors.correct_answer ? (
                  <p className="text-red-600 text-[12px]">
                    {errors.correct_answer}
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                className="flex justify-center items-center gap-2 mt-2 w-15 h-8 bg-slate-900 text-white rounded-md cursor-pointer font-semibold"
                disabled={isLoading || isUpdateLoading}
              >
                {isLoading || isUpdateLoading ? (
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                ) : (
                  <>
                    <span>{isEditMode ? "Edit" : "Add"}</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default QuestionModal;
