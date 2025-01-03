import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "../Filter";
import { Header } from "../Header";

const DashboardLayout = ({ children }) => {
  const nav = useNavigate();

  // useEffect(() => {
  //     const token = localStorage.getItem('authToken');
  //     if (!token) {
  //         nav('/login');
  //     }
  // }, [nav]);

  return (
    <>
      <header className="flex items-center justify-between px-6 py-3 border-b">
        {/* Logo */}
        <div className="flex items-center">
          <a
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
          >
            {"{"}Coderea{"}"}
          </a>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <a href="/" className="text-sm font-medium hover:text-blue-500">
            Home
          </a>
          <a
            href="/courses"
            className="text-sm font-medium hover:text-blue-500"
          >
            Courses
          </a>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-[600px] px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Language Selector */}
          <select className="px-2 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="th">TH</option>
            <option value="en">EN</option>
          </select>
        </nav>
      </header>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
