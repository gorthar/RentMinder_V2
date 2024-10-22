import { Outlet, useNavigate } from "react-router-dom";
import { SideBar } from "./SideBar";
import { Header } from "./Header";

export default function TenantLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <main className="flex-1 overflow-y-auto">
        <Header onLogout={handleLogout} />
        <div className="max-w-7xl mx-2 sm:mx-0 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
