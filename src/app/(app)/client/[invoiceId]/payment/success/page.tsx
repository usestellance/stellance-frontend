import React from "react";

export default function Page() {
  return (
    <div className=" text-lg sm:text-2xl font-bold h-[60vh] sm:h-[70vh] flex flex-col justify-center">
      <div className="myContainer flex flex-col items-center sm:gap-5">
        <div className="animate-pulse">
          <svg
            width="151"
            height="151"
            className="sm:scale-200"
            viewBox="0 0 151 151"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="75.5"
              cy="75.5"
              r="75.5"
              className="fill-primary dark:fill-secondary"
              fillOpacity="0.1"
            />
            <circle
              cx="75.5"
              cy="74.5"
              r="63.5"
              className="fill-primary dark:fill-secondary"
              fillOpacity="0.2"
            />
            <circle
              cx="75.5"
              cy="73.5"
              r="48.5"
              className="fill-primary dark:fill-secondary"
              fillOpacity="0.3"
            />
            <circle
              cx="75.5"
              cy="73.5"
              r="35.5"
              className="fill-primary dark:fill-secondary"
              fillOpacity="0.8"
            />
            <path
              d="M62.3906 75.5156L71.7969 84.9219L90.6094 64.7656"
              stroke="#FFFFF0"
              strokeWidth="3.375"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="text-2xl mt-[40px] sm:text-4xl sm:mt-20">
          Payment Confirmed
        </h3>

        <p className="text-[#5B5B5B] dark:text-gray-200 mt-[15px] sm:mt-0">
          Transaction Number: 097v4r87
        </p>
      </div>

      <hr className="text-[#8F8F8F80] mt-[23px] mb-[20px] sm:hidden" />

      <p className="text-center text-[#5B5B5B] dark:text-gray-200 sm:mt-5">
        Amount Paid: $3600.00
      </p>
    </div>
  );
}
