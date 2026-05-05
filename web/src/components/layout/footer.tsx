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

function ThreadsGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 192 192" className={className} fill="currentColor" aria-hidden="true">
      <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.892 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.194 47.292 9.642 32.788 28.08 19.882 44.485 13.224 67.315 13.001 95.932L13 96l.001.067c.222 28.617 6.881 51.447 19.787 67.853C47.292 182.358 68.882 191.806 96.957 192h.113c24.96-.173 42.554-6.708 57.048-21.189 18.963-18.945 18.392-42.692 12.142-57.27-4.484-10.454-13.033-18.945-24.723-24.553Zm-43.696 36.95c-10.44.588-21.286-4.098-21.821-14.135-.397-7.442 5.296-15.747 22.461-16.735 1.966-.114 3.895-.169 5.79-.169 6.235 0 12.068.606 17.371 1.765-1.978 24.702-13.58 28.713-23.801 29.273Z" />
    </svg>
  )
}

function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" />
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
            <p className="flex items-start gap-2 opacity-90">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>{siteConfig.store.address}</span>
            </p>
            <p className="flex items-center gap-2 opacity-90">
              <Phone className="size-4 shrink-0" />
              <a href={`tel:${siteConfig.store.phone.replace(/\D/g, '')}`} className="hover:underline">
                {siteConfig.store.phone}
              </a>
            </p>
            <p className="flex items-center gap-2 opacity-90">
              <MessageCircle className="size-4 shrink-0" />
              <a href={siteConfig.store.whatsappLink} target="_blank" rel="noopener" className="hover:underline">
                {siteConfig.store.whatsapp}
              </a>
            </p>
            <p className="flex items-center gap-2 opacity-90">
              <Clock className="size-4 shrink-0" />
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
            <a
              href={siteConfig.social.threads}
              target="_blank"
              rel="noopener"
              aria-label="Threads"
              className="hover:bg-background/10 inline-flex size-9 items-center justify-center rounded-md border border-white/10 transition-colors"
            >
              <ThreadsGlyph className="size-4" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
              className="hover:bg-background/10 inline-flex size-9 items-center justify-center rounded-md border border-white/10 transition-colors"
            >
              <FacebookGlyph className="size-4" />
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
