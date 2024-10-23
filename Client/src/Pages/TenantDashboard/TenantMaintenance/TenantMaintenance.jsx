"use client";

import { format } from "date-fns";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react";

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
import { Badge } from "@/components/ui/badge";

import { MaintenanceForm } from "../MaintenanceForm";

export default function TenantMaintenance() {
  const maintenanceHistory = [
    {
      id: 1,
      date: "2023-05-10",
      issue: "Leaky Faucet",
      status: "In Progress",
      urgency: "Medium",
    },
    {
      id: 2,
      date: "2023-04-15",
      issue: "Broken Window",
      status: "Completed",
      urgency: "High",
    },
    {
      id: 3,
      date: "2023-03-20",
      issue: "HVAC Repair",
      status: "Scheduled",
      urgency: "Low",
    },
    {
      id: 4,
      date: "2023-02-05",
      issue: "Pest Control",
      status: "Completed",
      urgency: "Medium",
    },
    {
      id: 5,
      date: "2023-01-12",
      issue: "Electrical Outlet",
      status: "Completed",
      urgency: "High",
    },
  ];

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

      <Card className="mt-6 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Maintenance Request History
          </CardTitle>
          <CardDescription>Your recent maintenance requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>
              A list of your recent maintenance requests
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Urgency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceHistory.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    {format(new Date(request.date), "MMMM d, yyyy")}
                  </TableCell>
                  <TableCell>{request.issue}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "Completed"
                          ? "success"
                          : request.status === "In Progress"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {request.status === "Completed" && (
                        <CheckCircle className="w-4 h-4 mr-1" />
                      )}
                      {request.status === "In Progress" && (
                        <Clock className="w-4 h-4 mr-1" />
                      )}
                      {request.status === "Scheduled" && (
                        <Calendar className="w-4 h-4 mr-1" />
                      )}
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.urgency === "High"
                          ? "destructive"
                          : request.urgency === "Medium"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {request.urgency}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
