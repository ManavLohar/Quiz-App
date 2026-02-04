import { useDispatch, useSelector } from "react-redux";
import { useGetTestHistoryQuery } from "../../redux/slices/quizApiSlice";
import type { RootState } from "../../redux/store";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  setTestResultId,
  toggleTestResultModelVisibility,
} from "../../redux/slices/quizSlice";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ReusableComponents/Button";
import { useCloseOnOutsideOrEsc } from "../../hooks/useCloseOnOutsideOrEsc";
import { useRef } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const TestResultModel = () => {
  const dispatch = useDispatch();
  const testResultModalRef = useRef<HTMLDivElement | null>(null);
  const testResultId = useSelector(
    (state: RootState) => state.quizSlice.testResultId,
  );
  const testResultModelVisibility = useSelector(
    (state: RootState) => state.quizSlice.testResultModelVisibility,
  );

  useCloseOnOutsideOrEsc({
    ref: testResultModalRef,
    onClose: () => dispatch(toggleTestResultModelVisibility()),
    enabled: testResultModelVisibility,
  });

  const { data } = useGetTestHistoryQuery(
    { testId: testResultId },
    { skip: !testResultId },
  );
  const testResultData = data?.data;
  let incorrect = testResultData?.totalQuestions.incorrect;
  let correct = testResultData?.totalQuestions.correct;
  let unattended = testResultData?.totalQuestions.unattended;
  let percentage = Math.round(
    (correct?.count * 100) /
      (correct?.count + incorrect?.count + unattended?.count),
  );

  const chartData = {
    labels: [incorrect?.label, correct?.label, unattended?.label],
    datasets: [
      {
        label: "Questions",
        data: [incorrect?.count, correct?.count, unattended?.count],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Chart.js Doughnut Chart",
      },
    },
    cutout: "0%",
  };

  return (
    <AnimatePresence>
      {testResultModelVisibility ? (
        <motion.div
          className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={testResultModalRef}
            className="relative flex flex-col gap-2 rounded-md w-[300px] sm:w-[450px] m-h-[400px] bg-slate-500/30 backdrop-blur-xs border-2 border-slate-600"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-2">
              <h4 className="text-xl text-slate-300 sm:text-2xl">
                Result for {testResultData?.candidateName}
              </h4>
            </div>
            <div className="flex flex-col px-4">
              <div className="flex w-[250px] sm:w-[300px] m-auto">
                <Doughnut data={chartData} options={options} />
              </div>
              <div className="flex gap-2 text-left">
                <p className="font-semibold text-slate-300">Score:</p>
                <p
                  className={`${
                    percentage < 65
                      ? "text-orange-500"
                      : percentage < 75
                        ? "text-yellow-500"
                        : "text-green-500"
                  } font-semibold`}
                >
                  {percentage}% {"("}
                  {percentage < 65
                    ? "Need improvement"
                    : percentage < 75
                      ? "Good"
                      : "Excellent"}
                  {")"}
                </p>
              </div>
            </div>
            <div className="border-t-2 border-t-slate-600 py-2 px-4">
              <Button
                onClick={() => {
                  dispatch(toggleTestResultModelVisibility());
                  dispatch(setTestResultId(""));
                }}
                className="bg-slate-800 text-slate-300 border-2 border-slate-500 px-4 py-2 rounded-md font-semibold cursor-pointer"
              >
                Got it!
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default TestResultModel;
