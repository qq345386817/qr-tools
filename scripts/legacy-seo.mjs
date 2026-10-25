import { parse } from 'parse5';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { legacyDescriptions } from '../src/legacy-seo.mjs';
import { websitePrivacy } from '../src/website-privacy.mjs';

const attribute = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
function flatten(node) {
  return [node, ...(node.childNodes ?? []).flatMap(flatten)];
}

export async function updateLegacySeo(root, locales, pages, escape, { tokenVersion, baseVersion }) {
  for (const [code, locale] of Object.entries(locales)) for (const slug of ['help', 'support', 'privacy-policy']) {
    const file = resolve(root, `${locale.path}${slug}.html`);
    const html = await readFile(file, 'utf8');
    const nodes = flatten(parse(html, { sourceCodeLocationInfo: true }));
    const title = `${locale.ui[slug === 'privacy-policy' ? 'privacy' : slug]} | QR Tools`;
    const description = legacyDescriptions[code][slug];
    const changes = [];
    const replacements = [
      [nodes.find((node) => node.tagName === 'title'), `<title>${escape(title)}</title>`],
      [nodes.find((node) => node.tagName === 'meta' && attribute(node, 'name') === 'description'), `<meta name="description" content="${escape(description)}">`],
      [nodes.find((node) => node.tagName === 'meta' && attribute(node, 'property') === 'og:title'), `<meta property="og:title" content="${escape(title)}">`],
      [nodes.find((node) => node.tagName === 'meta' && attribute(node, 'property') === 'og:description'), `<meta property="og:description" content="${escape(description)}">`],
    ];
    for (const [node, value] of replacements) {
      if (!node?.sourceCodeLocation) throw new Error(`Missing metadata in ${file}`);
      changes.push({ start: node.sourceCodeLocation.startOffset, end: node.sourceCodeLocation.endOffset, value });
    }
    const existing = nodes.find((node) => attribute(node, 'id') === 'online-tools');
    const links = pages.map((page) => `<li><a href="/${locale.path}${page.slug}">${escape(page.titleKey ? locale.ui[page.titleKey] : locale.title)}</a></li>`).join('');
    let value = `<section id="online-tools"><h2>${escape(locale.ui.guides)}</h2><p>${escape(locale.ui.localPrivacy)}</p><ul>${links}</ul></section>`;
    if (slug === 'privacy-policy') {
      const [heading, analytics, local, updated] = websitePrivacy[code];
      const disclosure = `<section id="website-analytics"><h2>${escape(heading)}</h2><p>${escape(analytics)}</p><p>${escape(local)}</p><p><a href="https://developers.cloudflare.com/speed/observatory/rum-beacon/">Cloudflare Web Analytics</a></p><p class="small">${escape(updated)}</p></section>`;
      const oldClaim = nodes.find((node) => node.tagName === 'p' && node.childNodes?.some((child) => child.value === 'QR Tools does not use Google Analytics or similar analytics services.'));
      const oldDisclosure = nodes.find((node) => attribute(node, 'id') === 'website-analytics') || oldClaim?.parentNode;
      const location = oldDisclosure?.sourceCodeLocation;
      const position = existing?.sourceCodeLocation?.startOffset;
      if (location) changes.push({ start: location.startOffset, end: location.endOffset, value: disclosure });
      else if (position !== undefined) value = `${disclosure}\n        ${value}`;
      else throw new Error(`Missing website privacy insertion point in ${file}`);
    }
    if (existing) {
      changes.push({ start: existing.sourceCodeLocation.startOffset, end: existing.sourceCodeLocation.endOffset, value });
    } else {
      const install = nodes.find((node) => node.tagName === 'section' && attribute(node, 'class')?.split(' ').includes('install-panel'));
      const article = nodes.find((node) => node.tagName === 'main');
      const position = install?.sourceCodeLocation?.startOffset ?? article?.sourceCodeLocation?.endTag?.startOffset;
      if (position === undefined) throw new Error(`Missing tool link insertion point in ${file}`);
      changes.push({ start: position, end: position, value: `${value}\n        ` });
    }
    // Use parser offsets to preserve the existing copy, markup and email_off comments.
    let updated = html;
    for (const change of changes.sort((a, b) => b.start - a.start)) {
      updated = updated.slice(0, change.start) + change.value + updated.slice(change.end);
    }
    if (updated !== html) await writeFile(file, updated);
  }
  // Include historical guides and English aliases without rewriting their content.
  for (const folder of new Set(['', 'en-US/', ...Object.values(locales).map((locale) => locale.path)])) {
    for (const filename of (await readdir(resolve(root, folder))).filter((name) => name.endsWith('.html'))) {
      const file = resolve(root, folder, filename);
      let html = await readFile(file, 'utf8');
      const nodes = flatten(parse(html, { sourceCodeLocationInfo: true }));
      const stylesheet = nodes.find((node) => node.tagName === 'link' && attribute(node, 'href')?.includes('style/base.css'));
      if (!stylesheet) continue;
      const prefix = folder ? '../' : '';
      const oldTokens = nodes.find((node) => node.tagName === 'link' && attribute(node, 'href')?.includes('style/tokens.css'));
      const tokenLink = `<link rel="stylesheet" href="${prefix}style/tokens.css?v=${tokenVersion}">`;
      const replacements = [
        { ...stylesheet.sourceCodeLocation, value: `<link rel="stylesheet" href="${prefix}style/base.css?v=${baseVersion}">` },
        oldTokens ? { ...oldTokens.sourceCodeLocation, value: tokenLink } : { startOffset: stylesheet.sourceCodeLocation.endOffset, endOffset: stylesheet.sourceCodeLocation.endOffset, value: `\n  ${tokenLink}` }
      ];
      for (const change of replacements.sort((a, b) => b.startOffset - a.startOffset)) html = html.slice(0, change.startOffset) + change.value + html.slice(change.endOffset);
      await writeFile(file, html);
    }
  }
}
