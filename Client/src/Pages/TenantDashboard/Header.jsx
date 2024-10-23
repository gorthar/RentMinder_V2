// src/components/Layout/Header.jsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import PropTypes from "prop-types";

export const Header = ({ onLogout }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Tenant Dashboard
        </h1>
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="ml-3 text-sm font-medium text-gray-700">
            John Doe
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
