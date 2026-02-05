import React, { useState } from 'react';
import { Send, Users, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'sonner';

export default function Campaigns() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        message: '',
        targetAudience: 'ALL_LEADS',
        type: 'EMAIL'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/campaigns', formData);
            toast.success(response.data.message || 'Campanha enviada com sucesso!');

            // Reset form
            setFormData({
                name: '',
                subject: '',
                message: '',
                targetAudience: 'ALL_LEADS',
                type: 'EMAIL'
            });
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Erro ao enviar campanha');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white p-8">

            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-1 h-12 bg-gradient-to-b from-gold to-gold/20" />
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tight text-white">
                            Campanhas de Marketing
                        </h1>
                        <p className="text-xs uppercase tracking-widest text-white/40 mt-1">
                            Email & SMS para Leads
                        </p>
                    </div>
                </div>
            </div>

            {/* Campaign Form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Form */}
                <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 p-8 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Campaign Name */}
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-black">
                                Nome da Campanha
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 p-4 text-sm text-white outline-none focus:border-gold transition-all"
                                placeholder="Ex: Promoção de Verão 2026"
                                required
                            />
                        </div>

                        {/* Target Audience */}
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-black">
                                Público-Alvo
                            </label>
                            <select
                                value={formData.targetAudience}
                                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 p-4 text-sm text-white outline-none focus:border-gold transition-all"
                            >
                                <option value="ALL_LEADS">Todos os Leads</option>
                                <option value="NEW_LEADS">Leads Novos</option>
                                <option value="CONTACTED_LEADS">Leads Contactados</option>
                                <option value="QUALIFIED_LEADS">Leads Qualificados</option>
                            </select>
                        </div>

                        {/* Type */}
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-black">
                                Tipo de Envio
                            </label>
                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: 'EMAIL' })}
                                    className={`p-4 border transition-all ${formData.type === 'EMAIL'
                                        ? 'border-gold bg-gold/10 text-gold'
                                        : 'border-white/10 bg-white/[0.02] text-white/40 hover:border-white/30'
                                        }`}
                                >
                                    <Mail className="w-5 h-5 mx-auto mb-2" />
                                    <span className="text-xs font-black uppercase tracking-wider">Email</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: 'SMS' })}
                                    className={`p-4 border transition-all ${formData.type === 'SMS'
                                        ? 'border-gold bg-gold/10 text-gold'
                                        : 'border-white/10 bg-white/[0.02] text-white/40 hover:border-white/30'
                                        }`}
                                >
                                    <MessageSquare className="w-5 h-5 mx-auto mb-2" />
                                    <span className="text-xs font-black uppercase tracking-wider">SMS</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: 'BOTH' })}
                                    className={`p-4 border transition-all ${formData.type === 'BOTH'
                                        ? 'border-gold bg-gold/10 text-gold'
                                        : 'border-white/10 bg-white/[0.02] text-white/40 hover:border-white/30'
                                        }`}
                                >
                                    <Send className="w-5 h-5 mx-auto mb-2" />
                                    <span className="text-xs font-black uppercase tracking-wider">Ambos</span>
                                </button>
                            </div>
                        </div>

                        {/* Subject (Email only) */}
                        {(formData.type === 'EMAIL' || formData.type === 'BOTH') && (
                            <div>
                                <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-black">
                                    Assunto do Email
                                </label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 p-4 text-sm text-white outline-none focus:border-gold transition-all"
                                    placeholder="Ex: Oferta Exclusiva - 20% de Desconto"
                                    required
                                />
                            </div>
                        )}

                        {/* Message */}
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-black">
                                Mensagem
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 p-4 text-sm text-white outline-none focus:border-gold transition-all min-h-[200px]"
                                placeholder="Digite a mensagem da campanha..."
                                required
                            />
                            <div className="text-[10px] text-white/40 mt-2 uppercase tracking-wider">
                                {formData.message.length} caracteres
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gold text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Enviar Campanha
                                </>
                            )}
                        </button>

                    </form>
                </div>

                {/* Info Sidebar */}
                <div className="space-y-6">

                    {/* Tips */}
                    <div className="bg-gradient-to-br from-gold/10 to-gold/5 border-2 border-gold/30 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="w-5 h-5 text-gold" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-gold">
                                Dicas de Sucesso
                            </h3>
                        </div>
                        <ul className="space-y-3 text-xs text-white/60 leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-gold mt-1">•</span>
                                <span>Use assuntos curtos e chamativos (máx. 50 caracteres)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gold mt-1">•</span>
                                <span>Personalize a mensagem com o nome do lead</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gold mt-1">•</span>
                                <span>Inclua um call-to-action claro</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gold mt-1">•</span>
                                <span>Evite palavras spam (grátis, urgente, clique aqui)</span>
                            </li>
                        </ul>
                    </div>

                    {/* Warning */}
                    <div className="bg-red-500/5 border border-red-500/30 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-red-500">
                                Atenção
                            </h3>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed">
                            Campanhas em massa podem ser marcadas como spam. Certifique-se de que os destinatários autorizaram o recebimento de comunicações.
                        </p>
                    </div>

                    {/* Stats Preview */}
                    <div className="bg-white/[0.02] border border-white/10 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="w-5 h-5 text-gold" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-white/60">
                                Alcance Estimado
                            </h3>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-gold mb-2">
                                {formData.targetAudience === 'ALL_LEADS' ? '~100' : '~25'}
                            </div>
                            <div className="text-[10px] uppercase tracking-widest text-white/40">
                                Destinatários
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}
