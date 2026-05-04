# D Police - Informações Institucionais

Dados coletados via WebFetch em 2026-05-04 a partir de https://www.dpolice.com.br

## Empresa

- **Razão social**: D POLICE COMÉRCIO E INDUSTRIA DE ARTIGO CIVIL E MILITAR LTDA
- **Nome fantasia**: D Police / D'Police
- **CNPJ**: 20.546.775/0001-74
- **Fundação**: 2014, em Belo Horizonte/MG
- **Atuação**: varejista autorizada de uniformes e fardamentos para setores de segurança pública (Polícia Militar, Polícia Penal, Corpo de Bombeiros) e artigos civil/militar

## Endereço da Loja Física

Rua Platina, 409 - LOJA A
Bairro Prado - Belo Horizonte/MG
CEP: 30411-131

## Contatos

| Canal | Valor |
|---|---|
| Telefone fixo | (31) 3293-5006 |
| WhatsApp (institucional) | (31) 99534-2643 |
| WhatsApp (trocas/devoluções) | (31) 99262-5581 |
| E-mail | dpolice@dpolice.com.br |

## Horário de Funcionamento

- **Segunda a sexta**: 08:30 às 19:00
- **Sábado**: 08:30 às 13:00
- **Domingo**: fechado

## Redes Sociais

