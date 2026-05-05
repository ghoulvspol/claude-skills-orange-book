#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const inputFile = process.argv[2] || 'Claude-Code-Skills-橙皮书.md';
const outputPdf = process.argv[3] || 'Claude-Code-Skills-橙皮书.pdf';
const tmpHtml = path.join(__dirname, '_tmp_skills_book.html');

let md = fs.readFileSync(path.join(__dirname, inputFile), 'utf8');

// ── Custom blocks → HTML ──────────────────────────────────────────
const BG_MAP = {
  'light-orange': '#FFF3E0', 'orange': '#FF6D00',
  'light-yellow': '#FFFDE7', 'yellow': '#FFF176',
  'light-green':  '#E8F5E9', 'green': '#388E3C',
  'light-red':    '#FFEBEE', 'red': '#D32F2F',
  'light-blue':   '#E3F2FD', 'blue': '#1565C0',
  'light-purple': '#F3E5F5', 'purple': '#6A1B9A',
  'pale-gray':    '#F5F5F5', 'light-gray': '#EEEEEE', 'dark-gray': '#9E9E9E',
};
const BORDER_MAP = {
  'light-orange': '#FF9800', 'orange': '#FF6D00',
  'light-yellow': '#F9A825', 'yellow': '#F9A825',
  'light-green':  '#2E7D32', 'green': '#2E7D32',
  'light-red':    '#C62828', 'red': '#C62828',
  'light-blue':   '#1565C0', 'blue': '#1565C0',
  'pale-gray':    '#BDBDBD', 'light-gray': '#BDBDBD', 'dark-gray': '#757575',
};
const EMOJI_MAP = {
  balloon: '🎈', memo: '📝', fire: '🔥', bulb: '💡', warning: '⚠️',
  speech_balloon: '💬', zap: '⚡', red_circle: '🔴', x: '❌',
  white_check_mark: '✅', chart_increasing: '📈', palm_tree: '🌴',
  orange_heart: '🧡',
};

md = md.replace(
  /<callout emoji="([^"]*)" background-color="([^"]*)">([\s\S]*?)<\/callout>/g,
  (_, emoji, bg, inner) => {
    const bgColor = BG_MAP[bg] || '#FFF3E0';
    const borderColor = BORDER_MAP[bg] || '#FF9800';
    const emojiChar = EMOJI_MAP[emoji] || '📌';
    return `<div class="callout" style="background:${bgColor};border-left:4px solid ${borderColor}"><span class="callout-emoji">${emojiChar}</span><div class="callout-body">${inner.trim()}</div></div>`;
  }
);

md = md.replace(/<grid cols="(\d+)">([\s\S]*?)<\/grid>/g, (_, cols, inner) => {
  const columns = inner.split(/<column[^>]*>/).slice(1).map(c =>
    `<div class="col">${c.replace(/<\/column>[\s\S]*$/, '').trim()}</div>`
  );
  return `<div class="grid grid-${cols}">${columns.join('')}</div>`;
});

// ── Standard Markdown → HTML ─────────────────────────────────────
function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function inlineFormat(text) {
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  text = text.replace(/~~(.+?)~~/g, '<del>$1</del>');
  text = text.replace(/<u>(.+?)<\/u>/g, '<u>$1</u>');
  text = text.replace(/<text[^>]*color="([^"]*)"[^>]*>(.+?)<\/text>/g, '<span style="color:$1">$2</span>');
  return text;
}

// Split into lines and process
const lines = md.split('\n');
let html = '';
let inTable = false;
let tableRows = [];
let inList = false;
let listItems = [];
let listOrdered = false;
let inBlockquote = false;
let bqLines = [];
let inCodeBlock = false;
let codeLines = [];
let codeLang = '';

