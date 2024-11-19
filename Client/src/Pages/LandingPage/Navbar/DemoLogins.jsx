import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DemoLogins() {
  const auth = getAuth();
  const navigate = useNavigate();
  function login(isLandlord) {
    const email = isLandlord ? "test1@test.com" : "test@test.com";
    const password = "test1234";
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // Signed in

          toast.success("Logged in successfully");

          if (isLandlord) {
            // redirect to landlord dashboard
            navigate("/landlord");
          } else {
            // redirect to tenant dashboard
            navigate("/tenant/dashboard");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage, errorCode);
          console.log(errorCode, errorMessage);
        });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Dropdown label="Demo Logins" color={"primary"} dismissOnClick={false}>
      <Dropdown.Item onClick={() => login(false)}>Tenant</Dropdown.Item>
      <Dropdown.Item onClick={() => login(true)}>Landlord</Dropdown.Item>
    </Dropdown>
  );
}
export default DemoLogins;
