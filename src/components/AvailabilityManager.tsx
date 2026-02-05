
import { useState, useEffect } from 'react';
import { Clock, Check, X, Loader2 } from 'lucide-react';
import api from '../services/api';
import { toast } from 'sonner';

export default function AvailabilityManager({ onClose }: { onClose: () => void }) {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const [schedule, setSchedule] = useState<any[]>(
        Array.from({ length: 7 }).map((_, i) => ({
            dayOfWeek: i,
            startTime: '09:00',
            endTime: '17:00',
            isActive: i > 0 && i < 6 // Mon-Fri default
        }))
    );
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        try {
            const res = await api.get('/scheduling/availability');
            if (res.data && res.data.length > 0) {
                // Merge active config with default structure to ensure all days present
                const merged = schedule.map(defaultDay => {
                    const found = res.data.find((d: any) => d.dayOfWeek === defaultDay.dayOfWeek);
                    return found || defaultDay;
                });
                setSchedule(merged);
            }
        } catch (error) {
            console.error("Failed to load availability", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put('/scheduling/availability', schedule);
            toast.success('Disponibilidade atualizada!');
            onClose();
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

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm p-4">
            <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-2xl overflow-hidden relative">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-deep-charcoal">
                    <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-primary" />
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">Configurar Disponibilidade</h2>
                    </div>
                    <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
                    {loading ? (
                        <div className="text-center py-10"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></div>
                    ) : (
                        schedule.map((day, index) => (
                            <div key={index} className={`flex items-center gap-4 p-4 border ${day.isActive ? 'border-primary/20 bg-primary/5' : 'border-white/5 bg-white/[0.02]'} transition-all`}>
                                <div className="w-32">
                                    <div className="flex items-center gap-3">
                                        <div
                                            onClick={() => toggleDay(index)}
                                            className={`w-4 h-4 border cursor-pointer flex items-center justify-center ${day.isActive ? 'bg-primary border-primary' : 'border-white/20'}`}
                                        >
                                            {day.isActive && <Check className="w-3 h-3 text-black" />}
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${day.isActive ? 'text-white' : 'text-white/40'}`}>
                                            {days[index]}
                                        </span>
                                    </div>
                                </div>

                                {day.isActive ? (
                                    <div className="flex items-center gap-4 flex-1">
                                        <input
                                            type="time"
                                            value={day.startTime}
                                            onChange={(e) => updateTime(index, 'startTime', e.target.value)}
                                            className="bg-black border border-white/10 text-white text-xs p-2 focus:border-primary outline-none"
                                        />
                                        <span className="text-white/20">-</span>
                                        <input
                                            type="time"
                                            value={day.endTime}
                                            onChange={(e) => updateTime(index, 'endTime', e.target.value)}
                                            className="bg-black border border-white/10 text-white text-xs p-2 focus:border-primary outline-none"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex-1 text-[10px] text-white/20 uppercase font-medium italic">Indisponível</div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 border-t border-white/10 bg-deep-charcoal flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/5"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-3 bg-primary text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
                    >
                        {saving ? 'Salvando...' : 'Salvar Horários'}
                    </button>
                </div>
            </div>
        </div>
    );
}
