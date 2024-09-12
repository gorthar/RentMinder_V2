import { Dropdown } from "flowbite-react";
import PropTypes from "prop-types";

function TenantDropdown({ setOpenAuthModal }) {
  function login() {
    setOpenAuthModal({ open: true, isLogin: true, isLandlord: false });
  }
  function signUp() {
    setOpenAuthModal({ open: true, isLogin: false, isLandlord: false });
  }

  return (
    <Dropdown label="For Tenants" color={"primary"} dismissOnClick={false}>
      <Dropdown.Item onClick={login}>Login</Dropdown.Item>
      <Dropdown.Item onClick={signUp}>Sign Up</Dropdown.Item>
    </Dropdown>
  );
}

export default TenantDropdown;
// add props
TenantDropdown.propTypes = {
  setOpenAuthModal: PropTypes.func.isRequired,
};
