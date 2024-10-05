import { useAuthContext } from "@/Context/useAuthContext";
import { Outlet } from "react-router-dom";
import NotAuthorized from "../Pages/AuthPages/NotAuthorized";

function RequireLandlord() {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <NotAuthorized message="You are not logged in. Please log in to view this page." />
    );
  }

  if (user.Role !== "Landlord") {
    return (
      <NotAuthorized message="You have used Landlord login. Are you sure you have a landlord account?" />
    );
  }

  return <Outlet />;
}

export default RequireLandlord;
