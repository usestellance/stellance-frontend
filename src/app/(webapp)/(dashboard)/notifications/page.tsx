"use client";

import Notifications from "../../../../features/notifications/components/Notifications";
import { useGetNotifications } from "../../../../features/notifications/hooks";

export default function Page() {
  // const { data } = useGetNotifications();
  return (
    <div className="pt-5 pb-20">
      <div className="custom-container">
        <div className="flex justify-between">
          <h2 className="h2-app">Notifications</h2>
          {/* <p className="rounded-full text-sm md:text-base h-7 w-7 text-center flex justify-center items-center p-1 font-bold bg-primary-500 text-white">
            {data?.meta?.read_count + data?.meta?.unread_count || 0}
          </p> */}
        </div>
        <section className="mt-5 sm:mt-10">
          <Notifications />
        </section>
      </div>
    </div>
  );
}
