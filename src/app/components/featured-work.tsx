import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const projects = [
  { id: 1, title: "Night Crawler", category: "Music Video", video: "./videos/reel-1.mp4" },
  { id: 2, title: "Urban Pulse", category: "Commercial", video: "./videos/reel-2.mp4" },
  { id: 3, title: "Silent Echo", category: "Short Film", video: "./videos/reel-3.mp4" },
  { id: 4, title: "Neon Dreams", category: "Aftermovie", video: "./videos/reel-4.mp4" },
  { id: 5, title: "Gold Rush", category: "Brand Film", video: "./videos/hero-background.mp4" },
];

const duplicatedProjects = [...projects, ...projects];

export function FeaturedWork() {
  const xTranslation = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const controlsRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startAnimation = () => {
    const totalWidth = projects.length * 332;

    controlsRef.current?.stop();

    controlsRef.current = animate(xTranslation, [xTranslation.get(), -totalWidth], {
      ease: "linear",
      duration: 30 * (1 - Math.abs(xTranslation.get() / totalWidth)),
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });
  };

  useEffect(() => {
    startAnimation();
    return () => controlsRef.current?.stop();
  }, []);

  return (
    <section
      className="relative py-32 overflow-hidden bg-[#0A0A0A]"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('./images/camera-rig.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.2) contrast(1.2)",
        }}
      />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center flex flex-col items-center">
          <p className="text-[#FFD60A] font-mono tracking-[0.3em] uppercase text-xs mb-4">
            / THE REELS
          </p>

          <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-tight">
            Featured <br className="md:hidden" />
            <span
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-[#FFD60A] px-4 lowercase tracking-normal"
            >
              Works.
            </span>
          </h2>
        </div>

        <div className="relative flex overflow-hidden py-10 cursor-grab active:cursor-grabbing">
          <motion.div
            ref={containerRef}
            className="flex gap-8 whitespace-nowrap pl-12 md:pl-0"
            style={{ x: xTranslation }}
            drag="x"
            dragConstraints={{ left: -(projects.length * 332), right: 0 }}
            onDragStart={() => {
              setIsDragging(true);
              controlsRef.current?.stop();
            }}
            onDragEnd={() => {
              setIsDragging(false);
              startAnimation();
            }}
            onMouseEnter={() => !isDragging && controlsRef.current?.pause()}
            onMouseLeave={() => !isDragging && controlsRef.current?.play()}
          >
            {duplicatedProjects.map((project, index) => (
              <VideoCard
                key={`${project.id}-${index}`}
                project={project}
                controlsRef={controlsRef}
                startAnimation={startAnimation}
              />
            ))}
          </motion.div>

          <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent z-20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

function VideoCard({
  project,
  controlsRef,
  startAnimation,
}: {
  project: any;
  controlsRef: any;
  startAnimation: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = async (play: boolean) => {
    if (!videoRef.current) return;

    if (play) {
      try {
        controlsRef.current?.pause();

        await videoRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      startAnimation();
    }
  };

  return (
    <div
      onMouseEnter={() => togglePlay(true)}
      onMouseLeave={() => togglePlay(false)}
      onClick={() => togglePlay(!isPlaying)}
      className="relative flex-shrink-0 w-[280px] md:w-[300px] aspect-[9/16] group/item cursor-pointer"
    >
      <div className="relative w-full h-full overflow-hidden bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-500 group-hover/item:border-[#FFD60A]/30">
        <video
          ref={videoRef}
          src={project.video}
          loop
          playsInline
          preload="auto"
          className={`w-full h-full object-cover transition-all duration-700 ease-out will-change-transform ${
            isPlaying
              ? "opacity-100 grayscale-0 scale-105"
              : "opacity-40 grayscale group-hover/item:opacity-100 group-hover/item:grayscale-0 group-hover/item:scale-105"
          }`}
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end transition-all duration-500 ${
            isPlaying ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-[#FFD60A] font-mono text-[10px] uppercase mb-2 tracking-[0.3em]">
            {project.category}
          </span>

          <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none whitespace-normal">
            {project.title}
          </h3>
        </div>

        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white/40 border-b-[5px] border-b-transparent ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}