import GoBack from "../../../../../../components/ui/custom/GoBack";
import Template01 from "../../../../../../features/invoice/components/templates/Template01";
import Template02 from "../../../../../../features/invoice/components/templates/Template02";
import Template03 from "../../../../../../features/invoice/components/templates/Template03";
import Template04 from "../../../../../../features/invoice/components/templates/Template04";
import Template05 from "../../../../../../features/invoice/components/templates/Template05";

export default function Page() {
  return (
    <div className="pt-10 custom-container pb-20">
      <GoBack />
      <section>
        <h3 className="font-medium text-2xl text-center md:text-3xl ">
          Invoice Preview
        </h3>
        <p className="mt-2 text-sm text-center md:text-base">
          Review your invoice before sending
        </p>
      </section>

      <section className="md:px-4 md:max-w-[500px]  lg:max-w-[650px] xl:max-w-[800px] mx-auto">
        {/* <Template01 /> */}
        {/* <Template02  /> */}
        {/* <Template03  /> */}
        {/* <Template04  /> */}
        <Template05  />
      </section>
    </div>
  );
}
