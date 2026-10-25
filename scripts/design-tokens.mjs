import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

export async function buildDesignTokens(root) {
  const tokens = JSON.parse(await readFile(resolve(root, 'src/design-tokens.json'), 'utf8'));
  const colors = (theme) => tokens.color.tokens.map((token) => `  --${token.name}: ${token.value[theme]};`).join('\n');
  const values = ['spacing', 'radius'].flatMap((family) => tokens[family].tokens.map((token) => `  --${token.name}: ${token.value};`));
  const fonts = Object.entries(tokens.type.families).map(([name, value]) => `  --font-${name}: ${value};`);
  const typography = tokens.type.groups.flatMap((group) => group.styles.flatMap((style) => [
    `  --${style.name}-size: ${style.fontSize};`, `  --${style.name}-leading: ${style.lineHeight};`, `  --${style.name}-weight: ${style.fontWeight};`
  ]));
  const css = `/* Generated from src/design-tokens.json. */\n:root {\n  color-scheme: light;\n${colors('light')}\n${[...values, ...fonts, ...typography].join('\n')}\n}\n@media (prefers-color-scheme: dark) {\n  :root {\n    color-scheme: dark;\n${colors('dark')}\n  }\n}\n`;
  await writeFile(resolve(root, 'style/tokens.css'), css);
  // Cached older HTML must also receive tokens when it fetches the new stylesheet.
  const tokenVersion = createHash('sha256').update(css).digest('hex').slice(0, 12);
  const marker = '/* QR Tools token import (generated). */';
  for (const filename of ['style/tool.css', 'style/base.css']) {
    const file = resolve(root, filename);
    const original = await readFile(file, 'utf8');
    const lines = original.split('\n');
    if (lines[0] === marker) lines.splice(0, 2);
    const updated = `${marker}\n@import url("tokens.css?v=${tokenVersion}");\n${lines.join('\n')}`;
    if (updated !== original) await writeFile(file, updated);
  }
}
