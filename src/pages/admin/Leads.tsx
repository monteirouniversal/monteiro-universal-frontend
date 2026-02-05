import { useState, useEffect } from 'react';
import { Search, Filter, Mail, Phone, Loader2, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';

export default function Leads() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/leads');
            setLeads(response.data.leads);
        } catch (error) {
            console.error("Failed to fetch leads", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredLeads = leads.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
                        GESTÃO DE <span className="text-primary italic">LEADS</span>
                    </h1>
                    <p className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em] mt-1">Contactos gerados via site e agendamentos</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white/5 border border-white/10 px-4 py-3 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{leads.length} CAPTURADOS</span>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex gap-4 items-center bg-white/5 p-4 border border-white/5">
                <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-black border border-white/10">
                    <Search className="w-4 h-4 text-white/20" />
                    <input
                        type="text"
                        placeholder="PROCURAR POR NOME OU EMAIL..."
                        className="bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-widest w-full text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="p-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/40 hover:text-white">
                    <Filter className="w-4 h-4" />
                </button>
            </div>

            {/* Leads Grid */}
            {loading ? (
                <div className="py-20 flex justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredLeads.map((lead, idx) => (
                            <motion.div
                                key={lead.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative bg-deep-charcoal border border-white/5 hover:border-primary/40 transition-all duration-500 overflow-hidden"
                            >
                                {/* Card Top Indicator */}
                                <div className="h-1 w-full bg-primary/20 group-hover:bg-primary transition-colors" />

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center font-bold text-primary text-xl">
                                            {lead.name.charAt(0)}
                                        </div>
                                        <div className="px-2 py-1 bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-tighter">
                                            {lead.source}
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-display font-bold text-white mb-1 group-hover:text-primary transition-colors">{lead.name}</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-white/40">
                                            <Mail className="w-3 h-3" />
                                            <span className="text-[10px] font-medium tracking-tight lowercase">{lead.email}</span>
                                        </div>
                                        {lead.phone && (
                                            <div className="flex items-center gap-2 text-white/40">
                                                <Phone className="w-3 h-3" />
                                                <span className="text-[10px] font-medium tracking-tight">{lead.phone}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <p className="text-[14px] font-display font-bold text-white">{lead.meetings?.length || 0}</p>
                                            <p className="text-[8px] text-white/20 font-black uppercase tracking-widest">Reuniões</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[14px] font-display font-bold text-white">
                                                {new Date(lead.createdAt).toLocaleDateString('pt-PT')}
                                            </p>
                                            <p className="text-[8px] text-white/20 font-black uppercase tracking-widest">Capturado</p>
                                        </div>
                                    </div>

                                    <button className="w-full mt-6 py-3 bg-white/5 hover:bg-primary hover:text-black border border-white/10 hover:border-primary text-[9px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                                        <Calendar className="w-3 h-3" />
                                        Agendar Consultoria
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
