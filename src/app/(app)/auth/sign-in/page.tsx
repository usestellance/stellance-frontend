"use client";

import Link from "next/link";
import { signUpRoute } from "../../../../utils/route";
import SignInForm from "../../../../components/webapp/forms/SignInForm";

export default function Page() {
 

  return (
    <section className=" sm:bg-primary sm:shadow sm:rounded-[10px] sm:px-[60px] sm:py-[78px] sm:text-white dark:sm:bg-white sm:dark:text-[#14171F]">
      <h2 className="auth-title">Welcome Back!</h2>
      <p className="auth-subtitle mb-[30px]">
        Don&apos;t have an account?{" "}
        <Link
          className="font-bold sm:text-white dark:sm:text-secondary"
          href={signUpRoute}
        >
          Sign up
        </Link>
      </p>
      <SignInForm />
    </section>
  );
}
