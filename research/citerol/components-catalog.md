# Citerol — Catálogo de componentes UI

> Storybook em texto. Cada componente listado com nome, função, anatomia, estados, onde aparece, e props sugeridas pra implementar no D Police (Next.js + shadcn/ui).

---

## 1. `<TopBar />` — Faixa de utilidades

**Função:** Comunicar política de frete + canais de contato direto sem ocupar espaço de header.

**Anatomia (3 itens horizontal):**
1. Ícone caminhão + label "FRETE GRÁTIS A PARTIR DE R$ 300"
2. Ícone WhatsApp + número clicável "(31) 3506-6954"
3. Ícone uniforme + "ROTEIRO DO CAMINHÃO" → link

**Estados:**
- Desktop: 3 colunas, justify entre itens
- Mobile: vira carrossel/scroll-x ou stack
- Sticky? **Não** — só o header principal fica sticky

**Onde aparece:** topo de **toda página**.

**Props sugeridas (D Police):**
```ts
type TopBarItem = { icon: ReactNode; label: string; href?: string };
<TopBar items={[...]} />
```

---

## 2. `<Header />` — Cabeçalho principal

**Função:** Logo + navegação + auth + busca.

**Anatomia (Citerol, 3 zonas):**
- **Esquerda:** Logo
- **Centro:** Menu horizontal (Roupas | Acessórios | Uniformes para Órgãos Públicos | Uniformes para Empresas | Mais Vendidos | Outlet | Vídeos)
- **Direita:** "Entrar"

**Observação chave:** Citerol **não** mostra ícone de carrinho destacado — tem "Entrar" minimalista. Provavelmente VTEX padrão tem mini-cart drawer mas o WebFetch não capturou. Pra D Police vamos **adicionar** carrinho + busca + login com ícones, que é UX moderna.

**Sub-componentes:**
- `<Logo />`
- `<MainNav />` — links horizontais
- `<MegaMenu />` — drop-down ao hover/click em "Roupas", "Acessórios", "Uniformes"
- `<UserActions />` — Login/Cart/Wishlist

**Estados:**
- Sticky on scroll (sombra leve)
- Mobile: hamburger → drawer lateral

---

## 3. `<MegaMenu />` — Menu expansível por categoria

**Função:** Mostrar todas as subcategorias de uma vez (UX desktop forte).

**Estrutura observada (Roupas):**
- Coluna única com lista vertical: Bermudas, Calças, Camisas, Camisetas, Jaquetas, Polos

**Estrutura observada (Acessórios):**
- Coluna única: Algemas, Bandoleiras, Boinas, Bonés, Botas, Capas de Colete, Cintos, Coldres, Cuecas, Embalagem para presente, Meias, Mochilas, Sapatos, Tênis, Utilitários Militares

**Estrutura observada (Uniformes para Órgãos Públicos) — duas colunas:**
- Col 1 "SELECIONE SUA CORPORAÇÃO": Bombeiro Militar MG, Colégio Tiradentes, Guarda Municipal, Polícia Civil MG, Polícia Militar MG, Polícia Penal MG, Sejusp MG, Socioeducativo MG
- Col 2 "CATEGORIAS": Calças, Camisas e Gandolas, Camisetas, Cintos, Coberturas, Divisas, Florão, Jaquetas, Saias, Shorts, Sungas, Tarjeta

**Estados:** open on hover (desktop) / accordion expandido (mobile)

**D Police adaptação:**
- Substituir corporações pelos **focos da D Police**: PMMG, CBMMG, Polícia Civil MG, Polícia Penal MG, **Colégio Tiradentes**, **CFSD 2025** (concursandos preparatórios)
- Adicionar coluna "DESTAQUE" com banner promocional dentro do mega menu

---

## 4. `<HeroCarousel />` — Carrossel de banners

**Função:** Comunicar promoções, lançamentos e linhas-foco.

**Anatomia:**
- Slide = imagem full-bleed (recortada do produto em uso ou packshot)
- Título sobreposto + CTA "CONHEÇA"
- Setas laterais < / >
- Provável bullets ao final (não confirmado)

**9 slides na home Citerol** (excessivo, é melhor 3-5 no D Police).

**Estados:**
- Auto-play (~5s), pausa on hover
- Swipe touch
- Lazy-load nos slides não visíveis

