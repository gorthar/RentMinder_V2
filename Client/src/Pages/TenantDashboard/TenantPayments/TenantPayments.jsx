import { format } from "date-fns";
import { CreditCard, Building, FileText } from "lucide-react";

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
import { PaymentForm } from "../PaymentForm";

export default function TenantPayments() {
  const paymentHistory = [
    { id: 1, date: "2023-05-01", amount: 1000, type: "Rent", status: "Paid" },
    { id: 2, date: "2023-04-01", amount: 1000, type: "Rent", status: "Paid" },
    { id: 3, date: "2023-03-01", amount: 1000, type: "Rent", status: "Paid" },
    { id: 4, date: "2023-02-01", amount: 1000, type: "Rent", status: "Paid" },
    { id: 5, date: "2023-01-01", amount: 1000, type: "Rent", status: "Paid" },
  ];

  return (
    <div className="container mx-auto">
      <div className="grid gap-6 md:grid-cols-2">
        <PaymentForm />

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Payment Summary
            </CardTitle>
            <CardDescription>Overview of your current payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Current Rent:</span>
                <span>$1000.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Next Due Date:</span>
                <span>{format(new Date(2023, 5, 1), "MMMM d, yyyy")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Late Fee:</span>
                <span>$50.00 (if paid after the 5th)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Payment Methods:</span>
                <div className="flex space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <Building className="w-5 h-5" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Payment History
          </CardTitle>
          <CardDescription>Your recent payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent payments</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    {format(new Date(payment.date), "MMMM d, yyyy")}
                  </TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.type}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
