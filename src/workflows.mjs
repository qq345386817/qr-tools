import QRCode from 'qrcode';
import { zipSync, strToU8 } from 'fflate';
import { parseBatch, batchFilename, exampleCsv, csvByteLimit } from './batch.mjs';
import { makePayload } from './content.mjs';
import { makeCalendar } from './calendar.mjs';
import { canvasBlob, download, printImages } from './exports.mjs';

export function initWorkflows(data) {
  const { ui, messages, extra: x } = data;
  const $ = (id) => document.getElementById(id);
  const controls = (ids, disabled) => ids.forEach((id) => { $(id).disabled = disabled; });
  const setStatus = (id, value, error = false) => { $(id).textContent = value; $(id).classList.toggle('error', error); };
  const errorText = (error) => x[error.message] || messages[error.message] || messages.exportFailed;
  const pause = () => new Promise((resolve) => setTimeout(resolve, 0));
  const options = { width: 512, margin: 4, errorCorrectionLevel: 'M' };
  const batchActions = ['batch-png', 'batch-svg', 'batch-print'];
  let batchRevision = 0, csvRevision = 0, batch = [], batchBusy = false;
  $('batch-csv').value = exampleCsv;
  controls(batchActions, true);
  $('cancel-batch').hidden = true;
  function invalidateBatch() {
    ++batchRevision;
    ++csvRevision;
    batch = [];
    controls(batchActions, true);
    $('batch-results').replaceChildren();
    setStatus('batch-status', '');
  }
  $('batch-csv').addEventListener('input', invalidateBatch);
  $('csv-template').addEventListener('click', () => download(new Blob(['\uFEFF', exampleCsv], { type: 'text/csv;charset=utf-8' }), 'qr-tools-template.csv'));
  $('csv-file').addEventListener('change', async (event) => {
    invalidateBatch();
    const revision = csvRevision;
    const file = event.target.files[0];
    if (!file) return;
    try {
      if (file.size > csvByteLimit) throw new Error('csvLimit');
      const value = await file.text();
      if (revision !== csvRevision) return;
      $('batch-csv').value = value;
    } catch (error) { if (revision === csvRevision) setStatus('batch-status', x[error.message] || x.fileRead, true); }
    finally { event.target.value = ''; }
  });
  $('cancel-batch').addEventListener('click', () => { invalidateBatch(); setStatus('batch-status', x.cancel); });
  $('generate-batch').addEventListener('click', async () => {
    if (batchBusy) return;
    invalidateBatch();
    const revision = batchRevision;
    batchBusy = true;
    $('generate-batch').disabled = true;
    $('cancel-batch').hidden = false;
    try {
      const rows = parseBatch($('batch-csv').value);
      const output = [];
      const table = document.createElement('table');
      const caption = document.createElement('caption');
      caption.className = 'sr-only'; caption.textContent = x.batch; table.append(caption);
      const head = table.createTHead().insertRow();
      for (const label of [x.row, x.name, x.content, x.output]) { const th = document.createElement('th'); th.scope = 'col'; th.textContent = label; head.append(th); }
      const body = table.createTBody();
      for (const [index, row] of rows.entries()) {
        if (revision !== batchRevision) return;
        const tr = body.insertRow();
        for (const value of [row.row, row.name, row.content]) { const cell = tr.insertCell(); cell.textContent = String(value); }
        const cell = tr.insertCell();
        if (row.error) { cell.textContent = x[row.error]; tr.className = 'invalid-row'; }
        else {
          const png = await QRCode.toDataURL(row.content, options);
          if (revision !== batchRevision) return;
          const svg = await QRCode.toString(row.content, { ...options, type: 'svg' });
          if (revision !== batchRevision) return;
          output.push({ ...row, index, png, svg });
          const image = document.createElement('img'); image.src = png; image.alt = row.name; image.width = 64; image.height = 64; cell.append(image);
        }
        setStatus('batch-status', `${x.busy} ${index + 1} / ${rows.length}`);
        if (index % 4 === 0) await pause();
      }
      if (revision !== batchRevision) return;
      batch = output;
      $('batch-results').replaceChildren(table);
      controls(batchActions, !batch.length);
      setStatus('batch-status', `${x.valid}: ${batch.length} · ${x.invalid}: ${rows.length - batch.length} · ${x.total}: ${rows.length}`, batch.length !== rows.length);
      if (batch.some((row) => !row.printable)) { $('batch-print').disabled = true; setStatus('batch-status', $('batch-status').textContent + ` · ${x.printDensity}`, true); }
    } catch (error) { if (revision === batchRevision) setStatus('batch-status', errorText(error), true); }
    finally { batchBusy = false; $('generate-batch').disabled = false; $('cancel-batch').hidden = true; }
  });
  function exportBatch(extension) {
    try {
      if (!batch.length) return;
      const files = Object.fromEntries(batch.map((row) => [batchFilename(row.index, row.name, extension), extension === 'svg' ? strToU8(row.svg) : Uint8Array.from(atob(row.png.split(',')[1]), (char) => char.charCodeAt(0))]));
      download(new Blob([zipSync(files, { level: 0 })], { type: 'application/zip' }), `qr-tools-${extension}.zip`);
    } catch (error) { setStatus('batch-status', errorText(error), true); }
  }
  $('batch-png').addEventListener('click', () => exportBatch('png'));
  $('batch-svg').addEventListener('click', () => exportBatch('svg'));
  $('batch-print').addEventListener('click', async () => { try { if (batch.length) await printImages(batch, $('batch-paper').value); } catch (error) { setStatus('batch-status', errorText(error), true); } });

  const signForm = $('sign-form'), signCanvas = $('sign-preview');
  const signActions = ['sign-png', 'sign-print', 'sign-fullscreen'];
  let signRevision = 0, signReady = false, signTimer;
  controls(signActions, true);
  signForm.elements.title.value = x.guestWifi;
  function wrappedText(context, text, x, y, width, lineHeight, maxLines) {
    const lines = [];
    let line = '';
    for (const char of text) {
      if (char === '\n' || context.measureText(line + char).width > width) { lines.push(line); line = char === '\n' ? '' : char; }
      else line += char;
    }
    lines.push(line);
    const visible = lines.slice(0, maxLines);
    if (lines.length > maxLines) {
      let last = visible[visible.length - 1];
      while (last && context.measureText(last + '…').width > width) last = last.slice(0, -1);
      visible[visible.length - 1] = last + '…';
    }
    visible.forEach((value, index) => context.fillText(value, x, y + index * lineHeight));
  }
  async function renderSign() {
    const revision = ++signRevision;
    signReady = false; controls(signActions, true);
    signCanvas.hidden = true;
    try {
      signForm.elements.password.disabled = signForm.elements.encryption.value === 'nopass';
      const fields = Object.fromEntries(new FormData(signForm));
      fields.hidden = signForm.elements.hidden.checked;
      const isWifi = fields.type === 'wifi';
      $('sign-wifi').hidden = !isWifi; $('sign-link').hidden = isWifi;
      const payload = makePayload(isWifi ? 'wifi' : 'link', fields);
      if (!payload) { setStatus('sign-status', ui.empty); return; }
      const qr = document.createElement('canvas');
      try { await QRCode.toCanvas(qr, payload, { ...options, width: 768 }); } catch { throw new Error('tooLong'); }
      if (revision !== signRevision) return;
      const c = signCanvas.getContext('2d');
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, 960, 1280);
      c.fillStyle = '#17202b'; c.textAlign = 'center'; c.font = '600 48px sans-serif';
      wrappedText(c, fields.title.trim() || (isWifi ? x.guestWifi : fields.type === 'menu' ? x.menuLink : x.eventEntry), 480, 90, 820, 60, 2);
      c.font = '28px sans-serif'; wrappedText(c, isWifi ? fields.ssid : '', 480, 230, 820, 36, 2);
      c.drawImage(qr, Math.floor((960 - qr.width) / 2), 310);
      c.font = '28px sans-serif'; wrappedText(c, fields.note, 480, 1120, 820, 38, 3);
      signCanvas.hidden = false; signReady = true; controls(signActions, false); setStatus('sign-status', ui.ready);
    } catch (error) { if (revision === signRevision) setStatus('sign-status', errorText(error), true); }
  }
  signForm.addEventListener('submit', (event) => event.preventDefault());
  signForm.addEventListener('input', () => { ++signRevision; signReady = false; controls(signActions, true); clearTimeout(signTimer); signTimer = setTimeout(renderSign, 120); });
  $('sign-type').addEventListener('change', () => {
    const presets = [x.guestWifi, x.eventEntry, x.menuLink];
    if (!signForm.elements.title.value || presets.includes(signForm.elements.title.value)) signForm.elements.title.value = { wifi: x.guestWifi, event: x.eventEntry, menu: x.menuLink }[$('sign-type').value];
    renderSign();
  });
  $('sign-show-password').addEventListener('change', (event) => { signForm.elements.password.type = event.target.checked ? 'text' : 'password'; });
  $('sign-png').addEventListener('click', async () => { try { if (signReady) download(await canvasBlob(signCanvas), 'qr-tools-sign.png'); } catch (error) { setStatus('sign-status', errorText(error), true); } });
  $('sign-print').addEventListener('click', async () => { try { if (signReady) await printImages([{ png: signCanvas.toDataURL(), name: '' }], $('sign-paper').value, true); } catch (error) { setStatus('sign-status', errorText(error), true); } });
  $('sign-fullscreen').addEventListener('click', async () => {
    if (!signReady) return;
    $('fullscreen-sign').src = signCanvas.toDataURL();
    const dialog = $('sign-dialog');
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else { dialog.setAttribute('open', ''); dialog.style.cssText = 'display:block;position:fixed;inset:0;z-index:20'; }
    try { await $('sign-dialog').requestFullscreen?.(); } catch { /* The dialog remains usable when full-screen permission is unavailable. */ }
  });
  function exitSign() {
    if (document.fullscreenElement === $('sign-dialog')) document.exitFullscreen().catch(() => {});
    $('fullscreen-sign').removeAttribute('src');
  }
  function closeSign() {
    const dialog = $('sign-dialog');
    if (typeof dialog.close === 'function') dialog.close();
    else { dialog.removeAttribute('open'); dialog.removeAttribute('style'); exitSign(); }
  }
  $('close-sign').addEventListener('click', closeSign);
  $('sign-dialog').addEventListener('close', exitSign);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && $('sign-dialog').hasAttribute('open') && typeof $('sign-dialog').close !== 'function') closeSign(); });
  renderSign();

  const calendarForm = $('calendar-form'), calendarCanvas = $('calendar-preview');
  const calendarActions = ['calendar-png', 'calendar-svg', 'calendar-ics'];
  let calendarRevision = 0, calendarValue = null, calendarTimer;
  controls(calendarActions, true);
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const zones = [...new Set(['UTC', zone, ...(Intl.supportedValuesOf?.('timeZone') || ['America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Shanghai', 'Asia/Tokyo'])])];
  for (const value of zones.sort()) { const option = document.createElement('option'); option.value = value; option.textContent = value; option.selected = value === zone; $('event-timezone').append(option); }
  async function renderCalendar() {
    const revision = ++calendarRevision;
    controls(calendarActions, true); calendarValue = null; calendarCanvas.hidden = true; $('calendar-link').hidden = true; $('calendar-link').removeAttribute('href');
    const fields = Object.fromEntries(new FormData(calendarForm));
    if (!fields.title || !fields.start || !fields.end) { setStatus('calendar-status', ui.empty); return; }
    try {
      const value = makeCalendar(fields);
      const canvas = document.createElement('canvas');
      try { await QRCode.toCanvas(canvas, value.payload, { ...options, width: 1024 }); } catch { throw new Error('tooLong'); }
      if (revision !== calendarRevision) return;
      calendarCanvas.width = canvas.width; calendarCanvas.height = canvas.height;
      calendarCanvas.getContext('2d').drawImage(canvas, 0, 0);
      calendarCanvas.hidden = false; calendarValue = value; controls(calendarActions, false);
      $('calendar-link').href = value.payload; $('calendar-link').hidden = false;
      const format = new Intl.DateTimeFormat(data.code, { dateStyle: 'medium', timeStyle: 'short', timeZone: fields.timezone });
      setStatus('calendar-status', `${format.format(new Date(value.start))} → ${format.format(new Date(value.end))} (${fields.timezone})`);
    } catch (error) { if (revision === calendarRevision) setStatus('calendar-status', errorText(error), true); }
  }
  calendarForm.addEventListener('submit', (event) => event.preventDefault());
  calendarForm.addEventListener('input', () => { ++calendarRevision; calendarValue = null; controls(calendarActions, true); $('calendar-link').hidden = true; clearTimeout(calendarTimer); calendarTimer = setTimeout(renderCalendar, 120); });
  $('calendar-png').addEventListener('click', async () => { try { if (calendarValue) download(await canvasBlob(calendarCanvas), 'qr-tools-event.png'); } catch (error) { setStatus('calendar-status', errorText(error), true); } });
  $('calendar-svg').addEventListener('click', async () => { try { if (calendarValue) download(new Blob([await QRCode.toString(calendarValue.payload, { ...options, type: 'svg' })], { type: 'image/svg+xml' }), 'qr-tools-event.svg'); } catch (error) { setStatus('calendar-status', errorText(error), true); } });
  $('calendar-ics').addEventListener('click', () => { if (calendarValue) download(new Blob([calendarValue.ics], { type: 'text/calendar;charset=utf-8' }), 'qr-tools-event.ics'); });
  renderCalendar();
}
