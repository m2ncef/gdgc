import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import shadcnLogo from "/shadcn.svg";
import jsLogo from "/js.svg";
import tailWind from "/tailwind.svg";
import "./App.css";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Landing from "./components/landing/landing";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";

function App() {
  return (
    <Landing/>
  );
}

export default App;
