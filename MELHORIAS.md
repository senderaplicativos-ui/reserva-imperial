# Reserva Imperial — O que melhorar no site novo

Baseado na auditoria do site atual (`site/html/index.html`). Ordenado por impacto
em conversão: o objetivo do site é gerar contato no WhatsApp do Cleber.

---

## 1. Conteúdo que falta (maior impacto)

### Condições de pagamento — hoje invisíveis
O site atual não mostra **nenhum** preço ou condição. O visitante precisa ligar só
para saber se cabe no bolso dele, e a maioria não liga. Colocar as duas modalidades
em destaque, logo depois dos números do empreendimento:

| Entrada | Parcelas | Correção |
|---|---|---|
| 5% | até 144x | IPCA mensal |
| 10% | até 60x | fixas |

Sugestão de bloco: dois cartões lado a lado, o de 10% marcado como "parcela que não sobe".
Cada cartão com botão "Simular no WhatsApp" que já abre a conversa com o plano escolhido
no texto (`?text=Quero simular o plano de 10%...`).

> Falta definir: os valores em R$. As "tabelas enviadas acima" não chegaram na mensagem.
> Sem o valor do lote não dá para mostrar "a partir de R$ X/mês", que é o gatilho mais forte.

### Vídeos — 3 prontos, nenhum no site
Você já tem 3 vídeos no seu canal e o site atual não usa nenhum. Vídeo de stand e de
obra é o que mais convence em loteamento, porque prova que a obra existe.

- **Reporte** (`cCxr64xngdQ`) — andamento de obra, usar na seção de infraestrutura
- **Stand** (`fD1YooKp1zg`) — usar perto do formulário / agendamento de visita
- **Apresentação** (`8uhp53BxR7E`, Shorts vertical) — usar no topo, é o mais curto

Embedar com `youtube-nocookie.com` + `loading="lazy"`. O Shorts precisa de container
9:16 próprio, não force dentro do 16:9 dos outros.

### Seção do corretor — não existe hoje
O site atual é institucional e anônimo, com um telefone genérico ((22) 99700-4224).
Criar um bloco com sua foto (`site/images/cleber.jpg`, 900x1350), nome, CRECI 92622 e a
bio de especialista em bairros planejados. Pessoas compram lote de uma pessoa, não de
um site. O "sem intermediários" é um diferencial real, deixar bem visível.

### FAQ — o menu promete e a página não entrega
Existe link "Dúvidas" na navegação, mas nenhuma seção de dúvidas na página. Perguntas
que valem responder: posso construir quando quiser? qual o prazo de entrega? o lote
já tem escritura? aceita financiamento bancário? tem taxa de condomínio? (não tem,
é bairro aberto — isso é vantagem, explicar).

---

## 2. SEO — hoje o site é praticamente invisível

Achados da auditoria:

| Item | Estado atual | Correção |
|---|---|---|
| Meta description | ausente | escrever uma com "lotes em Campos dos Goytacazes" |
| Open Graph / Twitter Card | **0 tags** | sem isso, link no WhatsApp/Facebook aparece sem imagem |
| Schema.org | **0** | adicionar `RealEstateListing` + `LocalBusiness` |
| `<h1>` | **4 na mesma página** | deixar 1 só, com a palavra-chave |
| Título | "Loteamento Reserva Imperial" | incluir cidade: "...em Campos dos Goytacazes - RJ" |

O Open Graph é o mais urgente para o seu caso: você divulga por WhatsApp, e hoje o
link colado lá aparece sem miniatura nem descrição. Isso derruba muito o clique.

Palavras-chave que faltam no texto: "Campos dos Goytacazes", "lote à venda",
"loteamento financiado", "terreno parcelado". O texto atual fala de "Parque Imperial"
mas quase não cita a cidade.

---

## 3. Performance

| Item | Atual | Meta |
|---|---|---|
| JS | **968 KB** (jQuery + jQuery Migrate + Slider Revolution + jPlayer) | < 100 KB |
| CSS | **765 KB** (15 arquivos) | 1 arquivo, < 50 KB |
| Imagens em WebP | **0** | todas |
| Imagens com lazy load | 11 de 37 | todas abaixo da primeira tela |

