import { Menu } from "lucide-react";
import PropTypes from "prop-types";

function MobileMenu({ isMenuOpen, toggleMenu, sidebarRef, children }) {
  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        type="button"
        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="mobile-menu"
        aria-expanded={isMenuOpen}
      >
        <span className="sr-only">Open main menu</span>
        <Menu size={24} />
      </button>
      <div
        ref={sidebarRef}
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } fixed left-0 top-14 z-50 w-64 h-screen overflow-y-auto transition-transform bg-white dark:bg-gray-800 lg:hidden`}
        id="mobile-menu"
        onClick={handleMenuClick}
      >
        {children}
      </div>
    </>
  );
}

export default MobileMenu;
// Prototypes
MobileMenu.propTypes = {
  isMenuOpen: PropTypes.bool,
  toggleMenu: PropTypes.func,
  sidebarRef: PropTypes.object,
  children: PropTypes.node,
};
