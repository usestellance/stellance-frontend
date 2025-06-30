import React from "react";
import UpdateProfileForm from "../../../../components/webapp/forms/UpdateProfileForm";

export default function Page() {
  return (
    <section className="myContainer">
      <h2 className="section-title mt-2">Profile</h2>

      <div className="mt-[30px]">
        <UpdateProfileForm />
      </div>
    </section>
  );
}
