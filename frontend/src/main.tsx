import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import QuizArea from "./components/QuizArea/QuizArea.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import HomePage from "./components/HomePage/HomePage.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import { PersistGate } from "redux-persist/integration/react";
import Questions from "./components/Dashboard/Questions/Questions.tsx";
// import TestHistory from "./components/Dashboard/TestHistory/TestHistory.tsx";
import GeneratedLinks from "./components/Dashboard/GeneratedLinks/GeneratedLinks.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
            children: [
              {
                path: "questions",
                element: <Questions />,
              },
              // {
              //   path: "test-history",
              //   element: <TestHistory />,
              // },
              {
                path: "generated-links",
                element: <GeneratedLinks />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/quiz-area/:adminId?/:testId?",
    element: <QuizArea />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <SkeletonTheme baseColor="#1d293d" highlightColor="#2f3e59">
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </PersistGate>
  </SkeletonTheme>
);
