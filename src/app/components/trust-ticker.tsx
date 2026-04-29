import { motion } from "motion/react";

const actions = [
  "Cut the Noise", "Define the Frame", "Color the Narrative", 
  "Master the Motion", "Edit to the Beat", "Sync the Soul", 
  "Beyond the Timeline", "Visual Precision", "Raw Emotion"
];

export function TrustTicker() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#0A0A0A] py-6 md:py-8">
      <div className="flex">
        <motion.div
          className="flex shrink-0 gap-12 md:gap-16"
          animate={{
            // Moves the entire width of the original list to ensure a perfect loop
            x: [0, "-50%"], 
          }}
          transition={{
            duration: 30, // Increase this number to make it move slower
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* We repeat the array twice for a seamless infinite scroll */}
          {[...actions, ...actions].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-12 md:gap-16 font-mono text-sm md:text-base uppercase tracking-[0.3em] text-white/30 transition-colors hover:text-white"
            >
              <span className="whitespace-nowrap">{item}</span>
              {/* The "Small UI" Red Separator */}
              <span className="text-red-600 font-black text-xl">/</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
