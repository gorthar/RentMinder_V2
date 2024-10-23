import { useAuthContext } from "@/Context/useAuthContext";
import { Outlet } from "react-router-dom";
import NotAuthorized from "../Pages/AuthPages/NotAuthorized";

function RequireTenant() {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <NotAuthorized message="You are not logged in. Please log in to view this page." />
    );
  }

  if (user.Role !== "Tenant") {
    return (
      <NotAuthorized message="You have used Tenant login. Are you sure you have a Tenant account?" />
    );
  }

  return <Outlet />;
}

export default RequireTenant;
