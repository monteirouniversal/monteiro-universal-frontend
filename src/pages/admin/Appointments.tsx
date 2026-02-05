
import { useState, useEffect } from 'react';
import {
  Video,
  Plus,
  MoreVertical,
  Loader2,
  CheckCircle2,
  ExternalLink,
  Clock,
  XCircle,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

/**
 * Premium Agenda & Meetings Module - Monteiro Universal
 * Gestão de Consultorias e Reuniões Estratégicas
 */
export default function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/admin/appointments');
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (id: string) => {
    try {
      await api.post(`/scheduling/meetings/${id}/confirm`);
      fetchAppointments();
    } catch (error) {
      alert("Erro ao confirmar reunião");
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm("Tem a certeza que deseja cancelar esta reunião?")) return;
    try {
      await api.delete(`/scheduling/meetings/${id}`);
      fetchAppointments();
    } catch (error) {
      alert("Erro ao rejeitar reunião");
    }
  };

  const statusColors: any = {
    CONFIRMED: 'text-acid-green',
    PENDING: 'text-primary animate-pulse',
    CANCELLED: 'text-red-500 line-through opacity-50',
    COMPLETED: 'text-white/20',
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
            CENTRAL DE <span className="text-primary italic">REUNIÕES</span>
          </h1>
          <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em] mt-1">Gestão de leads agendados e consultorias confirmadas</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/portal-monteiro/availability')}
            className="flex items-center gap-2 px-6 py-3 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
          >
            <Settings className="w-4 h-4" />
            Configurar Disponibilidade
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <Plus className="w-4 h-4" />
            Agendar Manualmente
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Statistics and Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0A0A0A] border border-white/5 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Clock className="w-20 h-20 text-primary" />
            </div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6">Status da Agenda</h4>

            <div className="space-y-6 relative z-10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[9px] text-white/20 uppercase font-bold tracking-widest mb-1">Confirmadas</p>
                  <p className="text-3xl font-display font-bold text-acid-green">
                    {appointments.filter(a => a.status === 'CONFIRMED').length.toString().padStart(2, '0')}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] text-white/20 uppercase font-bold tracking-widest mb-1">Pendentes</p>
                  <p className="text-3xl font-display font-bold text-primary">
                    {appointments.filter(a => a.status === 'PENDING').length.toString().padStart(2, '0')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-deep-charcoal border border-white/5 p-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white mb-6 italic">Calendário de Ação</h3>
            <div className="grid grid-cols-7 gap-1 text-center mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                <span key={d} className="text-[8px] font-bold text-white/20 uppercase">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 31 }).map((_, i) => (
                <div key={i} className="aspect-square flex items-center justify-center text-[10px] font-bold text-white/20 hover:bg-white/5 transition-all cursor-pointer">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline View */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-[#0A0A0A] border border-white/5">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Timeline de Agendamentos</h3>
              <div className="flex items-center gap-4 text-white/20 text-[9px] font-black uppercase tracking-widest">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Pendente</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-acid-green" /> Ativo</span>
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {loading ? (
                <div className="py-20 text-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
                  <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest mt-4">Sincronizando com Servidor...</p>
                </div>
              ) : (
                <AnimatePresence>
                  {appointments.length === 0 ? (
                    <div className="p-20 text-center text-white/20 text-xs font-bold uppercase tracking-widest">Nenhuma reunião agendada</div>
                  ) : appointments.map((appt) => (
                    <motion.div
                      key={appt.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-8 hover:bg-white/[0.01] transition-all group flex flex-col md:flex-row md:items-center gap-8"
                    >
                      <div className="md:w-32 flex-shrink-0">
                        <p className="text-2xl font-display font-bold text-white tracking-tighter">{appt.scheduledTime}</p>
                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">
                          {new Date(appt.scheduledDate).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' })}
                        </p>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-[9px] font-black uppercase tracking-widest ${statusColors[appt.status]}`}>
                            ● {appt.status}
                          </span>
                          <div className="w-1 h-1 bg-white/10 rounded-full" />
                          <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest flex items-center gap-2">
                            <Video className="w-3 h-3 text-primary" /> Google Meet
                          </span>
                        </div>
                        <h4 className="text-xl font-display font-bold text-white mb-1 group-hover:text-primary transition-colors uppercase tracking-tight">
                          {appt.service?.name} - {appt.lead?.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-5 h-5 bg-white/5 border border-white/10 rounded-none flex items-center justify-center text-[10px] font-bold text-primary">
                            {appt.lead?.name?.charAt(0) || 'L'}
                          </div>
                          <span className="text-[11px] text-white/60 font-medium uppercase tracking-wider">{appt.lead?.name}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all">
                        {appt.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleConfirm(appt.id)}
                              className="flex items-center gap-2 px-6 py-3 bg-acid-green text-black text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(189,255,0,0.2)]"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              Confirmar
                            </button>
                            <button
                              onClick={() => handleReject(appt.id)}
                              className="flex items-center gap-2 px-4 py-3 border border-red-500/50 text-red-500 text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                            >
                              <XCircle className="w-3 h-3" />
                              Rejeitar
                            </button>
                          </>
                        )}
                        {appt.meetingLink && (
                          <a
                            href={appt.meetingLink} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Entrar
                          </a>
                        )}
                        <button className="p-3 bg-white/5 border border-white/10 hover:border-white transition-all">
                          <MoreVertical className="w-4 h-4 text-white/40" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            <button className="w-full py-4 text-[10px] font-bold text-white/20 uppercase tracking-widest border-t border-white/5 hover:bg-white/5 transition-all">
              Ver Histórico Completo de Consultorias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}