import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react'
import { ProductGrid } from '@/components/product/product-grid'
import { SectionHeading } from '@/components/marketing/section-heading'
import { discountPercent, formatBRL, installments } from '@/lib/format'
import { getProductBySlug, getRelatedProducts } from '@/lib/products'
import { siteConfig } from '@/lib/site-config'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Produto não encontrado' }
  return {
    title: product.name,
    description: `${product.name} — ${product.category.name}. ${formatBRL(product.price)} ou ${installments(product.price, siteConfig.payment.installments)}.`,
    openGraph: {
      images: product.images.length > 0 ? [product.images[0].url] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const off = product.comparePrice ? discountPercent(product.price, product.comparePrice) : 0
  const related = getRelatedProducts(slug, 5)
  const cover = product.images[0]
  const gallery = product.images.slice(1)

  return (
    <>
      <section className="container-wide py-6">
        <Link
          href={`/categoria/${product.category.slug}`}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Voltar para {product.category.name}
        </Link>
      </section>

      <section className="container-wide grid gap-10 pb-14 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-3">
          <div className="bg-muted/40 border-border relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={cover.url}
              alt={cover.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6"
            />
            {off > 0 && (
              <span className="bg-destructive absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white shadow">
                -{off}%
              </span>
            )}
          </div>
          {gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {gallery.map((img, i) => (
                <div
                  key={i}
                  className="bg-muted/40 border-border relative aspect-square overflow-hidden rounded-md border"
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes="120px"
                    className="object-contain p-2"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-muted-foreground mb-1 text-xs uppercase tracking-wider">
              {product.category.name}
            </p>
            <h1 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
              {product.name}
            </h1>
          </div>

          <div className="border-border bg-card space-y-2 rounded-lg border p-5">
            {product.comparePrice && product.comparePrice > product.price && (
              <p className="text-muted-foreground text-sm line-through">
                de {formatBRL(product.comparePrice)}
              </p>
            )}
            <p className="text-3xl font-bold leading-none md:text-4xl">
              {formatBRL(product.price)}
            </p>
            <p className="text-muted-foreground text-sm">
              ou {installments(product.price, siteConfig.payment.installments)}
            </p>
            <p className="text-success inline-flex items-center gap-1.5 pt-1 text-xs font-semibold">
              <CheckCircle2 className="size-4" />
              5% de desconto à vista no PIX
            </p>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              className="bg-brand text-brand-foreground hover:bg-brand/90 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold uppercase tracking-wide transition-colors"
            >
              <ShoppingBag className="size-5" />
              Adicionar ao carrinho
            </button>
            <a
              href={`${siteConfig.store.whatsappLink.split('?')[0]}?text=${encodeURIComponent(`Olá! Quero saber mais sobre: ${product.name}`)}`}
              target="_blank"
              rel="noopener"
              className="border-border hover:bg-secondary inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors"
            >
              <MessageCircle className="size-4" />
              Tirar dúvida no WhatsApp
            </a>
          </div>

          <ul className="border-border divide-border divide-y rounded-lg border text-sm">
            <li className="flex items-center gap-3 p-3">
              <Truck className="text-brand size-4 shrink-0" />
              <span>
                Frete grátis a partir de {formatBRL(siteConfig.shipping.freeAbove)} via{' '}
                {siteConfig.shipping.provider}
              </span>
            </li>
            <li className="flex items-center gap-3 p-3">
              <CreditCard className="text-brand size-4 shrink-0" />
              <span>{siteConfig.payment.installmentsLabel} no cartão de crédito</span>
            </li>
            <li className="flex items-center gap-3 p-3">
              <ShieldCheck className="text-brand size-4 shrink-0" />
              <span>Compra 100% segura — site protegido com SSL 256 bits</span>
            </li>
          </ul>

          <div className="border-border bg-secondary/40 rounded-lg border p-4 text-sm">
            <p className="font-semibold">Retirada na loja física</p>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              {siteConfig.store.address}.<br />
              {siteConfig.store.hours}.
            </p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-border border-t">
          <div className="container-wide py-12">
            <SectionHeading
              eyebrow="Você também pode gostar"
              title="Itens relacionados"
              ctaHref={`/categoria/${product.category.slug}`}
            />
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
