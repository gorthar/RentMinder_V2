import { useCallback, useEffect, useState } from "react";
import {
  MapPin,
  Edit,
  Home,
  Bed,
  Bath,
  Ruler,
  Calendar,
  Save,
  X,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiConnector from "@/ApiConnector/connector";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "react-toastify";
import { useDashboardContext } from "@/Context/useDashboardContext";

import AddLeaseModal from "./AddLeaseModal";
import MaintenanceTable from "@/SharedComponents/MaintenanceTable";

export default function PropertyDetails() {
  const { propertyId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const fetchData = useCallback(async () => {
    const result = await apiConnector.Property.getById(propertyId);
    return result;
  }, [propertyId]);
  const { invalidatePropertyList, invalidatePropertyDetails } =
    useDashboardContext();

  const { data, isLoading } = useQuery({
    queryKey: ["PropertyDetail", propertyId],
    queryFn: fetchData,
    refetchInterval: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const [propertyData, setPropertyData] = useState();

  const handleEdit = () => {
    setIsEditing(true);
  };
  function handleOnClose() {
    setIsOpen(false);
  }

  async function handleSave() {
    setIsEditing(false);
    try {
      await apiConnector.Property.update(
        propertyData.property.id,
        propertyData.property
      );
      invalidatePropertyList();
      setIsEditing(false);
      toast.success("Property updated successfully!");
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error("Failed to update property. Please try again.");
    }
  }

  const handleCancel = () => {
    setIsEditing(false);
    setPropertyData(data);
  };
  const navigate = useNavigate();

  useEffect(() => {
    setPropertyData(data);
    console.log(data);
  }, [isLoading, data]);

  if (!propertyData)
    return (
      <div className="flex items-center flex-col justify-center h-screen ">
        <Loader2 className="h-20 w-20 animate-spin" />
        <br />
        <h2 className="mt-4 text-xl">Loading...</h2>
      </div>
    );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      property: {
        ...prevData.property,
        [name]: value,
      },
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      property: {
        ...prevData.property,
        [name]: checked,
      },
    }));
  };

  function onLeaseAdded() {
    invalidatePropertyDetails(data.id);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Property Details</h1>
        {!isEditing ? (
          <div className="flex gap-2">
            <Button
              onClick={() => navigate("/landlord")}
              variant="outline"
              className="mr-2"
            >
              <Home className="mr-2 h-4 w-4" /> Back{" "}
              <span className="hidden sm:block">to Dashboard</span>
            </Button>
            <Button onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" /> Edit{" "}
              <span className="hidden sm:block">Property</span>
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="mr-2">
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            {isEditing ? (
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={propertyData.property.address}
                  onChange={handleInputChange}
                  className="mb-2"
                />
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={propertyData.property.description}
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              <>
                <CardTitle>{propertyData.property.address}</CardTitle>
                <CardDescription>
                  {propertyData.property.description}
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Bed className="mr-2 h-4 w-4" />
                {isEditing ? (
                  <Input
                    type="number"
                    name="numberOfBedrooms"
                    value={propertyData.property.numberOfBedrooms}
                    onChange={handleInputChange}
                    className="w-20"
                  />
                ) : (
                  <span>{propertyData.property.numberOfBedrooms} Bedrooms</span>
                )}
              </div>
              <div className="flex items-center">
                <Bath className="mr-2 h-4 w-4" />
                {isEditing ? (
                  <Input
                    type="number"
                    name="numberOfBathrooms"
                    value={propertyData.property.numberOfBathrooms}
                    onChange={handleInputChange}
                    className="w-20"
                  />
                ) : (
                  <span>
                    {propertyData.property.numberOfBathrooms} Bathrooms
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <Ruler className="mr-2 h-4 w-4" />
                {isEditing ? (
                  <Input
                    type="number"
                    name="squareFootage"
                    value={propertyData.property.squareFootage}
                    onChange={handleInputChange}
                    className="w-24"
                  />
                ) : (
                  <span>{propertyData.property.squareFootage} sq ft</span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              {isEditing ? (
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isOccupied"
                    checked={propertyData.property.isOccupied}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Occupied
                </label>
              ) : (
                <Badge
                  variant={
                    propertyData.property.isOccupied ? "default" : "secondary"
                  }
                >
                  {propertyData.property.isOccupied ? "Occupied" : "Vacant"}
                </Badge>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>
                Added:{" "}
                {new Date(propertyData.property.dateAdded).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>
                Modified:{" "}
                {new Date(
                  propertyData.property.lastModified
                ).toLocaleDateString()}
              </span>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-muted flex items-center justify-center">
              <MapPin className="h-12 w-12 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      <Button className="mt-6" onClick={() => setIsOpen(true)}>
        Add Lease
      </Button>
      <Tabs defaultValue="leases" className="mt-6">
        <ScrollArea>
          <TabsList>
            <TabsTrigger value="leases">Leases</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance Requests</TabsTrigger>
            <TabsTrigger value="inspections">Inspections</TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="leases">
          <Card>
            <CardHeader>
              <CardTitle>Lease History</CardTitle>
            </CardHeader>
            <CardContent>
              {!data.leases ? (
                <h2>No lease found</h2>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Monthly Rent</TableHead>
                      <TableHead>Security Deposit</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.leases.map((lease) => (
                      <TableRow key={lease.id}>
                        <TableCell>{lease.tenantName}</TableCell>
                        <TableCell>
                          {new Date(lease.startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(lease.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>${lease.monthlyRent.toFixed(2)}</TableCell>
                        <TableCell>
                          ${lease.securityDeposit.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              lease.status === "Active" ? "" : "destructive"
                            }
                          >
                            {lease.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              {data.rentPayments.length === 0 ? (
                <h2>No payment found</h2>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Tenant</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.rentPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          {new Date(payment.paymentDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>{payment.paymentMethod}</TableCell>
                        <TableCell>{payment.tenantName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="maintenance">
          <MaintenanceTable propertyId={propertyId} />
        </TabsContent>
        <TabsContent value="inspections">
          <Card>
            <CardHeader>
              <CardTitle>Inspection History</CardTitle>
            </CardHeader>
            <CardContent>
              {data.inspections.length === 0 ? (
                <h2>No inspections found</h2>
              ) : (
                data.inspections.map((inspection) => (
                  <div key={inspection.id} className="mb-4">
                    <h3 className="font-semibold">
                      Inspection on{" "}
                      {new Date(inspection.date).toLocaleDateString()}
                    </h3>
                    <p>Inspector: {inspection.inspector}</p>
                    <p>Result: {inspection.result}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <AddLeaseModal
        isOpen={isOpen}
        onClose={handleOnClose}
        propertyId={propertyId}
        onLeaseAdded={onLeaseAdded}
      />
    </div>
  );
}
