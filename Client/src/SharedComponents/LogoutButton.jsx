import { Button } from "@/components/ui/button"; // Adjust the import based on your project structure
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    navigate("/logout"); // Redirect to logging out page
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className="" // Optional: Add margin or any additional styling
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
