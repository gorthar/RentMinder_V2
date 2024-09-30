import { createBrowserRouter } from "react-router-dom";
import RequireLandlord from "./RequireLandlord";
import LandlordDashboard from "@/Pages/LandlordDashboard/LandlordDashboard";
import LandingPage from "@/Pages/LandingPage/LandingPage";
import App from "@/App";
import LoggingOut from "@/Pages/AuthPages/LoggingOut";

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
