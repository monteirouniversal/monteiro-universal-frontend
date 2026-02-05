import { useState, useEffect } from 'react';
import {
    Video,
    Search,
    Calendar as CalendarIcon,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ExternalLink,
    MoreVertical,
    Loader2
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../../services/api';
import { socket } from '../../services/socket';

export default function Meetings() {
    const [meetings, setMeetings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('ALL');

    useEffect(() => {
        fetchMeetings();

        // Socket Listeners
        socket.on('new_meeting_request', (newMeeting) => {
            setMeetings(prev => [newMeeting, ...prev]);
        });

        socket.on('meeting_updated', (updatedMeeting) => {
            setMeetings(prev => prev.map(m => m.id === updatedMeeting.id ? updatedMeeting : m));
        });

        socket.on('meeting_confirmed', (confirmedMeeting) => {
            setMeetings(prev => prev.map(m => m.id === confirmedMeeting.id ? confirmedMeeting : m));
        });

        return () => {
            socket.off('new_meeting_request');
            socket.off('meeting_updated');
            socket.off('meeting_confirmed');
        };
    }, []);

    const fetchMeetings = async () => {
        try {
            const response = await api.get('/admin/appointments');
            setMeetings(response.data.appointments || []);
        } catch (error) {
            console.error("Failed to fetch meetings", error);
        } finally {
            setLoading(false);
        }
    };

    // Filter Logic
    const filteredMeetings = meetings.filter(m => {
        if (filterStatus === 'ALL') return true;
        return m.status === filterStatus;
    });

    const statusMap: any = {
        PENDING: { label: 'Pendente', color: 'text-primary', bg: 'bg-primary/10', icon: Clock },
        CONFIRMED: { label: 'Confirmada', color: 'text-acid-green', bg: 'bg-acid-green/10', icon: CheckCircle2 },
        CANCELLED: { label: 'Cancelada', color: 'text-red-500', bg: 'bg-red-500/10', icon: XCircle },
        COMPLETED: { label: 'Concluída', color: 'text-blue-400', bg: 'bg-blue-400/10', icon: AlertCircle },
    };

    const getStatusBadge = (status: string) => {
        const s = statusMap[status] || statusMap.PENDING;
        const Icon = s.icon;
        return (
            <div className={`inline-flex items-center gap-2 px-3 py-1 ${s.bg} border border-current/10`}>
                <Icon className={`w-3 h-3 ${s.color}`} />
                <span className={`text-[9px] font-black uppercase tracking-widest ${s.color}`}>{s.label}</span>
            </div>
        );
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <Helmet>
                <title>Reuniões | Monteiro Universal</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
                        CENTRO DE <span className="text-primary italic">REUNIÕES</span>
                    </h1>
                    <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em] mt-1">Gestão operacional de encontros e consultorias</p>
                </div>

                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                        <CalendarIcon className="w-4 h-4" />
                        Abrir Agenda
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-deep-charcoal border border-white/5 p-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${filterStatus === s ? 'bg-primary border-primary text-black' : 'bg-white/5 border-white/10 text-white/40'}`}
                        >
                            {s === 'ALL' ? 'TODAS' : s}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-white/20" />
                    <input
                        type="text"
                        placeholder="PESQUISAR..."
                        className="w-full bg-white/[0.02] border border-white/5 py-2 pl-10 pr-4 text-[9px] font-bold uppercase tracking-widest outline-none focus:border-primary/50 transition-all text-white"
                    />
                </div>
            </div>

            {loading ? (
                <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-primary w-10 h-10" /></div>
            ) : (
                <div className="bg-deep-charcoal border border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.01]">
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Cliente / Serviço</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Data / Hora</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Link / Sala</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Estado</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredMeetings.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                                        Nenhuma reunião registada
                                    </td>
                                </tr>
                            ) : (
                                filteredMeetings.map((m) => (
                                    <tr key={m.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-5">
                                            <div>
                                                <p className="text-[11px] font-black uppercase tracking-widest text-white">{m.lead?.name}</p>
                                                <p className="text-[10px] text-white/30 uppercase mt-0.5">{m.service?.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div>
                                                <p className="text-[11px] font-black text-white tracking-widest">{new Date(m.scheduledDate).toLocaleDateString()}</p>
                                                <p className="text-[10px] text-white/30 uppercase mt-0.5 font-bold">{m.scheduledTime}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            {m.meetLink ? (
                                                <a href={m.meetLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:text-white transition-colors">
                                                    <Video className="w-4 h-4" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Entrar na Sala</span>
                                                </a>
                                            ) : (
                                                <span className="text-white/20 text-[9px] font-black uppercase tracking-widest italic">Aguardando Link</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-5">
                                            {getStatusBadge(m.status)}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="text-white/20 hover:text-primary transition-colors">
                                                    <ExternalLink className="w-4 h-4" />
                                                </button>
                                                <button className="text-white/20 hover:text-white transition-colors">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
