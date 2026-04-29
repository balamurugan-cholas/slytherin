import { motion } from "motion/react";

export function FloatingNav() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full border border-border bg-card/80 px-6 py-3 backdrop-blur-xl">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:text-primary"
        >
          Home
        </button>
        <div className="h-4 w-px bg-border" />
        <button
          onClick={() => scrollToSection("services")}
          className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:text-primary"
        >
          Services
        </button>
        <div className="h-4 w-px bg-border" />
        <button
          onClick={() => scrollToSection("contact")}
          className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:text-primary"
        >
          Book
        </button>
      </div>
    </motion.nav>
  );
}
