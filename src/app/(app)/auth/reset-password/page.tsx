"use client";
import ResetPasswordForm from "../../../../components/webapp/forms/ResetPasswordForm";

export default function Page() {
  return (
    <section className=" sm:bg-primary sm:shadow sm:rounded-[10px] sm:px-[60px] sm:py-[78px] sm:text-white dark:sm:bg-white sm:dark:text-[#14171F]">
      <h2 className="auth-title">Reset Password</h2>
      <p className="auth-subtitle mb-[30px]">
        Enter new password and fill in the OTP sent to your email along with
        this link.
      </p>
      <ResetPasswordForm />
    </section>
  );
}
