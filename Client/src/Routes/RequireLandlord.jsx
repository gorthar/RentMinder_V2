import NotAuthorized from "@/Pages/AuthPages/NotAuthorized";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "@/Context/useAuthContext";

function RequireLandlord() {
  const { user } = useAuthContext();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Add a small delay to ensure auth state is fully processed
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [user]);

  if (isChecking) {
    return (
      <div className="flex items-center flex-col justify-center h-screen">
        <Loader2 className="h-20 w-20 animate-spin text-emerald-500" />
        <br />
        <h2 className="mt-4 text-xl">Checking user...</h2>
      </div>
    );
  }

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
