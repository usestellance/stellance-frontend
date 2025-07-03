/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  capitalizeWords,
  formatCurrency,
  formatDateTime,
  maskMiddle,
  responseStatus,
} from "../../../../../utils/helpers/helperFunctions";
import Link from "next/link";
import { AiFillCopy } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { toast } from "sonner"; // Optional: if you want to show toast
import Logo from "../../../../../components/landing/ui/Logo";
import AppLogo from "../../../../../components/webapp/ui/Logo";
import { useParams, useRouter } from "next/navigation";
import { useGetInvoice, useSendInvoice } from "../../../../../hooks/useInvoice";
import { InvoiceType } from "../../../../../lib/types/invoiceType";
import PageLoading from "../../../../../components/webapp/PageLoading";
import { SERVICE_CHARGE } from "../../../../../utils/Constants";
import AppButton from "../../../../../components/webapp/ui/AppButton";
import GoBack from "../../../../../components/webapp/ui/GoBack";

const getStatusBadge = (status: string) => {
  const statusStyles = {
    paid: "bg-[#004E31]",
    pending: "bg-[#FFC75F]",
    overdue: "bg-[#910400]",
    draft: "bg-[#508DFA]",
    viewed: "bg-[#00FF55]",
    cancelled: "bg-[#800000]",
  };

  return (
    <div
      className={`h-[42px] text-white w-[82px] rounded-[3px] font-medium px-6 py-4 inline-flex items-center justify-center lg:w-[128px] lg:h-[60px] lg:text-2xl ${
        statusStyles[status as keyof typeof statusStyles] || statusStyles.draft
      }`}
    >
      {(status === "viewed" && capitalizeWords("Approved")) ||
        (status === "cancelled" && capitalizeWords("Declined")) ||
        capitalizeWords(status)}
    </div>
  );
};

export default function Page() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const { invoiceId } = useParams();
  const { data, isLoading, isError, error } = useGetInvoice({
    invoice_id: invoiceId?.toString() || "",
  });
  const { mutate: sendInvoice, isPending } = useSendInvoice(invoiceId?.toString() || "");

  const invoice: InvoiceType = data;
  const user = invoice?.createdBy;

  // console.log(user);

  // console.log("id for invoice", invoiceId);
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

  useEffect(() => {
    if (isError && error) {
      const statusCode =
        error && typeof error === "object" && "status" in error
          ? (error as any).status
          : 500;
      const message =
        (error &&
          typeof error === "object" &&
          "response" in error &&
          (error as any).response?.data) ||
        error?.message ||
        "An error occurred";
      responseStatus(statusCode, message, router);
      // console.log(error)
    }
  }, [isError, error, router]);

  if (isLoading) {
    return <PageLoading />;
  }

  const handleSendInvoice = () => {
    sendInvoice(); // Will send to /invoice/send/43a265f5-9f5b-4d0d-b9c0-43f6622fd2d8
  };

  return (
    <section className="myContainer pt-4 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center">
        <GoBack />
        <div className="">{getStatusBadge(invoice?.status || "")}</div>
      </div>
      {/* <div>{getStatusBadge("viewed")}</div> */}

      <div className="flex justify-between gap-2 items-center mt-[40px] lg:mt-[70px]">
        <h3 className=" font-bold lg:font-medium lg:text-[32px]">
          {invoice?.invoice_number || ""}
        </h3>
        {invoice?.status === "draft" && (
          <Link
            href="#"
            className="underline underline-offset-2 text-primary dark:text-white font-bold text-xl md:text-[32px]"
          >
            Edit
          </Link>
        )}
      </div>

      {/* SHare and copy */}

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
        <div className="flex justify-between items-center px-9 sm:pl-[51px] sm:pr-[55px]">
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
            <h3 className="text-[22px] md:text-[32px] text-primary dark:text-secondary ">
              Invoice
            </h3>
            <p className="text-sm sm:text-2xl">{invoice?.payer_name || ""}</p>
          </div>
          <p className="text-xs sm:text-sm lg:text-xl font-bold text-[#8F8F8F] mt-4 sm:mt-[35px]">
            Invoice Number: <br className="sm:hidden" />{" "}
            {invoice?.invoice_number || ""}{" "}
          </p>
          <p className="text-xs sm:text-sm lg:text-xl font-bold text-[#8F8F8F] mt-4">
            Wallet Address: <br className="sm:hidden" />
            {maskMiddle(
              "GC7OHFPWPSWXL4HMN6TXAG54MTZSMJIASWHO6KVRQNHNCXEAHWDSGGC3"
            )}
            {/* {invoice?.invoice_number || ""}{" "} */}
          </p>
        </div>

        <hr className="text-[#BFBFBF99] my-4" />

        <div className="px-4 flex gap-[60px] sm:px-[30px]">
          {/* Biller */}
          <div className="flex flex-col text-sm sm:text-lg lg:text-2xl font-medium leading-[150%] text-[#111111] dark:text-white min-w-0 flex-1">
            <span className="text-[#8F8F8F]">Billed By:</span>
            <span className="font-bold break-words">
              {/* {(user?.first_name || "") + " " + (user?.last_name || "")} */}
              {user?.business_name || user?.name || ""}
            </span>
            <span className="break-words">{user?.email || ""}</span>
            <span className="break-words">
              {capitalizeWords(user?.location || "")}
            </span>
            <span className="text-[#8F8F8F] inline-block mt-auto">
              Date Issued:
            </span>
            <span className="font-bold break-words">
              {formatDateTime(invoice?.created_at)}
            </span>
          </div>
          {/* Billed */}
          <div className="flex justify-end text-sm sm:text-lg lg:text-2xl font-medium leading-[150%] text-[#111111] dark:text-white min-w-0 flex-1">
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
                {formatDateTime(invoice?.due_date)}
              </span>
            </p>
          </div>
        </div>

        <div className="px-4 sm:px-[30px] mt-[35px] lg:mt-[50px] ">
          <InvoiceItems inv={invoice} />
        </div>

        <div className="leading-[150%] px-[30px] text-[#8F8F8F] text-sm lg:text-xl mt-4 lg:mt-5">
          <span className="font-medium">Note:</span>
          <br />
          <span className="font-bold italic">Thanks for patronizing</span>
        </div>
      </section>

      <div className="flex items-center justify-center gap-6 mt-14 md:mt-20">
        <AppButton size="sm" theme="tetiary" className="sm:w-full">
          Cancel
        </AppButton>
        <AppButton
          onClick={handleSendInvoice}
          loading={isPending}
          size="sm"
          className="sm:w-full"
        >
          Send
        </AppButton>
      </div>
    </section>
  );
}

