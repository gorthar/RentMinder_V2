import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Notifications() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="text-sm">New maintenance request submitted</li>
          <li className="text-sm">Rent payment received from 123 Main St</li>
        </ul>
      </CardContent>
    </Card>
  );
}
export default Notifications;
