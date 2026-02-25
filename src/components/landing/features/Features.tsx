import React from "react";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const featureDetails = [
    {
      title: "1. Instant Cross-Border Payments",
      img: "/images/feature_1.png",
      text: "Send invoices globally and receive payments within seconds ,not days. Stellar’s fast settlement ensures smooth transactions across borders.",
      class: "md:col-span-2 md:flex-row md:items-center",
    },
    {
      title: "2️. Multi-Currency Support",
      img: "/images/feature_2.png",
      text: "Invoice in USDC or tokenized local currencies and allow automatic currency conversion using Stellar’s built-in exchange paths.",
      class: "md:items-center md:flex-col-reverse",
    },
    {
      title: "3️. Smart Invoice Management",
      img: "/images/feature_3.png",
      text: "Create, customize, and track invoices in real time. Payment status tracking. Due date reminders. Downloadable invoice history.",
      class: "md:items-center",
    },
    {
      title: "4. Low Transaction Fees",
      img: "/images/feature_1.png",
      text: "Keep more of your revenue. Stellar’s near-zero transaction fees reduce overhead costs significantly compared to traditional remittance systems..",
      class: "md:col-span-2 md:flex-row-reverse md:items-center",
    },
    {
      title: "5. Secure & Transparent",
      img: "/images/feature_1.png",
      text: "Every transaction is recorded on-chain, ensuring transparency, traceability, and tamper-resistant records.",
      class: "md:items-center",
    },
    {
      title: "6️. Recurring & Automated Payments",
      img: "/images/feature_2.png",
      text: "Enable recurring billing and automate settlements using smart contract functionality for subscription-based services.",
      class: "md:items-center md:flex-col-reverse",
    },
    {
      title: "7. Anchor Integration",
      img: "/images/feature_3.png",
      text: "Seamless fiat on/off ramps allow clients to pay via bank transfer or mobile money, while you receive digital assets securely.",
      class: "md:col-span-2 md:flex-row md:items-center",
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
