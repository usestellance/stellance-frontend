"use client";
import { useRouter } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import { invoiceRoutes } from "../../../../config/constants/routes";
import { StatsCards } from "../../../../features/dashboard/components/StatsCards";

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
            <p className="text-xs font-light sm:text-base">
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
    </div>
  );
}
