import React from "react";
import AppButton from "../../../../components/webapp/ui/AppButton";
import Link from "next/link";
import { LuCircleCheckBig } from "react-icons/lu";
import { createInvoiceRoute, dashboardRoute } from "../../../../utils/route";

export default function Page() {
  return (
    <section className="sm:bg-primary sm:shadow sm:rounded-[10px] sm:px-[60px] sm:py-[78px] sm:text-white dark:sm:bg-white sm:dark:text-[#14171F] mb-20 flex items-center justify-center sm:min-h-[800px] sm:mb-0">
      <div className="mt-[50px] sm:mt-0 w-full flex flex-col items-center">
        <LuCircleCheckBig className="text-[150px] mx-auto stroke-1 sm:text-[210px]" />
        <p className="text-xl font-bold mt-5">Account Created Successfully!</p>
        <AppButton size="lg" type="button" className="w-full mt-5 sm:hidden">
          Create your first invoice
        </AppButton>
        <AppButton
          size="lg"
          href={createInvoiceRoute}
          className="w-full mt-10"
          customTheme="bg-white text-primary max-sm:hidden dark:text-white dark:bg-secondary"
        >
          Create your first invoice
        </AppButton>

        <Link
          href={dashboardRoute}
          className="underline underline-offset-2 text-sm mt-5 sm:text-lg"
        >
          Later
        </Link>
      </div>
    </section>
  );
}
