import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import PropTypes from "prop-types";
function PropertySummary({ propertyCount }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
        <Home className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{propertyCount[0]}</div>
        <p className="text-xs text-muted-foreground">
          +{propertyCount[0] - propertyCount[1]} from last month
        </p>
      </CardContent>
    </Card>
  );
}
export default PropertySummary;
PropertySummary.propTypes = {
  propertyCount: PropTypes.array.isRequired,
};
