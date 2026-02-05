import { motion } from 'framer-motion';
import {
  Shield,
  Target,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  Eye,
  Heart,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Animação suave de fade in - SE REPETE ao fazer scroll
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-50px", amount: 0.3 }, // once: false = anima toda vez
  transition: { duration: 0.6, ease: "easeOut" as const }
};

// Animação com delay - SE REPETE
const fadeInDelay = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-50px", amount: 0.3 }, // once: false = anima toda vez
  transition: { duration: 0.6, delay, ease: "easeOut" as const }
});

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" as const }}
      className="relative bg-[#050505] text-white overflow-hidden selection:bg-[#D4AF37]/30"
    >
      {/* Background Effects - Suave */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
          className="absolute top-[40%] -left-[10%] w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as const, delay: 2 }}
          className="absolute bottom-0 right-[0%] w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen"
        />
      </div>

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/5 via-[#000] to-[#000] pointer-events-none" />
      <div className="fixed inset-0 bg-[url('/grain.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      {/* 1️⃣ BANNER / INTRODUÇÃO */}
      <section className="relative pt-60 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-12 max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
              className="inline-flex items-center gap-4 justify-center"
            >
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">Sobre Nós</span>
              <div className="h-px w-12 bg-[#D4AF37]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
              className="text-6xl md:text-9xl font-serif text-white tracking-widest leading-none drop-shadow-2xl"
            >
              MONTEIRO
              <span className="block text-4xl md:text-6xl font-sans font-light tracking-[0.2em] mt-4 text-white/80">UNIVERSAL</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" as const }}
              className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-3xl mx-auto"
            >
              Tecnologia, sistemas e soluções digitais pensadas para negócios reais.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" as const }}
              className="text-lg md:text-xl text-white/40 leading-relaxed max-w-3xl mx-auto font-light"
            >
              A Monteiro Universal nasce com o objetivo de ajudar pessoas, empresas e projetos a entrarem no mundo digital de forma profissional, segura e escalável.
            </motion.p>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_rgba(212,175,55,0.8)] opacity-50" />
      </section>

      {/* 2️⃣ QUEM SOMOS */}
      <section className="relative py-32 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeIn} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-[#D4AF37]" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">Quem Somos</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                Quem Somos
              </h2>
            </motion.div>

            <motion.div {...fadeInDelay(0.2)} className="space-y-6">
              <p className="text-white/60 text-lg leading-relaxed">
                A <span className="text-[#D4AF37] font-semibold">Monteiro Universal</span> é uma empresa angolana focada no desenvolvimento de soluções tecnológicas, sistemas personalizados, plataformas digitais, e serviços de tecnologia da informação.
              </p>

              <p className="text-white/60 text-lg leading-relaxed">
                Atuamos desde a criação de sites e lojas online até sistemas empresariais, integrações de pagamento, automação de processos e suporte técnico.
              </p>

              <p className="text-white/60 text-lg leading-relaxed">
                Nosso trabalho é <span className="text-white font-semibold">transformar ideias em soluções práticas, funcionais e prontas para crescer</span>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3️⃣ O QUE FAZEMOS */}
      <section className="relative py-40 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <motion.div {...fadeIn} className="inline-flex items-center gap-4 justify-center">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">Nossos Serviços</span>
              <div className="h-px w-12 bg-[#D4AF37]" />
            </motion.div>

            <motion.h2 {...fadeInDelay(0.1)} className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#fdcb6e] via-[#D4AF37] to-[#8a6e1c] drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]">
              O Que Fazemos
            </motion.h2>

            <motion.p {...fadeInDelay(0.2)} className="text-white/40 text-lg max-w-2xl mx-auto">
              Desenvolvemos soluções sob medida, de acordo com a realidade do cliente e do mercado angolano.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: 'Criação de Sites Profissionais', desc: 'Websites modernos e responsivos' },
              { icon: Target, title: 'Desenvolvimento de Sistemas', desc: 'Plataformas e SaaS personalizados' },
              { icon: Award, title: 'Lojas Online e Marketplaces', desc: 'E-commerce completo e escalável' },
              { icon: Shield, title: 'Integração de Pagamentos', desc: 'Online e na entrega' },
              { icon: Zap, title: 'Consultoria Tecnológica', desc: 'Estratégia digital para seu negócio' },
              { icon: Users, title: 'Reparação e Manutenção', desc: 'Suporte técnico contínuo' }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
                className="group relative p-8 bg-black/60 backdrop-blur-sm border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-all duration-300">
                  <service.icon className="w-8 h-8 text-[#D4AF37] group-hover:text-black transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                  {service.desc}
                </p>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ NOSSA VISÃO */}
      <section className="relative py-32 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <motion.div {...fadeIn} className="space-y-6">
            <div className="inline-flex items-center gap-4 justify-center">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">Nossa Visão</span>
              <div className="h-px w-12 bg-[#D4AF37]" />
            </div>

            <h2 className="text-5xl md:text-7xl font-serif text-white">
              Nossa <span className="text-[#D4AF37] italic">Visão</span>
            </h2>
          </motion.div>

          <motion.div
            {...fadeInDelay(0.2)}
            className="group relative p-12 border-2 border-[#D4AF37]/30 bg-black/40 hover:border-[#D4AF37] hover:bg-black/60 transition-all duration-500 cursor-pointer"
          >
            <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-[#D4AF37] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-[#D4AF37] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

            <Eye className="w-16 h-16 text-[#D4AF37] mx-auto mb-8 group-hover:scale-110 transition-transform duration-300" />

            <p className="text-2xl md:text-3xl text-white/80 leading-relaxed font-light italic group-hover:text-white transition-colors duration-300">
              "Ser uma referência em soluções digitais em Angola, criando sistemas confiáveis, acessíveis e preparados para o futuro, ajudando negócios a crescerem com tecnologia bem estruturada."
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5️⃣ NOSSOS VALORES */}
      <section className="relative py-40 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <motion.div {...fadeIn} className="inline-flex items-center gap-4 justify-center">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">Nossos Valores</span>
              <div className="h-px w-12 bg-[#D4AF37]" />
            </motion.div>

            <motion.h2 {...fadeInDelay(0.1)} className="text-5xl md:text-7xl font-serif text-white">
              Nossos <span className="text-[#D4AF37] italic">Valores</span>
            </motion.h2>

            <motion.p {...fadeInDelay(0.2)} className="text-white/40 text-xl max-w-3xl mx-auto italic">
              "Acreditamos que tecnologia não deve ser confusa, cara ou inacessível. Ela deve funcionar e gerar resultados."
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle2, title: 'Profissionalismo', desc: 'Compromisso com a excelência em cada projeto' },
              { icon: Eye, title: 'Transparência', desc: 'Comunicação clara e honesta sempre' },
              { icon: Heart, title: 'Compromisso com o Cliente', desc: 'Seu sucesso é nossa prioridade' },
              { icon: Award, title: 'Qualidade Técnica', desc: 'Código limpo, seguro e escalável' },
              { icon: Zap, title: 'Evolução Constante', desc: 'Sempre atualizados com as melhores práticas' }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="group p-8 bg-gradient-to-br from-[#D4AF37]/5 to-transparent border border-white/10 hover:border-[#D4AF37]/50 hover:from-[#D4AF37]/10 transition-all duration-300 cursor-pointer"
              >
                <value.icon className="w-12 h-12 text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform duration-300" />

                <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                  {value.title}
                </h3>

                <p className="text-white/40 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6️⃣ POR QUE ESCOLHER A MONTEIRO UNIVERSAL */}
      <section className="relative py-40 px-6 bg-white/[0.01] border-y border-white/5 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-20"
            style={{ filter: 'brightness(0.5) contrast(1.2)' }}
          >
            <source src="/video/esper.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <motion.div {...fadeIn} className="inline-flex items-center gap-4 justify-center">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">Diferenciais</span>
              <div className="h-px w-12 bg-[#D4AF37]" />
            </motion.div>

            <motion.h2 {...fadeInDelay(0.1)} className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200">
              Por que escolher a Monteiro Universal?
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: 'Soluções pensadas para a realidade de Angola', icon: Target },
              { title: 'Comunicação clara e direta', icon: Users },
              { title: 'Sistemas escaláveis e seguros', icon: Shield },
              { title: 'Atendimento personalizado', icon: Heart },
              { title: 'Suporte contínuo após a entrega', icon: CheckCircle2 }
            ].map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" as const }}
                className="group flex items-start gap-6 p-8 bg-black/60 backdrop-blur-sm border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:bg-black/80 transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37] transition-all duration-300">
                  <reason.icon className="w-7 h-7 text-[#D4AF37] group-hover:text-black transition-colors duration-300" />
                </div>

                <p className="text-xl text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {reason.title}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeInDelay(0.4)}
            className="text-center pt-12"
          >
            <div className="group inline-block p-12 border-2 border-[#D4AF37] bg-black/80 hover:bg-black relative cursor-pointer transition-all duration-300">
              <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-[#D4AF37] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-[#D4AF37] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

              <p className="text-3xl md:text-5xl font-serif text-[#D4AF37] italic group-hover:scale-105 transition-transform duration-300">
                "Não vendemos promessas. <br />
                <span className="text-white">Entregamos soluções funcionais.</span>"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7️⃣ CHAMADA PARA AÇÃO (CTA) */}
      <section className="relative py-60 px-6 text-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-90"
            style={{ filter: 'brightness(0.7) contrast(1.1)' }}
          >
            <source src="/video/01.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-16">
          <motion.div {...fadeIn} className="space-y-8">
            <div className="h-24 w-px bg-gradient-to-b from-transparent to-[#D4AF37] mx-auto" />

            <h2 className="text-5xl md:text-8xl font-serif text-white leading-tight tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Tem um projeto <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                ou uma ideia?
              </span>
            </h2>

            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-[#D4AF37]" />
              <p className="text-[#D4AF37] font-black tracking-[0.3em] uppercase text-xs md:text-sm">
                Vamos conversar e encontrar a melhor solução
              </p>
              <div className="h-[1px] w-12 bg-[#D4AF37]" />
            </div>
          </motion.div>

          <motion.div
            {...fadeInDelay(0.2)}
            className="flex flex-col sm:flex-row justify-center items-center gap-8"
          >
            <Link
              to="/agendar"
              className="group relative inline-flex items-center justify-center px-12 py-6 bg-[#D4AF37] text-black font-black uppercase tracking-[0.3em] text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(212,175,55,0.6)]"
            >
              <div className="absolute inset-0 bg-blue-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Agendar uma Reunião
              </span>
              <ArrowRight className="relative z-10 w-5 h-5 ml-4 group-hover:translate-x-2 transition-all duration-300" />
            </Link>

            <Link
              to="/servicos"
              className="px-12 py-6 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/5 hover:border-[#D4AF37]/50 transition-all duration-300 backdrop-blur-sm"
            >
              Ver Serviços
            </Link>

            <Link
              to="/contacto"
              className="text-white/40 hover:text-white font-black uppercase text-[10px] tracking-[0.5em] flex items-center gap-4 group transition-all duration-300"
            >
              Entrar em Contacto <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* The Golden Horizon Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_rgba(212,175,55,0.8)] opacity-50" />
      </section>
    </motion.div>
  );
}