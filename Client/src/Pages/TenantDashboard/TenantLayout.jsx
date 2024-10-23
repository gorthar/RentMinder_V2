import { Outlet, useNavigate } from "react-router-dom";
import { SideBar } from "./SideBar";
import { Header } from "./Header";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function TenantLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  function toggleSidebar() {
    setSidebarOpen(true);
  }

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div
        className={`fixed hover:cursor-pointer bg-gray-600 rounded-full bottom-2 left-2 sm:bottom-3 sm:left-3 w-10 h-10 z-55 lg:hidden ${
          !sidebarOpen ? "block" : "hidden"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          toggleSidebar();
        }}
      >
        <Menu className="absolute top-1 left-1 w-8 h-8 text-white" />
      </div>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 overflow-y-auto">
        <Header onLogout={handleLogout} toggleSidebar={toggleSidebar} />
        <div className="max-w-7xl mx-2 sm:mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
