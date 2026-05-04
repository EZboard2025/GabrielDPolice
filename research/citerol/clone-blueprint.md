# Clone Blueprint — D Police inspirado no Citerol

> **Premissa:** clonar o **esqueleto, hierarquia visual e padrões de UX** do Citerol, NÃO o visual literal. A D Police entrega:
> - Identidade própria (azul-marinho + neutros táticos vs preto/branco/vermelho do Citerol)
> - Validação por IA de documentos (gate único no mercado)
> - Pagamento moderno (PIX com 5% off, Mercado Pago)
> - Foco específico em **CFSD 2025** e **Colégio Tiradentes** como verticais
> - Stack moderno (Next.js + Supabase) vs VTEX legacy
>
> Stack alvo: **Next.js 14 (App Router) + Tailwind + shadcn/ui + Supabase + Mercado Pago**

---

## Como ler este documento

Cada bloco da estrutura segue o template:

> **[O que o Citerol faz]** → **[Como vira no D Police]** → **[Diferenças intencionais]**

---

## 1. Top bar utilitária

**Citerol:** 3 itens — Frete grátis R$ 300 / WhatsApp / Roteiro do Caminhão.

**D Police:** 3 itens em rotação se necessário, sempre minimalista.

```
[ícone PIX] PIX com 5% OFF  •  [ícone shield] Validação IA em segundos  •  [whatsapp] (XX) XXXX-XXXX
```

Em mobile: scroll horizontal ou stack de 1 mensagem ativa.

**Diferenças:**
- "Roteiro do Caminhão" não cabe na D Police; substituído por **"PIX 5% OFF"** (gancho de venda mais forte para o público).
- Adicionar "Validação IA" para deixar claro o diferencial logo no topo.

---

## 2. Header principal

**Citerol:** Logo + menu central (5 entradas) + "Entrar" à direita. Sem ícone destacado de busca, carrinho ou wishlist.

**D Police:** Logo + busca proeminente + menu + ícones (login, wishlist, carrinho).

```
┌──────────────────────────────────────────────────────────────┐
│ [LOGO]   ROUPAS  ACESSÓRIOS  UNIFORMES  CFSD 2025  OUTLET   │
│                                          [search] [♡] [user] [🛒] │
└──────────────────────────────────────────────────────────────┘
```

**Mudanças:**
- Adicionar **busca** com placeholder "Buscar produtos…" e auto-complete.
- Substituir "Uniformes para Empresas" por **"CFSD 2025"** (vertical mais relevante pro público D Police).
- Adicionar carrinho com badge de contagem.
- Logo D Police: com leve "shield/star" em azul-marinho.

---

## 3. Mega menu

**Citerol:** Mega menu por hover, com 2 colunas em "Uniformes" (Corporação | Categoria).

**D Police:** Manter exato esse padrão de 2 colunas — é UX vencedora.

```
UNIFORMES                                                          
├── COL 1: Por corporação                ├── COL 2: Por categoria   
│   • PMMG (Polícia Militar MG)          │   • Calças              
│   • CBMMG (Bombeiros)                  │   • Camisas e Gandolas  
│   • Polícia Civil MG                   │   • Camisetas           
│   • Polícia Penal MG                   │   • Cintos              
│   • Colégio Tiradentes                 │   • Coberturas (Boinas, Bonés) 
│   • CFSD 2025 (preparatório)           │   • Divisas e Distintivos 
│                                        │   • Jaquetas            
└── COL 3: Em destaque (banner)          │   • Tarjetas            
    [Imagem + CTA "Kit completo CFSD"]    │                         
```

**Diferenças:**
- Adicionar 3ª coluna "Em destaque" com banner promocional ou kit curado.
- "CFSD 2025" como corporação extra (apenas no contexto D Police).

---

## 4. Hero carousel

**Citerol:** 9 slides full-bleed, repetitivo.

