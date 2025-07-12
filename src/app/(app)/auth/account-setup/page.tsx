"use client";
import AccountSetupForm from "../../../../components/webapp/forms/AccountSetupForm";
import GoBack from "../../../../components/webapp/ui/GoBack";
import AuthProvider from "../../../../providers/AuthProvider";

export default function Page() {
  return (
    <AuthProvider>
      <section className=" sm:bg-primary sm:shadow sm:rounded-[10px] sm:px-[60px] sm:py-[78px] sm:text-white dark:sm:bg-white sm:dark:text-[#14171F] mb-20">
        <GoBack />
        <h2 className="auth-title mt-5">Complete your details</h2>
        <p className="auth-subtitle mb-[30px]">Enter all required fields</p>
        <AccountSetupForm />
      </section>
    </AuthProvider>
  );
}
