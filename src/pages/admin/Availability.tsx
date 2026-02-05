
import { useState, useEffect } from 'react';
import {
    Clock,
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Save,
    Loader2,
    X,
    AlertCircle
} from 'lucide-react';
import api from '../../services/api';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function Availability() {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const [schedule, setSchedule] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Calendar View State
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        try {
            const res = await api.get('/scheduling/availability');
            // Default scaffolding
            const skeleton = Array.from({ length: 7 }).map((_, i) => ({
                dayOfWeek: i,
                startTime: '09:00',
                endTime: '17:00',
                isActive: i > 0 && i < 6
            }));

            if (res.data && res.data.length > 0) {
                const merged = skeleton.map(defaultDay => {
                    const found = res.data.find((d: any) => d.dayOfWeek === defaultDay.dayOfWeek);
                    return found || defaultDay;
                });
                setSchedule(merged);
            } else {
                setSchedule(skeleton);
            }
        } catch (error) {
            console.error("Failed to load availability", error);
            toast.error("Falha ao carregar horários");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put('/scheduling/availability', schedule);
            toast.success('Disponibilidade atualizada!');
        } catch (error) {
            toast.error('Erro ao salvar horários.');
        } finally {
            setSaving(false);
        }
    };

    const toggleDay = (index: number) => {
        const newSchedule = [...schedule];
        newSchedule[index].isActive = !newSchedule[index].isActive;
        setSchedule(newSchedule);
    };

    const updateTime = (index: number, field: 'startTime' | 'endTime', value: string) => {
        const newSchedule = [...schedule];
        newSchedule[index][field] = value;
        setSchedule(newSchedule);
    };

    // --- Calendar Logic ---
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay(); // 0 is Sunday

        const dayArray = [];
        // Pad previous month
        for (let i = 0; i < startingDay; i++) {
            dayArray.push(null);
        }
        // Actual days
        for (let i = 1; i <= daysInMonth; i++) {
            dayArray.push(new Date(year, month, i));
        }
        return dayArray;
    };

    const changeMonth = (delta: number) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + delta));
        setCurrentDate(new Date(newDate));
    };

    const isDayActive = (date: Date) => {
        if (!schedule.length) return false;
        const dayOfWeek = date.getDay();
        return schedule.find(s => s.dayOfWeek === dayOfWeek)?.isActive;
    };

    const getDayHours = (date: Date) => {
        if (!schedule.length) return '';
        const dayOfWeek = date.getDay();
        const config = schedule.find(s => s.dayOfWeek === dayOfWeek);
        if (!config || !config.isActive) return 'INDISPONÍVEL';
        return `${config.startTime} - ${config.endTime}`;
    };

    if (loading) return (
        <div className="h-[80vh] flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Carregando Definições de Agenda...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-[1600px] mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
                        DISPONIBILIDADE <span className="text-primary italic">360°</span>
                    </h1>
                    <p className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em] mt-1">
                        Configure a sua rotina semanal e visualize o impacto no calendário mensal
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)] disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Salvar Definições
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                {/* Left Panel: Weekly Configuration */}
                <div className="xl:col-span-4 space-y-6">
                    <div className="bg-[#0A0A0A] border border-white/5 p-8 relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-8">
                            <Clock className="w-5 h-5 text-primary" />
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">Rotina Semanal Padrão</h2>
                        </div>

                        {/* Google Connection Button */}
                        <div className="mb-8 p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Google Workspace</h3>
                            <p className="text-[9px] text-white/40 uppercase mb-4 leading-relaxed">
                                Necessário para sincronizar a agenda e enviar e-mails de confirmação automáticos.
                            </p>
                            <button
                                onClick={() => window.open(`${import.meta.env.VITE_API_URL?.replace('/api', '')}/api/auth/google`, '_blank')}
                                className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 1.56-1.56 2.73-3.21 2.73c-2.02 0-3.65-1.63-3.65-3.65c0-2.02 1.63-3.65 3.65-3.65c.88 0 1.68.32 2.3.84l2.13-2.13C18.25 6.44 15.65 5 12.18 5C8.11 5 4.82 8.29 4.82 12.36s3.29 7.36 7.36 7.36c4.07 0 7.36-3.29 7.36-7.36c0-.42-.04-.83-.11-1.23Z" />
                                </svg>
                                Conectar com Google
                            </button>
                            <p className="text-[8px] text-blue-400/50 mt-2 uppercase text-center font-bold">
                                * Certifique-se de autorizar "Enviar e-mail" na próxima tela.
                            </p>
                        </div>

                        {/* Extrator de Token via URL (New Tool) */}
                        <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Extrator de Token</h3>
                            <p className="text-[9px] text-white/40 uppercase mb-4 leading-relaxed">
                                Se a página de login fechou sozinha, cole aqui o link completo da barra de endereços:
                            </p>
                            <input
                                type="text"
                                placeholder="Cole a URL do Google aqui..."
                                className="w-full bg-black/50 border border-white/10 p-3 text-white text-[10px] mb-3 outline-none focus:border-primary"
                                onChange={async (e) => {
                                    const url = e.target.value;
                                    if (url.includes('code=')) {
                                        const code = new URL(url).searchParams.get('code');
                                        if (code) {
                                            try {
                                                toast.loading('Gerando Refresh Token...');
                                                const res = await api.post('/auth/google/exchange', { code });
                                                // Mostra o token gerado para cópia
                                                alert(`TOKEN GERADO COM SUCESSO!\n\nCopie este código para a Railway:\n\n${res.data.refresh_token}`);
                                                toast.success('Token Extraído!');
                                            } catch (err: any) {
                                                toast.error('Erro ao extrair token. Código expirado?');
                                            }
                                        }
                                    }
                                }}
                            />
                            <p className="text-[8px] text-white/20 uppercase font-bold italic">
                                * O sistema detecta o código automaticamente ao colar a URL.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {schedule.map((day, index) => (
                                <div
                                    key={index}
                                    className={`group flex items-center gap-4 p-4 border transition-all duration-300 ${day.isActive
                                        ? 'border-primary/20 bg-primary/[0.02] hover:bg-primary/[0.05]'
                                        : 'border-white/5 bg-transparent opacity-50 hover:opacity-100'
                                        }`}
                                >
                                    {/* Toggle */}
                                    <div
                                        onClick={() => toggleDay(index)}
                                        className={`w-10 h-6 rounded-full border cursor-pointer relative transition-colors ${day.isActive ? 'bg-primary border-primary' : 'bg-transparent border-white/20'
                                            }`}
                                    >
                                        <div className={`absolute top-1 w-3.5 h-3.5 bg-black rounded-full transition-all ${day.isActive ? 'left-5 text-primary' : 'left-1 bg-white/20'
                                            }`} />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className={`text-[10px] font-black uppercase tracking-wider ${day.isActive ? 'text-white' : 'text-white/40'}`}>
                                                {days[index]}
                                            </span>
                                            {!day.isActive && <span className="text-[8px] font-bold text-white/20 uppercase">Fechado</span>}
                                        </div>

                                        {day.isActive && (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="time"
                                                    value={day.startTime}
                                                    onChange={(e) => updateTime(index, 'startTime', e.target.value)}
                                                    className="bg-black/50 border border-white/10 text-white text-[10px] font-mono p-1.5 focus:border-primary outline-none w-20 text-center"
                                                />
                                                <span className="text-white/20">-</span>
                                                <input
                                                    type="time"
                                                    value={day.endTime}
                                                    onChange={(e) => updateTime(index, 'endTime', e.target.value)}
                                                    className="bg-black/50 border border-white/10 text-white text-[10px] font-mono p-1.5 focus:border-primary outline-none w-20 text-center"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-deep-charcoal border border-white/5 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-white/40 flex-shrink-0" />
                        <p className="text-[9px] text-white/40 uppercase leading-relaxed">
                            <strong className="text-white">Nota:</strong> Estas definições aplicam-se a todas as semanas futuras. Dias específicos podem ser bloqueados manualmente na lista de reuniões se necessário.
                        </p>
                    </div>
                </div>

                {/* Right Panel: Visual Calendar 360 */}
                <div className="xl:col-span-8">
                    <div className="bg-[#0A0A0A] border border-white/5 h-full flex flex-col">

                        {/* Calendar Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <h2 className="text-xl font-display font-bold text-white tracking-tight uppercase flex items-center gap-4">
                                <CalendarIcon className="w-5 h-5 text-primary" />
                                {currentDate.toLocaleString('pt-PT', { month: 'long', year: 'numeric' })}
                            </h2>

                            <div className="flex items-center gap-2">
                                <button onClick={() => changeMonth(-1)} className="p-2 border border-white/10 hover:bg-white/5 text-white transition-colors">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 border border-white/10 hover:bg-white/5 text-white text-[9px] font-bold uppercase tracking-widest transition-colors">
                                    Hoje
                                </button>
                                <button onClick={() => changeMonth(1)} className="p-2 border border-white/10 hover:bg-white/5 text-white transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Days Header */}
                        <div className="grid grid-cols-7 border-b border-white/5 bg-white/[0.01]">
                            {days.map(day => (
                                <div key={day} className="py-4 text-center text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
                                    {day.substring(0, 3)}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                            {getDaysInMonth(currentDate).map((date, i) => {
                                if (!date) return <div key={`empty-${i}`} className="bg-white/[0.005] border-r border-b border-white/5" />;

                                const active = isDayActive(date);
                                const isToday = date.toDateString() === new Date().toDateString();

                                return (
                                    <motion.div
                                        key={date.toISOString()}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={`
                                            min-h-[120px] p-4 border-r border-b border-white/5 relative group transition-all
                                            ${active ? 'hover:bg-white/[0.02]' : 'bg-[url("/stripes.png")] bg-opacity-5'}
                                        `}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`
                                                text-sm font-bold font-display
                                                ${isToday ? 'text-black bg-primary w-6 h-6 flex items-center justify-center rounded-full' : 'text-white/60'}
                                            `}>
                                                {date.getDate()}
                                            </span>

                                            {active ? (
                                                <div className="w-1.5 h-1.5 rounded-full bg-acid-green shadow-[0_0_10px_rgba(189,255,0,0.5)]" />
                                            ) : (
                                                <X className="w-3 h-3 text-white/10" />
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            {active ? (
                                                <div className="text-[9px] font-mono text-white/40 group-hover:text-primary transition-colors">
                                                    {getDayHours(date)}
                                                </div>
                                            ) : (
                                                <div className="text-[8px] font-black uppercase text-white/10 tracking-widest mt-4">
                                                    Fechado
                                                </div>
                                            )}
                                        </div>

                                        {/* Future: Appointment dots here */}
                                        <div className="absolute bottom-4 left-4 flex gap-1">
                                            {/* Placeholder for appointments logic if integrated deeply */}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
