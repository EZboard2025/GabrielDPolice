import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, MapPin, ShieldCheck, Truck } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Sobre a D Police',
  description: 'Quem somos, no que acreditamos e como atendemos a quem leva a profissão a sério.',
}

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Curadoria técnica',
    description:
      'Cada modelo passa por avaliação da nossa equipe operacional, com critérios de durabilidade, ergonomia e conformidade com regulamento.',
  },
  {
    icon: Award,
    title: 'Marcas reconhecidas',
    description:
      'Trabalhamos só com fabricantes auditados, com NF, garantia e reposição de peças quando aplicável.',
  },
  {
    icon: Truck,
    title: 'Entrega em todo o BR',
    description:
      'Enviamos via Melhor Envio (PAC, SEDEX, transportadora) com rastreio. Frete grátis a partir de R$ 300.',
  },
  {
    icon: MapPin,
    title: 'Loja física no Prado',
    description:
      'Atendimento presencial pra prova de uniformes, retirada em até 2h e demonstração de equipamentos táticos.',
  },
]

export default function SobrePage() {
  return (
    <>
      <PageHeader
        eyebrow="Quem somos"
        title="Equipamento sério para quem leva a profissão a sério."
        description="A D Police nasceu em Belo Horizonte com a missão de dar acesso a uniformes e equipamentos confiáveis pra forças de segurança, alunos do Colégio Tiradentes e profissionais do setor privado."
      />

      <section className="container-wide grid gap-10 py-12 lg:grid-cols-2">
        <div className="space-y-4 text-sm leading-relaxed md:text-base">
          <p>
            Somos especialistas em fardamento e equipamentos táticos para PMMG, Polícia Penal MG,
            Corpo de Bombeiros Militar, alunos do Colégio Tiradentes e profissionais de segurança
            pública e privada em todo o Brasil.
          </p>
          <p>
            Mais do que vender, nosso compromisso é entregar peças que tenham uso real em campo —
            por isso testamos os modelos com nossos próprios consultores, em condições de operação,
            antes de oferecer pra você.
          </p>
          <p>
            Atuamos dentro das regulamentações vigentes para produtos restritos. Itens
            controlados pelo Exército, distintivos e uniformes oficiais exigem documentação
            válida no momento da entrega — isso protege a corporação e o profissional.
          </p>
          <Link
            href="/loja-fisica"
            className="text-brand inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wider hover:underline"
          >
            Conheça nossa loja física →
          </Link>
        </div>

        <div className="border-border bg-tactical-charcoal text-background relative overflow-hidden rounded-xl border p-8">
          <p className="text-tactical-tan mb-3 text-xs font-semibold uppercase tracking-[0.25em]">
            Em números
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-3xl font-bold">10+</p>
              <p className="text-background/70 text-xs uppercase tracking-wider">anos de mercado</p>
            </div>
            <div>
              <p className="text-3xl font-bold">15.000+</p>
              <p className="text-background/70 text-xs uppercase tracking-wider">
                clientes em MG e BR
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold">112</p>
              <p className="text-background/70 text-xs uppercase tracking-wider">
                produtos no catálogo
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold">5</p>
              <p className="text-background/70 text-xs uppercase tracking-wider">
                corporações atendidas
              </p>
            </div>
          </div>
          <div className="border-background/10 mt-8 border-t pt-6 text-sm">
            <p className="font-semibold">{siteConfig.name}</p>
            <p className="text-background/75 text-xs">CNPJ {siteConfig.store.cnpj}</p>
            <p className="text-background/75 mt-1 text-xs">{siteConfig.store.address}</p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 border-border border-y">
        <div className="container-wide grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title} className="space-y-2">
              <p.icon className="text-brand size-6" />
              <h3 className="text-base font-semibold">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
