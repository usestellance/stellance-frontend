import React from "react";
import { SidebarProvider } from "../../../components/ui/sidebar";
import { AppSidebar } from "../../../components/layouts/AppSideBar";
import DashboardHeader from "../../../components/layouts/DashboardHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bgblue400 w-full">
        <div>
          <DashboardHeader />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
