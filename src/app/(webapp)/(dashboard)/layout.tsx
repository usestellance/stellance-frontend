import React from "react";
import { SidebarProvider } from "../../../components/ui/sidebar";
import { AppSidebar } from "../../../components/layouts/AppSideBar";
import DashboardHeader from "../../../components/layouts/DashboardHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bgblue400 w-full">
        <div className="fixed inset-x-0  w-full z-10">
          <DashboardHeader />
        </div>
        <div className="pt-16 lg:pt-20">{children}</div>
      </main>
    </SidebarProvider>
  );
}
