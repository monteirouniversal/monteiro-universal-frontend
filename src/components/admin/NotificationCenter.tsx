import { useState, useEffect } from 'react';
import { Bell, CheckCircle2, AlertCircle, Info, Zap, Loader2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import { socket } from '../../services/socket';
import { Link } from 'react-router-dom';

export default function NotificationCenter() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    useEffect(() => {
        fetchNotifications();

        socket.on('new_notification', (notif) => {
            setNotifications(prev => [notif, ...prev]);
        });

        // Poll every minute as fallback
        const interval = setInterval(fetchNotifications, 60000);

        return () => {
            clearInterval(interval);
            socket.off('new_notification');
        };
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await api.get('/admin/notifications');
            setNotifications(response.data.notifications);
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            await api.patch(`/admin/notifications/${id}/read`);
            setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'SUCCESS': return <CheckCircle2 className="w-4 h-4 text-acid-green" />;
            case 'ERROR': return <AlertCircle className="w-4 h-4 text-red-500" />;
            case 'AUTOMATION': return <Zap className="w-4 h-4 text-primary" />;
            default: return <Info className="w-4 h-4 text-blue-400" />;
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-2 transition-colors ${unreadCount > 0 ? 'text-primary' : 'text-white/40 hover:text-white'}`}
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-[#050505] rounded-full" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-4 w-96 bg-deep-charcoal border border-white/10 shadow-2xl z-50 overflow-hidden"
                        >
                            <div className="p-4 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
                                <h3 className="text-[10px] font-black uppercase tracking-widest">Centro de Notificações</h3>
                                <span className="text-[9px] font-bold text-white/20 uppercase">{unreadCount} não lidas</span>
                            </div>

                            <div className="max-h-[400px] overflow-y-auto scrollbar-hide py-2">
                                {loading ? (
                                    <div className="py-10 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-primary" /></div>
                                ) : notifications.length === 0 ? (
                                    <div className="py-10 text-center text-[10px] text-white/20 uppercase tracking-widest font-black">Nenhuma notificação</div>
                                ) : (
                                    notifications.map((notif) => (
                                        <div
                                            key={notif.id}
                                            onClick={() => !notif.isRead && markAsRead(notif.id)}
                                            className={`p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0 ${!notif.isRead ? 'bg-white/[0.01]' : 'opacity-40'}`}
                                        >
                                            <div className="flex gap-4">
                                                <div className="pt-1">{getTypeIcon(notif.type)}</div>
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-[10px] font-black uppercase tracking-wide leading-none">{notif.title}</p>
                                                    <p className="text-[11px] text-white/60 leading-relaxed font-medium">{notif.message}</p>
                                                    <div className="flex items-center justify-between pt-2">
                                                        <span className="text-[8px] text-white/20 font-bold uppercase">{new Date(notif.createdAt).toLocaleTimeString()}</span>
                                                        {notif.link && (
                                                            <Link
                                                                to={notif.link}
                                                                onClick={() => setIsOpen(false)}
                                                                className="flex items-center gap-1 text-[8px] text-primary font-black uppercase hover:underline"
                                                            >
                                                                Ver mais <ExternalLink className="w-2 h-2" />
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="p-3 border-t border-white/10 bg-white/[0.02] text-center">
                                <button className="text-[9px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">Ver todas as atividades</button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
