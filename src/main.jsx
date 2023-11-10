import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { AuthProvider } from "./providers/AuthProvider";

import ContainerLayout from "./layouts/container-layout";
import ProtectedLayout from "./layouts/protected-layout";

import Root from "./router/routes/root";
import ErrorPage from "./router/routes/error";
import SignIn from "./router/routes/sign-in";
import SignUp from "./router/routes/sign-up";
import Dashboard from "./router/routes/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ContainerLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Root />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/dashboard",
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
