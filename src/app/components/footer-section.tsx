import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Instagram, Twitter, Video, Phone, ArrowUpRight } from "lucide-react";

export function FooterSection() {
  const [currentTime, setCurrentTime] = useState("");
  const containerRef = useRef(null);
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setCurrentTime(`${now.toLocaleTimeString("en-GB", options)} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const socialIcons = [
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
    { icon: <Video size={20} />, href: "#", label: "Vimeo" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    { icon: <Phone size={20} />, href: "tel:+1234567890", label: "Call" },
  ];

  return (
    <section className="relative h-screen w-full bg-[#0A0A0A] text-white flex flex-col items-center justify-center overflow-hidden">
      
      {/* 1. BACKGROUND GRID & GLOW */}
      <div className="absolute inset-0 opacity-20" 
        style={{ backgroundImage: `radial-gradient(#ffffff10 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFD60A]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* 2. CORNER HUD ELEMENTS */}
      <div className="absolute top-12 left-8 md:left-16 flex flex-col gap-2">
        <p className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase leading-none">Local Time</p>
        <p className="font-mono text-xl font-light">{currentTime}</p>
      </div>

      <div className="absolute top-12 right-8 md:right-16 text-right flex flex-col gap-2">
        <p className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase leading-none">Studio Status</p>
        <div className="flex items-center gap-2 justify-end">
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-[#FFD60A]" 
          />
          <p className="font-mono text-xs uppercase tracking-widest text-[#FFD60A]">Accepting Briefs</p>
        </div>
      </div>

      {/* 3. MAIN CONTACT AREA */}
      <div className="relative z-10 flex flex-col items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12 overflow-hidden"
        >
          <h2 className="text-center font-black text-6xl md:text-9xl uppercase tracking-tighter leading-[0.8] mb-4">
            LET'S <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>BUILD</span> <br /> 
            SOMETHING <span style={{ fontFamily: "'Dancing Script', cursive" }} className="text-[#FFD60A] px-4 lowercase tracking-normal">
            ICNOIC
          </span>
          </h2>
        </motion.div>

        <motion.a
          href="mailto:hello@slytherin.com"
          whileHover={{ scale: 1.05 }}
          className="group relative flex items-center gap-4 bg-white text-black px-8 py-5 md:px-12 md:py-8 rounded-full overflow-hidden transition-all duration-500"
        >
          <span className="relative z-10 font-bold md:text-2xl uppercase tracking-tighter">hello@slytherin.com</span>
          <ArrowUpRight className="relative z-10 transition-transform duration-500 group-hover:rotate-45" size={28} />
          <div className="absolute inset-0 bg-[#FFD60A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
        </motion.a>
      </div>

      {/* 4. FLOATING SOCIAL DOCK */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3">
          {socialIcons.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              whileHover={{ y: -5, color: "#FFD60A" }}
              className="p-3 text-white/40 transition-colors"
              title={s.label}
            >
              {s.icon}
            </motion.a>
          ))}
          <div className="h-6 w-[1px] bg-white/10 mx-2" />
          <p className="font-mono text-[10px] tracking-widest text-white/30 hidden md:block">CONNECT WITH US</p>
        </div>
      </div>

      {/* 5. COPYRIGHT FOOTNOTE */}
      <div className="absolute bottom-6 w-full text-center px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase">Slytherin Agency © 2026</p>
        <div className="h-px flex-1 bg-white/5 mx-8 hidden md:block" />
        <p className="font-mono text-[9px] text-white/20 tracking-[0.4em] uppercase">Built for the bold</p>
      </div>
    </section>
  );
}
