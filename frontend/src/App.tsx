import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useGetQuestionsQuery } from "./redux/slices/quizApiSlice";
import { useDispatch } from "react-redux";
import { addQuestion } from "./redux/slices/quizSlice";
import "react-loading-skeleton/dist/skeleton.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

const App = () => {
  const { pathname } = useLocation();
  const { data, isSuccess } = useGetQuestionsQuery({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(addQuestion(data.data));
    }
  }, [isSuccess, data, dispatch]);

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
    });
  }, [pathname]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default App;
