import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { parse } from 'parse5';
import { locales, pages } from '../src/locales.mjs';
import { legacyDescriptions } from '../src/legacy-seo.mjs';

function nodes(document, predicate) {
  const results = [];
  function walk(node) {
    if (predicate(node)) results.push(node);
    for (const child of node.childNodes ?? []) walk(child);
  }
  walk(document);
  return results;
}
const attribute = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const text = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');

test('each localized tool has canonical HTML, matching agent content and valid linked entities', async () => {
  const sitemap = await readFile('sitemap.xml', 'utf8');
  const headers = await readFile('_headers', 'utf8');
  for (const [language, locale] of Object.entries(locales)) for (const page of pages) {
    const filename = `${locale.path}${page.slug || 'index'}`;
    const html = parse(await readFile(`${filename}.html`, 'utf8'));
    const canonical = `https://qrtools.luopeike.com/${locale.path}${page.slug}`;
    const linkNodes = nodes(html, (node) => node.tagName === 'link');
    assert.equal(attribute(linkNodes.find((node) => attribute(node, 'rel') === 'canonical'), 'href'), canonical);
    assert.equal(attribute(nodes(html, (node) => node.tagName === 'html')[0], 'lang'), language);
    const markdownUrl = attribute(linkNodes.find((node) => attribute(node, 'type') === 'text/markdown'), 'href');
    assert.equal(markdownUrl, `https://qrtools.luopeike.com/${filename}.md`);
    assert.ok(headers.includes(`/${filename}.md\n  Content-Type: text/markdown; charset=utf-8\n  X-Robots-Tag: noindex, follow`));
    assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
    assert.ok(!sitemap.includes(markdownUrl));
    const markdown = await readFile(`${filename}.md`, 'utf8');
    const questions = nodes(html, (node) => node.tagName === 'section' && attribute(node, 'class') === 'qr-questions')[0];
    const summaries = nodes(questions, (node) => node.tagName === 'summary').map(text);
    const answers = nodes(questions, (node) => node.tagName === 'details').flatMap((node) => nodes(node, (child) => child.tagName === 'p')).map(text);
    assert.ok(summaries.length >= 3, `${filename} has useful visible questions`);
    for (const value of [...summaries, ...answers]) assert.ok(markdown.includes(value), `${filename}: agent and visible content agree`);
    const graph = JSON.parse(text(nodes(html, (node) => node.tagName === 'script' && attribute(node, 'type') === 'application/ld+json')[0]))['@graph'];
    const webPage = graph.find((entity) => entity['@type'] === 'WebPage');
    const app = graph.find((entity) => entity['@type'] === 'WebApplication');
    const site = graph.find((entity) => entity['@type'] === 'WebSite');
    assert.equal(webPage.url, canonical);
    assert.equal(webPage.mainEntity['@id'], app['@id']);
    assert.equal(webPage.isPartOf['@id'], site['@id']);
    assert.equal(app.inLanguage, language);
    assert.equal(app.aggregateRating, undefined, 'no fabricated ratings');
    const description = attribute(nodes(html, (node) => node.tagName === 'meta' && attribute(node, 'name') === 'description')[0], 'content');
    assert.equal(description, webPage.description);
    const alternates = linkNodes.filter((node) => attribute(node, 'hreflang'));
    for (const [otherLanguage, otherLocale] of Object.entries(locales)) {
      assert.equal(attribute(alternates.find((node) => attribute(node, 'hreflang') === otherLanguage), 'href'), `https://qrtools.luopeike.com/${otherLocale.path}${page.slug}`);
      assert.ok(nodes(html, (node) => node.tagName === 'a' && attribute(node, 'href') === `/${otherLocale.path}${page.slug}`).length, 'languages are reachable through normal links');
    }
  }
});

test('llms overview references real published resources and states static-code limitations', async () => {
  const llms = await readFile('llms.txt', 'utf8');
  assert.ok(llms.startsWith('# QR Tools\n'));
  assert.ok(llms.includes('Codes are static:'));
  for (const match of llms.matchAll(/\]\(https:\/\/qrtools\.luopeike\.com\/([^)]*)\)/g)) {
    const path = match[1];
    const source = path.endsWith('.md') ? path : `${path || 'index'}.html`;
    assert.ok((await readFile(source, 'utf8')).length > 0, source);
  }
});

test('legacy help, support and privacy keep canonical URLs, email protection and tool links', async () => {
  for (const [language, locale] of Object.entries(locales)) for (const slug of ['help', 'support', 'privacy-policy']) {
    const filename = `${locale.path}${slug}.html`;
    const source = await readFile(filename, 'utf8');
    const html = parse(source);
    assert.equal(attribute(nodes(html, (node) => node.tagName === 'link' && attribute(node, 'rel') === 'canonical')[0], 'href'), `https://qrtools.luopeike.com/${locale.path}${slug}`);
    assert.equal(attribute(nodes(html, (node) => node.tagName === 'meta' && attribute(node, 'name') === 'description')[0], 'content'), legacyDescriptions[language][slug]);
    assert.ok(text(nodes(html, (node) => node.tagName === 'title')[0]).includes('QR Tools'));
    for (const page of pages) assert.ok(nodes(html, (node) => node.tagName === 'a' && attribute(node, 'href') === `/${locale.path}${page.slug}`).length);
    if (slug !== 'help') assert.ok(source.includes('<!--email_off-->'));
  }
});

test('localized error pages are not indexable and recover correctly from nested URLs', async () => {
  const sitemap = await readFile('sitemap.xml', 'utf8');
  for (const locale of Object.values(locales)) {
    const filename = `${locale.path}404.html`;
    const html = parse(await readFile(filename, 'utf8'));
    assert.equal(attribute(nodes(html, (node) => node.tagName === 'meta' && attribute(node, 'name') === 'robots')[0], 'content'), 'noindex,follow');
    for (const node of nodes(html, (node) => node.tagName === 'a' || node.tagName === 'img' || node.tagName === 'link')) {
      const path = attribute(node, 'href') || attribute(node, 'src');
      assert.ok(path.startsWith('/'), `absolute recovery path in ${filename}`);
    }
    assert.ok(!sitemap.includes('404'));
  }
});

test('tool pages identify the exact deployed CSS and JS content to avoid stale browser caches', async () => {
  const fingerprint = async (path) => createHash('sha256').update(await readFile(path)).digest('hex').slice(0, 12);
  const css = await fingerprint('style/tool.css');
  const js = await fingerprint('script/tool.js');
  for (const locale of Object.values(locales)) for (const page of pages) {
    const html = parse(await readFile(`${locale.path}${page.slug || 'index'}.html`, 'utf8'));
    const stylesheet = attribute(nodes(html, (node) => node.tagName === 'link' && attribute(node, 'rel') === 'stylesheet')[0], 'href');
    const script = attribute(nodes(html, (node) => node.tagName === 'script' && attribute(node, 'type') === 'module')[0], 'src');
    assert.ok(stylesheet.endsWith(`style/tool.css?v=${css}`));
    assert.ok(script.endsWith(`script/tool.js?v=${js}`));
  }
});
