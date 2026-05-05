import { Award, Layers, MapPin, ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { categoryCount, productCount } from '@/lib/products'

const stats = [
  {
    icon: Award,
    title: `Desde ${siteConfig.store.foundedYear}`,
    description: 'Em Belo Horizonte/MG',
  },
  {
    icon: MapPin,
    title: 'Loja física no Prado',
    description: 'Atendimento presencial e retirada de pedidos',
  },
  {
    icon: Layers,
    title: `${productCount} produtos`,
    description: `em ${categoryCount} categorias do catálogo`,
  },
  {
    icon: ShieldCheck,
    title: 'PMMG, PPMG, CBMMG, CT',
    description: 'Uniformes oficiais por corporação',
  },
]

export function AboutSection() {
  return (
    <section className="bg-secondary/30 border-border border-y">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-brand text-xs font-semibold uppercase tracking-[0.2em]">
            Sobre a D Police
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Equipamento sério para quem leva a profissão a sério.
          </h2>
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
            Comércio de uniformes e artigos civis e militares em Belo Horizonte/MG. Atendemos
            profissionais da PMMG, Polícia Penal MG, Bombeiros Militares e alunos do Colégio
            Tiradentes.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.title} className="bg-card border-border rounded-lg border p-5">
              <s.icon className="text-brand mb-3 size-5" />
              <p className="text-lg font-bold leading-tight">{s.title}</p>
              <p className="text-muted-foreground mt-1 text-xs leading-snug">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
