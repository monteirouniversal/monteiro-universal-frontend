import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
    BarChart3,
    CreditCard,
    Calendar,
    Settings,
    LogOut,
    ChevronLeft,
    Menu,
    Shield,
    Layers,
    Activity,
    Search,
    UserCheck,
    Lock,
    Clock,
    Users,
    Video,
    FileText,
    Zap,
    TrendingUp,
    MessageSquare
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../context/AuthContext';
import NotificationCenter from '../components/admin/NotificationCenter';



/**
 * Premium Admin Layout for Monteiro Universal
 * Features: Collapsible Sidebar, Real-time status indicators, Sharp geometric design.
 */
export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    const mainContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollTop = 0;
        }
    }, [location.pathname]);

    const navItems = [
        { name: 'Dashboard', icon: BarChart3, path: '/portal-monteiro/dashboard' },
        { name: 'Leads', icon: UserCheck, path: '/portal-monteiro/leads' },
        { name: 'Contactos', icon: MessageSquare, path: '/portal-monteiro/contacts' },
        { name: 'Clientes', icon: Users, path: '/portal-monteiro/clients' },
        { name: 'Reuniões', icon: Video, path: '/portal-monteiro/meetings' },
        { name: 'Agenda', icon: Calendar, path: '/portal-monteiro/appointments' },
        { name: 'Disponibilidade', icon: Clock, path: '/portal-monteiro/availability' },
        { name: 'Serviços', icon: Layers, path: '/portal-monteiro/services' },
        { name: 'Pagamentos', icon: CreditCard, path: '/portal-monteiro/payments' },
        { name: 'Financeiro', icon: TrendingUp, path: '/portal-monteiro/finances' },
        { name: 'Faturas', icon: FileText, path: '/portal-monteiro/invoices' },
        { name: 'Integrações', icon: Zap, path: '/portal-monteiro/integrations' },
        { name: 'Relatórios', icon: BarChart3, path: '/portal-monteiro/biz-reports' },
        { name: 'Audit Logs', icon: Activity, path: '/portal-monteiro/audit-logs' },
        { name: 'Utilizadores', icon: Lock, path: '/portal-monteiro/users' },
        { name: 'Configurações', icon: Settings, path: '/portal-monteiro/settings' },
    ];



    const { logout } = useAuth();

    return (
        <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className={twMerge(
                    "bg-[#0A0A0A] border-r border-white/5 flex flex-col z-30 relative transition-all duration-500",
                    !isSidebarOpen && "items-center"
                )}
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center px-6 border-b border-white/5 overflow-hidden">
                    <img
                        src="/logo.png"
                        alt="Monteiro Logo"
                        className="w-10 h-auto flex-shrink-0"
                    />
                    <AnimatePresence>
                        {isSidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="ml-3 font-display font-bold tracking-tighter text-lg whitespace-nowrap"
                            >
                                MONTEIRO <span className="text-primary italic">UNIVERSAL</span>
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto scrollbar-hide">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={twMerge(
                                    "flex items-center gap-3 px-4 py-3 rounded-none transition-all duration-300 group",
                                    isActive
                                        ? "bg-primary text-black"
                                        : "text-white/40 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon className={twMerge("w-5 h-5", isActive ? "text-black" : "text-primary group-hover:scale-110 transition-transform")} />
                                {isSidebarOpen && (
                                    <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Footer */}
                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-white/40 hover:text-red-500 hover:bg-red-500/5 transition-all duration-300"
                    >
                        <LogOut className="w-5 h-5" />
                        {isSidebarOpen && (
                            <span className="text-xs font-bold uppercase tracking-widest">Sair</span>
                        )}
                    </button>
                </div>


                {/* Toggle Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-24 w-6 h-6 bg-primary text-black rounded-none flex items-center justify-center border border-black z-40 transition-transform hover:scale-110"
                >
                    {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Topbar */}
                <header className={twMerge(
                    "h-20 flex items-center justify-between px-8 z-20 transition-all duration-500 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl",
                    scrolled && "border-primary/20"
                )}>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 text-white/40">
                            <Search className="w-4 h-4" />
                            <input
                                type="text"
                                placeholder="PROCURAR..."
                                className="bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-widest w-40 focus:w-60 transition-all focus:text-white"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Status Indicators */}
                        <div className="hidden lg:flex items-center gap-4 border-r border-white/10 pr-6">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-acid-green animate-pulse" />
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Live Status</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="w-3 h-3 text-primary" />
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Protected</span>
                            </div>
                        </div>

                        <NotificationCenter />


                        <div className="flex items-center gap-3 pl-4">
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest leading-none">Admin</p>
                                <p className="text-[9px] text-white/40 uppercase tracking-tighter">Monteiro Universal</p>
                            </div>
                            <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center font-bold text-primary">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div ref={mainContentRef} className="flex-1 overflow-y-auto p-8 scrollbar-thin">
                    <Outlet />
                </div>

                {/* Background Decorative Element */}
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            </main>
        </div>
    );
}
