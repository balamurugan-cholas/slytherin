import { motion } from "motion/react";

const services = [
  { id: 1, name: "Commercial" },
  { id: 2, name: "Social Content" },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative bg-[#0A0A0A] px-4 pt-10 pb-24 md:pt-40 md:pb-60" // Reduced mobile top padding to pt-10
    >
      <div className="mx-auto w-full max-w-7xl">
        
        {/* 1. CENTERED SECTION TITLE */}
        <div className="mb-12 text-center font-mono text-[10px] uppercase tracking-[0.5em] text-white/20">
          / OUR EXPERTISE
        </div>

        {/* 2. CENTERED SERVICES LIST */}
        <div className="space-y-0 border-t border-white/5">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="group relative cursor-pointer border-b border-white/5 py-10 md:py-12 transition-all duration-500"
            >
              <div className="flex items-center justify-center overflow-hidden">
                <h3 
                  className="font-black uppercase tracking-tighter text-white/10 transition-all duration-700 group-hover:text-white group-hover:scale-[1.02]"
                  style={{
                    fontSize: "clamp(2.5rem, 10vw, 8rem)", 
                    lineHeight: "1"
                  }}
                >
                  {service.name}
                </h3>
              </div>
              
              {/* Red Dot Hover Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="h-1 w-1 rounded-full bg-red-600 shadow-[0_0_10px_#ef4444]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

