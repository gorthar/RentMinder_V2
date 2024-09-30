import { useAuthContext } from "@/Context/useAuthContext";
import { Outlet } from "react-router-dom";
import NotAuthorized from "../Pages/AuthPages/NotAuthorized";

function RequireLandlord() {
  const { user, logOut } = useAuthContext();
  if (user === undefined) {
    return <div>Loading...</div>;
  }
  console.log(user);
  if (!user || user.Role != "Landlord") {
    logOut();
    return (
      <NotAuthorized
        message={
          "You have used Landlord login. Are you sure you have a landlord account?"
        }
      />
    );
  }

  return <Outlet />;
}
export default RequireLandlord;
