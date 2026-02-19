import React from "react";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const featureDetails = [
    {
      title: "Stable Coin Security",
      img: "/images/feature_1.png",
      text: "Enables real-time, low-cost transactions across borders, so freelancers can get paid faster, no matter where they or their clients are.",
      class: "md:col-span-2 md:flex-row md:items-center",
    },
    {
      title: "Fast, Global Payments",
      img: "/images/feature_2.png",
      text: "Enables real-time, low-cost transactions across borders, so freelancers can get paid faster, no matter where they or their clients are.",
      class: "md:items-center md:flex-col-reverse",
    },
    {
      title: "Stable Coin Security",
      img: "/images/feature_3.png",
      text: "Enables real-time, low-cost transactions across borders, so freelancers can get paid faster, no matter where they or their clients are.",
      class: "md:items-center",
    },
  ];
  return (
    <section id="features" className="pb-20 md:pt-10 lg:pb-[200px]">
      <div className="landing-container">
        <h2 className="text-2xl text-center font-bold md:text-[32px]">
          FEATURES
        </h2>
        <p className="text-center text-neutral-900 mt-5 max-md:max-w-md md:max-w-2xl mx-auto md:text-2xl md:text-black-400">
          Enables real-time, low-cost transactions across borders, so
          freelancers can get paid faster, no matter where they or their clients
          are.
        </p>
        <div className="mt-20 rounded-[15px] md:border border-primary-500/50 md:bg-linear-to-tr md:from-[#dee4fa] md:to-neutral-500 md:grid md:grid-cols-2 lg:overflow-hidden">
          {featureDetails.map((d, i) => (
            <FeatureCard
              key={i}
              img={d.img}
              text={d.text}
              title={d.title}
              className={d.class}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
