import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
// @ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const portfolioItems = [
  {
    id: 1,
    client: "Nike",
    views: "1.2M",
    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
    aspectRatio: "16/9",
  },
  {
    id: 2,
    client: "Red Bull",
    views: "2.8M",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80",
    aspectRatio: "3/4",
  },
  {
    id: 3,
    client: "Sony",
    views: "890K",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80",
    aspectRatio: "1/1",
  },
  {
    id: 4,
    client: "Apple",
    views: "3.5M",
    thumbnail: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&q=80",
    aspectRatio: "3/4",
  },
  {
    id: 5,
    client: "Netflix",
    views: "4.1M",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=80",
    aspectRatio: "16/9",
  },
  {
    id: 6,
    client: "Adidas",
    views: "1.6M",
    thumbnail: "https://images.unsplash.com/photo-1465310477141-6fb93167a273?w=1200&q=80",
    aspectRatio: "1/1",
  },
];

export function BentoGrid() {
  return (
    <section className="relative h-auto bg-[#0A0A0A] px-2 pt-10 md:pt-40 pb-24 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        
        {/* CENTERED HEADING SECTION */}
        <div className="mb-16 md:mb-32 flex flex-col items-center text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30"
          >
            The Vault
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl font-black uppercase tracking-tighter text-white md:text-7xl lg:text-8xl"
          >
            Showcase
          </motion.h2>
        </div>

        <ResponsiveMasonry
          columnsCountBreakPoints={{
            300: 2,
            750: 2, 
            900: 3  
          }}
        >
          <Masonry gutter="12px">
            {portfolioItems.map((item, index) => (
              <GlitchCard key={item.id} item={item} index={index} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </section>
  );
}

function GlitchCard({ item, index }: { item: typeof portfolioItems[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [isGlitching, setIsGlitching] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (!isInView) return;

    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => {
        clearInterval(glitchInterval);
        window.removeEventListener('resize', checkMobile);
    }
  }, [isInView]);

  const getMobileHeight = () => {
    if (index % 3 === 0) return "240px";
    if (index % 2 === 0) return "320px";
    return "200px";
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative overflow-hidden bg-[#111]"
      style={{ 
        aspectRatio: isMobile ? "auto" : item.aspectRatio,
        height: isMobile ? getMobileHeight() : "auto"
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
    >
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 pointer-events-none">
         <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600" />
         <span className="text-[8px] font-mono text-white/50 uppercase tracking-widest">REC</span>
      </div>

      <div className="relative h-full w-full">
        <img
          src={item.thumbnail}
          alt={item.client}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {isGlitching && (
          <>
            <motion.div
              className="absolute inset-0 z-10"
              style={{
                background: `url(${item.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                mixBlendMode: "screen",
              }}
              animate={{
                x: [0, -5, 5, -3, 0],
                opacity: [0, 0.7, 0.5, 0.8, 0],
              }}
              transition={{ duration: 0.15 }}
            />
            <div className="absolute inset-0 z-10 opacity-10" style={{
              background: `repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 2px)`
            }} />
          </>
        )}
      </div>

      <div className="absolute inset-0 border border-white/5 transition-colors duration-300 group-hover:border-white/20" />
      
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent md:hidden">
        <p className="text-[9px] font-bold text-white/80 uppercase tracking-tighter">{item.client}</p>
      </div>
    </motion.div>
  );
}
