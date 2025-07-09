"use client";
import React, { useEffect, useState } from "react";
import AppButton from "../../../../components/webapp/ui/AppButton";
import {
  capitalizeWords,
  formatCurrency,
  formatDateTime,
  maskMiddle,
} from "../../../../utils/helpers/helperFunctions";
import {
  useGetInvoiceForClient,
  useReviewInvoice,
} from "../../../../hooks/useInvoice";
import { useParams } from "next/navigation";
import { InvoiceType } from "../../../../lib/types/invoiceType";
import { SERVICE_CHARGE } from "../../../../utils/Constants";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import InvoiceSkeletonLoader from "../../../../components/webapp/InvoiceSkeletonLoader";
import { toast } from "sonner";

const getStatusBadge = (status: string) => {
  const statusStyles = {
    Paid: "text-[#004E31] border-[#007A4D] bg-[#007A4D]/20",
    Sent: "border-[#FFCE74] bg-[#FFCE74]/20 text-[#885800] dark:bg-[#FFC75F] ",
    Overdue: "text-[#910400] border-[#D31510] bg-[#D31510]/15",
    Draft: "bg-[#508DFA]/15 text-[#508DFA] border-[#508DFA]",
    Cancelled: "text-[#800000] border-[#800000] bg-[#800000]/20",
    Viewed: "text-[#004E31] border-[#00FF55] bg-[#00FF55]/15 dark:bg-[#00FF55]",
  };
  // console.log(invoice);

  return (
    <span
      className={`min-h-7 w-fit px-1 min-w-[59px] border rounded-[3px] text-xs flex justify-center items-center font-medium ${
        statusStyles[status as keyof typeof statusStyles] || statusStyles.Draft
      } lg:h-12 sm:text-base lg:text-lg lg:min-w-[90px] px-4 py-2`}
    >
      {(status === "Viewed" && capitalizeWords("Approved")) ||
        (status === "Cancelled" && capitalizeWords("Declined")) ||
        (status === "Sent" && capitalizeWords("Pending")) ||
        capitalizeWords(status)}
    </span>
  );
};

