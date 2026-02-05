import { useState, useEffect } from 'react';
import {
    Search,
    MoreVertical,
    ExternalLink,
    Mail,
    Phone,
    Calendar,
    DollarSign,
    Loader2
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../../services/api';

export default function Clients() {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await api.get('/admin/leads?status=CONVERTED');
            setClients(response.data.leads || []);
        } catch (error) {
            console.error("Failed to fetch clients", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <Helmet>
                <title>Clientes | Monteiro Universal</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
                        GESTÃO DE <span className="text-primary italic">CLIENTES</span>
                    </h1>
                    <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em] mt-1">Base de dados de clientes convertidos e histórico</p>
                </div>

                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                        Exportar CSV
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-deep-charcoal border border-white/5 p-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                        type="text"
                        placeholder="PROCURAR POR NOME OU E-MAIL..."
                        className="w-full bg-white/[0.02] border border-white/5 py-3 pl-12 pr-4 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-primary/50 transition-all text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-primary w-10 h-10" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clients.length === 0 ? (
                        <div className="col-span-full py-20 text-center border border-dashed border-white/10">
                            <p className="text-white/20 uppercase font-black text-xs tracking-widest">Nenhum cliente convertido ainda</p>
                        </div>
                    ) : (
                        clients.map((client) => (
                            <div key={client.id} className="glass-card p-6 group relative overflow-hidden">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-primary">
                                        {client.name.charAt(0)}
                                    </div>
                                    <button className="p-2 text-white/20 hover:text-white transition-all">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>

                                <h3 className="text-lg font-display font-bold text-white mb-1 uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                                    {client.name}
                                </h3>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-6">Cliente Premium</p>

                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-white/40">
                                        <Mail className="w-3 h-3" />
                                        <span className="text-[10px] font-medium">{client.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/40">
                                        <Phone className="w-3 h-3" />
                                        <span className="text-[10px] font-medium">{client.phone || 'N/A'}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] text-white/20 font-black uppercase tracking-widest mb-1 items-center flex gap-1"><Calendar className="w-2 h-2" /> Reuniões</span>
                                        <span className="text-xs font-bold text-white">{client.meetings?.length || 0} Total</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] text-white/20 font-black uppercase tracking-widest mb-1 items-center flex gap-1"><DollarSign className="w-2 h-2" /> Investido</span>
                                        <span className="text-xs font-bold text-acid-green">AOA ---</span>
                                    </div>
                                </div>

                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ExternalLink className="w-4 h-4 text-primary" />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
