import fs from "node:fs/promises";
import path from "node:path";

const ROOT_DIR = process.cwd();
const BLOG_DIR = path.join(ROOT_DIR, "blog");
const PAUTAS_PATH = path.join(BLOG_DIR, "pautas.json");
const TEMPLATE_PATH = path.join(BLOG_DIR, "template.html");
const BLOG_INDEX_PATH = path.join(BLOG_DIR, "index.html");
const SITEMAP_PATH = path.join(ROOT_DIR, "sitemap.xml");

const SITE_URL = "https://www.josephmedeiros.com.br";
const WHATSAPP_NUMBER = "5531996255116";
const MODEL = "gemini-2.5-flash";

/**
 * Sanitiza rigorosamente o slug para evitar path traversal e caracteres inválidos.
 */
function sanitizeSlug(rawSlug) {
  if (typeof rawSlug !== "string") {
    throw new Error("Slug inválido.");
  }
  const cleaned = rawSlug
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);

  if (!cleaned || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(cleaned)) {
    throw new Error(`Slug não passou na validação estrita: "${rawSlug}"`);
  }
  return cleaned;
}

/**
 * Garante que o caminho final resolvido fique estritamente dentro de BLOG_DIR.
 */
function resolveSafeBlogFile(slug) {
  const safeSlug = sanitizeSlug(slug);
  const targetPath = path.resolve(BLOG_DIR, `${safeSlug}.html`);
  const blogRootResolved = path.resolve(BLOG_DIR) + path.sep;
  if (!targetPath.startsWith(blogRootResolved)) {
    throw new Error("Tentativa de acesso fora do diretório /blog bloqueada.");
  }
  return { safeSlug, targetPath };
}

/**
 * Escapa texto puro para inserção segura em HTML ou JSON.
 */
function escapeHtmlText(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Sanitiza um URL permitindo apenas http, https e caminhos relativos seguros.
 */
function sanitizeUrl(url = "") {
  const trimmed = String(url).trim();
  if (!trimmed) return "#";
  if (trimmed.startsWith("/") || trimmed.startsWith("#") || trimmed.startsWith("./") || trimmed.startsWith("../")) {
    return trimmed;
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return parsed.toString();
    }
  } catch {
    return "#";
  }
  return "#";
}

/**
 * Sanitiza o HTML retornado pelo modelo para o corpo do artigo:
 * - Remove blocos markdown ```html ... ```
 * - Remove tags perigosas (script, iframe, object, embed, form, input, meta, link, style, svg, math)
 * - Remove atributos inline de evento (on*) e javascript:/data: em href/src
 * - Mantém apenas tags editoriais seguras
 */
