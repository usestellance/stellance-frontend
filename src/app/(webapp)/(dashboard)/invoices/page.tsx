import React from "react";
import { Button } from "../../../../components/ui/button";
import Invoices from "../../../../features/invoice/components/Invoices";

export default function Page() {
  return (
    <div className="pt-5">
      <div className="custom-container">
        <section className="py-[15px] flex justify-between gap-2 items-center">
          <h2 className="h2-app">Invoce</h2>
          <Button variant="default" className="in-app-btn">
            Create Invoice
          </Button>
        </section>

        <section>
          <Invoices />
        </section>
      </div>
    </div>
  );
}
