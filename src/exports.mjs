export function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export function canvasBlob(canvas) {
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('exportFailed')), 'image/png'));
}

const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

export async function printImages(items, paper = 'A4', sign = false) {
  const frame = document.createElement('iframe');
  frame.title = 'QR Tools';
  frame.setAttribute('aria-hidden', 'true');
  frame.style.cssText = 'position:fixed;width:0;height:0;border:0;bottom:0;right:0';
  document.body.append(frame);
  const doc = frame.contentDocument;
  const pages = [];
  const perPage = sign ? 1 : 8;
  for (let index = 0; index < items.length; index += perPage) {
    pages.push(`<section class="sheet ${sign ? 'sign' : 'labels'}">${items.slice(index, index + perPage).map((item) => `<figure><img src="${escape(item.png)}" alt=""><figcaption>${escape(sign ? '' : item.name)}</figcaption></figure>`).join('')}</section>`);
  }
  doc.open();
  doc.write(`<!doctype html><html><head><meta charset="utf-8"><title>QR Tools</title><style>@page{size:${paper === 'Letter' ? 'Letter' : 'A4'};margin:12mm}*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif}.sheet{break-after:page;page-break-after:always}.sheet:last-child{break-after:auto;page-break-after:auto}.labels{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:60mm;gap:3mm}figure{margin:0;min-width:0}.labels figure{border:1px dashed #ccc;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2mm}.labels img{width:38mm;height:38mm}.labels figcaption{font-size:10pt;text-align:center;overflow-wrap:anywhere;max-height:12mm;overflow:hidden;line-height:1.3}.sign{height:250mm;display:flex;align-items:center;justify-content:center}.sign img{display:block;max-height:245mm;max-width:100%;object-fit:contain}</style></head><body>${pages.join('')}</body></html>`);
  doc.close();
  try {
    await Promise.all([...doc.images].map((img) => img.decode()));
    frame.contentWindow.addEventListener('afterprint', () => frame.remove(), { once: true });
    frame.contentWindow.focus();
    frame.contentWindow.print();
    setTimeout(() => frame.remove(), 600_000);
  } catch (error) { frame.remove(); throw error; }
}
