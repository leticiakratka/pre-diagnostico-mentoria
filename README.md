# Pré-diagnóstico: Mentoria para Planejadores

Formulário que o planejador responde antes da sessão estratégica. As respostas
viram a base da pré-proposta (diagnóstico, plano, duração e investimento).
Vale para todo lead de diagnóstico da mentoria: o link é o mesmo pra todos.

- Página: https://pre-diagnostico-mentoria.pages.dev/ (Cloudflare Pages, projeto
  `pre-diagnostico-mentoria`, por upload direto: push no GitHub **não** publica sozinho).
  Para publicar uma mudança, copie só o `index.html` para uma pasta vazia e rode
  `npx wrangler pages deploy <pasta> --project-name pre-diagnostico-mentoria --branch main`.
- Respostas: planilha "Pré-diagnóstico Mentoria", aba **Respostas**
- Endpoint: Apps Script vinculado à planilha (`Code.gs` é a cópia de referência).
  A URL do app da Web está em `SCRIPT_URL` no `index.html`.
- Projeto no Notion: Mentoria high ticket para planejadores financeiros (Portfólio do Plano Diretor)
- GTM server-side: container GTM-N9GCCZSW via api.leticiakratka.com.br.
  Evento no envio: `prediag_mentoria_enviado`.
- Visual: mesma base da Pesquisa de Avanço da Travessia, com paleta oliva e dourado
  e títulos em Instrument Serif.

## Fluxo

18 telas (17 se a pessoa não produz conteúdo: a tela de detalhe do conteúdo some).
Blocos: você e o negócio, números e meta, conteúdo e captação, o que já investiu,
onde dói e fechamento (horas por semana e quem decide junto).
