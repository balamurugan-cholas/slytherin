import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    id: "01",
    title: "The Blueprint",
    subtitle: "Strategy & Onboarding",
    description: "We define the narrative arc and emotional hooks through a deep-dive creative call.",
    color: "#FFD60A"
  },
  {
    id: "02",
    title: "The Edit",
    subtitle: "Precision Assembly",
    description: "Our editors craft the visual rhythm, layering 10-bit color and custom sound design.",
    color: "#FFFFFF"
  },
  {
    id: "03",
    title: "The Master",
    subtitle: "Final Delivery",
    description: "We polish and render the final masterpiece, optimized for maximum retention.",
    color: "#FFD60A"
  }
];

export function ProcessSection() {
  return (
    <section className="bg-[#0A0A0A] py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-24 text-center">
          <p className="text-[#FFD60A] font-mono tracking-[0.3em] uppercase text-xs mb-4">/ Workflow</p>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white">
            The <span className="italic font-light opacity-20 text-white">Process.</span>
          </h2>
        </div>

        {/* Stacked Cards */}
        <div className="flex flex-col gap-10">
          {steps.map((step, index) => (
            <ProcessCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step, index }: { step: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // This creates the "Card Stacking" effect
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="sticky top-32 w-full"
      style={{
        zIndex: index + 1,
      }}
    >
      <div className="bg-[#111111] border border-white/5 p-8 md:p-16 shadow-2xl relative overflow-hidden group">
        {/* Subtle Background Number */}
        <span className="absolute -right-4 -bottom-10 text-[12rem] font-black text-white/[0.02] select-none group-hover:text-[#FFD60A]/[0.03] transition-colors duration-700">
          {step.id}
        </span>

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          {/* Number & Title */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[#FFD60A] font-mono text-sm tracking-widest uppercase">Step_{step.id}</span>
              <div className="h-[1px] w-12 bg-[#FFD60A]/30" />
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-white uppercase mb-4 tracking-tighter">
              {step.title}
            </h3>
            <p className="text-white/40 font-light text-lg md:text-xl leading-relaxed max-w-md">
              {step.description}
            </p>
          </div>

          {/* Subtitle / Label */}
          <div className="hidden md:block">
            <div 
              className="px-6 py-3 border border-white/10 rounded-full"
              style={{ borderColor: index % 2 === 0 ? "#FFD60A44" : "rgba(255,255,255,0.1)" }}
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
                {step.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
