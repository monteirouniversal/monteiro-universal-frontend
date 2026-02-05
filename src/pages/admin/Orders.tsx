import { useState, useEffect } from 'react';
import { Plus, ClipboardList, Loader2, MoreVertical, ArrowRightCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

import api from '../../services/api';
import { toast } from 'sonner';

export default function Orders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/orders');
            setOrders(response.data.orders);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };

    const handleConvert = async (orderId: string) => {
        try {
            await api.post(`/admin/orders/${orderId}/convert`);
            toast.success('PEDIDO APROVADO', { description: 'Convertido em projeto com sucesso.' });
            fetchOrders();
        } catch (error) {
            toast.error('Erro ao converter pedido');
        }
    };

    const getPriorityColor = (p: string) => {
        switch (p) {
            case 'URGENT': return 'text-red-500 bg-red-500/10 border-red-500/20';
            case 'HIGH': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            case 'MEDIUM': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            default: return 'text-white/40 bg-white/5 border-white/10';
        }
    };

    const filteredOrders = filter === 'ALL' ? orders : orders.filter(o => o.status === filter);

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
                        LISTA DE <span className="text-primary italic">SOLICITAÇÕES</span>
                    </h1>
                    <p className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em] mt-1">Triagem e aprovação de novos serviços</p>
                </div>

                <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                    <Plus className="w-4 h-4" />
                    Registrar Pedido
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex border-b border-white/5 gap-8 overflow-x-auto scrollbar-hide">
                {['ALL', 'PENDING', 'APPROVED', 'IN_PROGRESS', 'COMPLETED'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${filter === f ? 'text-primary' : 'text-white/20 hover:text-white/60'}`}
                    >
                        {f === 'ALL' ? 'Todos' : f.replace('_', ' ')}
                        {filter === f && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-primary" /></div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="bg-deep-charcoal border border-white/5 p-6 hover:border-white/10 transition-all group">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                                {/* Left: Code & Status */}
                                <div className="flex items-center gap-6 min-w-[200px]">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                                        <ClipboardList className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-white font-black text-sm tracking-tighter">{order.code}</p>
                                        <span className={`text-[8px] font-bold px-2 py-0.5 border uppercase ${getPriorityColor(order.priority)}`}>
                                            Prioridade {order.priority}
                                        </span>
                                    </div>
                                </div>

                                {/* Middle: Info */}
                                <div className="flex-1 space-y-2">
                                    <p className="text-xs font-bold text-white group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-tight">
                                        {order.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4 text-[10px] text-white/40 font-medium">
                                        <div className="flex items-center gap-1.5 border-r border-white/10 pr-4">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            CLIENTE: {order.client.name}
                                        </div>
                                        <div className="flex items-center gap-1.5 border-r border-white/10 pr-4">
                                            <Clock className="w-3 h-3" />
                                            DATA: {new Date(order.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            SERVIÇO: {order.service?.name || 'N/A'}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Actions */}
                                <div className="flex items-center gap-4 border-l border-white/5 pl-8">
                                    <div className="text-right mr-4">
                                        <p className="text-sm font-display font-bold text-white uppercase tracking-tighter">
                                            {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(order.amount || 0)}
                                        </p>
                                        <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{order.status}</p>
                                    </div>

                                    {order.status === 'PENDING' && (
                                        <button
                                            onClick={() => handleConvert(order.id)}
                                            className="px-4 py-2 bg-acid-green text-black text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2"
                                        >
                                            Aprovar <ArrowRightCircle className="w-3 h-3" />
                                        </button>
                                    )}

                                    <button className="p-2 text-white/20 hover:text-white transition-colors">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredOrders.length === 0 && (
                        <div className="py-20 text-center border border-dashed border-white/10">
                            <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">Nenhuma solicitação nesta categoria</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
