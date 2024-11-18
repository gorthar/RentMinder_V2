import apiConnector from "@/ApiConnector/connector";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

const usePaginatedQueryWithOptions = (entityName, options = {}) => {
  const { id, initialPageSize = 5 } = options;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const queryClient = useQueryClient();

  const fetchData = useCallback(async ({ queryKey }) => {
    const [entityName, currentPage, currentPageSize, id] = queryKey;
    console.log(
      `Fetching ${entityName} data for page ${currentPage} and page size ${currentPageSize}`
    );
    let result;
    if (id) {
      result = await apiConnector[entityName].getAllById(
        id,
        currentPage,
        currentPageSize
      );
    } else {
      result = await apiConnector[entityName].getAll(
        currentPage,
        currentPageSize
      );
    }
    console.log(`Result:`, result);
    return result;
  }, []);

  const queryKey = [entityName, page, pageSize, id];

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

export default usePaginatedQueryWithOptions;
