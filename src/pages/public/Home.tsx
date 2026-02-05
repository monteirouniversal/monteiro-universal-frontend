import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight
} from 'lucide-react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div ref={containerRef} className="relative bg-[#050505] overflow-hidden selection:bg-[#D4AF37]/30">

        {/* 🌌 GLOBAL ATMOSPHERE & BLUE NEBULAS (LIFE) */}
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[40%] -left-[10%] w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen"
          />
          <motion.div
            animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 right-[0%] w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen"
          />
        </div>

        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/5 via-[#000] to-[#000] pointer-events-none" />
        <div className="fixed inset-0 bg-[url('/grain.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

        {/* 🚀 HERO SECTION */}
        <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">

          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60 scale-105"
              style={{ filter: 'brightness(0.6) contrast(1.2)' }}
            >
              <source src="/video/De_efeito_a_1080p_202601301805.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
          </div>

          {/* Content */}
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="relative z-10 text-center space-y-8 max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h2 className="text-[#D4AF37] font-bold tracking-[0.4em] text-sm md:text-base uppercase mb-4 animate-pulse">
                Authorized Personnel Only
              </h2>
              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-widest leading-none drop-shadow-2xl">
                MONTEIRO
                <span className="block text-4xl md:text-6xl font-sans font-light tracking-[0.2em] mt-2 text-white/80">UNIVERSAL</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6 pt-12"
            >
              <Link to="/contacto" className="relative overflow-hidden px-10 py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest group transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)]">
                <span className="relative z-10 group-hover:text-white transition-colors">Initialize Protocol</span>
                <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
              <Link to="/servicos" className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-all duration-300 backdrop-blur-sm hover:border-blue-500/50">
                Explore Systems
              </Link>
            </motion.div>
          </motion.div>

          {/* THE GOLDEN HORIZON LINE (Divisor) */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_rgba(212,175,55,0.8)] opacity-80" />
        </section>


        {/* 🏆 SERVICES "GOLDEN GLASS" CARDS + BLUE ENERGY */}
        <section className="relative py-40 px-6">
          <div className="max-w-7xl mx-auto space-y-24">

            <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#fdcb6e] via-[#D4AF37] to-[#8a6e1c] drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]">
                Services Overview
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                <div className="w-2 h-2 rotate-45 bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              </div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {[
                {
                  icon: "/icons/payments_icon.png",
                  title: "Payments",
                  desc: "Streamlined transaction solutions."
                },
                {
                  icon: "/icons/automation_icon.png",
                  title: "Automation",
                  desc: "Advanced workflow automation."
                },
                {
                  icon: "/icons/ecommerce_icon.png",
                  title: "E-Commerce",
                  desc: "Powerful online retail platforms."
                },
                {
                  icon: "/icons/fraud_prevention_icon.png",
                  title: "Fraud Prevention",
                  desc: "Comprehensive risk protection."
                },
                {
                  icon: "/icons/global_expansion_icon.png",
                  title: "Global Expansion",
                  desc: "Solutions for international growth."
                },
                {
                  icon: "/icons/financial_insights_icon.png",
                  title: "Financial Insights",
                  desc: "Data-driven business analytics."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 60 } }
                  }}
                  className="group relative h-96 bg-black/60 backdrop-blur-sm border border-[#D4AF37]/40 rounded-xl overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                >
                  {/* 🌟 GOLDEN FRAME EFFECT */}
                  <div className="absolute inset-0 rounded-xl border-2 border-[#D4AF37]/50 opacity-80 group-hover:border-[#D4AF37] group-hover:shadow-[inset_0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500" />

                  {/* Corner Accents (Golden Corners) */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37] rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37] rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 space-y-6 z-10">

                    {/* ICON WITH GLOW */}
                    <div className="relative group-hover:-translate-y-2 transition-transform duration-500">
                      <div className="absolute inset-0 bg-[#D4AF37] blur-[40px] opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="w-32 h-32 object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
                      />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#fff] to-[#D4AF37] group-hover:to-[#fff] transition-all duration-500">
                        {item.title}
                      </h3>
                      <p className="text-[#D4AF37]/60 font-medium text-sm tracking-wide group-hover:text-white/80 transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Shine Animation on Hover */}
                  <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-out pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>


        {/* 📊 WHY CHOOSE US (GOLDEN WAVES VIDEO BG) */}
        <section className="relative py-40 overflow-hidden">

          {/* Helper Gradient Top Transition */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent z-20 pointer-events-none" />

          {/* Video Background Specific to this Section */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-80"
              style={{ filter: 'brightness(0.8) contrast(1.2)' }}
            >
              <source src="/video/esper.mp4" type="video/mp4" />
            </video>
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-20">

            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                Why Choose Monteiro Universal
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-12 bg-[#D4AF37]" />
                <span className="text-[#D4AF37] font-black tracking-[0.3em] uppercase text-sm">Excellence You Can Trust</span>
                <div className="h-[1px] w-12 bg-[#D4AF37]" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-[#D4AF37]/20 pt-12 relative">
              {/* Glossy Reflection Effect on Separators */}
              <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-[#D4AF37]/30 to-transparent hidden md:block" />
              <div className="absolute top-0 left-2/4 w-[1px] h-full bg-gradient-to-b from-[#D4AF37]/30 to-transparent hidden md:block" />
              <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-[#D4AF37]/30 to-transparent hidden md:block" />

              {[
                { value: "99.9%", label: "Uptime" },
                { value: "4+", label: "Years of Experience" },
                { value: "100%", label: "Local Angolan Focus" },
                { value: "24/7", label: "Technical Support" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="space-y-2 group"
                >
                  {/* Glowing Golden Number */}
                  <h3 className="text-6xl md:text-7xl font-serif text-[#D4AF37] drop-shadow-[0_0_25px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-transform duration-500">
                    {stat.value}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-white text-lg font-light tracking-wide max-w-[150px] mx-auto leading-tight">
                    {stat.label === "Years of Experience" ? (
                      <>
                        Years <span className="text-white/60 text-sm block">of</span> Experience
                      </>
                    ) : stat.label}
                  </p>

                  {/* Simulated Water Reflection */}
                  <div className="opacity-0 group-hover:opacity-30 transition-opacity duration-700 transform scale-y-[-0.5] origin-top blur-sm text-[#D4AF37] text-6xl font-serif mt-4 pointer-events-none select-none">
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Helper Gradient Bottom Transition */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
        </section>

        {/* 🚀 ELITE FINAL CTA - CINEMATIC VERSION */}
        <section className="relative py-60 flex flex-col items-center justify-center text-center px-6 overflow-hidden">

          {/* Video Background Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-90"
              style={{ filter: 'brightness(0.7) contrast(1.1)' }}
            >
              <source src="/video/01.mp4" type="video/mp4" />
            </video>
            {/* Elite Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Massive Background Text - "JOIN ELITE" */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.03, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white whitespace-nowrap pointer-events-none select-none tracking-tighter"
          >
            JOIN ELITE
          </motion.h2>

          {/* Content Container */}
          <div className="relative z-10 space-y-12 max-w-4xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-5xl md:text-8xl font-serif text-white leading-tight tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Pronto para <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                  Liderar o Mercado?
                </span>
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-12 bg-[#D4AF37]" />
                <p className="text-[#D4AF37] font-black tracking-[0.3em] uppercase text-xs md:text-sm">
                  Transforme seu negócio em Angola
                </p>
                <div className="h-[1px] w-12 bg-[#D4AF37]" />
              </div>
              <p className="text-white/60 text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
                Transforme o seu negócio com a tecnologia de elite da Monteiro Universal em Angola.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link
                to="/agendar"
                className="group relative inline-flex items-center justify-center px-12 py-6 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-black uppercase tracking-[0.3em] text-sm overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]"
              >
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-[#D4AF37] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />

                <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                  AGENDAR CONSULTORIA AGORA
                </span>
                <ArrowRight className="relative z-10 w-5 h-5 ml-4 group-hover:text-black group-hover:translate-x-2 transition-all duration-500" />
              </Link>
            </motion.div>
          </div>

          {/* The Golden Horizon Line */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_rgba(212,175,55,0.8)] opacity-50" />
        </section>

      </div>
    </motion.div>
  );
}
