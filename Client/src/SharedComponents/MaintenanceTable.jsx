import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { format } from "date-fns";
import { Calendar, CheckCircle, Clock, FileText, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import usePaginatedQueryWithOptions from "@/Utilities/usePaginatedQueryWithOptions";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function MaintenanceTable({ propertyId }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isTanent = window.location.pathname.includes("tenant");
  if (!propertyId && isTanent) {
    const cachedData = queryClient.getQueryData(["tenantDashboard"]);
    if (!cachedData) {
      return <div>Loading...</div>; // or handle missing data case
    }
    if (!cachedData.activeLeases.length) {
      return (
        <Card className="mt-3">
          <CardHeader>
            <CardTitle>Maintenance Request History</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              No maintenance requests found. You need to have an active lease to
              view maintenance requests.
            </CardDescription>
          </CardContent>
        </Card>
      );
    }
    propertyId = cachedData.activeLeases[0].propertyId;
  }
  const options = { id: propertyId, initialPageSize: 5 };
  const {
    data: maintenanceHistory,
    page,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    isLoading,
    isError,
    error,
    isFetching,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = usePaginatedQueryWithOptions("MaintenanceRequest", options);
  console.log(maintenanceHistory);

  if (isLoading) {
    return (
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Maintenance Request History</CardTitle>
        </CardHeader>
        <CardContent>
          <Loader2 className="mx-auto animate-spin " />
        </CardContent>
      </Card>
    );
  }
  if (isError) {
    return (
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Maintenance Request History</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{error.message}</CardDescription>
        </CardContent>
      </Card>
    );
  }
  if (!maintenanceHistory.length) {
    return (
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Maintenance Request History</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>No maintenance requests found</CardDescription>
        </CardContent>
      </Card>
    );
  }
  function handleClick(id) {
    navigate(`/${isTanent ? "tenant" : "landlord"}/maintenance/${id}`);
  }
  return (
    <>
      <Card className="mt-2 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Maintenance Request History
          </CardTitle>
          <CardDescription>Your recent maintenance requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>
              A list of your recent maintenance requests
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Urgency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceHistory.map((request) => (
                <TableRow
                  key={request.id}
                  onClick={() => {
                    handleClick(request.id);
                  }}
                  className="cursor-pointer"
                >
                  <TableCell>
                    {
                      // time format 2024-10-30T23:25:54.667818Z request.dateSubmitted
                      format(new Date(request.dateSubmitted), "MMMM d, yyyy")
                    }
                  </TableCell>
                  <TableCell>{request.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "Completed"
                          ? "success"
                          : request.status === "In Progress"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {request.status === "Completed" && (
                        <CheckCircle className="w-4 h-4 mr-1" />
                      )}
                      {request.status === "In Progress" && (
                        <Clock className="w-4 h-4 mr-1" />
                      )}
                      {request.status === "Received" && (
                        <Calendar className="w-4 h-4 mr-1" />
                      )}
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.urgency === "High"
                          ? "destructive"
                          : request.urgency === "Medium"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {request.urgency}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-between items-center">
            <Button
              onClick={goToPreviousPage}
              disabled={page === 1 || isFetching}
            >
              Previous Page
            </Button>
            <span>
              Page {page} of {totalPages}
              {isFetching ? " (Updating...)" : ""}
            </span>
            <Button
              onClick={goToNextPage}
              disabled={page === totalPages || isFetching}
            >
              Next Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
export default MaintenanceTable;
