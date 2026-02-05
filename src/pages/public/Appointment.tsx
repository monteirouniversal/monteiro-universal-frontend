import { motion } from 'framer-motion';
import AppointmentScheduler from '../../components/AppointmentScheduler';
import { ShieldAlert, Info, Clock, CheckCircle } from 'lucide-react';

export default function AppointmentPage() {
  return (
    <div className="relative min-h-screen bg-background py-40 px-6 overflow-hidden">
      {/* Visual Ambience */}
      <div className="fixed inset-0 bg-mesh opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-grain opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="badge-elite border-primary/30 text-primary mx-auto"
          >
            Protocolo de Agendamento
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tighter"
          >
            RESERVE A SUA <br />
            <span className="text-gradient">AUTORIDADE.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-white/40 font-medium text-lg leading-relaxed"
          >
            Utilize o nosso sistema sincronizado para garantir um slot exclusivo com a nossa equipa de engenharia e consultoria.
          </motion.p>
        </div>

        <div className="relative">
          <AppointmentScheduler />
        </div>

        {/* Security & Info Footer */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 border-t border-white/5">
          {[
            { title: 'Tempo Médio', value: '60 Minutos', icon: Clock },
            { title: 'Plataforma', value: 'Google Meet Elite', icon: ShieldAlert },
            { title: 'Confirmação', value: 'Instantânea via Email', icon: CheckCircle }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-3">
              <item.icon className="w-6 h-6 text-primary/40" />
              <div className="flex flex-col">
                <span className="text-white font-bold tracking-tight">{item.title}</span>
                <span className="text-xs text-white/30 font-bold uppercase tracking-widest mt-1">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}