function sanitizeArticleHtml(rawHtml = "") {
  let html = String(rawHtml)
    .replace(/^```(?:html)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  // Remove blocos inteiros de tags perigosas
  html = html.replace(/<(script|style|iframe|object|embed|form|textarea|select|button|svg|math|noscript)[^>]*>[\s\S]*?<\/\1>/gi, "");
  // Remove tags self-closing perigosas
  html = html.replace(/<(script|style|iframe|object|embed|input|meta|link|base|form)[^>]*\/?>/gi, "");

  // Remove atributos on* (onclick, onload, onerror, etc.)
  html = html.replace(/\s+on[a-z0-9_-]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  // Neutraliza href/src com javascript:, vbscript: ou data:
  html = html.replace(/\s+(href|src)\s*=\s*(?:"\s*(?:javascript|vbscript|data):[^"]*"|'\s*(?:javascript|vbscript|data):[^']*')/gi, "");

  // Lista branca de tags permitidas no corpo do artigo
  const allowedTags = new Set([
    "h2", "h3", "h4", "p", "ul", "ol", "li", "strong", "em", "b", "i", "blockquote", "a", "br", "hr"
  ]);

  html = html.replace(/<\/?([a-z0-9-]+)([^>]*)>/gi, (match, tagName, attrs) => {
    const lowerTag = tagName.toLowerCase();
    const isClosing = match.startsWith("</");

    if (!allowedTags.has(lowerTag)) {
      return "";
    }

    if (isClosing || lowerTag === "br" || lowerTag === "hr") {
      return isClosing ? `</${lowerTag}>` : `<${lowerTag}>`;
    }

    if (lowerTag === "a") {
      const hrefMatch = attrs.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
      const safeHref = sanitizeUrl(hrefMatch ? (hrefMatch[1] ?? hrefMatch[2]) : "#");
      const isExternal = /^https?:\/\//i.test(safeHref);
      if (isExternal) {
        return `<a href="${escapeHtmlText(safeHref)}" target="_blank" rel="noopener noreferrer">`;
      }
      return `<a href="${escapeHtmlText(safeHref)}">`;
    }

    return `<${lowerTag}>`;
  });

  return html.trim();
}

function formatDatePtBr(dateObj = new Date()) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo"
  }).format(dateObj);
}

function formatIsoDate(dateObj = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "America/Sao_Paulo"
  }).formatToParts(dateObj);
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return `${map.year}-${map.month}-${map.day}`;
}

async function callGemini(pautaItem) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Variável de ambiente GEMINI_API_KEY não definida.");
  }

  const prompt = `
Você é um redator técnico especializado em lutheria, SEO técnico e GEO (Generative Engine Optimization) para o site da oficina "Joseph Medeiros — Luthier, Conserto e Restauro" (${SITE_URL}), localizada em Belo Horizonte, MG.

DADOS REAIS DO NEGÓCIO (use apenas informações coerentes com estes dados, sem inventar endereços físicos de rua nem preços):
- Marca: Joseph Medeiros — Luthier, Conserto e Restauro
- WhatsApp: (31) 99625-5116
- Localização: Belo Horizonte, Minas Gerais (atendimento com hora marcada em BH/Região Metropolitana, recebimento/envio de arcos e casos de outras regiões, e atendimento institucional).
- Especialidades: ajuste de alma, confecção e ajuste de cavaletes (incluindo padrões franceses), pestanas e cravelhas, troca de crina e revisão estrutural de arcos, plaina de espelho, colagem de trincas, retoques de verniz e restauração para violinos, violas, violoncelos e contrabaixos (estudantes iniciantes, músicos profissionais e orquestras); instrumentos revisados e regulados, arcos, encordoamentos, breus, crina, espaleiras e estojos; fabricação artesanal e afiação de raspilhas temperadas sob medida; atendimento técnico, laudos e fornecimento para escolas de música, projetos culturais, orquestras e órgãos públicos via licitações (ME / CNPJ ativo).

PAUTA ATUAL:
- Título sugerido / tema: ${pautaItem.pauta}
- Categoria: ${pautaItem.categoria}

Responda EXCLUSIVAMENTE com um JSON válido (sem markdown fences), seguindo exatamente este formato:
{
  "titulo": "Título claro, natural e otimizado para busca e GEO (até 75 caracteres)",
  "metaDescription": "Resumo objetivo e persuasivo com até 155 caracteres mencionando Belo Horizonte ou lutheria quando fizer sentido",
  "resumoCard": "Resumo curto de 2 frases (até 180 caracteres) para o card da vitrine do blog",
  "conteudoHtml": "HTML limpo com tags <h2>, <h3>, <p>, <ul>, <li>, <blockquote> (sem <h1>, sem <script>, sem <style>, sem atributos on*)",
  "faq": [
    { "pergunta": "Pergunta objetiva 1", "resposta": "Resposta direta e clara 1" },
    { "pergunta": "Pergunta objetiva 2", "resposta": "Resposta direta e clara 2" },
    { "pergunta": "Pergunta objetiva 3", "resposta": "Resposta direta e clara 3" }
  ]
}
`.trim();

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.55,
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erro na API Gemini (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error("Resposta da API Gemini vazia ou inesperada.");
  }

  const cleanedJson = rawText.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  const parsed = JSON.parse(cleanedJson);

  if (!parsed.titulo || !parsed.conteudoHtml) {
    throw new Error("JSON retornado pela Gemini sem título ou conteúdo.");
  }

  return parsed;
}

function buildSchemaJson({ slug, titulo, metaDescription, categoria, isoDate, faqList }) {
  const articleUrl = `${SITE_URL}/blog/${slug}.html`;
  const graph = [
    {
      "@type": "BlogPosting",
      "@id": `${articleUrl}#article`,
      "headline": titulo,
      "description": metaDescription,
      "articleSection": categoria,
      "datePublished": isoDate,
      "dateModified": isoDate,
      "inLanguage": "pt-BR",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": articleUrl
      },
      "author": {
        "@type": "Person",
        "name": "Joseph Medeiros"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Joseph Medeiros — Luthier, Conserto e Restauro",
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/logo-joseph-medeiros.png`
        }
      },
      "image": `${SITE_URL}/logo-joseph-medeiros.png`
    }
  ];

  if (Array.isArray(faqList) && faqList.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${articleUrl}#faq`,
      "mainEntity": faqList.map((item) => ({
        "@type": "Question",
        "name": String(item.pergunta || "").trim(),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": String(item.resposta || "").trim()
        }
      }))
    });
  }

  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": graph
    },
    null,
    2
  );
}

