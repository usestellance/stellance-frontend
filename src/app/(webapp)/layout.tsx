import React from "react";
import Toast from "../../components/ui/custom/ToastContainer";
import ReactQueryProvider from "../../components/providers/ReactQueryProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <main className="">
        {children}
        <Toast />
      </main>
    </ReactQueryProvider>
  );
}