O jQuery Migrate em produção indica plugin velho não atualizado. O jPlayer (player de
áudio) está carregando sem o site ter áudio nenhum — peso puro.

As imagens maiores para converter: `implantacao.jpg`, `reserva-imperial-implementacao.jpg`,
`cleber.jpg` (200 KB para uma foto de perfil), `reserva-imperial03/05.jpg`, `banner.jpg`,
`banner2.jpg`, `reserva-imperial-mapa-1.jpg`.

Como a maioria do seu público chega por celular vindo do Instagram, cada 100 KB conta.

---

## 4. Acessibilidade

- **15 imagens com `alt` vazio** de 37 no total. As fotos da galeria têm legenda visível
  mas `alt` em branco — descrever ("playground com brinquedos", "via pavimentada").
- **0 `<label>` nos formulários.** Os campos usam só placeholder, que desaparece quando
  a pessoa digita e não é lido por leitor de tela. Todo campo precisa de label.
- Verificar contraste do texto sobre as imagens de banner — texto claro sobre foto clara
  costuma reprovar no mínimo de 4.5:1.

---

## 5. Formulário e conversão

O formulário atual (Contact Form 7) tem seletor de preferência de contato: e-mail,
ligação, whats, agendar visita. Manter a ideia, mas:

- Reduzir campos. Nome + WhatsApp basta para o primeiro contato.
- Adicionar máscara no telefone e validação antes do envio.
- Mostrar confirmação na própria página, sem recarregar.
- Botão flutuante de WhatsApp com mensagem pré-preenchida, em vez de abrir conversa vazia.
- Adicionar honeypot ou similar contra spam de bot.

Se for medir resultado, definir eventos: clique no WhatsApp, envio de formulário,
play em cada vídeo, clique em "como chegar". O site atual tem 27 referências a
scripts de analytics/pixel — vale conferir se algum ainda é seu e está ativo, ou se é
resíduo do dono anterior. Rastreamento herdado pode estar mandando dados para terceiros.

---

## 6. Pontos que já funcionam — manter

- Os 6 números do empreendimento (150.000 m², 552 lotes, 21 quadras, 140–244 m²,
  6.500 m² de área verde, 7.500 m² de equipamentos). Concreto e verificável.
- O argumento de localização: Av. 28 de Março a menos de 1 minuto, saída para as
  praias e para o Porto do Açu. O Porto do Açu é forte, é gerador de emprego na região.
- A galeria com legendas por benefício, não por número de foto.
- As notas legais do footer (registro, matrícula, CAU do arquiteto). Passa segurança
  jurídica e é obrigatório — reaproveitar na íntegra.

---

## 7. Ordem sugerida de seções no site novo

1. Hero — vídeo Shorts ou banner + headline com cidade + botão WhatsApp
2. Os 6 números + faixa de infraestrutura
3. **Condições de pagamento** (5% / 10%) ← novo, e o mais importante
4. Galeria de fotos
5. Vídeo do stand + vídeo de obra ← novo
6. Localização com mapa e "como chegar"
7. **Seção do corretor** com foto, CRECI e bio ← novo
8. **FAQ** ← novo
9. Formulário curto
10. Footer com notas legais

WhatsApp flutuante presente em toda a rolagem.

---

## Pendências suas

1. **Tabelas de preço** — sem elas não dá para publicar valores nem "a partir de R$ X/mês".
2. **Prazo de entrega / status da obra** — o selo "SeloObras.png" sugere obra em andamento;
   confirmar a etapa atual para o site não ficar desatualizado.
3. **Definir se as redes sociais do site são as do loteamento ou as suas.** Hoje o site
   aponta para o Facebook/Instagram/YouTube do empreendimento. Seu Instagram é
   @cleber_corretorcampista e os vídeos estão no seu canal. Decidir o que vai no footer.
