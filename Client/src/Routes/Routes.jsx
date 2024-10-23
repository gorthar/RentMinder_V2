import { createBrowserRouter } from "react-router-dom";
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
    ],
  },
]);
