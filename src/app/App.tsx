import { useRef } from "react"; // 1. Import useRef
import { HeroSection } from "./components/hero-section";
import { BentoGrid } from "./components/bento-grid";
import { ServicesSection } from "./components/services-section";
import { TrustTicker } from "./components/trust-ticker";
import { WhyChooseUs } from "./components/why-choose-us";
import { FeaturedWork } from "./components/featured-work";
import { ProcessSection } from "./components/process-section";    
import { FooterSection } from "./components/footer-section";
import { FloatingNav } from "./components/floating-nav";
import { UIDecorations } from "./components/ui-decorations";

export default function App() {
  // 2. Create the ref to track the "Hero + Bento" area
  const progressTargetRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-foreground">
      <FloatingNav />
      <UIDecorations />

      {/* 3. Wrap Hero and Bento in the tracked div */}
      <div ref={progressTargetRef}>
        {/* 4. Pass the ref to HeroSection so it can use it in useScroll */}
        <HeroSection progressTarget={progressTargetRef} />
        <BentoGrid />
      </div>

      {/* 1. Services Section */}
      <div id="services" className="scroll-mt-20">
        <ServicesSection />
      </div>

      <TrustTicker />
      
      <WhyChooseUs />

      {/* 2. Work Section (Portfolio) */}
      <div id="portfolio" className="scroll-mt-20">
        <FeaturedWork />
      </div>

      {/* 3. Process Section (Pipeline) */}
      <div id="pipeline" className="scroll-mt-20">
        <ProcessSection />
      </div>

      {/* 4. Book Section (Contact) */}
      <div id="contact" className="scroll-mt-20">
        <FooterSection />
      </div>
    </div>
  );
}
