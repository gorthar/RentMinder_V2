import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function PropertyList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property List</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>123 Main St</span>
            <span className="text-green-500">Occupied</span>
          </li>
          <li className="flex justify-between items-center">
            <span>456 Elm St</span>
            <span className="text-yellow-500">Pending Lease</span>
          </li>
          <li className="flex justify-between items-center">
            <span>789 Oak St</span>
            <span className="text-red-500">Vacant</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
export default PropertyList;
