import { IoAlbumsOutline } from "react-icons/io5";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentRoute = pathname.split("/")[2];
  return (
    <>
      <div className="flex h-[90vh] overflow-hidden">
        <div className="hidden p-4 sm:flex sm:flex-col w-[400px] bg-slate-800">
          <div className=" p-3 rounded-md h-full">
            <h4 className="text-white text-2xl uppercase tracking-widest">
              Dashboard
            </h4>
            <div className="mt-4">
              <ul className="list-none">
                {[
                  { navLink: "Questions", path: "questions" },
                  { navLink: "Generated Quizzes", path: "generated-quizzes" },
                ].map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => navigate(item.path)}
                      className={`flex gap-2 items-center text-white p-2 transition duration-500 cursor-pointer ${
                        item.path.toLowerCase() === currentRoute.toLowerCase()
                          ? "bg-slate-700"
                          : ""
                      } rounded-md`}
                    >
                      {item.navLink === "Questions" ? (
                        <TfiLayoutListThumb />
                      ) : (
                        <IoAlbumsOutline />
                      )}
                      {item.navLink}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="sm:p-4 flex flex-col w-full bg-[#192334] h-[90vh] overflow-hidden">
          {/* <Questions /> */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
