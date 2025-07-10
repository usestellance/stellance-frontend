"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { forgotPasswordValidation } from "../../../lib/validations/userValidations";
import InputField from "../ui/InputField";
import AppButton from "../ui/AppButton";
import { UserFormValues } from "../../../lib/types/userTypes";
import Link from "next/link";
import { resetSentRoute, signInRoute } from "../../../utils/route";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../../../config/axios";
import { toast } from "sonner";
import axios from "axios";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik<UserFormValues>({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidation,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/auth/reset?email=${values.email}`
        );

        if (res.data) {
          setLoading(false);
          toast.success(res?.data?.message);
          router.push(resetSentRoute(values.email || ""));
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
    },
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-[14px] sm:gap-7"
      >
        <InputField
          className="input-class-auth"
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={formik.values.email || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email ? formik.errors.email || null : null}
        />

        <AppButton
          size="lg"
          type="submit"
          className="w-full mt-5 sm:hidden"
          disabled={!(formik.isValid && formik.dirty)}
          loading={loading}
        >
          Reset Password
        </AppButton>
        <AppButton
          size="lg"
          loading={loading}
          type="submit"
          className="w-full mt-5"
          customTheme="bg-white text-primary max-sm:hidden dark:text-white dark:bg-secondary"
          disabled={loading || !(formik.isValid && formik.dirty)}
        >
          Reset Password
        </AppButton>
      </form>

      <Link
        href={signInRoute}
        className="text-center mt-5 font-bold text-primary dark:text-secondary block sm:text-lg"
      >
        Sign in
      </Link>
    </div>
  );
}
