import { useState } from "react";
import { IoIosLink } from "react-icons/io";
import { MdOutlineInfo } from "react-icons/md";
import { useGetAdminQuery } from "../../redux/slices/quizApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleGenerateLinkModelVisibility } from "../../redux/slices/quizSlice";
import { motion, AnimatePresence } from "motion/react";
import type { RootState } from "../../redux/store";

const GenerateLinkModel = () => {
  const dispatch = useDispatch();
  const generateLinkModelVisibility = useSelector(
    (state: RootState) => state.quizSlice.generateLinkModelVisibility
  );
  const generatedLinkId = useSelector(
    (state: RootState) => state.quizSlice.generatedLinkId
  );
  const [isInfoBox, setIsInfoBox] = useState(false);
  const { data } = useGetAdminQuery({});
  const adminId = data?.data._id;
  const generatedLink = `https://quiz-app-f8lo.vercel.app/quiz-area/${adminId}/${generatedLinkId}`;
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const handleCopy = () => {
    navigator.clipboard
      .writeText(generatedLink)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <AnimatePresence>
      {generateLinkModelVisibility ? (
        <motion.div
          className="fixed inset-0 flex justify-center items-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="relative flex flex-col gap-2 justify-between w-[300px] sm:w-[400px] h-fit bg-slate-500/30 backdrop-blur-xs rounded-md border-2 border-slate-600"
          >
            <div className="flex flex-col p-4 pb-0 relative">
              <IoIosLink className="text-6xl text-slate-300" />
              <h4 className="text-xl flex gap-1 items-center text-slate-300">
                Here is your link{" "}
                <span
                  className="mt-1"
                  onMouseEnter={() => setIsInfoBox(true)}
                  onMouseLeave={() => setIsInfoBox(false)}
                >
                  <MdOutlineInfo className="text-slate-300" />
                </span>
              </h4>
              {isInfoBox && (
                <div className="absolute bottom-0 left-48 p-2 border w-50 border-slate-500 rounded-md">
                  <span className=" text-[10px] text-slate-300">
                    Here is the <b>Generated Link</b>, you can{" "}
                    <b>share this link</b> to your candidate for test!
                  </span>
                </div>
              )}
            </div>
            <div className="w-full flex gap-2 justify-between py-2 px-4">
              <input
                type="text"
                value={generatedLink && generatedLink}
                className="border-2 border-slate-500 text-slate-300 p-1 rounded-md outline-none w-full"
                readOnly
              />
              <button
                onClick={handleCopy}
                className="bg-slate-800 text-slate-300 border-2 border-slate-500 px-3 py-1 rounded-md font-semibold cursor-pointer"
                disabled={isCopied}
              >
                {isCopied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="py-2 pb-4 px-4">
              <button
                onClick={() => dispatch(toggleGenerateLinkModelVisibility(""))}
                className="bg-slate-800 text-slate-300 border-2 border-slate-500 px-3 py-1 rounded-md font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default GenerateLinkModel;
