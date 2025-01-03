import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronDown,
  Menu,
  LogOut,
  User,
  ChevronUp,
  UserIcon,
  BriefcaseIcon,
  MessageSquareDotIcon,
  Bookmark,
} from "lucide-react";
import {
  Home as HomeIcon,
  Boxes as CubeIcon,
  BookOpen as BookOpenIcon,
  Settings as SettingsIcon,
  HelpCircle as HelpCircleIcon,
  MessageSquare as MessageSquareIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "../../assets/logo.png";
const MenuItem = ({ icon, label, href, hasSubmenu, children, onClick }) => (
  <div className="space-y-1">
    {hasSubmenu ? (
      <Accordion type="multiple" collapsible>
        <AccordionItem value="item-1" className="border-0">
          <AccordionTrigger className="flex items-center gap-3 px-3 py-2 text-sm hover:text-gray-100 rounded-lg hover:bg-gray-800">
            {icon}
            <span className="flex-1 text-left">{label}</span>
          </AccordionTrigger>
          <AccordionContent className="ml-6 space-y-1 pt-1">
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ) : (
      <button
        onClick={onClick}
        className="flex w-full items-center gap-3 px-3 py-2 text-sm hover:text-gray-100 rounded-lg hover:bg-gray-800"
      >
        {icon}
        <span>{label}</span>
      </button>
    )}
  </div>
);

const SubMenuItem = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="block w-full text-left px-3 py-2 text-sm hover:text-gray-100 rounded-lg hover:bg-gray-800"
  >
    {label}
  </button>
);

const SidebarContent = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 flex flex-col items-start justify-center">
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-500"
        >
          <img src={logo} alt="logo" className="h-7" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        <MenuItem
          icon={<HomeIcon className="h-5 w-5" />}
          label="Home"
          onClick={() => navigate("/dashboard")}
        />

        <MenuItem
          icon={<BookOpenIcon className="h-5 w-5" />}
          label="Courses"
          onClick={() => navigate("/dashboard/courses")}
        />

        <MenuItem
          icon={<MessageSquareDotIcon className="h-5 w-5" />}
          label="My Posts"
          onClick={() => navigate("/dashboard/posts")}
        />

        <MenuItem
          icon={<BriefcaseIcon className="h-5 w-5" />}
          label="Opportunities"
          onClick={() => navigate("/dashboard/jobs")}
        />
      </nav>

      <div className="p-4 mt-auto border-t border-gray-800">
        <DropdownMenu onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <button className="w-full outline-none">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-400">
                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-gray-50" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-800">
                    {JSON.parse(localStorage.getItem("user")).name}
                  </p>
                  <p className="text-xs text-gray-800">
                    {JSON.parse(localStorage.getItem("user")).email}
                  </p>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[200px]"
            side="top"
            align="end"
            sideOffset={8}
          >
            <DropdownMenuItem onClick={() => navigate("/dashboard/saved")}>
              <Bookmark className="mr-2 h-4 w-4" />
              <span>Saved Posts</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

const DashboardLayout = ({ children }) => {
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="lg:hidden p-4">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[240px] p-0 border-r border-gray-800"
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <aside className="hidden lg:flex flex-col h-[100vh] w-[240px] border-r border-gray-800">
        <SidebarContent />
      </aside>

      <main className="flex-1 my-8 px-8 h-[100vh] overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
