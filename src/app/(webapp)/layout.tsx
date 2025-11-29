import React from "react";
import Toast from "../../components/ui/custom/ToastContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      {children}
      <Toast />
    </main>
  );
}
