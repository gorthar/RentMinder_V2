import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "flowbite-react";

function LeaseManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lease Management</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>John Doe - 123 Main St</span>
            <span className="text-yellow-500">Expires in 30 days</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Jane Smith - 456 Elm St</span>
            <span className="text-green-500">New Lease</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
export default LeaseManagement;
