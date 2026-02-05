import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Layers,
  ArrowUpRight,
  Loader2,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import api from '../../services/api';

export default function Services() {
  const [dbServices, setDbServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/scheduling/services');
        setDbServices(response.data);
      } catch (error) {
        console.error("Failed to fetch public services", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <PageTransition>
      <div className="pt-32 pb-20 px-6 sm:px-12 lg:px-24">
        {/* Hero Section */}
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Especialidades de Elite</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter leading-[0.9] mb-8">
              TRANSFORMAMOS <span className="text-primary italic">VISÃO</span> EM <br />
              SOLUÇÕES DE <span className="text-primary">ELEVADO IMPACTO.</span>
            </h1>
            <p className="text-white/40 text-lg max-w-2xl font-light">
              Desde sistemas críticos até experiências digitais de luxo. A nossa stack é de 2025, a nossa entrega é imediata.
            </p>
          </motion.div>
        </div>

        {/* Dynamic Services Grid */}
        {loading ? (
          <div className="py-20 text-center text-primary"><Loader2 className="animate-spin mx-auto w-12 h-12" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {dbServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-deep-charcoal border border-white/5 p-10 relative h-full flex flex-col justify-between group hover:border-primary/50 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 p-4 opacity-50">
                  <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">0{index + 1}</span>
                </div>

                <div>
                  <div className="w-14 h-14 bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                    <Layers className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors tracking-tight uppercase">
                    {service.name}
                  </h3>

                  <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/5 text-[9px] font-bold uppercase text-white/40 tracking-widest border border-white/5">{service.durationMinutes} MIN</span>
                    {service.isPaid ? (
                      <span className="px-3 py-1 bg-acid-green/5 text-[9px] font-bold uppercase text-acid-green tracking-widest border border-acid-green/20">Premium</span>
                    ) : (
                      <span className="px-3 py-1 bg-primary/5 text-[9px] font-bold uppercase text-primary tracking-widest border border-primary/20">Trial</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold tracking-tight text-sm">
                      {service.isPaid ? `AOA ${service.price.toLocaleString()}` : 'CONSULTA GRATUITA'}
                    </span>
                    <Link to="/agendar" className="w-10 h-10 bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-primary p-12 md:p-24 lg:flex items-center justify-between"
        >
          <div className="relative z-10 lg:max-w-xl">
            <h2 className="text-4xl md:text-6xl font-display font-black text-black leading-none mb-8 tracking-tighter">
              PRONTO PARA <br />
              <span className="italic opacity-60">DOMINAR O MERCADO?</span>
            </h2>
            <p className="text-black/60 font-bold uppercase tracking-widest text-xs mb-12">Agende hoje o seu projecto e comece a escalar imediatamente.</p>
            <Link to="/agendar" className="inline-flex items-center gap-4 bg-black text-primary px-10 py-5 font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all group">
              REZERVAR AGORA
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
            <Sparkles className="w-[400px] h-[400px]" />
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}