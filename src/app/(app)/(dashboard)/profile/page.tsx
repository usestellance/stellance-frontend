import React from "react";
import UpdateProfileForm from "../../../../components/webapp/forms/UpdateProfileForm";
import ChangePasswordModal from "../../../../components/webapp/modals/ChangePasswordModal";

export default function Page() {
  return (
    <section className="myContainer relative">
      <h2 className="section-title mt-2">Profile</h2>

      <div className="mt-[30px]">
        <UpdateProfileForm />
      </div>
      <ChangePasswordModal />
    </section>
  );
}
