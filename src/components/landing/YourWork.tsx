import Image from "next/image";
import React from "react";

const YourWork = () => {
  return (
    <section className="py-[60px] md:py-24 lg:py-40">
      <div className="landing-container sm:flex sm:items-center gap-10 md:gap-[60px] sm:justify-between">
        <div className="sm:w-1/2">
          <h2 className="text-[32px] font-bold text-center sm:text-start lg:text-[48px] leading-[120%]">
            OUR VISION
          </h2>
          <p className="text-black-500 text-center text-sm mt-5 sm:text-start lg:text-[24px]">
            We believe businesses in Africa and emerging markets deserve the
            same seamless financial tools available anywhere in the world.
            Stellance is not just an invoicing platform ,it&apos;s a bridge to
            global opportunity.
          </p>
        </div>
        <div className="w-full mt-[30px] sm:w-1/2 max-w-[550px]">
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
