import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { toggleLogoutConfirmationModelVisibility } from "../../redux/slices/quizSlice";
import {
  quizApiSlice,
  useLogoutAdminMutation,
} from "../../redux/slices/quizApiSlice";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ReusableComponents/Button";
import { useCloseOnOutsideOrEsc } from "../../hooks/useCloseOnOutsideOrEsc";

const LogoutConfirmationModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutConfirmationModalRef = useRef<HTMLDivElement | null>(null);
  const logoutConfirmationModelVisibility = useSelector(
    (state: RootState) => state.quizSlice.logoutConfirmationModelVisibility,
  );

  useCloseOnOutsideOrEsc({
    ref: logoutConfirmationModalRef,
    onClose: () => dispatch(toggleLogoutConfirmationModelVisibility()),
    enabled: logoutConfirmationModelVisibility,
  });

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
          className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={logoutConfirmationModalRef}
            className="relative flex flex-col gap-2 justify-between w-[300px] h-fit bg-slate-500/30 backdrop-blur-xs border-2 border-slate-600 rounded-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="sticky top-0 px-4 pt-4">
              <AiOutlineExclamationCircle className="text-6xl text-slate-400" />
              <h4 className="text-lg text-slate-300 sm:text-xl font-semibold">
                You want to logout?
              </h4>
            </div>
            <div className="sticky bottom-0 flex mt-2">
              <div className="px-4 pb-4 flex gap-4">
                <Button
                  onClick={handleCancel}
                  className="flex justify-center items-center mt-2 w-18 sm:w-20 h-7 sm:h-8 text-slate-300 bg-slate-800 border-2 border-slate-500 rounded-md cursor-pointer font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleLogout}
                  className={`flex justify-center items-center w-18 sm:w-20 h-7 sm:h-8 mt-2 ${
                    isLoading ? "bg-slate-400" : "bg-slate-300"
                  }  text-slate-800 border-2 border-slate-800 rounded-md cursor-pointer font-semibold`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin border-2 border-slate-800 border-t-transparent rounded-full w-4 h-4"></span>
                  ) : (
                    "Logout"
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

export default LogoutConfirmationModel;
