import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

function NotAuthorized({ message }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">403 - Not Authorized</h1>
      <p className="mt-4 text-lg">
        You do not have permission to view this page.
      </p>
      <p className="mt-2">Redirecting to the home page in 5 seconds...</p>

      {/* Display extra message if passed */}
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

export default NotAuthorized;
NotAuthorized.propTypes = {
  message: PropTypes.string,
};
