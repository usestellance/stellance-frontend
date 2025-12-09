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

export default function DashboardHeader() {
  const credentials = useAuthStore((state) => state.credentials);

  const isUnRead = mockNotifications.filter((n) => !n.isRead);

  // console.log(isUnRead.length);

  const iconBg =
    "bg-primary-50/40 rounded-full flex justify-center items-center w-10 h-10 lg:w-[50px] lg:h-[50px] text-primary-500 duration-150 md:hover:text-white md:hover:bg-primary-500 cursor-pointer";
  return (
    <header className="py-5 bg-green-00 w-full bg-neutral-500 ">
      <div className="ml-auto px-4 sm:px-[30px] md:px-10 flex justify-between items-center bg-red300 w-full md:justify-end">
        <div className="md:hidden">
          <Logo />
        </div>
        <div className="flex items-center gap-2.5 md:gap-5">
          <Link
            href={notificationRoutes.NOTIFICATIONS}
            className={`relative  ${iconBg}`}
          >
            {isUnRead.length > 0 ? (
              <IoIosNotifications className="text-[24px] lg:text-3xl" />
            ) : (
              <IoNotificationsOutline className="text-[22px] lg:text-3xl" />
            )}
            {isUnRead.length > 0 && (
              <div className="absolute bg-error-500 rounded-full w-[15px] h-[15px] flex justify-center items-center text-neutral-500 font-bold text-[10px] top-1 right-1 lg:top-1.5 lg:right-2.5">
                {isUnRead.length}
              </div>
            )}
          </Link>
          <Link
            href={profileRoutes.PROFILE}
            className="flex items-center gap-3"
          >
            <div className={`${iconBg}`}>
              <PiUserCircleThin className="text-[26px] md:text-[42px] mdhidden" />
              {/* <svg
                className="max-md:hidden hover:fill-white fill-[#18234F] duration-150"
                width="30"
                height="30"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.25 15C26.25 16.9891 25.4598 18.8968 24.0533 20.3033C22.6468 21.7098 20.7391 22.5 18.75 22.5C16.7609 22.5 14.8532 21.7098 13.4467 20.3033C12.0402 18.8968 11.25 16.9891 11.25 15C11.25 13.0109 12.0402 11.1032 13.4467 9.6967C14.8532 8.29018 16.7609 7.5 18.75 7.5C20.7391 7.5 22.6468 8.29018 24.0533 9.6967C25.4598 11.1032 26.25 13.0109 26.25 15Z"
                  //   fill="#18234F"
                />
                <path
                  className="hover:fill-white fill-[#18234F] duration-150"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.985 37.485C7.98469 37.0838 0 28.8488 0 18.75C0 8.39438 8.39438 0 18.75 0C29.1056 0 37.5 8.39438 37.5 18.75C37.5 29.1056 29.1056 37.5 18.75 37.5C18.6644 37.5006 18.5787 37.5006 18.4931 37.5C18.3234 37.5 18.1537 37.4944 17.985 37.485ZM6.71813 30.5813C6.57794 30.1787 6.53022 29.7497 6.57851 29.3261C6.62681 28.9026 6.76988 28.4953 6.9971 28.1346C7.22433 27.7739 7.52987 27.469 7.89105 27.2426C8.25223 27.0161 8.65978 26.874 9.08344 26.8266C16.3922 26.0175 21.1528 26.0906 28.4259 26.8434C28.8502 26.8876 29.2587 27.028 29.6205 27.254C29.9822 27.4799 30.2877 27.7854 30.5135 28.1472C30.7394 28.509 30.8797 28.9176 30.9237 29.3419C30.9678 29.7661 30.9145 30.1948 30.7678 30.5953C33.8849 27.4415 35.6306 23.1843 35.625 18.75C35.625 9.43031 28.0697 1.875 18.75 1.875C9.43031 1.875 1.875 9.43031 1.875 18.75C1.875 23.3588 3.72281 27.5363 6.71813 30.5813Z"
                  //   fill="#18234F"
                />
              </svg> */}
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
