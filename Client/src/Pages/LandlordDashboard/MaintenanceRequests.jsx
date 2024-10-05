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

  if (isLoading) return <div>Loading maintenance requests...</div>;
  if (isError)
    return <div>Error loading maintenance requests: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Requests</CardTitle>
      </CardHeader>
      <CardContent>
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
        <div className="mt-4 flex justify-between items-center">
          <Button onClick={goToPreviousPage} disabled={page === 1}>
            Previous Page
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button onClick={goToNextPage} disabled={page === totalPages}>
            Next Page
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default MaintenanceRequests;
