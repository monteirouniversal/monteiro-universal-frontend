import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    CheckCircle,
    Calendar,
    FileText,
    PieChart,
    Plus
} from 'lucide-react';
import api from '../../services/api';

interface FiscalData {
    month: string;
    invoices: {
        count: number;
        total: number;
        ivaCollected: number;
        retentionCredit: number;
    };
    expenses: {
        count: number;
        total: number;
        ivaDeductible: number;
    };
    balance: {
        ivaToPay: number;
        ivaCredit: number;
        netProfit: number;
    };
    intelligence: {
        auditRisk: 'BAIXO' | 'MÉDIO' | 'CRÍTICO';
        riskMessage: string;
        margin: string;
    };
    calendar: Array<{
        day: number;
        event: string;
        status: 'DONE' | 'PENDING';
        desc: string;
    }>;
}

export default function FiscalIntelligence() {
    const [data, setData] = useState<FiscalData | null>(null);
    const [loading, setLoading] = useState(true);
    const [showExpenseForm, setShowExpenseForm] = useState(false);

    const [expenseForm, setExpenseForm] = useState({
        description: '',
        amount: '',
        ivaAmount: '',
        category: 'Equipment',
        vendorNif: '',
        vendorName: ''
    });

    useEffect(() => {
        fetchFiscalData();
    }, []);

    const fetchFiscalData = async () => {
        try {
            const response = await api.get('/fiscal/overview');
            setData(response.data);
        } catch (error) {
            console.error('Erro ao carregar dados fiscais:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddExpense = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/fiscal/expenses', expenseForm);
            setShowExpenseForm(false);
            setExpenseForm({
                description: '',
                amount: '',
                ivaAmount: '',
                category: 'Equipment',
                vendorNif: '',
                vendorName: ''
            });
            fetchFiscalData();
        } catch (error) {
            console.error('Erro ao adicionar despesa:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="text-gold text-sm uppercase tracking-widest animate-pulse">
                    Calculando Inteligência Fiscal...
                </div>
            </div>
        );
    }

    if (!data) return null;

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'CRÍTICO': return 'text-red-500 border-red-500/30 bg-red-500/5';
            case 'MÉDIO': return 'text-yellow-500 border-yellow-500/30 bg-yellow-500/5';
            default: return 'text-green-500 border-green-500/30 bg-green-500/5';
        }
    };

    const getRiskIcon = (risk: string) => {
        switch (risk) {
            case 'CRÍTICO': return <AlertTriangle className="w-6 h-6" />;
            case 'MÉDIO': return <TrendingUp className="w-6 h-6" />;
            default: return <CheckCircle className="w-6 h-6" />;
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
                            Inteligência Fiscal
                        </h1>
                        <p className="text-xs uppercase tracking-widest text-white/40 mt-1">
                            Estratégia Financeira • {data.month}
                        </p>
                    </div>
                </div>
            </div>

            {/* Audit Risk Alert */}
            <div className={`border-2 p-6 mb-8 ${getRiskColor(data.intelligence.auditRisk)}`}>
                <div className="flex items-start gap-4">
                    {getRiskIcon(data.intelligence.auditRisk)}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-black uppercase tracking-widest">
                                Risco de Auditoria: {data.intelligence.auditRisk}
                            </span>
                            <span className="text-xs font-bold opacity-60">
                                Margem: {data.intelligence.margin}
                            </span>
                        </div>
                        <p className="text-sm font-medium leading-relaxed opacity-80">
                            {data.intelligence.riskMessage}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                {/* Invoices (Output) */}
                <div className="bg-white/[0.02] border border-white/10 p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <FileText className="w-5 h-5 text-gold" />
                        <h3 className="text-xs font-black uppercase tracking-widest text-white/60">
                            Vendas (Output)
                        </h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="text-3xl font-black text-gold mb-1">
                                {data.invoices.total.toLocaleString()} Kz
                            </div>
                            <div className="text-[10px] uppercase tracking-widest text-white/40">
                                {data.invoices.count} Faturas Emitidas
                            </div>
                        </div>
                        <div className="pt-4 border-t border-white/5 space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-white/40 uppercase tracking-wider">IVA Cobrado</span>
                                <span className="font-bold text-gold">{data.invoices.ivaCollected.toLocaleString()} Kz</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-white/40 uppercase tracking-wider">Retenção (Crédito)</span>
                                <span className="font-bold text-green-500">{data.invoices.retentionCredit.toLocaleString()} Kz</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expenses (Input) */}
                <div className="bg-white/[0.02] border border-white/10 p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <TrendingDown className="w-5 h-5 text-red-400" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-white/60">
                                Despesas (Input)
                            </h3>
                        </div>
                        <button
                            onClick={() => setShowExpenseForm(true)}
                            className="p-2 bg-gold/10 border border-gold/30 hover:bg-gold/20 transition-all"
                        >
                            <Plus className="w-4 h-4 text-gold" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="text-3xl font-black text-red-400 mb-1">
                                {data.expenses.total.toLocaleString()} Kz
                            </div>
                            <div className="text-[10px] uppercase tracking-widest text-white/40">
                                {data.expenses.count} Despesas Registadas
                            </div>
                        </div>
                        <div className="pt-4 border-t border-white/5">
                            <div className="flex justify-between text-xs">
                                <span className="text-white/40 uppercase tracking-wider">IVA Dedutível</span>
                                <span className="font-bold text-green-500">{data.expenses.ivaDeductible.toLocaleString()} Kz</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Balance */}
                <div className="bg-gradient-to-br from-gold/10 to-gold/5 border-2 border-gold/30 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <PieChart className="w-5 h-5 text-gold" />
                        <h3 className="text-xs font-black uppercase tracking-widest text-gold">
                            Balanço Fiscal
                        </h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                                IVA a Pagar (Dia 15)
                            </div>
                            <div className="text-3xl font-black text-gold">
                                {data.balance.ivaToPay.toLocaleString()} Kz
                            </div>
                        </div>
                        {data.balance.ivaCredit > 0 && (
                            <div className="pt-4 border-t border-gold/20">
                                <div className="text-[10px] uppercase tracking-widest text-green-400 mb-1">
                                    Crédito para Próximo Mês
                                </div>
                                <div className="text-xl font-black text-green-500">
                                    {data.balance.ivaCredit.toLocaleString()} Kz
                                </div>
                            </div>
                        )}
                        <div className="pt-4 border-t border-gold/20">
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                                Lucro Líquido
                            </div>
                            <div className="text-2xl font-black text-white">
                                {data.balance.netProfit.toLocaleString()} Kz
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fiscal Calendar */}
            <div className="bg-white/[0.02] border border-white/10 p-6 backdrop-blur-sm mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-5 h-5 text-gold" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-white/60">
                        Calendário Fiscal
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.calendar.map((event) => (
                        <div
                            key={event.day}
                            className={`border p-4 ${event.status === 'DONE'
                                    ? 'border-green-500/30 bg-green-500/5'
                                    : 'border-yellow-500/30 bg-yellow-500/5'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl font-black text-gold">Dia {event.day}</span>
                                {event.status === 'DONE' ? (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                )}
                            </div>
                            <div className="text-xs font-black uppercase tracking-wider text-white mb-1">
                                {event.event}
                            </div>
                            <div className="text-[10px] text-white/40 leading-relaxed">
                                {event.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Expense Form Modal */}
            {showExpenseForm && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#0A0A0A] border-2 border-gold/30 p-8 max-w-2xl w-full">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-gold mb-6">
                            Registar Nova Despesa
                        </h2>
                        <form onSubmit={handleAddExpense} className="space-y-6">
                            <div>
                                <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">
                                    Descrição
                                </label>
                                <input
                                    type="text"
                                    value={expenseForm.description}
                                    onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 p-4 text-sm text-white outline-none focus:border-gold transition-all"
                                    placeholder="Ex: Compra de Laptop Dell XPS 15"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">
                                        Valor Total
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={expenseForm.amount}
                                        onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 p-4 text-sm text-gold font-bold outline-none focus:border-gold transition-all"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">
                                        IVA Dedutível
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={expenseForm.ivaAmount}
                                        onChange={(e) => setExpenseForm({ ...expenseForm, ivaAmount: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 p-4 text-sm text-green-500 font-bold outline-none focus:border-gold transition-all"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">
                                    Categoria
                                </label>
                                <select
                                    value={expenseForm.category}
                                    onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 p-4 text-sm text-white outline-none focus:border-gold transition-all"
                                >
                                    <option value="Equipment">Equipamento</option>
                                    <option value="License">Licenças de Software</option>
                                    <option value="Internet">Internet/Telecomunicações</option>
                                    <option value="Office">Escritório</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Training">Formação</option>
                                    <option value="Other">Outros</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">
                                        NIF do Fornecedor
                                    </label>
                                    <input
                                        type="text"
                                        value={expenseForm.vendorNif}
                                        onChange={(e) => setExpenseForm({ ...expenseForm, vendorNif: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 p-4 text-sm text-white outline-none focus:border-gold transition-all"
                                        placeholder="5000XXXXXX"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">
                                        Nome do Fornecedor
                                    </label>
                                    <input
                                        type="text"
                                        value={expenseForm.vendorName}
                                        onChange={(e) => setExpenseForm({ ...expenseForm, vendorName: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 p-4 text-sm text-white outline-none focus:border-gold transition-all"
                                        placeholder="Nome da Empresa"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-gold text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-white transition-all"
                                >
                                    Registar Despesa
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowExpenseForm(false)}
                                    className="flex-1 bg-white/5 border border-white/10 text-white py-4 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
