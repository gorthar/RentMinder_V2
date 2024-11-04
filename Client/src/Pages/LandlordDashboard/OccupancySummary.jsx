import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import PropTypes from "prop-types";
function OccupancySummary({ occupancyRate }) {
  const occupancyRateThisMonth = occupancyRate[0];
  const occupancyRateLastMonth = occupancyRate[1];
  const occupancyRateIncreasePercentage =
    occupancyRateLastMonth == 0
      ? 0
      : ((occupancyRateThisMonth - occupancyRateLastMonth) /
          occupancyRateLastMonth) *
        100;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{occupancyRateThisMonth}%</div>
        <p className="text-xs text-muted-foreground">
          {occupancyRateIncreasePercentage > 0 ? "+" : ""}
          {occupancyRateIncreasePercentage.toFixed(1)}% from last month
        </p>
      </CardContent>
    </Card>
  );
}
export default OccupancySummary;
OccupancySummary.propTypes = {
  occupancyRate: PropTypes.array.isRequired,
};
