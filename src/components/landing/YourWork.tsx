import Image from "next/image";
import React from "react";

const YourWork = () => {
  return (
    <section className="py-[60px] md:py-24 lg:py-40">
      <div className="landing-container sm:flex sm:items-center gap-10 md:gap-[60px] sm:justify-between">
        <div className="sm:w-1/2">
          <h2 className="text-[32px] font-bold text-center sm:text-start lg:text-[48px] leading-[120%]">
            Your work, your worth, accessed fairly and securely.
          </h2>
          <p className="text-black-500 text-center text-sm mt-5 sm:text-start lg:text-[24px]">
            Bridging Web3 innovation with real-world needs across industries
            like agriculture, healthcare, tech, and more. Stellance offers
            stablecoin payments simple invoicing, and optional local fiat
            conversion.
          </p>
        </div>
        <div className="w-full mx-auto mt-[30px] sm:w-1/2 max-w-[601px]">
          <Image
            alt="Guy on a laptop with a dog"
            height={500}
            width={500}
            src="/images/your_work.png"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default YourWork;
