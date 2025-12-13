const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-[10vh] w-full p-2 bg-slate-300">
      <div className="flex-1 flex justify-left">
        <p>Logo</p>
      </div>
      <h1 className="flex-1 flex justify-center text-2xl uppercase text-slate-800">
        Quiz Game
      </h1>
      <div className="flex-1 flex justify-end">
        <button className="uppercase text-[20px] border-none text-slate-300 p-2 tracking-widest bg-slate-800 cursor-pointer">
          Dashboard
        </button>
      </div>
    </div>
  );
};

export default Navbar;
