import LeaseManagement from "./LeaseManagement";
import MaintenanceRequests from "./MaintenanceRequests";
import PropertyList from "./PropertyList";

function LeftColumn() {
  return (
    <div className="space-y-8">
      <PropertyList />
      <LeaseManagement />
      <MaintenanceRequests />
    </div>
  );
}
export default LeftColumn;
