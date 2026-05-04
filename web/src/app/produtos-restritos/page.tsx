import type { Metadata } from 'next'
import Link from 'next/link'
import { FileCheck, Gavel, MessageCircle, ShieldAlert } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Produtos restritos & documentação',
  description:
    'Como funciona a venda de uniformes oficiais, distintivos e itens controlados na D Police.',
}

const groups = [
  {
    title: 'Uniformes oficiais',
    examples: 'Camisas C1/B1 PMMG, gandolas, calças operacionais, kit CFSD, uniforme PP MG.',
    docs: 'Identidade funcional vigente da corporação correspondente.',
  },
  {
    title: 'Distintivos, divisas, florões e platinas',
    examples: 'Insígnias de patente, divisas, florões, passadeiras, brevês, brasões.',
    docs: 'Identidade funcional vigente que comprove a graduação.',
  },
  {
    title: 'Itens controlados pelo Exército',
    examples: 'Algemas, tonfa, cinturão de guarnição, fiel retrátil.',
    docs: 'Identidade funcional ou autorização específica conforme Portaria 51-COLOG/2015.',
  },
  {
    title: 'Colégio Tiradentes',
    examples: 'Uniforme escolar, camisas social/trânsito, agasalho, ed. física infantil.',
    docs: 'Comprovante de matrícula vigente do aluno.',
  },
]

export default function ProdutosRestritosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Informação legal"
        title="Produtos restritos & documentação"
        description="A venda de uniformes oficiais, distintivos e itens controlados é regulamentada por lei. Pra te atender com segurança jurídica, alguns produtos exigem comprovação no momento da entrega."
      />

      <section className="container-wide grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Quais produtos exigem documento</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Categorias e os documentos aceitos na entrega ou retirada na loja:
            </p>
          </div>

          <ul className="space-y-3">
            {groups.map((g) => (
              <li
                key={g.title}
                className="border-border bg-card flex gap-4 rounded-lg border p-5"
              >
                <ShieldAlert className="text-brand mt-0.5 size-5 shrink-0" />
                <div className="space-y-1.5 text-sm">
                  <h3 className="text-base font-semibold leading-tight">{g.title}</h3>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Exemplos: </span>
                    {g.examples}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Documento aceito: </span>
                    {g.docs}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-border bg-secondary/50 rounded-lg border p-5 text-sm">
            <h3 className="mb-2 inline-flex items-center gap-2 font-semibold">
              <Gavel className="text-brand size-4" />
              Base legal
            </h3>
            <ul className="text-muted-foreground space-y-1.5 leading-relaxed">
              <li>• Portaria nº 51-COLOG/2015 (controle de produtos pelo Exército)</li>
              <li>• Art. 296 do Código Penal (uso indevido de distintivo público)</li>
              <li>• Regulamento de uniformes da PMMG, CBMMG e Polícia Penal MG</li>
              <li>• Lei 13.709/2018 (LGPD) — proteção dos seus dados</li>
            </ul>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="border-border bg-card rounded-lg border p-5">
            <FileCheck className="text-brand mb-2 size-5" />
            <h3 className="text-base font-semibold">Como você comprova</h3>
            <ol className="text-muted-foreground mt-3 space-y-2 text-sm leading-relaxed">
              <li>
                <span className="text-foreground font-semibold">1.</span> Compra normalmente pelo
                site.
              </li>
              <li>
                <span className="text-foreground font-semibold">2.</span> No checkout, anexa foto/
                escan do documento exigido.
              </li>
              <li>
                <span className="text-foreground font-semibold">3.</span> Nossa equipe valida
                manualmente em até 24h úteis.
              </li>
              <li>
                <span className="text-foreground font-semibold">4.</span> Aprovado, separamos e
                enviamos. Reprovado, devolvemos 100% do valor.
              </li>
            </ol>
          </div>

          <div className="border-border bg-card rounded-lg border p-5">
            <h3 className="text-base font-semibold">Seus dados estão seguros</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Os documentos enviados ficam criptografados, são acessados apenas pela equipe de
              validação e excluídos depois do prazo legal de retenção. Você pode pedir a exclusão a
              qualquer momento — saiba mais na nossa{' '}
              <Link href="/politica-de-privacidade" className="text-brand hover:underline">
                política de privacidade
              </Link>
              .
            </p>
          </div>

          <a
            href={siteConfig.store.whatsappLink}
            target="_blank"
            rel="noopener"
            className="bg-brand text-brand-foreground hover:bg-brand/90 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold uppercase tracking-wide transition-colors"
          >
            <MessageCircle className="size-4" />
            Tirar dúvida no WhatsApp
          </a>
        </aside>
      </section>
    </>
  )
}
