import { AboutSection } from '@/components/marketing/about-section'
import { BestSellers } from '@/components/marketing/best-sellers'
import { HeroCarousel } from '@/components/marketing/hero-carousel'
import { PaymentShippingBar } from '@/components/marketing/payment-shipping-bar'
import { SectionHeading } from '@/components/marketing/section-heading'
import { StoreLocator } from '@/components/marketing/store-locator'
import { UniformCorporations } from '@/components/marketing/uniform-corporations'
import { CategoryTabs } from '@/components/product/category-tabs'

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <PaymentShippingBar />

      <BestSellers />

      <section className="container-wide pb-12">
        <SectionHeading
          eyebrow="Categorias em destaque"
          title="Encontre por departamento"
          description="Curadoria por tipo de produto, do uniforme oficial ao acessório operacional."
        />
        <div className="mt-8">
          <CategoryTabs />
        </div>
      </section>

      <UniformCorporations />

      <AboutSection />

      <StoreLocator />
    </>
  )
}
