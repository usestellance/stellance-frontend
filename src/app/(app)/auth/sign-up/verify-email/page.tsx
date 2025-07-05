"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AppButton from "../../../../../components/webapp/ui/AppButton";
import { toast } from "sonner";
import { useState } from "react";
import { axiosInstance } from "../../../../../config/axios";
import axios from "axios";
import { signInRoute } from "../../../../../utils/route";

// import Link from "next/link";
// verify-email?email=laye@gmail.com&token=f0+-d312e@984513my491731035bao

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const email = decodeURIComponent(params.get("email") || "");
  const token = decodeURIComponent(params.get("token") || "");

  // console.log(token);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/auth/validate?token=${token}`);
      // console.log(res)
      if (res.data) {
        setLoading(false);
        toast.success(res?.data?.message);
        router.push(signInRoute);
      }
      // console.log(res);
    } catch (error) {
      setLoading(false);
      const errorMessage =
        axios.isAxiosError(error) && error?.response?.data?.message
          ? error?.response?.data?.message
          : "An unknown error occurred.";
      toast.error(errorMessage);
      //   console.log(error?.response?.data);
    }
  };

  return (
    <section className=" sm:bg-primary sm:shadow sm:rounded-[10px] sm:px-[60px] sm:py-[60px] sm:text-white dark:sm:bg-white sm:dark:text-[#14171F] max-sm:max-w-[400px] sm:mt-20 mx-auto">
      <h2 className="text-center text-[22px] font-bold mt-[100px] sm:mt-0">
        Verify Email
      </h2>

      <div className="text-center text-sm md:text-2xl mt-[30px] sm:max-w-[400px] mx-auto">
        <p className="leading-[24px] md:leading-[130%]  text-[#4A5264] sm:text-[#ffffffdd] dark:text-white sm:dark:text-text-strong">
          Click the button below to verify your email address:
          <br />
          <br />
          <span className="font-bold">{email}</span>
          <br />
        </p>
      </div>

      <AppButton
        size="lg"
        onClick={handleVerify}
        className="mx-auto w-full mt-10 sm:hidden"
        loading={loading}
      >
        Verify Email
      </AppButton>
      <AppButton
        size="lg"
        onClick={handleVerify}
        loading={loading}
        customTheme="mx-auto w-full mt-10 bg-white text-primary max-sm:hidden dark:text-white dark:bg-secondary"
      >
        Verify Email
      </AppButton>
    </section>
  );
}
