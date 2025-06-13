import Image from "next/image";
import React from "react";
import Button from "./ui/Button";

export default function BeingAmongst() {
  return (
    <div className="pb-20 md:pt-28">
      <div className="myContainer flex flex-col md:flex-row pt-16 bg-[#f7f7f7] minh-[50vh] md:min-h-[559px] pb-14 rounded-b-2xl md:rounded-[36px] md:items-center">
        <div className="md:flex-1">
          <div className="px-8 flex flex-col justify-center max-md:items-center">
            <h2 className="text-2xl font-bold text-text-black max-md:text-center sm:text-[32px]">
              Being amongs the top <br /> 1% of the 1 %
            </h2>
            <p className="text-base mt-3 mb-8 max-md:text-center sm:text-[24px]">
              Create, send, and manage professional invoices in just a few
              clicks. Stellance&apos;s intuitive invoicing system is designed
              for freelancers — with smart templates,
              <br />
              <br />
              Sign up today and experience the freedom of Stellar-powered
              freelance finance.
            </p>
            <div>
              <Button style="primary" type="button">
                Get Started Now
              </Button>
            </div>
          </div>
        </div>

        <div className="md:flex-1">
          <div className="overflow-hidden mt-10">
            <Image
              className="w-full h-full object-cover"
              alt="lady with a phone"
              src="/images/among-img.png"
              height={500}
              width={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
