import { useQuery } from "@tanstack/react-query";
import BottomSection from "./BottomSection";
import Header from "./Header";
import MainContent from "./MainContent";
import SummaryCards from "./SummaryCards";
import apiConnector from "@/ApiConnector/connector";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

function LandlordDashboard() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["landlordDashboard"],
    queryFn: apiConnector.LandlordDashboard.getLandlordDasboard,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin" />
        <h2 className="mt-4 text-lg">Loading...</h2>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching landlord dashboard data: ", error);
    toast.error("Error fetching landlord dashboard data");
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="mt-4 text-lg">
          An error occurred. Please try again later.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <SummaryCards data={data} />
        <MainContent />
        <BottomSection />
      </div>
    </div>
  );
}
export default LandlordDashboard;