function InvoiceItems({ inv }: { inv: InvoiceType }) {
  return (
    <div className="bg-[#D9E4F8] rounded-[5px] pb-10 lg:pb-[83px]">
      <div className="overflow-x-auto scroll">
        <table className=" bg-[#D9E4F8] min-w-full border-collapse border-spacing-y2 overflow-hidden rounded-[5px] text-text-strong ">
          <thead className="bg-[#D1E2FF] overflow-hidden ">
            <tr className="">
              <th
                scope="col"
                className="px-4 py-[15px] xl:text-[28px] text-center font-bold whitespace-nowrap "
              >
                Type
              </th>
              <th
                scope="col"
                className="px-4 py-[15px] xl:text-[28px] text-center font-bold whitespace-nowrap "
              >
                Description
              </th>
              <th
                scope="col"
                className="px-4 py-[15px] xl:text-[28px] text-center font-bold whitespace-nowrap "
              >
                Unit Price
              </th>
              <th
                scope="col"
                className="px-4 py-[15px] xl:text-[28px] text-center font-bold whitespace-nowrap "
              >
                Quantity
              </th>
              <th
                scope="col"
                className="px-4 py-[15px] xl:text-[28px] text-center font-bold whitespace-nowrap "
              >
                Amount
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#BFBFBF99]">
            {inv?.items?.map((inv, i) => (
              <tr key={i} className="bg-[#D9E4F866] font-medium">
                <td className="px-4 py-[15px] whitespace-nowrap text-xs lg:text-lg text-center">
                  {inv.invoice_type === "per_unit" ? "Per Unit" : "Per Hour"}
                </td>
                <td className="px-4 py-[15px] whitespace-nowrap text-xs lg:text-lg text-center">
                  {inv.description || ""}
                </td>
                <td className="px-4 py-[15px] text-xs lg:text-lg text-center">
                  {formatCurrency(inv.unit_price || 0)}
                </td>
                <td className="px-4 py-[15px] text-xs lg:text-lg text-center">
                  {inv.quantity || 0}
                </td>
                <td className="px-4 py-[15px] text-xs lg:text-lg text-center">
                  {formatCurrency(inv.amount || 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-red400 border-t border-[#BFBFBF99] w-full myContainer">
        <div className="flex justify-end py-[18px]">
          <div className="flex items-center gap-[81px] justify-end">
            <p className="text-xs font-bold text-text-strong lg:text-lg">
              Sub Total
            </p>
            <p className="text-xs font-bold text-text-strong lg:text-lg">
              {formatCurrency(inv?.sub_total || 0)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <hr className="text-[#BFBFBF99] w-[230px] lg:w-[558px]" />
      </div>
      <div className="flex justify-end py-[18px] myContainer">
        <div className="flex items-center gap-[81px] justify-end">
          <p className="text-xs font-bold text-text-strong lg:text-lg">{`Service Fee (${SERVICE_CHARGE}) %`}</p>
          <p className="text-xs font-bold text-text-strong lg:text-lg">
            {formatCurrency(inv?.service_fee || 0)}
          </p>
        </div>
      </div>
      <div className="myContainer mt-2 w-full flex justify-end">
        <div className="w-full max-w-[273px] lg:max-w-[558px] flex justifybetween h-[43px] overflow-hidden items-center rounded-[6px] ">
          <h5 className="text-sm font-bold leading-[25px] py-3 px-4 w-[74px] text-white bg-primary md:text-lg">
            Total
          </h5>
          <h5 className="truncate w-full text-center lg:text-end text-sm font-bold leading-[25px] md:text-lg py-3 px-4 bg-white text-text-strong">
            {formatCurrency(inv?.total || 0)}
          </h5>
        </div>
      </div>
    </div>
  );
}
