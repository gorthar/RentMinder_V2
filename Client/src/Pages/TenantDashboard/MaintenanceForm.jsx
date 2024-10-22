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
import { toast } from "react-toastify";

export const MaintenanceForm = () => {
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);
  const form = useForm({
    defaultValues: {
      issueType: "",
      description: "",
      urgency: "",
    },
  });

  const onSubmit = (data) => {
    toast({
      title: "Maintenance Request Submitted",
      description: `Your ${data.urgency} request for ${data.issueType} has been submitted.`,
    });
    setIsRequestSubmitted(true);
  };

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
    </Card>
  );
};
