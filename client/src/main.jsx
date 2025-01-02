import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/auth/register";
import Login from "./components/auth/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }, {
    path: "/register",
    element: <Register />,
  }, {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
