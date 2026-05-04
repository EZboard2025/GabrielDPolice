export const siteConfig = {
  name: 'D Police',
  description:
    'Equipamentos policiais e militares — uniformes, calçados, coldres e artigos táticos. Loja em Belo Horizonte/MG.',
  url: 'https://dpolice.com.br',
  ogImage: '/og.png',
  store: {
    address: 'Rua Platina, 409 - Loja A, Prado, Belo Horizonte - MG, CEP 30411-131',
    mapsQuery: 'Rua Platina 409, Prado, Belo Horizonte, MG',
    cnpj: '20.546.775/0001-74',
    phone: '(31) 3293-5006',
    whatsapp: '(31) 99534-2643',
    whatsappLink:
      'https://wa.me/5531995342643?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20um%20produto',
    hours: 'Seg a Sex 9h–18h • Sáb 9h–13h',
  },
  shipping: {
    freeAbove: 300,
    freeAboveLabel: 'Frete grátis a partir de R$ 300',
    provider: 'Melhor Envio',
  },
  payment: {
    installments: 6,
    installmentsLabel: 'Em até 6x sem juros',
    methods: ['PIX', 'Crédito', 'Boleto'] as const,
  },
  social: {
    instagram: 'https://instagram.com/dpolicebh',
    facebook: 'https://facebook.com/dpolicebh',
    whatsapp:
      'https://wa.me/5531995342643?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20um%20produto',
  },
} as const

export type SiteConfig = typeof siteConfig
