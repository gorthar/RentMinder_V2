import logo from "../../../assets/logo.svg";

function NavbarBrand() {
  return (
    <a href="#" className="flex items-center">
      <img src={logo} className="mr-1 h-6 sm:h-9" alt="RentMinder Logo" />
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
        RentMinder
      </span>
    </a>
  );
}

export default NavbarBrand;
