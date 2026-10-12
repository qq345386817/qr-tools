import { build } from 'esbuild';
import { mkdir, writeFile, readFile, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { locales } from '../src/locales.mjs';
import { nativeLabels } from '../src/native-locales.mjs';

const app = resolve(import.meta.dirname, '../../Shared (App)');
const file = resolve(app, 'Localizable.xcstrings');
const catalog = JSON.parse(await readFile(file, 'utf8'));
const output = resolve(app, 'Resources/NativeCore');
await mkdir(output, { recursive: true });
await build({ entryPoints: [resolve(import.meta.dirname, '../src/native-engine.mjs')], outfile: resolve(output, 'engine.js'), bundle: true, format: 'iife', platform: 'browser', target: ['safari14'], supported: { destructuring: true }, minify: true, legalComments: 'linked' });
await writeFile(resolve(output, 'engine.html'), '<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'self\'; connect-src \'none\'; img-src \'none\'"><script src="engine.js"></script></head><body></body></html>\n');
await copyFile(resolve(import.meta.dirname, '../script/THIRD_PARTY_LICENSES.txt'), resolve(output, 'THIRD_PARTY_LICENSES.txt'));
for (const [code, locale] of Object.entries(locales)) {
  const copy = { ...locale.ui, ...locale.fields, ...locale.messages, ...locale.extra, ...nativeLabels[code], ...Object.fromEntries(locale.types.map((label, index) => [`type.${['link','text','wifi','email','sms','contact'][index]}`, label])) };
  for (const [key, value] of Object.entries(copy)) {
    const item = catalog.strings[`Workflow.${key}`] ||= { extractionState: 'manual', localizations: {} };
    item.localizations[code] = { stringUnit: { state: 'translated', value } };
  }
}
await writeFile(file, JSON.stringify(catalog, null, 2) + '\n');
for (const [code, labels] of Object.entries(nativeLabels)) {
  {
    const folder = resolve(app, `${code}.lproj`);
    await mkdir(folder, { recursive: true });
    await writeFile(resolve(folder, 'InfoPlist.strings'), `"NSCameraUsageDescription" = ${JSON.stringify(labels.cameraPermission)};\n`);
  }
}
console.log('Built offline native engine and complete eight-language App controls.');
