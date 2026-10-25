import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { locales, pages } from '../src/locales.mjs';
import { interfaceLocales } from '../src/interface-locales.mjs';
import { contrastRatio } from '../src/content.mjs';

const tokens = JSON.parse(await readFile('src/design-tokens.json', 'utf8'));

test('semantic design tokens have accessible text and focus pairs in both themes', () => {
  for (const { id } of tokens.color.themes) {
    const color = Object.fromEntries(tokens.color.tokens.map((entry) => [entry.name, entry.value[id]]));
    for (const [foreground, background, minimum] of [
      ['ink', 'paper', 4.5], ['ink', 'soft', 4.5], ['muted', 'paper', 4.5], ['muted', 'soft', 4.5],
      ['on-accent', 'accent', 4.5], ['accent', 'paper', 4.5], ['ink', 'accent-soft', 4.5],
      ['error', 'paper', 4.5], ['warm', 'paper', 4.5], ['focus', 'paper', 3], ['focus', 'soft', 3]
    ]) {
      // QR contrast is directional to reject inverted codes; UI text contrast is symmetric.
      const ratio = Math.max(contrastRatio(color[foreground], color[background]), contrastRatio(color[background], color[foreground]));
      assert.ok(ratio >= minimum, `${id}/${foreground}/${background}`);
    }
  }
});

test('new interface copy covers exactly the eight existing languages', () => {
  assert.deepEqual(Object.keys(interfaceLocales).sort(), Object.keys(locales).sort());
  const keys = ['content', 'preview', 'export', 'appTitle', 'appCopy'];
  for (const entry of Object.values(interfaceLocales)) {
    assert.deepEqual(Object.keys(entry).sort(), [...keys].sort());
    assert.ok(Object.values(entry).every((value) => typeof value === 'string' && value.trim()));
  }
});

test('all tool, legacy and alias pages load the generated fingerprinted tokens', async () => {
  const fingerprint = async (file) => createHash('sha256').update(await readFile(file)).digest('hex').slice(0, 12);
  const tokenVersion = await fingerprint('style/tokens.css');
  const baseVersion = await fingerprint('style/base.css');
  for (const file of ['style/tool.css', 'style/base.css']) assert.ok((await readFile(file, 'utf8')).includes(`@import url("tokens.css?v=${tokenVersion}")`), 'old HTML must also receive shared tokens');
  for (const folder of new Set(['', 'en-US/', ...Object.values(locales).map((locale) => locale.path)])) {
    for (const file of (await readdir(folder || '.')).filter((name) => name.endsWith('.html'))) {
      const html = await readFile(folder + file, 'utf8');
      if (html.includes('style/base.css') || html.includes('style/tool.css')) {
        assert.ok(html.includes(`style/tokens.css?v=${tokenVersion}`), folder + file);
        assert.equal((html.match(/style\/tokens\.css/g) ?? []).length, 1, folder + file);
      }
      if (html.includes('style/base.css')) assert.ok(html.includes(`style/base.css?v=${baseVersion}`), folder + file);
    }
  }
});

test('type selection and customization remain semantic controls on all tools', async () => {
  for (const locale of Object.values(locales)) for (const page of pages) {
    const html = await readFile(`${locale.path}${page.slug || 'index'}.html`, 'utf8');
    assert.ok(html.includes('<details class="customization">'));
    assert.ok(html.includes('id="field-url"'));
    assert.equal((html.match(/data-type=/g) ?? []).length, 6);
    assert.ok(html.includes('id="download-png"'));
    assert.ok(!html.includes('fonts.googleapis.com'));
  }
});
