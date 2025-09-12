import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentLanguage } from "@repo/providers/i18n/useLanguage";


const fetchStories = async ({
  pageParam = 1,
  filters,
}: {
  pageParam: number;
  filters: any;
}) => {
  if (!filters.languages) {
    filters.languages = [getCurrentLanguage()];
  }
  const params = new URLSearchParams({
    ...filters,
    page: pageParam.toString(),
  }).toString();
  const result = await axios.get(`/api/search?${params}`);
  return await result.data;
};

export const useInfiniteStories = (filters: object) => {
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  useEffect(() => {
    setIsSearchEnabled(
      !!Object.values(filters).filter((i) =>
        Array.isArray(i) ? !!i.length : !!i
      ).length
    );
  }, [filters]);

  const query = useInfiniteQuery({
    queryKey: ["stories", filters],
    queryFn: ({ pageParam }) => fetchStories({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: isSearchEnabled,
  });

  return {
    ...query,
    isSearchEnabled,
    setIsSearchEnabled,
  };
};