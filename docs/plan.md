# D Police — Plano de Reconstrução

> **Status atual:** Fase 0 concluída — projeto inicializado, design system base, home espelhando Citerol, build verde.

## Visão

Reconstruir do zero a loja `dpolice.com.br` (hoje em GalaxCommerce, loja id 523), com **estrutura, hierarquia visual e UX inspiradas em [citerol.com.br](https://www.citerol.com.br)** (mesmo nicho, mesma região, VTEX bem feito) e **identidade própria da D Police** (marca azul + neutros táticos), adicionando o diferencial principal: **validação de documento por IA no checkout** para itens restritos (uniformes oficiais, controlados pelo Exército, distintivos).

## Stack

| Camada            | Escolha                                                  |
| ----------------- | -------------------------------------------------------- |
| Framework         | Next.js 16 (App Router, Turbopack)                       |
| UI                | React 19 + Tailwind v4 + shadcn/ui (base-nova / Base UI) |
| Tipagem           | TypeScript 5+                                            |
| Banco / Auth      | Supabase (Postgres + RLS + Auth + Storage)               |
| IA                | Claude Sonnet 4.6 (vision) — validação de documento      |
| Pagamento         | Mercado Pago (PIX + Crédito + Boleto, 6x sem juros)      |
| Frete             | Melhor Envio                                             |
| Estado UI         | Zustand (carrinho), React Hook Form + Zod (forms)        |
| Carrossel         | Embla                                                    |
| Toast             | Sonner                                                   |
| Email transacional | A definir (Resend ou SES)                                |
| Hospedagem        | Vercel                                                    |

### Notas Next.js 16

- `params` / `searchParams` agora são **Promises** — sempre `await`.
- `cookies()` / `headers()` / `draftMode()` são **async**.
- `middleware.ts` foi renomeado para `proxy.ts` (runtime fixo `nodejs`).
- `images.domains` está deprecated — usar `images.remotePatterns`.
- `next lint` foi removido — usar `eslint` direto.
- Turbopack é o default em dev e build.
- Use `npx next typegen` quando criar rotas dinâmicas (gera `PageProps<'/route'>`).

## Estrutura de pastas

```
D police/
├── web/                          # app Next.js
│   ├── src/
│   │   ├── app/                  # routes (App Router)
│   │   ├── components/
│   │   │   ├── ui/               # shadcn (NÃO editar manualmente, regen pelo CLI)
│   │   │   ├── layout/           # Header, Footer, WhatsAppFab
│   │   │   ├── marketing/        # blocos da home (Hero, Sobre, Loja, etc)
│   │   │   └── product/          # ProductCard, Grid, CategoryTabs
│   │   ├── features/             # lógica por feature (auth, cart, checkout, document-validation)
│   │   ├── lib/
│   │   │   ├── supabase/         # client.ts, server.ts
│   │   │   ├── mercadopago/      # SDK + webhooks
│   │   │   ├── melhorenvio/      # API
│   │   │   ├── ai/               # Claude vision pipelines
│   │   │   ├── categories.ts     # árvore de categorias
│   │   │   ├── format.ts         # BRL, parcelas, descontos
│   │   │   ├── products-mock.ts  # mock até importar Supabase
│   │   │   └── site-config.ts    # constantes globais (loja, contatos)
│   │   ├── hooks/
│   │   └── types/                # Product, Category, AcceptedDocType, etc
│   └── ...
├── research/
│   ├── citerol/                  # capturado pelo subagent — refs visuais
│   └── dpolice-current/          # catalog.json + samples + institutional.md
├── docs/
│   └── plan.md                   # este arquivo
└── .claude/                      # config do Claude Code (settings.local.json)
```

## Fases

### ✅ Fase 0 — Discovery & Setup (CONCLUÍDA)

- [x] Scraping completo do site atual (~95 SKUs, 26 categorias funcionais)
- [x] Identificação de produtos restritos (~70 SKUs em 3 grupos)
- [x] Refs visuais do Citerol capturadas (em andamento — subagent #2)
- [x] Init Next.js 16 + Tailwind v4 + shadcn (base-nova)
- [x] Pacotes essenciais instalados (zod, RHF, zustand, embla, supabase/ssr, date-fns, next-themes, sonner)
- [x] Design tokens D Police (azul tático + neutros + olive/tan/charcoal)
- [x] Header (top bar contato + main com search + nav com mega menu)
- [x] Footer institucional 4 colunas
- [x] WhatsApp FAB
- [x] Home espelhando Citerol (Hero carrossel, payment bar, mais vendidos, tabs por categoria, corporações, info de restritos, sobre, loja física)
- [x] `next.config.ts` com `images.remotePatterns` (dpolice + supabase)
- [x] Prettier + scripts (format, type-check)
- [x] Build production verde

**Pendente para fechar a fase 0 (precisa do Gabriel/cliente):**

- [ ] Logo da D Police em **SVG vetorial** (hoje uso wordmark inline placeholder)
- [ ] Confirmar **paleta exata** do azul da marca (uso aproximação `oklch(0.42 0.14 252)`)
- [ ] Lista oficial de produtos restritos validada com **cliente + advogado**
- [ ] Acesso ao GalaxCommerce (admin) para baixar **imagens reais** dos produtos (lazy-load via JS impede captura por HTTP simples — vamos precisar Playwright OU CSV/imagens do cliente)
- [ ] Política de frete real da loja (`/entregas` está vazia)
- [ ] **Conta Mercado Pago, Melhor Envio, Supabase, Anthropic** — credenciais

### ⏳ Fase 1 — Catálogo & Banco (1-2 semanas)

- Schema Supabase: `products`, `categories`, `product_categories` (M:N), `variants`, `images`, `restrictions`, `users`, `orders`, `documents`, `audit_log`
- Políticas RLS por tabela
- Importação do `research/dpolice-current/catalog.json` → Supabase
- Páginas: `/categoria/[...slug]`, `/produto/[slug]`, `/buscar`
- Filtros, ordenação, paginação
- SEO (sitemap, robots, JSON-LD `Product`/`Offer`)
- 301 redirects do padrão `/comprar/{slug}/{variante}/{id}` (URL legada GalaxCommerce)

### ⏳ Fase 2 — Conta & Carrinho (1 semana)

- Auth Supabase (email/senha + magic link)
- `/conta` (dados, pedidos, endereços, documentos arquivados)
- Carrinho persistente (Zustand + localStorage + sync ao logar)
- Lista de desejos
- Endereços com ViaCEP

### ⏳ Fase 3 — Checkout + IA validando documento (2 semanas) — **DIFERENCIAL**

- Mercado Pago: PIX, cartão (até 6x sem juros), boleto
- Cálculo de frete via Melhor Envio (PAC, SEDEX, transportadora)
- Checkout multi-step com summary lateral
- **Upload do documento** (CAC, identidade funcional PM/Bombeiro/PP/PC, matrícula CT, porte de arma)
- **Validação por Claude Sonnet 4.6 vision**: tipo de doc, validade, nome bate com cadastro, OCR + sanity checks
- Storage seguro (Supabase Storage com RLS por user_id)
- LGPD: consentimento explícito, finalidade declarada, retenção mínima (30 dias após entrega), direito de exclusão
- Estados do pedido: `pendente_doc → doc_aprovado → pago → separado → enviado → entregue`
- Painel humano para revisar casos em que IA não tem confiança

### ⏳ Fase 4 — Admin & Operação (1 semana)

- `/admin` (auth via role)
- CRUD de produtos, variantes, imagens, restrições
- Fila de validações pendentes (com override humano)
- Pedidos (status, etiquetas Melhor Envio, NFe via integração futura)
- Relatórios básicos (vendas por categoria, restrições rejeitadas, ticket médio)
- Email transacional (pedido confirmado, pago, validação aprovada/rejeitada, enviado)

### ⏳ Fase 5 — QA, deploy, handoff (3-5 dias)

- Testes do checkout (vitest unit + Playwright e2e do fluxo crítico)
- Performance (Lighthouse 90+ mobile, next/image otimizado, fonts swap)
- Acessibilidade (axe, navegação por teclado, contraste WCAG AA)
- Deploy Vercel + DNS
- Treinamento do cliente (vídeos curtos)
- README operacional

## Decisões já tomadas

| Decisão                                | Motivo                                                           |
| -------------------------------------- | ---------------------------------------------------------------- |
| Next.js 16 (não 15)                    | Latest na data do init, React 19.2, Turbopack default            |
| Supabase em vez de Firebase            | Postgres real, RLS forte, Storage barato                         |
| Mercado Pago em vez de Stripe          | Suporte nativo a PIX e boleto BR, tarifas BR                     |
| Melhor Envio em vez de Correios direto | Comparação automática + impressão de etiqueta + cobertura ampla  |
| shadcn `base-nova` (Base UI)           | Default atual do shadcn, A11y igual Radix, mais leve             |
| Tailwind v4                            | Já é o default do create-next-app, mais rápido                   |
| `oklch` em vez de hex                  | Cor moderna, gradientes melhores, padrão shadcn                  |
| Categorias hardcoded provisoriamente   | Vai virar tabela Supabase na Fase 1                              |
| Mock products provisórios              | Vai sair quando importar `research/dpolice-current/catalog.json` |

## Como rodar

```bash
cd "web"
npm run dev          # http://localhost:3000
npm run build        # build de produção (Turbopack)
npm run type-check   # tsc --noEmit
npm run format       # prettier --write
npm run lint         # eslint
```

## Riscos / atenção

1. **Imagens da loja atual**: o site lazy-loada via JS, então scraping HTTP simples não pega. Precisamos do CSV/dump do cliente OU Playwright headless na fase 1.
2. **Validação de documento por IA**: tem risco regulatório. Antes de produção, **revisar termo de uso e LGPD com advogado**. Cliente deve aprovar tipos de doc aceitos.
3. **Slugs legados**: cliente pode ter SEO/links externos apontando para URLs antigas — mapear redirects 301 cedo.
4. **Estoque "Esgotado" massivo no site atual**: confirmar com cliente quais categorias descontinuar antes de migrar.
5. **Pagamento de produtos restritos**: pra evitar prejuízo, pagamento só captura quando documento aprovado (hold + capture no Mercado Pago).
