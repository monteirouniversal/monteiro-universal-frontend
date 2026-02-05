import { useState, useEffect } from 'react';
import {
    Plus,
    Layers,
    Loader2,
    X,
    Edit3,
    Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import socket from '../../services/socket';

export default function Services() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        durationMinutes: '60',
        isPaid: false,
        requiresApproval: false,
        order: '0',
        isActive: true
    });

    useEffect(() => {
        fetchServices();
        socket.on('admin:service_created', fetchServices);

        return () => {
            socket.off('admin:service_created');
        };
    }, []);

    const fetchServices = async () => {
        try {
            const response = await api.get('/admin/services');
            setServices(response.data.services);
        } catch (error) {
            console.error("Failed to fetch services", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenCreate = () => {
        setIsEditMode(false);
        setSelectedServiceId(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            durationMinutes: '60',
            isPaid: false,
            requiresApproval: false,
            order: '0',
            isActive: true
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (service: any) => {
        setIsEditMode(true);
        setSelectedServiceId(service.id);
        setFormData({
            name: service.name,
            description: service.description,
            price: service.price.toString(),
            durationMinutes: service.durationMinutes.toString(),
            isPaid: service.isPaid,
            requiresApproval: service.requiresApproval,
            order: service.order.toString(),
            isActive: service.isActive
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditMode && selectedServiceId) {
                await api.put(`/admin/services/${selectedServiceId}`, formData);
            } else {
                await api.post('/admin/services', formData);
            }
            setIsModalOpen(false);
            fetchServices();
        } catch (error) {
            alert("Erro ao processar serviço");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este serviço? Esta ação é irreversível.")) return;
        try {
            await api.delete(`/admin/services/${id}`);
            fetchServices();
        } catch (error) {
            alert("Erro ao excluir serviço");
        }
    };

    const handleToggleStatus = async (service: any) => {
        try {
            await api.put(`/admin/services/${service.id}`, { isActive: !service.isActive });
            fetchServices();
        } catch (error) {
            alert("Erro ao alterar status");
        }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
                        GESTÃO DE <span className="text-primary italic">SERVIÇOS & AGENDAMENTOS</span>
                    </h1>
                    <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em] mt-1">Configure as ofertas e fluxos de atendimento</p>
                </div>

                <button
                    onClick={handleOpenCreate}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                >
                    <Plus className="w-4 h-4" />
                    Novo Serviço
                </button>
            </div>

            {loading ? (
                <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-primary" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-8 group relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                                        <Layers className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex gap-2">
                                        {service.isPaid && <span className="px-2 py-1 bg-acid-green/20 text-acid-green text-[8px] font-black uppercase tracking-widest">Pago</span>}
                                        {service.requiresApproval && <span className="px-2 py-1 bg-orange-500/20 text-orange-500 text-[8px] font-black uppercase tracking-widest">Aprovação</span>}
                                    </div>
                                </div>

                                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                    {service.name}
                                </h3>

                                <p className="text-xs text-white/40 leading-relaxed mb-6 line-clamp-3 h-12">
                                    {service.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-3 bg-white/5 border border-white/5">
                                        <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-1">Duração</p>
                                        <p className="text-sm font-bold text-white tracking-tighter">{service.durationMinutes} min</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggleStatus(service)}
                                        className="p-3 bg-white/5 border border-white/5 hover:border-white/20 transition-all text-left"
                                    >
                                        <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-1">Status (Click p/ Alterar)</p>
                                        <p className={`text-sm font-bold tracking-tighter ${service.isActive ? 'text-acid-green' : 'text-red-500'}`}>
                                            {service.isActive ? 'Ativo' : 'Inativo'}
                                        </p>
                                    </button>
                                </div>

                                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                    <div>
                                        <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-1">Preço</p>
                                        <p className="text-lg font-bold text-white tracking-tighter">
                                            {service.isPaid ? `AOA ${service.price.toLocaleString()}` : 'Gratuito'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleOpenEdit(service)}
                                            className="p-2 hover:bg-white/5 text-white/20 hover:text-primary transition-all"
                                            title="Editar Serviço"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service.id)}
                                            className="p-2 hover:bg-white/5 text-white/20 hover:text-red-500 transition-all"
                                            title="Excluir Serviço"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* CREATE / EDIT MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-[#0A0A0A] border border-white/10 p-10 w-full max-w-xl relative overflow-y-auto max-h-[90vh]"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
                                type="button"
                            >
                                <X />
                            </button>

                            <h2 className="text-3xl font-display font-bold text-white mb-8 tracking-tighter uppercase">
                                {isEditMode ? 'Editar' : 'Novo'} <span className="text-primary italic">Serviço de Elite</span>
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Título do Serviço</label>
                                    <input
                                        type="text" placeholder="EX: CONSULTORIA ESTRATÉGICA"
                                        className="w-full bg-white/5 border border-white/5 p-4 text-xs font-bold text-white outline-none focus:border-primary/50 transition-all"
                                        value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Descrição</label>
                                    <textarea
                                        rows={3}
                                        placeholder="DESCREVA O SERVIÇO..."
                                        className="w-full bg-white/5 border border-white/5 p-4 text-xs font-bold text-white outline-none focus:border-primary/50 transition-all resize-none"
                                        value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Preço (AOA)</label>
                                        <input
                                            type="number" placeholder="0"
                                            className="w-full bg-white/5 border border-white/5 p-4 text-xs font-bold text-white outline-none focus:border-primary/50"
                                            value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required={formData.isPaid}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Duração (Minutos)</label>
                                        <input
                                            type="number" placeholder="60"
                                            className="w-full bg-white/5 border border-white/5 p-4 text-xs font-bold text-white outline-none focus:border-primary/50"
                                            value={formData.durationMinutes} onChange={e => setFormData({ ...formData, durationMinutes: e.target.value })} required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <label className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.isPaid}
                                            onChange={e => setFormData({ ...formData, isPaid: e.target.checked })}
                                            className="accent-primary"
                                        />
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Serviço Pago</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.requiresApproval}
                                            onChange={e => setFormData({ ...formData, requiresApproval: e.target.checked })}
                                            className="accent-primary"
                                        />
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Requer Aprovação</span>
                                    </label>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Ordem de Exibição</label>
                                        <input
                                            type="number"
                                            className="w-full bg-white/5 border border-white/5 p-4 text-xs font-bold text-white outline-none focus:border-primary/50"
                                            value={formData.order} onChange={e => setFormData({ ...formData, order: e.target.value })}
                                        />
                                    </div>
                                    <label className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 cursor-pointer mt-4">
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                                            className="accent-acid-green"
                                        />
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Item Ativo</span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-5 bg-primary text-black font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                                >
                                    {isEditMode ? 'Salvar Alterações' : 'Registar Serviço no Sistema'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
