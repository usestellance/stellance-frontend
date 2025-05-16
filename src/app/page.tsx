import Header from "@/components/Header";
import About from "@/components/landing/About";
import BeingAmongst from "@/components/landing/BeingAmongst";
import ForClient from "@/components/landing/ForClient";
import Hero from "@/components/landing/Hero";
import PinkPage from "@/components/landing/PinkPage";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <ForClient />
      <PinkPage />
      <BeingAmongst />
    </>
  );
}
