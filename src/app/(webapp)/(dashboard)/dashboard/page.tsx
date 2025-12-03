"use client";
import { useRouter } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import { invoiceRoutes } from "../../../../config/constants/routes";
import { StatsCards } from "../../../../features/dashboard/components/StatsCards";
import { ChartAreaInteractive } from "../../../../features/dashboard/components/AreaChart";
import { ChartPieInteractive } from "../../../../features/dashboard/components/PieChart";
import LatestInvoices from "../../../../features/dashboard/components/LatestInvoices";

export default function Page() {
  const router = useRouter();

  return (
    <div className="pb-20 ">
      <section className="bg-primary-500">
        <div className="custom-container text-neutral-comment flex justify-between items-center py-6 max-lg:mt-8 gap-2">
          <div className="flex flex-col gap-1">
            <p className="sm:text-2xl lg:text-3xl line-clamp-1">
              Good day, John
            </p>
            <p className="text-sm font-light sm:text-base">
              Let&apos;s manage your invoices
            </p>
          </div>
          <div>
            <Button
              onClick={() => router.push(invoiceRoutes.CREATE)}
              className="lg:min-w-[200px]"
              variant="secondary"
            >
              Create Invoice
            </Button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-primary-50/40 mt-10 py-5">
        <StatsCards />
      </section>

      <section className="max-w-[2000px] mx-auto sm:px-[30px] md:px-10 flex flex-col mt-10 lg:flex-row gap-[42px]">
        <div className="border-2 lg:border-[5px] border-primary-20 lg:rounded-[10px] lg:w-1/2 overflow-hidden">
          <ChartAreaInteractive />{" "}
        </div>
        <div className="lg:w-1/2 border-2 lg:border-[5px] border-primary-20 lg:rounded-[10px] overflow-hidden">
          <ChartPieInteractive />{" "}
        </div>
      </section>

      <section className="mt-10 lg:mt-[60px]">
        <div className="custom-container">
          <LatestInvoices />
        </div>
      </section>
    </div>
  );
}
