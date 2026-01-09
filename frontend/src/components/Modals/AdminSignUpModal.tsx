import { useFormik } from "formik";
import { CiLogin } from "react-icons/ci";
import { adminSignUpFormSchema } from "../../Schema/formValidationSchema";
import { useAdminSignUpMutation } from "../../redux/slices/quizApiSlice";
import toast from "react-hot-toast";
import { TfiClose } from "react-icons/tfi";
import {
  toggleLoginModelVisibility,
  toggleSignUpModelVisibility,
} from "../../redux/slices/quizSlice";
import { useDispatch, useSelector } from "react-redux";
import { getErrorMessage } from "../../lib";
import { AnimatePresence, motion } from "motion/react";
import type { RootState } from "../../redux/store";

const AdminSignUpModal = () => {
  const dispatch = useDispatch();

  const signUpModalVisibility = useSelector(
    (state: RootState) => state.quizSlice.signUpModalVisibility
  );

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const [adminSignUp, { isLoading }] = useAdminSignUpMutation();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: adminSignUpFormSchema,
      onSubmit: async (values, { resetForm }) => {
        try {
          const res = await adminSignUp(values).unwrap();
          toast.success(res?.message);
          dispatch(toggleLoginModelVisibility());
          dispatch(toggleSignUpModelVisibility());
          resetForm();
        } catch (error: any) {
          toast.error(getErrorMessage(error));
        }
      },
    });

  return (
    <AnimatePresence>
      {signUpModalVisibility ? (
        <motion.div
          className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative flex flex-col gap-2 justify-between w-[300px] sm:w-[400px] h-fit bg-slate-500/30 backdrop-blur-xs border-2 border-slate-600 rounded-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            <TfiClose
              onClick={() => {
                dispatch(toggleSignUpModelVisibility());
              }}
              className="absolute top-4 right-4 text-2xl text-slate-300 cursor-pointer font-light"
            />
            <div className="flex flex-col p-4 pb-0">
              <CiLogin className="text-4xl text-slate-400 sm:text-6xl" />
              <h4 className="text-xl text-slate-300 font-semibold">Sign Up</h4>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col mt-2 pb-4 gap-3"
            >
              <div className="flex flex-col gap-2 w-full px-4">
                <label className="text-[12px] sm:text-[14px] text-slate-400 font-semibold">
                  Name
                </label>
                <input
                  className="border-2 text-slate-300 border-slate-500 p-0.5 sm:p-1 rounded-md outline-none"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name ? (
                  <p className="text-red-600 text-[12px]">{errors.name}</p>
                ) : null}
              </div>
              <div className="flex flex-col gap-2 w-full px-4">
                <label className="text-[12px] sm:text-[14px] text-slate-400 font-semibold">
                  Email
                </label>
                <input
                  className="border-2 text-slate-300 border-slate-500 p-0.5 sm:p-1 rounded-md outline-none"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email ? (
                  <p className="text-red-600 text-[12px]">{errors.email}</p>
                ) : null}
              </div>
              <div className="flex flex-col gap-2 w-full px-4">
                <label className="text-[12px] sm:text-[14px] text-slate-400 font-semibold">
                  Password
                </label>
                <input
                  className="border-2 border-slate-500 text-slate-300 p-0.5 sm:p-1 rounded-md outline-none"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password ? (
                  <p className="text-red-600 text-[12px]">{errors.password}</p>
                ) : null}
              </div>
              <div className="px-4">
                <button
                  type="submit"
                  className="flex justify-center items-center gap-2 mt-2 w-18 h-8 bg-slate-900 border-2 border-slate-500 text-white rounded-md cursor-pointer font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                  ) : (
                    <>
                      <span>Sign Up</span>
                    </>
                  )}
                </button>
                <p className="text-xs font-semibold text-slate-300 mt-2">
                  If you already have an account?{" "}
                  <span
                    onClick={() => {
                      dispatch(toggleLoginModelVisibility());
                      dispatch(toggleSignUpModelVisibility());
                    }}
                    className="text-blue-400 cursor-pointer"
                  >
                    Sign In!
                  </span>
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default AdminSignUpModal;
