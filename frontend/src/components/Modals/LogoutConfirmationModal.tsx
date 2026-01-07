import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { toggleLogoutConfirmationModelVisibility } from "../../redux/slices/quizSlice";
import {
  quizApiSlice,
  useLogoutAdminMutation,
} from "../../redux/slices/quizApiSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const LogoutConfirmationModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutConfirmationModelVisibility = useSelector(
    (state: RootState) => state.quizSlice.logoutConfirmationModelVisibility
  );
  const handleCancel = () => {
    dispatch(toggleLogoutConfirmationModelVisibility());
  };

  const [logoutAdmin, { isSuccess, isError, isLoading }] =
    useLogoutAdminMutation();

  const handleLogout = async () => {
    try {
      await logoutAdmin({}).unwrap();
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logout successfully!");
      dispatch(toggleLogoutConfirmationModelVisibility());
      dispatch(quizApiSlice.util.resetApiState());
      navigate("/", { replace: true });
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, dispatch, navigate]);

  return (
    <AnimatePresence>
      {logoutConfirmationModelVisibility ? (
        <motion.div
          className="fixed inset-0 flex justify-center items-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative flex flex-col gap-2 justify-between w-[300px] h-fit bg-slate-300 rounded-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <div className="sticky top-0 px-4 pt-4">
              <AiOutlineExclamationCircle className="text-6xl text-slate-700" />
              <h4 className="text-lg sm:text-xl font-semibold">
                You want to logout?
              </h4>
            </div>
            <div className="sticky bottom-0 flex mt-2">
              <div className="px-4 pb-4 flex gap-4">
                <button
                  onClick={handleCancel}
                  className="w-fit mt-2 px-4 py-1 bg-slate-300 border border-slate-800 rounded-md cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className={`flex justify-center items-center w-20 mt-2 px-4 py-1 ${
                    isLoading ? "bg-slate-600" : "bg-slate-800"
                  }  text-slate-300 rounded-md cursor-pointer font-semibold`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin border-2 border-slate-300 border-t-transparent rounded-full w-4 h-4"></span>
                  ) : (
                    "Logout"
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

export default LogoutConfirmationModel;
