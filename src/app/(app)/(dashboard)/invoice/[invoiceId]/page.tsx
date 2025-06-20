"use client";

import React, { useEffect, useState } from "react";
import { capitalizeWords } from "../../../../../utils/helpers/helperFunctions";
import Link from "next/link";
import { AiFillCopy } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { toast } from "sonner"; // Optional: if you want to show toast
import Logo from "../../../../../components/landing/ui/Logo";
import AppLogo from "../../../../../components/webapp/ui/Logo";

const getStatusBadge = (status: string) => {
  const statusStyles = {
    paid: "bg-[#004E31]",
    pending: "bg-[#FFC75F]",
    overdue: "bg-[#910400]",
    draft: "bg-[#508DFA]",
  };

  return (
    <div
      className={`h-[42px] text-white w-[82px] rounded-[3px] font-medium px-6 py-4 inline-flex items-center justify-center lg:w-[128px] lg:h-[60px] lg:text-2xl ${
        statusStyles[status as keyof typeof statusStyles] || statusStyles.draft
      }`}
    >
      {capitalizeWords(status)}
    </div>
  );
};

export default function Page() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Copied");
    } catch (err) {
      toast.error("Failed to copy URL");
      console.error(err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this invoice",
          url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      toast.warning("Your browser doesn't support native sharing.");
    }
  };

  return (
    <section className="myContainer pt-4">
      <div>{getStatusBadge("overdue")}</div>

      <div className="flex justify-between items-center mt-[30px] lg:mt-[60px]">
        <h3 className="text-[22px] font-bold lg:font-medium lg:text-[32px]">
          INV-001
        </h3>
        <Link
          href="/"
          className="underline underline-offset-2 text-primary dark:text-white font-bold text-xl md:text-[32px]"
        >
          Edit
        </Link>
      </div>

      {/* SHare and copy */}
      <div className="flex gap-[18px] items-center justify-between mt-5 h-[43px] lg:mt-[60px] lg:h-[60px]">
        <div className="flex w-[80%] h-full">
          <div className="border-[0.5px] w-full h-full flex items-center border-r-0 truncate px-[10px] py-[9px] border-primary dark:border-white rounded-bl-[6px] rounded-tl-[6px] lg:text-lg lg:px-5">
            {url || "Loading..."}
          </div>
          <button
            onClick={handleCopy}
            className="px-[18px] flex items-center justify-center bg-[#D9E4F8] border border-[#D9E4F8] rounded-br-[6px] rounded-tr-[6px] text-text-strong gap-[10px]"
          >
            <AiFillCopy className="text-xl lg:text-[35px]" />
            <span className="max-md:hidden font-medium">Copy</span>
          </button>
        </div>
        <div className="w-[15%] min-w-fit h-full ">
          <button
            onClick={handleShare}
            className="px-[18px] h-full min-w-[60px] flex items-center justify-center bg-[#D9E4F8] border border-[#D9E4F8] rounded-[6px] gap-[10px] text-text-strong lg:min-w-[140px]"
          >
            <FiShare2 className="text-3xl md:text-base lg:text-3xl" />
            <span className="max-md:hidden font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Document */}
      <section
        className="pt-[15px] mt-[56px] rounded-[10px] pb-[29px]"
        style={{ boxShadow: "0px 3px 30px 2px #CBCBCB99" }}
      >
        <div className="flex justify-between items-end px-9">
          <div>
            <AppLogo />
          </div>

          <div>
            <div className="block dark:hidden">
              <Logo type="primary" />
            </div>
            <div className="hidden dark:block">
              <Logo type="secondary" />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
