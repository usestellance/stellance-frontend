"use client";
import React from "react";
import Receipts from "../../../../features/receipt/components/Receipts";

export default function Page() {
  return (
    <div className="pt-5 pb-20">
      <div className="custom-container">
          <h2 className="h2-app">Receipts</h2>

        <section className="lg:mt-[30px]">
          <Receipts />
        </section>
      </div>
    </div>
  );
}
