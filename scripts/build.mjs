import { build } from 'esbuild';
import { readFile, writeFile, mkdir, readdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { locales, pages, types } from '../src/locales.mjs';
import { seo } from '../src/seo.mjs';
import { updateLegacySeo } from './legacy-seo.mjs';

const root = resolve(import.meta.dirname, '..');
const origin = 'https://qrtools.luopeike.com';
const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const icon = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;
const command = (id, name, text, className = '') => `<button id="${id}" class="${className}" type="button" title="${escape(text)}" aria-label="${escape(text)}">${icon(name)}${className.includes('icon-button') ? '' : `<span>${escape(text)}</span>`}</button>`;

function renderPage(code, locale, page) {
  const { ui, fields } = locale;
  const prefix = locale.path ? '../' : '';
  const url = `${origin}/${locale.path}${page.slug}`;
  const title = page.titleKey ? ui[page.titleKey] : locale.title;
  const content = seo[code][page.seoKey];
  const copy = page.copyKey ? ui[page.copyKey] : content.summary;
  const field = (name, type = 'text', options = {}) => {
    const label = `${escape(fields[name])}${options.required ? ' <span aria-hidden="true">*</span>' : ''}`;
    const attributes = `name="${name}" id="field-${options.id ?? name}" ${options.required ? 'required' : ''} ${options.value ? `value="${escape(options.value)}"` : ''} ${options.autocomplete ? `autocomplete="${options.autocomplete}"` : ''}`;
    const input = type === 'textarea' ? `<textarea ${attributes} rows="${options.rows ?? 4}" ${name === 'url' ? 'inputmode="url" spellcheck="false"' : ''}>${escape(options.value ?? '')}</textarea>` : `<input ${attributes} type="${type}" ${name === 'url' || name === 'website' ? 'inputmode="url"' : ''}>`;
    return `<label class="field ${options.wide ? 'wide' : ''}" for="field-${options.id ?? name}"><span>${label}</span>${input}</label>`;
  };
  const forms = {
    link: field('url', 'textarea', { value: origin + '/', required: true }) + command('clean-link', 'brush-cleaning', ui.clean, 'text-button'),
    text: field('text', 'textarea', { required: true, rows: 6 }),
    wifi: `<div class="field-grid">${field('ssid', 'text', { required: true, wide: true, autocomplete: 'off' })}${field('password', 'password', { autocomplete: 'off' })}<label class="field"><span>${escape(fields.encryption)}</span><select name="encryption" id="encryption"><option value="WPA">WPA / WPA2 / WPA3</option><option value="WEP">WEP</option><option value="nopass">${escape(ui.openNetwork)}</option></select></label></div><div class="checkbox-row"><label><input type="checkbox" id="show-password">${escape(ui.showPassword)}</label><label><input type="checkbox" name="hidden">${escape(fields.hidden)}</label></div>`,
    email: `<div class="field-grid">${field('email', 'email', { required: true, wide: true, autocomplete: 'email' })}${field('subject', 'text', { wide: true })}${field('body', 'textarea', { wide: true })}</div>`,
    sms: field('phone', 'tel', { required: true, autocomplete: 'tel' }) + field('message', 'textarea'),
    contact: `<div class="field-grid">${field('firstName', 'text', { required: true, autocomplete: 'given-name' })}${field('lastName', 'text', { autocomplete: 'family-name' })}${field('phone', 'tel', { id: 'contact-phone', autocomplete: 'tel' })}${field('email', 'email', { id: 'contact-email', autocomplete: 'email' })}${field('company', 'text', { autocomplete: 'organization' })}${field('website', 'url')}</div>`,
  };
  const staticGuideLinks = [
    ['current-safari-tab-qr-code', 'Current Safari tab to QR'], ['send-desktop-link-to-iphone', 'Send a desktop link to iPhone'],
    ['clean-tracking-links-before-sharing', 'Clean tracking links'], ['safari-extension-qr-code-generator', 'QR Tools in Safari'],
  ];
  const selected = page.type;
  const links = pages.filter((entry) => entry.slug && entry.slug !== page.slug).map((entry) => `<a href="${entry.slug}">${escape(ui[entry.titleKey])}${icon('arrow-up-right')}</a>`).join('');
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebSite', '@id': `${origin}/#website`, name: 'QR Tools', url: `${origin}/`, inLanguage: Object.keys(locales) },
    { '@type': 'WebPage', '@id': `${url}#page`, name: content.title, url, description: content.description, inLanguage: code, isPartOf: { '@id': `${origin}/#website` }, mainEntity: { '@id': `${url}#tool` } },
    { '@type': 'WebApplication', '@id': `${url}#tool`, name: `QR Tools: ${title}`, url, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', browserRequirements: 'Requires JavaScript', inLanguage: code, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: content.description },
  ] };
  const pageData = JSON.stringify({ code, ui, messages: locale.messages, defaultType: selected, defaultMode: page.mode }).replace(/</g, '\\u003c');
  return `<!DOCTYPE html>
<html lang="${code}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escape(content.title)} | QR Tools</title>
  <meta name="description" content="${escape(content.description)}">
  <meta name="robots" content="index,follow">
  <meta property="og:title" content="${escape(content.title)} | QR Tools">
  <meta property="og:description" content="${escape(content.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${origin}/images/social-preview.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${origin}/images/social-preview.png">
  <link rel="canonical" href="${url}">
  <link rel="alternate" type="text/markdown" href="${origin}/${locale.path}${page.slug || 'index'}.md">
  <link rel="describedby" type="text/plain" href="${origin}/llms.txt">
${Object.entries(locales).map(([language, entry]) => `  <link rel="alternate" hreflang="${language}" href="${origin}/${entry.path}${page.slug}">`).join('\n')}
  <link rel="alternate" hreflang="x-default" href="${origin}/${page.slug}">
  <link rel="apple-touch-icon" sizes="180x180" href="${prefix}favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="${prefix}favicon/favicon-32x32.png">
  <link rel="manifest" href="${prefix}favicon/site.webmanifest">
  <meta name="theme-color" content="#008f7c">
  <link rel="stylesheet" href="${prefix}style/tool.css">
  <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
  <script id="page-data" type="application/json">${pageData}</script>
  <script type="module" src="${prefix}script/tool.js"></script>
</head>
<body>
  <header class="site-header"><div class="container header-inner">
    <a class="brand" href="./"><img src="${prefix}favicon/apple-touch-icon.png" width="40" height="40" alt=""><span>QR Tools</span></a>
    <nav aria-label="QR Tools"><a href="help">${escape(ui.help)}</a><a class="store-link" href="https://apps.apple.com/app/id6526476285"><img src="${prefix}images/app-store-icon.svg" alt="" width="18" height="18">App Store</a>
    <label class="language-control"><span class="sr-only">${escape(ui.language)}</span>${icon('globe')}<select id="language" aria-label="${escape(ui.language)}">${Object.entries(locales).map(([language, entry]) => `<option value="/${entry.path}${page.slug}" ${language === code ? 'selected' : ''}>${entry.name}</option>`).join('')}</select></label></nav>
  </div></header>
  <main class="container">
    <div class="title-row"><h1>${escape(title)}</h1>${page.slug ? `<a class="home-link" href="./">${escape(locale.title)}${icon('arrow-up-right')}</a>` : ''}</div>
${copy ? `    <p class="page-summary">${escape(copy)}</p>` : ''}
    <div class="mode-switch" role="tablist" aria-label="QR Tools">
      <button id="mode-create" role="tab" aria-selected="${page.mode === 'create'}" aria-controls="create-panel" tabindex="${page.mode === 'create' ? '0' : '-1'}" type="button">${icon('qr-code')}${escape(ui.create)}</button>
      <button id="mode-read" role="tab" aria-selected="${page.mode === 'read'}" aria-controls="read-panel" tabindex="${page.mode === 'read' ? '0' : '-1'}" type="button">${icon('scan-line')}${escape(ui.read)}</button>
    </div>
    <section id="create-panel" role="tabpanel" aria-labelledby="mode-create" ${page.mode === 'read' ? 'hidden' : ''}>
      <div class="workspace">
        <div class="editor">
          <div class="content-tabs" role="tablist" aria-label="${escape(ui.create)}">${types.map((type, index) => `<button type="button" role="tab" id="tab-${type}" data-type="${type}" aria-selected="${type === selected}" aria-controls="form-${type}" tabindex="${type === selected ? '0' : '-1'}">${escape(locale.types[index])}</button>`).join('')}</div>
          ${types.map((type) => `<form id="form-${type}" data-form="${type}" role="tabpanel" aria-labelledby="tab-${type}" ${type !== selected ? 'hidden' : ''} autocomplete="off">${forms[type]}</form>`).join('\n')}
          <div class="customize-header"><h2>${escape(ui.customize)}</h2>${command('reset', 'rotate-ccw', ui.reset, 'icon-button')}</div>
          <div class="settings-grid">
            <label class="field"><span>${escape(ui.foreground)}</span><div class="color-control"><input id="foreground" type="color" value="#000000" aria-label="${escape(ui.foreground)}"><output id="foreground-value">#000000</output></div></label>
            <label class="field"><span>${escape(ui.background)}</span><div class="color-control"><input id="background" type="color" value="#ffffff" aria-label="${escape(ui.background)}"><output id="background-value">#FFFFFF</output></div></label>
            <label class="field"><span>${escape(ui.correction)}</span><select id="correction"><option value="H">${escape(ui.high)} (H)</option><option value="Q">Q (25%)</option><option value="M">${escape(ui.medium)} (M)</option><option value="L">${escape(ui.low)} (L)</option></select></label>
          </div>
        </div>
        <aside class="preview-panel" aria-label="QR Code">
          <div class="qr-stage"><canvas id="qr-preview" width="1024" height="1024" role="img" aria-label="QR Code"></canvas><p id="empty-preview" hidden>${escape(ui.empty)}</p></div>
          <label class="field size-control"><span>${escape(ui.size)}</span><select id="png-size"><option value="256">256 px</option><option value="512">512 px</option><option value="1024" selected>1024 px</option><option value="2048">2048 px</option></select></label>
          <div class="export-actions">${command('download-png', 'download', ui.png, 'primary-button export')}${command('copy-image', 'copy', ui.copy, 'icon-button export')}${command('share-image', 'share-2', ui.share, 'icon-button export')}</div>
          ${command('download-svg', 'download', ui.svg, 'text-button export')}
          <p id="generate-status" class="status" role="status" aria-live="polite"><span class="status-dot"></span><span id="generate-status-text">${escape(ui.ready)}</span></p>
        </aside>
      </div>
    </section>
    <section id="read-panel" role="tabpanel" aria-labelledby="mode-read" ${page.mode !== 'read' ? 'hidden' : ''}>
      <div class="reader-layout">
        <div class="reader-source"><div id="drop-zone" class="drop-zone">${icon('image-up')}<p>${escape(ui.dropImage)}</p><label class="primary-button file-picker">${icon('upload')}<span>${escape(ui.chooseImage)}</span><input id="qr-file" type="file" accept="image/png,image/jpeg,image/gif,image/webp,image/bmp"></label></div>
          <div class="camera-actions">${command('start-camera', 'camera', ui.camera, 'secondary-button')}${command('stop-camera', 'camera-off', ui.stopCamera, 'secondary-button')}</div>
          <video id="camera-video" playsinline muted hidden></video><p id="reader-status" class="status" role="status" aria-live="polite"></p>
        </div>
        <div class="reader-result"><label class="field"><span>${escape(ui.result)}</span><textarea id="decoded-content" readonly rows="8" spellcheck="false"></textarea></label>
          <div class="result-actions">${command('copy-content', 'copy', ui.copyContent, 'secondary-button')}<a id="open-link" class="secondary-button" href="#" target="_blank" rel="noopener noreferrer" hidden>${icon('external-link')}${escape(ui.openLink)}</a>${command('use-content', 'qr-code', ui.useContent, 'secondary-button')}</div>
        </div>
      </div>
    </section>
    <p class="privacy-note">${icon('shield-check')}${escape(ui.localPrivacy)}</p>
    <section class="app-band"><img src="${prefix}favicon/apple-touch-icon.png" width="48" height="48" alt="QR Tools"><div><h2>${escape(ui.appTitle)}</h2><p>${escape(ui.appCopy)}</p></div><a class="secondary-button" href="https://apps.apple.com/app/id6526476285"><img src="${prefix}images/app-store-icon.svg" width="20" height="20" alt="">App Store</a></section>
    <section class="qr-questions" aria-labelledby="questions-heading"><h2 id="questions-heading">${escape(seo[code].faqHeading)}</h2>${content.questions.map(([question, answer]) => `<details><summary>${escape(question)}</summary><p>${escape(answer)}</p></details>`).join('')}</section>
    <section class="tool-links"><h2>${escape(ui.guides)}</h2><div>${links}<a href="https://chromewebstore.google.com/detail/qr-tools-customizable/pmilkclbidnbagfonjnbdnegneifogpl">${escape(ui.chrome)}${icon('arrow-up-right')}</a>${code === 'en' ? staticGuideLinks.map(([slug, text]) => `<a href="${slug}">${escape(text)}${icon('arrow-up-right')}</a>`).join('') : ''}</div></section>
    <noscript><p>${escape(ui.notSupported)}</p><a href="https://apps.apple.com/app/id6526476285">App Store</a></noscript>
  </main>
  <footer class="container site-footer"><div class="footer-links"><a href="help">${escape(ui.help)}</a><a href="support">${escape(ui.support)}</a><a href="privacy-policy">${escape(ui.privacy)}</a><span>QR Tools</span></div><nav class="locale-links" aria-label="${escape(ui.language)}">${Object.entries(locales).map(([language, entry]) => `<a href="/${entry.path}${page.slug}" hreflang="${language}" ${language === code ? 'aria-current="page"' : ''}>${entry.name}</a>`).join('')}</nav></footer>
</body>
</html>
`;
}

