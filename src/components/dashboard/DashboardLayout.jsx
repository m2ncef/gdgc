import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
    const nav = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem('authToken');
    //     if (!token) {
    //         nav('/login');
    //     }
    // }, [nav]);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-background">
                <div className="container mx-auto p-6">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout; 