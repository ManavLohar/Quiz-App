import { useFormik } from "formik";
import { CiLogin } from "react-icons/ci";
import { adminLoginFormSchema } from "../../Schema/formValidationSchema";
import { useAdminLoginMutation } from "../../redux/slices/quizApiSlice";
import { useEffect } from "react";
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
import { Button } from "../ReusableComponents/Button";

const AdminSignInModel = () => {
  const dispatch = useDispatch();

  const loginModelVisibility = useSelector(
    (state: RootState) => state.quizSlice.loginModelVisibility
  );

  const initialValues = {
    email: "",
    password: "",
  };

  const [adminLogin, { isLoading, isError, error, isSuccess }] =
    useAdminLoginMutation();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: adminLoginFormSchema,
      onSubmit: async (values, { resetForm }) => {
        const res = await adminLogin(values);
        if (res?.data.success) resetForm();
      },
    });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully!");
      dispatch(toggleLoginModelVisibility());
    }
    if (isError) {
      toast.error(getErrorMessage(error));
    }
  }, [isError, error, isSuccess]);

  return (
    <AnimatePresence>
      {loginModelVisibility ? (
        <motion.div
          className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black/70 backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative flex flex-col gap-2 justify-between w-[300px] sm:w-[400px] h-fit bg-slate-500/30 backdrop-blur-xs border-2 border-slate-500 rounded-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            <TfiClose
              onClick={() => {
                dispatch(toggleLoginModelVisibility());
              }}
              className="absolute top-4 right-4 text-2xl text-slate-300 cursor-pointer font-light"
            />
            <div className="flex flex-col p-4 pb-0">
              <CiLogin className="text-4xl text-slate-400 sm:text-6xl" />
              <h4 className="text-xl text-slate-300 font-semibold">Sign In</h4>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col mt-2 pb-4 gap-3"
            >
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
                <Button
                  type="submit"
                  className="flex justify-center items-center gap-2 mt-2 w-18 h-8 bg-slate-900 border-2 border-slate-500 text-white rounded-md cursor-pointer font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                  ) : (
                    <>
                      <span>Sign In</span>
                    </>
                  )}
                </Button>
                <p className="text-xs font-semibold text-slate-300 mt-2">
                  If you don't have an account?{" "}
                  <span
                    onClick={() => {
                      dispatch(toggleLoginModelVisibility());
                      dispatch(toggleSignUpModelVisibility());
                    }}
                    className="text-blue-400 cursor-pointer"
                  >
                    Sign Up!
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

export default AdminSignInModel;
