"use client";

import { useSearchParams } from "next/navigation";
import AppButton from "../../../../../components/webapp/ui/AppButton";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../../config/axios";
import axios from "axios";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0); // in seconds
  const params = useSearchParams();
  const email = decodeURIComponent(params.get("email") || "");

  const handleResend = async () => {
    if (cooldown > 0) return; // prevent clicking during cooldown

    setLoading(true);
    try {
      const res = await axiosInstance.get(`/auth/resend-email?email=${email}`);

      if (res.data) {
        toast.success(res?.data?.message);
        setCooldown(60); // start cooldown after success
      }
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error?.response?.data?.message
          ? error?.response?.data?.message
          : "An unknown error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Timer logic for countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  return (
    <section className="sm:bg-primary sm:shadow sm:rounded-[10px] sm:px-[60px] sm:py-[60px] sm:text-white dark:sm:bg-white sm:dark:text-[#14171F] max-sm:max-w-[400px] mx-auto">
      <h2 className="text-center text-[22px] font-bold mt-[66px] sm:mt-0">
        Email Verification Required
      </h2>

      <div className="text-center text-sm md:text-2xl mt-[30px] sm:max-w-[400px] mx-auto">
        <p className="leading-[24px] md:leading-[130%] text-[#4A5264] sm:text-[#ffffffdd] dark:text-white sm:dark:text-text-strong">
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
          folder.
          <br />
          <br />
          Didn&apos;t receive an email?
        </p>
      </div>

      <AppButton
        size="lg"
        onClick={handleResend}
        className="mx-auto w-full mt-10 sm:hidden"
        loading={loading}
        disabled={cooldown > 0}
      >
        {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Verification Email"}
      </AppButton>

      <AppButton
        size="lg"
        onClick={handleResend}
        loading={loading}
        customTheme="mx-auto w-full mt-10 bg-white text-primary max-sm:hidden dark:text-white dark:bg-secondary"
        disabled={cooldown > 0}
      >
        {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Verification Email"}
      </AppButton>
    </section>
  );
}
