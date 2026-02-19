import React from "react";
import AboutCard from "./AboutCard";

const About = () => {
  const aboutDetails = [
    {
      title: "Stable Coin Security",
      img: "/images/about-img-1.png",
      text: "Enables real-time, low-cost transactions across borders, so freelancers can get paid faster, no matter where they or their clients are.",
      class: "md:flex-col-reverse md:col-span-3",
    },
    {
      title: "Fast, Global Payments",
      img: "/images/about-img-2.png",
      text: "Enables real-time, low-cost transactions across borders, so freelancers can get paid faster, no matter where they or their clients are.",
      class: "md:col-span-4",
    },
    {
      title: "Stable Coin Security",
      img: "/images/about-img-3.png",
      text: "Enables real-time, low-cost transactions across borders, so freelancers can get paid faster, no matter where they or their clients are.",
      class: "md:col-span-4",
    },
    {
      title: "Fast, Global Payments",
      img: "/images/about-img-4.png",
      text: "Enables real-time, low-cost transactions across borders, so freelancers can get paid faster, no matter where they or their clients are.",
      class: "md:col-span-3 md:flex-col-reverse",
    },
  ];

  return (
    <div className="py-[60px] md:pt-[100px] lg:pb-[200px]">
      <div className="landing-container">
        <h2 className="max-md:hidden text-center font-medium text-[32px]">
          COMPREHENSIVE <br /> INVOICING PLATFORM
        </h2>
        <h2 className="text-center font-medium text-2xl md:hidden">
          Comprehensive <br /> Invoicing Platform
        </h2>

        <p className="text-neutral-900 sm:text-black-400 sm:text-2xl text-center mt-5 lg:w-2/3 mx-auto">
          Bridging Web3 innovation with real-world needs across industries like
          agriculture, healthcare, tech, and more. Stellance offers stablecoin
          payments simple invoicing, and optional local fiat conversion.
        </p>

        <div className="mt-[30px] md:mt-[60px] grid grid-cols-1 gap-[30px] md:grid-cols-7 md:gap-x-5 md:gap-y-[60px]">
          {aboutDetails.map((d, i) => (
            <AboutCard
              key={i}
              img={d.img}
              text={d.text}
              title={d.title}
              className={d.class}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
