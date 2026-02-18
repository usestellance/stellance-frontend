import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="h-[80vh] sm:h-screen relative">
      <div className="landing-container flex justify-between h-full gap-20">
        <div className="w-full xl:w-1/2 flex flex-col justify-center text-neutral-500">
          <h1 className="font-medium text-[32px] md:text-[64px] md:font-normal md:leading-[120%]">
            Do business worldwide, receive money without restrictions
          </h1>
          <p className="text-sm sm:text-2xl my-[15px] md:my-[30px]">
            A simple payment process helps you get paid on time. Provide
            multiple payment options that your customers can choose from to make
            their payment securely.
          </p>
          <Button
            variant="secondary"
            className="max-w-[300px] h-[60px] max-sm:mx-auto max-xl:mt-10"
          >
            Sign up for free
          </Button>
        </div>
        <div className=" w-1/2 max-lg:hidden"></div>
      </div>
      <div className="max-lg:hidden xl:h-[600px] lg:h-[400px] absolute right-0 bottom-0">
        <Image
          src="/images/phone_hand.png"
          alt="Stellance Logo"
          width={500}
          loading="lazy"
          height={500}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
