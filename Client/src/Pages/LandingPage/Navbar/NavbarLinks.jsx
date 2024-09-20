import { useState } from "react";
import AccordionItem from "./AccordionItem";
import PropTypes from "prop-types";

function NavbarLinks({ user, setOpenAuthModal, handleLogout, toggleMenu }) {
  const [landlordOpen, setLandlordOpen] = useState(false);
  const [tenantOpen, setTenantOpen] = useState(false);

  const toggleLandlord = (e) => {
    e.stopPropagation();
    setLandlordOpen(!landlordOpen);
  };
  const toggleTenant = (e) => {
    e.stopPropagation();
    setTenantOpen(!tenantOpen);
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
