/**
 * Apps Script vinculado à planilha "Pré-diagnóstico Mentoria".
 * Cópia local só de referência: o script publicado vive no editor do Google.
 *
 * Recebe o POST do formulário (index.html, form 'mentoria_prediag') e grava
 * uma linha na aba "Respostas", criada sozinha no primeiro envio.
 *
 * DEPLOY (primeira vez):
 * 1. Crie uma planilha no Google Drive chamada "Pré-diagnóstico Mentoria".
 * 2. Extensões → Apps Script. Apague o que tiver em Code.gs e cole este arquivo.
 * 3. Implantar → Nova implantação → tipo "App da Web".
 *    Executar como: Eu. Quem pode acessar: Qualquer pessoa.
 * 4. Autorize, copie a URL do app da Web e cole em SCRIPT_URL no index.html.
 * 5. Rode testarGravacao() uma vez no editor pra conferir que a linha aparece.
 */

const SHEET_NAME = 'Respostas';

// [cabeçalho, chave do POST]. A ordem aqui é a ordem das colunas.
const COLUNAS = [
  ['Data', '_timestamp'],
  ['Nome', 'nome'],
  ['E-mail', 'email'],
  ['WhatsApp', 'whatsapp'],
  ['Instagram', 'instagram'],
  ['Site', 'site'],
  ['Tempo de atuação', 'tempo_atuacao'],
  ['Certificações', 'certificacoes'],
  ['Como cobra', 'cobranca'],
  ['Ticket médio', 'ticket_medio'],
  ['Clientes ativos', 'clientes_ativos'],
  ['Equipe', 'equipe'],
  ['Funções da equipe', 'equipe_funcoes'],
  ['Metodologia', 'metodologia'],
  ['Faturamento mensal hoje', 'faturamento_atual'],
  ['Meta mensal em 12 meses', 'meta_faturamento'],
  ['Origem dos clientes', 'origem_clientes'],
  ['Canal principal', 'canal_principal'],
  ['Reuniões de venda/mês', 'reunioes_mes'],
  ['Fechamentos/mês', 'fechamentos_mes'],
  ['Frequência de conteúdo', 'conteudo_frequencia'],
  ['Formatos', 'conteudo_formatos'],
  ['Quem produz', 'conteudo_quem'],
  ['Seguidores', 'seguidores'],
  ['Contatos e clientes pelo conteúdo', 'clientes_conteudo'],
  ['Trava no conteúdo', 'trava_conteudo'],
  ['Trava no conteúdo (outro)', 'trava_conteudo_outro'],
  ['Investimento 12 meses', 'investimento_12m'],
  ['Inv. tráfego', 'inv_trafego'],
  ['Inv. equipe', 'inv_equipe'],
  ['Inv. mentoria/consultoria', 'inv_mentoria'],
  ['Inv. cursos', 'inv_cursos'],
  ['Inv. ferramentas', 'inv_ferramentas'],
  ['Inv. conteúdo/agência', 'inv_conteudo'],
  ['Inv. outro', 'inv_outro'],
  ['Mentorias anteriores', 'mentorias_anteriores'],
  ['Disposição próximos 12 meses', 'disposicao_12m'],
  ['Maior problema', 'maior_problema'],
  ['Prioridade 90 dias', 'prioridade_90d'],
  ['O que já tentou', 'ja_tentou'],
  ['Resultado em 6 meses', 'resultado_6m'],
  ['Horas por semana', 'horas_semana'],
  ['Decide com', 'decisao_com'],
  ['utm_source', 'utm_source'],
  ['utm_medium', 'utm_medium'],
  ['utm_campaign', 'utm_campaign'],
  ['utm_content', 'utm_content'],
  ['utm_term', 'utm_term']
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.setFrozenRows(1);
    }
    // Reescreve o cabeçalho sempre: se uma pergunta nova entrar, a aba se ajusta sozinha.
    const headers = COLUNAS.map(function(c) { return c[0]; });
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');

    data._timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const row = COLUNAS.map(function(c) { return celula(data[c[1]] || ''); });
    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Evita que um texto começando com = + - @ vire fórmula na planilha.
function celula(v) {
  const s = String(v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

// Rodar uma vez no editor pra testar. Grava uma linha de teste (pode apagar depois).
function testarGravacao() {
  doPost({ postData: { contents: JSON.stringify({ nome: 'TESTE', email: 'teste@teste.com', form: 'mentoria_prediag' }) } });
}
