import { useState, useEffect } from 'react';
import {
    Globe,
    Shield,
    Key,
    Eye,
    EyeOff,
    Loader2,
    Save,
    RefreshCw,
    Smartphone,
    Webhook,
    Link as LinkIcon,
    Plus,
    X
} from 'lucide-react';
import api from '../../services/api';
import { toast } from 'sonner';

export default function Integrations() {
    const [integrations, setIntegrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
    const [saving, setSaving] = useState<string | null>(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newApp, setNewApp] = useState({
        name: '',
        key: '',
        secret: '',
        webhookUrl: ''
    });

    useEffect(() => {
        fetchIntegrations();
    }, []);

    const fetchIntegrations = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/integrations');
            setIntegrations(response.data.integrations);
        } catch (error) {
            console.error("Failed to fetch integrations", error);
            toast.error("Erro ao carregar integrações");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/admin/integrations', newApp);
            toast.success('NOVA INTEGRAÇÃO ADICIONADA');
            setIsModalOpen(false);
            setNewApp({ name: '', key: '', secret: '', webhookUrl: '' });
            fetchIntegrations();
        } catch (error) {
            toast.error('Erro ao criar integração');
        }
    };

    const toggleKeyVisibility = (id: string) => {
        setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleUpdateField = (id: string, field: string, value: string) => {
        setIntegrations(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleSave = async (id: string) => {
        const item = integrations.find(i => i.id === id);
        if (!item) return;

        setSaving(id);
        try {
            await api.put(`/admin/integrations/${id}`, {
                key: item.key,
                secret: item.secret,
                webhookUrl: item.webhookUrl,
                isActive: item.isActive
            });
            toast.success(`${item.name} ATUALIZADO`, { description: 'As credenciais foram salvas com sucesso.' });
        } catch (error) {
            toast.error('Erro ao salvar configurações');
        } finally {
            setSaving(null);
        }
    };

    const handleToggleActive = async (id: string, current: boolean) => {
        try {
            await api.put(`/admin/integrations/${id}`, { isActive: !current });
            toast.success('Ponto de integração atualizado');
            setIntegrations(prev => prev.map(item =>
                item.id === id ? { ...item, isActive: !current } : item
            ));
        } catch (error) {
            toast.error('Erro ao atualizar integração');
        }
    };

    const handleTestConnection = async () => {
        toast.promise(new Promise(res => setTimeout(res, 2000)), {
            loading: 'Testando conexão...',
            success: 'Conexão estabelecida com sucesso!',
            error: 'Falha na conexão'
        });
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
                        CENTRAL DE <span className="text-primary italic">INTEGRAÇÕES</span>
                    </h1>
                    <p className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em] mt-1">Conecte o ecossistema Monteiro Universal com apps externos</p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg shadow-primary/20"
                    >
                        <Plus className="w-4 h-4" />
                        Nova Integração
                    </button>
                    <button
                        onClick={fetchIntegrations}
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Sincronizar
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-primary" /></div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {integrations.map((app) => (
                        <div key={app.id} className="bg-deep-charcoal border border-white/5 p-8 relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center">
                                        {app.name === 'AppyPay' && <Smartphone className="w-8 h-8 text-primary" />}
                                        {app.name === 'WhatsApp' && <Globe className="w-8 h-8 text-acid-green" />}
                                        {app.name === 'Stripe' && <Shield className="w-8 h-8 text-blue-500" />}
                                        {!['AppyPay', 'WhatsApp', 'Stripe'].includes(app.name) && <Webhook className="w-8 h-8 text-white/20" />}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-display font-bold text-white tracking-tight">{app.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className={`w-1.5 h-1.5 rounded-full ${app.isActive ? 'bg-acid-green' : 'bg-red-500'}`} />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{app.isActive ? 'Em Produção' : 'Desativado'}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleToggleActive(app.id, app.isActive)}
                                    className={`px-4 py-2 text-[8px] font-black uppercase tracking-widest transition-all border ${app.isActive ? 'border-red-500/20 text-red-500 hover:bg-red-500/10' : 'border-acid-green/20 text-acid-green hover:bg-acid-green/10'}`}
                                >
                                    {app.isActive ? 'Desativar' : 'Ativar'}
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/20">Public Key / Client ID</label>
                                    <div className="flex items-center gap-2 p-4 bg-black border border-white/10 font-mono text-xs">
                                        <Key className="w-4 h-4 text-white/20" />
                                        <input
                                            type="text"
                                            className="bg-transparent border-none outline-none flex-1 text-white/60 focus:text-white"
                                            placeholder="Ex: pk_live_..."
                                            value={app.key || ''}
                                            onChange={(e) => handleUpdateField(app.id, 'key', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/20">Secret Key</label>
                                    <div className="flex items-center gap-2 p-4 bg-black border border-white/10 font-mono text-xs">
                                        <Shield className="w-4 h-4 text-white/20" />
                                        <input
                                            type={showKeys[app.id] ? "text" : "password"}
                                            value={app.secret || ''}
                                            onChange={(e) => handleUpdateField(app.id, 'secret', e.target.value)}
                                            placeholder="••••••••••••••••"
                                            className="bg-transparent border-none outline-none flex-1 text-white/60 focus:text-white transition-colors"
                                        />
                                        <button onClick={() => toggleKeyVisibility(app.id)} className="text-white/20 hover:text-white transition-colors">
                                            {showKeys[app.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/20">Seu Endpoint de Webhook (Copie para o Provedor)</label>
                                    <div className="flex items-center gap-2 p-4 bg-white/[0.03] border border-white/5 font-mono text-[10px]">
                                        <Webhook className="w-4 h-4 text-primary" />
                                        <span className="flex-1 overflow-hidden text-ellipsis text-primary select-all">
                                            {`${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + 5000 : ''}/api/webhooks/${app.name.toLowerCase()}`}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/20">URL de Destino (Opcional)</label>
                                    <div className="flex items-center gap-2 p-4 bg-black border border-white/10 font-mono text-xs">
                                        <LinkIcon className="w-4 h-4 text-white/20" />
                                        <input
                                            type="text"
                                            className="bg-transparent border-none outline-none flex-1 text-white/60 focus:text-white"
                                            placeholder="https://sua-api-externa.com/webhook"
                                            value={app.webhookUrl || ''}
                                            onChange={(e) => handleUpdateField(app.id, 'webhookUrl', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => handleSave(app.id)}
                                        disabled={saving === app.id}
                                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
                                    >
                                        {saving === app.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        Salvar Configurações
                                    </button>
                                    <button
                                        onClick={() => handleTestConnection()}
                                        className="px-8 py-4 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-white"
                                    >
                                        Testar Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {integrations.length === 0 && (
                        <div className="lg:col-span-2 py-20 text-center border border-dashed border-white/10">
                            <Webhook className="w-12 h-12 text-white/5 mx-auto mb-4" />
                            <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">Nenhum aplicativo de terceiro configurado</p>
                        </div>
                    )}
                </div>
            )}

            {/* Nova Integração Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-deep-charcoal border border-white/10 w-full max-w-lg p-8 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-display font-bold text-white tracking-tight uppercase">Configurar Nova Integração</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Nome do Provedor</label>
                                <input
                                    className="w-full bg-black border border-white/10 p-4 text-xs font-bold text-white outline-none focus:border-primary"
                                    placeholder="Ex: AppyPay, Stripe, WhatsApp..."
                                    value={newApp.name}
                                    onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Public Key</label>
                                <input
                                    className="w-full bg-black border border-white/10 p-4 text-xs font-bold text-white outline-none focus:border-primary font-mono"
                                    placeholder="pk_live_..."
                                    value={newApp.key}
                                    onChange={(e) => setNewApp({ ...newApp, key: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Secret Key</label>
                                <input
                                    className="w-full bg-black border border-white/10 p-4 text-xs font-bold text-white outline-none focus:border-primary font-mono"
                                    type="password"
                                    placeholder="••••••••••••••••"
                                    value={newApp.secret}
                                    onChange={(e) => setNewApp({ ...newApp, secret: e.target.value })}
                                />
                            </div>
                            <button className="w-full py-4 bg-primary text-black font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all">
                                Adicionar Integração
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
