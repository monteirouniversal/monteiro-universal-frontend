import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowUpRight
} from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Agendar', path: '/agendar' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${scrolled
        ? 'py-4 bg-black/60 backdrop-blur-md border-b border-white/5'
        : 'py-8 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

        {/* LOGO - Hybrid Style */}
        <Link to="/" className="flex items-center gap-3 group z-50 relative">
          <img
            src="/logo.png"
            alt="Monteiro Logo"
            className="w-20 h-auto"
          />
          <div className="h-6 w-[1px] bg-white/20 mx-1" />
          <span className="text-lg font-bold text-white tracking-widest uppercase truncate group-hover:text-primary transition-colors">
            MONTEIRO UNIVERSAL
          </span>
        </Link>

        {/* DESKTOP NAV - Minimalist Center/Right */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 relative group overflow-hidden ${location.pathname === link.path ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Subtle Glow Effect on Hover */}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-primary transform origin-right transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:origin-left'
                    }`} />
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA BUTTON - Gold & Glass */}
          <Link
            to="/agendar"
            className="group relative px-8 py-3 overflow-hidden rounded-sm transition-all duration-300"
          >
            {/* Glass Background */}
            <div className="absolute inset-0 bg-white/5 border border-primary/40 backdrop-blur-sm group-hover:bg-primary/10 transition-colors" />

            {/* Animated Gradient Border */}
            <div className="absolute inset-0 border border-primary/40 opacity-50 group-hover:border-primary/80 transition-colors" />

            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

            <span className="relative z-10 flex items-center gap-2 text-xs font-black text-primary uppercase tracking-[0.2em] group-hover:text-white transition-colors">
              Agendar Reunião
              <ArrowUpRight className="w-3 h-3 group-hover:rotate-45 transition-transform duration-300" />
            </span>
          </Link>
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 p-2 text-white hover:text-primary transition-colors"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* MOBILE MENU - Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-black text-white hover:text-primary uppercase tracking-tighter transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Link
                  to="/agendar"
                  onClick={() => setIsOpen(false)}
                  className="px-10 py-4 bg-primary text-black font-black uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Agendar Reunião
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}