**D Police:** **3-5 slides max** (less is more), cada um conta uma história clara.

Slides recomendados:
1. **Hero principal:** "Equipamento tático validado por IA" + CTA "Conheça o processo"
2. **Lançamento:** Produto novo + CTA "Compre agora"
3. **CFSD 2025:** Kit completo com desconto + CTA "Monte seu kit"
4. **Colégio Tiradentes:** Uniforme institucional + CTA "Selecione seu modelo"
5. **PIX 5% OFF:** Promo de pagamento + CTA "Aproveite"

**Estilo visual:**
- Imagens **lifestyle** (policial em campo, recruta em curso) > packshot puro
- Overlay com gradiente azul-marinho 0-60%
- Título em fonte display (Bebas Neue) UPPERCASE
- CTA em pill quadrado "CONHEÇA →"

---

## 5. Grid de atalhos de categoria

**Citerol:** 12 cards. **Excessivo.**

**D Police:** 8 cards bem curados.

```
[Camisas Táticas]  [Calças Táticas]  [Coturnos]    [Cintos]
[Acessórios]       [PMMG Oficial]     [CFSD 2025]   [C. Tiradentes]
```

**Estilo:** Card quadrado, imagem lifestyle do produto + label embaixo, hover com leve elevação.

---

## 6. Cards de corporação

**Citerol:** 5 cards grandes (PMMG, PPMG, CBMMG, CTPM, GCM).

**D Police:** Manter, mas com **selo "Validação IA" no canto** de cada card oficial.

```
┌───────────────────────────┐
│ [Imagem policial PMMG]    │ 
│ ●  VALIDAÇÃO IA           │ ← badge azul no canto top-right
│                           │
│ PMMG                      │ ← label grande embaixo
│ Polícia Militar MG        │ ← subtítulo
└───────────────────────────┘
```

**Cores institucionais discretas:**
- PMMG: faixa azul-marinho na borda inferior
- CBMMG: faixa vermelha
- Polícia Penal: faixa preta
- Colégio Tiradentes: faixa verde-oliva

---

## 7. Prateleira "Mais vendidos" + outras

**Citerol:** 1 prateleira ("Mais vendidos") com 5 produtos + cards com seletor de tamanho inline + CTA carrinho.

**D Police:** Replicar **+ adicionar mais shelves**:
1. **Mais vendidos**
2. **Lançamentos** (badge "LANÇAMENTO")
3. **Em destaque CFSD 2025** (vertical)
4. **Outlet** (com badges -X%)

Cada shelf:
- Heading H2 à esquerda
- Link "Ver todos →" à direita
- 4-5 cards row (no desktop), carrossel touch (mobile)

---

## 8. ProductCard (componente crítico)

**Citerol shelf-card** tem CTA inline → **manter**.
**Citerol grid-card** é minimalista → **manter mas adicionar PIX line**.

### Props finais D Police

```ts
type ProductCardProps = {
  variant: 'shelf' | 'grid';
  image: { src: string; alt: string };
  name: string;
  brand?: string;
  price: number;
  oldPrice?: number;
  pixPrice?: number;          // preço com desconto PIX
  installments?: { count: number; value: number };
  badge?: 
    | { tone: 'launch';  label: 'LANÇAMENTO' }
    | { tone: 'promo';   label: string }    // ex: '-50%'
    | { tone: 'preorder';label: 'PRÉ-VENDA' }
    | { tone: 'official';label: 'VALIDAÇÃO IA' }   // novo D Police
    | { tone: 'cfsd';    label: 'CFSD 2025' };      // novo D Police
  sizes?: string[];           // só se shelf
  href: string;
};
```

### PriceBlock D Police

```
de R$ 599,99
por R$ 199,99               ← bold
ou R$ 189,99 no PIX (5% off) ← cor primary, peso medium
Ou 4x de R$ 49,99 sem juros   ← muted, regular
```

---

