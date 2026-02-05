import { motion } from 'framer-motion';
import AppointmentScheduler from '../../components/AppointmentScheduler';
import { ShieldCheck, Zap, Lock, Globe, Sparkles } from 'lucide-react';

export default function SchedulePage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden pb-40 selection:bg-[#D4AF37]/30">

      {/* 🌌 GLOBAL ATMOSPHERE & BLUE NEBULAS (MATCHING HOME) */}
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

      {/* Hero Section - Elite Status */}
      <section className="relative pt-40 pb-20 px-6 z-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-10">

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-16 h-16 bg-white/5 border border-white/10 rounded-[1.25rem] shadow-[0_0_30px_rgba(212,175,55,0.1)] flex items-center justify-center backdrop-blur-md"
          >
            <Sparkles className="w-8 h-8 text-[#D4AF37]" />
          </motion.div>

          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              Sincronize a sua <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37]">Visão de Negócio.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 font-medium leading-relaxed italic">
              "A infraestrutura de elite para quem domina o mercado. Agende o seu slot e acelere a sua transformação digital."
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="h-[1px] w-20 bg-white/10" />
            <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.5em]">Protocolo Monteiro Universal</span>
            <div className="h-[1px] w-20 bg-white/10" />
          </div>
        </div>
      </section>

      {/* Scheduler Integration - The main centerpiece */}
      <section className="relative px-6 z-20">
        <div className="max-w-7xl mx-auto">
          <AppointmentScheduler />
        </div>
      </section>

      {/* Security & Badges Section - Refined */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: Lock, label: 'Encriptação SSL 256', sub: 'Protocolo Bancário' },
            { icon: Globe, label: 'Sincronização Global', sub: 'Fuso Luanda (GMT+1)' },
            { icon: ShieldCheck, label: 'Especialistas Verificados', sub: 'Certificação Elite' },
            { icon: Zap, label: 'Confirmação via Cloud', sub: 'Baixa Latência' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-6 p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#D4AF37]/30 transition-all duration-700 group backdrop-blur-sm">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500">
                <item.icon className="w-6 h-6 text-white/40 group-hover:text-black transition-colors" />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">{item.label}</p>
                <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest group-hover:text-[#D4AF37] transition-colors">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}