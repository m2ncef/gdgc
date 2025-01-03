import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const nav = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        nav('/login');
    };

    return (
        <div className="h-screen w-64 bg-card border-r flex flex-col">
            <div className="p-6">
                <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    <li>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => nav('/dashboard')}
                        >
                            Overview
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => nav('/dashboard/profile')}
                        >
                            Profile
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => nav('/dashboard/settings')}
                        >
                            Settings
                        </Button>
                    </li>
                </ul>
            </nav>
            <div className="p-4 border-t">
                <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default Sidebar; 