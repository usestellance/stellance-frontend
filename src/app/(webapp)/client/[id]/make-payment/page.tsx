"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useGetInvoiceForClient } from "../../../../../features/invoice/hooks";
import { InvoiceType } from "../../../../../types/invoiceTypes";
import { formatCurrency, formatDate } from "../../../../../lib/utils/helpers";
import { AiFillCopy } from "react-icons/ai";
import { useToast } from "../../../../../hooks/useToast";
import { Button } from "../../../../../components/ui/button";
import PageLoading from "../../../../../components/shared/PageLoading";
import { overviewRoutes } from "../../../../../config/routes";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const toast = useToast();
  const { data, isLoading, isError } = useGetInvoiceForClient({
    invoice_url: id?.toString() || "",
  });

  const invoice: InvoiceType = data;

  const handleCopy = async () => {
    const walletAddress = invoice?.createdBy?.wallet_address;

    if (!walletAddress) {
      toast.error("No wallet address to copy");
      return;
    }

    try {
      await navigator.clipboard.writeText(walletAddress);
      toast.success("Copied");
    } catch (err) {
      toast.error("Failed to copy wallet address");
      console.error(err);
    }
  };

  // console.log(id);
  // console.log(data);
  return (
    <div className="pt-5 pb-20 lg:pt-10">
      {isLoading && <PageLoading />}
      {isError && (
        <div className="landing-container">
          <Link href={overviewRoutes.OVERVIEW}>
            <div className="w-14 lg:w-20">
              <Image
                src="/images/logo-primary-header.svg"
                alt="Stellance Logo"
                width={100}
                loading="eager"
                height={100}
                className="h-full w-full object-contain"
              />
            </div>
          </Link>
          <div className=" flex flex-col items-center mt-20 lg:mt-10 justify-center max-w-[500px] mx-auto">
            <h1 className="text-center font-bold text-[64px] text-primary-500 lg:text-[128px]">
              404
            </h1>
            <p className="text-center font-light lg:text-[36px]">
              Sorry, the content you&apos;re looking for doesn&apos;t exist.
              <br className="max-lg:hidden" /> Either it was removed, or you
              mistyped the link.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="max-w-[250px] sm:max-w-[500px] mt-10"
            >
              Go Back Home
            </Button>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="custom-container">
          <Link href="/">
            <div className="w-14 lg:w-20">
              <Image
                src="/images/logo-primary-header.svg"
                alt="Stellance Logo"
                width={100}
                loading="eager"
                height={100}
                className="h-full w-full object-contain"
              />
            </div>
          </Link>

          <section className="mt-20 max-w-[500px] mx-auto">
            <div className="bg-primary-20 rounded-[5px] sm:rounded-[10px] sm:text-lg border border-[#9fb4dd] mx-auto max-w-[350px] sm:max-w-[400px]">
              <div className="flex flex-col gap-2 items-center p-6 sm:p-8 font-bold border-b border-b-[#9fb4dd]/50">
                <h4 className="">INVOICE AMOUNT</h4>
                <p>{formatCurrency(invoice?.total || 0)}</p>
              </div>

              <div className="p-6 space-y-2 sm:py-8">
                <div className="flex justify-between flex-wrap gap-x-2">
                  <span>Invoice No</span>
                  <span className="font-bold">
                    {invoice?.invoice_number ?? ""}
                  </span>
                </div>
                <div className="flex justify-between flex-wrap gap-x-5">
                  <span>Invoice Date</span>
                  <span className="font-bold">
                    {formatDate(invoice?.created_at || "")}
                  </span>
                </div>
                <div className="flex justify-between flex-wrap gap-x-5">
                  <span>Due Date</span>
                  <span className="font-bold">
                    {formatDate(invoice?.due_date || "")}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-center mt-[30px] font-bold">
                Copy the wallet Address below to pay this invoice externally.
              </p>

              <div className="px-4">
                <div className="flex h-[43px] mt-[30px] md:h-12 md:mt-10">
                  <div className="w-full h-full flex items-center border-r-0 truncate px-[13px] py-3.5 bg-[#AAAAAA66] rounded-bl-[6px] rounded-tl-[6px] text-xs md:text-sm lg:px-5">
                    <p className="max-w-[60%] font-medium">
                      {invoice?.createdBy?.wallet_address}
                    </p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="px-6 md:px-4 flex items-center justify-center bg-[#D9E4F8] border border-[#D9E4F8] rounded-br-[6px] rounded-tr-[6px] text-text-strong gap-2.5 cursor-pointer"
                  >
                    <AiFillCopy className="text-xl " />
                    <span className="max-md:hidden font-medium">Copy</span>
                  </button>
                </div>
              </div>

              <div
                onClick={() => toast.info("Coming soon...")}
                className="text-center mt-10 font-bold text-neutral-900 cursor-pointer"
              >
                Change Payment Methods
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
