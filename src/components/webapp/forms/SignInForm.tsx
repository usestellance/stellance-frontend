"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { signInValidation } from "../../../lib/validations/userValidations";
import InputField from "../ui/InputField";
import AppButton from "../ui/AppButton";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { accountSetUpRoute } from "../../../utils/route";
import { IUser } from "../../../lib/types/userTypes";

export default function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik<Partial<IUser>>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidation,
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      router.push(accountSetUpRoute);

      setTimeout(() => {
        setLoading(false);
        toast.success("Login Successful");
      }, 1000);
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
          value={formik.values.email || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email ? formik.errors.email || null : null}
        />

        <div>
          <InputField
            className="input-class-auth"
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={formik.values.password || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password ? formik.errors.password || null : null
            }
          />
        </div>

        <AppButton
          size="lg"
          type="submit"
          className="w-full mt-5 sm:hidden"
          disabled={!(formik.isValid && formik.dirty)}
          loading={loading}
        >
          Sign in
        </AppButton>
        <AppButton
          size="lg"
          loading={loading}
          type="submit"
          className="w-full mt-5"
          customTheme="bg-white text-primary max-sm:hidden dark:text-white dark:bg-secondary"
          disabled={loading || !(formik.isValid && formik.dirty)}
        >
          Sign in
        </AppButton>
      </form>

      <div className="text-center text-xs my-5">OR</div>

      <AppButton
        size="lg"
        customTheme="border border-[#aaaaaa]"
        className="flex justify-center w-full items-center font-medium text-base gap-2"
      >
        <FcGoogle size={22} />
        <span>Continue with Google</span>
      </AppButton>
    </div>
  );
}
