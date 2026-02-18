import Image from "next/image";
import Link from "next/link";
import { authRoutes } from "../../config/routes";
import Header from "../../components/landing/Header";
import Hero from "../../components/landing/Hero";

export default function Home() {
  return (
    <main>
      <div className="hero-bg">
        <Header />
        <Hero />
      </div>
    </main>
    // <div className="flex min-h-screen flex-col items-center justify-center py-2">
    //   <Image
    //     src="/images/logo-primary.svg"
    //     alt="Stellance Logo"
    //     width={300}
    //     height={300}
    //   />
    //   <p className="mt-10">
    //     Landing page, Go to{" "}
    //     <Link className="font-bold" href={authRoutes.LOGIN}>
    //       Login
    //     </Link>{" "}
    //   </p>
    // </div>
  );
}
