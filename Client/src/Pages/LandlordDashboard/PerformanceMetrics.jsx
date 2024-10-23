import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";
function PerformanceMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-48">
          <BarChart2 className="h-24 w-24 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}
export default PerformanceMetrics;
