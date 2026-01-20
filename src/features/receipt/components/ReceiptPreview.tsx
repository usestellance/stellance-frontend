"use client";
import { GoShareAndroid } from "react-icons/go";
import { AiFillCopy } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { mockInvoices } from "../../overview/components/LatestInvoices";
import { clientRoutes } from "../../../config/routes";
import { useToast } from "../../../hooks/useToast";

const ReceiptPreview = () => {
  const [url, setUrl] = useState("");
  const { id } = useParams();
  const invoice = mockInvoices.find((inv) => inv.id === id);
  const toast = useToast();
  //   console.log("inovice:", invoice);
  //   console.log("url", url);

  useEffect(() => {
    if (typeof window !== "undefined" && invoice?.id) {
      const baseUrl = window.location.origin;
      setUrl(`${baseUrl}${clientRoutes.PREVIEW_RECEIPT(invoice.id)}`);
    }
  }, [invoice?.id]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Copied");
    } catch (err) {
      toast.error("Failed to copy URL");
      //    console.error(err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this Receipt",
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
    <div className="bg-primary-20 mt-[26px] lg:mt-10 rounded-[5px] mx-auto border border-primary-50 lg:border-2">
      <h5 className="font-medium text-base mb-3 pt-5 px-[15px] lg:pt-10 lg:px-10 lg:text-2xl xl:text-3xl lg:mb-5">
        Share Receipt
      </h5>

      <div className="flex gap-4 items-center justify-center pb-6 border-b border-b-primary-50 px-[15px] lg:pb-10 lg:border-b-2 lg:px-10">
        <div className="flex items-center h-11 lg:h-12 flex-1 min-w-0">
          <div className="text-xs font-light h-full flex items-center bg-white border-y border-l rounded-bl-[6px] rounded-tl-[6px] border-primary-500 px-2 overflow-hidden flex-1 min-w-0 lg:text-lg">
            <p className="truncate">{url || "Loading..."}</p>
          </div>
          <button
            onClick={handleCopy}
            className="rounded-tr-[5px] rounded-br-[5px] min-w-14 h-full flex items-center justify-center cursor-pointer lg:rounded-brv lg:rounded-tr-[10px] bg-primary-50 hover:bg-primary-500 hover:text-white text-primary-500  lg:w-[60px] lg:h-[52px] duration-200"
          >
            <AiFillCopy className="text-2xl lg:text-3xl" />
          </button>
        </div>
        <button
          onClick={handleShare}
          className="rounded-[5px] min-w-14 h-[43px] flex items-center justify-center cursor-pointer lg:rounded-[10px] bg-primary-50 hover:bg-primary-500 hover:text-white text-primary-500  lg:w-[60px] lg:h-[52px] duration-200 shrink-0"
        >
          <GoShareAndroid className="text-2xl lg:text-3xl" />
        </button>
      </div>

      <section className="px-[15px] py-[15px] text-sm [&>div:nth-child(even)]:font-medium grid grid-cols-2 gap-y-2.5 sm:gap-5 sm:px-7 sm:text-base lg:text-3xl lg:gap-y-8 lg:py-12 lg:px-10 [&>div:nth-child(even)]:place-self-end">
        <div>Invoice No.:</div>
        <div>INV-001</div>
        <div>Invoice Title:</div>
        <div className="line-clamp-1">Web development</div>
        <div>Issue Date:</div>
        <div>Jun 11 2025</div>
        <div>Paid Date:</div>
        <div>Jun 19 2025</div>
        <div>Client Name:</div>
        <div>John Tech Doe</div>
        <div>Total Paid:</div>
        <div>$1,500,000</div>
      </section>
    </div>
  );
};

export default ReceiptPreview;
