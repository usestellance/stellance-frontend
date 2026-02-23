import React from "react";
import Logo from "../../../components/shared/Logo";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <div className="">{children}</div>
    </main>
  );
}
