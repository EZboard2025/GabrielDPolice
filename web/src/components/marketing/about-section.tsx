import { Award, MapPin, Truck, Users } from 'lucide-react'

const stats = [
  {
    icon: Award,
    title: '10+ anos',
    description: 'no mercado de equipamentos policiais e militares',
  },
  {
    icon: Users,
    title: '+15.000',
    description: 'clientes atendidos em Minas Gerais',
  },
  {
    icon: MapPin,
    title: 'Loja física BH',
    description: 'no Prado, com retirada em até 2h',
  },
  {
    icon: Truck,
    title: 'Frete em todo o BR',
    description: 'via Melhor Envio (PAC, SEDEX, transportadora)',
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
            Somos referência em uniformes e equipamentos para PMMG, Polícia Penal, Bombeiro Militar,
            alunos do Colégio Tiradentes e profissionais de segurança pública e privada. Cada item
            que vendemos passa por curadoria técnica e atende às regulamentações vigentes.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div
              key={s.title}
              className="bg-card border-border rounded-lg border p-5"
            >
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
