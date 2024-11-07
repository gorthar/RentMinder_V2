"use client";

import { AlertTriangle, CheckCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MaintenanceForm } from "../MaintenanceForm";
import MaintenanceTable from "@/SharedComponents/MaintenanceTable";

export default function TenantMaintenance() {
  return (
    <div className="mx-auto">
      <div className="grid gap-6 md:grid-cols-2">
        <MaintenanceForm />
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Maintenance Tips
            </CardTitle>
            <CardDescription>Quick tips for common issues</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  For minor plumbing issues, try using a plunger before
                  submitting a request.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  Regularly replace HVAC filters to maintain air quality and
                  system efficiency.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  Check and replace smoke detector batteries every 6 months.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  For pest control, keep food in sealed containers and maintain
                  cleanliness.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <MaintenanceTable />
    </div>
  );
}
