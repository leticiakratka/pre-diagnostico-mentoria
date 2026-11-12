/**
 * Apps Script vinculado à planilha "Pré-diagnóstico Mentoria".
 * Cópia local só de referência: o script publicado vive no editor do Google.
 *
 * Recebe o POST do formulário (index.html, form 'mentoria_prediag') e grava
 * uma linha na aba "Respostas", criada sozinha no primeiro envio.
 *
 * Pergunta nova no formulário não exige mexer aqui: o campo desconhecido vira
 * coluna no fim da aba, com a chave do POST como cabeçalho. Só reimplante se
 * quiser dar nome bonito ou mudar a ordem: cole por cima do Code.gs,
 * Implantar → Gerenciar implantações → lápis → Versão: "Nova versão" → Implantar.
 * A URL continua a mesma.
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
  ['Ofertas', 'ofertas'],
  ['Clientes ativos', 'clientes_ativos'],
  ['Equipe', 'equipe'],
  ['Funções da equipe', 'equipe_funcoes'],
  ['Metodologia', 'metodologia'],
  ['Faturamento mensal hoje', 'faturamento_atual'],
  ['Meta mensal em 12 meses', 'meta_faturamento'],
  ['Reuniões de venda/mês', 'reunioes_mes'],
  ['Fechamentos/mês', 'fechamentos_mes'],
  ['Origem dos clientes', 'origem_clientes'],
  ['Origem (outro)', 'origem_outro'],
  ['Canal principal', 'canal_principal'],
  ['Frequência de conteúdo', 'conteudo_frequencia'],
  ['Trava no conteúdo', 'trava_conteudo'],
  ['Trava no conteúdo (outro)', 'trava_conteudo_outro'],
  ['Inv. tráfego', 'inv_trafego'],
  ['Inv. equipe', 'inv_equipe'],
  ['Inv. mentoria/consultoria', 'inv_mentoria'],
  ['Inv. cursos', 'inv_cursos'],
  ['Inv. ferramentas', 'inv_ferramentas'],
  ['Inv. conteúdo/agência', 'inv_conteudo'],
  ['Inv. outro', 'inv_outro'],
  ['Inv. outro (em quê)', 'inv_outro_qual'],
  ['Mentorias anteriores', 'mentorias_anteriores'],
  ['Disposição próximos 12 meses', 'disposicao_12m'],
  ['Maior problema', 'maior_problema'],
  ['Prioridade 90 dias', 'prioridade_90d'],
  ['Resultado em 6 meses', 'resultado_6m'],
  ['Decide com', 'decisao_com'],
  ['Decide com (quem)', 'decisao_com_outro'],
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
    // Cabeçalho = COLUNAS + campos extras que já apareceram + campos novos deste envio.
    // Assim, pergunta nova no formulário vira coluna no fim da aba sem reimplantar o script.
    const base = COLUNAS.map(function(c) { return c[0]; });
    const atual = sheet.getLastColumn() > 0
      ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].filter(String)
      : [];
    const extras = atual.slice(base.length);
    const conhecidas = COLUNAS.map(function(c) { return c[1]; }).concat(['form', 'enviado_em']);
    Object.keys(data).forEach(function(k) {
      if (conhecidas.indexOf(k) < 0 && extras.indexOf(k) < 0) extras.push(k);
    });
    const headers = base.concat(extras);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');

    data._timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const row = COLUNAS.map(function(c) { return data[c[1]]; })
      .concat(extras.map(function(k) { return data[k]; }))
      .map(function(v) { return celula(v || ''); });
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
