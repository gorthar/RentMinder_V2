import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePaginatedQuery from "@/Utilities/usePaginatedQuery";
import { Loader2 } from "lucide-react";

function MaintenanceRequests() {
  const {
    data: requests,
    page,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    isLoading,
    isError,
    error,
  } = usePaginatedQuery("MaintenanceRequest");

  if (isError)
    return <div>Error loading maintenance requests: {error.message}</div>;
  console.log("Requests:", requests);
  console.log("Page:", page);
  console.log("Total Pages:", totalPages);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date Submitted</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.propertyAddress}</TableCell>
                  <TableCell>{request.description}</TableCell>
                  <TableCell>
                    {new Date(request.dateSubmitted).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        request.status === "Pending"
                          ? "text-yellow-500"
                          : request.status === "In Progress"
                          ? "text-blue-500"
                          : request.status === "Completed"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {request.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <div className="mt-4 flex justify-between items-center">
          <Button onClick={goToPreviousPage} disabled={page === 1}>
            Previous Page
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button onClick={goToNextPage} disabled={page >= totalPages}>
            Next Page
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default MaintenanceRequests;
