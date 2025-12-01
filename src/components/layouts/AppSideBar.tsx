"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar, // Import this hook
} from "@/components/ui/sidebar";
import Logo from "../shared/Logo";
import { dashboardRoutes, invoiceRoutes } from "../../config/constants/routes";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: dashboardRoutes.HOME,
    icon: Home,
  },
  {
    title: "Invoices",
    url: invoiceRoutes.INVOICES,
    icon: Inbox,
  },
  {
    title: "Wallet",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Receipt",
    url: "#",
    icon: Search,
  },
  {
    title: "Sign out",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar(); // Get sidebar controls

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false); // Close sidebar on mobile
    }
  };

  return (
    <Sidebar
      className="bg-neutral-500 px-2   rounded-tr-[20px] rounded-br-[20px]
    md:rounded-tr-[20px] md:rounded-br-[20px]"
    >
      <SidebarHeader className="bg-neutral-500">
        <div className="flex justify-center my-10">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-neutral-500 px-1">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton isActive={pathname.includes(item.url)} asChild>
                <Link
                  href={item.url}
                  onClick={handleLinkClick} // Add click handler
                  className="h-[43px] flex justify-center items-center rounded-md transition-all data-[active=true]:bg-primary-50 data-[active=true]:text-primary-600 data-[active=true]:font-bold text-[20px]"
                >
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