function buildFaqHtml(faqList = []) {
  if (!Array.isArray(faqList) || faqList.length === 0) {
    return `<details class="faq-item"><summary>Como agendar avaliação na oficina?</summary><p>Entre em contato pelo WhatsApp (31) 99625-5116 para agendar atendimento com hora marcada em Belo Horizonte ou consultar envio e avaliação.</p></details>`;
  }

  return faqList
    .map((item) => {
      const q = escapeHtmlText(String(item.pergunta || "").trim());
      const a = escapeHtmlText(String(item.resposta || "").trim());
      if (!q || !a) return "";
      return `<details class="faq-item">\n            <summary>${q}</summary>\n            <p>${a}</p>\n          </details>`;
    })
    .filter(Boolean)
    .join("\n          ");
}

async function updateBlogIndex({ slug, titulo, resumoCard, categoria, dataFormatada }) {
  const indexHtml = await fs.readFile(BLOG_INDEX_PATH, "utf-8");
  const startMarker = "<!-- BLOG_POSTS_START -->";
  const endMarker = "<!-- BLOG_POSTS_END -->";

  const startIdx = indexHtml.indexOf(startMarker);
  const endIdx = indexHtml.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    throw new Error("Marcadores BLOG_POSTS_START / BLOG_POSTS_END não encontrados em /blog/index.html.");
  }

  const newCard = `
          <article class="card-blog">
            <div>
              <span class="card-blog-meta">${escapeHtmlText(categoria)} • ${escapeHtmlText(dataFormatada)}</span>
              <h2>${escapeHtmlText(titulo)}</h2>
              <p>${escapeHtmlText(resumoCard)}</p>
            </div>
            <a href="/blog/${slug}.html" class="card-blog-link">Ler artigo</a>
          </article>`;

  const existingSection = indexHtml.slice(startIdx + startMarker.length, endIdx);
  // Evita duplicar card do mesmo slug se reexecutado
  const filteredExisting = existingSection.replace(
    new RegExp(`\\s*<article class="card-blog">[\\s\\S]*?href="/blog/${slug}\\.html"[\\s\\S]*?</article>`, "g"),
    ""
  );

  const updatedHtml =
    indexHtml.slice(0, startIdx + startMarker.length) +
    newCard +
    filteredExisting +
    indexHtml.slice(endIdx);

  await fs.writeFile(BLOG_INDEX_PATH, updatedHtml, "utf-8");
}

