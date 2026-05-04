# Citerol — Design Tokens (extraídos por observação)

> Tokens **inferidos** a partir do markdown que o WebFetch retorna (sem CSS direto). Servem como base pra montar o `tailwind.config.ts` e `theme.ts` da D Police, com a paleta dela (azul + neutros táticos), não a do Citerol.

---

## 1. Paleta — Citerol (observada)

A paleta do Citerol **não é colorida pela marca** — eles deixam os produtos (verde-oliva, tan, preto, coyote) carregarem a cor. A UI é praticamente preto, branco e vermelho de preço.

| Token semântico         | Citerol valor estimado  | Onde aparece                                    |
|-------------------------|-------------------------|-------------------------------------------------|
| `surface/background`    | `#FFFFFF`               | fundo principal, fundo de card de produto       |
| `surface/muted`         | `#F4F4F4` ~ `#EEEEEE`   | cards de categoria, divisores                   |
| `text/primary`          | `#0A0A0A` ~ `#111`      | nomes de produto, headings, body                |
| `text/secondary`        | `#5A5A5A`               | parcelamento, breadcrumb, helpers               |
| `border/default`        | `#E5E5E5`               | borda de cards, divisores                       |
| `accent/price`          | `#D90A1A` ~ `#C41E2A`   | preço em destaque, badges de promoção           |
| `accent/launch` (badge) | `#0A0A0A` (fundo preto, texto branco) | tag "LANÇAMENTO" |
| `accent/promo` (badge)  | `#D90A1A` (fundo vermelho, texto branco) | "-50%", "Leve 4 Pague 3", "PRÉ-VENDA" |
| `cta/primary`           | preto sólido `#0A0A0A`  | botão "Adicionar ao carrinho"                   |
| `cta/whatsapp`          | `#25D366`               | ícone WhatsApp                                  |

Cores **dos produtos** (recorrentes, podem virar swatches no D Police):

- Verde Oliva (tactical olive): `#5A6242`
- Tan / Coyote: `#C8A878` ~ `#B8956A`
- Preto Tático: `#1A1A1A`
- Cinza Noturno: `#3F4448`
- Azul Marinho (uniformes): `#1E2A3A`
- Vermelho CBMMG: `#A8211C`

---

## 2. Paleta sugerida — D Police (proposta)

Mantém o "feeling tático/profissional" mas com identidade própria (azul-marinho como primary, neutros táticos como suporte).

```ts
// tailwind.config.ts → theme.extend.colors
{
  // Marca
  primary: {
    DEFAULT: '#0F2A4F', // azul-marinho profundo (D Police)
    50:  '#E7ECF3',
    100: '#C2CDDD',
    200: '#9AAAC4',
    300: '#7387AB',
    400: '#4F6592',
    500: '#0F2A4F', // base
    600: '#0C2241',
    700: '#091A33',
    800: '#061224',
    900: '#030915',
  },
  // Acento operacional
  tactical: {
    olive:  '#5A6242',
    tan:    '#C8A878',
    coyote: '#9D7B4F',
    black:  '#1A1A1A',
    night:  '#3F4448',
  },
  // Estados
  promo:   '#C41E2A', // preço/desconto
  launch:  '#0A0A0A', // badge lançamento
  success: '#1F8A4C',
  warning: '#E0A93B',
  whatsapp:'#25D366',
  // Superfícies
  surface: {
    DEFAULT: '#FFFFFF',
    muted:   '#F4F5F7',
    sunken:  '#EAECEF',
    inverse: '#0A0A0A',
  },
  // Texto
  ink: {
    DEFAULT: '#0F1115',
    muted:   '#5A5F66',
    subtle:  '#8A8F97',
    inverse: '#FFFFFF',
  },
  border: {
    DEFAULT: '#E5E7EB',
    strong:  '#C9CDD4',
  },
}
```

