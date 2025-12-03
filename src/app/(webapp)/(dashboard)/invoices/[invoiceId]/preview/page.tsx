"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const params = useParams();
  const id = params.invoiceId;

  return <div className="pt-20">{id}</div>;
}
