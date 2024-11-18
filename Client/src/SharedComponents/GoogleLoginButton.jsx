import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { PropTypes } from "prop-types";
import { auth } from "../firebase";
import apiConnector from "@/ApiConnector/connector";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/Context/useAuthContext";

export default function GoogleLoginButton({
  upIn,
  setOpenAuthModal,
  isLandlord,
}) {
  const { refreshUser } = useAuthContext();
  const navigate = useNavigate();
  async function googleLoginHandler() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      let registerResponse = null;
      const idToken = await result.user.getIdToken();
      if (
        result.user.metadata.creationTime ===
        result.user.metadata.lastSignInTime
      ) {
        if (isLandlord) {
          registerResponse = await apiConnector.Landlord.googleLogin({
            idToken: idToken,
          });
        } else {
          registerResponse = await apiConnector.Tenant.googleLogin({
            idToken: idToken,
          });
        }
        if (registerResponse.success) {
          await auth.currentUser.getIdToken(true); // Force token refresh
          await auth.currentUser.reload(); // Reload user
          await refreshUser(); // Update context with new token
          console.log("Signed up successfully");
        }
      }

      isLandlord ? navigate("/landlord") : navigate("/tenant/dashboard");
      setOpenAuthModal({ open: false, isLogin: true });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <button
      onClick={googleLoginHandler}
      type="button"
      className="text-white w-full bg-slate-600 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-slate-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mr-2 mb-2"
    >
      <svg
        className="w-5 h-5 mr-2"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_13183_10121)">
          <path
            d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
            fill="#3F83F8"
          ></path>
          <path
            d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
            fill="#34A853"
          ></path>
          <path
            d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
            fill="#FBBC04"
          ></path>
          <path
            d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
            fill="#EA4335"
          ></path>
        </g>
      </svg>
      Sign {upIn} with Google<div></div>
    </button>
  );
}

GoogleLoginButton.propTypes = {
  setOpenAuthModal: PropTypes.func.isRequired,
  upIn: PropTypes.string.isRequired,
  isLandlord: PropTypes.bool.isRequired,
};
