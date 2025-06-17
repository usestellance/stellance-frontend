"use client";
import AccountSetupForm from "../../../../components/webapp/forms/AccountSetupForm";

export default function Page() {
  return (
    <section className=" sm:bg-primary sm:shadow sm:rounded-[10px] sm:px-[60px] sm:py-[78px] sm:text-white dark:sm:bg-white sm:dark:text-[#14171F] mb-20">
      <h2 className="auth-title">Set up your account</h2>
      <p className="auth-subtitle mb-[30px]">Enter all required fields</p>
      <AccountSetupForm />
    </section>
  );
}
