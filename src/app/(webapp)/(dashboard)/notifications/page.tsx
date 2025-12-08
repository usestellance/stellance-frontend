"use client";

import Notifications from "../../../../features/notifications/components/Notifications";

export default function Page() {
  return (
    <div className="pt-5 pb-20">
      <div className="custom-container">
        <h2 className="h2-app">Notifications</h2>
        <section className="mt-5 sm:mt-10">
          <Notifications />
        </section>
      </div>
    </div>
  );
}
