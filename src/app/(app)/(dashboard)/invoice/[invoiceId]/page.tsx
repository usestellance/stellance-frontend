"use client";

import React, { useEffect, useState } from "react";
import {
  capitalizeWords,
  formatDateTime,
} from "../../../../../utils/helpers/helperFunctions";
import Link from "next/link";
import { AiFillCopy } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { toast } from "sonner"; // Optional: if you want to show toast
import Logo from "../../../../../components/landing/ui/Logo";
import AppLogo from "../../../../../components/webapp/ui/Logo";
import { useParams } from "next/navigation";
import { useGetInvoice } from "../../../../../hooks/useInvoice";
import { InvoiceType } from "../../../../../lib/types/invoiceType";
import PageLoading from "../../../../../components/webapp/PageLoading";
import { userAuth } from "../../../../../store/userAuth";

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
  const { credentials } = userAuth();
  const [url, setUrl] = useState("");
  const { invoiceId } = useParams();
  const { data, isLoading } = useGetInvoice({
    invoice_id: invoiceId?.toString() || "",
  });
  const invoice: InvoiceType = data;
  const user = credentials?.user;

  // console.log(user)

  console.log("id for invoice", invoiceId);
  console.log("invoice", invoice);

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

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <section className="myContainer pt-4">
      <div>{getStatusBadge(invoice?.status || "")}</div>

      <div className="flex justify-between gap-2 items-center mt-[30px] lg:mt-[60px]">
        <h3 className=" font-bold lg:font-medium lg:text-[32px]">
          {invoice?.invoice_number || ""}
        </h3>
        {invoice?.status === "draft" && (
          <Link
            href="/"
            className="underline underline-offset-2 text-primary dark:text-white font-bold text-xl md:text-[32px]"
          >
            Edit
          </Link>
        )}
      </div>

      {/* SHare and copy */}
      {/* <div className="flex gap-[18px] items-center justify-between mt-5 h-[43px] lg:mt-[60px] lg:h-[60px]">
        <div className="flex w-[80%] h-full bg-green-300">
          <div className="border-[0.5px] max-w-1/2 w-full h-full flex items-center border-r-0 truncate px-[10px] py-[9px] border-primary dark:border-white rounded-bl-[6px] rounded-tl-[6px] lg:text-lg lg:px-5">
            {url || "Loading..."}
          </div>
          <button
            onClick={handleCopy}
            className="px-[18px] flex items-center justify-center bg-[#D9E4F8] border border-[#D9E4F8] rounded-br-[6px] rounded-tr-[6px] text-text-strong gap-[10px] cursor-pointer"
          >
            <AiFillCopy className="text-xl lg:text-[35px]" />
            <span className="max-md:hidden font-medium">Copy</span>
          </button>
        </div>
        <div className="w[15%] min-w-fit h-full ">
          <button
            onClick={handleShare}
            className="px-[18px] h-full minw-[60px] flex items-center justify-center bg-[#D9E4F8] border border-[#D9E4F8] rounded-[6px] gap-[10px] text-text-strong lg:min-w-[140px] cursor-pointer"
          >
            <FiShare2 className="text-xl md:text-base lg:text-3xl" />
            <span className="max-md:hidden font-medium">Share</span>
          </button>
        </div>
      </div> */}

      <div className="flex justify-between gap-1 mt-5 h-[43px] lg:mt-[60px] lg:h-[60px]">
        <div className=" max-w-9/12 sm:max-w-8/12 md:max-w-9/12">
          <div className="flex w-full h-full">
            <div className="border-[0.5px]  w-full h-full flex items-center border-r-0 truncate px-[10px] py-[9px] border-primary dark:border-white rounded-bl-[6px] rounded-tl-[6px] lg:text-lg lg:px-5">
              {url || "Loading..."}
            </div>
            <button
              onClick={handleCopy}
              className="px-[18px] flex items-center justify-center bg-[#D9E4F8] border border-[#D9E4F8] rounded-br-[6px] rounded-tr-[6px] text-text-strong gap-[10px] cursor-pointer"
            >
              <AiFillCopy className="text-xl lg:text-[35px]" />
              <span className="max-md:hidden font-medium">Copy</span>
            </button>
          </div>
        </div>
        <div className=" flex-1/12 flex max-sm:ustify-end">
          <div className="w[15%] min-w-fit h-full ">
            <button
              onClick={handleShare}
              className="px-[18px] h-full minw-[60px] flex items-center justify-center bg-[#D9E4F8] border border-[#D9E4F8] rounded-[6px] gap-[10px] text-text-strong lg:min-w-[140px] cursor-pointer"
            >
              <FiShare2 className="text-xl md:text-base lg:text-3xl" />
              <span className="max-md:hidden font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Document */}
      <section
        className="pt-[15px] mt-[56px] rounded-[10px] pb-[29px] sm:pt-[25px] sm:pb-[56px]"
        style={{ boxShadow: "0px 3px 30px 2px #CBCBCB99" }}
      >
        <div className="flex justify-between items-end px-9 sm:pl-[51px] sm:pr-[55px]">
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

        <div className="pl-4 pr-9 mt-[33px] sm:pl-[30px] sm:pr-[55px]">
          <div className="flex font-bold items-center justify-between">
            <h3 className="text-[22px] sm:text-[32px] text-primary dark:text-secondary ">
              Invoice
            </h3>
            <p className="text-sm sm:text-2xl">{invoice?.payer_name || ""}</p>
          </div>
          <p className="text-sm sm:text-lg md:text-2xl font-bold text-[#8F8F8F] mt-4 sm:mt-[35px]">
            Invoice Number: <br className="sm:hidden" />{" "}
            {invoice?.invoice_number || ""}{" "}
          </p>
        </div>

        <hr className="text-[#BFBFBF99] my-4" />

        <div className="px-4 flex gap-[60px] sm:px-[30px]">
          {/* Biller */}
          <div className="flex flex-col text-sm sm:text-lg md:text-2xl font-medium leading-[150%] text-[#111111] dark:text-white min-w-0 flex-1">
            <span className="text-[#8F8F8F]">Billed By:</span>
            <span className="font-bold break-words">
              {user?.first_name + " " + user?.last_name}
            </span>
            <span className="break-words">{user?.email || ""}</span>
            <span className="break-words">
              {capitalizeWords(user?.country || "")}
            </span>
            <span className="text-[#8F8F8F] inline-block mt-auto">
              Date Issued:
            </span>
            <span className="font-bold break-words">
              {formatDateTime(invoice.created_at)}
            </span>
          </div>
          {/* Billed */}
          <div className="flex justify-end text-sm sm:text-lg md:text-2xl font-medium leading-[150%] text-[#111111] dark:text-white min-w-0 flex-1">
            <p className="flex flex-col w-fit min-w-0">
              <span className="text-[#8F8F8F]">Billed To:</span>
              <span className="font-bold break-words">
                {invoice?.payer_name || ""}
              </span>
              <span className="break-words">{invoice?.payer_email || ""}</span>
              <span className="break-words inline-block mb-5 sm:mb-[66px]">
                {capitalizeWords(invoice?.country || "")}
              </span>
              <span className="text-[#8F8F8F] inline-block mt-auto">
                Due Date:
              </span>
              <span className="font-bold break-words">
                {formatDateTime(invoice.due_date)}
              </span>
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
