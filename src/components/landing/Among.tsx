"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { authRoutes } from "../../config/routes";
import Image from "next/image";

const Among = () => {
  const router = useRouter();

  const gotoSignUp = () => router.push(authRoutes.SIGN_UP);

  return (
    <section className="pt-[58px] pb-[100px] lg:pb-[150px] lg:pt-[150px]">
      <div className="landing-container">
        <div className="bg-primary-500 text-neutral-500 rounded-[15px] md:rounded-[30px] py-[30px] px-[15px] md:py-[27px] md:px-[30px] lg:px-[60px] sm:flex sm:gap-2.5 sm:items-center md:gap-10">
          <div className="flex flex-col items-center sm:w-1/2 sm:items-start sm:justify-center">
            <h4 className="font-bold text-center text-xl sm:text-start lg:text-[32px]">
              Being amongs the top <br />
              1% of the 1 %
            </h4>
            <p className="text-center text-sm w-4/5 max-sm:mx-auto mt-2.5 sm:text-start sm:w-full lg:mt-4 lg:text-2xl">
              Create, send, and manage professional invoices in just a few
              clicks. Stellance&apos;s intuitive invoicing system is designed
              for freelancers — with smart templates, <br />
              <br /> Sign up today and experience the freedom of Stellar-powered
              freelance finance.
            </p>
            <Button
              onClick={gotoSignUp}
              variant="secondary"
              //   className="rounded-[30px] max-w-60 text-primary-500 sm:max-w-[300px] h-[60px] mx-auto mt-10 max-md:mt-10"
              className="rounded-[30px] max-w-[170px] text-primary-500 mt-4 text-sm lg:mt-[27px]"
            >
              Get Started Now
            </Button>
          </div>
          <div className="rounded-[9.9px] md:rounded-[15px] overflow-hidden h-full max-sm:mt-[30px] sm:w-1/2">
            <img
              alt="girl with phone and cup"
              src="/images/girl_with_phone.png"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Among;
