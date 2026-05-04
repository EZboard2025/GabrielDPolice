import type { Metadata } from 'next'
import Link from 'next/link'
import { Lock, Mail } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'

export const metadata: Metadata = {
  title: 'Minha conta',
  description: 'Acesse sua conta D Police pra acompanhar pedidos e endereços.',
  robots: { index: false },
}

export default function ContaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Acesso"
        title="Entre na sua conta"
        description="Acompanhe pedidos, salve endereços e gerencie seus documentos."
      />
      <section className="container-wide grid gap-6 py-10 lg:grid-cols-2">
        <div className="border-border bg-card rounded-lg border p-6">
          <h2 className="mb-1 text-lg font-semibold">Já sou cliente</h2>
          <p className="text-muted-foreground mb-5 text-sm">Entre com seu e-mail e senha.</p>
          <form className="space-y-4">
            <label className="block text-sm">
              <span className="text-muted-foreground mb-1.5 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Mail className="size-3.5" />
                E-mail
              </span>
              <input
                type="email"
                name="email"
                required
                placeholder="seu@email.com.br"
                className="border-border bg-background focus:border-brand focus:ring-brand/20 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2"
              />
            </label>
            <label className="block text-sm">
              <span className="text-muted-foreground mb-1.5 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Lock className="size-3.5" />
                Senha
              </span>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="border-border bg-background focus:border-brand focus:ring-brand/20 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2"
              />
            </label>
            <div className="flex items-center justify-between text-xs">
              <label className="text-muted-foreground inline-flex items-center gap-1.5">
                <input type="checkbox" className="accent-brand size-3.5" />
                Lembrar de mim
              </label>
              <Link href="/conta/recuperar-senha" className="text-brand hover:underline">
                Esqueci minha senha
              </Link>
            </div>
            <button
              type="submit"
              disabled
              className="bg-brand text-brand-foreground hover:bg-brand/90 inline-flex h-11 w-full items-center justify-center rounded-md text-sm font-semibold uppercase tracking-wide transition-colors disabled:opacity-60"
            >
              Entrar
            </button>
            <p className="text-muted-foreground text-center text-[11px]">
              Login será habilitado quando o backend estiver pronto.
            </p>
          </form>
        </div>

        <div className="border-border bg-secondary/30 rounded-lg border p-6">
          <h2 className="mb-1 text-lg font-semibold">Sou novo por aqui</h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Crie sua conta em menos de 1 minuto e ganhe acesso a frete mais rápido, histórico de
            pedidos e área pra arquivar seus documentos com segurança.
          </p>
          <ul className="text-muted-foreground mb-6 space-y-2 text-sm">
            <li>• Acompanhe seus pedidos em tempo real</li>
            <li>• Salve endereços e formas de pagamento</li>
            <li>• Receba ofertas exclusivas por e-mail e WhatsApp</li>
            <li>• Documentos arquivados pra próximas compras</li>
          </ul>
          <Link
            href="/conta/cadastro"
            className="border-foreground hover:bg-foreground hover:text-background inline-flex h-11 w-full items-center justify-center rounded-md border-2 text-sm font-semibold uppercase tracking-wide transition-colors"
          >
            Criar minha conta
          </Link>
        </div>
      </section>
    </>
  )
}
