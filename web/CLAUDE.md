# D Police — convenções para Claude

@AGENTS.md

## O que é este projeto

Reconstrução completa da loja online dpolice.com.br (equipamentos policiais e militares, BH/MG) usando Next.js 16 + Supabase + IA pra validação de documento no checkout. Plano completo em `../docs/plan.md`.

## Stack chave

- Next.js 16 (App Router, Turbopack default, React 19.2)
- Tailwind v4 + shadcn/ui base-nova (Base UI under the hood, NÃO Radix)
- Supabase (cliente em `src/lib/supabase/{client,server}.ts`)
- Tipos compartilhados em `src/types/index.ts`
- Constantes da loja em `src/lib/site-config.ts`

## Convenções

- **Idioma do conteúdo**: português BR (placeholders, labels, descrições). Código em inglês.
- **Server Components por padrão**, `'use client'` só onde houver state/efeito.
- **`params` e `searchParams` são Promises** (Next 16). Sempre `await`.
- **`cookies()`/`headers()` são async**. Sempre `await`.
- **Imagens externas**: adicionar host em `images.remotePatterns` no `next.config.ts` antes de usar.
- **Componentes shadcn em `src/components/ui/`**: NÃO editar à mão — regenerar com `npx shadcn@latest add <nome>`.
- **Componentes da aplicação** ficam em `src/components/{layout,marketing,product}/` — esses sim podem editar.
- **Lucide-react v1**: ícones de marcas (Instagram, Facebook, etc) NÃO existem mais. Inline o SVG.
- **Cores**: usar tokens do `globals.css` (`bg-brand`, `text-tactical-tan`, `bg-tactical-charcoal`, etc) — NUNCA hex direto em componentes.
- **Formatação BR**: usar `formatBRL()` e `installments()` de `src/lib/format.ts`.
- **`cn()` helper** em `@/lib/utils` pra combinar classes.

## Estado atual

- ✅ Fase 0 fechada (estrutura, design system, home replicando Citerol, build verde)
- ⏳ Mock data em `src/lib/products-mock.ts` e `src/lib/categories.ts` — vão virar Supabase na Fase 1
- ⏳ `research/dpolice-current/catalog.json` tem 95 SKUs reais prontos pra importar
- ⏳ Aguardando do cliente: SVG do logo, paleta exata, credenciais (MP, Melhor Envio, Supabase, Anthropic)

## Comandos úteis

```bash
npm run dev          # dev server
npm run build        # production build (validação rápida de tipos + bundle)
npm run type-check   # tsc --noEmit
npm run format       # prettier --write
npm run lint         # eslint
npx shadcn@latest add <component>   # adiciona componente shadcn
```

## Antes de criar feature nova

1. Vê se um helper/componente já existe (`src/components/`, `src/lib/`)
2. Se for página, considera se é Server (default) ou Client (precisa state?)
3. Se for form, usa React Hook Form + Zod (já instalados)
4. Se for produto restrito, marca `restrictions.required = true` e lista `acceptedDocs`
5. Se for tocar em fluxo de pagamento ou validação de doc — testa em sandbox antes de mergear
