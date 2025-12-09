"use client";
import GoBack from "../../../../../components/ui/custom/GoBack";
import { BiPrinter } from "react-icons/bi";
import { Button } from "../../../../../components/ui/button";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params.id;

  console.log(id);

  return (
    <div className="pt-5 lg:pt-20">
      <div className="custom-container">
        <div className="text-[30px] lg:text-[40px]">
          <GoBack />
        </div>
        <div className="text-[22px]">
          <h2 className="text-center mt-5">Invoice {id} Receipt</h2>
          <div className="flex justify-between items-center mt-11">
            <Button
              variant="outline"
              className="rounded-3xl h-[35px] max-w-36 font-light text-sm hover:bg-primary-500 hover:text-white lg:max-w-[120px] lg:h-[50px] lg:text-xl"
            >
              Download as PDF
            </Button>
            <div className="rounded-[5px] w-11 h-9 flex items-center justify-center cursor-pointer lg:rounded-xl bg-primary-50 hover:bg-primary-500 hover:text-white text-primary-500  lg:w-[60px] lg:h-[52px] duration-200">
              <BiPrinter className="text-xl" />
            </div>
          </div>
          <div className="bg-success-500 text-neutral-500 rounded-[6px] flex items-center gap-2.5 px-5 py-3.5 mt-5">
            <IoMdCheckmarkCircleOutline className="text-[40px] inline-block" />
            <div>
              <h4 className="font-bold text-base">PAID</h4>
              <p className="text-xs font-medium">
                Payment confirmed: Oct 26th, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
