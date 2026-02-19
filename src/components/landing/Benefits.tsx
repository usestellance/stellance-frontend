"use client";

import Image from "next/image";
import { useState } from "react";

const Benefits = () => {
  const [activeTab, setActiveTab] = useState<"client" | "business">("client");

  return (
    <section className="bg-primary-500 py[30px] overflow-hidden ">
      <div className=" max-w-6xl mx-auto md:flex relative px-4 sm:px-8 lg:px-10">
        <div className="max-md:hidden h-[400px] lg:h-[500px] absolute left-0 xl:left-10 -bottom-1">
          <Image
            src="/images/phone_hand.png"
            alt="Stellance Logo"
            width={500}
            loading="lazy"
            height={500}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="max-md:hidden w-1/2"></div>
        <div className="md:w1/2 md:w-2/3 xl:w-4/5 py-[30px] md:py-[60px] lg:py-[106px]">
          <div className="flex justify-center md:justify-start text-neutral-500 text-sm sm:text-base  gap-6 max-[300px]:flex-wrap">
            <div
              onClick={() => setActiveTab("client")}
              className={`py-[9.5px] w-full max-w-[150px] text-center rounded-[30px] px-2 font-bold  ${activeTab === "client" ? "bg-neutral-500 text-primary-500" : "bg-[#d0dff2]/20"} cursor-pointer duration-150`}
            >
              For Clients
            </div>
            <div
              onClick={() => setActiveTab("business")}
              className={`py-[9.5px] w-full max-w-[150px] text-center rounded-[30px] font-bold  ${activeTab === "business" ? "bg-neutral-500 text-primary-500" : "bg-[#d0dff2]/20"} cursor-pointer duration-150`}
            >
              For Businesses
            </div>
          </div>
          <div className="bg-neutral-500 mt-[30px] rounded-[15px] p-[30px] w-full max-md:max-w-sm max-md:mx-auto lg:max-w-xl">
            <h3 className="text-2xl font-bold">KEY BENEFITS</h3>

            {activeTab === "client" ? (
              <ul className="list-disc mt-4 ml-4">
                <li>Lorem ipsum dolor sit amet. ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet. ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet. ipsum dolor sit amet.</li>
              </ul>
            ) : (
              <ul className="list-disc mt-4 ml-4">
                <li>Business dolor sit amet. ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet. ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet. ipsum dolor sit amet.</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
