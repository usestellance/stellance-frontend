"use client";

import dynamic from "next/dynamic";
import PageLoading from "../../../components/shared/PageLoading";

// Create a loading placeholder that matches your component's layout
const LoadingPlaceholder = () => <PageLoading />;

// Dynamically import the actual component with no SSR
const InvoiceFilterContent = dynamic(() => import("./InvoiceFilterContent"), {
  ssr: false,
  loading: () => <LoadingPlaceholder />,
});

const InvoiceFilter = () => {
  return <InvoiceFilterContent />;
};

export default InvoiceFilter;
