import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useGetQuestionsQuery } from "./redux/slices/quizApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "./redux/slices/quizSlice";
import "react-loading-skeleton/dist/skeleton.css";
import LogoutConfirmationModel from "./components/Models/LogoutConfirmationModel";
import type { RootState } from "./redux/store";

const App = () => {
  const { data, isSuccess } = useGetQuestionsQuery({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(addQuestion(data.data));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default App;
