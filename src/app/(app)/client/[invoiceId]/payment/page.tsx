"use client";
import React, { useEffect } from "react";
import { useGetInvoiceForClient } from "../../../../../hooks/useInvoice";
import { useParams } from "next/navigation";
import { InvoiceType } from "../../../../../lib/types/invoiceType";
import PageLoading from "../../../../../components/webapp/PageLoading";
import {
  formatCurrency,
  formatDate,
} from "../../../../../utils/helpers/helperFunctions";
import { toast } from "sonner";
import AppButton from "../../../../../components/webapp/ui/AppButton";
import PaymentMethodModal from "../../../../../components/webapp/modals/PaymentMethodModal";
import { usePaymentModalStore } from "../../../../../store/modals";

export default function Page() {
  const { openModal } = usePaymentModalStore();
  const { invoiceId } = useParams();
  const { isError, error, data, isLoading } = useGetInvoiceForClient({
    invoice_url: invoiceId?.toString() || "",
  });
  const invoice: InvoiceType = data;

  console.log(invoice);

  useEffect(() => {
    if (isError && error) {
      toast.error("Something went wrong");
    }
  }, [isError, error]);

  if (isLoading) {
    return <PageLoading showLogo />;
  }

  return (
    <div className="mt-20 text-sm sm:text-lg text-center myContainer">
      <p className="font-bold leading-[25px] sm:leading-[150%] md:text-lg lg:text-2xl">
        Click the button below to pay for this invoice{" "}
        <br className="max-sm:hidden" /> via your Stellance wallet{" "}
      </p>

      <div className="border border-[#9FB4DD] min-h-[276px] bg-[#D9E4F866] mt-[30px] mb-[52px] py-5 sm:pb-10 w-full max-w-[242px] rounded-[5px] mx-auto sm:mt-16 sm:mb-14 sm:max-w-[350px]">
        <div className="px-6 font-bold">
          <h3 className="">INVOICE AMOUNT</h3>
          <h4 className="mt-2 font-bold">
            {formatCurrency(invoice?.total || 0)}
          </h4>
        </div>

        <hr className="text-[#9FB4DD80] mt-[18px] mb-4 sm:mb-7" />

        <div className="px-6 flex flex-col gap-3 sm:gap-5">
          <div className="flex justify-between">
            <span>Invoice No</span>
            <span className="font-bold">{invoice?.invoice_number || ""}</span>
          </div>
          <div className="flex justify-between">
            <span>Invoice Date</span>
            <span className="font-bold">
              {formatDate(invoice?.created_at) || ""}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Due Date</span>
            <span className="font-bold">
              {formatDate(invoice?.due_date) || ""}
            </span>
          </div>
          <AppButton size="sm" className="mx-auto mt-[18px] sm:w-full">
            Pay invoice
          </AppButton>
        </div>
      </div>

      <p
        onClick={openModal}
        className="cursor-pointer text-[#4285F4] font-bold text-sm md:text-lg text-center"
      >
        Change payment method
      </p>
      <PaymentMethodModal />
    </div>
  );
}
