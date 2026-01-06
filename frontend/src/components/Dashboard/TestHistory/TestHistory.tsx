import { useDispatch } from "react-redux";
import { useGetTestHistoryQuery } from "../../../redux/slices/quizApiSlice";
import {
  setTestResultId,
  toggleTestResultModelVisibility,
} from "../../../redux/slices/quizSlice";
import { extractDate } from "../../../lib";

const TestHistory = () => {
  const dispatch = useDispatch();
  const { data } = useGetTestHistoryQuery({});

  const handleTestResult = (testId: string) => {
    dispatch(setTestResultId(testId));
    dispatch(toggleTestResultModelVisibility());
  };
  return (
    <div className="flex flex-col p-3 h-full  ">
      <div>
        <h4 className="text-xl text-slate-300">Candidates Test History</h4>
      </div>
      <div className="h-max rounded-md bg-slate-600 p-4 mt-4 overflow-hidden overflow-x-auto w-full">
        {data?.data.length > 0 ? (
          <table className="w-full table-fixed rounded-md min-w-[800px]">
            <thead className="text-left bg-slate-800 text-slate-300">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Name</th>
                <th className="p-2">Total Questions</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-300">
              {data?.data.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <td className="p-2">{extractDate(item.createdAt)}</td>
                    <td className="p-2">{item.candidateName}</td>
                    <td className="p-2">
                      {item.totalQuestions.correct.count +
                        item.totalQuestions.unattended.count +
                        item.totalQuestions.incorrect.count}
                    </td>
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => handleTestResult(item._id)}
                        className="py-1 px-3 border-2 border-slate-800 rounded-md cursor-pointer"
                      >
                        Result
                      </button>
                      <button className="py-1 px-3 border-2 border-slate-800 bg-slate-800 text-slate-300 rounded-md cursor-pointer">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-slate-300">There is no data.</p>
        )}
      </div>
    </div>
  );
};

export default TestHistory;
