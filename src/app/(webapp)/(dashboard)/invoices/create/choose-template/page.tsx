import React from "react";
import ChooseTemplate from "../../../../../../features/invoice/components/ChooseTemplate";

export default function Page() {
  return (
    <div className="pb-20 ">
      <section className="bg-primary-500">
        <div className="custom-container text-neutral-comment  flex py-6 max-lg:mt-8 flex-col gap-1 md:gap-2.5">
          <p className="text-xl sm:text-3xl md:text-4xl">Create Invoice</p>
          <p className="text-sm font-light sm:text-xl md:text-2xl">
            Let&apos;s manage your invoices
          </p>
        </div>
      </section>

      <section className="mt-10">
        <div className="max-w-[2000px] mx-auto pl-4 sm:pl-[30px] md:pl-10 bg-pink-40">
          <ChooseTemplate />
        </div>
      </section>

      <section>
        <div className="custom-container">hello</div>
      </section>
    </div>
  );
}
