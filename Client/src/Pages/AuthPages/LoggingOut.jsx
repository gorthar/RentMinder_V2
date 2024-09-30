import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress"; // Adjust the path based on your project structure
import { Loader2 } from "lucide-react";
import { useAuthContext } from "@/Context/useAuthContext"; // Adjust the path based on your project structure

function LoggingOut() {
  const navigate = useNavigate();
  const { logOut } = useAuthContext(); // Accessing logOut from AuthContext
  const [progress, setProgress] = useState(0); // State to manage progress

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logOut();

        // Start updating the progress bar
        const duration = 1000; // Total duration for the progress bar
        const interval = 100; // Update every 100 milliseconds
        const totalSteps = duration / interval; // Total steps to complete
        let currentStep = 0;

        const progressInterval = setInterval(() => {
          currentStep++;
          setProgress((currentStep / totalSteps) * 100); // Update progress percentage
          if (currentStep >= totalSteps) {
            clearInterval(progressInterval); // Clear interval when complete
            navigate("/"); // Redirect to home after progress completes
          }
        }, interval);
      } catch (error) {
        console.error("Error during logout: ", error);
        navigate("/"); // Redirect to home in case of an error
      }
    };

    performLogout();

    return () => {
      // Cleanup if necessary
    };
  }, [logOut, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
      <h2 className="mt-4 text-lg">Logging you out...</h2>
      <div className="mt-4 w-1/3">
        {" "}
        {/* Container for the progress bar */}
        <Progress value={progress} className="w-full" />{" "}
        {/* Moving progress bar */}
      </div>
      <p className="mt-2">Please wait...</p>
    </div>
  );
}

export default LoggingOut;
