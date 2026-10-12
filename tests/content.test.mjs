import test from 'node:test';
import assert from 'node:assert/strict';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { makePayload, cleanLink, safeWebLink, contrastRatio } from '../src/content.mjs';
import { locales, types } from '../src/locales.mjs';

test('link cleanup removes known tracking parameters and preserves navigation parameters', () => {
  assert.equal(cleanLink('https://example.com/shop?product=10&utm_source=mail&UTM_CAMPAIGN=launch&gclid=1#details').value, 'https://example.com/shop?product=10#details');
  assert.equal(cleanLink('https://example.com/?ref=friend&query=a%20b').value, 'https://example.com/?ref=friend&query=a%20b');
  assert.throws(() => cleanLink('javascript:alert(1)'));
  assert.throws(() => makePayload('link', { url: 'file:///etc/passwd' }));
});

test('Wi-Fi escaping protects passwords and SSIDs from field injection', () => {
  assert.equal(makePayload('wifi', { ssid: 'Guest;Network', password: 'p:a\\ss"', encryption: 'WPA', hidden: true }), 'WIFI:T:WPA;S:Guest\\;Network;P:p\\:a\\\\ss\\";H:true;;');
  assert.equal(makePayload('wifi', { ssid: 'Guest', password: 'ignored', encryption: 'nopass' }), 'WIFI:T:nopass;S:Guest;H:false;;');
});

test('vCard data is escaped and cannot inject additional properties', () => {
  const card = makePayload('contact', { firstName: 'Ada;Marie', lastName: '罗', company: 'ACME, Inc.\nSupport', phone: '+123\nEND:VCARD' });
  assert.ok(card.includes('N:罗;Ada\\;Marie;;;\r\n'));
  assert.ok(card.includes('ORG:ACME\\, Inc.\\nSupport'));
  assert.ok(card.includes('TEL:+123END:VCARD'));
  assert.equal(card.match(/END:VCARD/g).length, 2);
  assert.equal(card.split('\r\n').at(-1), 'END:VCARD');
});

test('email and SMS use portable payloads with encoded message parameters', () => {
  assert.equal(makePayload('email', { email: 'hello@example.com', subject: 'a&b', body: '你好\nworld' }), 'mailto:hello@example.com?subject=a%26b&body=%E4%BD%A0%E5%A5%BD%0Aworld');
  assert.equal(makePayload('sms', { phone: '+1 (234) 567-890', message: 'Hello' }), 'SMSTO:+1234567890:Hello');
  assert.throws(() => makePayload('email', { email: 'a@example.com?subject=evil' }));
  assert.throws(() => makePayload('sms', { phone: '123:evil' }));
});

test('decoded content offers only explicit HTTP(S) links', () => {
  assert.equal(safeWebLink('javascript:alert(1)'), null);
  assert.equal(safeWebLink('data:text/html,hello'), null);
  assert.equal(safeWebLink('WIFI:T:WPA;S:Guest;;'), null);
  assert.equal(safeWebLink('https://example.com/'), 'https://example.com/');
});

test('six payload types round-trip through an independent QR decoder', () => {
  const inputs = {
    link: { url: 'https://qrtools.luopeike.com/' },
    text: { text: '你好 QR Tools 🌍\nLine two' },
    wifi: { ssid: '访客;网络', password: 'p:a\\ss', encryption: 'WPA' },
    email: { email: 'hello@example.com', subject: '你好', body: 'a&b' },
    sms: { phone: '+123456789', message: '你好世界' },
    contact: { firstName: 'Peike', lastName: '罗', email: 'hello@example.com', company: 'Studio, Inc.' },
  };
  for (const type of types) {
    const payload = makePayload(type, inputs[type]);
    const { modules } = QRCode.create(payload, { errorCorrectionLevel: 'H' });
    const scale = 6, margin = 4, width = (modules.size + margin * 2) * scale;
    const pixels = new Uint8ClampedArray(width * width * 4).fill(255);
    for (let y = 0; y < width; y++) for (let x = 0; x < width; x++) {
      const row = Math.floor(y / scale) - margin, column = Math.floor(x / scale) - margin;
      const dark = row >= 0 && row < modules.size && column >= 0 && column < modules.size && modules.get(row, column);
      if (dark) { const i = (y * width + x) * 4; pixels[i] = pixels[i+1] = pixels[i+2] = 0; }
    }
    assert.equal(jsQR(pixels, width, width)?.data, payload, `${type} decodes correctly`);
  }
});

test('contrast guard rejects light codes and inverted palettes', () => {
  assert.equal(contrastRatio('#000000', '#ffffff'), 21);
  assert.ok(contrastRatio('#ffffff', '#000000') < 1);
  assert.ok(contrastRatio('#aaaaaa', '#ffffff') < 4.5);
});

test('every supported locale has complete visible messages and controls', () => {
  const reference = locales.en;
  for (const locale of Object.values(locales)) {
    for (const group of ['ui', 'fields', 'messages']) {
      assert.deepEqual(Object.keys(locale[group]), Object.keys(reference[group]));
      assert.ok(Object.values(locale[group]).every((value) => typeof value === 'string' && value.length));
    }
    assert.equal(locale.types.length, types.length);
  }
});
