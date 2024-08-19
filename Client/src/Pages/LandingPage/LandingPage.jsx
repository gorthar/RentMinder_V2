import Hero from "./Hero";
import Navbar from "./Navbar";
import Features from "./Features";
import Pricing from "./Pricing";
import SocialProof from "./SocialProof";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <SocialProof />
      <Footer />
    </div>
  );
}
