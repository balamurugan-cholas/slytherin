import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const services = [
  { id: 1, name: "Commercial" },
  { id: 2, name: "Social Content" },
];

export function ServicesSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const gap = 30;

    class Particle {
      originX: number;
      originY: number;
      x: number;
      y: number;
      size: number;
      color: string;
      ease: number;

      constructor(x: number, y: number) {
        this.originX = x;
        this.originY = y;
        this.x = x;
        this.y = y;
        this.size = 1.2;
        this.color = "#440000"; // Dim red dots
        this.ease = 0.08;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        const dx = mouse.current.x - this.x;
        const dy = mouse.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = (100 - distance) / 100;

        if (distance < 100 && mouse.current.active) {
          this.x += dx * force * 0.1;
          this.y += dy * force * 0.1;
          this.color = hoveredId ? "#ffffff" : "#ff0000"; // White when hovering text, red near mouse
        } else {
          this.x += (this.originX - this.x) * this.ease;
          this.y += (this.originY - this.y) * this.ease;
          this.color = "#440000";
        }
      }
    }

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = [];
      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          particles.push(new Particle(x, y));
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", init);
    };
  }, [hoveredId]);

  return (
    <section
      id="services"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
      }}
      onMouseLeave={() => (mouse.current.active = false)}
      className="relative bg-[#0A0A0A] px-4 pt-10 pb-24 md:pt-40 md:pb-60 overflow-hidden"
    >
      {/* CANVAS BACKGROUND LAYER */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full pointer-events-none"
      />

      <div className="mx-auto w-full max-w-7xl relative z-10">
        <div className="mb-12 text-center font-mono text-[10px] uppercase tracking-[0.5em] text-white/20">
          / INTERACTIVE CORE
        </div>

        <div className="space-y-0 border-t border-white/5">
          {services.map((service) => (
            <motion.div
              key={service.id}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative cursor-pointer border-b border-white/5 py-10 md:py-12 transition-all duration-500"
            >
              <div className="flex items-center justify-center overflow-hidden">
                <motion.h3 
                  animate={hoveredId === service.id ? { x: [0, -2, 2, -1, 1, 0] } : {}}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  className="font-black uppercase tracking-tighter text-white/10 transition-all duration-700 group-hover:text-white"
                  style={{ fontSize: "clamp(2.5rem, 10vw, 8rem)", lineHeight: "1" }}
                >
                  {service.name}
                </motion.h3>
              </div>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="h-1 w-1 rounded-full bg-white shadow-[0_0_15px_#ffffff]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
