"use client";
import React, { useMemo, useState } from "react";
import { useFormik } from "formik";
import { signUpValidation } from "../../../lib/validations/userValidations";
import InputField from "../ui/InputField";
import Link from "next/link";
import { getPasswordStrength } from "../../../utils/helpers/passwordStrength";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { verificationRoute } from "../../../utils/route";
import AppButton from "../ui/AppButton";

interface ISignUp {
  email: string;
  password: string;
  
}

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik<ISignUp>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signUpValidation,
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      router.push(verificationRoute(values.email));

      setTimeout(() => {
        setLoading(false);
        toast.success("Verification Sent");
      }, 1000);
    },
  });

  const strength = useMemo(
    () => getPasswordStrength(formik.values.password),
    [formik.values.password]
  );

  // console.log(formik.isValid);

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
          value={formik.values.email}
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
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password ? formik.errors.password || null : null
            }
          />

          {/* Password Strength Meter */}
          {formik.values.password.length > 0 && (
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

        <p className="text-center text-xs text-primary dark:text-secondary mt-4 sm:text-lg sm:text-white">
          By creating an account you agree to all of our <br />
          <Link href="#" className="font-bold underline underline-offset-3">
            Terms and Conditions
          </Link>
        </p>

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
          disabled={!(formik.isValid && formik.dirty)}
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
