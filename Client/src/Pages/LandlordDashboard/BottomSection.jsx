import FinancialCharts from "./FinancialCharts";
import PerformanceMetrics from "./PerformanceMetrics";
import PropertyMap from "./PropertyMap";

function BottomSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <PerformanceMetrics />
      <FinancialCharts />
      <PropertyMap />
    </div>
  );
}
export default BottomSection;
