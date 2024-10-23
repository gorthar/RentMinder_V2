import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import PropTypes from "prop-types";
function FinancialSummary({ totalRevenue }) {
  const totalRevenueThisMonth = totalRevenue[0];
  const totalRevenueLastMonth = totalRevenue[1];
  const revenueIncreasePercentage =
    totalRevenueLastMonth == 0
      ? 0
      : ((totalRevenueThisMonth - totalRevenueLastMonth) /
          totalRevenueLastMonth) *
        100;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${totalRevenueThisMonth}</div>
        <p className="text-xs text-muted-foreground">
          +{revenueIncreasePercentage}% from last month
        </p>
      </CardContent>
    </Card>
  );
}
export default FinancialSummary;
FinancialSummary.propTypes = {
  totalRevenue: PropTypes.array.isRequired,
};
