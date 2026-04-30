import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const reasons = [
  {
    id: "01",
    title: "Cinematic Precision",
    description: "We craft visual rhythms that hold attention from the first frame to the last.",
    tag: "Visuals"
  },
  {
    id: "02",
    title: "Strategic Narrative",
    description: "Aligning your brand’s voice with high-retention storytelling techniques.",
    tag: "Strategy"
  },
  {
    id: "03",
    title: "Seamless Workflow",
    description: "Fast turnarounds and transparent communication. Zero friction.",
    tag: "Process"
  },
];

// --- COUNTER LOGIC ---
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const springValue = useSpring(0, { stiffness: 40, damping: 20 });
  const displayValue = useTransform(springValue, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, value, springValue]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{displayValue}</motion.span>{suffix}
    </span>
  );
}

export function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start center", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const arrowOpacity = useTransform(scrollYProgress, [0.85, 0.98], [0, 1]);

  return (
    <section ref={containerRef}  className="relative py-32 md:pt-64 md:pb-32 md:mt-32 bg-[#0A0A0A] text-white overflow-hidden">
      
      {/* --- LARGE BACKGROUND WATERMARK COUNTERS --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Left Side Large Stat */}
        <div className="absolute left-[-5%] top-[20%] opacity-[0.03] select-none">
          <h2 className="text-[15rem] md:text-[25rem] font-black leading-none text-white flex flex-col">
            <Counter value={150} suffix="+" />
            <span className="text-2xl md:text-4xl tracking-[0.5em] uppercase font-light">Projects</span>
          </h2>
        </div>

        {/* Right Side Large Stat */}
        <div className="absolute right-[-5%] bottom-[15%] opacity-[0.03] select-none text-right">
          <h2 className="text-[15rem] md:text-[25rem] font-black leading-none text-white flex flex-col items-end">
            <Counter value={50} suffix="M" />
            <span className="text-2xl md:text-4xl tracking-[0.5em] uppercase font-light">Views</span>
          </h2>
        </div>
      </div>

      {/* --- DESKTOP EDGE DECORATIONS --- */}
      <div className="hidden lg:block relative z-10">
        <div className="absolute left-10 top-1/2 -translate-y-1/2 [writing-mode:vertical-lr] rotate-180 opacity-20">
          <p className="font-mono text-[10px] tracking-[0.5em] text-white uppercase">FPS: 60 // RES: 4K // BIT: 10-BIT</p>
        </div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 [writing-mode:vertical-lr] opacity-20">
          <p className="font-mono text-[10px] tracking-[0.5em] text-white uppercase">Slytherin Studios // © 2024</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* HEADER */}
        <div className="mb-0 flex flex-col items-center w-full">
          <motion.span className="text-[#FFD60A] font-mono tracking-widest uppercase text-xs">/ Why Slytherin</motion.span>
          <h2 className="text-5xl md:text-8xl font-bold mt-4 tracking-tighter uppercase text-center">
            The Edge <br /> 
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>In Every Frame</span>
          </h2>
        </div>

        {/* LINE & CONTENT WRAPPER */}
        <div ref={lineRef} className="relative w-full flex flex-col items-center">
          
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 z-0">
            <motion.div 
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute inset-0 w-full bg-[#FFD60A] shadow-[0_0_15px_rgba(255,214,10,0.5)]" 
            />
            
            {/* ARROW (Unchanged Logic) */}
            <motion.div 
              style={{ opacity: arrowOpacity, x: isMobile ? "-50%" : "-48.2%" }}
              animate={{ y: [15, 25, 15] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 left-1/2 z-30 flex flex-col items-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org" className="drop-shadow-[0_0_10px_#FFD60A]">
                <path d="M7 11L12 16L17 11" stroke="#FFD60A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>

          <div className="h-32 w-full" />

          {/* ITEMS */}
          <div className="space-y-48 w-full relative z-20">
            {reasons.map((item) => (
              <div key={item.id} className="relative flex justify-center py-20 w-full">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-[#0A0A0A]/80 backdrop-blur-sm p-8 md:p-12 border border-white/5 relative z-20 max-w-xl w-full text-center shadow-2xl"
                >
                  <span className="text-[#FFD60A] font-mono text-xs mb-4 block tracking-[0.3em]">// SECTION_{item.id}</span>
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-white/40 text-base md:text-lg font-light leading-relaxed">{item.description}</p>
                  <div className="mt-8 flex justify-center">
                    <div className="px-4 py-1 border border-[#FFD60A]/20 rounded-full">
                      <span className="text-[10px] uppercase tracking-widest text-[#FFD60A]">{item.tag}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          <div className="h-48 w-full" />
        </div>
      </div>
    </section>
  );
}
