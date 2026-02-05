import { useState, useEffect } from 'react';
import { Search, Filter, Mail, Phone, Loader2, MessageSquare, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import { Helmet } from 'react-helmet-async';

export default function Contacts() {
    const [contacts, setContacts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/contacts');
            setContacts(response.data.contacts);
        } catch (error) {
            console.error("Failed to fetch contacts", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredContacts = contacts.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <Helmet>
                <title>Mensagens de Contacto | Monteiro Universal</title>
            </Helmet>

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
                        MENSAGENS DE <span className="text-primary italic">CONTACTO</span>
                    </h1>
                    <p className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em] mt-1">Formulário de contacto do website</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white/5 border border-white/10 px-4 py-3 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{contacts.length} MENSAGENS</span>
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

            {/* Contacts Grid */}
            {loading ? (
                <div className="py-20 flex justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            ) : filteredContacts.length === 0 ? (
                <div className="text-center py-20 text-white/20 text-xs font-bold uppercase tracking-widest">
                    Nenhuma mensagem encontrada
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {filteredContacts.map((contact, idx) => (
                            <motion.div
                                key={contact.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative bg-deep-charcoal border border-white/5 hover:border-primary/40 transition-all duration-500 overflow-hidden"
                            >
                                {/* Card Top Indicator */}
                                <div className={`h-1 w-full transition-colors ${contact.read ? 'bg-white/10' : 'bg-primary'}`} />

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center font-bold text-primary text-lg">
                                                {contact.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-display font-bold text-white group-hover:text-primary transition-colors">{contact.name}</h3>
                                                <div className="flex items-center gap-3 text-white/40 mt-1">
                                                    <div className="flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        <span className="text-[9px] tracking-tight lowercase">{contact.email}</span>
                                                    </div>
                                                    {contact.phone && (
                                                        <div className="flex items-center gap-1">
                                                            <Phone className="w-3 h-3" />
                                                            <span className="text-[9px] tracking-tight">{contact.phone}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">
                                                {new Date(contact.createdAt).toLocaleDateString('pt-PT')}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-black/20 p-4 border border-white/5 mt-4">
                                        <p className="text-white/60 text-xs leading-relaxed italic">
                                            "{contact.message}"
                                        </p>
                                    </div>

                                    <div className="mt-6 flex gap-2">
                                        <a href={`mailto:${contact.email}`} className="flex-1 py-3 bg-white/5 hover:bg-white hover:text-black border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                                            <Mail className="w-3 h-3" />
                                            Responder
                                        </a>
                                        <a href={`https://wa.me/${contact.phone?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-white/5 hover:bg-[#25D366] hover:text-white border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                                            <Phone className="w-3 h-3" />
                                            WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
