"use client";

import { useSearchParams } from "next/navigation";
import AppButton from "../../../../../components/webapp/ui/AppButton";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../../config/axios";
import axios from "axios";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0); // countdown in seconds

  const params = useSearchParams();
  const email = decodeURIComponent(params.get("email") || "");

  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/auth/resend-email?email=${email}`);

      if (res.data) {
        toast.success(res?.data?.message);
        setCountdown(30); // Start 30s countdown
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

  // Countdown logic
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const isDisabled = loading || countdown > 0;

  return (
    <section className="sm:bg-primary sm:shadow sm:rounded-[10px] sm:px-[60px] sm:py-[60px] sm:text-white dark:sm:bg-white sm:dark:text-[#14171F] max-sm:max-w-[400px] mx-auto">
      <h2 className="text-center text-[22px] font-bold mt-[66px] sm:mt-0">
        Email Verification Required
      </h2>

      <div className="text-center text-base md:text-xl mt-[30px] sm:max-w-[400px] mx-auto">
        <p className="leading-[24px] md:leading-[130%] text-[#4A5264] sm:text-[#ffffffdd] dark:text-white sm:dark:text-text-strong">
          A reset password email has been sent to
          <br />
          <span className="font-bold">{email}</span>
          <br />
          <br />
          Follow the instructions to reset your password. Do well to check your
          spam mails also.
          <br />
          <br />
          If you did not receive the email, click the button below to resend it.
        </p>
      </div>

      {/* Mobile Button */}
      <AppButton
        size="lg"
        onClick={handleResend}
        className="mx-auto w-full mt-10 sm:hidden"
        loading={loading}
        disabled={isDisabled}
      >
        {countdown > 0 ? `Resend in ${countdown}s` : "Resend Reset Email"}
      </AppButton>

      {/* Desktop Button */}
      <AppButton
        size="lg"
        onClick={handleResend}
        loading={loading}
        disabled={isDisabled}
        customTheme="mx-auto w-full mt-10 bg-white text-primary max-sm:hidden dark:text-white dark:bg-secondary"
      >
        {countdown > 0 ? `Resend in ${countdown}s` : "Resend Reset Email"}
      </AppButton>
    </section>
  );
}
