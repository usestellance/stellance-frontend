"use client";
import Image from "next/image";
import { invoiceTemplates } from "../../../../../../config/templates";
import ChooseTemplate from "../../../../../../features/invoice/components/ChooseTemplate";
import { useTemplateStore } from "../../../../../../store/useTemplate";

export default function Page() {
  const { selectedTemplate } = useTemplateStore();
  const temp = invoiceTemplates.find((t) => t.id === selectedTemplate);

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
        <div className="w-full lg:max-w-fit mx-auto pl-4 sm:pl-[30px] md:pl-10 bg-pink-40">
          <ChooseTemplate />
        </div>
      </section>

      <section className="mt-8 md:mt-20 ">
        <div className="custom-container overflow-x-auto">
          <h3 className="lg:text-2xl font-light italic xl:text-center">
            Preview Template
          </h3>
          <div className="w-full max-w-[955px] min-[770px]:max-w-[500px] lg:max-w-[995px] mx-auto">
            {temp && (
              <Image
                src={temp.thumbnail}
                alt={temp.name}
                width={500}
                height={500}
                className="h-full w-full object-contain"
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
