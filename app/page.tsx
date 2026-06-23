import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Experiences from "@/components/Experiences";
import Gallery from "@/components/Gallery";
import Events from "@/components/Events";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <About />
      <Experiences />
      <Gallery />
      <Events />
      <Footer />
    </main>
  );
}
