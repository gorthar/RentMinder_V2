import { useState } from "react";
import AccordionItem from "./AccordionItem";
import PropTypes from "prop-types";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NavbarLinks({ user, setOpenAuthModal, handleLogout, toggleMenu }) {
  const [landlordOpen, setLandlordOpen] = useState(false);
  const [tenantOpen, setTenantOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

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

  const toggleLandlord = (e) => {
    e.stopPropagation();
    setLandlordOpen(!landlordOpen);
  };
  const toggleTenant = (e) => {
    e.stopPropagation();
    setTenantOpen(!tenantOpen);
  };
  const toggleDemo = (e) => {
    e.stopPropagation();
    setDemoOpen(!demoOpen);
  };

  const handleLinkClick = (e, action) => {
    e.stopPropagation();
    action();
  };

  return (
    <ul className="flex flex-col w-full">
      <li>
        <a
          href="#"
          className="block py-2 px-3 text-white bg-primary-700 dark:bg-primary-600"
          aria-current="page"
        >
          Home
        </a>
      </li>
      {!user ? (
        <>
          <AccordionItem
            title="Landlord"
            isOpen={landlordOpen}
            toggle={toggleLandlord}
          >
            <a
              href="#"
              onClick={(e) =>
                handleLinkClick(e, () => {
                  setOpenAuthModal({
                    open: true,
                    isLogin: true,
                    isLandlord: true,
                  });
                  toggleMenu;
                })
              }
              className="block pt-2 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Log in
            </a>
            <a
              href="#"
              onClick={(e) =>
                handleLinkClick(e, () => {
                  setOpenAuthModal({
                    open: true,
                    isLogin: false,
                    isLandlord: true,
                  });
                  toggleMenu;
                })
              }
              className="block py-2 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Sign Up
            </a>
          </AccordionItem>
          <AccordionItem
            title="Tenant"
            isOpen={tenantOpen}
            toggle={toggleTenant}
          >
            <a
              href="#"
              onClick={(e) =>
                handleLinkClick(e, () => {
                  setOpenAuthModal({
                    open: true,
                    isLogin: true,
                    isLandlord: false,
                  });
                  toggleMenu;
                })
              }
              className="block pt-2 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Log in
            </a>
            <a
              href="#"
              onClick={(e) =>
                handleLinkClick(e, () => {
                  setOpenAuthModal({
                    open: true,
                    isLogin: false,
                    isLandlord: false,
                  });
                  toggleMenu;
                })
              }
              className="block py-2 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Sign Up
            </a>
          </AccordionItem>
          <AccordionItem title="Tenant" isOpen={demoOpen} toggle={toggleDemo}>
            <a
              href="#"
              onClick={(e) =>
                handleLinkClick(e, () => {
                  login(false);
                  toggleMenu;
                })
              }
              className="block pt-2 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Tenant Log in
            </a>
            <a
              href="#"
              onClick={(e) =>
                handleLinkClick(e, () => {
                  login(true);
                  toggleMenu;
                })
              }
              className="block py-2 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Landlord Log in
            </a>
          </AccordionItem>
        </>
      ) : (
        <li>
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, handleLogout)}
            className="block py-2 px-3 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Log out
          </a>
        </li>
      )}
    </ul>
  );
}

export default NavbarLinks;
//Prototypes
NavbarLinks.propTypes = {
  user: PropTypes.object,
  setOpenAuthModal: PropTypes.func,
  handleLogout: PropTypes.func,
  toggleMenu: PropTypes.func,
};
