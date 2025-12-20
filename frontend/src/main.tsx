import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import QuizArea from "./components/QuizArea/QuizArea.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <QuizArea />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <SkeletonTheme baseColor="#1d293d" highlightColor="#2f3e59">
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </SkeletonTheme>
);
