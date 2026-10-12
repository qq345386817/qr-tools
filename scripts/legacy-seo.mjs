import { parse } from 'parse5';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { legacyDescriptions } from '../src/legacy-seo.mjs';

const attribute = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
function flatten(node) {
  return [node, ...(node.childNodes ?? []).flatMap(flatten)];
}

export async function updateLegacySeo(root, locales, pages, escape) {
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
    const value = `<section id="online-tools"><h2>${escape(locale.ui.guides)}</h2><p>${escape(locale.ui.localPrivacy)}</p><ul>${links}</ul></section>`;
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
}
