# Citerol — Estrutura página por página

> Pesquisa visual baseada em WebFetch das URLs públicas em 2026-05-04. Onde a URL retornou 404 ou search-vazia, está marcado como **[indisponível]**. O Citerol roda em **VTEX** (storefront FastStore-like, com mega-menu, pagination "Mostrar mais", e filtros laterais por facet).

---

## 1. Homepage (`/`)

Ordem dos blocos (top → bottom):

1. **Top bar** (linha fina, full width)
   - Ícone caminhão + "FRETE GRÁTIS A PARTIR DE R$ 300"
   - Ícone WhatsApp + telefone "(31) 3506-6954"
   - Ícone uniforme + "ROTEIRO DO CAMINHÃO" (delivery próprio da loja)
2. **Header principal**
   - Logo Citerol (esquerda) → link `/`
   - Menu central com 5 entradas: **ROUPAS**, **ACESSÓRIOS**, **UNIFORMES PARA ÓRGÃOS PÚBLICOS**, **UNIFORMES PARA EMPRESAS** (link externo `citerolparaempresas.com.br`), **MAIS VENDIDOS**, **OUTLET**, **VÍDEOS**
   - Direita: link "Entrar" (sem ícone destacado de carrinho/lista, indica header simplificado tipo VTEX legacy)
   - Mega menu expansível em ROUPAS, ACESSÓRIOS, UNIFORMES (ver detalhe em `components-catalog.md`)
3. **Carrossel hero** (full-bleed, ~9 slides)
   - Cada slide = imagem grande + título sobreposto + CTA "CONHEÇA"
   - Setas laterais; provavelmente bullets de paginação
   - Slides observados: Camisa Titan, Overshirt Select 50% OFF, Coturno Brute Ômega Preto, Novo Fardamento PMMG, Calça Route, Cinto Bull (R$50 OFF na 2ª), Calça Route Sky Stone, Camisa Rock, Pack do Mês (Loadout)
4. **Grid de atalhos de categoria** (12 cards)
   - 4 colunas desktop presumido
   - Cards: Botas, Camisas, Camisetas, Cintos, Cuecas, Calças, Bermudas, Jaquetas, Uniformes para Empresas, Mais Vendidos
   - Cada card: imagem cortada/ilustrativa + label
5. **Cards de corporações** (5 blocos grandes)
   - PMMG, PPMG, CBMMG, CTPM (Colégio Tiradentes), GCM (Guarda Civil Municipal)
   - Imagens com militar/policial uniformizado + label da corporação
6. **Prateleira "Mais vendidos"**
   - Heading H2 "Mais vendidos"
   - 5 produtos em row (carrossel ou grid 5-up)
   - Card com **seletor de tamanho inline** + botão "Adicionar ao carrinho" direto na shelf (UX de venda rápida tipo VTEX legacy)
   - Link "Ver todos" no final da shelf
7. **Bloco "Sobre a Citerol"**
   - Texto curto "Desde 1966, nossa empresa…", "veste mais de 5.000 empresas privadas, forças de segurança e órgãos públicos"
   - CTA "Saiba mais >"
8. **Bloco de benefícios** (3 ícones em row)
   - Frete grátis acima de R$ 300
   - Até 6x sem juros
   - Descontos exclusivos no site
9. **Localizador de lojas** ("ENCONTRE A LOJA MAIS PERTO DE VOCÊ")
   - 12 lojas em formato lista vertical
   - Cada item: nome + endereço + cidade/UF + telefone (link `tel:`) + WhatsApp (link `wa.me`)
10. **Footer** (4 colunas)
    - Col 1 INSTITUCIONAL: Quem Somos, Nossas Lojas, Roteiro do Caminhão, História da Citerol, Documentos Corporativos
    - Col 2 AJUDA: Entregas e Pedidos, Trocas e Devoluções, Cuidados com os Produtos, Privacidade e Termos de Uso
    - Col 3 ATENDIMENTO: Roteiro do Caminhão, telefone, WhatsApp
    - Col 4 SIGA A CITEROL: Facebook, Instagram, YouTube, LinkedIn, TikTok
11. **Faixa de pagamento e tecnologia**
    - "compre com segurança"
    - Logos: PIX, Mastercard, Visa, Elo, Amex, Hipercard
    - "Powered by VTEX, Let's Encrypt"
12. **Faixa legal**
    - Logo mobile + razão social "Citerol Comércio e Indústria de Tecidos e Roupas LTDA" + CNPJ 17.183.666/0001-25 + endereço sede

---

## 2. Categoria / PLP (ex: `/botas`, `/camisas`, `/camisetas`, `/calcas`, `/jaquetas`, `/bermudas`, `/cintos`, `/mais-vendidos`, `/outlet`)

Padrão consistente em todas as PLPs:

