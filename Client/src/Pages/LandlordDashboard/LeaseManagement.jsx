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

function LeaseManagement() {
  const {
    data: leases,
    page,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    isLoading,
    isError,
    error,
  } = usePaginatedQuery("Lease");

  if (isLoading) return <div>Loading leases...</div>;
  if (isError) return <div>Error loading leases: {error.message}</div>;
  console.log(`Lease pages: ${page} of ${totalPages}`);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lease Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tenant</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leases.map((lease) => (
              <TableRow key={lease.id}>
                <TableCell>{lease.tenantName}</TableCell>
                <TableCell>{lease.propertyAddress}</TableCell>
                <TableCell>${lease.monthlyRent}</TableCell>
                <TableCell>
                  <span
                    className={
                      lease.status === "Active"
                        ? "text-green-500"
                        : lease.status === "Expiring Soon"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }
                  >
                    {lease.status}
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
export default LeaseManagement;
