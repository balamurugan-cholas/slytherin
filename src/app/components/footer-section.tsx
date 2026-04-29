import { motion, useInView } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Instagram, Twitter, Video, Phone } from "lucide-react";

export function FooterSection() {
  const [currentTime, setCurrentTime] = useState("");
  const emailRef = useRef(null);
  const isEmailInView = useInView(emailRef, { once: true });
  const [isTypingDone, setIsTypingDone] = useState(false);
  
  const emailText = "HELLO@SLYTHERIN.COM";

  // UPDATED: Function to get India Standard Time (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      const istTime = now.toLocaleTimeString("en-GB", options);
      setCurrentTime(`${istTime} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // Updated to 1s for precision
    return () => clearInterval(interval);
  }, []);

  const sentence = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { delay: 0.5, staggerChildren: 0.05 } },
  };

  const letter = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const socialIcons = [
    { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
    { icon: <Video size={18} />, href: "#", label: "Vimeo" },
    { icon: <Twitter size={18} />, href: "#", label: "Twitter" },
    { icon: <Phone size={18} />, href: "tel:+1234567890", label: "Call", color: "text-red-500" },
  ];

  return (
    <section id="contact" className="relative h-screen w-full bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden px-4 md:px-16">
      
      {/* 1. THE BIG GHOST TEXT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h2 className="font-black uppercase tracking-tighter leading-none opacity-10"
          style={{
            fontSize: "clamp(5rem, 22vw, 25rem)", 
            WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.2)",
            color: "transparent", 
          }}
        >START</h2>
      </div>

      {/* 2. THE TOP STATUS */}
      <div className="absolute top-10 left-6 md:left-12 space-y-2">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
          <div className="relative flex h-2 w-2 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-green-500/40 blur-[4px]" />
            <motion.div className="relative h-full w-full rounded-full bg-green-500" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
          <span className="hidden xs:inline text-white/90 font-bold">STATUS: AVAILABLE FOR PROJECTS</span>
          <span className="xs:hidden text-green-500">AVAILABLE</span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
          LOCAL TIME: {currentTime}
        </div>
      </div>

      {/* 3. CENTERED CONTACT */}
      <div className="relative z-10 w-full flex flex-col items-center overflow-visible">
        <p className="font-mono text-[10px] md:text-xs text-white/40 uppercase tracking-[0.4em] mb-6">Ready to collaborate?</p>
        
        <motion.a
          ref={emailRef}
          href={`mailto:${emailText.toLowerCase()}`}
          variants={sentence}
          initial="hidden"
          animate={isEmailInView ? "visible" : "hidden"}
          onAnimationComplete={() => setIsTypingDone(true)}
          className={`block font-black uppercase tracking-tighter transition-all duration-500 whitespace-nowrap leading-none ${isTypingDone ? 'shimmer-text' : 'text-white'}`}
          style={{
            fontSize: "clamp(1.5rem, 7.2vw, 10rem)",
          }}
        >
          {emailText.split("").map((char, index) => (
            <motion.span key={index} variants={letter} className="inline-block">
              {char}
            </motion.span>
          ))}
        </motion.a>

        {/* MOBILE ICONS */}
        <div className="flex md:hidden gap-8 mt-12 text-white/40">
            {socialIcons.map((s, i) => (
              <a key={i} href={s.href} className={`hover:text-white transition-colors ${s.color || ''}`}>{s.icon}</a>
            ))}
        </div>
      </div>

      {/* 4. FOOTER BOTTOM */}
      <div className="absolute bottom-10 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40">
        <div className="hidden md:flex gap-8">
            {socialIcons.map((s, i) => (
              <a key={i} href={s.href} className={`hover:text-white transition-colors ${s.color || ''}`} title={s.label}>{s.icon}</a>
            ))}
        </div>
        
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">
          © 2026 SLYTHERIN — ALL RIGHTS RESERVED
        </div>
      </div>

      <style>{`
        .shimmer-text {
          background: linear-gradient(to right, #ffffff 20%, #ef4444 40%, #ef4444 60%, #ffffff 80%);
          background-size: 400% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: sweep 12s linear infinite; 
        }
        @keyframes sweep {
          0% { background-position: 100% center; }
          100% { background-position: -100% center; }
        }
      `}</style>
    </section>
  );
}
