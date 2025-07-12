// ReactQueryProvider.tsx
"use client";
import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      gcTime: 10 * (60 * 1000),
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

interface IProps {
  children: React.ReactNode;
}

const ReactQueryProvider: FC<IProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;