## 9. PLP (categoria)

**Citerol:** breadcrumb minimal + título lowercase + sidebar 8 facets + grid 4-col + "Mostrar mais" + zero hero/banner/SEO text na maioria.

**D Police:** Mesma estrutura **+ mini-hero por categoria**.

```
[Top bar]
[Header]
Home › Camisas Táticas

┌─ HERO COMPACTO ──────────────────────────────────────┐
│ CAMISAS TÁTICAS                                       │
│ Resistência, ventilação e modelagem para operação.    │
│ [imagem lateral pequena ou ícone tactical]            │
└───────────────────────────────────────────────────────┘

┌── FILTROS ──┐  ┌──────── GRID ────────┐
│ Departamento│  │ 87 Produtos    [Ordenar ▼] │
│ Categoria   │  │                            │
│ Subcategoria│  │ [chips de filtros ativos]  │
│ Gênero      │  │                            │
│ Marca       │  │ ┌─card─┐ ┌─card─┐ ┌─card─┐ ┌─card─┐ │
│ Tamanho     │  │ ┌─card─┐ ┌─card─┐ ┌─card─┐ ┌─card─┐ │
│ Patente *   │  │       [Mostrar mais (24)]            │
│ Padrão *    │  └────────────────────────────┘
│ Preço       │
└─────────────┘
```

`*` = facets novos D Police em PLPs de uniforme oficial.

**Diferenças:**
- Mini-hero compacto com nome + subtítulo (vs Citerol que tem zero)
- Title Case no breadcrumb (vs lowercase do Citerol)
- Chips de filtros ativos no topo do grid

---

## 10. PDP (página de produto)

**Citerol:** padrão VTEX (galeria esquerda + painel info direita + abas embaixo + relacionados).

**D Police:** mesma estrutura, com **acréscimos**:

### Painel info (direita)

```
[Nome do produto]                  H1
[Marca]                            small muted
[★★★★☆ 4.7 (123 avaliações)]      

R$ 199,99                          xl bold
ou R$ 189,99 no PIX (5% off)       primary
Em até 4x de R$ 49,99 sem juros    muted

[Cor: Verde Oliva]
[● ● ● ●]   ← swatches de cor (clicável, leva a outra PDP)

[Tamanho: M]
[ PP ][ P ][ M ][ G ][ GG ][ XGG ]   ← botões
[Guia de tamanhos →]

[ Quantidade: 1 ▼ ]

[━━━━ ADICIONAR AO CARRINHO ━━━━]   ← CTA primário azul-marinho full
[ Comprar pelo WhatsApp ]            ← secundário, ícone WhatsApp

[CEP: ____] [Calcular]
└ Sedex: 3 dias úteis - R$ 18,90
└ Frete grátis a partir de R$ 300
```

### Acréscimos D Police na PDP

1. **Se uniforme oficial:** banner inline antes do "Adicionar ao carrinho":
   > "Este produto requer validação de identidade. Faça upload do seu documento durante o checkout — IA valida em 30 segundos."

2. **Aba extra "Validação IA":** explicando o processo, tempo, segurança LGPD.

3. **Aba "Vídeo do produto":** se houver, embed YouTube (Citerol tem `/videos` no menu).

### Abas embaixo

- Descrição
- Especificações técnicas (composição, peso, modelagem)
- Avaliações (com foto, com filtro por estrelas)
- Perguntas e respostas
- **Novo:** Validação IA (se aplicável)
- **Novo:** Política de troca de uniforme oficial

### Shelf relacionados

"Você também pode gostar" + "Compre o look completo" (cross-sell — combinar camisa + calça + cinto).

---

## 11. Páginas de corporação (PMMG, CBMMG, etc.)

**Citerol:** PLP padrão sem customização.

**D Police:** **Página com hero institucional + PLP filtrada**.

