import test from 'node:test';
import assert from 'node:assert/strict';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { zipSync, unzipSync, strToU8, strFromU8 } from 'fflate';
import { parseBatch, batchFilename, exampleCsv } from '../src/batch.mjs';
import { makePayload } from '../src/content.mjs';
import { inspectContent } from '../src/inspection.mjs';
import { makeCalendar } from '../src/calendar.mjs';
import { workflowLocales, workflowSeo } from '../src/workflow-locales.mjs';

test('CSV parser preserves quoted commas, newlines, UTF-8 BOM and leading zeros', () => {
  const rows = parseBatch('\uFEFFname,content\r\n"Label, 01","line 1\nline 2"\r\nCode,00123');
  assert.equal(rows[0].content, 'line 1\nline 2');
  assert.equal(rows[0].name, 'Label, 01');
  assert.equal(rows[1].content, '00123');
  assert.equal(rows[0].row, 2);
  assert.ok(rows.every((row) => !row.error));
  assert.equal(parseBatch('content;name\r\n00123;Code')[0].content, '00123');
  assert.equal(parseBatch(exampleCsv).length, 2);
});

test('CSV rejects malformed headers, quotes, excess rows and excess bytes', () => {
  assert.throws(() => parseBatch('label,url\na,b'), /csvHeader/);
  assert.throws(() => parseBatch('name,content\n"broken,value'), /csvInvalid/);
  assert.throws(() => parseBatch('name,content\n' + 'x,y\n'.repeat(101)), /csvLimit/);
  assert.equal(parseBatch('name,content\n' + 'x,y\n'.repeat(100)).length, 100);
  assert.throws(() => parseBatch('name,content\n' + '字'.repeat(400000)), /csvLimit/);
  assert.throws(() => parseBatch('name,content\n'), /csvEmpty/);
});

test('CSV validation keeps failed rows visible without blocking valid rows', () => {
  const rows = parseBatch('name,content\nOK,hello\nMissing,\nBad,a,b\nLong,' + '字'.repeat(1000));
  assert.equal(rows[0].error, '');
  assert.deepEqual(rows.slice(1).map((row) => row.error), ['csvEmpty', 'csvInvalid', 'rowTooLong']);
});

test('dense QR codes remain exportable but cannot use the small printed labels', () => {
  const [short, dense] = parseBatch('name,content\nShort,ASSET-01\nDense,' + '字'.repeat(500));
  assert.equal(short.printable, true);
  assert.equal(dense.error, '');
  assert.equal(dense.printable, false);
});

test('ZIP filenames remain unique and cannot escape the archive directory', () => {
  assert.equal(batchFilename(0, '../../evil<script>\u0000', 'svg'), '001-_.._evil_script__.svg');
  const names = [batchFilename(0, 'Same', 'svg'), batchFilename(1, 'Same', 'svg')];
  assert.notEqual(names[0], names[1]);
  const archive = zipSync(Object.fromEntries(names.map((name) => [name, strToU8('<svg/>')])), { level: 0 });
  const output = unzipSync(archive);
  assert.deepEqual(Object.keys(output), names);
  assert.equal(strFromU8(output[names[0]]), '<svg/>');
});

test('URL inspection explains real destination, tracking and credentials without opening anything', () => {
  const result = inspectContent('http://trusted.example@evil.example/path?utm_source=x&part=01#section');
  assert.equal(result.fields.find((field) => field.label === 'hostname').value, 'evil.example');
  assert.deepEqual(result.warnings, ['insecure', 'credentials', 'tracking']);
  assert.equal(result.link, null);
  assert.equal(inspectContent('javascript:alert(1)').link, null);
  assert.deepEqual(inspectContent('javascript:alert(1)').warnings, ['unsupportedScheme']);
  assert.ok(inspectContent('https://xn--bcher-kva.example').warnings.includes('internationalDomain'));
  assert.ok(inspectContent('https://192.0.2.1').warnings.includes('ipAddress'));
  assert.equal(inspectContent('https://example.com/?id=01').link, 'https://example.com/?id=01');
});

test('Wi-Fi inspection restores escaped fields and marks only password as secret', () => {
  const result = inspectContent(makePayload('wifi', { ssid: 'Cafe;A:B\\C', password: 'p;a:s\\s', encryption: 'WPA', hidden: true }));
  assert.equal(result.type, 'wifi');
  assert.equal(result.fields.find((field) => field.label === 'ssid').value, 'Cafe;A:B\\C');
  assert.equal(result.fields.find((field) => field.label === 'password').value, 'p;a:s\\s');
  assert.equal(result.fields.find((field) => field.label === 'password').secret, true);
  assert.equal(result.link, null);
});

