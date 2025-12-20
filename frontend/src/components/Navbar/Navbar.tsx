import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between h-[10vh] w-full p-2 bg-slate-800 border-b border-zinc-600">
      <div className="flex-1 flex justify-left">
        <p className="text-slate-300">Logo</p>
      </div>
      <h1 className="flex-1 flex justify-center text-2xl uppercase text-slate-300">
        Quiz Game
      </h1>
      <div className="flex-1 flex justify-end">
        <button
          onClick={() => navigate("/dashboard")}
          className="uppercase text-[20px] border-none text-slate-300 p-2 tracking-widest bg-slate-800 cursor-pointer"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
};

export default Navbar;
