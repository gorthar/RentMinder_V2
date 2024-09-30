import FinancialSummary from "./FinancialSummary";
import MaintenanceSummary from "./MaintenanceSummary";
import OccupancySummary from "./OccupancySummary";
import PropertySummary from "./PropertySummary";
import PropTypes from "prop-types";

function SummaryCards({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <PropertySummary propertyCount={data.propertyCount} />
      <FinancialSummary totalRevenue={data.totalRevenue} />
      <OccupancySummary occupancyRate={data.occupancyRate} />
      <MaintenanceSummary
        maintenanceRequestCount={data.maintenanceRequestCount}
      />
    </div>
  );
}
export default SummaryCards;
SummaryCards.propTypes = {
  data: PropTypes.object.isRequired,
};
