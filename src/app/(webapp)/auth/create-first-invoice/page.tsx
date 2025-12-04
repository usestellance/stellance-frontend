"use client";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import { dashboardRoutes, invoiceRoutes } from "../../../../config/routes";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center">
      <IoMdCheckmarkCircleOutline className="text-[150px] mt-14 text-primary-500" />
      <p className="text-xl mt-11 mb-5">Account Created Successfully</p>
      <Button
        onClick={() => router.push(invoiceRoutes.CHOOSE_TEMPLATE)}
        className="max-w-[500px] mb-5"
      >
        Create your first invoice
      </Button>
      <Link
        href={dashboardRoutes.HOME}
        className="underline font-bold underline-offset-4 text-sm"
      >
        Later
      </Link>
    </div>
  );
}
