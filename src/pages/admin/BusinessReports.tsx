import { useState, useEffect } from 'react';
import {
    BarChart3,
    Loader2 as Loader2Icon
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function BusinessReports() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <Helmet>
                <title>Relatórios de Negócio | Monteiro Universal</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
                        BUSINESS <span className="text-primary italic">INTELLIGENCE</span>
                    </h1>
                    <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em] mt-1">Análise de performance, conversão e crescimento</p>
                </div>

                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                        <BarChart3 className="w-4 h-4" />
                        Exportar Analytics
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="py-20 text-center"><Loader2Icon className="animate-spin mx-auto text-primary w-10 h-10" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Conversion Card */}
                    <div className="glass-card p-8 col-span-full lg:col-span-2">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Funil de Conversão (30d)</h3>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                <span className="text-[9px] font-bold text-white/40 uppercase">Leads</span>
                                <span className="w-2 h-2 rounded-full bg-acid-green ml-2" />
                                <span className="text-[9px] font-bold text-white/40 uppercase">Clientes</span>
                            </div>
                        </div>
                        <div className="h-64 flex items-end gap-4">
                            {[40, 65, 30, 85, 45, 70, 90, 55, 60, 75, 40, 80].map((v, i) => (
                                <div key={i} className="flex-1 space-y-2">
                                    <div className="w-full bg-primary/20 hover:bg-primary transition-all relative group" style={{ height: `${v}%` }}>
                                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-white opacity-0 group-hover:opacity-100">{v}%</span>
                                    </div>
                                    <div className="w-full bg-acid-green/20 hover:bg-acid-green transition-all" style={{ height: `${v * 0.6}%` }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="space-y-6">
                        <div className="bg-deep-charcoal border border-white/5 p-6">
                            <p className="text-white/20 text-[8px] font-black uppercase tracking-widest mb-1">Taxa de Conversão</p>
                            <div className="flex items-end justify-between">
                                <h4 className="text-2xl font-display font-bold text-white">18.5%</h4>
                                <span className="text-acid-green text-[10px] font-bold">+2.1%</span>
                            </div>
                        </div>
                        <div className="bg-deep-charcoal border border-white/5 p-6">
                            <p className="text-white/20 text-[8px] font-black uppercase tracking-widest mb-1">Custo por Lead (CPL)</p>
                            <div className="flex items-end justify-between">
                                <h4 className="text-2xl font-display font-bold text-white text-primary">AOA 1.250</h4>
                                <span className="text-red-500 text-[10px] font-bold">+15%</span>
                            </div>
                        </div>
                        <div className="bg-deep-charcoal border border-white/5 p-6">
                            <p className="text-white/20 text-[8px] font-black uppercase tracking-widest mb-1">Lifetime Value (LTV)</p>
                            <div className="flex items-end justify-between">
                                <h4 className="text-2xl font-display font-bold text-white">AOA 850K</h4>
                                <span className="text-acid-green text-[10px] font-bold">+8%</span>
                            </div>
                        </div>
                    </div>

                    {/* More Sections */}
                    <div className="glass-card p-10 lg:col-span-3 text-center border-dashed opacity-50">
                        <BarChart3 className="w-12 h-12 text-white/10 mx-auto mb-4" />
                        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">Mapas de Calor e Análise de Tráfego em Desenvolvimento</p>
                    </div>
                </div>
            )}
        </div>
    );
}
