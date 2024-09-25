import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Property
          </Button>
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Create Maintenance Request
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
export default QuickActions;
