import Papa from 'papaparse';
import QRCode from 'qrcode';

export const batchLimit = 100;
export const csvByteLimit = 1024 * 1024;

export function parseBatch(value) {
  if (new TextEncoder().encode(value).length > csvByteLimit) throw new Error('csvLimit');
  const parsed = Papa.parse(value.replace(/^\uFEFF/, ''), { skipEmptyLines: 'greedy', preview: batchLimit + 2 });
  if (parsed.errors.some((error) => error.type === 'Quotes')) throw new Error('csvInvalid');
  const [header = [], ...data] = parsed.data;
  const columns = header.map((name) => name.trim().toLowerCase());
  if (columns.length !== 2 || !columns.includes('name') || !columns.includes('content')) throw new Error('csvHeader');
  if (!data.length) throw new Error('csvEmpty');
  if (data.length > batchLimit || parsed.meta.truncated) throw new Error('csvLimit');
  return data.map((cells, index) => {
    const name = (cells[columns.indexOf('name')] || '').trim();
    const content = cells[columns.indexOf('content')] || '';
    let error = '';
    let printable = false;
    if (cells.length !== 2) error = 'csvInvalid';
    else if (!name || !content.trim()) error = 'csvEmpty';
    else if (name.length > 120 || new TextEncoder().encode(content).length > 2048) error = 'rowTooLong';
    else {
      try { printable = QRCode.create(content, { errorCorrectionLevel: 'M' }).version <= 17; }
      catch { error = 'rowTooLong'; }
    }
    return { row: index + 2, name, content, error, printable };
  });
}

export function batchFilename(index, name, extension) {
  const safe = name.normalize('NFKC').replace(/[\x00-\x1f\x7f<>:"/\\|?*]/g, '_').replace(/^[. ]+|[. ]+$/g, '').slice(0, 60) || 'qr';
  return `${String(index + 1).padStart(3, '0')}-${safe}.${extension}`;
}

export const exampleCsv = Papa.unparse([
  ['name', 'content'], ['QR Tools', 'https://qrtools.luopeike.com/'], ['Desk 01', 'ASSET:DESK-01'],
]);
