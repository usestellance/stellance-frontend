"use client";
import React, { useMemo } from "react";
import { useFormik } from "formik";
import InputField from "../ui/InputField";
import AppButton from "../ui/AppButton";
import { getPasswordStrength } from "../../../utils/helpers/passwordStrength";
import { ResetPasswordValidation } from "../../../lib/validations/userValidations";
import { useResetPassword } from "../../../hooks/useAuth";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const params = useSearchParams();
  const email = decodeURIComponent(params.get("email") || "");
  const { mutate, isPending } = useResetPassword(); // optional
  // const isPending = false;
  // console.log(email);

  const formik = useFormik({
    initialValues: {
      otp: "",
      new_password: "",
      confirm_new_password: "",
    },
    validationSchema: ResetPasswordValidation,
    onSubmit: async (values) => {
      const { otp, new_password } = values;

      mutate({ email, otp, password: new_password });
      // console.log("Reset Password Form:", values);
    },
  });

  const strength = useMemo(
    () => getPasswordStrength(formik.values.new_password || ""),
    [formik.values.new_password]
  );

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-[14px] sm:gap-7"
    >
      <div>
        <InputField
          className="input-class-auth"
          name="new_password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={formik.values.new_password || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.new_password
              ? formik.errors.new_password || null
              : null
          }
        />

        {/* Password Strength Meter */}
        {formik.values.new_password &&
          formik.values.new_password.length > 0 && (
            <div className="mt-2">
              <div className="w-full h-2 bg-[#cccccc] rounded-[6px] overflow-hidden">
                <div
                  className={`h-full ${strength.color}`}
                  style={{ width: `${(strength.score / 4) * 100}%` }}
                />
              </div>
              <p className="mt-1 text-xs font-medium ">{strength.label}</p>
            </div>
          )}
      </div>
      <InputField
        name="confirm_new_password"
        label="Confirm New Password"
        placeholder="Re-enter your new password"
        type="password"
        className="input-class-auth"
        value={formik.values.confirm_new_password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.confirm_new_password
            ? formik.errors.confirm_new_password || null
            : null
        }
      />
      <InputField
        name="otp"
        label="OTP"
        placeholder="Enter the 6-digit OTP"
        type="text"
        className="input-class-auth"
        value={formik.values.otp}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.otp ? formik.errors.otp || null : null}
      />

      <AppButton
        size="lg"
        type="submit"
        className="w-full mt-5 sm:hidden"
        disabled={!(formik.isValid && formik.dirty)}
        loading={isPending}
      >
        Submit
      </AppButton>
      <AppButton
        size="lg"
        loading={isPending}
        type="submit"
        className="w-full mt-5"
        customTheme="bg-white text-primary max-sm:hidden dark:text-white dark:bg-secondary"
        disabled={isPending || !(formik.isValid && formik.dirty)}
      >
        Submit
      </AppButton>
    </form>
  );
}