**Props sugeridas:**
```ts
type Slide = { image: string; title: string; eyebrow?: string; cta: { label: string; href: string }; theme?: 'light'|'dark' };
<HeroCarousel slides={...} interval={5000} />
```

---

## 5. `<CategoryShortcutGrid />` — Atalhos de categoria

**Função:** Levar usuário direto pra PLP sem passar pelo mega menu.

**Anatomia (Citerol):**
- 12 cards em grid (desktop 4 col)
- Cada card: imagem do produto representativo + label embaixo

**D Police adaptação:**
- Reduzir para 6-8 cards (less is more)
- Foco: Camisas Táticas, Calças Táticas, Coturnos, Cintos, Acessórios, Uniformes Oficiais (com ícone IA-validado), CFSD 2025, Colégio Tiradentes

---

## 6. `<CorporationBlock />` — Cards de corporação

**Função:** Atalho para PLPs específicas de uniformes oficiais.

**Anatomia:**
- 5 cards horizontais grandes
- Imagem com militar/policial uniformizado (lifestyle, não packshot)
- Label da sigla embaixo (PMMG, CBMMG, CTPM, PPMG, GCM)

**D Police adaptação:**
- Manter exatamente esse padrão — é um diferencial visual forte
- Adicionar **selo "Validação IA"** no canto do card pra reforçar diferencial
- Cores institucionais discretas (faixa azul para PMMG, vermelha para CBMMG, etc.)

---

## 7. `<ProductCard />` — Card de produto (CRÍTICO)

**Função:** Unidade base do grid de produtos. Citerol tem **2 variações**.

### 7.a `<ProductCard variant="shelf" />` (na home)

Card com **CTA inline**, mais agressivo:

```
┌─────────────────────────────┐
│ [LANÇAMENTO]                │  ← badge top-left
│                             │
│      [Imagem produto]       │  ← fundo branco, ratio ~1:1
│                             │
├─────────────────────────────┤
│ WORKSHIRT CAMISA TITAN      │  ← H3, 2 linhas max
│ VERDE OLIVA MANGA LONGA     │
│                             │
│ R$ 229,99                   │  ← preço grande, peso bold
│ Ou 4x de R$ 57,49 sem juros │  ← parcelamento, cinza
│                             │
│ [Tamanho ▼]  [Adicionar ▶]  │  ← seletor + CTA inline
└─────────────────────────────┘
```

### 7.b `<ProductCard variant="grid" />` (na PLP)

Card sem CTA inline (clique no card todo vai pra PDP):

```
┌─────────────────────────────┐
│ [-91%]                      │  ← badge desconto
│                             │
│      [Imagem produto]       │
│                             │
├─────────────────────────────┤
│ Bota Brute Alfa             │
│ Impermeável Preto           │
│ R$ 579,99                   │
│ Ou 6x de R$ 96,66 sem juros │
└─────────────────────────────┘
```

**Anatomia compartilhada:**

| Elemento       | Detalhe                                                      |
|----------------|--------------------------------------------------------------|
| Imagem         | Fundo branco, produto centralizado, ratio quadrado/3:4       |
| Badge          | Top-left, retangular sem radius, uppercase                   |
| Tipos de badge | "LANÇAMENTO" (preto), "PRÉ-VENDA" (vermelho), "-X%" (vermelho), "Leve 4 Pague 3" (vermelho), "50% OFF na 3ª peça", "NOVO PADRÃO PMMG" |
| Nome           | 2 linhas max, font-medium, ink primary                       |
| Preço          | font-bold, ink primary (não vermelho — vermelho é só badge)  |
| Parcelamento   | font-regular, ink-muted, "Ou Xx de R$ Y,YY sem juros"        |
| Variantes cor  | **NÃO mostradas no card** (cada cor é produto separado)      |
| Wishlist       | Não observado                                                |
| Hover          | Imagem dá zoom 1.03, sombra eleva                            |

**Props sugeridas (D Police):**
```ts
type ProductCardProps = {
  variant?: 'shelf' | 'grid';
  image: { src: string; alt: string };
  name: string;
  price: number;
  installments?: { count: number; value: number; interestFree: boolean };
  pixDiscount?: number;        // % off no PIX (D Police feature)
  badge?: { label: string; tone: 'launch' | 'promo' | 'preorder' | 'official' };
  sizes?: string[];            // só shelf
  href: string;
  isOfficialUniform?: boolean; // D Police: badge "Validação IA"
};
```

