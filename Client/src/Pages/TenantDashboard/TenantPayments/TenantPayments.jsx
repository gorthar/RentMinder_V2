import { format } from "date-fns";
import { CreditCard, Building, FileText } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PaymentForm } from "../PaymentForm";
import PaymentsTable from "@/SharedComponents/PaymentsTable";

export default function TenantPayments() {
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

      <PaymentsTable />
    </div>
  );
}
