import FinancialSummary from "./FinancialSummary";
import MaintenanceSummary from "./MaintenanceSummary";
import OccupancySummary from "./OccupancySummary";
import PropertySummary from "./PropertySummary";

function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <PropertySummary />
      <FinancialSummary />
      <OccupancySummary />
      <MaintenanceSummary />
    </div>
  );
}
export default SummaryCards;
