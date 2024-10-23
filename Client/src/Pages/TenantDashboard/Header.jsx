// src/components/Layout/Header.jsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/Context/useAuthContext";
import { LogOut } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Header = ({ onLogout }) => {
  const [HeaderText, setHeaderText] = useState("Dashboard");
  const location = useLocation();
  const { user } = useAuthContext();
  console.log("User:", user);

  useEffect(() => {
    if (location.pathname.includes("maintenance")) {
      setHeaderText("Maintenance");
    } else if (location.pathname.includes("payment")) {
      setHeaderText("Payment");
    } else {
      setHeaderText("Dashboard");
    }
  }, [location.pathname]);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">{HeaderText}</h1>
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>
              {user.displayName?.[0].toUpperCase() ??
                user.email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="ml-3 text-sm font-medium text-gray-700">
            {user.displayName ?? user.email}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="ml-4"
            onClick={onLogout}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
