import { useState, useEffect } from 'react';
import {
    Globe,
    Lock,
    Save,
    Activity,
    RefreshCw,
    Loader2,
    Building2,
    Phone,
    Mail,
    MapPin,
    CreditCard
} from 'lucide-react';
import api from '../../services/api';
import { toast } from 'sonner';

export default function Settings() {
    const [settings, setSettings] = useState<any>({
        companyName: 'Monteiro Universal',
        companyNif: '',
        companyEmail: '',
        companyPhone: '',
        companyAddress: '',
        companyIban: '',
        maintenanceMode: false
    });

    const [health, setHealth] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const settingsRes = await api.get('/admin/settings');
            const healthRes = await api.get('/admin/health');
            setSettings(settingsRes.data.settings);
            setHealth(healthRes.data);
        } catch (error) {
            console.error("Failed to fetch settings/health", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put('/admin/settings', settings);
            toast.success('CONFIGURAÇÕES ATUALIZADAS', { description: 'As alterações foram salvas permanentemente.' });
        } catch (error) {
            toast.error('Erro ao salvar configurações');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="py-20 text-center">
            <Loader2 className="animate-spin mx-auto text-primary" />
        </div>
    );

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
                        PAINEL DE <span className="text-primary italic">CONFIGURAÇÕES</span>
                    </h1>
                    <p className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em] mt-1">Gestão global do ecossistema Monteiro Universal</p>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-3 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Salvar Alterações
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-deep-charcoal border border-white/5 p-8 relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-8">
                            <Building2 className="w-5 h-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b border-primary/20 pb-2 flex-1">Perfil da Empresa</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Nome Comercial</label>
                                <input
                                    type="text"
                                    className="w-full bg-black border border-white/10 p-4 text-xs font-bold text-white outline-none focus:border-primary transition-all"
                                    value={settings.companyName || ''}
                                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-white/40">NIF (Contribuinte)</label>
                                <input
                                    type="text"
                                    className="w-full bg-black border border-white/10 p-4 text-xs font-bold text-white outline-none focus:border-primary transition-all"
                                    value={settings.companyNif || ''}
                                    onChange={(e) => setSettings({ ...settings, companyNif: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Email Corporativo</label>
                                <div className="flex items-center gap-3 bg-black border border-white/10 p-4">
                                    <Mail className="w-4 h-4 text-white/20" />
                                    <input
                                        type="email"
                                        className="w-full bg-transparent border-none outline-none text-xs font-bold text-white"
                                        value={settings.companyEmail || ''}
                                        onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Telefone</label>
                                <div className="flex items-center gap-3 bg-black border border-white/10 p-4">
                                    <Phone className="w-4 h-4 text-white/20" />
                                    <input
                                        type="text"
                                        className="w-full bg-transparent border-none outline-none text-xs font-bold text-white"
                                        value={settings.companyPhone || ''}
                                        onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Endereço Sede</label>
                                <div className="flex items-center gap-3 bg-black border border-white/10 p-4">
                                    <MapPin className="w-4 h-4 text-white/20" />
                                    <input
                                        type="text"
                                        className="w-full bg-transparent border-none outline-none text-xs font-bold text-white"
                                        value={settings.companyAddress || ''}
                                        onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-white/40">IBAN para Recebimentos</label>
                                <div className="flex items-center gap-3 bg-black border border-white/10 p-4">
                                    <CreditCard className="w-4 h-4 text-white/20" />
                                    <input
                                        type="text"
                                        className="w-full bg-transparent border-none outline-none text-xs font-mono font-bold text-white"
                                        value={settings.companyIban || ''}
                                        onChange={(e) => setSettings({ ...settings, companyIban: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-deep-charcoal border border-white/5 p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <Lock className="w-5 h-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b border-primary/20 pb-2 flex-1">Segurança e Acesso</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest">Autenticação de Dois Fatores (2FA)</p>
                                    <p className="text-[9px] text-white/20 mt-1 uppercase">Aumente a segurança das contas administrativas</p>
                                </div>
                                <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-not-allowed">
                                    <div className="absolute left-1 top-1 w-3 h-3 bg-white/20 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="bg-black border border-white/10 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Activity className="w-5 h-5 text-acid-green" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Status do Sistema</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center py-3 border-b border-white/5">
                                <span className="text-[9px] font-bold text-white/40 uppercase">Versão do Software</span>
                                <span className="text-[10px] font-mono font-bold text-primary">{health?.version || '2.5.0-ENTERPRISE'}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-white/5">
                                <span className="text-[9px] font-bold text-white/40 uppercase">Conexão DB</span>
                                <span className="text-[9px] font-black text-blue-400 capitalize">{health?.database || 'CONNECTED'}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-white/5">
                                <span className="text-[9px] font-bold text-white/40 uppercase">Uptime Total</span>
                                <span className="text-[9px] font-bold text-white">{Math.floor((health?.uptime || 0) / 3600)}H {Math.floor(((health?.uptime || 0) % 3600) / 60)}M</span>
                            </div>

                            {/* Integrations Health */}
                            {health?.integrations?.length > 0 && (
                                <div className="pt-4 space-y-4">
                                    <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Latência de Integrações</p>
                                    {health.integrations.map((int: any) => (
                                        <div key={int.name} className="flex justify-between items-center bg-white/[0.02] p-2 border border-white/5">
                                            <span className="text-[9px] font-bold uppercase">{int.name}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[8px] text-acid-green font-black">{int.latency}</span>
                                                <div className="w-1.5 h-1.5 bg-acid-green rounded-full" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button
                                onClick={fetchData}
                                className="w-full flex items-center justify-center gap-2 py-4 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white/5 transition-all mt-4"
                            >
                                <RefreshCw className="w-3 h-3" /> Forçar Revalidação
                            </button>
                        </div>
                    </section>

                    <section className={`p-8 border transition-all duration-500 ${settings?.maintenanceMode ? 'bg-red-500/10 border-red-500/40' : 'bg-white/5 border-white/10'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <Globe className={`w-5 h-5 ${settings?.maintenanceMode ? 'text-red-500' : 'text-primary'}`} />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Modo Manutenção</h3>
                        </div>
                        <p className="text-[9px] text-white/40 uppercase leading-relaxed mb-6">Bloquear acesso de utilizadores base para intervenções técnicas.</p>

                        <button
                            onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                            className={`w-full py-3 text-[9px] font-black uppercase tracking-widest transition-all ${settings?.maintenanceMode ? 'bg-red-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                        >
                            {settings?.maintenanceMode ? 'Desativar Manutenção' : 'Ativar Manutenção'}
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
}
