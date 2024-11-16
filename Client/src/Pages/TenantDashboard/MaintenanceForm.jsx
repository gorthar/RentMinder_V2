// src/components/Forms/MaintenanceForm.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Wrench as Tool } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IssueTypeField } from "./Fields/IssueTypeField";
import { DescriptionField } from "./Fields/DescriptionField";
import { UrgencyField } from "./Fields/UrgencyField";
import apiConnector from "@/ApiConnector/connector";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const MaintenanceForm = () => {
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);
  const [requestError, setRequestError] = useState(false);

  const { data } = useQuery({
    queryKey: ["tenantDashboard"],
    queryFn: apiConnector.TenantDashboard.getTenantDashboard,
  });
  const queryClient = useQueryClient();
  const location = window.location.href;

  console.log("tenant Data from maintenance form", data);
  const form = useForm({
    defaultValues: {
      issueType: "",
      description: "",
      urgency: "",
    },
  });
  if (!data) {
    return <div>Loading...</div>;
  }

  const onSubmit = (formData) => {
    const result = apiConnector.TenantMaintenanceRequest.create({
      PropertyId: data.activeLeases[0].propertyId,
      PropertyAddress: data.activeLeases[0].propertyAddress,
      description: formData.description,
      status: "Received",
    });
    if (result) {
      toast(
        `Your ${formData.urgency} request for ${formData.issueType} has been submitted.`,
        {
          theme: "light",
        }
      );
      if (location.includes("maintenance")) {
        queryClient.invalidateQueries("MaintenanceRequest");
      } else queryClient.invalidateQueries("tenantDashboard");

      setIsRequestSubmitted(true);
      setRequestError(false);
    } else {
      setIsRequestSubmitted(false);
      setRequestError(true);
    }
  };

  if (data.activeLeases.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Tool className="w-5 h-5 mr-2" />
            Maintenance Request
          </CardTitle>
          <CardDescription>
            You do not have any active leases. Please contact your landlord to
            renew your lease.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Tool className="w-5 h-5 mr-2" />
          Maintenance Request
        </CardTitle>
        <CardDescription>Submit a new maintenance request</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <IssueTypeField control={form.control} />
            <DescriptionField control={form.control} />
            <UrgencyField control={form.control} />
            <Button type="submit" className="w-full">
              Submit Request
            </Button>
          </form>
        </Form>
      </CardContent>
      {isRequestSubmitted && (
        <CardFooter>
          <p className="text-green-600">
            Maintenance request submitted successfully!
          </p>
        </CardFooter>
      )}
      {requestError && (
        <CardFooter>
          <p className="text-red-600">
            An error occured while submitting the form. Try again later
          </p>
        </CardFooter>
      )}
    </Card>
  );
};
