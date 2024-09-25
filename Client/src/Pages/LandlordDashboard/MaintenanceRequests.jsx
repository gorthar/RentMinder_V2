import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function MaintenanceRequests() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>Leaky Faucet - 123 Main St</span>
            <span className="text-yellow-500">Pending</span>
          </li>
          <li className="flex justify-between items-center">
            <span>HVAC Repair - 456 Elm St</span>
            <span className="text-red-500">Urgent</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
export default MaintenanceRequests;