---

## 8. `<FilterSidebar />` — Sidebar de filtros

**Função:** Refinar lista de produtos por facets.

**Anatomia (Citerol):**
- Sidebar fixa à esquerda (~240-280px)
- Cada facet em **acordeão** (expandido por default os mais relevantes)
- Checkbox list dentro do acordeão
- Filtro de preço com slider/input (mín-máx)

**Facets observados:**
1. Departamento (top-level)
2. Categoria
3. Subcategoria
4. Gênero
5. Marca
6. Tamanho
7. Tipo
8. Faixa de preço

**Estados:**
- Expandido / colapsado
- Item checked / unchecked
- Filtros ativos exibidos como **chips/tags removíveis** no topo do grid (UX moderna, não confirmada no Citerol mas recomendada)

**Mobile:** drawer lateral acionado por botão "Filtrar".

---

## 9. `<SortDropdown />` — Ordenação

**Função:** Reordenar grid.

**Posição:** Topo direito do grid de produtos (acima dos cards).

**Opções (Citerol):**
- Relevância (default)
- Mais vendidos
- Mais recentes
- Desconto
- Preço: maior para menor
- Preço: menor para maior
- Nome crescente
- Nome decrescente

**Estados:** select nativo ou dropdown shadcn (`<Select>`).

---

## 10. `<ResultCounter />` — Contador de produtos

**Função:** Microcopy "X Produtos" acima do grid (à esquerda do `SortDropdown`).

**Exemplo:** "212 Produtos", "0 Produto" (singular sem 's' quando 0/1).

---

## 11. `<LoadMoreButton />` — Pagination progressiva

**Função:** Carregar mais produtos sem refresh.

**Estilo:** Botão centralizado abaixo do grid, label "Mostrar mais", peso bold, com possível contador.

**Estados:** loading → spinner inline.

**Recomendação D Police:** combinar `Mostrar mais` + scroll infinito após primeira interação (UX da Shopee/MagaLu).

---

## 12. `<Breadcrumb />` — Navegação contextual

**Função:** Mostrar caminho da hierarquia.

**Padrão Citerol:** `Home > camisas` (label igual ao slug, lowercase).

**Recomendação D Police:** Title Case nos labels (`Camisas`), com separador `›` ou `/`.

---

## 13. `<BenefitsBlock />` — Bloco de benefícios

**Função:** Reforçar valor pós-prateleira.

**Anatomia:** 3 cards em row, cada um com ícone + título + descrição curta.

**Conteúdo Citerol:**
1. Frete grátis acima de R$ 300
2. Até 6x sem juros
3. Descontos exclusivos no site

**D Police adaptação:**
1. Validação por IA em segundos
2. PIX com 5% off
3. Frete grátis acima de R$ X
4. (Opcional) Compra direto pelo WhatsApp

---

## 14. `<StoreLocator />` — Localizador de lojas

**Função:** Listar pontos físicos.

**Anatomia (Citerol):**
- Heading "ENCONTRE A LOJA MAIS PERTO DE VOCÊ"
- Lista vertical de 12 lojas
- Cada item: nome + endereço + cidade/UF + telefone (link `tel:`) + WhatsApp (link `wa.me`)
- Sem mapa, sem foto, sem horário, sem busca

**D Police adaptação:** se a marca tiver loja física, replicar simples; se for 100% e-commerce, **substituir por bloco "Atendimento Especializado"** (WhatsApp consultor, validação por IA, garantia D Police).

---

## 15. `<Footer />` — Rodapé

**Função:** Navegação institucional, contato, legal, pagamentos.

**Anatomia (Citerol):**
- Linha 1: 4 colunas (INSTITUCIONAL, AJUDA, ATENDIMENTO, SIGA A CITEROL)
- Linha 2: faixa "compre com segurança" + logos PIX/Mastercard/Visa/Elo/Amex/Hipercard
- Linha 3: "Powered by VTEX" + Let's Encrypt
- Linha 4 (legal): logo + razão social + CNPJ + endereço sede

