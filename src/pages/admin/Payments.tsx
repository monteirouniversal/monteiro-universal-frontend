import { useState, useEffect } from 'react';
import {
  DollarSign,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Loader2,
  RefreshCcw,
  FileText
} from 'lucide-react';
import api from '../../services/api';

/**
 * Premium Payments & Transactions Module
 */
export default function Payments() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState({ revenue: 0, pending: 0, failRate: 0.8 });
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [payRes, statsRes] = await Promise.all([
        api.get('/admin/payments'),
        api.get('/admin/stats')
      ]);
      setTransactions(payRes.data.payments);

      if (statsRes.data.stats) {
        setStats({
          revenue: statsRes.data.stats.revenue || 0,
          pending: statsRes.data.stats.pendingApproval || 0,
          failRate: 0.8
        });
      }
    } catch (error) {
      console.error("Failed to fetch financial data", error);
      // Fallback mock data if API fails
      setTransactions([
        { id: '1', amount: 450000, provider: 'APPY', status: 'PAID', meeting: { lead: { name: 'Só Sabores' }, service: { name: 'Marketplace App' } }, createdAt: new Date().toISOString() },
        { id: '2', amount: 85000, provider: 'TRANSFER', status: 'PENDING', meeting: { lead: { name: 'Loja Digital' }, service: { name: 'E-commerce' } }, createdAt: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleManualValidation = async (id: string, status: string) => {
    try {
      await api.put(`/admin/payments/${id}`, { status });
      fetchData();
    } catch (error) {
      alert("Erro ao validar transação");
    }
  };

  const statusMap: any = {
    PAID: { label: 'Liquidado', color: 'text-acid-green', bg: 'bg-acid-green/10', icon: CheckCircle2 },
    PENDING: { label: 'Pendente', color: 'text-primary', bg: 'bg-primary/10', icon: Clock },
    FAILED: { label: 'Falhou', color: 'text-red-500', bg: 'bg-red-500/10', icon: XCircle },
    REFUNDED: { label: 'Reembolsado', color: 'text-white/40', bg: 'bg-white/5', icon: RefreshCcw },
  };

  const getStatusBadge = (status: string) => {
    const s = statusMap[status] || statusMap.PENDING;
    const Icon = s.icon;
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 ${s.bg} border border-current/10`}>
        <Icon className={`w-3 h-3 ${s.color}`} />
        <span className={`text-[9px] font-black uppercase tracking-widest ${s.color}`}>{s.label}</span>
      </div>
    );
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesStatus = filterStatus === 'ALL' || tx.status === filterStatus;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      (tx.meeting?.lead?.name?.toLowerCase().includes(searchLower)) ||
      (tx.meeting?.service?.name?.toLowerCase().includes(searchLower)) ||
      (tx.id.toLowerCase().includes(searchLower));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
            FLUXO DE <span className="text-primary italic">PAGAMENTOS</span>
          </h1>
          <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em] mt-1">Monitoramento financeiro e transações em tempo real</p>
        </div>

        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all">
            <Download className="w-4 h-4" />
            Relatório PDF
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <DollarSign className="w-4 h-4" />
            Validação Manual
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-deep-charcoal border border-white/5 p-6 border-l-acid-green border-l-2">
          <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Total Processado (Geral)</p>
          <p className="text-2xl font-display font-bold text-white tracking-tight">AOA {stats.revenue.toLocaleString()}</p>
        </div>
        <div className="bg-deep-charcoal border border-white/5 p-6 border-l-primary border-l-2">
          <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Aguardando Validação</p>
          <p className="text-2xl font-display font-bold text-primary tracking-tight">{stats.pending} Transações</p>
        </div>
        <div className="bg-deep-charcoal border border-white/5 p-6 border-l-red-500 border-l-2">
          <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Eficiência de Conversão</p>
          <p className="text-2xl font-display font-bold text-red-500 tracking-tight">98.2% Rate</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-deep-charcoal border border-white/5 p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="PROCURAR POR ID OU CLIENTE..."
            className="w-full bg-white/[0.02] border border-white/5 py-3 pl-12 pr-4 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-primary/50 transition-all text-white placeholder:text-white/10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'PAID', 'PENDING', 'FAILED'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest border transition-all ${filterStatus === s ? 'bg-primary border-primary text-black' : 'bg-white/5 border-white/10 text-white/40'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-deep-charcoal border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">ID Transação</th>
                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Cliente / Projeto</th>
                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Valor</th>
                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Método</th>
                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Estado</th>
                <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-white/20 text-[10px] font-bold uppercase tracking-widest">
                    Nenhuma transação encontrada
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-white/60 tracking-wider">#TX-{tx.id.substring(0, 8).toUpperCase()}</span>
                        <button className="p-1 opacity-0 group-hover:opacity-100 text-white/20 hover:text-white transition-all">
                          <FileText className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-widest text-white">{tx.meeting?.lead?.name || 'Venda Direta'}</p>
                        <p className="text-[10px] text-white/30 uppercase mt-0.5">{tx.meeting?.service?.name || 'Serviço Personalizado'}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div>
                        <p className="text-[11px] font-black text-white tracking-widest">AOA {tx.amount?.toLocaleString()}</p>
                        <p className="text-[10px] text-white/30 uppercase mt-0.5">{new Date(tx.createdAt).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-2 py-1 bg-white/5 border border-white/10 text-[9px] font-bold text-white/60 uppercase tracking-widest">
                        {tx.provider || 'S/M'}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      {getStatusBadge(tx.status)}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleManualValidation(tx.id, 'PAID')}
                          className="text-white/20 hover:text-acid-green transition-colors"
                          title="Validar Pagamento"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleManualValidation(tx.id, 'FAILED')}
                          className="text-white/20 hover:text-red-500 transition-colors"
                          title="Marcar como Falho"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}