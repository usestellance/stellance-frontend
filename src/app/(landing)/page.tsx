import Image from "next/image";
import Link from "next/link";
import { authRoutes } from "../../config/routes";
import Header from "../../components/landing/Header";
import Hero from "../../components/landing/Hero";
import About from "../../components/landing/about/About";
import EveryPayment from "../../components/landing/EveryPayment";
import Among from "../../components/landing/Among";
import Features from "../../components/landing/features/Features";
import Benefits from "../../components/landing/Benefits";

export default function Home() {
  return (
    <main className="bg-neutral-500">
      <div className="hero-bg bg-primary-500">
        <Header />
        <Hero />
      </div>
      <About />
      <EveryPayment />
      <Among />
      <Features />
      <Benefits />
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
