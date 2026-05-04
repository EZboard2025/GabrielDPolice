# Citerol — Padrões de UX e fluxos

> Tudo que dá pra inferir do markdown público + comportamentos VTEX padrão. Itens marcados como **[inferido]** não foram confirmados visualmente, mas seguem o stack VTEX FastStore.

---

## 1. Navegação principal

### Hierarquia de IA (information architecture)

```
Home
├── Roupas
│   ├── Bermudas, Calças, Camisas, Camisetas, Jaquetas, Polos
├── Acessórios
│   ├── Algemas, Bandoleiras, Boinas, Bonés, Botas, Capas de Colete,
│   ├── Cintos, Coldres, Cuecas, Embalagem para presente, Meias,
│   ├── Mochilas, Sapatos, Tênis, Utilitários Militares
├── Uniformes para Órgãos Públicos
│   ├── [Corporação] Bombeiro Militar MG, Colégio Tiradentes, Guarda Municipal,
│   │   Polícia Civil MG, Polícia Militar MG, Polícia Penal MG, Sejusp MG, Socioeducativo MG
│   └── [Categoria] Calças, Camisas e Gandolas, Camisetas, Cintos, Coberturas,
│       Divisas, Florão, Jaquetas, Saias, Shorts, Sungas, Tarjeta
├── Uniformes para Empresas (link externo)
├── Mais Vendidos
├── Outlet
└── Vídeos
```

### Padrões observados

- **Mega menu desktop** abre on hover.
- **Top bar** sempre visível com utilidades fixas (frete, WhatsApp, roteiro).
- **Mobile** [inferido]: hamburger → drawer com accordion da árvore acima.
- **Não há barra de busca destacada** no header (Citerol omitiu visualmente; VTEX tem busca, mas o Citerol não a destaca). Recomendação D Police: **destacar busca** no header (UX moderna).

### Para D Police

- Manter 3 níveis (Departamento → Categoria → Produto).
- Reorganizar mega menu de "Uniformes" com **2 colunas paralelas** (Por Corporação | Por Tipo de Peça) — exato do Citerol.
- Adicionar coluna nova "**Em destaque**" com banner promocional dentro do mega menu (ex: "CFSD 2025 — Kit completo").

---

## 2. Busca

### Citerol

- **Não há ícone de busca proeminente** no header observado.
- VTEX tem search engine com auto-complete, mas o front-end do Citerol não destaca isso.
- Quando você acessa `/cinto-bull` (URL livre), a plataforma trata como query e mostra "0 Produto" + dicas:
  > "Verifique os termos digitados. Tente utilizar uma única palavra. Utilize termos genéricos na busca."
- Empty state apresenta sugestões, mas **não há "Você quis dizer X" ou produtos relacionados** no fallback.

### Para D Police

- **Busca proeminente** no header (input com placeholder "Buscar produtos…").
- Auto-complete mostrando: produtos top, categorias, sugestões de termo.
- Empty state com:
  - Sugestões dinâmicas
  - Top vendidos da categoria mais próxima
  - CTA "Fala com a gente no WhatsApp"

---

## 3. Filtragem (PLP)

### Padrão Citerol

- Sidebar **esquerda fixa** com 8 facets em accordion (Departamento, Categoria, Subcategoria, Gênero, Marca, Tamanho, Tipo, Faixa de preço).
- Checkbox lists (multi-select).
- Slider de preço (mín-máx).
- **[Inferido]** Filtros aplicam via querystring (`?gender=Masculino&size=M`).
- Não foi observado **chip de filtro ativo no topo do grid** (UX moderna que ajuda a remover rapidamente).

### Para D Police

- Manter sidebar acordeão.
- **Adicionar chips** de filtros aplicados no topo do grid (com ❌ pra remover individualmente + "Limpar tudo").
- **Mobile:** drawer lateral com filtros, botão sticky "Filtrar" + contador "(3)" de ativos.
- Filtros específicos D Police em uniformes oficiais:
  - **Patente** (Soldado, Cabo, Sargento, Subtenente, Oficial)
  - **Padrão** (Antigo, Novo Padrão 2024, Combate, Gala)
  - **Concurso** (CFSD 2025, EsFO, etc.)

