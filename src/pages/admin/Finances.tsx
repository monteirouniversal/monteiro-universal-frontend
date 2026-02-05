import { useState, useEffect } from 'react';
import {
    TrendingUp,
    DollarSign,
    BarChart3,
    PieChart,
    Download,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Loader2
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../../services/api';

export default function Finances() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFinances = async () => {
            try {
                const response = await api.get('/admin/stats');
                setStats(response.data.stats);
            } catch (error) {
                console.error("Failed to fetch finance stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFinances();
    }, []);

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <Helmet>
                <title>Financeiro Macro | Monteiro Universal</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
                        PROVISÃO <span className="text-primary italic">FINANCEIRA</span>
                    </h1>
                    <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em] mt-1">Visão macro e saúde económica do ecossistema</p>
                </div>

                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                        <Download className="w-4 h-4" />
                        Relatório Anual
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all">
                        <DollarSign className="w-4 h-4" />
                        Novo Lançamento
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-primary w-10 h-10" /></div>
            ) : (
                <>
                    {/* Macro Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-deep-charcoal border border-white/5 p-8 relative overflow-hidden group">
                            <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-2">Receita Total</p>
                            <h3 className="text-3xl font-display font-bold text-white tracking-tighter mb-4">AOA {stats?.revenue?.toLocaleString() || '0'}</h3>
                            <div className="flex items-center gap-2 text-acid-green">
                                <ArrowUpRight className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">+12.5% vs mês ant.</span>
                            </div>
                            <BarChart3 className="absolute -right-4 -bottom-4 w-24 h-24 text-white/[0.02] group-hover:text-primary/5 transition-colors" />
                        </div>

                        <div className="bg-deep-charcoal border border-white/5 p-8 relative overflow-hidden group">
                            <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-2">Ticket Médio</p>
                            <h3 className="text-3xl font-display font-bold text-white tracking-tighter mb-4">AOA 125.000</h3>
                            <div className="flex items-center gap-2 text-primary">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">+5.2% Crescimento</span>
                            </div>
                            <PieChart className="absolute -right-4 -bottom-4 w-24 h-24 text-white/[0.02] group-hover:text-primary/5 transition-colors" />
                        </div>

                        <div className="bg-deep-charcoal border border-white/5 p-8 relative overflow-hidden group">
                            <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-2">Churn Rate</p>
                            <h3 className="text-3xl font-display font-bold text-white tracking-tighter mb-4">2.4%</h3>
                            <div className="flex items-center gap-2 text-red-500">
                                <ArrowDownRight className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">-0.5% Melhora</span>
                            </div>
                        </div>

                        <div className="bg-deep-charcoal border border-white/5 p-8 relative overflow-hidden group">
                            <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-2">Provisão 30d</p>
                            <h3 className="text-3xl font-display font-bold text-primary tracking-tighter mb-4">AOA 4.5M</h3>
                            <div className="flex items-center gap-2 text-white/20">
                                <Calendar className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Baseado em Agenda</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 glass-card p-10 h-[400px] flex items-center justify-center">
                            <div className="text-center">
                                <TrendingUp className="w-12 h-12 text-white/5 mx-auto mb-4" />
                                <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">Área Gráfica (Em breve)</p>
                            </div>
                        </div>
                        <div className="glass-card p-10 flex flex-col justify-between">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">Distribuição de Lucro</h4>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Sistemas', value: 45, color: 'bg-primary' },
                                        { label: 'Consultoria', value: 30, color: 'bg-acid-green' },
                                        { label: 'Manutenção', value: 15, color: 'bg-blue-400' },
                                        { label: 'Outros', value: 10, color: 'bg-white/20' }
                                    ].map(item => (
                                        <div key={item.label}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] font-bold text-white uppercase">{item.label}</span>
                                                <span className="text-[10px] font-bold text-white/40">{item.value}%</span>
                                            </div>
                                            <div className="h-1 bg-white/5">
                                                <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className="w-full py-4 border border-white/5 hover:border-primary/30 text-[9px] font-black uppercase tracking-widest transition-all">Ver Detalhes Por Segmento</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
