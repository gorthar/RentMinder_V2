import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
function PropertyMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-48">
          <MapPin className="h-24 w-24 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}
export default PropertyMap;
