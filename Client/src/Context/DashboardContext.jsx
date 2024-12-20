import { createContext, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

export const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const queryClient = useQueryClient();

  const invalidatePropertyList = useCallback(() => {
    queryClient.invalidateQueries(["Property"]);
  }, [queryClient]);

  const invalidatePropertyDetails = useCallback(
    (propertyId) => {
      queryClient.invalidateQueries(["Property", propertyId]);
    },
    [queryClient]
  );

  const value = {
    invalidatePropertyList,
    invalidatePropertyDetails,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
DashboardProvider.propTypes = {
  children: PropTypes.node,
};
