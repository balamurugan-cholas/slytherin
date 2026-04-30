import { motion } from "framer-motion";
import { useState } from "react";

export function FloatingNav() {
  const [activeTab, setActiveTab] = useState("Home");

  const navItems = [
    { name: "Home", id: "top" },
    { name: "Services", id: "services" },
    { name: "Work", id: "portfolio" }, 
    { name: "Process", id: "pipeline" }, 
    { name: "Book", id: "contact" },
  ];

  const scrollToSection = (id: string) => {
    setActiveTab(navItems.find(item => item.id === id)?.name || "Home");
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      className="fixed bottom-0 left-1/2 z-[100]"
    >
      <div className="relative flex items-center justify-center rounded-t-xl border-t border-x border-white/10 bg-black/80 px-4 py-3 backdrop-blur-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        
        {/* THE ACTIVE SLIDER BACKGROUND */}
        <motion.div
          layoutId="nav-glow"
          className="absolute inset-0 z-0 rounded-t-xl bg-white/[0.02]"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />

        {/* NAV LINKS */}
        <div className="flex items-center gap-1 relative z-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              // Balanced px and py for equal visual weight around the text
              className={`relative px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                activeTab === item.name ? "text-[#FFD60A]" : "text-white/40 hover:text-white"
              }`}
            >
              <span className="relative z-20">{item.name}</span>
              
              {activeTab === item.name && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-[#FFD60A]/10 rounded-md -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
