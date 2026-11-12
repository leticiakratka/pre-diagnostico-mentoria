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

10 telas, uns 8 minutos. Versão combinada com o Leo em 12/11/2026, em voz neutra
(sem primeira pessoa). Telas: você, sua situação (situação hoje e o que pensa daqui
pra frente), sua oferta e clientes ativos, sua estrutura (equipe e metodologia), seus
números (faturamento, meta, reuniões e fechamentos), como os clientes chegam (origem e
conteúdo), o que já investiu (total obrigatório, itens opcionais, mentorias anteriores),
o que topa investir, onde dói (até 2 desafios, frase do dia a dia, 90 dias, 6 meses) e
quem decide junto. Toda opção "outro" abre um campo pra especificar, obrigatório
quando marcada.

Pergunta nova não exige reimplantar o Apps Script: campo desconhecido vira coluna
no fim da aba Respostas.
