"use client";

import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "../../../../hooks/useToast";
import { authRoutes } from "../../../../config/constants/routes";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const toast = useToast();
  const router = useRouter();

  const resendLink = () => {
    setLoading(true);
    console.log("Submitted:");
    setTimeout(() => {
      setLoading(false);
      toast.success("Resent Successfully");
      toast.info("Resent Successfully");
      toast.error("Resent Successfully");
      toast.warning("Resent Successfully");
      router.push(authRoutes.LOGIN);
    }, 1000);
  };

  return (
    <div className="mt-10">
      <h2 className="h2-auth text-center">Email Verification Required</h2>
      <p className="mt-[30px] text-sm text-center sm:text-xl md:2xl">
        A verification email has been sent to
        <br />
        <span className="font-bold">{email}</span>
        <br />
        <br />
        Please follow the instructions in the verification email to complete
        your account creation.
        <br />
        <br />
        Can&apos;t find email? Check your spam, junk, bulk or promotions folder
        <br />
        <br />
        Didn&apos;t receive an email?
      </p>

      <div className="flex justify-center mt-[60px]">
        <Button
          onClick={resendLink}
          isLoading={loading}
          className="max-w-[500px]"
        >
          Resend Verification Link
        </Button>
      </div>
    </div>
  );
}
