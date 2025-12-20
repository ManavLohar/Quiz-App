import { useSelector } from "react-redux";
import QuestionModal from "../Models/QuestionModel";
import Questions from "./Questions/Questions";
import type { RootState } from "../../redux/store";
import ConfirmationModel from "../Models/ConfirmationModel";

const Dashboard = () => {
  const questionModelVisibility = useSelector(
    (state: RootState) => state.quizSlice.questionModelVisibility
  );
  const confirmationModelVisibility = useSelector(
    (state: RootState) => state.quizSlice.confirmationModelVisibility
  );
  return (
    <div className="flex h-[90vh] overflow-hidden">
      <div className=" p-4 flex flex-col w-[400px] border-r border-zinc-600 bg-slate-800">
        <div className="bg-slate-700 p-3 rounded-md h-full">
          <h4 className="text-white text-2xl uppercase tracking-widest">
            Dashboard
          </h4>
          <div className="mt-4">
            <ul className="list-none">
              {["Questions", "History"].map((item, index) => {
                return (
                  <li
                    key={index}
                    className="text-white p-2 transition duration-500 hover:bg-slate-600 rounded-md"
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className=" p-4 flex flex-col w-full bg-slate-800 h-[90vh] overflow-hidden">
        <Questions />
      </div>
      {questionModelVisibility && <QuestionModal />}
      {confirmationModelVisibility && <ConfirmationModel />}
    </div>
  );
};

export default Dashboard;
