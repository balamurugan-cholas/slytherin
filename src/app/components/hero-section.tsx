import { motion, useScroll } from "motion/react";
import { RefObject } from "react"; // 1. Import RefObject

// 2. Accept progressTarget as a prop
// Change this line:
export function HeroSection({ progressTarget }: { progressTarget: RefObject<HTMLDivElement | null> }) {

  
  // 3. Connect useScroll to the target ref
  const { scrollYProgress } = useScroll({
    target: progressTarget,
    offset: ["start start", "end end"] // 0% at start of Hero, 100% at end of Bento
  });

  const videoPath = "/slytherin/videos/hero-background.mp4";

  return (
    // Note: containerRef removed from here as we use progressTarget from props
    <div className="relative h-screen w-full overflow-hidden">
      {/* 1. BACKGROUND VIDEO & OVERLAYS */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={videoPath} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0A0A0A] to-transparent" />

      {/* 2. HERO CONTENT */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="relative flex flex-col items-center px-4">
          
          {/* Slytherin Text Container */}
          <div className="relative z-20" style={{ pointerEvents: "none" }}>
            <motion.div
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                color: "#FFD60A",
                display: "inline-block",
                filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.6))" 
              }}
            >
              {"Slytherin".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* WE CRAFT Text */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
            className="relative z-10 text-center font-black uppercase tracking-[-0.02em] text-white"
            style={{ 
                fontSize: "clamp(3rem, 12vw, 10rem)", 
                lineHeight: 0.8,
                marginTop: "-0.3em" 
            }}
          >
            WE CRAFT
            <br />
            NARRATIVES.
          </motion.h1>
        </div>
      </div>

      {/* 3. UPDATED HORIZONTAL PROGRESS BAR */}
      <ScrollProgressBar scrollYProgress={scrollYProgress} />
    </div>
  );
}

function ScrollProgressBar({ scrollYProgress }: { scrollYProgress: any }) {
  return (
    <div 
      className="absolute bottom-0 left-0 right-0 h-5 z-50 overflow-hidden" 
      style={{
        background: "transparent",
      }}
    >
      <motion.div
        className="h-full w-full relative"
        style={{ 
          scaleX: scrollYProgress, 
          transformOrigin: "left", 
        }}
      >
        <div 
          className="h-full w-full"
          style={{
            background: "linear-gradient(to right, #FFD60A 70%, rgba(255, 214, 10, 0) 100%)",
            boxShadow: "0px 0px 25px rgba(255, 214, 10, 0.4)" 
          }}
        />
        <div className="absolute right-0 top-0 h-full w-[1px] bg-white/40" />
      </motion.div>
    </div>
  );
}