async function updateSitemap(slug, isoDate) {
  const xml = await fs.readFile(SITEMAP_PATH, "utf-8");
  const locUrl = `${SITE_URL}/blog/${slug}.html`;

  if (xml.includes(`<loc>${locUrl}</loc>`)) {
    return;
  }

  const entry = `  <url>\n    <loc>${locUrl}</loc>\n    <lastmod>${isoDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;

  if (!xml.includes("</urlset>")) {
    throw new Error("Tag </urlset> não encontrada no sitemap.xml.");
  }

  const updatedXml = xml.replace("</urlset>", `${entry}</urlset>`);
  await fs.writeFile(SITEMAP_PATH, updatedXml, "utf-8");
}

async function main() {
  const pautasRaw = await fs.readFile(PAUTAS_PATH, "utf-8");
  const pautas = JSON.parse(pautasRaw);

  const idx = pautas.findIndex((item) => !item.concluido);
  if (idx === -1) {
    console.log("Todas as pautas em blog/pautas.json já foram concluídas.");
    return;
  }

  const pautaItem = pautas[idx];
  const { safeSlug, targetPath } = resolveSafeBlogFile(pautaItem.slug);

  const generated = await callGemini(pautaItem);
  const safeTitle = String(generated.titulo).trim().slice(0, 120);
  const safeDesc = String(generated.metaDescription || generated.resumoCard || safeTitle)
    .trim()
    .slice(0, 165);
  const safeResumo = String(generated.resumoCard || safeDesc).trim().slice(0, 220);
  const safeCategoria = String(pautaItem.categoria || "Lutheria").trim().slice(0, 60);
  const safeContentHtml = sanitizeArticleHtml(generated.conteudoHtml);
  const safeFaqList = Array.isArray(generated.faq) ? generated.faq.slice(0, 5) : [];

  const now = new Date();
  const dataFormatada = formatDatePtBr(now);
  const isoDate = formatIsoDate(now);

  const whatsappMsg = encodeURIComponent(
    `Olá Joseph, li o artigo "${safeTitle}" no blog e gostaria de falar sobre meu instrumento ou arco.`
  );

  const schemaJson = buildSchemaJson({
    slug: safeSlug,
    titulo: safeTitle,
    metaDescription: safeDesc,
    categoria: safeCategoria,
    isoDate,
    faqList: safeFaqList
  });

  const faqHtml = buildFaqHtml(safeFaqList);
  const template = await fs.readFile(TEMPLATE_PATH, "utf-8");

  const finalHtml = template
    .replaceAll("{{TITULO}}", escapeHtmlText(safeTitle))
    .replaceAll("{{DESCRICAO}}", escapeHtmlText(safeDesc))
    .replaceAll("{{SLUG}}", safeSlug)
    .replaceAll("{{CATEGORIA}}", escapeHtmlText(safeCategoria))
    .replaceAll("{{DATA_FORMATADA}}", escapeHtmlText(dataFormatada))
    .replaceAll("{{CONTEUDO_HTML}}", safeContentHtml)
    .replaceAll("{{FAQ_HTML}}", faqHtml)
    .replaceAll("{{SCHEMA_JSON}}", schemaJson)
    .replaceAll("{{WHATSAPP_MSG}}", whatsappMsg)
    .replaceAll("https://wa.me/5531996255116", `https://wa.me/${WHATSAPP_NUMBER}`);

  await fs.writeFile(targetPath, finalHtml, "utf-8");
  await updateBlogIndex({
    slug: safeSlug,
    titulo: safeTitle,
    resumoCard: safeResumo,
    categoria: safeCategoria,
    dataFormatada
  });
  await updateSitemap(safeSlug, isoDate);

  pautas[idx].concluido = true;
  pautas[idx].publicadoEm = isoDate;
  await fs.writeFile(PAUTAS_PATH, JSON.stringify(pautas, null, 2) + "\n", "utf-8");

  console.log(`Artigo gerado com sucesso: /blog/${safeSlug}.html`);
}

main().catch((err) => {
  console.error("Falha ao gerar post:", err);
  process.exit(1);
});