export default function Page() {
  const { invoiceId } = useParams();
  const { data, isLoading, isError, error } = useGetInvoiceForClient({
    invoice_url: invoiceId?.toString() || "",
  });
  const [approve, setApprove] = useState<boolean>(true);
  const invoice: InvoiceType = data;
  const { mutate, isPending } = useReviewInvoice(
    invoice?.id?.toString() || "",
    approve
  );
  const user = invoice?.createdBy;

  // console.log(data);

  useEffect(() => {
    if (isError && error) {
      toast.error("Something went wrong");
    }
  }, [isError, error]);

  useEffect(() => {
    const toastId = "review-toast";

    if (isPending) {
      toast.loading("Reviewing...", { id: toastId });
    } else {
      toast.dismiss(toastId);
    }
  }, [isPending]);

  if (isLoading) {
    return <InvoiceSkeletonLoader />;
  }

  const handleReviewInvoice = (status: boolean) => {
    setApprove(status);
    mutate();
  };

  return (
    <div className="pb-20 md:pb-10 text-text-strong mt-30 myContainer">
      <section className="bg-primary-light/40 dark:bg-primary-light/90 border border-[#9FB4DD] pt-5 mt-10 rounded-[10px] pb-[29px] sm:pt-10 sm:pb-[56px]">
        <div className="border-b border-[#9FB4DD80] pb-4 flex flex-col items-center lg:pb-7">
          <h3 className="text-sm text-center px-2 font-bold sm:text-base lg:text-2xl">
            {invoice?.invoice_number || ""}
          </h3>
          <div className="mt-4 md:mt-6">
            {getStatusBadge(capitalizeWords(invoice?.status || "") || "")}
            {/* {getStatusBadge(capitalizeWords('paid') || "")} */}
          </div>
          <div className="text-sm flex flex-col text-center mt-2 leading-[25px] sm:text-lg lg:leading-[150%]  lg:text-3xl md:mt-4">
            <span className="">Balance Due:</span>
            <span className="font-bold">
              {formatCurrency(invoice?.total || 0)}
            </span>
          </div>
        </div>

        <div className="px-4 sm:px-[30px]">
          <h5 className="mt-3 mb-[14px] text-sm font-semibold sm:text-base lg:text-xl md:mt-5 md:mb-4">
            Invoice Details
          </h5>

          <div className="flex gap-[40px] ">
            {/* Biller */}
            <div className="flex flex-col text-sm sm:text-lg lg:text-2xl font-medium leading-[150%]  min-w-0 flex-1">
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
            <div className="flex justify-end text-sm sm:text-lg lg:text-2xl font-medium leading-[150%] text-[#111111]  min-w-0 flex-1">
              <p className="flex flex-col w-fit min-w-0">
                <span className="text-[#8F8F8F]">Billed To:</span>
                <span className="font-bold break-words">
                  {invoice?.payer_name || ""}
                </span>
                <span className="break-words">
                  {invoice?.payer_email || ""}
                </span>
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

          <p className="text-sm lg:text-xl font-semibold text-[#8F8F8F] mt-4 md:mt-10">
            Wallet Address:{" "}
            {maskMiddle(
              "GC7OHFPWPSWXL4HMN6TXAG54MTZSMJIASWHO6KVRQNHNCXEAHWDSGGC3"
            )}
          </p>
        </div>

        <div className="mt-[35px] lg:mt-[50px] ">
          <InvoiceItems inv={invoice} />
        </div>

        <div className="leading-[150%] px-[30px] text-[#8F8F8F] text-sm lg:text-xl mt-4 lg:mt-5">
          <span className="font-medium">Note:</span>
          <br />
          <span className="font-bold italic">Thanks for patronizing</span>
        </div>
      </section>

      {invoice?.status === "sent" && (
        <div className="flex items-center justify-center gap-6 mt-14 md:mt-20">
          <AppButton
            onClick={() => handleReviewInvoice(false)}
            disabled={isPending}
            size="sm"
            theme="tetiary"
            className="sm:w-full"
          >
            Decline
          </AppButton>
          <AppButton
            onClick={() => handleReviewInvoice(true)}
            disabled={isPending}
            size="sm"
            className="sm:w-full"
          >
            Approve
          </AppButton>
        </div>
      )}

      {/* Replace the array with a valid status array or a direct condition */}
      {invoice?.status === "sent" && (
        <div className="text-center text-sm font-bold mt-[51px] lg:mt-[70px] sm:text-lg lg:text-2xl text-[#18234F80] dark:text-secondary-disabled">
          CLICK HERE TO PAY THIS INVOICE
        </div>
      )}
      {invoice?.status === "viewed" && (
        <Link
          href="#"
          className="block text-center text-sm font-bold mt-[51px] lg:mt-[70px] sm:text-lg lg:text-2xl text-primary dark:text-secondary"
        >
          CLICK HERE TO PAY THIS INVOICE
        </Link>
      )}
      {invoice?.status === "cancelled" && (
        <div className="text-center text-sm font-bold mt-[90px] lg:mt-[110px] sm:text-lg lg:text-2xl">
          <MdOutlineCancel className="text-[50px] sm:text-6xl md:text-7xl mx-auto text-[#B40000E5]" />
          <p className="mt-5">INVOICE DECLINED</p>
        </div>
      )}
    </div>
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
                className="px-4 py-[15px] xl:text-[24px] text-center font-bold whitespace-nowrap "
              >
                Type
              </th>
              <th
                scope="col"
                className="px-4 py-[15px] xl:text-[24px] text-center font-bold whitespace-nowrap "
              >
                Description
              </th>
              <th
                scope="col"
                className="px-4 py-[15px] xl:text-[24px] text-center font-bold whitespace-nowrap "
              >
                Unit Price
              </th>
              <th
                scope="col"
                className="px-4 py-[15px] xl:text-[24px] text-center font-bold whitespace-nowrap "
              >
                Quantity
              </th>
              <th
                scope="col"
                className="px-4 py-[15px] xl:text-[24px] text-center font-bold whitespace-nowrap "
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
                  {inv?.invoice_type === "per_unit" ? "Per Unit" : "Per Hour"}
                </td>
                <td className="px-4 py-[15px] whitespace-nowrap text-xs lg:text-lg text-center">
                  {inv?.description || ""}
                </td>
                <td className="px-4 py-[15px] text-xs lg:text-lg text-center">
                  {formatCurrency(inv?.unit_price) || 0}
                </td>
                <td className="px-4 py-[15px] text-xs lg:text-lg text-center">
                  {inv?.quantity || 0}
                </td>
                <td className="px-4 py-[15px] text-xs lg:text-lg text-center">
                  {formatCurrency(inv?.amount) || 0}
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
