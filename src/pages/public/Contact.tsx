import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Loader2, Globe, ShieldCheck, ArrowRight } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import api from '../../services/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await api.post('/contact', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Falha na transmissão. Verifique a sua conexão.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#050505] text-white flex flex-col lg:flex-row">

        {/* LEFT COLUMN: Content & Form (Expanded Width) */}
        <div className="w-full lg:w-[65%] relative z-10 flex flex-col justify-center px-6 py-20 lg:px-24 overflow-y-auto">
          <div className="max-w-2xl mx-auto w-full space-y-12">

            {/* Header */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 border border-primary/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">Canal Oficial</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-[0.9]"
              >
                Inicie a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Operação</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/40 text-lg font-medium max-w-md leading-relaxed"
              >
                A nossa equipa de elite está pronta para arquitetar a sua próxima vantagem competitiva.
              </motion.p>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/[0.02] border border-white/5 p-8 backdrop-blur-sm relative group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors duration-500" />

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group/input relative">
                          <label className="absolute -top-3 left-0 text-[10px] font-black text-primary uppercase tracking-widest bg-[#050510] px-2 opacity-0 group-focus-within/input:opacity-100 transition-opacity">Nome de Código / Civil</label>
                          <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary focus:bg-white/10 transition-all text-sm font-bold uppercase tracking-wider"
                            placeholder="NOME OBRIGATÓRIO"
                          />
                        </div>
                        <div className="group/input relative">
                          <label className="absolute -top-3 left-0 text-[10px] font-black text-primary uppercase tracking-widest bg-[#050510] px-2 opacity-0 group-focus-within/input:opacity-100 transition-opacity">Frequência (Email)</label>
                          <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary focus:bg-white/10 transition-all text-sm font-bold uppercase tracking-wider"
                            placeholder="EMAIL OBRIGATÓRIO"
                          />
                        </div>
                      </div>

                      <div className="group/input relative">
                        <label className="absolute -top-3 left-0 text-[10px] font-black text-primary uppercase tracking-widest bg-[#050510] px-2 opacity-0 group-focus-within/input:opacity-100 transition-opacity">Linha Segura (Tel)</label>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary focus:bg-white/10 transition-all text-sm font-bold uppercase tracking-wider"
                          placeholder="TELEFONE (OPCIONAL)"
                        />
                      </div>

                      <div className="group/input relative">
                        <label className="absolute -top-3 left-0 text-[10px] font-black text-primary uppercase tracking-widest bg-[#050510] px-2 opacity-0 group-focus-within/input:opacity-100 transition-opacity">Dados da Missão</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary focus:bg-white/10 transition-all resize-none text-sm font-medium leading-relaxed"
                          placeholder="DIGITE A SUA MENSAGEM..."
                        />
                      </div>
                    </div>

                    {error && <p className="text-red-500 text-xs font-bold uppercase animate-pulse">{error}</p>}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-primary transition-colors flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          Transmitir Dados
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-16 text-center space-y-8 flex flex-col items-center"
                  >
                    <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center relative">
                      <div className="absolute inset-0 border border-green-500/40 rounded-full animate-ping" />
                      <ShieldCheck className="w-10 h-10 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Transmissão Segura</h3>
                      <p className="text-white/40 text-sm mt-2 max-w-xs mx-auto">Os seus dados foram encriptados e recebidos pela nossa central.</p>
                    </div>
                    <button onClick={() => setSubmitted(false)} className="px-6 py-2 border border-white/10 text-[10px] font-bold text-white hover:border-primary hover:text-primary uppercase tracking-widest transition-all">
                      Enviar Nova Mensagem
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Direct Contacts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-primary">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Email</span>
                </div>
                <p className="text-sm font-medium text-white/60 pl-11">info@monteiro-universal.com</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-primary">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Linha Direta</span>
                </div>
                <p className="text-sm font-medium text-white/60 pl-11">+244 922 000 000</p>
              </div>
              <div className="col-span-1 md:col-span-2 space-y-3">
                <div className="flex items-center gap-3 text-primary">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Base de Operações</span>
                </div>
                <p className="text-sm font-medium text-white/60 pl-11">Rua Marechal Brós Tito, Luanda, Angola</p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Video (Reduced Width) */}
        <div className="hidden lg:block w-[35%] relative h-auto min-h-screen sticky top-0 right-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10 pointer-events-none" />

          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            <source src="/videos/globo.mp4" type="video/mp4" />
          </video>

          {/* Minimal Overlay */}
          <div className="absolute bottom-12 left-12 z-20">
            <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-2">
              Monteiro <span className="text-primary block text-5xl">Universal</span>
            </h2>
            <div className="h-1 w-20 bg-primary mb-6" />
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest max-w-[200px]">
              Luanda • Global Reach • Elite Services
            </p>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}