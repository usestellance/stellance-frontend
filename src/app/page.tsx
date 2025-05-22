import Header from "@/components/Header";
import About from "@/components/landing/About";
import BeingAmongst from "@/components/landing/BeingAmongst";
import Footer from "@/components/landing/Footer";
import ForClient from "@/components/landing/forBusiness&Client/ForClient";
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
      <Footer />
    </>
  );
}
