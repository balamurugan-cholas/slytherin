import { motion } from "motion/react";

const actions = [
  "Cut the Noise", "Define the Frame", "Color the Narrative", 
  "Master the Motion", "Edit to the Beat", "Sync the Soul", 
  "Beyond the Timeline", "Visual Precision", "Raw Emotion"
];

export function TrustTicker() {
  return (
    <section 
      className="relative overflow-hidden border-y border-black/30 py-6 md:py-8"
      style={{ backgroundColor: "#B11313" }} 
    >
      {/* 1. NEW GEOMETRIC WEB LAYER - Uses sharp CSS gradients for 100% reliability */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(45deg, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 40px 40px, 80px 80px, 80px 80px',
          backgroundPosition: 'center center'
        }}
      />

      {/* 2. THE RADIAL "SPIDER-NEST" OVERLAY */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-30" 
        style={{
          background: "repeating-radial-gradient(circle at center, transparent 0, transparent 40px, rgba(255,255,255,0.1) 41px, rgba(255,255,255,0.1) 42px)"
        }}
      />

      {/* 3. VIGNETTE FOR DEPTH */}
      <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.5)_100%)] pointer-events-none" />

      {/* 4. TICKER CONTENT */}
      <div className="relative z-30 flex">
        <motion.div
          className="flex shrink-0 gap-12 md:gap-16"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...actions, ...actions].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-12 md:gap-16 font-mono text-sm md:text-base uppercase tracking-[0.3em] text-white"
            >
              <span className="whitespace-nowrap font-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                {item}
              </span>
              <span className="text-black font-black text-2xl">/</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Side Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#B11313] to-transparent z-40 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#B11313] to-transparent z-40 pointer-events-none" />
    </section>
  );
}