```
[Top bar]
[Header]
Home › Uniformes › PMMG

┌── HERO INSTITUCIONAL ────────────────────────────────────────┐
│  [Foto policial PMMG em uniforme]                            │
│  POLÍCIA MILITAR DE MINAS GERAIS                              │
│  Uniformes oficiais validados pela D Police.                  │
│  • Validação IA do seu documento                              │
│  • Padrão atualizado 2024                                     │
│  • Atendimento especializado                                  │
│  [Selecione sua patente ▼]   [Falar com consultor →]         │
└───────────────────────────────────────────────────────────────┘

[atalhos de subcategoria como tabs]:
[ Calças ] [ Gandolas ] [ Camisetas ] [ Cintos ] [ Boinas ] [ Divisas ]

[FilterSidebar + Grid (igual PLP padrão)]
```

**Diferenças:**
- Hero institucional vs Citerol que vai direto ao grid
- Tabs de subcategoria (atalho rápido)
- Selo "Validação IA" presente em todos cards
- Filtro extra "Patente" e "Padrão"

---

## 12. Página CFSD 2025 (vertical exclusiva D Police)

**Página nova, sem equivalente no Citerol.**

```
[Top bar]
[Header]
Home › CFSD 2025

┌── HERO ─────────────────────────────────────────────────────┐
│  CONCURSO CFSD 2025                                          │
│  Tudo que você precisa para a fase de teste físico e curso. │
│  [Ver kit completo →]                                        │
└─────────────────────────────────────────────────────────────┘

┌── KIT RECOMENDADO ──────────────────────────────────────────┐
│  [Card kit completo R$ 1.299 (de R$ 1.689)] +30% off vs avulso │
│  [Lista do que vem: 2 camisetas, 1 short, 1 tênis, mochila…] │
└─────────────────────────────────────────────────────────────┘

[Atalhos: Roupa de treino] [Mochilas] [Acessórios] [Suplementos?]

[Grid de produtos curados]

┌── DEPOIMENTO ───────────────────────────────────────────────┐
│  "Aprovado em CFSD 2024 com kit D Police" — Soldado X       │
└─────────────────────────────────────────────────────────────┘
```

---

## 13. Página Colégio Tiradentes

Similar à PMMG (hero institucional + grid), com:

- Filtros: **Série/Ano escolar** (1º ao 9º, EM 1-3)
- Filtros: **Adulto vs Infantil** (Citerol tem isso)
- Tabs: Uniforme padrão / Educação física / Acessórios
- Bloco "Lista oficial 2026" (link/PDF da escola se houver)

---

## 14. Bloco institucional na home

**Citerol:** "Desde 1966… 5.000 empresas…" + CTA Saiba mais.

**D Police (sem 60 anos de história):**

> **Equipamento tático sério, validação inteligente.**
> 
> A D Police nasceu para resolver um problema antigo: comprar uniforme oficial sem dor de cabeça. Validamos seu documento em segundos com IA, garantimos a peça certa pra sua patente e enviamos pro Brasil todo.
>
> [Saiba como funciona →]

Acompanhar com 3 mini-stats:
- "30s" — tempo médio de validação IA
- "X+" — produtos validados (preencher quando houver dados)
- "Y" — corporações atendidas

---

## 15. Bloco de benefícios (3 cards)

**Citerol:** Frete grátis / 6x sem juros / Descontos no site.

**D Police:**

