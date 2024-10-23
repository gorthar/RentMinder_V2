import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

function FinancialCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Charts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-48">
          <DollarSign className="h-24 w-24 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}
export default FinancialCharts;
