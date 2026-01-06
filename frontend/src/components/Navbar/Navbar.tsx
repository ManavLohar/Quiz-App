import { useNavigate } from "react-router-dom";
import { useGetAdminQuery } from "../../redux/slices/quizApiSlice";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleLoginModelVisibility,
  toggleLogoutConfirmationModelVisibility,
} from "../../redux/slices/quizSlice";
import LogoutConfirmationModel from "../Models/LogoutConfirmationModel";
import type { RootState } from "../../redux/store";
import AdminLoginModel from "../Models/AdminLoginModel";
import quizLogo from "../../assets/quiz-logo.png";
import GenerateLinkModel from "../Models/GenerateLinkModel";
import TestResultModel from "../Models/TestResultModel";
import QuestionModal from "../Models/QuestionModel";
import QuestionDeleteConfirmationModel from "../Models/QuestionDeleteConfirmationModel";
import DeleteGeneratedQuizDataModel from "../Models/DeleteGeneratedQuizDataModel";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginModelVisibility = useSelector(
    (state: RootState) => state.quizSlice.loginModelVisibility
  );
  const { data: adminData } = useGetAdminQuery({});

  const [menuListToggle, setMenuListToggle] = useState<Boolean>(false);
  return (
    <div className="relative z-10 flex items-center justify-between h-[10vh] w-full p-2 bg-slate-800 border-b border-zinc-600">
      <div className="flex-1 flex justify-left">
        <p className="text-slate-300">
          <img className="h-14" src={quizLogo} alt="" />
        </p>
      </div>
      {/* <h1 className="flex-1 flex justify-center text-2xl uppercase text-slate-300">
        Quiz Game
      </h1> */}
      <div className="flex-1 flex justify-end">
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
              <div className="absolute flex flex-col border border-slate-400 items-start top-14 bg-slate-300 overflow-hidden w-35 right-0 rounded-md">
                <button
                  onClick={() => {
                    navigate("/dashboard/questions");
                    setMenuListToggle(!menuListToggle);
                  }}
                  className="flex gap-2 items-center border-none text-slate-800 p-2 cursor-pointer w-full text-left transition duration-500 hover:bg-slate-400 font-semibold"
                >
                  <span>
                    <RxDashboard />
                  </span>
                  Dashboard
                </button>
                <hr className="w-full text-slate-400" />
                <button
                  onClick={() => {
                    dispatch(toggleLogoutConfirmationModelVisibility());
                    setMenuListToggle(!menuListToggle);
                  }}
                  className="flex gap-2 items-center border-none text-slate-800 p-2 cursor-pointer w-full text-left transition duration-500 hover:bg-slate-400 font-semibold"
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
