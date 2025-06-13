import React from "react";
import Button from "./ui/Button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-20 pb-12 sm:pb-28">
      <div className="myContainer">
        <div className="mt-10 sm:mt-20">
          <h1 className="font-bold text-4xl text-center sm:text-[64px]">
            Do business worldwide, receive money without restrictions
          </h1>
          <p className="text-2xl text-center mt-4 leading-[110%] sm:max-w-xl mx-auto">
            Join thousands of businesses saving on fees and time with fast local
            and international transfers
          </p>
        </div>

        <div className="flex justify-center flex-col items-center gap-5 mt-10 sm:mt-16 sm:flex-row">
          <Button style="primary" type="button">
            Generate Invoice
          </Button>
          <Button style="secondary" type="button">
            Recieve Payment
          </Button>
        </div>

        <div className="h-[359px] max-w-[935px] mx-auto sm:h-[505px] sm:rounded-2xl rounded-md mt-12 sm:mt-16 overflow-hidden">
          <Image
            alt="Guy using a laptop"
            src="/images/hero-img.png"
            height={1000}
            width={1000}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
