import { useState } from "react";
import { extractDate } from "../../../lib";
import { useGetGeneratedTestLinksQuery } from "../../../redux/slices/quizApiSlice";
import { useDispatch } from "react-redux";
import {
  setTestResultId,
  toggleDeleteGeneratedQuizDataVisibility,
  toggleTestResultModelVisibility,
} from "../../../redux/slices/quizSlice";
import { MdContentCopy, MdOutlineDeleteOutline } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { GiProgression } from "react-icons/gi";

const GeneratedLinks = () => {
  const dispatch = useDispatch();
  const { data } = useGetGeneratedTestLinksQuery({});
  const testStatusCss = (status: string) => {
    return status === "completed"
      ? "bg-green-400/30 border-green-700 text-green-900"
      : status === "in-progress"
      ? "bg-orange-300/30 border-orange-700 text-orange-900"
      : "bg-gray-400/30 border-gray-700 text-gray-900";
  };

  const [copiedTestId, setCopiedTestId] = useState<string | null>(null);
  const handleCopyLink = (adminId: string, testId: string) => {
    let generatedLink = `https://quiz-app-f8lo.vercel.app/quiz-area/${adminId}/${testId}`;
    navigator.clipboard
      .writeText(generatedLink)
      .then(() => {
        setCopiedTestId(testId);
        setTimeout(() => {
          setCopiedTestId(null);
        }, 2000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const handleTestResult = (testId: string) => {
    dispatch(setTestResultId(testId));
    dispatch(toggleTestResultModelVisibility());
  };

  // useDeleteGeneratedTestLinkMutation

  const handleDelete = (testId: string) => {
    dispatch(toggleDeleteGeneratedQuizDataVisibility(testId));
  };

  return (
    <div className="flex flex-col p-3 h-full rounded-md overflow-hidden">
      <div className="sticky flex justify-between items-center top-0">
        <h4 className="text-xl text-slate-300">Generated Links</h4>
      </div>
      <div className="h-max rounded-md bg-slate-600 p-4 mt-4 overflow-hidden overflow-x-auto w-full">
        {data?.data.length > 0 ? (
          <table className="w-full table-fixed rounded-md min-w-[800px]">
            <thead className="text-left bg-slate-800 text-slate-300">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Name</th>
                <th className="p-2">Total Questions</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-300">
              {data?.data.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <td className="p-2">{extractDate(item.createdAt)}</td>
                    <td className="p-2">{item.candidate.name || "User"}</td>
                    <td className="p-2">{item.questions.length}</td>
                    <td>
                      <p
                        className={`w-fit text-[14px] font-semibold px-2 py-1 capitalize rounded-4xl border ${testStatusCss(
                          item.candidate.status
                        )}`}
                      >
                        {item.candidate.status}
                      </p>
                    </td>
                    <td className="p-2 flex gap-2">
                      {item.candidate.status !== "completed" ? (
                        <button
                          onClick={() =>
                            handleCopyLink(item.adminId, item.testId)
                          }
                          className="flex justify-center items-center h-10 w-10 border-2 border-cyan-700 rounded-md cursor-pointer text-cyan-700"
                          disabled={copiedTestId === item.testId}
                        >
                          {copiedTestId === item.testId ? (
                            <IoMdDoneAll size={20} />
                          ) : (
                            <MdContentCopy size={20} />
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleTestResult(item.testId)}
                          className="flex justify-center items-center h-10 w-10 border-2 border-green-800 text-green-800 rounded-md cursor-pointer"
                        >
                          <GiProgression size={20} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(item.testId)}
                        className="flex justify-center items-center h-10 w-10 border-2 border-red-700 text-red-700 rounded-md cursor-pointer"
                      >
                        <MdOutlineDeleteOutline size={24} />
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

export default GeneratedLinks;
