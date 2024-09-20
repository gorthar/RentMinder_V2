import { useEffect, useRef, useState, useCallback } from "react";
import { useAuthContext } from "../../../Context/useAuthContext";
import { toast } from "react-toastify";
import NavbarBrand from "./NavbarBrand";
import NavbarLinks from "./NavbarLinks";
import NavbarButtons from "./NavbarButtons";
import MobileMenu from "./MobileMenu";
import PropTypes from "prop-types";

function NavbarSpread({ setOpenAuthModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useAuthContext();
  const sidebarRef = useRef(null);

  const toggleMenu = useCallback((event) => {
    event.stopPropagation();
    setIsMenuOpen((prevState) => !prevState);
  }, []);

  useEffect(() => {
    const clickHandler = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while logging out");
      });
  };

  return (
    <header className="relative">
      <nav className="bg-white border-gray-200 px-2 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <NavbarBrand />
          <NavbarButtons
            user={user}
            setOpenAuthModal={setOpenAuthModal}
            handleLogout={handleLogout}
          />
          <MobileMenu
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            sidebarRef={sidebarRef}
          >
            <NavbarLinks
              user={user}
              setOpenAuthModal={setOpenAuthModal}
              handleLogout={handleLogout}
              toggleMenu={toggleMenu}
            />
          </MobileMenu>
        </div>
      </nav>
    </header>
  );
}

export default NavbarSpread;
//proptypes
NavbarSpread.propTypes = {
  setOpenAuthModal: PropTypes.func,
};
