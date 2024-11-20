import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePaginatedQuery from "@/Utilities/usePaginatedQuery";

import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function PropertyList() {
  const navigate = useNavigate();

  const {
    data: properties,
    page,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    isLoading,
    isError,
    error,
    isFetching,
  } = usePaginatedQuery("Property", 5);
  console.log("Properties:", properties);

  const handlePropertyClick = (id) => {
    navigate(`/landlord/${id}`);
  };

  if (isError) return <div>Error loading properties: {error.message}</div>;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Property List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((property) => (
                    <TableRow
                      key={property.id}
                      onClick={() => handlePropertyClick(property.id)}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <TableCell>{property.address}</TableCell>
                      <TableCell>
                        <span
                          className={
                            property.isOccupied
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {property.isOccupied ? "Occupied" : "Vacant"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-between items-center">
                <Button
                  onClick={goToPreviousPage}
                  disabled={page === 1 || isFetching}
                >
                  Previous Page
                </Button>
                <span>
                  Page {page} of {totalPages}
                  {isFetching ? " (Updating...)" : ""}
                </span>
                <Button
                  onClick={goToNextPage}
                  disabled={page === totalPages || isFetching}
                >
                  Next Page
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default PropertyList;
