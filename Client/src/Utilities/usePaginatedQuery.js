import { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiConnector from "@/ApiConnector/connector";

const usePaginatedQuery = (entityName, initialPageSize = 5) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const queryClient = useQueryClient();

  const fetchData = useCallback(async ({ queryKey }) => {
    const [entityName, currentPage, currentPageSize] = queryKey;
    console.log(
      `Fetching ${entityName} data for page ${currentPage} and page size ${currentPageSize}`
    );
    const result = await apiConnector[entityName].getAll(
      currentPage,
      currentPageSize
    );

    return result;
  }, []);

  const queryKey = [entityName, page, pageSize];

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey,
    queryFn: fetchData,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
  });

  const totalPages = data ? Math.ceil(data.totalCount / data.pageSize) : 0;

  const goToNextPage = useCallback(() => {
    setPage((old) => {
      const newPage = Math.min(old + 1, totalPages);
      return newPage;
    });
  }, [totalPages]);

  const goToPreviousPage = useCallback(() => {
    setPage((old) => Math.max(old - 1, 1));
  }, []);

  const invalidateQuery = useCallback(() => {
    queryClient.invalidateQueries([entityName]);
  }, [entityName, queryClient]);

  return {
    data: data?.items || [],
    page: data?.page || page,
    pageSize: data?.pageSize || pageSize,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    isLoading,
    isError,
    error,
    isFetching,
    invalidateQuery,
    setPageSize,
  };
};

export default usePaginatedQuery;
