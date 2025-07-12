/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import AppButton from "../../../../components/webapp/ui/AppButton";
import {
  accountSetUpRoute,
  createInvoiceRoute,
  walletRoute,
} from "../../../../utils/route";
import { useGetInvoices } from "../../../../hooks/useInvoice";
import { InvoiceType } from "../../../../lib/types/invoiceType";
import { Listbox } from "@headlessui/react";
import { IoChevronDown } from "react-icons/io5";
import { useFetchInvoiceParams } from "../../../../store/invoiceStore";
import { responseStatus } from "../../../../utils/helpers/helperFunctions";
import { useRouter } from "next/navigation";
import InvoiceListDesktop, {
  InvoiceListDesktopSkeleton,
} from "../../../../components/webapp/InvoiceListDesktop";
import InvoiceList, {
  MobileInvoiceSkeleton,
} from "../../../../components/webapp/InvoiceList";
import { invoiceFilterOptions } from "../../../../utils/Constants";
import { userAuth } from "../../../../store/userAuth";
import { toast } from "sonner";

const CreateInvoice = () => {
  const router = useRouter();
  const { credentials } = userAuth();
  const is_profile_complete = credentials?.user?.profile_complete || false;
  const wallet_address = credentials?.user?.wallet?.address;

  const handleCreateInvoiceRoute = () => {
    if (!is_profile_complete) {
      toast.warning("Complete profile to enable creating invoice");
      router.push(accountSetUpRoute);
    } else if (is_profile_complete && !wallet_address) {
      router.push(walletRoute);
      toast.warning("Generate your wallet address to enable creating invoice");
    } else {
      router.push(createInvoiceRoute);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-[163px] lg:w-[200px] mx-auto mt-[80px] lg:mt-[80px]">
        <Image
          alt="Invoice Illustration"
          src="/images/new_Invoice.svg"
          className="h-full w-full object-contain"
          height={500}
          width={500}
        />
      </div>
      <p className="max-w-[294px] lg:max-w-[482px] mx-auto text-center lg:text-xl font-bold mt-4 lg:mt-6">
        You have not created any invoice yet. <br /> All created invoices would
        be displayed here.
      </p>
      <AppButton
        size="lg"
        onClick={handleCreateInvoiceRoute}
        className="w-full mt-7 lg:mt-8 max-w-[320px] sm:max-w-[400px] lg:max-w-[490px]"
      >
        Create Invoice
      </AppButton>
    </div>
  );
};
const NoInvoice = () => {
  return (
    <div className="flex flex-col items-center mx-auto ">
      <div className="w-[100px] lg:w-[150px] mx-auto mt-[80px] lg:mt-[50px]">
        <Image
          alt="Invoice Illustration"
          src="/images/new_Invoice.svg"
          className="h-full w-full object-contain"
          height={500}
          width={500}
        />
      </div>
      <p className="max-w-[294px] lg:max-w-[482px] mx-auto text-center lg:text-xl font-bold mt-4 lg:mt-6">
        No Invoice Found
      </p>
    </div>
  );
};

export default function Page() {
  const router = useRouter();
  const { status, setStatus } = useFetchInvoiceParams();
  const { data, isLoading, isError, error } = useGetInvoices({ status });
  const { data: draftInvoice } = useGetInvoices({ status: "draft" });
  const selectedOption = invoiceFilterOptions.find(
    (opt) => opt.value === status
  );
  const { credentials } = userAuth();
  const is_profile_complete = credentials?.user?.profile_complete || false;
  const wallet_address = credentials?.user?.wallet?.address;

  const invoices: InvoiceType[] = data?.invoice || [];

  // console.log(data);
  // console.log(error);

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
      if (is_profile_complete) {
        responseStatus(statusCode, message, router);
      }
    }
  }, [isError, error]);

  if (status === "" && data?.meta?.total_invoice_count === 0)
    return (
      <div className="myContainer">
        <CreateInvoice />
      </div>
    );

  const handleCreateInvoiceRoute = () => {
    if (!is_profile_complete) {
      toast.warning("Complete profile to enable creating invoice");
      router.push(accountSetUpRoute);
    } else if (is_profile_complete && !wallet_address) {
      router.push(walletRoute);
      toast.warning("Generate your wallet address to enable creating invoice");
    } else {
      router.push(createInvoiceRoute);
    }
  };

  return (
    <div className="myContainer">
      <section className="flex max-[290px]:flex-col gap-2 max-[290px]:gap-5 items-center justify-between mt-5">
        <h3 className="section-title max-[290px]:text-center">Invoice</h3>
        <AppButton
          size="sm"
          onClick={handleCreateInvoiceRoute}
          className="max-[290px]:w-full"
        >
          Create Invoice
        </AppButton>
      </section>
      <div className="mt-8 flex justify-between items-center">
        <Listbox value={status} onChange={(option) => setStatus(option)}>
          <div className="relative w-full max-w-[130px] lg:max-w-[200px] xl:hidden">
            <Listbox.Button className="h-[30px] md:h-10 w-full border border-[#AAAAAA] px-[10px] text-sm md:text-base font-medium rounded-md placeholder:text-[#BFBFBF] focus:border-primary  focus:dark:border-secondary focus:outline-none  duration-150 text-left">
              <span className="block truncate">
                {selectedOption?.label || "All"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2">
                <IoChevronDown
                  className="h-4 w-4 text-[#aaa]"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-[#eeeeee] shadow-lg p-1 text-sm md:text-base  focus:outline-none max-w-[130px]">
              {invoiceFilterOptions.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active }) =>
                    `cursor-pointer select-none px-2 py-2 font-medium rounded-[3px] ${
                      active
                        ? "bg-[#D9E4F8] text-text-strong"
                        : "text-text-strong"
                    }`
                  }
                >
                  {option.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
        <div className="flex gap-1 lg:gap-2 items-center mr-10 md:mr-20 lg:mr-[100px] justify-end xl:w-full">
          <span
            onClick={() => setStatus("draft")}
            className="text-primary cursor-pointer lg:text-lg dark:text-secondary font-bold underline underline-offset-4 xl:text-[32px]"
          >
            Draft
          </span>
          <span
            onClick={() => setStatus("draft")}
            className="bg-primary dark:bg-secondary text-white lg:text-sm min-h-[30px] min-w-[30px] xl:text-base xl:min-h-[40px] xl:min-w-[40px] inline-flex justify-center items-center rounded-full text-xs font-bold"
          >
            {draftInvoice?.meta?.total_invoice_count || 0}
          </span>
        </div>
      </div>

      <div className="h-[60px] bg-[#E8E8E8] dark:bg-[#E8E8E8]/50 mt-[50px] rounded-[6px] p-[2px] flex justify-between max-xl:hidden">
        {invoiceFilterOptions.map((option, i) => {
          const active = option.value === status;
          return (
            <div
              key={i}
              onClick={() => setStatus(option.value)}
              className={`flex text-text-strong cursor-pointer items-center justify-center text-xl font-bold duration-150 w-[181px]  h-full rounded-[6px]
                ${active ? "bg-white dark:bg-white/90" : ""}
                `}
            >
              {option.label}
            </div>
          );
        })}
      </div>

      <section className="mt-[40px] xl:mt-[30px]">
        <div className="flex flex-col gap-[15px] mt-3 xl:hidden">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <MobileInvoiceSkeleton key={i} />
            ))
          ) : invoices.length === 0 ? (
            <NoInvoice />
          ) : (
            invoices?.map((invoice: InvoiceType) => (
              <InvoiceList key={invoice.id} {...invoice} />
            ))
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto pb-5 scroll">
          <table className="min-w-full border-separate border-spacing-y-2 overflow-hidden text-text-strong dark:text-white max-xl:hidden">
            {invoices?.length !== 0 && (
              <thead className="bg-[#D9E4F866] overflow-hidden ">
                <tr className="">
                  <th
                    scope="col"
                    className="px-4 py-5 text-start font-bold whitespace-nowrap "
                  >
                    Invoice ID
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-5 text-center font-bold whitespace-nowrap "
                  >
                    Customer Details
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-5 text-center font-bold whitespace-nowrap "
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-5 text-center font-bold whitespace-nowrap "
                  >
                    Date Issued
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-5 text-center font-bold whitespace-nowrap "
                  >
                    Due Date
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-5 text-center font-bold whitespace-nowrap "
                  >
                    Amount
                  </th>
                  <th
                    // scope="col"
                    className="px-4 py-5 text-center font-bold whitespace-nowrap  "
                  >
                    Status
                  </th>
                </tr>
              </thead>
            )}

            {/* Table Body */}
            <tbody className="divide-y divide-black">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <InvoiceListDesktopSkeleton key={i} />
                  ))
                : invoices?.map((invoice: InvoiceType) => (
                    <InvoiceListDesktop key={invoice?.id} {...invoice} />
                  ))}
            </tbody>
          </table>
          {invoices?.length === 0 && !isLoading && (
            <div className="max-xl:hidden">
              <NoInvoice />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
