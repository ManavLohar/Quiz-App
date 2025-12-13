const QuizArea = () => {
  return (
    <div className="flex h-[90vh] justify-center items-center w-full bg-slate-800">
      <div className="min-h-[300px] flex flex-col gap-4 w-full max-w-[500px] bg-slate-300 p-4 rounded-lg">
        <h4 className="text-lg">Q1. What is your name?</h4>
        <ul className="flex flex-col gap-2">
          <li className="p-2 border border-slate-400 rounded cursor-pointer">
            hello
          </li>
          <li className="p-2 border border-slate-400 rounded cursor-pointer">
            hello
          </li>
          <li className="p-2 border border-slate-400 rounded cursor-pointer">
            hello
          </li>
          <li className="p-2 border border-slate-400 rounded cursor-pointer">
            hello
          </li>
        </ul>
        <button className="px-4 py-1 w-fit text-lg bg-slate-800 text-slate-300 rounded-lg cursor-pointer">
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizArea;