```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ [shield-check]  │ │ [pix logo]      │ │ [whatsapp]      │
│                 │ │                 │ │                 │
│ Validação IA    │ │ PIX com 5% OFF  │ │ Atendimento     │
│ em 30 segundos  │ │ ou até 12x sem  │ │ direto pelo     │
│                 │ │ juros           │ │ WhatsApp        │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

(Opcional 4º card: "Frete grátis acima de R$ X")

---

## 16. Localizador de lojas

**Citerol:** lista vertical de 12 lojas em MG.

**D Police:**

- Se a marca tiver loja física: replicar formato de lista, **adicionar mapa interativo opcional** (Mapbox/Leaflet).
- Se for 100% online: substituir por bloco **"Atendimento Especializado"** com:
  - WhatsApp consultor
  - E-mail de suporte
  - SLA de resposta
  - FAQ inline (3-5 perguntas comuns)

---

## 17. Footer

**Citerol:** 4 colunas + faixa pagamento + Powered by VTEX + linha legal.

**D Police:**

```
┌── COLUNA 1 ──┐ ┌── COLUNA 2 ──┐ ┌── COLUNA 3 ──┐ ┌── COLUNA 4 ──┐
│ INSTITUCIONAL │ │ AJUDA         │ │ ATENDIMENTO   │ │ SIGA D POLICE  │
│ Quem Somos    │ │ Entregas      │ │ WhatsApp      │ │ Instagram      │
│ Como funciona │ │ Trocas        │ │ E-mail        │ │ TikTok         │
│ Validação IA  │ │ Cuidados      │ │ Horário       │ │ YouTube        │
│ Blog/Vídeos   │ │ Privacidade   │ │               │ │ LinkedIn       │
└───────────────┘ └───────────────┘ └───────────────┘ └────────────────┘