---

## 4. Ordenação

Dropdown com 8 opções, default "Relevância". Padrão VTEX. Replicar igual.

---

## 5. Paginação

- **"Mostrar mais"** progressivo (não numerada, não scroll-infinito).
- Carrega +N produtos no clique.

### Para D Police

- Manter "Mostrar mais" mas combinar com **scroll infinito após o primeiro clique** (UX MagaLu/Shopee). Primeiro clique manual → depois auto.
- Mostrar contador "Exibindo X de Y produtos" acima do botão.

---

## 6. Adição ao carrinho (UX agressiva)

### Citerol — UX rápida na home

Os cards da prateleira "Mais vendidos" da home têm:
- Seletor de tamanho **inline no card**
- Botão "Adicionar ao carrinho" **direto no card**

Isso pula a PDP — bom pra vendas rápidas de quem conhece o produto.

### Para D Police

- Replicar o padrão na shelf da home.
- **No grid de PLP, NÃO incluir CTA inline** (mantém clique do card → PDP).
- **Mini-cart drawer** [inferido VTEX] abre lateral ao adicionar, mostra item + frete + CTAs.

---

## 7. Carrinho e checkout

> Não foi possível inspecionar via WebFetch (rota autenticada). Padrão VTEX:

- `/checkout/cart` → carrinho cheio
- `/checkout` → 3 etapas: Identificação → Entrega → Pagamento
- Pagamentos exibidos no footer: PIX, Mastercard, Visa, Elo, Amex, Hipercard

### Para D Police

- **Trocar VTEX por integração custom** (Next.js + Mercado Pago Checkout Pro/API).
- Etapas:
  1. **Identificação** (e-mail, login social opcional)
  2. **Entrega** (CEP + endereço, com Mercado Envios)
  3. **Validação de identidade** (apenas para uniformes oficiais — upload doc → validação IA → bloqueia/libera)
  4. **Pagamento** (PIX em destaque com 5% off, cartão até 12x, boleto)
  5. **Confirmação**
- PIX deve gerar QR Code inline (via Mercado Pago).
- Status do pedido em `/minha-conta/pedidos/[id]`.

---

## 8. Login / Cadastro

Citerol expõe apenas link "Entrar" no header. VTEX padrão usa formulário modal.

### Para D Police

- Login social (Google, Apple).
- Login com WhatsApp/SMS (OTP) — **diferencial** pro público que não usa e-mail muito.
- Cadastro pede só e-mail + senha + nome inicial. Outros dados (CPF, endereço) coletados no checkout.
- Conta tem dashboard com: pedidos, endereços, **status de validação IA por documento**, lista de desejos.

---

## 9. WhatsApp como canal-chave

Citerol coloca WhatsApp em **5 lugares**:
1. Top bar (número geral)
2. Cada loja física no localizador (número específico)
3. Footer (atendimento)
4. Lojas físicas page
5. (Possivelmente PDP — não confirmado)

### Para D Police

- **WhatsApp FAB** flutuante em todas páginas
- Botão "Comprar pelo WhatsApp" na PDP (envia mensagem com link do produto pré-formatado)
- Top bar com número de WhatsApp consultor especializado

---

## 10. Roteiro do Caminhão (delivery próprio)

Citerol tem **delivery próprio** ("Roteiro do Caminhão") — provavelmente uma rota fixa que passa pelas cidades de MG.

UX: link no top bar + footer + página dedicada (não inspecionada). Provavelmente lista cidades + dias + estimativa de frete grátis.

### Para D Police

Se a D Police não tem delivery próprio, **substituir por:**
- "Frete grátis para todo Brasil acima de R$ X"
- "Retire em loja parceira" (se houver)

---

## 11. Microcopy / vocabulário-chave

