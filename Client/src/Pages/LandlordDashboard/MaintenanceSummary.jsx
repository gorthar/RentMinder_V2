import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";
import PropTypes from "prop-types";

function MaintenanceSummary({ maintenanceRequestCount }) {
  const maintenanceRequestCountThisMonth = maintenanceRequestCount[0];
  const maintenanceRequestCountLastMonth = maintenanceRequestCount[1];
  const maintenanceRequestCountIncrease =
    maintenanceRequestCountThisMonth - maintenanceRequestCountLastMonth;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Open Maintenance Requests
        </CardTitle>
        <Wrench className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {maintenanceRequestCountThisMonth}
        </div>
        <p className="text-xs text-muted-foreground">
          {maintenanceRequestCountIncrease} from last week
        </p>
      </CardContent>
    </Card>
  );
}
export default MaintenanceSummary;
MaintenanceSummary.propTypes = {
  maintenanceRequestCount: PropTypes.array.isRequired,
};
