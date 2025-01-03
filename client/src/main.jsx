import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Profile from "./pages/dashboard/Profile";
import ForgotPassword from "./components/auth/forgotpsw";
import ResetPassword from "./components/auth/resetPass";
import Landing from "./pages/Landing";
import Home from "./components/dashboard/Home";
import Course from "./pages/dashboard/course";
import LessonDetail from "./pages/dashboard/LessonDetail";
import Posts from "./pages/dashboard/Posts";
import Jobs from "./pages/dashboard/Jobs";
import Saved from "./pages/dashboard/Saved";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/dashboard/home",
    element: (
      <DashboardLayout>
        <Home />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/courses/:courseId",
    element: (
      <DashboardLayout>
        <LessonDetail />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/courses",
    element: (
      <DashboardLayout>
        <Course />
      </DashboardLayout>
    ),
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
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: (
      <DashboardLayout>
        <Home />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/profile",
    element: (
      <DashboardLayout>
        <Profile />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/posts",
    element: (
      <DashboardLayout>
        <Posts />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/jobs",
    element: (
      <DashboardLayout>
        <Jobs />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/saved",
    element: (
      <DashboardLayout>
        <Saved />
      </DashboardLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
