import { HeroSection } from "./components/hero-section";
import { BentoGrid } from "./components/bento-grid";
import { ServicesSection } from "./components/services-section";
import { TrustTicker } from "./components/trust-ticker";
import { FooterSection } from "./components/footer-section";
import { FloatingNav } from "./components/floating-nav";
import { UIDecorations } from "./components/ui-decorations";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-foreground">
      <FloatingNav />
      <UIDecorations />

      <HeroSection />
      <BentoGrid />
      <ServicesSection />
      <TrustTicker />
      <FooterSection />
    </div>
  );
}