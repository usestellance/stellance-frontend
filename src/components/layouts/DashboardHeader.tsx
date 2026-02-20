"use client";
import { SidebarTrigger } from "../ui/sidebar";
import Logo from "../shared/Logo";
import { PiUserCircleThin } from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";
import Link from "next/link";
import { notificationRoutes, profileRoutes } from "../../config/routes";
import { useAuthStore } from "../../store/userAuthStore";
import { mockNotifications } from "../../features/notifications/components/Notifications";
import { IoIosNotifications } from "react-icons/io";
import { useGetNotifications } from "../../features/notifications/hooks";

export default function DashboardHeader() {
  const credentials = useAuthStore((state) => state.credentials);
  const { data } = useGetNotifications();
  const unread = data?.unread_count || 0;

  console.log(data);

  // const isUnRead = mockNotifications.filter((n) => !n.isRead);

  // // console.log(isUnRead.length);

  const iconBg =
    "bg-primary-50/40 rounded-full flex justify-center items-center w-10 h-10 lg:w-[50px] lg:h-[50px] text-primary-500 duration-150 md:hover:text-white md:hover:bg-primary-500 cursor-pointer";
  return (
    <header className="py-5 bg-green-00 w-full bg-neutral-500">
      <div className="ml-auto px-4 sm:px-[30px] md:px-10 flex justify-between items-center bg-red300 w-full md:justify-between">
        <div className="mdhidden">
          <Logo />
        </div>
        <div className="flex items-center gap-2.5 md:gap-5">
          <Link
            href={notificationRoutes.NOTIFICATIONS}
            className={`relative  ${iconBg}`}
          >
            {unread > 0 ? (
              <IoIosNotifications className="text-[24px] lg:text-3xl" />
            ) : (
              <IoNotificationsOutline className="text-[22px] lg:text-3xl" />
            )}
            {unread > 0 && (
              <div className="absolute bg-error-500 rounded-full w-[15px] h-[15px] flex justify-center items-center text-neutral-500 font-bold text-[10px] top-1 right-1 lg:top-1.5 lg:right-2.5">
                {unread}
              </div>
            )}
          </Link>
          <Link
            href={profileRoutes.PROFILE}
            className="flex items-center gap-3"
          >
            <div className={`${iconBg}`}>
              <PiUserCircleThin className="text-[26px] md:text-[42px] mdhidden" />
            </div>
            <p className="max-md:hidden text-xl font-bold">
              {credentials?.user?.profile?.first_name || ""}
            </p>
          </Link>
          <div className={`${iconBg} md:hidden`}>
            <SidebarTrigger />
          </div>
        </div>
      </div>
    </header>
  );
}
