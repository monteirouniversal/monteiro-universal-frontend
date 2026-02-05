import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import {
  Clock,
  ArrowLeft,
  Loader2,
  Layers,
  CheckCircle2,
  Calendar as CalendarIcon,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css';
import api from '../services/api';

/**
 * Premium Appointment Scheduler - Dark Elite Theme (Black/Gold/Blue)
 */
export default function AppointmentScheduler() {
  const [step, setStep] = useState<'service' | 'date' | 'time' | 'form' | 'verify' | 'success'>('service');
  const [services, setServices] = useState<any[]>([
    {
      id: 'mock-1',
      name: 'Consultoria Estratégica Elite',
      description: 'Análise de viabilidade e infraestrutura para sistemas críticos.',
      durationMinutes: 60,
      price: 150000,
      isPaid: true
    },
    {
      id: 'mock-2',
      name: 'Arquitectura de Software',
      description: 'Desenho de micro-serviços e definição de stack tecnológica.',
      durationMinutes: 90,
      price: 250000,
      isPaid: true
    },
    {
      id: 'mock-3',
      name: 'Reunião de Diagnóstico',
      description: 'Sessão inicial para levantamento de requisitos de projecto.',
      durationMinutes: 30,
      price: 0,
      isPaid: false
    }
  ]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [appointmentResult, setAppointmentResult] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/scheduling/services');
      if (response.data && response.data.length > 0) {
        setServices(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch services, using fallbacks", error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setStep('date');
  };

  const handleDateSelect = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setStep('time');
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('form');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Request verification code first
      await api.post('/scheduling/verify-email', { email: formData.email });
      setStep('verify');
    } catch (error: any) {
      alert(error.response?.data?.error || "Erro ao enviar código de verificação.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);

    try {
      // 1. Verify code
      await api.post('/scheduling/verify-code', {
        email: formData.email,
        code: verificationCode
      });

      // 2. If valid, create actual meeting request
      const payload = {
        serviceId: selectedService.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: selectedDate,
        time: selectedTime,
        notes: formData.notes
      };

      const response = await api.post('/scheduling/request', payload);
      setAppointmentResult(response.data);
      setStep('success');
    } catch (error: any) {
      alert(error.response?.data?.error || "Código inválido ou erro no processamento.");
    } finally {
      setVerifying(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-AO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (selectedDate && step === 'time') {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate, step]);

  const fetchAvailableSlots = async (date: Date) => {
    setLoadingSlots(true);
    setAvailableSlots([]); // Clear previous
    try {
      // Format date as YYYY-MM-DD for the API
      // Use local time to avoid timezone shifts
      const offset = date.getTimezoneOffset();
      const localDate = new Date(date.getTime() - (offset * 60 * 1000));
      const dateStr = localDate.toISOString().split('T')[0];

      const response = await api.get(`/scheduling/slots?date=${dateStr}`);
      setAvailableSlots(response.data);
    } catch (error) {
      console.error("Failed to fetch slots", error);
    } finally {
      setLoadingSlots(false);
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-2xl min-h-[700px] flex flex-col rounded-3xl shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden">

      {/* 🌟 PREMIUM HEADER */}
      <div className="px-10 py-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.02]">
        <div className="flex items-center gap-6">
          {step !== 'service' && step !== 'success' && (
            <button
              onClick={() => {
                if (step === 'date') setStep('service');
                if (step === 'time') setStep('date');
                if (step === 'form') setStep('time');
              }}
              className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl shadow-sm hover:border-[#D4AF37] hover:bg-white/10 transition-all active:scale-95 group"
            >
              <ArrowLeft className="w-5 h-5 text-white/60 group-hover:text-white" />
            </button>
          )}
          <div className="space-y-1">
            <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em] block">
              Etapa {['service', 'date', 'time', 'form', 'success'].indexOf(step) + 1} de 4
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {step === 'service' && 'Selecione o Serviço'}
              {step === 'date' && 'Escolha a Data'}
              {step === 'time' && 'Horário Disponível'}
              {step === 'form' && 'Finalizar Protocolo'}
              {step === 'success' && 'Processo Concluído'}
            </h3>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          {['service', 'date', 'time', 'form', 'verify'].map((s, i) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-1000 ${['service', 'date', 'time', 'form', 'verify', 'success'].indexOf(step) >= i
                ? 'w-10 bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.6)]'
                : 'w-4 bg-white/10'
                }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 p-10 md:p-14 overflow-y-auto max-h-[800px] scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
        <AnimatePresence mode="wait">
          {step === 'service' && (
            <motion.div key="service" variants={fadeInUp} initial="hidden" animate="visible" exit={{ opacity: 0, x: -20 }} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                  <div className="col-span-full py-20 text-center space-y-4">
                    <Loader2 className="animate-spin mx-auto text-[#D4AF37] w-10 h-10" />
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Carregando Infraestrutura...</p>
                  </div>
                ) : services.map(service => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="p-10 text-left border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#D4AF37]/50 hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.15)] transition-all rounded-[2rem] group relative flex flex-col items-start min-h-[300px]"
                  >
                    <div className="w-14 h-14 bg-white/5 text-white/40 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 shadow-lg">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <h4 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">{service.name}</h4>
                      <p className="text-sm text-white/50 leading-relaxed line-clamp-3">{service.description}</p>
                    </div>

                    <div className="w-full pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-white/40" />
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{service.durationMinutes} MIN</span>
                      </div>
                      <div className="text-base font-black text-white">
                        {service.isPaid ? `AOA ${service.price.toLocaleString()}` : <span className="text-emerald-400">FREE</span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'date' && (
            <motion.div key="date" variants={fadeInUp} initial="hidden" animate="visible" exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                <div className="w-16 h-1 w inline-flex items-center justify-center bg-white/5 text-[#D4AF37] rounded-2xl border border-white/10">
                  <CalendarIcon className="w-8 h-8" />
                </div>
                <div className="space-y-6">
                  <h4 className="text-4xl font-bold text-white tracking-tight leading-tight">Escolha o melhor momento.</h4>
                  <p className="text-lg text-white/50 leading-relaxed">Nossa agenda executiva está sincronizada em tempo real. Selecione um dia para visualizar os horários disponíveis.</p>
                </div>
                <div className="p-6 bg-[#D4AF37]/10 rounded-3xl border border-[#D4AF37]/20 flex items-center gap-6 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-[#D4AF37] text-black rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-tight">
                    Prioridade máxima para solicitações corporativas verificadas.
                  </p>
                </div>
              </div>
              <div className="p-8 bg-black/60 rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.2)]">
                <Calendar
                  onChange={handleDateSelect}
                  value={selectedDate}
                  className="modern-calendar-dark"
                  tileDisabled={({ date }) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || date.getDay() === 0 || date.getDay() === 6;
                  }}
                />
              </div>
            </motion.div>
          )}

          {step === 'time' && (
            <motion.div key="time" variants={fadeInUp} initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.98 }} className="space-y-12">
              <div className="text-center space-y-4">
                <h4 className="text-3xl font-bold text-white">Configuração de Timeline</h4>
                <p className="text-white/50">Horários disponíveis para o fuso horário (GMT+1) em {selectedDate && formatDate(selectedDate)}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {loadingSlots ? (
                  <div className="col-span-full py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Verificando Disponibilidade...</p>
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-xl font-bold text-white mb-2">Sem horários disponíveis</p>
                    <p className="text-sm text-white/50">Por favor, selecione outra data.</p>
                  </div>
                ) : (
                  availableSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className="group relative p-8 border border-white/10 bg-white/[0.03] rounded-3xl text-center hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all shadow-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] active:scale-95"
                    >
                      <span className="text-2xl font-black text-white group-hover:text-[#D4AF37] transition-colors">{time}</span>
                      <div className="absolute top-4 right-4 text-[9px] font-black text-white/20 uppercase tracking-widest group-hover:text-[#D4AF37]">LIVRE</div>
                    </button>
                  )))}
              </div>
            </motion.div>
          )}

          {step === 'form' && (
            <motion.div key="form" variants={fadeInUp} initial="hidden" animate="visible" className="max-w-3xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#D4AF37] text-white rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="text-3xl font-bold text-white">Verificação de Credenciais</h4>
                <p className="text-white/50 leading-relaxed max-w-lg mx-auto">Protegemos os seus dados com protocolos SSL. Preencha as informações para consolidar o agendamento.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] ml-2">Identificação Completa</label>
                    <input name="name" required placeholder="Ex: Dr. Africano Monteiro" onChange={handleInputChange} className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-base font-medium focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all text-white placeholder:text-white/20 border-none shadow-inner" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] ml-2">Canal de Comunicação (E-mail)</label>
                    <input name="email" type="email" required placeholder="info@monteiroglobal.ao" onChange={handleInputChange} className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-base font-medium focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all text-white placeholder:text-white/20 border-none shadow-inner" />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] ml-2">Contacto Directo (WhatsApp)</label>
                    <input name="phone" required placeholder="+244 923 000 000" onChange={handleInputChange} className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-base font-medium focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all text-white placeholder:text-white/20 border-none shadow-inner" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] ml-2">Notas do Briefing (Opcional)</label>
                  <textarea name="notes" rows={4} placeholder="Descreva sucintamente o objectivo desta reunião..." onChange={handleInputChange} className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-base font-medium focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all text-white placeholder:text-white/20 border-none shadow-inner resize-none" />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-6 bg-gradient-to-r from-[#D4AF37] to-[#B8952B] text-black text-xs font-black uppercase tracking-[0.4em] rounded-[1.5rem] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-4 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ChevronRight className="w-5 h-5" />}
                  <span>Confirmar & Reservar Slot</span>
                </button>
              </form>
            </motion.div>
          )}

          {step === 'verify' && (
            <motion.div key="verify" variants={fadeInUp} initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.98 }} className="max-w-md mx-auto space-y-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#D4AF37] text-white rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                  <Lock className="w-8 h-8" />
                </div>
                <h4 className="text-3xl font-bold text-white uppercase tracking-tighter">Verificar Identidade</h4>
                <p className="text-white/50 leading-relaxed font-medium">Enviamos um código de 6 dígitos para <span className="text-white font-bold">{formData.email}</span>. Introduza-o abaixo para validar o seu slot.</p>
              </div>

              <form onSubmit={handleVerify} className="space-y-10">
                <div className="space-y-6 text-center">
                  <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.5em]">Código de 6 Dígitos</label>
                  <input
                    name="code"
                    required
                    maxLength={6}
                    autoFocus
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-8 py-8 bg-white/5 border border-white/10 rounded-[2rem] text-[4rem] font-black tracking-[0.4em] text-center focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all text-white placeholder:text-white/5 shadow-inner"
                  />
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={verifying || verificationCode.length !== 6}
                    className="w-full py-7 bg-gradient-to-r from-[#D4AF37] to-[#B8952B] text-black text-xs font-black uppercase tracking-[0.4em] rounded-[1.5rem] hover:shadow-[0_0_60px_rgba(212,175,55,0.3)] transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-4 relative overflow-hidden group shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    {verifying ? <Loader2 className="w-6 h-6 animate-spin" /> : <ChevronRight className="w-6 h-6" />}
                    <span>Finalizar Verificação</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="w-full text-[10px] font-black text-white/20 uppercase tracking-[0.3em] hover:text-[#D4AF37] transition-all"
                  >
                    Corrigir E-mail
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div key="success" variants={fadeInUp} initial="hidden" animate="visible" className="max-w-2xl mx-auto py-20 text-center space-y-12">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 scale-150 rounded-full" />
                <div className="w-32 h-32 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto relative z-10">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400" />
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-5xl font-bold text-white tracking-tighter uppercase leading-none">Processo <br /><span className="text-emerald-400">Validado.</span></h4>
                <p className="text-lg text-white/50 leading-relaxed max-w-sm mx-auto">
                  O seu agendamento foi protocolado. {appointmentResult?.requiresPayment ? 'Este serviço requer pré-pagamento via AppyPay. As instruções foram enviadas para o seu e-mail.' : 'A nossa equipa analisará o briefing e enviará o convite oficial nas próximas 24 horas.'}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={() => window.location.href = '/'} className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-[#D4AF37] hover:text-white transition-all">Página Principal</button>
                <button onClick={() => window.location.reload()} className="px-10 py-5 bg-transparent border border-white/20 text-white/60 text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white/5 hover:text-white transition-all">Novo Agendamento</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Badges */}
      <div className="absolute bottom-6 right-10 flex items-center gap-6 opacity-40 pointer-events-none">
        <div className="flex items-center gap-2">
          <LocateFixed className="w-3 h-3 text-white/50" />
          <span className="text-[8px] font-black uppercase tracking-widest leading-none text-white/50">Angola, Luanda</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-3 h-3 text-[#D4AF37]" />
          <span className="text-[8px] font-black uppercase tracking-widest leading-none text-white/50">MG Security Verified</span>
        </div>
      </div>
    </div>
  );
}

// Additional missing icons used in the UI
function LocateFixed(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function Shield(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  )
}