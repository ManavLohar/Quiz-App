import { NavLink, useNavigate } from "react-router-dom";
import { useGetAdminQuery } from "../../redux/slices/quizApiSlice";
import { IoIosArrowDown, IoMdArrowDropdown } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleLoginModelVisibility,
  toggleLogoutConfirmationModelVisibility,
} from "../../redux/slices/quizSlice";
import LogoutConfirmationModel from "../Modals/LogoutConfirmationModal";
import type { RootState } from "../../redux/store";
import AdminLoginModel from "../Modals/AdminLoginModal";
import quizLogo from "../../assets/quiz-logo.png";
import GenerateLinkModel from "../Modals/GenerateLinkModal";
import TestResultModel from "../Modals/TestResultModal";
import QuestionModal from "../Modals/QuestionModal";
import QuestionDeleteConfirmationModel from "../Modals/QuestionDeleteConfirmationModal";
import DeleteGeneratedQuizDataModel from "../Modals/DeleteGeneratedQuizDataModal";
import { AnimatePresence, motion } from "motion/react";
import { TfiClose } from "react-icons/tfi";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginModelVisibility = useSelector(
    (state: RootState) => state.quizSlice.loginModelVisibility
  );
  const { data: adminData, isLoading } = useGetAdminQuery({});

  const [menuListToggle, setMenuListToggle] = useState<Boolean>(false);
  const [subMenuToggle, setSubMenuToggle] = useState<Boolean>(false);

  useGSAP(() => {
    // gsap.from(".dashboardBtn", {
    //   opacity: 0,
    //   y: 30,
    //   duration: 1,
    //   stagger: 0.1,
    // });
  });

  if (isLoading) {
    return (
      <div className="fixed flex justify-center items-center h-screen w-full bg-slate-800">
        <p className="text-lg text-slate-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative z-10 flex items-center justify-between h-[10vh] w-full p-2 px-2 sm:px-4 bg-gray-800 border-b border-slate-600">
      <div className="flex-1 flex justify-left">
        <p className="text-slate-300">
          <img className="h-14" src={quizLogo} alt="" />
        </p>
      </div>
      {/* <h1 className="flex-1 flex justify-center text-2xl uppercase text-slate-300">
        Quiz Game
      </h1> */}
      {/* For large devices */}
      <div className="hidden sm:flex-1 sm:flex justify-end">
        {adminData ? (
          <div className="relative">
            <div
              onClick={() => setMenuListToggle(!menuListToggle)}
              className="flex gap-2 p-2 bg-slate-700 rounded-md items-center cursor-pointer"
            >
              <p className="h-8 w-8 bg-slate-300 rounded-full flex justify-center items-center">
                {adminData?.data.name.slice("")[0]}
              </p>
              <p className="text-slate-300">{adminData?.data.name}</p>
              <span>
                <IoMdArrowDropdown className="text-slate-300" />
              </span>
            </div>
            {menuListToggle && (
              <div className="absolute flex flex-col border border-slate-600 items-start top-14 bg-slate-700/60 backdrop-blur-xs overflow-hidden w-45 right-0 rounded-md">
                <button
                  onClick={() => {
                    navigate("/");
                    setMenuListToggle(!menuListToggle);
                  }}
                  className="flex gap-2 items-center border-none text-slate-300 p-2 cursor-pointer w-full text-left transition duration-500 hover:bg-slate-500 font-semibold"
                >
                  <span>
                    <IoHomeOutline />
                  </span>
                  Home
                </button>
                <hr className="w-full text-slate-600" />
                <button
                  onClick={() => {
                    navigate("/dashboard/questions");
                    setMenuListToggle(!menuListToggle);
                  }}
                  className="flex gap-2 items-center border-none text-slate-300 p-2 cursor-pointer w-full text-left transition duration-500 hover:bg-slate-500 font-semibold"
                >
                  <span>
                    <RxDashboard />
                  </span>
                  Dashboard
                </button>
                <hr className="w-full text-slate-600" />
                <button
                  onClick={() => {
                    dispatch(toggleLogoutConfirmationModelVisibility());
                    setMenuListToggle(!menuListToggle);
                  }}
                  className="flex gap-2 items-center border-none text-slate-300 p-2 cursor-pointer w-full text-left transition duration-500 hover:bg-slate-500 font-semibold"
                >
                  <span>
                    <FiLogOut />
                  </span>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => dispatch(toggleLoginModelVisibility())}
            className="bg-slate-300 px-3 py-1 rounded-md font-semibold cursor-pointer"
          >
            Login
          </button>
        )}
      </div>

      {/* For small devices */}
      {adminData ? (
        <>
          <div className="sm:hidden">
            <FaBarsStaggered
              onClick={() => setMenuListToggle(true)}
              size={24}
              className="text-slate-300"
            />
          </div>
          <AnimatePresence>
            {menuListToggle ? (
              <motion.div
                className="fixed sm:hidden inset-0 flex justify-end items-center bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", duration: 0.2, damping: 18 }}
                  className="relative w-[300px] bg-slate-800/60 backdrop-blur-lg h-full"
                >
                  <div className="absolute top-5 left-4 z-10">
                    <TfiClose
                      onClick={() => {
                        setMenuListToggle(false);
                        setSubMenuToggle(false);
                      }}
                      className="cursor-pointer text-slate-300"
                      size={24}
                    />
                  </div>
                  <div className="flex h-full flex-col justify-between p-2">
                    <div className="flex justify-end">
                      <img className="h-14" src={quizLogo} alt="" />
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <h4
                        onClick={() => {
                          navigate("/");
                          setMenuListToggle(false);
                          setSubMenuToggle(false);
                        }}
                        className="flex justify-end text-xl text-slate-300 font-bold p-2 bg-slate-500/30 rounded-md w-full"
                      >
                        Home
                      </h4>
                      <div
                        onClick={() => setSubMenuToggle(!subMenuToggle)}
                        className="relative overflow-hidden flex flex-col bg-slate-500/30 rounded-md w-full p-2"
                      >
                        <h4 className="flex justify-between items-center text-xl text-slate-300 font-bold">
                          <IoIosArrowDown
                            className={`duration-300 ${
                              subMenuToggle ? "rotate-180" : ""
                            }`}
                          />
                          Dashboard
                        </h4>
                        <AnimatePresence>
                          {subMenuToggle ? (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "fit-content" }}
                              exit={{ height: 0 }}
                            >
                              <ul className="flex flex-col gap-1 pt-1 items-end">
                                <NavLink
                                  to={"/dashboard/questions"}
                                  onClick={() => setMenuListToggle(false)}
                                  className=" text-slate-300"
                                >
                                  Questions
                                </NavLink>
                                <NavLink
                                  to={"/dashboard/generated-quizzes"}
                                  onClick={() => setMenuListToggle(false)}
                                  className=" text-slate-300"
                                >
                                  Generated Quizzes
                                </NavLink>
                              </ul>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div
                        onClick={() => setMenuListToggle(!menuListToggle)}
                        className="flex justify-end gap-2 rounded-md items-center cursor-pointer"
                      >
                        <p className="h-12 w-12 bg-slate-300 rounded-full text-xl flex justify-center items-center">
                          {adminData?.data.name.slice("")[0]}
                        </p>
                        <p className="text-slate-300 font-semibold text-xl">
                          {adminData?.data.name}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            dispatch(toggleLogoutConfirmationModelVisibility());
                            setMenuListToggle(!menuListToggle);
                          }}
                          className="flex gap-2 items-center border-none text-slate-300 cursor-pointer font-semibold"
                        >
                          <span>
                            <FiLogOut />
                          </span>
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </>
      ) : (
        <button
          onClick={() => dispatch(toggleLoginModelVisibility())}
          className="sm:hidden bg-slate-300 px-3 py-1 rounded-md font-semibold cursor-pointer"
        >
          Login
        </button>
      )}
      {loginModelVisibility ? <AdminLoginModel /> : null}
      <LogoutConfirmationModel />
      <QuestionModal />
      <QuestionDeleteConfirmationModel />
      <GenerateLinkModel />
      <TestResultModel />
      <DeleteGeneratedQuizDataModel />
    </div>
  );
};

export default Navbar;
