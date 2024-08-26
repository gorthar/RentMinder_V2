import Hero from "./Hero";
import Navbar from "./Navbar";
import Features from "./Features";
import Pricing from "./Pricing";
import SocialProof from "./SocialProof";
import Footer from "./Footer";
import { useState } from "react";
import { Modal } from "flowbite-react";
import Login from "../AuthPages/Login";
import SignUp from "../AuthPages/SigUp";

export default function LandingPage() {
  const [openAuthModal, setOpenAuthModal] = useState({
    open: false,
    isLogin: true,
  });

  return (
    <div>
      <Navbar setOpenAuthModal={setOpenAuthModal} />
      <Hero />
      <Features />
      <Pricing />
      <SocialProof />
      <Footer />
      <Modal
        show={openAuthModal.open}
        popup
        onClose={() => setOpenAuthModal({ open: false, isLogin: true })}
      >
        <Modal.Body>
          <Modal.Header></Modal.Header>
          {openAuthModal.isLogin ? (
            <Login setOpenAuthModal={setOpenAuthModal} />
          ) : (
            <SignUp setOpenAuthModal={setOpenAuthModal} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
