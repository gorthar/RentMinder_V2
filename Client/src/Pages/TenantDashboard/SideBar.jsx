import { Home, DollarSign, Wrench as Tool, Bell } from "lucide-react";

export const SideBar = () => {
  const menuItems = [
    { icon: Home, text: "Dashboard", active: true },
    { icon: DollarSign, text: "Payments", active: false },
    { icon: Tool, text: "Maintenance", active: false },
    { icon: Bell, text: "Notifications", active: false },
  ];

  return (
    <aside className="sm:w-64 bg-white shadow-md hidden sm:block w-40">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">TenantHub</h2>
      </div>
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <a
            key={item.text}
            href="#"
            className={`flex items-center px-4 py-2 ${
              index > 0 ? "mt-2" : ""
            } text-gray-600 ${
              item.active ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.text}
          </a>
        ))}
      </nav>
    </aside>
  );
};
