import { useParams, Link } from 'react-router-dom'
import { 
  Globe, 
  ShoppingCart, 
  Settings, 
  CreditCard, 
  Bot, 
  Users,
  CheckCircle,
  Calendar,
  ArrowRight
} from 'lucide-react'

export default function ServiceDetailPage() {
  const { slug } = useParams()

  const services = {
    websites: {
      icon: Globe,
      title: 'Desenvolvimento de Websites',
      description: 'Sites profissionais, responsivos e otimizados para o mercado angolano.',
      longDescription: 'Criamos websites modernos e funcionais que representam sua marca de forma profissional. Nossos sites são desenvolvidos com as mais recentes tecnologias, garantindo performance, segurança e uma excelente experiência do usuário.',
      features: [
        'Design responsivo para todos os dispositivos',
        'Otimização para motores de busca (SEO)',
        'Integração com redes sociais',
        'Painel de administração intuitivo',
        'Certificado SSL incluído',
        'Backup automático diário',
        'Suporte técnico por 6 meses',
        'Treinamento para gestão de conteúdo'
      ],
      process: [
        'Briefing e análise de requisitos',
        'Criação de wireframes e protótipos',
        'Design visual personalizado',
        'Desenvolvimento e programação',
        'Testes e otimização',
        'Lançamento e configuração',
        'Treinamento e documentação'
      ],
      price: 'A partir de 150.000 Kz',
      timeline: '2-4 semanas'
    },
    ecommerce: {
      icon: ShoppingCart,
      title: 'Lojas Online (E-commerce)',
      description: 'Plataformas completas de vendas online com integração aos sistemas de pagamento angolanos.',
      longDescription: 'Desenvolvemos lojas online completas que permitem vender seus produtos 24/7. Com integração aos principais sistemas de pagamento de Angola, sua loja estará pronta para receber pagamentos de forma segura e eficiente.',
      features: [
        'Catálogo de produtos ilimitado',
        'Carrinho de compras avançado',
        'Integração Multicaixa Express',
        'Integração AppyPay',
        'Gestão completa de stock',
        'Sistema de pedidos automatizado',
        'Relatórios de vendas detalhados',
        'Painel administrativo completo'
      ],
      process: [
        'Análise do modelo de negócio',
        'Configuração da estrutura de produtos',
        'Design da interface de compra',
        'Integração com gateways de pagamento',
        'Configuração de logística',
        'Testes de transações',
        'Lançamento e monitoramento'
      ],
      price: 'A partir de 300.000 Kz',
      timeline: '4-6 semanas'
    },
    sistemas: {
      icon: Settings,
      title: 'Sistemas Personalizados',
      description: 'Desenvolvimento de sistemas sob medida para automatizar processos específicos do seu negócio.',
      longDescription: 'Criamos sistemas personalizados que se adaptam perfeitamente aos processos únicos da sua empresa. Desde gestão de clientes até automação de workflows, desenvolvemos soluções que aumentam a eficiência operacional.',
      features: [
        'Análise detalhada de processos',
        'Interface personalizada',
        'Integração com sistemas existentes',
        'Relatórios customizados',
        'Controle de acesso por usuário',
        'Backup automático de dados',
        'API para integrações futuras',
        'Documentação técnica completa'
      ],
      process: [
        'Levantamento de requisitos',
        'Modelagem do sistema',
        'Prototipagem e validação',
        'Desenvolvimento iterativo',
        'Testes de integração',
        'Treinamento dos usuários',
        'Implantação e go-live'
      ],
      price: 'Orçamento personalizado',
      timeline: '6-12 semanas'
    },
    pagamentos: {
      icon: CreditCard,
      title: 'Integração de Pagamentos',
      description: 'Implementação de soluções de pagamento digital com Multicaixa Express e AppyPay.',
      longDescription: 'Integramos seu website ou sistema aos principais meios de pagamento digital de Angola. Facilitamos as transações dos seus clientes com soluções seguras e confiáveis.',
      features: [
        'Multicaixa Express',
        'AppyPay integração completa',
        'Pagamento por referência bancária',
        'Notificações automáticas de pagamento',
        'Reconciliação automática',
        'Dashboard de transações',
        'Relatórios financeiros',
        'Suporte técnico especializado'
      ],
      process: [
        'Análise dos requisitos de pagamento',
        'Configuração das contas merchant',
        'Desenvolvimento da integração',
        'Testes em ambiente sandbox',
        'Validação de segurança',
        'Ativação em produção',
        'Monitoramento inicial'
      ],
      price: 'A partir de 80.000 Kz',
      timeline: '1-2 semanas'
    },
    automacao: {
      icon: Bot,
      title: 'Automação com IA',
      description: 'Chatbots inteligentes, automação de processos e soluções de inteligência artificial.',
      longDescription: 'Implementamos soluções de inteligência artificial para automatizar atendimento ao cliente, processos internos e análise de dados. Nossos chatbots e sistemas de automação trabalham 24/7 para sua empresa.',
      features: [
        'Chatbots para WhatsApp Business',
        'Chatbots para website',
        'Automação de atendimento',
        'Integração com CRM',
        'Processamento de linguagem natural',
        'Análise de sentimentos',
        'Relatórios de performance',
        'Aprendizado contínuo'
      ],
      process: [
        'Mapeamento de fluxos de atendimento',
        'Treinamento do modelo de IA',
        'Desenvolvimento do chatbot',
        'Integração com canais de comunicação',
        'Testes e refinamento',
        'Lançamento gradual',
        'Otimização contínua'
      ],
      price: 'A partir de 200.000 Kz',
      timeline: '3-5 semanas'
    },
    consultoria: {
      icon: Users,
      title: 'Consultoria Digital',
      description: 'Estratégias digitais personalizadas para transformar e otimizar seu negócio.',
      longDescription: 'Oferecemos consultoria especializada para ajudar sua empresa a navegar na transformação digital. Analisamos seus processos atuais e criamos um roadmap personalizado para o sucesso digital.',
      features: [
        'Auditoria digital completa',
        'Estratégia de transformação digital',
        'Plano de implementação detalhado',
        'Análise de concorrência',
        'Recomendações tecnológicas',
        'Acompanhamento mensal',
        'Relatórios de progresso',
        'Suporte na implementação'
      ],
      process: [
        'Diagnóstico inicial',
        'Análise de mercado e concorrência',
        'Identificação de oportunidades',
        'Elaboração da estratégia',
        'Apresentação do plano',
        'Acompanhamento da implementação',
        'Avaliação de resultados'
      ],
      price: '50.000 Kz/hora',
      timeline: '1-3 semanas'
    }
  }

  const service = services[slug as keyof typeof services]

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Serviço não encontrado</h1>
          <Link to="/servicos" className="btn-primary">
            Ver Todos os Serviços
          </Link>
        </div>
      </div>
    )
  }

  const Icon = service.icon

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-white/20 p-4 rounded-lg">
              <Icon className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                {service.title}
              </h1>
              <p className="text-xl text-primary-100 mt-2">
                {service.price} • {service.timeline}
              </p>
            </div>
          </div>
          <p className="text-xl text-primary-100 max-w-3xl">
            {service.longDescription}
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                O que está incluído
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Processo de Trabalho
              </h2>
              <div className="space-y-4">
                {service.process.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-8 rounded-2xl sticky top-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Solicitar Serviço
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Preço:</span>
                    <span className="font-semibold text-gray-900">{service.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prazo:</span>
                    <span className="font-semibold text-gray-900">{service.timeline}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/agendar"
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Agendar Reunião</span>
                  </Link>
                  <Link
                    to="/contacto"
                    className="btn-outline w-full flex items-center justify-center space-x-2"
                  >
                    <span>Solicitar Orçamento</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Precisa de ajuda?
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Nossa equipe está pronta para esclarecer suas dúvidas e ajudar na escolha da melhor solução.
                  </p>
                  <Link
                    to="/contacto"
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Falar com especialista →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Outros Serviços
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(services)
              .filter(([key]) => key !== slug)
              .slice(0, 3)
              .map(([key, relatedService]) => {
                const RelatedIcon = relatedService.icon
                return (
                  <Link
                    key={key}
                    to={`/servicos/${key}`}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-primary-100 p-2 rounded-lg">
                        <RelatedIcon className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">
                        {relatedService.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {relatedService.description}
                    </p>
                  </Link>
                )
              })}
          </div>
        </div>
      </section>
    </div>
  )
}