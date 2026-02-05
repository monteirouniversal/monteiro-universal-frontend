import { Link } from 'react-router-dom';

import {
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Send,
  Globe
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-20 pb-10 overflow-hidden">

      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Top Section: Newsletter Module */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 items-center">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-display font-bold text-white tracking-tighter uppercase italic">
              MG <span className="text-primary">Mailing</span> List
            </h3>
            <p className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em] mt-2 leading-relaxed">
              Receba atualizações exclusivas sobre infraestrutura e projetos elite.
            </p>
          </div>
          <div className="lg:col-span-2">
            <form className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-white/[0.02] border border-white/10 p-1 flex items-center group focus-within:border-primary/50 transition-all">
                <div className="pl-4 pr-3 py-3 border-r border-white/5 bg-white/[0.02]">
                  <Mail className="w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="DIGITE O SEU E-MAIL CORPORATIVO"
                  className="bg-transparent border-none outline-none flex-1 px-4 text-[10px] font-bold text-white placeholder:text-white/10 uppercase tracking-widest"
                />
              </div>
              <button className="bg-primary text-black px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3">
                Subscrever <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Navigation Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-y border-white/5">

          {/* Brand Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img src="/logo.png" alt="Monteiro Universal" className="w-full h-auto" />
              </div>
              <div>
                <h2 className="text-lg font-display font-black text-white tracking-tighter uppercase">
                  Monteiro <span className="text-primary italic">Universal</span>
                </h2>
                <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Elite Systems Provider</p>
              </div>
            </div>
            <p className="text-white/40 text-[10px] uppercase font-bold leading-relaxed tracking-widest">
              Arquitetura de soluções para mercados de alta performance e infraestrutura crítica.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61587667370200"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 border border-white/5 flex items-center justify-center hover:bg-white/[0.05] transition-all hover:-translate-y-1"
              >
                <img src="/icons/facebook.png" alt="Facebook" className="w-8 h-8 opacity-60 hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 border border-white/5 flex items-center justify-center hover:bg-white/[0.05] transition-all hover:-translate-y-1"
              >
                <img src="/icons/github.png" alt="Github" className="w-8 h-8 opacity-60 hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://www.instagram.com/monteirouniversal/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 border border-white/5 flex items-center justify-center hover:bg-white/[0.05] transition-all hover:-translate-y-1"
              >
                <img src="/icons/instagram.png" alt="Instagram" className="w-8 h-8 opacity-60 hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://www.linkedin.com/in/monteiro-universal-2454273aa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 border border-white/5 flex items-center justify-center hover:bg-white/[0.05] transition-all hover:-translate-y-1"
              >
                <img src="/icons/linkedin.png" alt="LinkedIn" className="w-8 h-8 opacity-60 hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=244922702073&text=olá%20tenho%20interesse%20nos%20teu%20serviços%20podes%20mi%20dar%20mas%20detalhes%20"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 border border-white/5 flex items-center justify-center hover:bg-white/[0.05] transition-all hover:-translate-y-1"
              >
                <img src="/icons/whatsapp.png" alt="WhatsApp" className="w-8 h-8 opacity-60 hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Links: Services */}
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8 border-l-2 border-primary pl-4">Serviços Elite</h4>
            <ul className="space-y-4">
              {['Arquitetura Digital', 'Consultoria de Investimento', 'Gestão de Património', 'Análise de Risco', 'Infraestrutura Crítica'].map((link) => (
                <li key={link}>
                  <Link to="/servicos" className="text-[10px] font-bold text-white/40 uppercase tracking-widest hover:text-primary flex items-center gap-2 group transition-all">
                    <ChevronRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Company */}
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8 border-l-2 border-white/10 pl-4">Institucional</h4>
            <ul className="space-y-4">
              {['Sobre MG', 'A Nossa Equipa', 'Carreiras', 'Newsroom', 'Contacto Direto', 'Portal Monteiro'].map((link) => (
                <li key={link}>
                  <Link
                    to={
                      link === 'Sobre MG' ? '/sobre' :
                        link === 'Contacto Direto' ? '/contacto' :
                          link === 'Portal Monteiro' ? '/auth/login' :
                            '#'
                    }
                    className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group transition-all ${link === 'Portal Monteiro' ? 'text-primary hover:text-white' : 'text-white/40 hover:text-white'
                      }`}
                  >
                    <ChevronRight className={`w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all ${link === 'Portal Monteiro' ? 'text-primary' : 'text-white/40'
                      }`} />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="bg-white/[0.02] border border-white/5 p-6 space-y-6">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-2">Sede Global</h4>
            <div className="space-y-4">
              <div className="flex gap-4">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest leading-relaxed">
                  Rua Marechal Brós Tito, Luanda, Angola
                </p>
              </div>
              <div className="flex gap-4">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest">
                  info@monteiro-universal.com
                </p>
              </div>
              <div className="flex gap-4">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest">
                  +244 922 000 000
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-acid-green rounded-full animate-pulse" />
                <span className="text-[8px] font-black text-acid-green uppercase tracking-widest">Systems Operational</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-[9px] font-black text-white/20 uppercase tracking-widest">
            <Globe className="w-3 h-3" /> Luanda / London / New York
          </div>

          <p className="text-[9px] font-black text-white/20 uppercase tracking-widest font-mono">
            © 2026 Monteiro Universal. All Rights Reserved. <Link to="#" className="hover:text-white ml-4">Privacy Policy</Link>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/40 hover:text-primary text-[9px] font-black uppercase tracking-widest transition-all group"
          >
            Voltar ao Topo <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>

    </footer>
  );
}