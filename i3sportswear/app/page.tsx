import Hero from "@/components/Hero";
import JerseyLab from "@/components/JerseyLab";
import Sports from "@/components/Sports";
import Customize from "@/components/Customize";
import Process from "@/components/Process";
import Identity from "@/components/Identity";
import Archive from "@/components/Archive";
import { Clients, Testimonials, Trust } from "@/components/Proof";
import { FinalCta, Footer } from "@/components/Closing";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <JerseyLab />
        <Sports />
        <Customize />
        <Process />
        <Identity />
        <Archive />
        <Trust />
        <Clients />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
