import Hero from "./Hero";

import Features from "./Features";
import Pricing from "./Pricing";
import SocialProof from "./SocialProof";
import Footer from "./Footer";
import { useState } from "react";
import { Modal } from "flowbite-react";
import Login from "../AuthPages/Login";
import SignUp from "../AuthPages/SigUp";
import Navbar from "./Navbar/Navbar";

export default function LandingPage() {
  const [openAuthModal, setOpenAuthModal] = useState({
    open: false,
    isLogin: true,
    isLandlord: true,
  });

  return (
    <div>
      <Navbar setOpenAuthModal={setOpenAuthModal} />
      <Hero setOpenAuthModal={setOpenAuthModal} />
      <Features />
      <Pricing setOpenAuthModal={setOpenAuthModal} />
      <SocialProof />
      <Footer />
      <Modal
        show={openAuthModal.open}
        popup
        onClose={() =>
          setOpenAuthModal({ open: false, isLogin: true, isLandlord: true })
        }
      >
        <Modal.Body>
          <Modal.Header></Modal.Header>
          {openAuthModal.isLogin ? (
            <Login
              setOpenAuthModal={setOpenAuthModal}
              isLandlord={openAuthModal.isLandlord}
            />
          ) : (
            <SignUp
              setOpenAuthModal={setOpenAuthModal}
              isLandlord={openAuthModal.isLandlord}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
