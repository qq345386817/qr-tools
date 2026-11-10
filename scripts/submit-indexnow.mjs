import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse } from 'parse5';

const root = resolve(import.meta.dirname, '..');

export function sitemapURLs(xml, host) {
  const urls = [];
  function walk(node) {
    if (node.tagName === 'loc') {
      const value = node.childNodes.map((child) => child.value ?? '').join('').trim();
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.host !== host || url.username || url.password || url.search || url.hash || /\.(?:md|txt)$/.test(url.pathname)) throw new Error(`Unexpected sitemap URL: ${value}`);
      urls.push(url.href);
    }
    for (const child of node.childNodes ?? []) walk(child);
  }
  walk(parse(xml));
  if (!urls.length || urls.length > 10_000) throw new Error('IndexNow requires 1 to 10000 canonical URLs.');
  return [...new Set(urls)];
}

async function checkedFetch(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000), redirect: 'error' });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response.text();
}

async function main() {
  const config = JSON.parse(await readFile(resolve(root, 'indexnow.json'), 'utf8'));
  if (config.host !== 'qrtools.luopeike.com' || !/^[a-f0-9]{32}$/.test(config.key) || config.keyLocation !== `https://${config.host}/${config.key}.txt`) throw new Error('Invalid QR Tools IndexNow configuration.');
  const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
  const payload = { ...config, urlList: sitemapURLs(sitemap, config.host) };
  if (!process.argv.includes('--submit')) {
    console.log(JSON.stringify({ mode: 'dry-run', endpoint: 'https://api.indexnow.org/indexnow', host: config.host, urls: payload.urlList.length }, null, 2));
    return;
  }
  const liveKey = await checkedFetch(config.keyLocation);
  if (liveKey.trim() !== config.key) throw new Error('The live ownership key does not match. Deploy first.');
  const liveSitemap = await checkedFetch(`https://${config.host}/sitemap.xml`);
  if (JSON.stringify(sitemapURLs(liveSitemap, config.host).sort()) !== JSON.stringify([...payload.urlList].sort())) throw new Error('The live sitemap differs from the local sitemap. Deploy first.');
  const response = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(30_000) });
  if (![200, 202].includes(response.status)) throw new Error(`IndexNow HTTP ${response.status}: ${await response.text()}`);
  console.log(JSON.stringify({ host: config.host, submittedURLs: payload.urlList.length, status: response.status, result: response.status === 200 ? 'accepted' : 'accepted; ownership verification pending', indexing: 'not confirmed' }, null, 2));
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) await main();