Mapeamento shadcn (CSS variables, em `globals.css`):

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 13% 7%;
  --card: 0 0% 100%;
  --card-foreground: 222 13% 7%;
  --primary: 215 67% 19%;          /* #0F2A4F */
  --primary-foreground: 0 0% 100%;
  --secondary: 75 18% 32%;         /* tactical olive */
  --secondary-foreground: 0 0% 100%;
  --muted: 220 13% 96%;
  --muted-foreground: 220 5% 38%;
  --accent: 35 39% 63%;            /* tan */
  --destructive: 354 67% 45%;      /* promo red */
  --border: 220 13% 91%;
  --ring: 215 67% 19%;
  --radius: 0.5rem;
}
```

---

## 3. Tipografia

### Citerol observado

- **Sans-serif** ao longo de toda a UI (parece a fonte default do tema VTEX FastStore — provavelmente Inter, Roboto ou similar). Não há tipografia serifada.
- Headings em **mix-case**, alguns labels em **UPPERCASE** (top bar: "FRETE GRÁTIS", menu: "ROUPAS", "ACESSÓRIOS"; badges: "LANÇAMENTO", "PRÉ-VENDA").
- Preço usa peso bold (700) e tamanho maior (~20-24px).
- Nomes de produto no card em peso medium (500), tamanho ~14-16px.
- Parcelamento em peso regular (400), tamanho menor (~12-13px), cor secundária.

### Recomendação D Police

Pegar uma combinação que comunique **autoridade tática** sem ser caricata:

```ts
fontFamily: {
  sans:    ['Inter', 'system-ui', 'sans-serif'],          // body, UI
  display: ['"Bebas Neue"', 'Inter', 'sans-serif'],       // hero, badges, "tactical"
  mono:    ['"JetBrains Mono"', 'monospace'],             // SKU, códigos, validação IA
}
```

Escala sugerida (rem):

| Token       | Tamanho | Peso  | Letter-spacing | Uso                                          |
|-------------|---------|-------|----------------|----------------------------------------------|
| `text-xs`   | 0.75    | 400   | 0              | Helpers, parcelamento, breadcrumb            |
| `text-sm`   | 0.875   | 500   | 0              | Microcopy de card                            |
| `text-base` | 1.0     | 400   | 0              | Body                                         |
| `text-lg`   | 1.125   | 600   | 0              | Nome de produto                              |
| `text-xl`   | 1.25    | 700   | 0              | Preço                                        |
| `text-2xl`  | 1.5     | 700   | -0.01em        | Section headings                             |
| `text-3xl`  | 1.875   | 700   | -0.02em        | Page titles                                  |
| `text-5xl`  | 3.0     | 700   | -0.02em        | Hero titles                                  |
| `text-tag`  | 0.6875  | 700   | 0.08em         | Badges UPPERCASE ("LANÇAMENTO", "CFSD 2025") |

---

## 4. Espaçamento (4-px grid)

Citerol usa um grid bem padrão tipo VTEX. Proposta D Police:

| Token  | px  | Uso                                        |
|--------|-----|--------------------------------------------|
| `1`    | 4   | hairlines, gaps mínimos                    |
| `2`    | 8   | gap entre tag e label                      |
| `3`    | 12  | padding de card                            |
| `4`    | 16  | padding-x de container, gap entre cards    |
| `6`    | 24  | gap entre seções no card                   |
| `8`    | 32  | padding-y de section                       |
| `12`   | 48  | gap entre blocos da home                   |
| `16`   | 64  | padding-y de hero                          |
| `24`   | 96  | breathing entre seções grandes             |

Container: `max-w-7xl` (1280px) com `px-4 md:px-6 lg:px-8`.

Grid de produtos:

- Mobile: 2 colunas
- Tablet: 3 colunas
- Desktop: 4 colunas (igual Citerol)
- `gap-x-4 gap-y-8`

---

## 5. Border radius

Citerol é **bem reto** — cards parecem ter 0-4px de radius (visual quase quadrado, "tático"). Vamos manter:

| Token        | Valor    | Uso                                        |
|--------------|----------|--------------------------------------------|
| `radius-none`| 0        | badges retangulares                        |
| `radius-sm`  | 2px      | inputs, tags                               |
| `radius`     | 6px      | cards, botões                              |
| `radius-md`  | 8px      | modais, painéis                            |
| `radius-lg`  | 12px     | hero cards, modal mobile                   |

Princípio: **menos arredondado que e-commerce de moda fashion**, mais reto que Apple.

---

## 6. Sombras

Citerol usa sombra muito sutil, quase imperceptível, em hover:

```ts
boxShadow: {
  card:        '0 1px 2px rgba(15,17,21,0.04)',
  'card-hover':'0 6px 16px rgba(15,17,21,0.08)',
  popover:     '0 8px 24px rgba(15,17,21,0.12)',
  hero:        '0 16px 40px rgba(15,17,21,0.16)',
}
```

---

## 7. Iconografia

Citerol usa ícones line-art simples (caminhão, WhatsApp, lupa, user). Não há sistema de ícones consistente — alguns são SVGs próprios da VTEX, outros são imagens.

Recomendação D Police: **Lucide React** como base, com 2-3 ícones customizados (badge "validado por IA", crachá CFSD, etc.)

---

## 8. Estados de interação

Padrões observados / sugeridos:

| Estado     | Tratamento                                          |
|------------|-----------------------------------------------------|
| `hover`    | Card eleva (shadow `card-hover`), imagem dá zoom 1.03, CTA muda 8% mais escuro |
| `focus`    | Ring 2px `--ring` com offset 2px (acessibilidade)   |
| `active`   | Translate-y 1px + sombra reduzida                   |
| `disabled` | opacidade 0.5, cursor not-allowed                   |
| `loading`  | skeleton com shimmer (1.5s loop)                    |

---

## 9. Z-index scale

```ts
zIndex: {
  base:    0,
  raised:  10,
  sticky:  100,   // header
  dropdown:200,   // mega menu
  drawer:  300,   // mini-cart, mobile menu
  modal:   400,
  toast:   500,
  whatsapp:600,   // FAB sempre por cima
}
```

---

## 10. Token sumário (rápida exportação)

```ts
export const tokens = {
  color: {
    primary:   '#0F2A4F',
    olive:     '#5A6242',
    tan:       '#C8A878',
    promo:     '#C41E2A',
    launch:    '#0A0A0A',
    surface:   '#FFFFFF',
    muted:     '#F4F5F7',
    ink:       '#0F1115',
    inkMuted:  '#5A5F66',
    border:    '#E5E7EB',
    whatsapp:  '#25D366',
  },
  radius: { none: '0', sm: '2px', DEFAULT: '6px', md: '8px', lg: '12px' },
  font:   { sans: 'Inter, system-ui', display: 'Bebas Neue, Inter', mono: 'JetBrains Mono, monospace' },
  shadow: {
    card: '0 1px 2px rgba(15,17,21,0.04)',
    cardHover: '0 6px 16px rgba(15,17,21,0.08)',
  },
};
```