**D Police adaptação:**
- 4 colunas: Institucional / Ajuda / Atendimento (WhatsApp + e-mail) / Siga a D Police
- Faixa de pagamentos: PIX, Mastercard, Visa, Elo, Amex, Hipercard, **Mercado Pago** (logos)
- Faixa "Powered by Mercado Pago" + selo SSL
- Linha legal com razão social + CNPJ

---

## 16. `<WhatsAppFAB />` — Botão flutuante WhatsApp

**Função:** CTA persistente de canal direto.

**Citerol:** **Não confirmado FAB** (top bar tem WhatsApp, mas não vi FAB flutuante no markdown). Recomendação D Police: adicionar.

**Anatomia:**
- Posição fixed bottom-right, ~24px de margem
- Ícone WhatsApp 56x56 em círculo
- Pulsa sutilmente quando inativo
- Ao hover/click: balão de mensagem com texto pré-preenchido

**Estados:** default, hover (escala 1.05), pulse animation

---

## 17. `<Badge />` — Tags decorativas

**Variantes observadas:**

| Tipo            | Texto exemplo                | Cor de fundo | Cor de texto |
|-----------------|------------------------------|--------------|--------------|
| `launch`        | "LANÇAMENTO"                 | preto        | branco       |
| `promo`         | "-91%", "-50%"               | vermelho     | branco       |
| `preorder`      | "PRÉ-VENDA"                  | vermelho     | branco       |
| `bundle`        | "Leve 4 Pague 3", "50% OFF na 3ª peça" | vermelho | branco |
| `pattern`       | "NOVO PADRÃO PMMG"           | vermelho/azul| branco       |
| `official` (D Police novo) | "VALIDAÇÃO IA"    | azul primary | branco       |

**Estilo:** retangular sem radius, padding x=8 y=4, font 0.6875rem bold UPPERCASE letter-spacing 0.08em.

---

## 18. `<PriceBlock />` — Bloco de preço

**Estrutura padrão (Citerol):**
```
R$ 579,99
Ou 6 x de R$ 96,66 sem juros
```

**Variante "de/por" (em outlet):**
```
de R$ 599,99
por R$ 199,99   ← peso bold
Ou 4 x de R$ 49,99 sem juros
```

**D Police: adicionar linha PIX:**
```
de R$ 599,99
por R$ 199,99
ou R$ 189,99 no PIX (5% off)
Ou 4 x de R$ 49,99 sem juros
```

---

## 19. `<MiniCart />` (inferido) — Drawer do carrinho

VTEX padrão tem mini-cart drawer; não foi capturado pelo WebFetch. Pra D Police: implementar drawer lateral com lista de itens, subtotal, frete estimado, CTA "Finalizar compra" + "Pagar pelo PIX".

---

## 20. `<SizeGuide />` (inferido) — Guia de tamanhos

PDP de roupa típica VTEX tem modal "Guia de medidas". Pra D Police: replicar como `<Dialog>` shadcn com tabela de medidas + ilustração corporal.

---

## 21. `<ShippingCalculator />` — Calculadora de frete

PDP padrão VTEX tem input de CEP + botão "Calcular". Resultado: lista de opções (Sedex/PAC/transportadora própria) + prazo.

**D Police:** integrar com Mercado Envios + opcional "Roteiro do Caminhão" se a marca tiver delivery próprio.

---

## 22. `<PaymentBadges />` — Tira de logos de pagamento

Linha horizontal com PNGs/SVGs de bandeiras + PIX. Posição: footer.

**D Police:** PIX (destaque, primeiro), Mastercard, Visa, Elo, Amex, Hipercard, **Mercado Pago**, Boleto.

---

## Resumo: ordem de implementação D Police

1. Tokens + tipografia + cores
2. `Header` + `TopBar` + `MegaMenu`
3. `Footer` + `PaymentBadges`
4. `ProductCard` (variant grid + variant shelf)
5. `HeroCarousel`
6. `CategoryShortcutGrid` + `CorporationBlock`
7. `FilterSidebar` + `SortDropdown` + `LoadMoreButton`
8. PDP (galeria + painel info + abas + relacionados)
9. `MiniCart` drawer
10. `WhatsAppFAB`
11. Componentes específicos D Police: `AIValidationBadge`, `OfficialUniformGate` (modal pré-checkout que pede documento)
