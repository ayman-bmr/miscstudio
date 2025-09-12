"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ReactQueryProviderProps {
  children: ReactNode;
  options?: Object;
}

export const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({
  children,
  options,
}) => {
  const defaultOptions = {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const queryClient = new QueryClient({
    defaultOptions: mergedOptions,
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
