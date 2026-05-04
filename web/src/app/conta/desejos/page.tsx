import type { Metadata } from 'next'
import { Heart } from 'lucide-react'
import { EmptyState } from '@/components/layout/empty-state'
import { PageHeader } from '@/components/layout/page-header'

export const metadata: Metadata = {
  title: 'Lista de desejos',
  description: 'Produtos salvos pra comprar depois.',
  robots: { index: false },
}

export default function DesejosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sua conta"
        title="Lista de desejos"
        description="Salve aqui itens que você quer comprar depois — eles ficam disponíveis no seu próximo acesso."
        breadcrumbs={[{ label: 'Minha conta', href: '/conta' }, { label: 'Desejos' }]}
      />
      <section className="container-wide py-10">
        <EmptyState
          icon={Heart}
          title="Nenhum item salvo ainda"
          description="Toque no coração nos cards de produto pra adicionar à sua lista."
          cta={{ label: 'Explorar produtos', href: '/' }}
        />
      </section>
    </>
  )
}
