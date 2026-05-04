export type Money = number

export type ProductImage = {
  url: string
  alt: string
}

export type ProductVariant = {
  id: string
  name: string
  size?: string
  color?: string
  sku?: string
  stock: number
}

export type Product = {
  id: string
  slug: string
  name: string
  description?: string
  price: Money
  comparePrice?: Money
  images: ProductImage[]
  category: { slug: string; name: string }
  variants?: ProductVariant[]
  badges?: ProductBadge[]
  restrictions?: ProductRestriction
  isNew?: boolean
}

export type ProductBadge = 'lancamento' | 'mais-vendido' | 'oferta' | 'restrito'

export type ProductRestriction = {
  required: boolean
  acceptedDocs: AcceptedDocType[]
  reason?: string
}

export type AcceptedDocType =
  | 'cac'
  | 'identidade-funcional-pm'
  | 'identidade-funcional-bombeiro'
  | 'identidade-funcional-policia-penal'
  | 'identidade-funcional-policia-civil'
  | 'identidade-funcional-guarda-municipal'
  | 'porte-arma'
  | 'matricula-colegio-tiradentes'

export type Category = {
  slug: string
  name: string
  description?: string
  parent?: string
  children?: Category[]
}
