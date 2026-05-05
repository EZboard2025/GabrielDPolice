export const siteConfig = {
  name: 'D Police',
  legalName: 'D POLICE COMÉRCIO E INDUSTRIA DE ARTIGO CIVIL E MILITAR LTDA',
  description:
    'Equipamentos policiais e militares — uniformes, calçados, coldres e artigos táticos. Loja em Belo Horizonte/MG.',
  url: 'https://dpolice.com.br',
  ogImage: '/og.png',
  store: {
    address: 'Rua Platina, 409 - Loja A, Prado, Belo Horizonte - MG, CEP 30411-131',
    mapsQuery: 'Rua Platina 409, Prado, Belo Horizonte, MG',
    cnpj: '20.546.775/0001-74',
    foundedYear: 2014,
    phone: '(31) 3293-5006',
    whatsapp: '(31) 99534-2643',
    whatsappLink:
      'https://wa.me/5531995342643?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20um%20produto',
    whatsappTrocas: '(31) 99262-5581',
    whatsappTrocasLink:
      'https://wa.me/5531992625581?text=Ol%C3%A1%2C%20gostaria%20de%20iniciar%20uma%20troca%2Fdevolu%C3%A7%C3%A3o',
    email: 'contato@dpolice.com.br',
    hours: 'Seg a Sex 08:30–19:00 • Sáb 08:30–13:00',
  },
  payment: {
    installments: 4,
    installmentsLabel: 'Em até 4x sem juros',
    methods: ['Cartão (Rede)'] as const,
  },
  exchange: {
    /** Direito de arrependimento (CDC). */
    returnDays: 7,
    /** Troca por defeito ou tamanho. */
    exchangeDays: 30,
  },
  social: {
    instagram: 'https://www.instagram.com/lojadpolice/',
  },
} as const

export type SiteConfig = typeof siteConfig
