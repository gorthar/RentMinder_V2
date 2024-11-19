import { PaymentForm } from "./PaymentForm";
import { MaintenanceForm } from "./MaintenanceForm";
import { SummaryCard } from "./SummaryCard";
import { CalendarIcon, DollarSign, Loader2, Wrench } from "lucide-react";
import apiConnector from "@/ApiConnector/connector";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function TenantDashboard() {
  const { isLaoding, data, error } = useQuery({
    queryKey: ["tenantDashboard"],
    queryFn: apiConnector.TenantDashboard.getTenantDashboard,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
  console.log(data);
  if (isLaoding) {
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <Loader2 className="h-20 w-20 animate-spin" />
        <br />
        <h2 className="mt-4 text-xl">Loading...</h2>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="mt-4 text-lg">
          No active leases found. Please contact your landlord.
        </h2>
      </div>
    );
  }

  function formatString(str, length = 15) {
    return str.length > length ? `${str.substring(0, 15)}...` : str;
  }
  function calculateDateDifference(dateString) {
    const targetDate = new Date(dateString);
    const today = new Date();

    // Calculate the difference in days
    const timeDifference = targetDate - today;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days

    return daysDifference >= 0 ? daysDifference : 0; // Prevent negative days if past
  }

  const recentTransactions = data?.recentTransactions.map((transaction) => ({
    label: formatString(transaction.propertyAddress),
    value: `$${transaction.amount}`,
  }));

  const upcomingPayments = data?.upcomingPayments.map((payment) => ({
    label: `${formatString(
      payment.propertyAddress,
      7
    )}\n Due: ${calculateDateDifference(payment.paymentDueDate)} days`,
    value: `$${payment.paymentAmount}`,
  }));

  const maintenanceRequests = data?.recentMaintenanceRequests.map(
    (request) => ({
      label: formatString(request.propertyAddress),
      value: request.status,
      statusClass:
        request.status === "Completed" ? "text-green-600" : "text-yellow-600",
    })
  );

  if (isLaoding) {
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <Loader2 className="h-20 w-20 animate-spin" />
        <br />
        <h2 className="mt-4 text-xl">Loading...</h2>
      </div>
    );
  }
  if (error) {
    console.error("Error fetching tenant dashboard data: ", error);
    toast.error("Error fetching tenant dashboard data");
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="mt-4 text-lg">
          An error occurred. Please try again later.
        </h2>
      </div>
    );
  }

  if (data.activeLeases.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="mt-4 text-lg">
          No active leases found. Please contact your landlord.
        </h2>
      </div>
    );
  }

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
