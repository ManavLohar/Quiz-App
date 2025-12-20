import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const QuizArea = () => {
  interface TempData {
    question: string;
    options: string[];
    correct_answer: string;
  }

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const tempData: TempData = {
    question: "What is your name?",
    options: ["Manav", "Rohan", "Quill", "Roman"],
    correct_answer: "Manav",
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowResult(true);
  };

  return (
    <div className="flex h-[90vh] justify-center items-center w-full bg-slate-800">
      <div className="min-h-[300px] flex flex-col gap-4 w-full max-w-[500px] bg-slate-300 p-4 rounded-lg">
        <h4 className="text-lg">{tempData.question}</h4>
        <ul className="flex flex-col gap-2">
          {tempData.options.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  handleOptionClick(item);
                  // setCorrectAnswer(item);
                }}
                className={`p-2 border rounded cursor-pointer
                   ${
                     !showResult
                       ? "border-slate-400"
                       : item === tempData.correct_answer
                       ? "border-green-500 bg-[#50ff5036]"
                       : item === selectedOption
                       ? "border-red-500 bg-[#ff00001a]"
                       : "border-slate-400"
                   }
                    `}
              >
                {item}
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="px-4 py-1 w-fit text-lg bg-slate-800 text-slate-300 rounded-lg cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizArea;
