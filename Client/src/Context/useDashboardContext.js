import { useContext } from "react";
import { DashboardContext } from "./DashboardContext";

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
}
