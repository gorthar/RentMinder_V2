import { useEffect, useRef, useState, useCallback } from "react";
import Button from "../../../SharedComponents/Button";
import logo from "../../../assets/logo.svg";
import { PropTypes } from "prop-types";
import { useAuthContext } from "../../../Context/useAuthContext";
import { toast } from "react-toastify";
import TenantDropdown from "./TenantDropdown";

function Navbar({ setOpenAuthModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useAuthContext();

  const sidebarRef = useRef(null);

  const toggleMenu = useCallback((event) => {
    event.stopPropagation(); // Prevent the event from propagating to the document
    setIsMenuOpen((prevState) => {
      return !prevState;
    });
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

  function handleLogout() {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while logging out");
      });
  }

  return (
    <header className="relative">
      <nav className="bg-white border-gray-200 px-2 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="#" className="flex items-center">
            <img src={logo} className="mr-1 h-6 sm:h-9" alt="RentMinder Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              RentMinder
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <a
              href="#"
              className=" hidden sm:block text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  text-sm px-2 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
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
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 lg:px-5 py-2 lg:py-2.5  dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
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
              <button
                onClick={handleLogout}
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 lg:px-5 py-2 lg:py-2.5  dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log out
              </button>
            )}
            <button
              data-collapse-toggle="sidebar"
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="sidebar"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div
            ref={sidebarRef}
            className={`${
              isMenuOpen ? "translate-x-0 block" : "-translate-x-full"
            } absolute left-0 top-14 z-50 w-72 flex h-screen justify-between lg:flex lg:w-auto lg:order-1 transition-all bg-white dark:bg-gray-800`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-1 font-medium lg:flex-row w-full lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              {!user ? (
                <>
                  <li>
                    <a
                      href="#"
                      onClick={() =>
                        setOpenAuthModal({
                          open: true,
                          isLogin: true,
                          isLandlord: true,
                        })
                      }
                      className="block py-2 pr-4 pl-3 text-gray-800 lg:text-white hover:bg-gray-50 lg:hover:bg-transparent lg:p-0 dark:text-white"
                    >
                      Landlord Log in
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() =>
                        setOpenAuthModal({
                          open: true,
                          isLogin: false,
                          isLandlord: true,
                        })
                      }
                      className="block py-2 pr-4 pl-3 text-gray-800 lg:text-white hover:bg-gray-50 lg:hover:bg-transparent lg:p-0 dark:text-white"
                    >
                      Landlord Sign Up
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() =>
                        setOpenAuthModal({
                          open: true,
                          isLogin: true,
                          isLandlord: false,
                        })
                      }
                      className="block py-2 pr-4 pl-3 text-gray-800 lg:text-white hover:bg-gray-50 lg:hover:bg-transparent lg:p-0 dark:text-white"
                    >
                      Tenant Log in
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() =>
                        setOpenAuthModal({
                          open: true,
                          isLogin: false,
                          isLandlord: false,
                        })
                      }
                      className="block py-2 pr-4 pl-3 text-gray-800 lg:text-white hover:bg-gray-50 lg:hover:bg-transparent lg:p-0 dark:text-white"
                    >
                      Tenant Sign Up
                    </a>
                  </li>
                </>
              ) : (
                <li>
                  <a
                    href="#"
                    onClick={handleLogout}
                    className="block py-2 pr-4 pl-3 text-gray-800 lg:text-white hover:bg-gray-50 lg:hover:bg-transparent lg:p-0 dark:text-white"
                  >
                    Log out
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  setOpenAuthModal: PropTypes.func,
};

export default Navbar;
