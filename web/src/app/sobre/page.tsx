import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, MapPin, RefreshCcw, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { categoryCount, productCount } from '@/lib/products'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Sobre a D Police',
  description: 'Comércio de uniformes e artigos civis e militares em Belo Horizonte/MG.',
}

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Foco em uniformes oficiais',
    description:
      'Trabalhamos com PMMG, Polícia Penal MG, Bombeiros Militares, Colégio Tiradentes e linha CFSD.',
  },
  {
    icon: Award,
    title: 'Loja física consolidada',
    description: `Atuamos desde ${siteConfig.store.foundedYear} no Prado, em Belo Horizonte/MG.`,
  },
  {
    icon: RefreshCcw,
    title: 'Política de troca e devolução',
    description: `Troca em ${siteConfig.exchange.exchangeDays} dias por defeito ou tamanho. Devolução em ${siteConfig.exchange.returnDays} dias úteis (CDC).`,
  },
  {
    icon: MapPin,
    title: 'Atendimento em BH e online',
    description: 'Loja física no Prado e venda online com pedido e dúvida pelo WhatsApp.',
  },
]

export default function SobrePage() {
  return (
    <>
      <PageHeader
        eyebrow="Quem somos"
        title="D Police — uniformes e artigos civis e militares."
        description="Comércio especializado de fardamento, calçado e equipamentos para forças de segurança e alunos do Colégio Tiradentes, com loja física em Belo Horizonte/MG."
      />

      <section className="container-wide grid gap-10 py-12 lg:grid-cols-2">
        <div className="space-y-4 text-sm leading-relaxed md:text-base">
          <p>
            A {siteConfig.name} ({siteConfig.legalName}) atua no comércio de uniformes e artigos
            civis e militares, com loja física em Belo Horizonte/MG desde{' '}
            {siteConfig.store.foundedYear}.
          </p>
          <p>
            Nosso catálogo inclui itens para profissionais da PMMG, Polícia Penal MG, Bombeiros
            Militares, alunos do Colégio Tiradentes e candidatos do CFSD, além de calçados,
            coldres, mochilas e acessórios táticos.
          </p>
          <p className="text-muted-foreground text-sm">
            CNPJ {siteConfig.store.cnpj}.
          </p>
          <Link
            href="/loja-fisica"
            className="text-brand inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wider hover:underline"
          >
            Ver endereço e horário →
          </Link>
        </div>

        <div className="border-border bg-tactical-charcoal text-background relative overflow-hidden rounded-xl border p-8">
          <p className="text-tactical-tan mb-3 text-xs font-semibold uppercase tracking-[0.25em]">
            Em números
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-3xl font-bold">{new Date().getFullYear() - siteConfig.store.foundedYear}+</p>
              <p className="text-background/70 text-xs uppercase tracking-wider">anos de mercado</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{productCount}</p>
              <p className="text-background/70 text-xs uppercase tracking-wider">
                produtos no catálogo
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold">{categoryCount}</p>
              <p className="text-background/70 text-xs uppercase tracking-wider">
                categorias de produto
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
