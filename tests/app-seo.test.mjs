import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parse } from 'parse5';
import { locales } from '../src/locales.mjs';
import { appLocales } from '../src/app-locales.mjs';
import { sitemapURLs } from '../scripts/submit-indexnow.mjs';

function find(node, predicate) {
  return [node, ...(node.childNodes ?? []).flatMap((child) => find(child, predicate))].filter(predicate);
}
const attr = (node, key) => node?.attrs?.find((item) => item.name === key)?.value;
const text = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');

test('native App pages, visible copy and agent documents agree in every language', async () => {
  const sitemap = sitemapURLs(await readFile('sitemap.xml', 'utf8'), 'qrtools.luopeike.com');
  const headers = await readFile('_headers', 'utf8');
  for (const [code, locale] of Object.entries(locales)) {
    const app = appLocales[code], file = `${locale.path}qr-tools-app`;
    const canonical = `https://qrtools.luopeike.com/${file}`;
    const source = await readFile(`${file}.html`, 'utf8'), html = parse(source);
    const markdown = await readFile(`${file}.md`, 'utf8');
    assert.equal(text(find(html, (node) => node.tagName === 'h1')[0]), app.name);
    assert.ok(sitemap.includes(canonical));
    assert.ok(headers.includes(`/${file}.md\n  Content-Type: text/markdown`));
    assert.equal(attr(find(html, (node) => node.tagName === 'link' && attr(node, 'rel') === 'canonical')[0], 'href'), canonical);
    for (const copy of [app.name, app.subtitle, app.description, app.compare, ...app.safariSteps, ...app.features.flat(), ...app.questions.flat()]) {
      assert.ok(text(html).includes(copy), `${code}: visible content`);
      assert.ok(markdown.includes(copy), `${code}: agent content`);
    }
    const schema = JSON.parse(text(find(html, (node) => node.tagName === 'script')[0]))['@graph'];
    const entity = schema.find((item) => item['@type'] === 'SoftwareApplication');
    assert.equal(entity.name, app.name);
    assert.equal(entity.installUrl, 'https://apps.apple.com/app/id6526476285');
    assert.equal(entity.aggregateRating, undefined);
    assert.equal(entity.operatingSystem, 'iOS, iPadOS, macOS');
    assert.equal(entity.featureList.length, 6);
    const screenshot = attr(find(html, (node) => attr(node, 'class') === 'app-screenshot')[0], 'src');
    assert.ok((await readFile(`.${screenshot}`)).length > 1000, `${code}: real App screenshot`);
    assert.ok((await readFile(`${locale.path}index.html`, 'utf8')).includes(`href="/${file}"`));
    assert.ok((await readFile('llms.txt', 'utf8')).includes(`${canonical}.md`));
  }
});

test('IndexNow is limited to this website and its canonical HTML sitemap', async () => {
  const config = JSON.parse(await readFile('indexnow.json', 'utf8'));
  assert.equal(config.host, 'qrtools.luopeike.com');
  assert.equal((await readFile(`${config.key}.txt`, 'utf8')).trim(), config.key);
  assert.equal(config.keyLocation, `https://${config.host}/${config.key}.txt`);
  for (const bad of ['https://example.com/', 'http://qrtools.luopeike.com/', 'https://qrtools.luopeike.com/index.md', 'https://qrtools.luopeike.com/?a=1']) assert.throws(() => sitemapURLs(`<urlset><url><loc>${bad}</loc></url></urlset>`, config.host));
  assert.throws(() => sitemapURLs('<urlset/>', config.host));
  assert.deepEqual(sitemapURLs('<urlset><url><loc>https://qrtools.luopeike.com/</loc></url></urlset>', config.host), ['https://qrtools.luopeike.com/']);
});