1. **Top bar + Header** (mesmos da home)
2. **Breadcrumb**: `Home > [categoria]` (label minúsculo, mesma capitalização do slug — não normaliza para Title Case)
3. **Título da categoria** (H1, lowercase ex.: "botas", "camisas")
4. **Sem banner de categoria** e **sem texto SEO/intro** na maioria das PLPs gerais (Citerol é seco, vai direto pro grid)
5. **Sidebar de filtros (esquerda)** — acordeão com facets:
   - **Departamento** (Roupas, Acessórios, Uniformes para Órgãos Públicos, Franquias, Estilo de Vida Citerol)
   - **Categoria**
   - **Subcategoria**
   - **Gênero** (Feminino, Masculino, Unissex)
   - **Marca** (Citerol, Bélica, Fardamentos PMMG, Uniformes Colégio Tiradentes, Polícia Civil, etc.)
   - **Tamanho** (numéricos 34-58 e/ou letras PP-GG2/XGG)
   - **Tipo**
   - **Faixa de preço** (slider/input com mín-máx, ex.: "R$ 24,00 – R$ 650,00")
   - Filtros = **checkbox lists**, agrupados em accordions
6. **Header do grid** (acima do grid):
   - Esquerda: contador "X Produtos"
   - Direita: dropdown "Ordenar por" (default: Relevância)
     - Opções: Relevância · Mais vendidos · Mais recentes · Desconto · Preço maior→menor · Preço menor→maior · Nome A-Z · Nome Z-A
7. **Grid de produtos** — 4 colunas desktop, responsivo
8. **Pagination**: botão **"Mostrar mais"** ao final (carregamento progressivo, não numerada nem scroll-infinito automático)
9. **Footer** (idêntico à home)

### Totais observados por PLP

| Categoria   | Total de produtos | Faixa de preço            |
|-------------|-------------------|---------------------------|
| Botas       | 12                | R$ 24,00 – R$ 650,00      |
| Camisas     | 87                | R$ 9,00 – R$ 630,00       |
| Camisetas   | 53                | R$ 9,00 – R$ 580,00       |
| Calças      | 43                | R$ 18,00 – R$ 360,00      |
| Jaquetas    | 7                 | R$ 199,00 – R$ 495,00     |
| Bermudas    | 19                | R$ 14,00 – R$ 200,00      |
| Cintos      | 26                | R$ 17,00 – R$ 400,00      |
| Mais vend.  | 89                | R$ 25,00 – R$ 580,00      |
| Outlet      | 48                | R$ 8,00 – R$ 435,00       |

---

## 3. Coleção / Landing Curada (ex: `/titan`, `/loadout`)

Estrutura reaproveita a PLP, mas com facets pré-aplicadas:

- `/titan` = filtro Department=Roupas, Brand=Citerol, query=Titan → 18 variantes de uma mesma linha (cores, mangas)
- `/loadout` = "Loadout do Mês" → 8 itens curados (camisa, calça, cueca, cinto, coturno, meia)
- Mantém filtros laterais e dropdown de ordenação
- Não há hero/banner customizado nem editorial — é puro grid
- **Insight:** páginas curadas são URLs amigáveis que disparam queries pré-filtradas no VTEX; visualmente idênticas a uma PLP

---

## 4. Páginas por Corporação (Uniformes para órgãos públicos)

Padrão idêntico à PLP, com volume e marca específica:

| Slug             | Nome             | Total | Faixa preço          | Observações                                                                 |
|------------------|------------------|-------|----------------------|------------------------------------------------------------------------------|
| `/pmmg`          | Polícia Militar MG | 212   | R$ 3,00 – R$ 695,00  | Maior catálogo. Subcategorias no menu lateral: florão, gandola, divisas, calças, camisetas, etc. Itens marcados "PRÉ-VENDA" em vermelho e "Novo padrão PMMG". |
| `/cbmmg`         | Bombeiro Militar MG | 40    | —                    | Cor dominante vermelha. Divisas/distintivos por patente (Soldado, Cabo, Sargento, Oficial). |
| `/ctpm`          | Colégio Tiradentes PM | 64    | R$ 8,00 – R$ 290,00  | Mix infantil + adulto (jaquetas, calças, camisetas, sapatos, tênis, cintos, gorros, meias). Descontos de até 88%. |
| `/ppmg`          | Polícia Penal MG | 25    | R$ 6,99 – R$ 494,99  | Combat shirts, calças táticas, jaquetas em nylon resistente a água, brevês bordados. |
| `/tiradentes`    | (alias)          | 0     | —                    | **[indisponível]** retorna search-vazia |
| `/colegio-tiradentes` | (alias)     | 0     | —                    | **[indisponível]** mesmo |
| `/uniformes-pmmg`, `/uniformes-bombeiros`, `/uniformes-policia-militar-mg` | — | 0 | — | **[indisponível]** todos retornam zero. As páginas reais estão nos slugs curtos `/pmmg`, `/cbmmg`, etc. |

