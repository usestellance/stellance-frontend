"use client";
import ForgotPasswordForm from "../../../../components/webapp/forms/ForgotPasswordForm";

export default function Page() {
  return (
    <section className=" sm:bg-primary sm:shadow sm:rounded-[10px] sm:px-[60px] sm:py-[78px] sm:text-white dark:sm:bg-white sm:dark:text-[#14171F]">
      <h2 className="auth-title">Forgot Password</h2>
      <p className="auth-subtitle mb-[30px]">
        Enter the email address you registered with and instructions to reset
        your password would be sent to your mail
      </p>
      <ForgotPasswordForm />
    </section>
  );
}
