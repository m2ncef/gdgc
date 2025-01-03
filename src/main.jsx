import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Profile from "./pages/dashboard/Profile";
import Landing from "./components/landing/landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout><Overview /></DashboardLayout>,
  },
  {
    path: "/dashboard/profile",
    element: <DashboardLayout><Profile /></DashboardLayout>,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