**Não há validação de identidade militar** observável — qualquer pessoa pode adicionar produto-uniforme ao carrinho. **Esse é exatamente o gap que a D Police vai cobrir** com IA validando documentos.

---

## 5. PDP (página de produto)

> **Não foi possível abrir nenhuma PDP via WebFetch** — o storefront VTEX da Citerol parece servir as PDPs apenas com client-side render (rotas `/.../p` retornaram 404 fora de browser real). A descrição abaixo é inferida a partir de:
> - HTML cards na PLP (que já mostram preço, parcelamento, badges)
> - Comportamento padrão VTEX FastStore (que é o stack confirmado)
> - Cards de homepage que já usam seletor de tamanho inline + botão de carrinho

Estrutura inferida:

1. Top bar + Header + Breadcrumb (`Home > Categoria > Subcategoria > Produto`)
2. **Galeria à esquerda** (~60% da largura)
   - Imagem principal grande, fundo branco, produto centralizado
   - Thumbs verticais à esquerda (padrão VTEX FastStore)
   - Zoom on hover esperado
3. **Painel info à direita** (~40%)
   - Nome do produto (H1)
   - Marca / linha (ex.: "by Citerol")
   - SKU/código de referência
   - Estrelas de avaliação (componente VTEX)
   - **Preço** em destaque vermelho/preto (R$ XXX,99)
   - **Parcelamento**: "Ou Xx de R$ Y,YY sem juros" (até 6x na maioria)
   - PIX com destaque (não confirmado, mas é prática VTEX brasileira)
   - **Seletor de cor** (variantes navegam para outra PDP, ex.: Titan tem 6 cores como produtos separados — Tan, Verde Oliva, Preto, Coyote, Azul Marinho, Cinza)
   - **Seletor de tamanho** em botões/dropdown
   - Quantidade
   - Botão **"Adicionar ao carrinho"** primário
   - Calculadora de frete (CEP)
4. **Abas/seções abaixo**
   - Descrição do produto (texto + bullets)
   - Especificações técnicas (composição, modelagem, peso, garantia)
   - Avaliações
5. **Shelf "Você também pode gostar"** ao final

---

## 6. Institucional (`/institucional/*`)

> **Todas as URLs `/institucional/sobre`, `/quem-somos`, `/sobre`, `/historia-da-citerol`, `/institucional/entregas-e-pedidos`, `/institucional/trocas-e-devolucoes`, `/institucional/privacidade` retornaram 404 ou search-vazia.** O footer do Citerol lista esses links, mas as URLs públicas que os WebFetches tentaram não responderam.

Provavelmente as páginas existem com slugs diferentes (talvez exclusivas no menu real do site). Para o clone D Police, vamos **redesenhar do zero** ao invés de copiar — só conhecemos os tópicos do menu:

- Quem Somos
- Nossas Lojas
- Roteiro do Caminhão
- História da Citerol
- Documentos Corporativos
- Entregas e Pedidos
- Trocas e Devoluções
- Cuidados com os Produtos
- Privacidade e Termos de Uso

Microcopy do bloco institucional na home (única fonte funcional):
> "Desde 1966, nossa empresa está comprometida… veste mais de 5.000 empresas privadas, forças de segurança e órgãos públicos"

---

## 7. Lojas Físicas (`/lojas-fisicas`)

Layout simples, **lista vertical** (não grid, não mapa interativo).

Cada item:
- Nome da loja + bairro
- Endereço completo + CEP
- Cidade / UF
- Telefone (link `tel:`)
- WhatsApp (link `wa.me`)
- **Sem foto, sem horário, sem mapa interativo** — minimalista

12 lojas, 9 cidades em MG: BH (5 lojas), Contagem, Betim, Ipatinga, Montes Claros, Uberlândia, Uberaba, Juiz de Fora.

Sem busca/filtro por cidade.

---

## 8. Outlet (`/outlet`)

PLP padrão, mas com badges agressivos de desconto (-15% até **-91%**). Microcopy "até 70% off"-style não é exibida explícita; o foco é o badge percentual no card.

48 produtos. Bestiarum: "Calça Tática B1 PMMG Feminina Avulsa" -91%, "Camiseta Bege Sistema Prisional" -80%.

---

## 9. Páginas que estão "vazias" (search-empty)

Endpoints que retornam zero mas existem como rota:

- `/uniformes-pmmg`, `/uniformes-bombeiros`, `/uniformes-policia-militar-mg`, `/colegio-tiradentes`, `/tiradentes`, `/historia-da-citerol`, `/quem-somos`, `/sobre`, `/videos`

Indica que alguém criou redirecionamentos antigos ou rotas que dependem de busca por termo no VTEX. Pra D Police: **definir taxonomia limpa de URLs** (`/cfsd-2025`, `/colegio-tiradentes`, `/pmmg`, `/cbmmg`) com 301 de variações comuns.
