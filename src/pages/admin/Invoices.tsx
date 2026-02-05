import { useState, useEffect } from 'react';
import {
    Search,
    FileText,
    Download,
    Clock,
    ExternalLink,
    Loader2,
    Filter,
    Plus,
    Printer
} from 'lucide-react';
import api from '../../services/api';
import { Helmet } from 'react-helmet-async';

export default function Invoices() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/invoices');
            setInvoices(response.data.invoices || []);
        } catch (error) {
            console.error("Failed to fetch invoices", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (id: string, number: string, type: 'invoice' | 'receipt' | 'proforma') => {
        try {
            const response = await api.get(`/admin/invoices/${id}/download?type=${type}`, {
                responseType: 'blob'
            });
            const typeLabel = type === 'receipt' ? 'RECIBO' : type === 'proforma' ? 'PROFORMA' : 'FATURA';
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${typeLabel}-${number}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error", error);
            alert("Erro ao baixar documento");
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'PAID': return 'text-acid-green bg-acid-green/10 border-acid-green/20';
            case 'OVERDUE': return 'text-red-500 bg-red-500/10 border-red-500/20';
            case 'PENDING': return 'text-primary bg-primary/10 border-primary/20';
            default: return 'text-white/40 bg-white/5 border-white/10';
        }
    };

    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentData, setPaymentData] = useState({ method: 'TRANSFER', reference: '', notes: '' });
    const [isRegistering, setIsRegistering] = useState(false);

    const filteredInvoices = invoices.filter(inv =>
        inv.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openPaymentModal = (invoice: any) => {
        setSelectedInvoice(invoice);
        setPaymentData({ method: 'TRANSFER', reference: '', notes: '' });
        setIsPaymentModalOpen(true);
    };

    const handleRegisterPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedInvoice) return;

        setIsRegistering(true);
        try {
            await api.post(`/admin/invoices/${selectedInvoice.id}/pay`, paymentData);
            setInvoices(invoices.map(inv =>
                inv.id === selectedInvoice.id ? { ...inv, status: 'PAID' } : inv
            ));
            setIsPaymentModalOpen(false);
            alert("Pagamento registrado com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Erro ao registrar pagamento.");
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <Helmet>
                <title>Faturamento | Monteiro Universal</title>
            </Helmet>

            {/* ...Header... */}
            {/* ...Stats... */}
            {/* ...Toolbar... */}

            {/* HEADER AND STATS SECTIONS REMAIN SAME, JUST RE-RENDERING THE TABLE PART BELOW */}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
                        CENTRO DE <span className="text-primary italic">FACTURAÇÃO</span>
                    </h1>
                    <p className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em] mt-1">Gestão de faturas e conformidade fiscal AGT</p>
                </div>

                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                        <Printer className="w-4 h-4" />
                        Relatório Geral
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg shadow-primary/20">
                        <Plus className="w-4 h-4" />
                        Emitir Factura
                    </button>
                </div>
            </div>

            {/* Mini Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-deep-charcoal border border-white/5 p-6 border-l-primary border-l-2">
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Total a Receber</p>
                    <p className="text-2xl font-display font-bold text-white tracking-tight">
                        AOA {invoices.reduce((acc, inv) => inv.status === 'PENDING' ? acc + inv.amount : acc, 0).toLocaleString()}
                    </p>
                </div>
                <div className="bg-deep-charcoal border border-white/5 p-6 border-l-acid-green border-l-2">
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Total Liquidado</p>
                    <p className="text-2xl font-display font-bold text-acid-green tracking-tight">
                        AOA {invoices.reduce((acc, inv) => inv.status === 'PAID' ? acc + inv.amount : acc, 0).toLocaleString()}
                    </p>
                </div>
                <div className="bg-deep-charcoal border border-white/5 p-6 border-l-red-500 border-l-2">
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Faturas Vencidas</p>
                    <p className="text-2xl font-display font-bold text-red-500 tracking-tight">
                        {invoices.filter(inv => inv.status === 'OVERDUE').length} Docs
                    </p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-deep-charcoal border border-white/5 p-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                        type="text"
                        placeholder="PROCURAR POR NÚMERO OU CLIENTE..."
                        className="w-full bg-white/[0.02] border border-white/5 py-3 pl-12 pr-4 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-primary/50 transition-all text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-[9px] font-black uppercase text-white/40">
                        <Filter className="w-3 h-3" />
                        Filtros
                    </button>
                </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-deep-charcoal border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Fatura #</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Cliente</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Emissão</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Vencimento</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] text-right">Valor Total</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Estado</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr><td colSpan={7} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-primary" /></td></tr>
                            ) : filteredInvoices.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-20 text-center text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                                        Nenhuma fatura encontrada
                                    </td>
                                </tr>
                            ) : (
                                filteredInvoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-white/[0.01] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-white/5 flex items-center justify-center border border-white/10">
                                                    <FileText className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="font-mono text-xs font-bold text-white">{inv.number}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold uppercase tracking-tight text-white">{inv.clientName}</span>
                                                <span className="text-[9px] text-white/30 truncate max-w-[150px]">{inv.clientEmail}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-[10px] text-white/40 uppercase font-bold">
                                            {new Date(inv.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3 h-3 text-white/20" />
                                                <span className="text-[10px] font-bold text-white/60">{new Date(inv.dueDate).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-display font-bold text-white tracking-tighter text-right">
                                            AOA {inv.amount.toLocaleString()}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 text-[8px] font-black uppercase border ${getStatusStyle(inv.status)}`}>
                                                {inv.status === 'PAID' ? 'Liquidada' : inv.status === 'PENDING' ? 'Pendente' : 'Vencida'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 transition-opacity">
                                                {/* Actions based on Status */}

                                                {/* PRO-FORMA (Always available or mainly for Pending) */}
                                                <button
                                                    onClick={() => handleDownload(inv.id, inv.number, 'proforma')}
                                                    title="Baixar Pró-forma (Orçamento)"
                                                    className="p-2 bg-white/5 border border-white/10 text-white/40 hover:text-blue-400 transition-all hover:bg-white/10"
                                                >
                                                    <span className="text-[8px] font-black mr-1 hidden">PRO</span>
                                                    <span className="text-[8px] font-black mr-1 lg:inline">ORÇ</span>
                                                </button>

                                                {inv.status === 'PENDING' && (
                                                    <button
                                                        onClick={() => openPaymentModal(inv)}
                                                        title="Registrar Pagamento"
                                                        className="p-2 bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-black transition-all"
                                                    >
                                                        <span className="text-[8px] font-black mr-1 hidden lg:inline">PAGAR</span>
                                                        <Printer className="w-3 h-3 inline" />
                                                    </button>
                                                )}

                                                {inv.status === 'PAID' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleDownload(inv.id, inv.number, 'invoice')}
                                                            title="Baixar Fatura"
                                                            className="p-2 bg-white/5 border border-white/10 text-white/40 hover:text-primary transition-all hover:bg-white/10"
                                                        >
                                                            <span className="text-[8px] font-black mr-1 hidden lg:inline">FAT</span>
                                                            <Download className="w-3 h-3 inline" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDownload(inv.id, inv.number, 'receipt')}
                                                            title="Baixar Recibo (Comprovativo)"
                                                            className="p-2 bg-white/5 border border-white/10 text-white/40 hover:text-acid-green transition-all hover:bg-white/10"
                                                        >
                                                            <span className="text-[8px] font-black mr-1 hidden lg:inline">REC</span>
                                                            <Download className="w-3 h-3 inline" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payment Modal */}
            {isPaymentModalOpen && selectedInvoice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0A0A0A] border border-white/10 p-8 w-full max-w-md relative">
                        <button
                            onClick={() => setIsPaymentModalOpen(false)}
                            className="absolute top-4 right-4 text-white/40 hover:text-white"
                        >
                            <ExternalLink className="w-4 h-4 rotate-45" />
                        </button>

                        <h2 className="text-xl font-display font-bold text-white mb-6">
                            REGISTRAR <span className="text-primary italic">PAGAMENTO</span>
                        </h2>

                        <div className="mb-6 p-4 bg-white/5 border border-white/5">
                            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Fatura</p>
                            <p className="text-white font-bold">{selectedInvoice.number}</p>
                            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-4 mb-1">Valor Total</p>
                            <p className="text-xl text-primary font-display font-bold">AOA {selectedInvoice.amount.toLocaleString()}</p>
                        </div>

                        <form onSubmit={handleRegisterPayment} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-white/40 uppercase tracking-widest">Método</label>
                                <select
                                    className="w-full bg-black border border-white/10 p-3 text-sm text-white focus:border-primary outline-none"
                                    value={paymentData.method}
                                    onChange={e => setPaymentData({ ...paymentData, method: e.target.value })}
                                >
                                    <option value="TRANSFER">Transferência Bancária</option>
                                    <option value="CASH">Numerário (Caixa)</option>
                                    <option value="POS">TPA / Multicaixa</option>
                                    <option value="CHECK">Cheque</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-white/40 uppercase tracking-widest">Referência / Nº Talão</label>
                                <input
                                    type="text"
                                    className="w-full bg-black border border-white/10 p-3 text-sm text-white focus:border-primary outline-none"
                                    placeholder="Ex: 000012345"
                                    value={paymentData.reference}
                                    onChange={e => setPaymentData({ ...paymentData, reference: e.target.value })}
                                    required={paymentData.method !== 'CASH'}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isRegistering}
                                className="w-full py-4 bg-primary text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors flex items-center justify-center gap-2"
                            >
                                {isRegistering ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmar Pagamento"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
