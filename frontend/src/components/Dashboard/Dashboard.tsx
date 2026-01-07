import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentRoute, setCurrentRoute] = useState("questions");
  const dashboardRouting = () => {
    const navigationPoint = currentRoute.toLowerCase();
    switch (navigationPoint) {
      case "questions":
        navigate("/dashboard/questions");
        break;
      // case "history":
      //   navigate("/dashboard/test-history");
      //   break;
      case "generated quiz":
        navigate("/dashboard/generated-links");
      default:
        break;
    }
  };

  useEffect(() => {
    dashboardRouting();
  }, [currentRoute]);

  return (
    <>
      <div className="flex h-[90vh] overflow-hidden">
        <div className="hidden p-4 sm:flex sm:flex-col w-[400px] border-r border-slate-600 bg-slate-800">
          <div className="bg-slate-700 p-3 rounded-md h-full">
            <h4 className="text-white text-2xl uppercase tracking-widest">
              Dashboard
            </h4>
            <div className="mt-4">
              <ul className="list-none">
                {["Questions", "Generated Quiz"].map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => setCurrentRoute(item)}
                      className={`text-white p-2 transition duration-500 cursor-pointer ${
                        item.toLowerCase() === currentRoute.toLowerCase()
                          ? "bg-slate-600"
                          : ""
                      } rounded-md`}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="sm:p-4 flex flex-col w-full bg-slate-800 h-[90vh] overflow-hidden">
          {/* <Questions /> */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