function flushTable() {
  if (!tableRows.length) return;
  html += '<table>\n';
  tableRows.forEach((row, i) => {
    const tag = i === 0 ? 'th' : 'td';
    const cells = row.replace(/^\||\|$/g, '').split('|').map(c => `<${tag}>${inlineFormat(c.trim())}</${tag}>`).join('');
    if (row.match(/^[\s|:-]+$/)) return;
    html += `<tr>${cells}</tr>\n`;
  });
  html += '</table>\n';
  tableRows = [];
  inTable = false;
}
function flushList() {
  if (!listItems.length) return;
  const tag = listOrdered ? 'ol' : 'ul';
  html += `<${tag}>\n${listItems.map(i => `<li>${inlineFormat(i || '')}</li>`).join('\n')}\n</${tag}>\n`;
  listItems = [];
  inList = false;
}
function flushBq() {
  if (!bqLines.length) return;
  html += `<blockquote>${inlineFormat(bqLines.join('<br>'))}</blockquote>\n`;
  bqLines = [];
  inBlockquote = false;
}
function flushCode() {
  if (!codeLines.length) return;
  const escaped = escapeHtml(codeLines.join('\n'));
  html += `<pre><code class="language-${codeLang}">${escaped}</code></pre>\n`;
  codeLines = [];
  inCodeBlock = false;
  codeLang = '';
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Code block start/end
  if (line.trim().startsWith('```')) {
    if (!inCodeBlock) {
      flushTable(); flushList(); flushBq();
      inCodeBlock = true;
      codeLang = line.trim().replace(/^```/, '').trim() || 'text';
    } else if (line.trim() === '```') {
      flushCode();
    } else {
      codeLines.push(line);
    }
    continue;
  }
  if (inCodeBlock) {
    codeLines.push(line);
    continue;
  }

  // Pass-through already-converted HTML
  if (line.startsWith('<div class="callout"') || line.startsWith('<div class="grid') ||
      line.startsWith('<span class=') || /^<\/div>/.test(line.trim())) {
    flushTable(); flushList(); flushBq();
    html += line + '\n';
    continue;
  }
  // Headings
  const hMatch = line.match(/^(#{1,6})\s+(.*)/);
  if (hMatch) {
    flushTable(); flushList(); flushBq();
    const level = hMatch[1].length;
    const text = inlineFormat(hMatch[2].replace(/\s*\{[^}]*\}/, ''));
    html += `<h${level}>${text}</h${level}>\n`;
    continue;
  }
  // HR
  if (/^---+$/.test(line.trim())) {
    flushTable(); flushList(); flushBq();
    html += '<hr>\n';
    continue;
  }
  // Table
  if (/^\|/.test(line)) {
    flushList(); flushBq();
    inTable = true;
    tableRows.push(line);
    continue;
  } else if (inTable) {
    flushTable();
  }
  // Ordered list
  const olMatch = line.match(/^(\d+)\.\s+(.*)/);
  if (olMatch) {
    flushBq();
    if (!inList || !listOrdered) { flushList(); inList = true; listOrdered = true; }
    listItems.push(olMatch[2]);
    continue;
  }
  // Unordered list
  const ulMatch = line.match(/^[-*]\s+(.*)/);
  if (ulMatch) {
    flushBq();
    if (!inList || listOrdered) { flushList(); inList = true; listOrdered = false; }
    listItems.push(ulMatch[1]);
    continue;
  }
  if (inList && line.trim() === '') {
    flushList();
    continue;
  }
  // Blockquote
  const bqMatch = line.match(/^>\s*(.*)/);
  if (bqMatch) {
    flushList();
    inBlockquote = true;
    bqLines.push(bqMatch[1]);
    continue;
  } else if (inBlockquote) {
    flushBq();
  }
  // Empty line
  if (line.trim() === '') {
    flushTable(); flushList(); flushBq();
    html += '<p class="spacer"></p>\n';
    continue;
  }
  // Normal paragraph
  flushTable(); flushList(); flushBq();
  html += `<p>${inlineFormat(line)}</p>\n`;
}
flushTable(); flushList(); flushBq(); flushCode();

// ── Build final HTML ──────────────────────────────────────────────
const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Claude Code Skills 橙皮书</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap');

  :root {
    --orange: #F57C00;
    --orange-light: #FFF3E0;
    --orange-border: #FF9800;
    --text: #212121;
    --text-secondary: #616161;
    --divider: #E0E0E0;
    --page-width: 210mm;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
    font-size: 10pt;
    line-height: 1.75;
    color: var(--text);
    background: #fff;
    padding: 0;
  }

  /* ── Cover Page ── */
  .cover {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #FF6D00 0%, #FF9800 40%, #FFB74D 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 60mm 20mm 40mm 20mm;
    page-break-after: always;
    color: white;
  }
  .cover-tag {
    font-size: 9pt;
    letter-spacing: 4px;
    text-transform: uppercase;
    opacity: 0.8;
    margin-bottom: 8mm;
    border: 1px solid rgba(255,255,255,0.5);
    padding: 3px 10px;
    border-radius: 2px;
  }
  .cover-title {
    font-size: 32pt;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 6mm;
    letter-spacing: -0.5px;
  }
  .cover-subtitle {
    font-size: 13pt;
    opacity: 0.85;
    margin-bottom: 20mm;
    font-weight: 400;
  }
  .cover-meta {
    font-size: 9pt;
    opacity: 0.75;
    line-height: 2;
    border-top: 1px solid rgba(255,255,255,0.3);
    padding-top: 6mm;
    width: 100%;
  }
  .cover-meta strong { opacity: 1; font-weight: 500; }

  /* ── TOC Page ── */
  .toc-page {
    page-break-after: always;
    padding: 20mm 18mm;
  }
  .toc-page h2 {
    font-size: 16pt;
    color: var(--orange);
    margin-bottom: 8mm;
    border-bottom: 2px solid var(--orange);
    padding-bottom: 3mm;
  }
  .toc-part {
    font-weight: 700;
    font-size: 10.5pt;
    color: var(--orange);
    margin: 5mm 0 2mm 0;
  }
  .toc-item {
    font-size: 9.5pt;
    line-height: 2.2;
    color: var(--text);
    padding-left: 5mm;
  }
  .toc-item a {
    color: var(--text);
    text-decoration: none;
  }

  /* ── Content ── */
  .content {
    padding: 15mm 18mm;
    max-width: 174mm;
    margin: 0 auto;
  }

  h1 {
    font-size: 18pt;
    font-weight: 700;
    color: var(--orange);
    margin: 14mm 0 4mm 0;
    padding-bottom: 2mm;
    border-bottom: 2px solid var(--orange);
    page-break-after: avoid;
  }
  h1:first-of-type { margin-top: 6mm; }

  h2 {
    font-size: 14pt;
    font-weight: 700;
    color: var(--text);
    margin: 10mm 0 4mm 0;
    page-break-after: avoid;
    padding-bottom: 1.5mm;
    border-bottom: 1px solid var(--divider);
  }

  h3 {
    font-size: 11pt;
    font-weight: 700;
    color: #424242;
    margin: 6mm 0 2mm 0;
    page-break-after: avoid;
  }

  h4 {
    font-size: 10pt;
    font-weight: 700;
    color: #616161;
    margin: 4mm 0 2mm 0;
  }

  p { margin: 0 0 3mm 0; }
  p.spacer { margin: 1mm 0; }

  strong { font-weight: 700; }
  em { font-style: italic; }
  code {
    font-family: 'SF Mono', 'Menlo', 'Consolas', monospace;
    font-size: 8.5pt;
    background: #F5F5F5;
    padding: 1px 4px;
    border-radius: 3px;
    color: #E64A19;
  }

  pre {
    background: #263238;
    color: #EEFFFF;
    padding: 3mm 4mm;
    border-radius: 6px;
    margin: 3mm 0;
    overflow-x: auto;
    page-break-inside: avoid;
    font-size: 8pt;
    line-height: 1.6;
  }
  pre code {
    background: none;
    color: inherit;
    padding: 0;
    font-size: inherit;
  }

  hr {
    border: none;
    border-top: 1px solid var(--divider);
    margin: 8mm 0;
  }

  blockquote {
    border-left: 3px solid var(--orange-border);
    padding: 2mm 4mm;
    margin: 3mm 0;
    color: var(--text-secondary);
    font-style: italic;
    background: var(--orange-light);
    border-radius: 0 4px 4px 0;
  }

  a {
    color: var(--orange);
    text-decoration: none;
  }

  /* ── Tables ── */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 4mm 0;
    font-size: 9pt;
    page-break-inside: avoid;
  }
  th {
    background: var(--orange);
    color: white;
    padding: 2.5mm 3mm;
    text-align: left;
    font-weight: 600;
    font-size: 8.5pt;
  }
  td {
    padding: 2mm 3mm;
    border-bottom: 1px solid #EEEEEE;
    vertical-align: top;
  }
  tr:nth-child(even) td { background: #FAFAFA; }
  tr:hover td { background: var(--orange-light); }

  /* ── Lists ── */
  ul, ol {
    margin: 2mm 0 3mm 5mm;
    padding-left: 5mm;
  }
  li { margin-bottom: 1.5mm; }

  /* ── Callout ── */
  .callout {
    display: flex;
    align-items: flex-start;
    gap: 3mm;
    padding: 3mm 4mm;
    border-radius: 6px;
    margin: 3mm 0;
    page-break-inside: avoid;
  }
  .callout-emoji {
    font-size: 14pt;
    line-height: 1.5;
    flex-shrink: 0;
  }
  .callout-body {
    flex: 1;
    font-size: 9.5pt;
    line-height: 1.7;
  }
  .callout-body p { margin-bottom: 1.5mm; }
  .callout-body p:last-child { margin-bottom: 0; }
  .callout-body strong { font-weight: 700; }
  .callout-body table { margin: 2mm 0; }

  /* ── Grid ── */
  .grid {
    display: flex;
    gap: 4mm;
    margin: 3mm 0;
    page-break-inside: avoid;
  }
  .grid-2 .col { flex: 1; }
  .grid-3 .col { flex: 1; }
  .col {
    min-width: 0;
    font-size: 9pt;
  }
  .col p { margin-bottom: 2mm; }
  .col .callout { font-size: 8.5pt; }

  /* ── Footer ── */
  .page-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 7.5pt;
    color: #999;
    padding: 3mm 0;
  }

  /* ── Page breaks ── */
  @media print {
    body { background: white; }
    h1 { page-break-before: always; }
    h1:first-of-type { page-break-before: avoid; }
    .cover { page-break-after: always; }
    table { page-break-inside: avoid; }
    .callout { page-break-inside: avoid; }
    .grid { page-break-inside: avoid; }
    pre { page-break-inside: avoid; }

    @page {
      size: A4;
      margin: 15mm 18mm 18mm 18mm;
    }
    @page :first {
      margin: 0;
    }
  }
</style>
</head>
<body>

<!-- Cover Page -->
<div class="cover">
  <div class="cover-tag">Orange Paper · 橙皮书</div>
  <div class="cover-title">Claude Code Skills<br>橙皮书</div>
  <div class="cover-subtitle">用技能扩展AI编程的边界</div>
  <div class="cover-meta">
    <strong>版本</strong>：v1.0<br>
    <strong>作者</strong>：滔哥<br>
    <strong>为谁创建</strong>：Claude Code 用户、AI 工具开发者、技术团队负责人<br>
    <strong>基于</strong>：Claude Code Skills 生态（2026年5月）<br>
    <strong>最后更新</strong>：2026年5月4日
  </div>
</div>

<!-- TOC Page -->
<div class="toc-page">
  <h2>目录</h2>
  <div class="toc-part">Part 1: 认识 Skills</div>
  <div class="toc-item">§01 Skills 是什么</div>
  <div class="toc-item">§02 Skills 的文件结构</div>
  <div class="toc-item">§03 Skills 的安装和管理</div>
  <div class="toc-item">§04 第一个 Skill：10分钟上手</div>

  <div class="toc-part">Part 2: 使用 Skills</div>
  <div class="toc-item">§05 Skills 的触发机制</div>
  <div class="toc-item">§06 Skills 的三级渐进式加载</div>
  <div class="toc-item">§07 常用内置 Skills 详解</div>
  <div class="toc-item">§08 社区 Skills 生态</div>

  <div class="toc-part">Part 3: 创建 Skills</div>
  <div class="toc-item">§09 SKILL.md 的编写规范</div>
  <div class="toc-item">§10 前置脚本（Preamble）</div>
  <div class="toc-item">§11 参考文件（References）</div>
  <div class="toc-item">§12 打包发布</div>

  <div class="toc-part">Part 4: 进阶技巧</div>
  <div class="toc-item">§13 条件触发和上下文感知</div>
  <div class="toc-item">§14 多 Skills 协作</div>
  <div class="toc-item">§15 Skills 的性能优化</div>
  <div class="toc-item">§16 Skills 和 Agent、MCP 的配合</div>

  <div class="toc-part">Part 5: Skills 生态全集</div>
  <div class="toc-item">§17 开发类 Skills</div>
  <div class="toc-item">§18 设计类 Skills</div>
  <div class="toc-item">§19 运维类 Skills</div>
  <div class="toc-item">§20 效率类 Skills</div>
  <div class="toc-item">§21 数据分析类 Skills</div>
  <div class="toc-item">§22 学术研究类 Skills</div>
  <div class="toc-item">§23 视频制作类 Skills</div>
  <div class="toc-item">§24 花叔 Skills 全家桶详解</div>

  <div class="toc-part">Part 7: 工程化方法论</div>
  <div class="toc-item">§25 挑选 Skill 的三条硬线</div>
  <div class="toc-item">§26 AI 编程工程化：OpenSpec + gstack</div>
  <div class="toc-item">§27 三大 AI 编程神器合体指南</div>

  <div class="toc-part">Part 8: 案例与方法论</div>
  <div class="toc-item">§28 Claude Code 黑客松三强案例</div>
  <div class="toc-item">§29 YC：AI-Native 公司组织方法论</div>

  <div class="toc-part">Part 9: 实战场景</div>
  <div class="toc-item">§30 场景一：用 Skills 搭建完整开发流程</div>
  <div class="toc-item">§31 场景二：从零构建一个 Skill</div>
  <div class="toc-item">§32 场景三：团队协作中的 Skills</div>

  <div class="toc-part">附录</div>
  <div class="toc-item">附录 A：SKILL.md 模板库</div>
  <div class="toc-item">附录 B：常见问题和解决方案</div>
  <div class="toc-item">附录 C：Skills 生态资源</div>
  <div class="toc-item">附录 D：Skill 开发清单</div>
</div>

<!-- Main Content -->
<div class="content">
${html}
</div>

</body>
</html>`;

fs.writeFileSync(tmpHtml, fullHtml);
console.log(`✓ HTML generated: ${tmpHtml}`);

// ── Chrome headless → PDF ─────────────────────────────────────────
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const pdfOut = path.join(__dirname, outputPdf);
const cmd = `"${chrome}" --headless --disable-gpu --no-sandbox \
  --print-to-pdf="${pdfOut}" \
  --print-to-pdf-no-header \
  --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw \
  "file://${tmpHtml}" 2>&1`;

try {
  execSync(cmd, { stdio: 'pipe', timeout: 120000 });
  const size = fs.statSync(pdfOut).size;
  console.log(`✓ PDF generated: ${pdfOut} (${(size/1024).toFixed(0)} KB)`);
  fs.unlinkSync(tmpHtml);
} catch (e) {
  console.error('Chrome error:', e.message);
  console.log(`HTML file kept at: ${tmpHtml}`);
  process.exit(1);
}
