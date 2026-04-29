import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Scissors } from "lucide-react";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isOverVideo, setIsOverVideo] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isVideo = target.tagName === "VIDEO" || target.closest("[data-video-card]");
      setIsOverVideo(!!isVideo);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] flex items-center justify-center"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isOverVideo ? 1.5 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      >
        {isOverVideo ? (
          <Scissors className="h-8 w-8 text-primary" strokeWidth={1.5} />
        ) : (
          <div className="h-4 w-4 rounded-full border border-primary bg-primary/20" />
        )}
      </motion.div>

      <motion.div
        className="pointer-events-none fixed z-[9998]"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 400 }}
      >
        <div className="h-1 w-1 rounded-full bg-primary" />
      </motion.div>
    </>
  );
}
