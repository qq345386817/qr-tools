import test from 'node:test';
import assert from 'node:assert/strict';
import { unzipSync, strFromU8 } from 'fflate';
import { perform } from '../src/native-engine.mjs';
import { nativeLabels } from '../src/native-locales.mjs';

test('native adapter preserves payload, inspection and CSV validation semantics', () => {
  const value = perform('payload', { type: 'wifi', fields: { ssid: 'Cafe;A', password: 'p;a:s', encryption: 'WPA' } });
  const result = perform('inspect', { value });
  assert.equal(result.type, 'wifi');
  assert.equal(result.fields.find(f => f.label === 'password').value, 'p;a:s');
  assert.equal(result.fields.find(f => f.label === 'password').secret, true);
  assert.equal(perform('batch', { value: perform('template', {}) }).length, 2);
  assert.throws(() => perform('batch', { value: 'wrong,headers\na,b' }), /csvHeader/);
  assert.equal(perform('clean', { value: 'https://example.com/?id=01&utm_source=test' }).value, 'https://example.com/?id=01');
});

test('native ZIP adapter keeps unique safe filenames and exact binary contents', () => {
  const archive = perform('zip', { extension: 'svg', entries: [{ name: '../../same', base64: btoa('<svg/>') }, { name: '../../same', base64: btoa('<svg>2</svg>') }] });
  const files = unzipSync(Uint8Array.from(atob(archive), char => char.charCodeAt(0)));
  assert.deepEqual(Object.keys(files), ['001-_.._same.svg', '002-_.._same.svg']);
  assert.equal(strFromU8(files['002-_.._same.svg']), '<svg>2</svg>');
  assert.throws(() => perform('zip', { extension: 'svg', entries: [] }), /csvLimit/);
});

test('native calendar adapter rejects DST ambiguity and matches UTC output', () => {
  const event = perform('calendar', { title: 'Native', start: '2026-10-13T10:00', end: '2026-10-13T11:00', timezone: 'Asia/Shanghai' });
  assert.ok(event.ics.includes('DTSTART:20261013T020000Z'));
  assert.throws(() => perform('calendar', { title: 'DST', start: '2026-11-01T01:30', end: '2026-11-01T03:00', timezone: 'America/New_York' }), /eventAmbiguous/);
});

test('native navigation and permission descriptions cover all eight locales', () => {
  assert.equal(Object.keys(nativeLabels).length, 8);
  for (const copy of Object.values(nativeLabels)) {
    assert.deepEqual(Object.keys(copy), Object.keys(nativeLabels.en));
    for (const value of Object.values(copy)) assert.ok(value.trim());
  }
});
