import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { appLocales } from '../src/app-locales.mjs';

export const appSlug = 'qr-tools-app';
export const appStoreURL = 'https://apps.apple.com/app/id6526476285';

export async function buildAppPages(root, locales, escape, versions) {
  const origin = 'https://qrtools.luopeike.com';
  for (const [code, locale] of Object.entries(locales)) {
    const app = appLocales[code];
    const canonical = `${origin}/${locale.path}${appSlug}`;
    const markdownURL = `${canonical}.md`;
    const screenshot = `/images/app/${code}.png`;
    const graph = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebSite', '@id': `${origin}/#website`, name: 'QR Tools', url: `${origin}/` },
      { '@type': 'WebPage', '@id': `${canonical}#page`, url: canonical, name: app.name, description: app.description, inLanguage: code, isPartOf: { '@id': `${origin}/#website` }, mainEntity: { '@id': `${canonical}#app` } },
      { '@type': 'SoftwareApplication', '@id': `${canonical}#app`, name: app.name, description: app.description, url: canonical, downloadUrl: appStoreURL, installUrl: appStoreURL, operatingSystem: 'iOS, iPadOS, macOS', applicationCategory: 'UtilitiesApplication', inLanguage: code, image: `${origin}${screenshot}`, featureList: app.features.map(([heading, copy]) => `${heading}: ${copy}`) }
    ] };
    const languages = Object.entries(locales).map(([language, item]) => `<a href="/${item.path}${appSlug}" hreflang="${language}" ${language === code ? 'aria-current="page"' : ''}>${escape(item.name)}</a>`).join('');
    const html = `<!DOCTYPE html>
<html lang="${code}"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escape(app.name)} | iPhone, iPad &amp; Mac</title>
<meta name="description" content="${escape(app.description)}"><meta name="robots" content="index,follow">
<link rel="canonical" href="${canonical}"><link rel="alternate" type="text/markdown" href="${markdownURL}"><link rel="describedby" type="text/plain" href="${origin}/llms.txt">
${Object.entries(locales).map(([language, item]) => `<link rel="alternate" hreflang="${language}" href="${origin}/${item.path}${appSlug}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${origin}/${appSlug}">
<meta property="og:title" content="${escape(app.name)}"><meta property="og:description" content="${escape(app.description)}"><meta property="og:url" content="${canonical}"><meta property="og:type" content="website"><meta property="og:image" content="${origin}/images/social-preview.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${origin}/images/social-preview.png">
<link rel="icon" href="/favicon/favicon-32x32.png"><link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png">
<link rel="stylesheet" href="/style/tool.css?v=${versions.stylesheetVersion}"><link rel="stylesheet" href="/style/tokens.css?v=${versions.tokenVersion}">
<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>
</head><body>
<header class="site-header"><div class="container header-inner"><a class="brand" href="/${locale.path}"><img src="/favicon/apple-touch-icon.png" width="40" height="40" alt=""><span>QR Tools</span></a><nav aria-label="QR Tools"><a href="/${locale.path}">${escape(locale.ui.create)}</a><a href="/${locale.path}help">${escape(locale.ui.help)}</a></nav></div></header>
<main class="container app-page">
<section class="app-intro"><div class="app-pitch"><p class="format-label">iPhone · iPad · Mac</p><h1>${escape(app.name)}</h1><p class="app-subtitle">${escape(app.subtitle)}</p><p>${escape(app.description)}</p><a class="primary-button" href="${appStoreURL}"><img src="/images/app-store-icon.svg" width="20" height="20" alt="">${escape(app.download)}</a></div>
<img class="app-screenshot" src="${screenshot}" width="660" height="1434" alt="${escape(app.imageAlt)}" fetchpriority="high">
<div class="app-safari"><h2>${escape(app.safariTitle)}</h2><ol>${app.safariSteps.map((step) => `<li>${escape(step)}</li>`).join('')}</ol></div></section>
<section class="app-features"><h2>${escape(app.featuresTitle)}</h2><div>${app.features.map(([heading, copy]) => `<article><h3>${escape(heading)}</h3><p>${escape(copy)}</p></article>`).join('')}</div></section>
<section class="app-comparison"><h2>${escape(app.compareTitle)}</h2><p>${escape(app.compare)}</p><div class="result-actions"><a class="secondary-button" href="/${locale.path}">${escape(locale.title)}</a><a class="secondary-button" href="/${locale.path}qr-code-reader">${escape(locale.ui.readerTitle)}</a><a class="secondary-button" href="/${locale.path}bulk-qr-code-generator">${escape(locale.ui.batchTitle)}</a></div></section>
<section class="qr-questions"><h2>${escape(app.faqHeading)}</h2>${app.questions.map(([question, answer]) => `<details><summary>${escape(question)}</summary><p>${escape(answer)}</p></details>`).join('')}</section>
</main><footer class="container site-footer"><div class="footer-links"><a href="/${locale.path}help">${escape(locale.ui.help)}</a><a href="/${locale.path}support">${escape(locale.ui.support)}</a><a href="/${locale.path}privacy-policy">${escape(locale.ui.privacy)}</a><a href="${appStoreURL}">App Store</a></div><nav class="locale-links" aria-label="${escape(locale.ui.language)}">${languages}</nav></footer>
</body></html>\n`;
    await writeFile(resolve(root, `${locale.path}${appSlug}.html`), html);
    const markdown = `# ${app.name}\n\n${app.subtitle}\n\n${app.description}\n\n[${app.download}](${appStoreURL})\n\n## ${app.safariTitle}\n\n${app.safariSteps.map((step, index) => `${index + 1}. ${step}`).join('\n')}\n\n## ${app.featuresTitle}\n\n${app.features.map(([heading, copy]) => `### ${heading}\n\n${copy}`).join('\n\n')}\n\n## ${app.compareTitle}\n\n${app.compare}\n\n${app.questions.map(([question, answer]) => `## ${question}\n\n${answer}`).join('\n\n')}\n\nCanonical page: ${canonical}\nLanguage: ${code}\n`;
    await writeFile(resolve(root, `${locale.path}${appSlug}.md`), markdown);
  }
}
