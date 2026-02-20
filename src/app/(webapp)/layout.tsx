import React from "react";
import Toast from "../../components/ui/custom/ToastContainer";
import ReactQueryProvider from "../../components/providers/ReactQueryProvider";
import GoogleAuthProviders from "../../components/providers/GoogleAuthProvider";



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleAuthProviders>
      <ReactQueryProvider>
        <main className="">
          {children}
          <Toast />
        </main>
      </ReactQueryProvider>
    </GoogleAuthProviders>
  );
}