[ Faixa pagamento: PIX | MC | Visa | Elo | Amex | Hipercard | Mercado Pago | Boleto ]
[ Selo SSL | Powered by Mercado Pago | LGPD ]
[ Razão social | CNPJ | Endereço | © 2026 ]
```

**Diferenças:**
- Coluna institucional inclui **"Como funciona"** e **"Validação IA"** (educa o usuário)
- Coluna ajuda inclui **"Cuidados com produtos táticos"**
- Faixa pagamento destaca **PIX e Mercado Pago**

---

## 18. WhatsApp FAB

Adicionar **flutuante** em todas páginas, bottom-right.

```
[Ícone WhatsApp 56x56 fundo verde #25D366, sombra forte]
↳ Pulse animation a cada 4s
↳ On hover: balão "Tire suas dúvidas com nosso especialista"
↳ On click: abre wa.me/55XXXXXXXX?text=Olá%2C+vim+pelo+site
```

---

## 19. Componentes 100% novos D Police

### `<AIValidationBadge />`
Selo azul "VALIDAÇÃO IA" usado em:
- Cards de uniforme oficial
- Banner de PDP
- Card de corporação

### `<OfficialUniformGate />`
Modal que aparece ao tentar finalizar checkout com item de uniforme oficial:
- Pede upload de documento (frente + verso ou crachá funcional)
- Mostra processamento IA em tempo real
- Aprovado → libera; reprovado → opção de revisão manual via WhatsApp

### `<CFSDKitBuilder />`
Componente "monte seu kit" para CFSD 2025:
- Checklist de itens essenciais
- Adiciona ao carrinho como bundle com desconto
- Mostra economia total

### `<PixDiscountTag />`
Linha sempre presente no `<PriceBlock />` mostrando preço com desconto PIX.

### `<RankSelector />`
Componente de seleção de patente (ícone + label) para filtros e categorização em uniformes oficiais.

---

## 20. Mapa de URLs D Police (sugerido)

```
/                                Home
/buscar?q=                       Search results
/produto/[slug]                  PDP
/c/[categoria]                   PLP categoria (ex: /c/camisas-taticas)
/c/[categoria]/[subcat]          PLP subcategoria
/uniformes/[corporacao]          Corporação (ex: /uniformes/pmmg)
/cfsd-2025                       Vertical CFSD 2025
/colegio-tiradentes              Vertical CT
/outlet                          Outlet
/lancamentos                     Lançamentos
/mais-vendidos                   Bestsellers
/institucional/quem-somos        Sobre
/institucional/como-funciona     Como funciona (validação IA)
/institucional/entregas          Entregas
/institucional/trocas            Trocas
/institucional/privacidade       Privacidade + LGPD
/atendimento                     WhatsApp + canais
/checkout                        Checkout
/minha-conta                     Dashboard
/minha-conta/pedidos             Pedidos
/minha-conta/validacoes          Status validações IA
/minha-conta/enderecos           Endereços
```

301s sugeridas (variações comuns):
- `/pmmg` → `/uniformes/pmmg`
- `/uniformes-pmmg` → `/uniformes/pmmg`
- `/sobre` → `/institucional/quem-somos`

---

## 21. Diferenciações intencionais — resumo executivo

| Eixo                    | Citerol                         | D Police                                  |
|-------------------------|---------------------------------|-------------------------------------------|
| **Cor primária**        | Preto + branco + vermelho       | Azul-marinho + neutros táticos            |
| **Tipografia**          | Sans-serif default VTEX         | Inter + Bebas Neue (display)              |
| **Diferencial**         | Tempo de mercado (1966)         | Validação IA + tech moderno               |
| **Pagamento destaque**  | 6x sem juros                    | PIX 5% OFF + 12x sem juros                |
| **Vertical principal**  | Uniformes corporativos          | CFSD 2025 + Colégio Tiradentes            |
| **Delivery**            | Roteiro do Caminhão (próprio)   | Mercado Envios / Frete grátis nacional    |
| **B2B**                 | Subdomínio separado             | Não no escopo inicial                     |
| **Stack**               | VTEX                            | Next.js + Supabase + Mercado Pago         |
| **Header**              | Sem busca destacada             | Busca proeminente + auto-complete         |
| **Carrinho**            | Drawer VTEX                     | Mini-cart custom + checkout flow próprio  |
| **WhatsApp**            | No top bar + footer             | + FAB flutuante + CTA na PDP              |
| **PLP**                 | Sem hero/intro                  | Mini-hero por categoria                   |
| **PDP uniforme oficial**| Sem gate                        | Modal validação IA antes de checkout      |
| **Empty state busca**   | Genérico VTEX                   | Sugestões + WhatsApp                      |
| **Trust signals**       | Lojas + tempo + B2B             | Tech + reviews + parcerias + LGPD         |

---

## 22. Roadmap sugerido (paralelo aos 2-3 meses do plano)

**Sprint 1 (semanas 1-2):** Tokens, Header, Footer, Mega menu, ProductCard.
**Sprint 2 (semanas 3-4):** Home (hero, shortcuts, corporations, shelves, benefícios).
**Sprint 3 (semanas 5-6):** PLP (filtros, sort, pagination) + PDP base.
**Sprint 4 (semanas 7-8):** Páginas corporação + CFSD + Colégio Tiradentes.
**Sprint 5 (semanas 9-10):** Carrinho + checkout + Mercado Pago + PIX.
**Sprint 6 (semanas 11-12):** Validação IA gate + dashboard + ajustes finais + SEO.

---

## 23. Princípios visuais finais (mantra)

1. **Reto, não arredondado.** Cards quase quadrados, badges retangulares. Comunica disciplina.
2. **Branco respiratório.** Fundo branco predomina. Produtos em packshot fundo branco. Lifestyle só nos heros e cards de corporação.
3. **Cor com propósito.** Azul-marinho = autoridade. Vermelho = urgência (preço/promo). Verde = WhatsApp. Tactical olive/tan = produto.
4. **Tipo limpo, com display tático.** Inter pra tudo + Bebas Neue só pra heros e badges importantes.
5. **CTA primário sólido escuro.** Não outline, não gradient. Preto/azul-marinho sólido.
6. **Microcopy direta, brasileira informal.** Sem rebuscamento. "Compre", "Adicione", "Veja", "Fale".
7. **Sem cliché policial.** Zero estrelas Hollywood, zero camuflagem brega no chrome. Camuflagem só nos produtos.
