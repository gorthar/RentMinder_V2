import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import AddPropertyModal from "./AddPropertyModal";
import CreateMaintenanceRequestModal from "./CreateMaintenanceRequestModal";
import { useDashboardContext } from "@/Context/useDashboardContext";

function QuickActions() {
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const { invalidatePropertyList } = useDashboardContext();

  const handlePropertyAdded = () => {
    setIsAddPropertyModalOpen(false);
    invalidatePropertyList();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button
            className="w-full"
            onClick={() => setIsAddPropertyModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Property
          </Button>
          <Button
            className="w-full"
            onClick={() => setIsMaintenanceModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Create Maintenance Request
          </Button>
        </div>
      </CardContent>
      <AddPropertyModal
        isOpen={isAddPropertyModalOpen}
        onClose={() => setIsAddPropertyModalOpen(false)}
        onPropertyAdded={handlePropertyAdded}
      />
      <CreateMaintenanceRequestModal
        isOpen={isMaintenanceModalOpen}
        onClose={() => setIsMaintenanceModalOpen(false)}
      />
    </Card>
  );
}

export default QuickActions;
