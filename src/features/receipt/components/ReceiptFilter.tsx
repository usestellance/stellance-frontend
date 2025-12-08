"use client";

import dynamic from "next/dynamic";

// Create a loading placeholder that matches your component's layout
const LoadingPlaceholder = () => <div></div>;

// Dynamically import the actual component with no SSR
const ReceiptFilterContent = dynamic(() => import("./ReceiptFilterContent"), {
  ssr: false,
  loading: () => <LoadingPlaceholder />,
});

const ReceiptFilter = () => {
  return <ReceiptFilterContent />;
};

export default ReceiptFilter;
