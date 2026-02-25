"use client";
import { Calendar, Home, Inbox, Search } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar, // Import this hook
} from "@/components/ui/sidebar";
import Logo from "../shared/Logo";
import {
  invoiceRoutes,
  overviewRoutes,
  receiptRoutes,
  walletRoutes,
} from "../../config/routes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLogout } from "../../store/userAuthStore";
import { GoQuestion } from "react-icons/go";
import { useToast } from "../../hooks/useToast";

// Menu items.
const items = [
  {
    title: "Overview",
    url: overviewRoutes.OVERVIEW,
    icon: Home,
    active: true,
  },
  {
    title: "Invoices",
    url: invoiceRoutes.INVOICES,
    icon: Inbox,
    active: true,
  },
  {
    title: "Wallet",
    url: walletRoutes.WALLET,
    icon: Calendar,
    active: true,
  },
  {
    title: "Account Statement",
    url: receiptRoutes.ACCOUNT_STATEMENT,
    icon: Search,
    active: false,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar(); // Get sidebar controls
  const logout = useLogout();
  const toast = useToast();
  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false); // Close sidebar on mobile
    }
  };
  const handleToast = () => {
    toast.info("Coming Soon");
  };

  return (
    <Sidebar
      className="bg-neutral-500 shadow-md  rounded-tr-[20px] rounded-br-[20px]
    md:rounded-tr-[20px] md:rounded-br-[20px] z-50"
    >
      <SidebarHeader className="bg-neutral-500">
        <div className="flex justify-center my-10 flex-col items-center">
          <Logo
            link={overviewRoutes.OVERVIEW}
            height="h-[30px] md:h-[40px] lg:h-[72px]"
          />
          <p className="font-bold max-md:hidden lg:text-lg lg:-ml-2">
            Stellance
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-neutral-500 px-1">
        <SidebarMenu className="h-full">
          {items
            .filter((item) => (item.active ? item : null))
            .map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={pathname.includes(item.url)}
                  asChild
                >
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
          <SidebarMenuItem>
            <SidebarMenuButton
              // isActive={pathname.includes(item.url)}
              asChild
            >
              <Link
                href="#"
                onClick={handleToast} // Add click handler
                className="h-[43px] flex justify-center items-center rounded-md transition-all data-[active=true]:bg-primary-50 data-[active=true]:text-primary-600 text-black/50 data-[active=true]:font-bold text-[20px]"
              >
                <span>Account Statement</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mt-auto align-self-end">
            <SidebarFooter className="bg-pink400 flex pb-10 gap-4">
              <SidebarMenuButton asChild className="">
                <Link
                  href="mailto:admin@usestellance.com"
                  className="h-[43px] flex justify-center items-center rounded-md transition-all data-[active=true]:bg-primary-50 data-[active=true]:text-primary-600 data-[active=true]:font-bold  cursor-pointer"
                >
                  <span className="text-[20px]">Support</span>
                  <GoQuestion className="text-lg" />
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild className="">
                <p
                  onClick={logout} // Add click handler
                  className="h-[43px] flex justify-center items-center rounded-md transition-all data-[active=true]:bg-primary-50 data-[active=true]:text-primary-600 data-[active=true]:font-bold text-[20px] text-error-400 cursor-pointer"
                >
                  <span>Sign Out</span>
                </p>
              </SidebarMenuButton>
            </SidebarFooter>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
