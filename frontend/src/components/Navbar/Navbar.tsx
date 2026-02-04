import { NavLink, useNavigate } from "react-router-dom";
import { useGetAdminQuery } from "../../redux/slices/quizApiSlice";
import { IoIosArrowDown, IoMdArrowDropdown } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { FiHome, FiLogOut } from "react-icons/fi";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  toggleLoginModelVisibility,
  toggleLogoutConfirmationModelVisibility,
} from "../../redux/slices/quizSlice";
import LogoutConfirmationModel from "../Modals/LogoutConfirmationModal";
import AdminSignInModel from "../Modals/AdminSignInModal";
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
import AdminSignUpModal from "../Modals/AdminSignUpModal";
import { Button } from "../ReusableComponents/Button";
import { useCloseOnOutsideOrEsc } from "../../hooks/useCloseOnOutsideOrEsc";

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: adminData, isLoading } = useGetAdminQuery({});

  const [menuListToggle, setMenuListToggle] = useState(false);
  const [menuListToggleForSmallDevices, setMenuListToggleForSmallDevices] =
    useState(false);
  const [subMenuToggle, setSubMenuToggle] = useState(false);
  const menuListRef = useRef<HTMLDivElement | null>(null);
  const menuListRefForSmallDevices = useRef<HTMLDivElement | null>(null);

  useCloseOnOutsideOrEsc({
    ref: menuListRef,
    onClose: () => setMenuListToggle(false),
    enabled: menuListToggle,
  });

  useCloseOnOutsideOrEsc({
    ref: menuListRefForSmallDevices,
    onClose: () => setMenuListToggleForSmallDevices(false),
    enabled: menuListToggleForSmallDevices,
  });

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
    <div className="relative z-10 flex items-center justify-between h-[10vh] w-full p-2 px-2 sm:px-4 bg-slate-800">
      <div className="flex-1 flex justify-left">
        <img
          onClick={() => navigate("/")}
          className="h-14 cursor-pointer"
          src={quizLogo}
          alt=""
        />
      </div>
      {/* For large devices */}
      <div className="hidden sm:flex-1 sm:flex justify-end">
        {adminData ? (
          <div ref={menuListRef} className="relative">
            <Button
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
            </Button>
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
          <Button
            onClick={() => dispatch(toggleLoginModelVisibility())}
            className="bg-slate-300 px-3 py-1 rounded-md font-semibold cursor-pointer"
          >
            Login
          </Button>
        )}
      </div>

      {/* For small devices */}
      {adminData ? (
        <>
          <div className="sm:hidden">
            <Button>
              <FaBarsStaggered
                onClick={() => setMenuListToggleForSmallDevices(true)}
                size={24}
                className="text-slate-300 cursor-pointer"
              />
            </Button>
          </div>
          <AnimatePresence>
            {menuListToggleForSmallDevices ? (
              <motion.div
                className="fixed sm:hidden inset-0 flex justify-end items-center bg-black/70 backdrop-blur-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  ref={menuListRefForSmallDevices}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", duration: 0.2, damping: 18 }}
                  className="relative w-[300px] bg-slate-800/60 backdrop-blur-lg h-full"
                >
                  <div className="absolute top-5 right-4 z-10">
                    <Button>
                      <TfiClose
                        onClick={() => {
                          setMenuListToggleForSmallDevices(false);
                          setSubMenuToggle(false);
                        }}
                        className="cursor-pointer text-slate-300"
                        size={24}
                      />
                    </Button>
                  </div>
                  <div className="flex h-full flex-col justify-between p-2">
                    <div className="flex">
                      <img
                        onClick={() => navigate("/")}
                        className="h-14 cursor-pointer"
                        src={quizLogo}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <h4
                        onClick={() => {
                          navigate("/");
                          setMenuListToggleForSmallDevices(false);
                          setSubMenuToggle(false);
                        }}
                        className="flex items-center gap-2 text-lg text-slate-300 font-bold p-2 rounded-md w-full cursor-pointer"
                      >
                        <FiHome />
                        Home
                      </h4>
                      <div
                        onClick={() => setSubMenuToggle(!subMenuToggle)}
                        className="relative overflow-hidden flex flex-col rounded-md w-full p-2"
                      >
                        <h4 className="flex justify-between items-center text-lg text-slate-300 font-bold cursor-pointer">
                          <div className="flex items-center gap-2">
                            <RxDashboard />
                            Dashboard
                          </div>
                          <IoIosArrowDown
                            className={`duration-300 ${
                              subMenuToggle ? "rotate-180" : ""
                            }`}
                          />
                        </h4>
                        <AnimatePresence>
                          {subMenuToggle ? (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "fit-content" }}
                              exit={{ height: 0 }}
                            >
                              <ul className="flex flex-col ml-6.5 gap-1 pt-1">
                                <NavLink
                                  to={"/dashboard/questions"}
                                  onClick={() =>
                                    setMenuListToggleForSmallDevices(false)
                                  }
                                  className=" text-slate-300"
                                >
                                  Questions
                                </NavLink>
                                <NavLink
                                  to={"/dashboard/generated-quizzes"}
                                  onClick={() =>
                                    setMenuListToggleForSmallDevices(false)
                                  }
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
                    <div className="flex flex-col mb-4 gap-1">
                      <div
                        // onClick={() => setMenuListToggle(!menuListToggle)}
                        className="flex gap-2 rounded-md items-center cursor-pointer"
                      >
                        <p className="h-12 w-12 bg-slate-300 rounded-full text-xl flex justify-center items-center">
                          {adminData?.data.name.slice("")[0]}
                        </p>
                        <p className="text-slate-300 font-semibold text-xl">
                          {adminData?.data.name}
                        </p>
                      </div>
                      <div className="flex ml-2">
                        <button
                          onClick={() => {
                            dispatch(toggleLogoutConfirmationModelVisibility());
                            setMenuListToggleForSmallDevices(
                              !menuListToggleForSmallDevices,
                            );
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
      <AdminSignUpModal />
      <AdminSignInModel />
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
