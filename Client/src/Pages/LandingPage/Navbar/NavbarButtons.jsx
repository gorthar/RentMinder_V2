import { useNavigate } from "react-router-dom";
import Button from "../../../SharedComponents/Button";
import TenantDropdown from "./TenantDropdown";
import PropTypes from "prop-types";

function NavbarButtons({ user, setOpenAuthModal, handleLogout }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center lg:order-2">
      <a
        href="#"
        className="hidden sm:block text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
      >
        Contact
      </a>
      {!user ? (
        <div className="hidden sm:flex">
          <button
            onClick={() =>
              setOpenAuthModal({
                open: true,
                isLogin: true,
                isLandlord: true,
              })
            }
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Log in
          </button>
          <Button
            text="Get Started"
            onClick={() =>
              setOpenAuthModal({
                open: true,
                isLogin: false,
                isLandlord: true,
              })
            }
          />
          <TenantDropdown setOpenAuthModal={setOpenAuthModal} />
        </div>
      ) : (
        <>
          <button
            onClick={() => {
              user.Role === "Tenant"
                ? navigate("/tenant")
                : navigate("/landlord");
            }}
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Log out
          </button>
        </>
      )}
    </div>
  );
}

export default NavbarButtons;
//prototypes
NavbarButtons.propTypes = {
  user: PropTypes.object,
  setOpenAuthModal: PropTypes.func,
  handleLogout: PropTypes.func,
};
