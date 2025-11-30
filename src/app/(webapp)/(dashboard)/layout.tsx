import React from "react";
import { SidebarProvider, SidebarTrigger } from "../../../components/ui/sidebar";
import { AppSidebar } from "../../../components/layouts/AppSideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
