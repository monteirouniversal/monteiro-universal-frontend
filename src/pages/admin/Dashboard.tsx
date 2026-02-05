import { useEffect, useState, useMemo } from 'react';
import { DollarSign, Users, ArrowUpRight, TrendingUp, Clock, AlertCircle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../../services/api';
import socket from '../../services/socket';
import { playNotificationSound } from '../../utils/sound';

const StatCard = ({ title, value, subtext, icon: Icon, trend, delay, color = "primary" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    className="bg-deep-charcoal border border-white/5 p-6 relative group overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 ${color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-acid-green/10 text-acid-green'}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-acid-green bg-acid-green/5 px-2 py-1">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </div>
        )}
      </div>

      <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-display font-bold text-white tracking-tighter">
          {value}
        </p>
      </div>
      <p className="text-[10px] text-white/20 uppercase tracking-widest mt-2">{subtext}</p>
    </div>

    <div className={`absolute bottom-0 left-0 h-[2px] w-full ${color === 'primary' ? 'bg-primary/20' : 'bg-acid-green/20'}`} />
    <motion.div
      initial={{ width: 0 }}
      whileHover={{ width: '100%' }}
      className={`absolute bottom-0 left-0 h-[2px] ${color === 'primary' ? 'bg-primary' : 'bg-acid-green'}`}
    />
  </motion.div>
);

const ActivityItem = ({ title, message, time, type }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
  >
    <div className="flex items-center gap-4">
      <div className={`w-2 h-2 rounded-none ${type === 'payment' ? 'bg-acid-green shadow-[0_0_10px_rgba(163,230,53,0.5)]' : 'bg-primary shadow-[0_0_10px_rgba(212,175,55,0.5)]'}`} />
      <div>
        <p className="text-[11px] font-bold text-white/80 uppercase tracking-widest">{title}</p>
        <p className="text-[10px] text-white/40 mb-1">{message}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <Clock className="w-2.5 h-2.5 text-white/20" />
          <span className="text-[8px] text-white/20 uppercase font-medium">{time}</span>
        </div>
      </div>
    </div>
    <button className="opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-white transition-all">
      <ArrowUpRight className="w-4 h-4" />
    </button>
  </motion.div>
);

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([
    { id: '1', title: 'SISTEMA INICIADO', message: 'Painel Central operacional', time: 'Agora', type: 'system' }
  ]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);

  // Calculate notification counts per category
  const notificationCounts = useMemo(() => {
    return activities.reduce((acc: any, curr: any) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1;
      return acc;
    }, {});
  }, [activities]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data.stats);

        // Simulating chart data if not provided by backend yet
        // In a real scenario, this should come from historical data endpoint
        const mockData = [
          { name: 'Seg', value: 4000 },
          { name: 'Ter', value: 3000 },
          { name: 'Qua', value: 2000 },
          { name: 'Qui', value: 2780 },
          { name: 'Sex', value: 1890 },
          { name: 'Sáb', value: 2390 },
          { name: 'Dom', value: 3490 },
        ];
        setChartData(mockData);

      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // SOCKET LISTENERS
    socket.on('admin:stats_update', (newStats: any) => {
      console.log('📈 Real-time stats update:', newStats);
      setStats(newStats);
      playNotificationSound();
    });

    socket.on('admin:activity', (activity: any) => {
      console.log('🔔 New activity:', activity);
      setActivities(prev => [activity, ...prev].slice(0, 10));
      playNotificationSound();
    });

    // Also listen for meeting creation specifically if not covered by admin:activity
    socket.on('new_meeting', (meeting: any) => {
      const newActivity = {
        id: Date.now().toString(),
        title: 'NOVO AGENDAMENTO',
        message: `Cliente: ${meeting.name}`,
        time: 'Agora',
        type: 'meeting'
      };
      setActivities(prev => [newActivity, ...prev].slice(0, 10));
      playNotificationSound();
    });

    return () => {
      socket.off('admin:stats_update');
      socket.off('admin:activity');
      socket.off('new_meeting');
    };
  }, []);

  const exportLogs = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "ID,Title,Message,Time,Type\n"
      + activities.map(e => `${e.id},${e.title},${e.message},${e.time},${e.type}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "system_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative p-10 bg-deep-charcoal border border-white/5 overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.2em] border border-primary/20">System Live</span>
              <span className="text-white/20 text-[9px] font-bold uppercase tracking-[0.2em]">v2.4.0-ELITE</span>
            </div>
            <h1 className="text-4xl font-display font-bold text-white tracking-tighter sm:text-5xl">
              CENTRAL DE <span className="text-primary italic">COMANDO</span>
            </h1>
            <p className="text-white/40 text-xs font-medium uppercase tracking-[0.3em] mt-2">Visão geral da Monteiro Universal em tempo real</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={exportLogs}
              className="px-6 py-3 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center gap-2">
              <Download className="w-4 h-4" /> Exportar Logs
            </button>
            <button className="px-6 py-3 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-acid-green transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              Novo Relatório
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Leads Totais"
          value={stats?.leads || '0'}
          subtext="Potenciais Clientes"
          icon={Users}
          delay={0.1}
          color="primary"
        />
        <StatCard
          title="Agendamentos"
          value={stats?.meetings || '0'}
          subtext="Total de Reuniões"
          icon={Clock}
          delay={0.2}
          color="primary"
        />
        <StatCard
          title="Pendentes Approval"
          value={stats?.pendingApproval || '0'}
          subtext="Aguardando Admin"
          icon={AlertCircle}
          delay={0.3}
          color="acid-green"
        />
        <StatCard
          title="Receita (AOA)"
          value={stats?.revenue?.toLocaleString() || '0'}
          subtext="Confirmado via AppyPay"
          icon={DollarSign}
          delay={0.4}
          color="primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-deep-charcoal border border-white/5 p-8 relative min-h-[400px]">
            <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-8">Performance Financeira</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                    itemStyle={{ color: '#D4AF37' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#D4AF37" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex gap-4">
              {/* Optional: Add custom legend or filters if needed */}
            </div>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="bg-deep-charcoal border border-white/5 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
            <h3 className="text-white text-xs font-black uppercase tracking-[0.3em]">Fluxo de Eventos</h3>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-acid-green animate-ping" />
              <span className="text-[9px] font-bold text-acid-green/80 uppercase">Live</span>
            </div>
          </div>

          {/* Notification Counter Chips - As requested */}
          <div className="px-6 py-2 border-b border-white/5 flex gap-2 flex-wrap">
            {Object.entries(notificationCounts).map(([type, count]: any) => (
              <span key={type} className="text-[9px] px-2 py-1 bg-white/5 rounded text-white/60 uppercase">
                {type}: <span className="text-primary font-bold">{count}</span>
              </span>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto max-h-[500px]">
            <AnimatePresence initial={false}>
              {activities.length === 0 && (
                <div className="p-8 text-center text-white/20 text-[10px] uppercase">
                  Sem atividades recentes
                </div>
              )}
              {activities.map((item) => (
                <ActivityItem key={item.id} {...item} />
              ))}
            </AnimatePresence>
          </div>

          <button
            onClick={() => console.log('View all logs')} // Implement distinct log page if needed
            className="p-4 text-[10px] font-bold text-primary uppercase tracking-widest text-center hover:bg-primary/5 transition-colors border-t border-white/5">
            Ver Todos os Logs
          </button>
        </div>
      </div>
    </div>
  );
}