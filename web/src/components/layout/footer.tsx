import Link from 'next/link'
import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { DPoliceLogo } from './dpolice-logo'

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}
import { siteConfig } from '@/lib/site-config'
import { categories } from '@/lib/categories'

const institutionalLinks = [
  { href: '/sobre', label: 'Sobre a D Police' },
  { href: '/loja-fisica', label: 'Loja física' },
  { href: '/politica-de-privacidade', label: 'Política de privacidade (LGPD)' },
  { href: '/politica-de-trocas-e-devolucoes', label: 'Trocas e devoluções' },
  { href: '/produtos-restritos', label: 'Produtos restritos & documentos' },
  { href: '/atendimento', label: 'Central de atendimento' },
]

const paymentMethods = ['Cartão de Crédito (Rede)']

export function Footer() {
  return (
    <footer className="bg-tactical-charcoal text-background/85 mt-20">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <DPoliceLogo variant="inverse" className="h-24 w-auto" />
          <p className="max-w-xs text-sm leading-relaxed opacity-80">
            Equipamentos policiais e militares com atendimento especializado em Belo Horizonte/MG
            desde 2014.
          </p>
          <div className="space-y-2 text-sm">
            <p className="inline-flex items-start gap-2 opacity-90">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>{siteConfig.store.address}</span>
            </p>
            <p className="inline-flex items-center gap-2 opacity-90">
              <Phone className="size-4" />
              <a href={`tel:${siteConfig.store.phone.replace(/\D/g, '')}`} className="hover:underline">
                {siteConfig.store.phone}
              </a>
            </p>
            <p className="inline-flex items-center gap-2 opacity-90">
              <MessageCircle className="size-4" />
              <a href={siteConfig.store.whatsappLink} target="_blank" rel="noopener" className="hover:underline">
                {siteConfig.store.whatsapp}
              </a>
            </p>
            <p className="inline-flex items-center gap-2 opacity-90">
              <Clock className="size-4" />
              {siteConfig.store.hours}
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className="hover:bg-background/10 inline-flex size-9 items-center justify-center rounded-md border border-white/10 transition-colors"
            >
              <InstagramGlyph className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-background mb-4 text-xs font-semibold uppercase tracking-widest">
            Categorias
          </h3>
          <ul className="space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/categoria/${cat.slug}`}
                  className="hover:text-background opacity-80 transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-background mb-4 text-xs font-semibold uppercase tracking-widest">
            Institucional
          </h3>
          <ul className="space-y-2 text-sm">
            {institutionalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-background opacity-80 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-background mb-4 text-xs font-semibold uppercase tracking-widest">
            Formas de pagamento
          </h3>
          <ul className="grid gap-2 text-xs">
            {paymentMethods.map((method) => (
              <li
                key={method}
                className="border-white/10 bg-background/5 inline-flex items-center justify-center rounded-md border px-2 py-2"
              >
                {method}
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 text-xs opacity-75">
            <p>{siteConfig.payment.installmentsLabel}.</p>
            <p>Site protegido com certificado SSL 256 bits.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-start gap-3 py-6 text-xs opacity-70 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} D Police — CNPJ {siteConfig.store.cnpj}. Todos os direitos
            reservados.
          </p>
          <p>Itens com restrição legal exigem documentação válida na entrega.</p>
        </div>
      </div>
    </footer>
  )
}
