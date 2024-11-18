import { createBrowserRouter, Navigate } from "react-router-dom";
import RequireLandlord from "./RequireLandlord";
import LandlordDashboard from "@/Pages/LandlordDashboard/LandlordDashboard";
import LandingPage from "@/Pages/LandingPage/LandingPage";
import App from "@/App";
import LoggingOut from "@/Pages/AuthPages/LoggingOut";
import PropertyDetails from "@/Pages/LandlordDashboard/PropertyDetails";
import RequireTenant from "./RequireTenant";
import TenantDashboard from "@/Pages/TenantDashboard/TenantDashboard";
import TenantLayout from "@/Pages/TenantDashboard/TenantLayout";
import TenantPayments from "@/Pages/TenantDashboard/TenantPayments/TenantPayments";
import TenantMaintenance from "@/Pages/TenantDashboard/TenantMaintenance/TenantMaintenance";
import MaintenanceDetails from "@/SharedComponents/MaintenanceDetails";
import NotFoundPage from "@/Pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireLandlord />,
        children: [
          {
            path: "/landlord",
            element: <LandlordDashboard />,
          },
          {
            path: "/landlord/:propertyId",
            element: <PropertyDetails />,
          },
          {
            path: "/landlord/maintenance/:maintenanceId",
            element: <MaintenanceDetails />,
          },
        ],
      },
      {
        path: "/tenant",
        element: <RequireTenant />,
        children: [
          {
            element: <TenantLayout />,
            children: [
              {
                path: "/tenant/dashboard",
                element: <TenantDashboard />,
              },
              {
                path: "/tenant/payments",
                element: <TenantPayments />,
              },
              {
                path: "/tenant/maintenance",
                element: <TenantMaintenance />,
              },
              {
                path: "/tenant/maintenance/:maintenanceId",
                element: <MaintenanceDetails />,
              },
            ],
          },
        ],
      },
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/logout",
        element: <LoggingOut />,
      },
      {
        path: "not-found",
        element: <NotFoundPage />,
      },
      {
        path: "*",
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
]);