| Frase Citerol                            | Onde aparece            |
|------------------------------------------|-------------------------|
| "FRETE GRÁTIS A PARTIR DE R$ 300"        | Top bar                 |
| "ROTEIRO DO CAMINHÃO"                    | Top bar, footer         |
| "Ou Xx de R$ Y,YY sem juros"             | Cards, PDP              |
| "LANÇAMENTO"                             | Badge de produto novo   |
| "PRÉ-VENDA"                              | Badge produto futuro    |
| "Leve 4 Pague 3", "50% OFF na 3ª peça"   | Badges de bundle        |
| "Novo Padrão PMMG"                       | Badge institucional     |
| "Mostrar mais"                           | Botão de pagination     |
| "Ordenar por"                            | Dropdown                |
| "compre com segurança"                   | Faixa pagamento         |
| "Desde 1966"                             | Bloco institucional     |
| "veste mais de 5.000 empresas privadas, forças de segurança e órgãos públicos" | Institucional |
| "ENCONTRE A LOJA MAIS PERTO DE VOCÊ"     | Heading store locator   |

### Para D Police — vocabulário próprio

| Citerol                  | D Police (proposta)                      |
|--------------------------|------------------------------------------|
| "Roteiro do Caminhão"    | (remover) ou "Frete expresso D Police"   |
| "Desde 1966"             | "Especialistas em equipar quem protege"  |
| "5.000 empresas…"        | "X concursandos aprovados em CFSD usam D Police" (se aplicável) |
| "LANÇAMENTO"             | manter "LANÇAMENTO"                      |
| "Novo Padrão PMMG"       | manter (institucional)                   |
| **Novo:** "VALIDAÇÃO IA" | badge azul para uniformes oficiais       |
| **Novo:** "PIX 5% OFF"   | em PDP e checkout                        |
| **Novo:** "CFSD 2025"    | badge/categoria pra concursandos         |

---

## 12. Empty states

Citerol usa empty state default VTEX:
> "oops! Não encontramos nenhum resultado para 'XXX'"
> 
> "Verifique os termos digitados. Tente utilizar uma única palavra. Utilize termos genéricos na busca."

**Crítica:** sem sugestão de produtos, sem CTA pra atendimento.

### Para D Police

```
[Ilustração tática]

Não encontramos resultados para "X".

Tente:
• [Top vendidos da categoria]
• [Sugestões de termo]
• Falar com nosso especialista no WhatsApp [botão]
```

---

## 13. Trust signals (autoridade)

Citerol comunica autoridade através de:
1. **Tempo de mercado** ("Desde 1966")
2. **Volume de clientes B2B** ("5.000 empresas, forças de segurança e órgãos públicos")
3. **Lojas físicas** (12 unidades em MG = capilaridade)
4. **CNPJ + endereço completo** no footer
5. **Selos de pagamento** + Let's Encrypt + VTEX (powered by)
6. **Subdomínio B2B separado** (`citerolparaempresas.com.br`) — sinal de empresa séria

### Para D Police (não tendo 60 anos de história)

Trust signals alternativos:
1. **"Validação IA"** como diferencial técnico
2. **Selos de policiais reais** (depoimentos com foto + patente)
3. **Parcerias** (ex: "Aprovado por consultores ex-PMMG")
4. **Preparatórios** (associação com cursos CFSD = autoridade)
5. **CNPJ + endereço completo** no footer
6. **Selo Mercado Pago** + SSL + LGPD compliance
7. **Reviews de produtos** (estrelas) com foto verificada

---

## 14. Performance / loading patterns

- Imagens [inferido]: lazy-load via VTEX/IO
- "Mostrar mais" [inferido]: client-side fetch de mais produtos
- Hero carousel [inferido]: pré-carrega só o primeiro slide

### Para D Police

- Next.js Image com `priority` no hero, lazy no resto
- Static generation (SSG) das PLPs com revalidação ISR
- Skeleton loading no grid quando "Mostrar mais"
- Edge caching agressivo (Vercel/Supabase)

---

## 15. Acessibilidade observada

Não observei muitos sinais explícitos. VTEX padrão tem ARIA básico mas é incompleto.

### Para D Police

- Foco visível em todos elementos (`focus-visible`)
- Skip link "Pular para conteúdo principal"
- Headings semânticos (H1 único por página)
- Contraste WCAG AA garantido (textos cinza ≥ 4.5:1)
- Imagens com alt descritivo
- Forms com labels associadas