- Instagram: [@dpolicebh](https://instagram.com/dpolicebh)
- Facebook: presente (handle não capturado)
- Google Maps: endereço acessível via Google

## Formas de Pagamento

Apenas o ícone da bandeira **Rede** é visível no rodapé. Parcelamento sem juros até **4x** consistente em todos os produtos amostrados (1x, 2x, 3x, 4x sem juros), o que sugere cartão de crédito como meio principal. Não foi identificado Pix, boleto ou outras bandeiras na captura, mas isso não significa ausência (o checkout pode oferecer mais).

## Política de Trocas e Devoluções

Fonte: https://www.dpolice.com.br/trocas-e-devolucoes

### Condições gerais
- Produto deve voltar **preferencialmente na embalagem original**, com Nota Fiscal, etiquetas e tags, sem indícios de uso.

### Troca
- **Prazo**: 30 dias corridos após recebimento.
- **Motivos aceitos**: defeito de fabricação comprovado ou problema de tamanho.
- **Opções**: produto idêntico, produto de mesmo valor, produto de valor superior (cliente paga diferença) ou voucher de desconto se indisponível.

### Devolução
- **Prazo**: até 7 dias úteis após o recebimento (compras online — direito de arrependimento, CDC).
- **Motivos aceitos**: arrependimento/desistência ou defeito de fabricação.
- **Condições**: produto intacto, com etiquetas, embalagem original, NF, sem indícios de uso.

## Política de Entregas

Fonte: https://www.dpolice.com.br/entregas

A página é mínima — só descreve o que verificar no ato da entrega:
- Embalagem aberta ou avariada → recusar
- Produto avariado → recusar
- Produto em desacordo com o pedido → recusar
- Acessórios faltando → recusar

**Não há informação publicada sobre**: prazos de envio, valor de frete, frete grátis, transportadoras (Correios? Jadlog?), regiões atendidas. Cliente é orientado a contatar a empresa para detalhes. **Item importante para mapear na migração** — provavelmente cobrir com integração via Melhor Envio ou Frenet no Next.js.

## Política de Privacidade

Fonte: https://www.dpolice.com.br/politica-de-privacidade

- Não vende ou repassa dados a terceiros (exceto para entrega/cobrança).
- Coleta nome, endereço de entrega, e-mail, telefone/celular, preferências de compra.
- Coleta automatizada com mínima intervenção humana.
- Aceite no momento do cadastro.

## Estrutura de URLs (legado)

- Categoria: `/{categoria}` ou `/{categoria}/{subcategoria}`
- Paginação: `/{categoria}/por-nome/{pagina}/false/false/false/`
- Produto (PDP): `/comprar/{slug}/{variante}/{id-numerico}`
- O CMS aparenta ser **GalaxCommerce** (CDN das imagens em `galaxcommerce.com.br/sistema/upload/523/produtos/`). ID `523` provavelmente é o ID da loja na plataforma.

## Estado do Site / Observações para a Migração

1. **Imagens**: praticamente todas as listagens retornaram `loading.gif` no lugar das imagens reais — o site usa lazy-loading agressivo via JS, e o WebFetch não executa scripts. Para puxar as imagens reais será preciso outra abordagem (fetch headless com Playwright/Puppeteer ou parsing dos dados-attributes). Nas PDPs as imagens são acessíveis diretamente em `galaxcommerce.com.br/sistema/upload/523/produtos/`.
2. **Cross-listing**: o catálogo legado coloca o mesmo produto em várias categorias (ex.: `Algema Brasil` aparece em `/uniformes`, `/uniformes/policia-penal-ii`, `/artigos-militares` e `/artigos-militares/algemas`). Na migração para Supabase, modelar como `products` × `categories` (many-to-many), não duplicar.
3. **Variantes na URL**: cada combinação cor/tamanho gera uma URL diferente (ex.: `/calcao-cbmmg/oficial-p/1618` vs `/calcao-cbmmg/sargento-p/1622`). O mesmo produto é listado várias vezes — seria melhor consolidar em 1 produto com matriz de variantes.
4. **SKUs numéricos**: cada PDP tem um código numérico (camisa-policia-penal-preta = 949, conjunto-agasalho-pmmg = 1042, algema-brasil = 1354, coturno-acero-apache = 410, mochila-echolife = 1120). Os IDs nas URLs (1294, 1387, 1710, 650, 1465) parecem ser IDs de variante, não do SKU base.
5. **Slug com aviso de restrição**: produtos restritos têm a string literal `voce-esta-comprando-um-produto-de-uso-exclusivo-de-uma-corporacao` injetada na URL — feio, prejudica SEO. Na migração, mover esse aviso para metadado/badge no UI.
6. **Esgotados em massa**: muitas categorias têm parcela alta de produtos com status "Esgotado" (ex.: Mochilas — 5/5 esgotados; Carteiras e Distintivos — único produto esgotado; Coldres SóColdres — esgotados). Ponto a confirmar com o cliente sobre estoque real.
7. **Páginas 404 / variações de slug**: as URLs sugeridas no briefing usavam `/cintos`, `/algemas`, `/mochilas`, `/acessorios`, `/boinas`, `/roupas`. As corretas são `/cintos-e-fivelas`, `/boinas-e-coberturas` etc. — registrado no catalog.json.
8. **Categoria CFSD 2025 PMMG**: kit do candidato ao Curso de Formação de Soldados PMMG. Sazonal, alinha com o concurso. Importante para a fase de migração — campanha sazonal.
9. **Categoria "Polícia Penal II"**: parece duplicar parte do catálogo de Polícia Penal mas com itens táticos (algemas, capa colete, porta tonfa). Confuso — provavelmente "II" representa o pacote completo/agente armado, vs. "Polícia Penal" só vestuário. Confirmar com cliente.
10. **Cobertura geográfica**: somente loja física em BH e site nacional. Sem indicação de filiais.
11. **Instagram @dpolicebh** é o canal social principal — usar para validar produtos, fotos extras, novidades.
12. **Plataforma legada**: GalaxCommerce (Brasil). Migração para Next.js + Supabase é um salto significativo — vale planejar URL redirects 301 dos slugs antigos preservando os IDs numéricos para SEO.

## Footer Links

- `/quem-somos`
- `/contato`
- `/trocas-e-devolucoes`
- `/politica-de-privacidade`
- `/entregas`
- `/login`
- `/esqueci-minha-senha`
- `/cadastre-se`
