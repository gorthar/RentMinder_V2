import Hero from "./Hero";
import Navbar from "./Navbar";
import Features from "./Features";
import Pricing from "./Pricing";

export default function LandingPage() {
  return (
    <div className=" bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
    </div>
  );
}
