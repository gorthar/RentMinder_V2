import { Home, DollarSign, Wrench as Tool, Bell } from "lucide-react";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export const SideBar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { icon: Home, text: "Dashboard" },
    { icon: DollarSign, text: "Payments" },
    { icon: Tool, text: "Maintenance" },
    { icon: Bell, text: "Notifications" },
  ];
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const location = window.location.pathname;

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50  flex h-screen w-72 flex-col overflow-y-hidden bg-white shadow-2xl lg:shadow-none  text-white  duration-200 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 flex">
        <h2 className="text-2xl font-bold text-gray-800">TenantHub</h2>
        <div className="flex items-center justify-center  px-6 ">
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className=" lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <NavLink
            key={item.text}
            to={`/tenant/${item.text.toLowerCase()}`}
            className={`flex items-center px-4 py-2 ${
              index > 0 ? "mt-2" : ""
            } text-gray-600 ${
              location.includes(item.text.toLowerCase())
                ? "bg-gray-200"
                : "hover:bg-gray-200"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.text}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

SideBar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};
