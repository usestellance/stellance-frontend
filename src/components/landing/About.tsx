import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <section className="pt-14 pb-12 sm:pb-12 bg-[#FFF8ED]">
      <div className="myContainer flex flex-col gap-7 items-center md:flex-row ">
        <div className="flex-1">
          <h2 className="text-[32px] font-bold leading-[130%] text-center md:text-start md:text-5xl">
            Your work, your worth, accessed fairly and securely.
          </h2>
          <p className="text-[24px] text-center mt-5 leading-[130%] max-w-md max-md:mx-auto md:text-start">
            Bridging Web3 innovation with real-world needs across industries
            like agriculture, healthcare, tech, and more. Stellance offers
            stablecoin payments simple invoicing, and optional local fiat
            conversion.
          </p>
        </div>
        <div className="flex-1">
          <div className="">
            <Image
              alt="Guy with a dog"
              src="/images/about-img.png"
              height={1000}
              width={1000}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
