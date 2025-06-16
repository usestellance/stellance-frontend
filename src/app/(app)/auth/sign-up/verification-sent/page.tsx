"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AppButton from "../../../../../components/webapp/ui/AppButton";
import { toast } from "sonner";
import { useState } from "react";
import { signInRoute } from "../../../../../utils/route";

// import Link from "next/link";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  const resend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Resent Successful");
      router.push(signInRoute);
    }, 1000);
  };

  return (
    <section className=" sm:bg-primary sm:shadow sm:rounded-[10px] sm:px-[60px] sm:py-[60px] sm:text-white dark:sm:bg-white sm:dark:text-[#14171F] max-sm:max-w-[400px]">
      <h2 className="text-center text-[22px] font-bold mt-[66px] sm:mt-0">
        Email Verification Required
      </h2>

      <div className="text-center text-sm md:text-2xl mt-[30px] sm:max-w-[400px] mx-auto">
        <p className="leading-[24px] md:leading-[130%]  text-[#4A5264] sm:text-[#ffffffdd] dark:text-white sm:dark:text-text-strong">
          A verification email has been sent to
          <br />
          <span className="font-bold">{email}</span>
          <br />
          <br />
          Please follow the instructions in the verification email to complete
          your account creation.
          <br />
          <br />
          Can&apos;t find email? Check your spam, junk, bulk or promotions
          folder Didn&apos;t receive an email?
          <br />
          <br />
          Didn&apos;t receive an email?
        </p>
      </div>

      <AppButton
        onClick={resend}
        className="mx-auto w-full mt-10 sm:hidden"
        loading={loading}
      >
        Resend Verification Email
      </AppButton>
      <AppButton
        onClick={resend}
        loading={loading}
        customTheme="mx-auto w-full mt-10 bg-white text-primary max-sm:hidden dark:text-white dark:bg-secondary"
      >
        Resend Verification Email
      </AppButton>
    </section>
  );
}
