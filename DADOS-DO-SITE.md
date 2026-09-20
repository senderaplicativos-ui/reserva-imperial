# Reserva Imperial — Material extraído para o novo site

Fonte: https://loteamentoreservaimperial.com.br/ (WordPress + Elementor + Slider Revolution)
Extraído em: 2026-09-17

## Estrutura de pastas

```
reserva-imperial/
├── DADOS-DO-SITE.md          <- este arquivo
├── MELHORIAS.md              <- o que mudar no site novo
├── _meta/                    <- listas de URLs originais + texto puro extraído
└── site/
    ├── html/index.html       <- HTML original completo
    ├── images/  (79 arquivos, 3.9 MB)
    ├── css/     (15 arquivos)
    ├── js/      (16 arquivos)
    └── videos/               <- capas dos 3 vídeos do YouTube
```

## Corretor responsável (usar no site novo)

| Campo | Valor |
|---|---|
| Nome | Cleber Maciel |
| CRECI | 92622 |
| Telefone | (22) 99794-4778 |
| WhatsApp | (22) 99794-4778 |
| Instagram | @cleber_corretorcampista |

Bio: Especialista em bairros planejados, com ampla experiência na região norte-fluminense.
Acompanho cada cliente do primeiro contato até a entrega das chaves — sem intermediários.

> O site antigo usa o telefone (22) 99700-4224. No site novo, substituir pelos contatos do Cleber.

## Números do empreendimento

| Item | Valor |
|---|---|
| Área total | 150.000 m² |
| Número de lotes | 552 |
| Quadras | 21 |
| Metragem dos lotes | 140 m² a 244 m² |
| Área verde | + de 6.500 m² |
| Área de equipamentos | + de 7.500 m² |

Infraestrutura: água, luz, pavimentação, saneamento, praças, bairro monitorado*

## Seções da página original

1. Hero / banner com logo e selo de obras
2. Ícones com os 6 números do empreendimento + faixa de infraestrutura
3. "Conheça o empreendimento" — texto de venda
4. Galeria (10 imagens com legendas)
5. "Fique por dentro das novidades!" — captura de e-mail
6. "Localização" — versões desktop e mobile, com mapa e botão COMO CHEGAR
7. "Negocie agora" — formulário com seletor de preferência de contato
8. Footer com notas legais
9. Widget flutuante de WhatsApp

## Legendas da galeria

Vista aérea da implantação · Playground · Quadra · Área pet · Vias pavimentadas ·
Saneamento · Espaço de convivência · Playground · Praça · Quadra de Vôlei de Areia

Arquivos correspondentes: `site/images/reserva-imperial01.jpg` … `reserva-imperial09.jpg`
(cada um com variações -50x35, -108x75, -211x146, -300x207, -768x531)

## Imagens principais

| Arquivo | Uso |
|---|---|
| `logo-reserva-imperial.png` | Logo |
| `favicon.png` | Favicon |
| `banner.jpg`, `banner2.jpg`, `Banner-site.jpeg` | Banners do slider |
| `SeloObras.png` | Selo "obras em andamento" |
| `IMPLANTAcaO_DRONE.jpg` | Vista aérea (drone) |
| `implantacao.jpg`, `reserva-imperial-implementacao.jpg` | Planta de implantação |
| `reserva-imperial-mapa-1.jpg` | Mapa de localização (desktop) |
| `reserva-imperial-mapa-mobile.jpg` | Mapa de localização (mobile) |
| `reserva-imperial-bg.jpg` | Fundo parallax |
| `reserva-imperial-icone1-1.png` … `icone7.png` | Ícones dos números |
| `mtc-uno-e1648673007922.jpg` | Logo da construtora/parceiro |

## Condições de pagamento

Duas modalidades de entrada:

| Entrada | Parcelamento | Correção das parcelas |
|---|---|---|
| **5%** | até **144x** | reajustadas mensalmente pelo IPCA |
| **10%** | até **60x** | **parcelas fixas** (sem reajuste) |

Sujeito a disponibilidade de lotes e aprovação de crédito.

> ⚠️ As tabelas de preço citadas ("conforme tabelas enviadas") não chegaram junto com a
> mensagem. Os valores em R$ por lote/quadra ainda precisam ser fornecidos para entrar no site.

## Vídeos (YouTube — canal Cleber Corretor Campista)

| Título no site | Vídeo | ID | Formato | Capa local |
|---|---|---|---|---|
| Reporte Reserva Imperial | https://youtu.be/cCxr64xngdQ | `cCxr64xngdQ` | horizontal | `site/videos/cCxr64xngdQ-maxresdefault.jpg` |
| Stand Reserva Imperial | https://youtu.be/fD1YooKp1zg | `fD1YooKp1zg` | horizontal | `site/videos/fD1YooKp1zg-hqdefault.jpg` |
| Apresentação Reserva Imperial | https://youtube.com/shorts/8uhp53BxR7E | `8uhp53BxR7E` | **Shorts (vertical 9:16)** | `site/videos/8uhp53BxR7E-maxresdefault.jpg` |

Títulos oficiais no YouTube: "Reporte Loteamento Reserva Imperial", "Stand Loteamento
Reserva Imperial", "Apresentação loteamento Reserva Imperial".

Embed (usar `youtube-nocookie.com` e `loading="lazy"` para não pesar o carregamento):

```html
<iframe src="https://www.youtube-nocookie.com/embed/cCxr64xngdQ"
        title="Reporte Reserva Imperial"
        loading="lazy" allowfullscreen></iframe>
```

O Shorts precisa de container 9:16 — não usar o mesmo player 16:9 dos outros dois.
Os parâmetros `?is=...` dos links originais são de rastreio de compartilhamento e
podem ser descartados no embed.

## Localização

- Coordenadas: **-21.8041464, -41.3095655**
- Bairro: Parque Imperial, Campos dos Goytacazes — RJ
- Referência principal: Av. 28 de Março, a menos de 1 minuto
- Rota Google Maps: `https://www.google.com/maps/dir/-21.8041464,-41.3095655/`

Argumentos de venda da região: bancos, supermercados, lojas, escolas, postos de saúde,
padarias, restaurantes, além do acesso para as praias e para o Porto do Açu.

## Redes sociais do empreendimento

- Facebook: facebook.com/Reserva-Imperial-104089714812236
- Instagram: instagram.com/loteamentoreservaimperial/
- YouTube: youtube.com/channel/UCcLN42lbY4dkcsdHmp9y60w

## Notas legais (reaproveitar no footer)

Texto integral no final de `conteudo-extraido.txt`. Pontos principais:

- Bairro entregue com câmeras, doadas à Prefeitura, que assume o monitoramento.
- Perspectivas artísticas, móveis, equipamentos e paisagismo são ilustrativos.
- Áreas abertas e públicas ficam sob responsabilidade da Prefeitura de Campos dos Goytacazes-RJ.
- Registro: nº R.6 na matrícula 40.383, Cartório do 2º Ofício de Campos dos Goytacazes.
- Projeto de arquitetura: arquiteto Tomaz Teixeira, CAU A28426-2.
- Preços sujeitos a disponibilidade e aprovação de crédito.

## Observações técnicas

- O CSS/JS baixado é do tema WordPress (Elementor, Slider Revolution, jQuery UI, jPlayer).
  Serve como referência de cores e tipografia, mas não vale a pena reaproveitar em um site novo.
- Não havia meta description na página.
- Nenhum preço é divulgado no site.
