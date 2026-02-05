import { useState, useEffect } from 'react';
import {
    Clock,
    User,
    FileSearch,
    Loader2,
    RefreshCw,
    Globe
} from 'lucide-react';
import api from '../../services/api';

import { Helmet } from 'react-helmet-async';

export default function AuditLogs() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('ALL');


    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/logs');
            setLogs(response.data.logs);
        } catch (error) {
            console.error("Failed to fetch logs", error);
        } finally {
            setLoading(false);
        }
    };

    const getActionColor = (action: string) => {
        if (action.includes('DELETE')) return 'text-red-500 bg-red-500/10';
        if (action.includes('CREATE')) return 'text-acid-green bg-acid-green/10';
        if (action.includes('UPDATE')) return 'text-blue-400 bg-blue-400/10';
        if (action.includes('LOGIN')) return 'text-orange-400 bg-orange-400/10';
        return 'text-white/40 bg-white/5';
    };

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'ALL' || log.action.includes(filterType);
        return matchesSearch && matchesType;
    });


    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <Helmet>
                <title>Auditoria | Monteiro Universal Portal</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
                        SISTEMA DE <span className="text-primary italic">AUDITORIA</span>
                    </h1>
                    <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em] mt-1">Rastreabilidade total de operações administrativas</p>
                </div>

                <button
                    onClick={fetchLogs}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    Atualizar Logs
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white/5 border border-white/5 items-center">
                <div className="flex-1 flex gap-3 px-4 py-2 bg-black border border-white/10 items-center w-full">
                    <FileSearch className="w-4 h-4 text-white/20" />
                    <input
                        type="text"
                        placeholder="PESQUISAR POR OPERAÇÃO OU EXECUTOR..."
                        className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest w-full text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-black border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-primary w-full md:w-auto"
                >
                    <option value="ALL">TODAS AS OPERAÇÕES</option>
                    <option value="CREATE">CRIAÇÃO (CREATE)</option>
                    <option value="UPDATE">EDIÇÃO (UPDATE)</option>
                    <option value="DELETE">REMOÇÃO (DELETE)</option>
                    <option value="LOGIN">SESSÃO (LOGIN)</option>
                </select>
            </div>

            {loading ? (
                <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-primary" /></div>
            ) : (
                <div className="bg-deep-charcoal border border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.01]">
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Data / Hora</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Operação</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Executor</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">IP / Origem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono">
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-3 h-3 text-white/20" />
                                            <span className="text-[10px] text-white/60">
                                                {new Date(log.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className={`px-2 py-1 text-[9px] font-bold uppercase inline-block w-fit ${getActionColor(log.action)}`}>
                                                {log.action}
                                            </span>
                                            {log.description && (
                                                <span className="text-[8px] text-white/20 truncate max-w-[200px]">{log.description}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                                                <User className="w-3 h-3 text-white/40" />
                                            </div>
                                            <span className="text-[10px] text-white font-bold uppercase">{log.user?.name || 'Sistema'}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-3 h-3 text-white/20" />
                                            <span className="text-[10px] text-white/40">{log.ipAddress || log.ip || '---'}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredLogs.length === 0 && (

                        <div className="py-20 text-center border-t border-white/5">
                            <FileSearch className="w-12 h-12 text-white/10 mx-auto mb-4" />
                            <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">Nenhum rastro encontrado</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
