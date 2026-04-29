import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";

export function UIDecorations() {
  const { scrollYProgress } = useScroll();
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const totalFrames = Math.floor(latest * 10000);
      const hours = Math.floor(totalFrames / 108000);
      const minutes = Math.floor((totalFrames % 108000) / 1800);
      const seconds = Math.floor((totalFrames % 1800) / 30);
      const frames = totalFrames % 30;

      setTimecode(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(frames).padStart(2, "0")}`
      );
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      <div className="pointer-events-none fixed left-8 top-8 z-40 font-mono text-xs text-primary">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          REC
        </div>
      </div>

      <motion.div
        className="pointer-events-none fixed right-8 top-1/2 z-40 -translate-y-1/2 font-mono text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {timecode}
      </motion.div>
    </>
  );
}
