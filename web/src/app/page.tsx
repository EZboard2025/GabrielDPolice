import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { WhatsAppFab } from '@/components/layout/whatsapp-fab'
import { AboutSection } from '@/components/marketing/about-section'
import { BestSellers } from '@/components/marketing/best-sellers'
import { HeroCarousel } from '@/components/marketing/hero-carousel'
import { PaymentShippingBar } from '@/components/marketing/payment-shipping-bar'
import { RestrictedInfo } from '@/components/marketing/restricted-info'
import { SectionHeading } from '@/components/marketing/section-heading'
import { StoreLocator } from '@/components/marketing/store-locator'
import { UniformCorporations } from '@/components/marketing/uniform-corporations'
import { CategoryTabs } from '@/components/product/category-tabs'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
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

        <RestrictedInfo />

        <AboutSection />

        <StoreLocator />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
