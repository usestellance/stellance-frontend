"use client";
import React from "react";
import SplideSlider from "./SplideSlider";

export default function ForClient() {
  const [active, setActive] = React.useState(false);

  return (
    <section className="pt-14 pb-12 sm:pb-20 px-4 sm:px-8">
      <div className="container">
        <div className="flex justify-center mb-14">
          <div
            onClick={() => setActive(!active)}
            className="relative flex items-center justify-between bg-text-white w-full max-w-[431px] rounded-[58px] h-[68px] px-2 cursor-pointer "
          >
            <div className="w-1/2 text-center z-10 font-medium">For Client</div>
            <div className="w-1/2 text-center z-10 font-medium">
              For Business
            </div>

            <div
              className={`absolute top-[6px] bottom-[6px] w-1/2 rounded-[34px] bg-primary text-white flex items-center z-10 justify-center font-semibold transition-all duration-300 ${
                active ? "translate-x-full right-[52%]" : "translate-x-0"
              }`}
            >
              {active ? "For Business" : "For Client"}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-black text-[24px] sm:text-[40px] max-sm:text-center max-w-xl max-sm:mx-auto mb-10 sm:leading-10">
            Stellance makes freelancing feel as seamless as email.
          </h2>
        </div>
        <SplideSlider />
      </div>
    </section>
  );
}
