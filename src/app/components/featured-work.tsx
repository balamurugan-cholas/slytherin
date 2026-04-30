import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const projects = [
  { id: 1, title: "Night Crawler", category: "Music Video", image: "https://unsplash.com" },
  { id: 2, title: "Urban Pulse", category: "Commercial", image: "https://unsplash.com" },
  { id: 3, title: "Silent Echo", category: "Short Film", image: "https://unsplash.com" },
  { id: 4, title: "Neon Dreams", category: "Aftermovie", image: "https://unsplash.com" },
  { id: 5, title: "Gold Rush", category: "Brand Film", image: "https://unsplash.com" },
];

const duplicatedProjects = [...projects, ...projects];

export function FeaturedWork() {
  const xTranslation = useMotionValue(0);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    // Start the infinite loop
    controlsRef.current = animate(xTranslation, [0, -1000], {
      ease: "linear",
      duration: 30,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return () => controlsRef.current?.stop();
  }, [xTranslation]);

  return (
    <section className="py-32 bg-[#0A0A0A] overflow-hidden">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center flex flex-col items-center">
        <p className="text-[#FFD60A] font-mono tracking-[0.3em] uppercase text-xs mb-4">/ The Reels</p>
        <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-tight">
          Featured <br className="md:hidden" />
          <span style={{ fontFamily: "'Dancing Script', cursive" }} className="text-[#FFD60A] px-4 lowercase tracking-normal">
            Works.
          </span>
        </h2>
      </div>

      {/* TICKER CONTAINER */}
      <div 
        className="relative flex overflow-hidden py-10"
        onMouseEnter={() => controlsRef.current?.pause()}
        onMouseLeave={() => controlsRef.current?.play()}
      >
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          style={{ x: xTranslation }}
        >
          {duplicatedProjects.map((project, index) => (
            <div 
              key={`${project.id}-${index}`} 
              className="relative flex-shrink-0 w-[320px] md:w-[500px] aspect-video group/item cursor-pointer"
            >
              <div className="relative w-full h-full overflow-hidden bg-white/5 border border-white/5">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-50 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end opacity-0 group-hover/item:opacity-100 transition-opacity duration-500">
                  <span className="text-[#FFD60A] font-mono text-[10px] uppercase mb-2 tracking-[0.2em]">{project.category}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Vignettes */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
