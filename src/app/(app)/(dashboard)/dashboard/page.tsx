import React from "react";
import AppButton from "../../../../components/webapp/ui/AppButton";
import { invoiceRoute } from "../../../../utils/route";
import InvoiceList from "../../../../components/webapp/InvoiceList";

const StatsCard = () => {
  return (
    <div
      className="w-full h-[120px] max-[340px]:h-[120px] sm:h-[154px] xl:h-[170px] mx-auto bg-[#D9E4F8] rounded-[5px] p-2 flex flex-col items-center justify-center gap-2 text-text-strong"
      style={{ boxShadow: "0px 4px 10px 0px #8392CD4D" }}
    >
      <div className="font-bold max-[300px]:text-base sm:text-lg lg:text-xl xl:text-2xl ">
        Total Invoices
      </div>
      <div className="flex items-center gap-[6px]">
        {/* stellar logo */}
        <svg
          className="h-[16px] w-[18px] md:h-[27px] md:w-[27px]"
          // width="18"
          // height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.00225 0.28689C7.97475 0.28689 6.97725 0.48939 6.04125 0.87189C4.21756 1.64688 2.76661 3.10052 1.995 4.92564C1.59839 5.86389 1.39508 6.8725 1.39725 7.89114C1.39725 8.08464 1.404 8.27839 1.4175 8.47239C1.43985 8.75932 1.3766 9.04643 1.23576 9.29741C1.09491 9.5484 0.882801 9.75197 0.62625 9.88239L0 10.2004V11.6269L1.84725 10.6819L1.90125 10.6579V10.6616L2.47875 10.3691L3.04725 10.0804L3.09675 10.0511L14.202 4.38114L15.4515 3.74589L17.9955 2.44689V1.02039L13.344 3.39489L2.808 8.76864L2.73 8.80989L2.71725 8.72364C2.68038 8.44895 2.66259 8.17204 2.664 7.89489C2.664 6.20364 3.324 4.61214 4.5195 3.41214C5.10244 2.83009 5.79267 2.36655 6.552 2.04714C7.31277 1.73003 8.12781 1.56346 8.952 1.55664H9.00225C10.0755 1.55481 11.1313 1.82717 12.0697 2.34789L13.2908 1.72539L13.3853 1.67589C12.1033 0.769555 10.5715 0.283919 9.0015 0.28614L9.00225 0.28689ZM18 4.35714L3.78525 11.6059L2.53575 12.2411L0 13.5364V14.9629L2.4615 13.7096L4.644 12.5959L15.1875 7.23114L15.2662 7.18989L15.2782 7.27614C15.3158 7.55289 15.3323 7.83339 15.3323 8.10864C15.3323 9.79989 14.6723 11.3959 13.476 12.5921C12.8931 13.1742 12.2028 13.6377 11.4435 13.9571C10.6839 14.278 9.86809 14.4447 9.0435 14.4476H8.9985C7.92206 14.448 6.86328 14.1741 5.922 13.6519L5.8725 13.6766L4.61025 14.3194C5.05679 14.6341 5.53517 14.9011 6.0375 15.1159C6.97413 15.5118 7.98088 15.7151 8.99775 15.7136C9.99695 15.7148 10.9865 15.5182 11.9094 15.1353C12.8323 14.7523 13.6704 14.1906 14.3752 13.4824C15.0822 12.7753 15.6428 11.9357 16.0249 11.0116C16.4069 10.0876 16.6031 9.0973 16.602 8.09739C16.602 7.90314 16.5982 7.70514 16.5817 7.51164C16.5594 7.22471 16.6227 6.9376 16.7635 6.68662C16.9043 6.43564 17.1164 6.23206 17.373 6.10164L18 5.78289V4.35714Z"
            fill="black"
          />
        </svg>

        <span className="text-xl font-bold xl:text-[28px]">250</span>
      </div>
      <div className="text-lg font-light max-md:hidden">30 Invoices</div>
    </div>
  );
};

export default function Page() {
  const sampleInvoices = [
    {
      id: "INV-001",
      customer: { name: "John Doe", email: "john@example.com" },
      description: "Web Development Services",
      dateIssued: "2024-01-15",
      dueDate: "2024-02-15",
      amount: 2500.0,
      status: "Pending",
    },
    {
      id: "INV-002",
      customer: { name: "Jane Smith", email: "jane@company.com" },
      description: "Mobile App Design",
      dateIssued: "2024-01-10",
      dueDate: "2024-02-10",
      amount: 3200.0,
      status: "Paid",
    },
    {
      id: "INV-003",
      customer: { name: "Bob Wilson", email: "bob@startup.io" },
      description: "SEO Optimization Package",
      dateIssued: "2024-01-08",
      dueDate: "2024-01-25",
      amount: 1800.0,
      status: "Overdue",
    },
  ];

  return (
    <div className="myContainer">
      <section className="flex max-[290px]:flex-col gap-2 max-[290px]:gap-5 items-center justify-between mt-5">
        <h3 className="section-title max-[290px]:text-center">Dashboard</h3>
        <AppButton size="sm" href={invoiceRoute} className="max-[290px]:w-full">
          Create Invoice
        </AppButton>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 max-[340px]:gap-5 max-[340px]:grid-cols-1 mt-[37px]">
        <StatsCard />
        <StatsCard />
        <StatsCard />
        <StatsCard />
      </section>

      <section className="mt-[47px] lg:mt-[60px]">
        <h4 className="section-subtitle">Latest Invoices</h4>
        <div className="flex flex-col gap-[15px] mt-3 xl:hidden">
          {sampleInvoices.map((invoice) => (
            <InvoiceList key={invoice.id} invoice={invoice} />
          ))}
        </div>

        <table className="min-w-full text-text-strong dark:text-white max-xl:hidden">
          {/* Table Header */}
          <thead className="bg-[#D9E4F866] rounded-[5px] overflow-hidden mb-2">
            <tr className="rounded-[5px]">
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium  tracking-wider"
              >
                Invoice ID
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium  tracking-wider"
              >
                Customer Details
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium  tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium  tracking-wider"
              >
                Date Issued
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium  tracking-wider"
              >
                Due Date
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium  tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium  tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="mt-2">
            {sampleInvoices.map((invoice) => (
              <InvoiceList key={invoice.id} invoice={invoice} />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