for (const [code, locale] of Object.entries(locales)) {
  for (const page of pages) {
    const filename = `${locale.path}${page.slug || 'index'}.html`;
    await mkdir(resolve(root, locale.path), { recursive: true });
    await writeFile(resolve(root, filename), renderPage(code, locale, page));
    const content = seo[code][page.seoKey];
    const canonical = `${origin}/${locale.path}${page.slug}`;
    const related = pages.filter((entry) => entry.slug && entry.slug !== page.slug).map((entry) => `- [${locale.ui[entry.titleKey]}](${origin}/${locale.path}${entry.slug}.md)`).join('\n');
    const markdown = `# ${content.title}\n\n${content.description}\n\n[${page.titleKey ? locale.ui[page.titleKey] : locale.title}](${canonical})\n\n${content.questions.map(([question, answer]) => `## ${question}\n\n${answer}`).join('\n\n')}\n\n## ${locale.ui.guides}\n\n${related}\n\n---\n\nQR Tools: ${origin}/\nCanonical page: ${canonical}\nLanguage: ${code}\n`;
    await writeFile(resolve(root, `${locale.path}${page.slug || 'index'}.md`), markdown);
  }
}

await updateLegacySeo(root, locales, pages, escape);

const markdownPaths = Object.values(locales).flatMap((locale) => pages.map((page) => `/${locale.path}${page.slug || 'index'}.md`));
await writeFile(resolve(root, '_headers'), markdownPaths.map((path) => `${path}\n  Content-Type: text/markdown; charset=utf-8\n  X-Robots-Tag: noindex, follow\n`).join('\n'));
const llms = `# QR Tools

> Free browser tools for static QR code generation and local QR image reading. Optional Safari and Chrome extensions provide current-tab QR codes.

The website generates QR codes for URLs, text, Wi-Fi credentials, email, SMS and vCard 3.0 contacts. Users can change colors and error correction, export PNG or SVG, and read images or use a permitted camera. QR content, passwords and images are processed in the browser, without server upload, website accounts or saved history.

Codes are static: encoded content does not update after distribution. This is not a hosted dynamic QR redirect or editable digital-profile service. Wi-Fi passwords and contact details can be read by anyone with the QR image. The website cannot inspect other browser tabs; that is an extension feature.

## Tools

${pages.map((page) => `- [${seo.en[page.seoKey].title}](${origin}/${page.slug || 'index'}.md): ${seo.en[page.seoKey].description}`).join('\n')}

## Languages

${Object.entries(locales).filter(([code]) => code !== 'en').map(([, locale]) => `- [${locale.name}](${origin}/${locale.path}index.md): Localized tool information and links to its canonical HTML page.`).join('\n')}

## Support and Privacy

- [Help](${origin}/help): Safari extension setup and QR workflows.
- [Support](${origin}/support): Contact and support links.
- [Privacy policy](${origin}/privacy-policy): Local processing and data handling.

## Optional

- [QR Tools on the App Store](https://apps.apple.com/app/id6526476285): The iPhone, iPad and Mac app with the Safari extension.
- [QR Tools on the Chrome Web Store](https://chromewebstore.google.com/detail/qr-tools-customizable/pmilkclbidnbagfonjnbdnegneifogpl): The desktop Chrome extension.
`;
await writeFile(resolve(root, 'llms.txt'), llms);

