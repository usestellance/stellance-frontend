"use client";

import Link from "next/link";
import SignUpForm from "../../../../components/webapp/forms/SignUpForm";
import { signInRoute } from "../../../../../utils/route";
// import Logo from "../../../../components/webapp/ui/Logo";

export default function Page() {
  return (
    <section className=" sm:bg-primary sm:shadow sm:rounded-[10px] sm:px-[60px] sm:py-[78px] sm:text-white dark:sm:bg-white sm:dark:text-[#14171F]">
      <h2 className="auth-title">Get Started</h2>
      <p className="auth-subtitle mb-[30px]">
        Already using Stellance?{" "}
        <Link
          className="font-bold sm:text-white dark:sm:text-secondary"
          href={signInRoute}
        >
          Sign in
        </Link>
      </p>
      <SignUpForm />
    </section>
  );
}
