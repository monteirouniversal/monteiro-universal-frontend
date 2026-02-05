import { useState, useEffect } from 'react';
import {
    Plus,
    Briefcase,
    Clock,
    MoreVertical,
    Loader2,
    X,
    Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import socket from '../../services/socket';

export default function Projects() {
    const [projects, setProjects] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        type: 'WEB_SYSTEM',
        status: 'PLANNING',
        userId: '',
        commissionRate: '10'
    });

    useEffect(() => {
        fetchData();
        socket.on('admin:project_created', fetchData);
        socket.on('admin:project_updated', fetchData);

        return () => {
            socket.off('admin:project_created');
            socket.off('admin:project_updated');
        };
    }, []);

    const fetchData = async () => {
        try {
            const [projRes, userRes] = await Promise.all([
                api.get('/admin/projects'),
                api.get('/admin/users')
            ]);
            setProjects(projRes.data.projects);
            // Filter clients only for project assignment
            setUsers(userRes.data.users.filter((u: any) => u.role === 'CLIENT'));
        } catch (error) {
            console.error("Failed to fetch projects data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/admin/projects', formData);
            setIsModalOpen(false);
            setFormData({ name: '', type: 'WEB_SYSTEM', status: 'PLANNING', userId: '', commissionRate: '10' });
            fetchData();
        } catch (error) {
            alert("Erro ao criar projeto");
        }
    };

    const projectTypes = [
        { value: 'WEB_SYSTEM', label: 'E-Commerce / SAAS' },
        { value: 'MOBILE_APP', label: 'Aplicação Mobile' },
        { value: 'CRM_CUSTOM', label: 'CRM Personalizado' },
        { value: 'INFRASTRUCTURE', label: 'Infraestrutura' },
    ];

    const statusMap: any = {
        PLANNING: { label: 'Planeamento', color: 'text-blue-400', bg: 'bg-blue-400/10' },
        IN_PROGRESS: { label: 'Em Produção', color: 'text-primary', bg: 'bg-primary/10' },
        ON_HOLD: { label: 'Pausado', color: 'text-orange-400', bg: 'bg-orange-400/10' },
        COMPLETED: { label: 'Concluído', color: 'text-acid-green', bg: 'bg-acid-green/10' },
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
                        GESTÃO DE <span className="text-primary italic">PROJETOS</span>
                    </h1>
                    <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em] mt-1">Pipeline de desenvolvimento e infraestrutura</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Novo Projeto
                </button>
            </div>

            {loading ? (
                <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-primary" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-deep-charcoal border border-white/5 p-6 relative group overflow-hidden"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-white/5 border border-white/10">
                                    <Briefcase className="w-5 h-5 text-primary" />
                                </div>
                                <div className={`px-2 py-1 text-[8px] font-black uppercase tracking-widest ${statusMap[project.status].bg} ${statusMap[project.status].color}`}>
                                    {statusMap[project.status].label}
                                </div>
                            </div>

                            <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {project.name}
                            </h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-[10px] text-white/40 font-medium">
                                    <Layers className="w-3 h-3" />
                                    <span>{project.type}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-white/40 font-medium">
                                    <Clock className="w-3 h-3" />
                                    <span>Iniciado em {new Date(project.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                <div>
                                    <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-1">Cliente Responsável</p>
                                    <p className="text-[10px] font-bold text-white/60">{project.user?.name || 'Não atribuído'}</p>
                                </div>
                                <button className="p-2 hover:bg-white/5 text-white/20 hover:text-white transition-all">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* CREATE MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-[#0A0A0A] border border-white/10 p-8 w-full max-w-lg relative"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
                                type="button"
                            >
                                <X />
                            </button>

                            <h2 className="text-2xl font-display font-bold text-white mb-8 tracking-tighter">
                                ABRIR NOVO <span className="text-primary italic">CONTENÇÃO/PROJETO</span>
                            </h2>

                            <form onSubmit={handleCreateProject} className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Nome do Projeto</label>
                                    <input
                                        type="text" placeholder="EX: E-COMMERCE SÓ SABORES"
                                        className="w-full bg-white/5 border border-white/5 p-4 text-xs font-bold text-white outline-none focus:border-primary/50 transition-all"
                                        value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Tipo de Solução</label>
                                        <select
                                            className="w-full bg-white/5 border border-white/5 p-4 text-xs font-bold text-white outline-none focus:border-primary/50"
                                            value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}
                                        >
                                            {projectTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Status Inicial</label>
                                        <select
                                            className="w-full bg-white/5 border border-white/5 p-4 text-xs font-bold text-white outline-none focus:border-primary/50"
                                            value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="PLANNING">Planeamento</option>
                                            <option value="IN_PROGRESS">Em Produção</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Atribuir a Cliente</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/5 p-4 text-xs font-bold text-white outline-none focus:border-primary/50"
                                        value={formData.userId} onChange={e => setFormData({ ...formData, userId: e.target.value })}
                                        required
                                    >
                                        <option value="">SELECIONE UM CLIENTE...</option>
                                        {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Comissão Operacional (%)</label>
                                    <input
                                        type="number" step="0.1"
                                        className="w-full bg-white/5 border border-white/5 p-4 text-xs font-bold text-white outline-none focus:border-primary/50 transition-all"
                                        value={formData.commissionRate} onChange={e => setFormData({ ...formData, commissionRate: e.target.value })} required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-5 bg-primary text-black font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                                >
                                    Inicializar Projeto
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
