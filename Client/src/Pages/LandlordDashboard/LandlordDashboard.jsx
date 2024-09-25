import BottomSection from "./BottomSection";
import Header from "./Header";
import MainContent from "./MainContent";
import SummaryCards from "./SummaryCards";

function LandlordDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <SummaryCards />
        <MainContent />
        <BottomSection />
      </div>
    </div>
  );
}
export default LandlordDashboard;
