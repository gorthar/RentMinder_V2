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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePaginatedQuery from "@/Utilities/usePaginatedQuery";
import { Loader2 } from "lucide-react";

function PaymentsTable() {
  const {
    data: payments,
    page,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    isLoading,
    isError,
    error,
    isFetching,
  } = usePaginatedQuery("Payment", 5);
  console.log(payments);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Loader2 className="mx-auto" />
        </CardContent>
      </Card>
    );
  }
  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{error.message}</CardDescription>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <h2>No payment found</h2>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
export default PaymentsTable;
