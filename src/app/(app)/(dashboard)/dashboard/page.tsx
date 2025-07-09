/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import AppButton from "../../../../components/webapp/ui/AppButton";
import {
  accountSetUpRoute,
  createInvoiceRoute,
  walletRoute,
} from "../../../../utils/route";
import InvoiceList, {
  MobileInvoiceSkeleton,
} from "../../../../components/webapp/InvoiceList";
import InvoiceListDesktop, {
  InvoiceListDesktopSkeleton,
} from "../../../../components/webapp/InvoiceListDesktop";
import { InvoiceType } from "../../../../lib/types/invoiceType";
import { useGetInvoices } from "../../../../hooks/useInvoice";
import { useRouter } from "next/navigation";
import { responseStatus } from "../../../../utils/helpers/helperFunctions";
// import { userAuth } from "../../../../store/userAuth";
import Image from "next/image";
import { userAuth } from "../../../../store/userAuth";
import { toast } from "sonner";

const StatsCard = ({
  title,
  amount,
  invoices,
}: {
  title: string;
  amount: number;
  invoices: number;
}) => {
  return (
    <div
      className="w-full h-[120px] max-[340px]:h-[120px] sm:h-[154px] xl:h-[170px] mx-auto bg-[#D9E4F8] rounded-[5px] p-2 flex flex-col items-center justify-center gap-2 text-text-strong"
      style={{ boxShadow: "0px 4px 10px 0px #8392CD4D" }}
    >
      <div className="font-bold max-[300px]:text-base sm:text-lg lg:text-xl xl:text-2xl ">
        {title}
      </div>
      <div className="flex items-center gap-[6px]">
        {/* stellar logo */}

        <span className="text-xl font-bold xl:text-[28px]">${amount}</span>
      </div>
      <div className="text-xs sm:text-lg font-light">{invoices} Invoices</div>
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
  // const { order_by, page, page_count, status } = useFetchInvoiceParams();
  const { data, error, isError, isLoading } = useGetInvoices({});
  const router = useRouter();

  const { credentials } = userAuth();
  const is_profile_complete = credentials?.profile_complete;
  const wallet_address = credentials?.user.wallet?.address;

  console.log(wallet_address);

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
      // console.log(error)
    }
  }, [isError, error]);

  const invoices: InvoiceType[] = data?.invoice;

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
        <h3 className="section-title max-[290px]:text-center">Dashboard</h3>
        <AppButton
          size="sm"
          onClick={handleCreateInvoiceRoute}
          className="max-[290px]:w-full"
        >
          Create Invoice
        </AppButton>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 max-[340px]:gap-5 max-[340px]:grid-cols-1 mt-[37px]">
        <StatsCard title="Total Invoices" amount={0} invoices={0} />
        <StatsCard title="Paid Invoices" amount={0} invoices={0} />
        <StatsCard title="Pending Invoices" amount={0} invoices={0} />
        <StatsCard title="Overdue Invoices" amount={0} invoices={0} />
      </section>

      <section className="mt-[47px] lg:mt-[60px]">
        <h4 className="section-subtitle">Latest Invoices</h4>
        {is_profile_complete && (
          <div className="flex flex-col gap-[15px] mt-3 xl:hidden">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <MobileInvoiceSkeleton key={i} />
                ))
              : invoices?.map((invoice: InvoiceType) => (
                  <InvoiceList key={invoice.id} {...invoice} />
                ))}
          </div>
        )}

        {/* Table */}
        {is_profile_complete && (
          <div className="overflow-x-auto pb-5 scroll">
            <table className="min-w-full border-separate border-spacing-y-2 overflow-hidden text-text-strong dark:text-white max-xl:hidden mt-[20px] ">
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
                      className="px-4 py-5 text-center font-bold  "
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
                      <InvoiceListDesktop key={invoice.id} {...invoice} />
                    ))}
              </tbody>
            </table>
          </div>
        )}
        {(!is_profile_complete || (invoices?.length === 0 && !isLoading)) && (
          <div className="mt-10">
            <NoInvoice />
          </div>
        )}
      </section>
    </div>
  );
}