test('contact, email and SMS details stay inert and readable', () => {
  const contact = inspectContent(makePayload('contact', { firstName: '<script>', company: 'A;B', phone: '+123' }));
  assert.equal(contact.type, 'contact');
  assert.equal(contact.fields.find((field) => field.label === 'company').value, 'A;B');
  assert.equal(contact.fields.find((field) => field.label === 'name').value, '<script>');
  const email = inspectContent(makePayload('email', { email: 'a@example.com', subject: 'A&B' }));
  assert.equal(email.type, 'email');
  assert.equal(email.fields.find((field) => field.label === 'subject').value, 'A&B');
  assert.equal(inspectContent('SMSTO:+123:hello:world').fields[1].value, 'hello:world');
});

test('calendar QR and ICS describe the same UTC instants, title and escaped details', () => {
  const event = makeCalendar({ title: 'Team, review', start: '2026-10-13T10:00', end: '2026-10-13T11:00', timezone: 'Asia/Shanghai', location: 'Room;1', description: 'Hello\nWorld', uid: 'test-qr-tools' });
  const link = new URL(event.payload);
  assert.equal(link.origin, 'https://calendar.google.com');
  assert.equal(link.searchParams.get('dates'), '20261013T020000Z/20261013T030000Z');
  assert.equal(link.searchParams.get('text'), 'Team, review');
  assert.ok(event.ics.includes('DTSTART:20261013T020000Z'));
  assert.ok(event.ics.includes('DTEND:20261013T030000Z'));
  assert.ok(event.ics.includes('SUMMARY:Team\\, review'));
  assert.ok(event.ics.includes('DESCRIPTION:Hello\\nWorld'));
  assert.ok(event.ics.includes('UID:test-qr-tools'));
});

test('calendar rejects missing zones, backwards times, DST gaps and ambiguous repeated times', () => {
  const fields = { title: 'Meet', start: '2026-10-13T10:00', end: '2026-10-13T11:00', timezone: 'UTC' };
  assert.throws(() => makeCalendar({ ...fields, timezone: undefined }), /eventTime/);
  assert.throws(() => makeCalendar({ ...fields, timezone: 'Invalid/Zone' }), /eventTime/);
  assert.throws(() => makeCalendar({ ...fields, end: fields.start }), /eventTime/);
  assert.throws(() => makeCalendar({ ...fields, start: '2026-03-08T02:30', end: '2026-03-08T04:00', timezone: 'America/New_York' }), /eventTime/);
  assert.throws(() => makeCalendar({ ...fields, start: '2026-11-01T01:30', end: '2026-11-01T03:00', timezone: 'America/New_York' }), /eventAmbiguous/);
  assert.throws(() => makeCalendar({ ...fields, title: '' }), /eventFields/);
});

test('new batch and calendar payloads round-trip through an independent QR decoder', () => {
  const payloads = [parseBatch(exampleCsv)[0].content, makeCalendar({ title: '会议', start: '2026-10-13T10:00', end: '2026-10-13T11:00', timezone: 'Asia/Shanghai' }).payload];
  for (const payload of payloads) {
    const qr = QRCode.create(payload, { errorCorrectionLevel: 'M' });
    const size = (qr.modules.size + 8) * 4;
    const pixels = new Uint8ClampedArray(size * size * 4).fill(255);
    for (let y = 0; y < qr.modules.size; y++) for (let x = 0; x < qr.modules.size; x++) if (qr.modules.get(y, x)) {
      for (let dy = 0; dy < 4; dy++) for (let dx = 0; dx < 4; dx++) {
        const at = (((y + 4) * 4 + dy) * size + (x + 4) * 4 + dx) * 4;
        pixels[at] = pixels[at + 1] = pixels[at + 2] = 0;
      }
    }
    assert.equal(jsQR(pixels, size, size)?.data, payload);
  }
});

test('all eight workflow translations and tool FAQs are complete without English fallback', () => {
  const keys = Object.keys(workflowLocales.en);
  for (const [code, copy] of Object.entries(workflowLocales)) {
    assert.deepEqual(Object.keys(copy), keys);
    for (const value of Object.values(copy)) assert.ok(typeof value === 'string' && value.length);
    for (const seo of Object.values(workflowSeo[code])) {
      assert.ok(seo.title && seo.description);
      assert.equal(seo.questions.length, 3);
    }
  }
});
