import { useState } from 'react'
import { CreditCard, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function PaymentPage() {
  const [selectedService, setSelectedService] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const services = [
    {
      id: 'consultoria-1h',
      name: 'Consultoria Digital - 1 hora',
      price: 50000,
      description: 'Sessão de consultoria individual com especialista'
    },
    {
      id: 'auditoria-digital',
      name: 'Auditoria Digital Completa',
      price: 150000,
      description: 'Análise completa da presença digital da sua empresa'
    },
    {
      id: 'pacote-basico-website',
      name: 'Pacote Básico - Website',
      price: 150000,
      description: 'Website institucional com até 5 páginas'
    },
    {
      id: 'pacote-ecommerce-starter',
      name: 'Pacote Starter - E-commerce',
      price: 300000,
      description: 'Loja online básica com até 50 produtos'
    }
  ]

  const paymentMethods = [
    {
      id: 'multicaixa',
      name: 'Multicaixa Express',
      description: 'Pagamento via Multicaixa Express',
      icon: '💳'
    },
    {
      id: 'referencia',
      name: 'Referência Bancária',
      description: 'Pagamento por referência bancária',
      icon: '🏦'
    }
  ]

  const handlePayment = async () => {
    if (!selectedService || !paymentMethod) return

    setIsProcessing(true)

    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: selectedService,
          paymentMethod: paymentMethod,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to payment gateway or show payment instructions
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl
        } else if (data.reference) {
          // Show payment reference
          alert(`Referência de pagamento: ${data.reference}`)
        }
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const selectedServiceData = services.find(s => s.id === selectedService)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Pagamentos Online
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Pague seus serviços de forma rápida e segura através dos principais meios de pagamento de Angola
            </p>
          </div>
        </div>
      </section>

      {/* Payment Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Service Selection */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Selecione o Serviço
              </h2>
              
              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                      selectedService === service.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {service.name}
                      </h3>
                      <span className="text-xl font-bold text-primary-600">
                        {service.price.toLocaleString()} Kz
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>

              {selectedService && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Método de Pagamento
                  </h3>
                  
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{method.icon}</span>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {method.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Payment Summary */}
            <div>
              <div className="bg-gray-50 p-8 rounded-2xl sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Resumo do Pagamento
                </h2>
                
                {selectedServiceData ? (
                  <div>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Serviço:</span>
                        <span className="font-medium text-gray-900">
                          {selectedServiceData.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Valor:</span>
                        <span className="font-medium text-gray-900">
                          {selectedServiceData.price.toLocaleString()} Kz
                        </span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-primary-600">
                            {selectedServiceData.price.toLocaleString()} Kz
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={!paymentMethod || isProcessing}
                      className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Processando...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          <span>Pagar Agora</span>
                        </>
                      )}
                    </button>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Pagamento 100% seguro</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>Confirmação instantânea</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span>Suporte 24/7 disponível</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Selecione um serviço para continuar
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pagamento Seguro e Confiável
            </h2>
            <p className="text-gray-600">
              Utilizamos os mais altos padrões de segurança para proteger suas informações
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Criptografia SSL
              </h3>
              <p className="text-sm text-gray-600">
                Todas as transações são protegidas com criptografia de ponta
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Parceiros Oficiais
              </h3>
              <p className="text-sm text-gray-600">
                Integração oficial com Multicaixa e principais bancos
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Suporte Dedicado
              </h3>
              <p className="text-sm text-gray-600">
                Equipe disponível para ajudar com qualquer questão
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}