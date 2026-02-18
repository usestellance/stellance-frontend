'use client'
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { authRoutes } from "../../config/routes";

const Hero = () => {
  const router = useRouter();

  const gotoSignUp = () => router.push(authRoutes.SIGN_UP);

  return (
    <div className="min-h-[75vh] sm:min-h-screen relative pt-28 sm:pt-40 pb-10">
      <div className="landing-container flex justify-between h-full gap-20">
        <div className="w-full xl:w-1/2 flex flex-col justify-center text-neutral-500">
          <h1 className="font-medium text-[32px] sm:text-[48px] leading-10 md:text-[64px] md:font-normal sm:leading-[120%]">
            Do business worldwide, receive money without restrictions
          </h1>
          <p className="text-sm sm:text-2xl my-[15px] md:my-[30px] text-neutral-comment leading-6 sm:leading-[150%]">
            A simple payment process helps you get paid on time. Provide
            multiple payment options that your customers can choose from to make
            their payment securely.
          </p>
          <Button
            onClick={gotoSignUp}
            variant="secondary"
            className="rounded-[30px] max-w-60 text-primary-500 sm:max-w-[300px] h-[60px] max-sm:mx-auto mt-10 max-md:mt-10"
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
