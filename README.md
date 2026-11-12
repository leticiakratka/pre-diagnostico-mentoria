# Pré-diagnóstico: Mentoria para Planejadores

Formulário que o planejador responde antes da sessão estratégica. As respostas
viram a base da pré-proposta (diagnóstico, plano, duração e investimento).
Vale para todo lead de diagnóstico da mentoria: o link é o mesmo pra todos.

- Página: https://pre-diagnostico-mentoria.pages.dev/ (Cloudflare Pages, projeto
  `pre-diagnostico-mentoria`, por upload direto: push no GitHub **não** publica sozinho).
  Para publicar uma mudança, copie só o `index.html` para uma pasta vazia e rode
  `CLOUDFLARE_API_TOKEN=<oauth_token do wrangler> CLOUDFLARE_ACCOUNT_ID=67eb5ca561c8198ac98ab42593f1a74d npx wrangler@3 pages deploy <pasta> --project-name pre-diagnostico-mentoria --branch main`
  (fora do terminal interativo o wrangler não usa o login salvo sozinho; o token fica em
  ~/Library/Preferences/.wrangler/config/default.toml).
- Respostas: planilha "Pré-diagnóstico Mentoria", aba **Respostas**
- Endpoint: Apps Script vinculado à planilha (`Code.gs` é a cópia de referência).
  A URL do app da Web está em `SCRIPT_URL` no `index.html`.
- Projeto no Notion: Mentoria high ticket para planejadores financeiros (Portfólio do Plano Diretor)
- GTM server-side: container GTM-N9GCCZSW via api.leticiakratka.com.br.
  Evento no envio: `prediag_mentoria_enviado`.
- Visual: mesma base da Pesquisa de Avanço da Travessia, com paleta grafite e areia
  e fonte Manrope.

## Fluxo

11 telas, uns 8 minutos. Só entra o que serve pra estimar uma proposta antes da call:
ofertas atuais (pacotes, duração, valor, entrega) e clientes ativos, equipe e metodologia,
faturamento e meta, reuniões de venda e fechamentos, origem dos clientes, conteúdo (frequência e trava), investimento dos últimos 12 meses
por categoria e mentorias anteriores, disposição pros próximos 12 meses, maior problema,
prioridade de 90 dias e resultado esperado em 6 meses, e quem decide junto. Toda opção "outro" abre um campo pra
especificar, obrigatório quando marcada.

Pergunta nova não exige reimplantar o Apps Script: campo desconhecido vira coluna
no fim da aba Respostas.
