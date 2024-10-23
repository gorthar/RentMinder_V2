import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>New tenant moved in at 789 Oak St</li>
          <li>Maintenance completed at 123 Main St</li>
        </ul>
      </CardContent>
    </Card>
  );
}
export default RecentActivity;
