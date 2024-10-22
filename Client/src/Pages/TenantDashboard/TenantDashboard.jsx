import { PaymentForm } from "./PaymentForm";
import { MaintenanceForm } from "./MaintenanceForm";
import { SummaryCard } from "./SummaryCard";
import { CalendarIcon, DollarSign, Wrench } from "lucide-react";

export default function TenantDashboard() {
  const recentTransactions = [
    { label: "Rent Payment", value: "$1000.00" },
    { label: "Utility Bill", value: "$150.00" },
    { label: "Parking Fee", value: "$50.00" },
  ];

  const upcomingPayments = [
    { label: "Rent (Due in 5 days)", value: "$1000.00" },
    { label: "Utility Bill (Due in 12 days)", value: "$160.00" },
  ];

  const maintenanceRequests = [
    {
      label: "Leaky Faucet",
      value: "In Progress",
      statusClass: "text-yellow-600",
    },
    {
      label: "Broken Window",
      value: "Completed",
      statusClass: "text-green-600",
    },
    { label: "HVAC Issue", value: "Pending", statusClass: "text-red-600" },
  ];

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        <PaymentForm />
        <MaintenanceForm />
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-6">
        <SummaryCard
          title="Recent Transactions"
          icon={DollarSign}
          items={recentTransactions}
        />
        <SummaryCard
          title="Upcoming Payments"
          icon={CalendarIcon}
          items={upcomingPayments}
        />
        <SummaryCard
          title="Maintenance Requests"
          icon={Wrench}
          items={maintenanceRequests}
        />
      </div>
    </div>
  );
}