// Preserve the existing canonical guide/help/privacy entries while adding real tool pages.
const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
const urls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
for (const locale of Object.values(locales)) for (const page of pages) urls.add(`${origin}/${locale.path}${page.slug}`);
await writeFile(resolve(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urls].map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`);

const bundle = await build({ entryPoints: { tool: resolve(root, 'src/tool.mjs') }, outdir: resolve(root, 'script'), bundle: true, splitting: true, format: 'esm', platform: 'browser', target: ['safari15', 'chrome100'], minify: true, legalComments: 'linked', entryNames: '[name]', chunkNames: '[name]-[hash]', metafile: true });
const currentOutputs = new Set(Object.keys(bundle.metafile.outputs).map((file) => resolve(file)));
for (const file of await readdir(resolve(root, 'script'))) {
  if (/^(?:reader|chunk)-[A-Z0-9]+\.js$/.test(file) && !currentOutputs.has(resolve(root, 'script', file))) {
    await rm(resolve(root, 'script', file));
  }
}
const notices = [];
for (const [dependency, filename] of [['qrcode', 'license'], ['dijkstrajs', 'LICENSE.md'], ['jsqr', 'LICENSE'], ['lucide', 'LICENSE']]) {
  notices.push(`${dependency}\n${await readFile(resolve(root, 'node_modules', dependency, filename), 'utf8')}`);
}
await writeFile(resolve(root, 'script/THIRD_PARTY_LICENSES.txt'), notices.join('\n\n'));
console.log(`Built ${Object.keys(locales).length * pages.length} localized tools; ${urls.size} sitemap URLs.`);
