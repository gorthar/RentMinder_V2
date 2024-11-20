import { useQuery } from "@tanstack/react-query";
import BottomSection from "./BottomSection";
import Header from "./Header";
import MainContent from "./MainContent";
import SummaryCards from "./SummaryCards";
import apiConnector from "@/ApiConnector/connector";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { DashboardProvider } from "../../Context/DashboardContext";

function LandlordDashboard() {
  const { isLoading, data, error } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["landlordDashboard"],
    queryFn: apiConnector.LandlordDashboard.getLandlordDasboard,
  });
  console.log(data);

  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center h-screen w-screen">
        <Loader2 className="h-20 w-20 animate-spin text-emerald-500" />
        <br />
        <h2 className="mt-4 text-xl">Loading...</h2>
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
      <DashboardProvider>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <SummaryCards data={data} />
          <MainContent />
          <BottomSection />
        </div>
      </DashboardProvider>
    </div>
  );
}
export default LandlordDashboard;
