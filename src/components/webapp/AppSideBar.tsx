"use client";
import React from "react";
import { useSideBarStore } from "../../store/NavStore";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineHomeModern,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TfiWorld } from "react-icons/tfi";
import { PiWallet } from "react-icons/pi";
import { HiOutlineBriefcase } from "react-icons/hi";
import Image from "next/image";
import { userAuth } from "../../store/userAuth";

// Navigation items configuration
const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HiOutlineHomeModern,
  },
  {
    name: "Invoice",
    href: "/invoice",
    icon: LiaFileInvoiceDollarSolid,
  },
  {
    name: "Payables",
    href: "/payables",
    icon: HiOutlineBriefcase,
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: TfiWorld,
  },
  {
    name: "Wallet",
    href: "/wallet",
    icon: PiWallet,
  },
];

// Bottom navigation items
const bottomNavigationItems = [
  {
    name: "Help & Support",
    href: "/help",
    icon: HiOutlineQuestionMarkCircle,
  },
  // {
  //   name: "Logout",
  //   href: "/logout",
  //   icon: HiOutlineArrowRightOnRectangle,
  // },
];

interface NavLinkProps {
  item: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  isActive: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, isActive, onClick }) => {
  const Icon = item.icon;

  return (
    <li>
      <Link
        href={item.href}
        onClick={onClick}
        className={`flex items-center gap-4 pl-6 py-[15px] transition-colors duration-200 md:py-5 lg:pl-[40px] lg:gap-6 lg:rounded-tr-[5px] lg:rounded-br-[5px] overflow-hidden ${
          isActive
            ? "bg-primary text-white dark:bg-secondary"
            : "text-primary hover:bg-primary/10 dark:hover:bg-secondary/10"
        }`}
      >
        <Icon
          className={` ${
            isActive ? "" : "text-primary"
          } text-lg flex-shrink-0 md:text-xl lg:text-[24px]`}
        />
        <span className="text-lg font-medium md:text-xl lg:text-[22px]">
          {item.name}
        </span>
      </Link>
    </li>
  );
};

const NavLinks: React.FC<{ onLinkClick?: () => void }> = ({ onLinkClick }) => {
  const { logout } = userAuth();
  const pathname = usePathname();

  return (
    <nav className="flex flex-col h-full">
      {/* Main Navigation */}
      <div className="flex-1 px2 py-4">
        <ul className="lg:space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              item={item}
              isActive={pathname.startsWith(item.href)}
              onClick={onLinkClick}
            />
          ))}
        </ul>
      </div>

      {/* Bottom Navigation */}
      <div className="py-4 border-t border-gray-200">
        <ul className="space-y-1">
          {bottomNavigationItems.map((item) => (
            <NavLink
              key={item.name}
              item={item}
              isActive={pathname === item.href}
              onClick={onLinkClick}
            />
          ))}
          <li>
            <a
              onClick={logout}
              className={`flex items-center gap-4 pl-6 py-[15px] transition-colors duration-200 md:py-5 lg:pl-[40px] lg:gap-6 lg:rounded-tr-[5px] cursor-pointer lg:rounded-br-[5px] overflow-hidden text-primary hover:bg-primary/10 dark:hover:bg-secondary/10`}
            >
              <HiOutlineArrowRightOnRectangle
                className={` ${"text-primary"} text-lg flex-shrink-0 md:text-xl lg:text-[24px]`}
              />
              <span className="text-lg font-medium md:text-xl lg:text-[22px]">
                Logout
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default function AppSideBar() {
  const { isSideBarOpen, closeSideBar } = useSideBarStore();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeSideBar}
        className={`${
          isSideBarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-all duration-300 fixed inset-0  z-40 md:hidden`}
        // } transition-all duration-300 fixed inset-0 bg-black/20 backdrop-blur-sm z-40`}
      />

      {/* Sidebar */}
      <div
        className={`${
          isSideBarOpen ? "max-md:translate-x-0" : "max-md:-translate-x-[200%]"
        } transition-transform duration-300 ease-in-out max-md:fixed relative h-screen left-0 top-0 bottom-0 bg-[#D9E4F8] w-[55vw] max-w-[219px] z-50 rounded-tr-[20px] rounded-br-[20px] md:rounded-tr-[10px] md:rounded-br-[10px] md:max-w-[270px] lg:max-w-[280px]  overflow-hidden flex flex-col`}
        style={{ boxShadow: "0px 4px 20px 0px #00000026" }}
      >
        {/* Header */}
        <div className="pb-6 pt-5 px-6 flex flex-col items-center relative">
          <button
            onClick={closeSideBar}
            className="md:hidden absolute top-6 right-4 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="Close sidebar"
          >
            <IoIosClose className="text-3xl text-text-black" />
          </button>
          <div className="mt-6 md:mt-8">
            <div className={`h-[44px] md:h-[80px] inline-block`}>
              <Image
                src="/images/logo-light.svg"
                alt="Stellance Logo"
                className="h-full w-full object-contain "
                height={100}
                width={100}
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <NavLinks onLinkClick={closeSideBar} />
        </div>
      </div>
    </>
  );
}

// Export NavLinks for use in other components if needed
export { NavLinks };
