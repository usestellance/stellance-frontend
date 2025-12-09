"use client";

import dynamic from "next/dynamic";
import { InvoiceType } from "../../../types/invoiceTypes";

// Create a loading placeholder that matches your component's layout
const LoadingPlaceholder = () => <div></div>;

// Dynamically import the actual component with no SSR
const ReceiptFilterContent = dynamic(() => import("./ReceiptFilterContent"), {
  ssr: false,
  loading: () => <LoadingPlaceholder />,
});

interface ReceiptFilterProps {
  filteredData: InvoiceType[];
}

const ReceiptFilter = ({ filteredData }: ReceiptFilterProps) => {
  return <ReceiptFilterContent filteredData={filteredData} />;
};

export default ReceiptFilter;
