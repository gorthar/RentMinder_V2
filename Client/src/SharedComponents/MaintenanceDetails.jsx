import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { ArrowLeft, Building2, Edit2, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import apiConnector from "@/ApiConnector/connector";
import { toast } from "react-toastify";
import usePaginatedQuery from "@/Utilities/usePaginatedQuery";

export default function MaintenanceDetails() {
  const { maintenanceId } = useParams();
  const isLandlord = window.location.pathname.includes("landlord");

  const initialRequest = {};

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [request, setRequest] = useState(initialRequest);
  const [isEditing, setIsEditing] = useState(false);
  const { invalidateQuery } = usePaginatedQuery("MaintenanceRequest");
  console.log("Maintenance ID:", maintenanceId);
  const fetchData = useCallback(async () => {
    const response = await apiConnector.MaintenanceRequest.getById(
      maintenanceId
    );
    console.log("Fetched maintenance request:", response);
    setRequest(response);
  }, [maintenanceId]);

  useEffect(() => {
    fetchData();
    setTimeout(() => setIsLoading(false), 500);
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Loader2 className="mx-auto w-36 h-36 animate-spin text-emerald-500" />
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the request
    console.log("Updating maintenance request:", request);
    const response = apiConnector.MaintenanceRequest.update(
      request.id,
      request
    );
    console.log("Updated maintenance request:", response);
    if (!response) {
      toast.error("Failed to update maintenance request");
      return;
    }
    invalidateQuery();
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return dateString ? format(new Date(dateString), "PPP") : "N/A";
  };

  return (
    <div
      className={
        isLandlord ? "h-screen flex items-center justify-center w-full" : ""
      }
    >
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">
              Maintenance Request #{request.id}
            </CardTitle>
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Previous page
            </Button>
          </div>
          <CardDescription>
            Submitted on {formatDate(request.dateSubmitted)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              {isEditing ? (
                <Textarea
                  id="description"
                  name="description"
                  value={request.description}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1">{request.description}</p>
              )}
            </div>
            <div>
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              {isEditing ? (
                <Select
                  onValueChange={(value) => handleSelectChange("status", value)}
                  defaultValue={request.status}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="mt-1">{request.status}</p>
              )}
            </div>
            <div>
              <Label htmlFor="urgency" className="text-sm font-medium">
                Urgency
              </Label>
              {isEditing ? (
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("urgency", value)
                  }
                  defaultValue={request.urgency}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="mt-1">{request.urgency}</p>
              )}
            </div>
            <div>
              <Label htmlFor="cost" className="text-sm font-medium">
                Cost
              </Label>
              {isEditing ? (
                <Input
                  id="cost"
                  name="cost"
                  type="number"
                  value={request.cost || ""}
                  onChange={handleInputChange}
                  className="mt-1"
                  step="0.01"
                />
              ) : (
                <p className="mt-1">
                  {request.cost
                    ? `$${parseFloat(request.cost).toFixed(2)}`
                    : "N/A"}
                </p>
              )}
            </div>
            <div>
              <Label className="text-sm font-medium">Date Submitted</Label>
              <p className="mt-1">{formatDate(request.dateSubmitted)}</p>
            </div>
            <div>
              <Label htmlFor="dateResolved" className="text-sm font-medium">
                Date Resolved
              </Label>
              {isEditing ? (
                <Input
                  id="dateResolved"
                  name="dateResolved"
                  type="date"
                  value={
                    request.dateResolved
                      ? request.dateResolved.split("T")[0]
                      : ""
                  }
                  onChange={handleInputChange}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1">{formatDate(request.dateResolved)}</p>
              )}
            </div>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Building2 className="mr-2 h-5 w-5" />
              <Label className="text-sm font-medium">Property Address</Label>
            </div>

            <p className="text-sm">{request.propertyAddress}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Last updated: {format(new Date(), "PPP")}
          </p>
          {isEditing ? (
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="mr-2 h-4 w-4" /> Edit Request
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
