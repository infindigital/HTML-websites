import Hero from "@/components/home/Hero";
import Statement from "@/components/home/Statement";
import SportTiles from "@/components/home/SportTiles";
import OfficialJerseys from "@/components/home/OfficialJerseys";
import JerseyShowcase from "@/components/home/JerseyShowcase";
import SportsShowcase from "@/components/home/SportsShowcase";
import Customize from "@/components/home/Customize";
import Process from "@/components/home/Process";
import About from "@/components/home/About";
import WhyChoose from "@/components/home/WhyChoose";
import { Clients, Testimonials } from "@/components/home/Clients";
import { Contact, FinalCta, Footer, WhatsAppFloat } from "@/components/home/Closing";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Clients />
        <SportTiles />
        <Statement />
        <JerseyShowcase />
        <OfficialJerseys />
        <SportsShowcase />
        <Customize />
        <Process />
        <About />
        <WhyChoose />
        <Testimonials />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
