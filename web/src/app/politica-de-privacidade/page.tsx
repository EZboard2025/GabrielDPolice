import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/page-header'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description: `Como a ${siteConfig.name} coleta, usa e protege seus dados pessoais conforme a LGPD.`,
}

const sections = [
  {
    title: '1. Quem somos',
    body: `${siteConfig.name}, CNPJ ${siteConfig.store.cnpj}, com endereço em ${siteConfig.store.address}, é a controladora dos dados pessoais coletados nesta loja online (dpolice.com.br).`,
  },
  {
    title: '2. Quais dados coletamos',
    body: 'Cadastrais (nome, CPF, RG, e-mail, telefone), endereço de entrega, dados de pagamento (processados por gateway terceiro), histórico de pedidos, e — quando aplicável a produtos restritos — documentos funcionais ou comprovantes de matrícula que você nos enviar.',
  },
  {
    title: '3. Para que usamos',
    body: 'Para processar pedidos, emitir notas fiscais, calcular e despachar fretes, validar elegibilidade para compra de produtos restritos, prestar atendimento e (com seu consentimento) enviar comunicações de marketing.',
  },
  {
    title: '4. Base legal (LGPD)',
    body: 'Execução de contrato (compra), cumprimento de obrigação legal (NF, validação de produto restrito), legítimo interesse (segurança e prevenção de fraude) e consentimento (marketing).',
  },
  {
    title: '5. Compartilhamento',
    body: 'Compartilhamos dados estritamente necessários para a execução do contrato: com a empresa responsável pelo processamento de pagamentos e com a transportadora responsável pela entrega. Conforme nossa política, não vendemos seus dados a terceiros.',
  },
  {
    title: '6. Retenção',
    body: 'Dados de cadastro e pedidos: prazo da relação comercial + 5 anos (Código Tributário e CDC). Documentos de validação de produtos restritos: 30 dias após a entrega ou prazo definido por regulamento, o que for maior.',
  },
  {
    title: '7. Seus direitos',
    body: 'Você pode a qualquer momento: confirmar a existência de tratamento, acessar seus dados, corrigir, anonimizar, bloquear, eliminar, portar e revogar consentimento. É só nos pedir pelos canais de atendimento.',
  },
  {
    title: '8. Segurança',
    body: 'Criptografia em trânsito (TLS 1.3) e em repouso, controle de acesso por papéis, logs de auditoria e revisão periódica de fornecedores.',
  },
  {
    title: '9. Cookies',
    body: 'Usamos cookies essenciais (sessão, carrinho), de desempenho (analytics anonimizado) e — com seu consentimento — de marketing. Você pode gerenciar pelo seu navegador.',
  },
  {
    title: '10. Encarregado (DPO)',
    body: `Para exercer direitos ou tirar dúvidas, fale com nosso encarregado em ${siteConfig.store.whatsapp} ou na loja física.`,
  },
]

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <PageHeader
        eyebrow="LGPD"
        title="Política de privacidade"
        description={`Última atualização: ${new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}.`}
      />
      <section className="container-wide max-w-3xl py-12">
        <div className="prose prose-sm md:prose-base text-foreground space-y-6">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="mb-2 text-lg font-bold tracking-tight md:text-xl">{s.title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
