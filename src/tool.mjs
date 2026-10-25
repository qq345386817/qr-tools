import QRCode from 'qrcode';
import { createIcons, ArrowUpRight, BrushCleaning, CalendarDays, Camera, CameraOff, ChevronDown, Contact, Copy, Download, ExternalLink, FileDown, Globe, ImageUp, Layers, Link, Mail, Maximize, MessageSquare, Printer, QrCode, RotateCcw, ScanLine, Share2, ShieldCheck, SlidersHorizontal, Type, Upload, Wifi, X } from 'lucide';
import { cleanLink, contrastRatio, makePayload } from './content.mjs';
import { inspectContent } from './inspection.mjs';

const data = JSON.parse(document.getElementById('page-data').textContent);
const { ui, messages } = data;
const $ = (id) => document.getElementById(id);
createIcons({ icons: { ArrowUpRight, BrushCleaning, CalendarDays, Camera, CameraOff, ChevronDown, Contact, Copy, Download, ExternalLink, FileDown, Globe, ImageUp, Layers, Link, Mail, Maximize, MessageSquare, Printer, QrCode, RotateCcw, ScanLine, Share2, ShieldCheck, SlidersHorizontal, Type, Upload, Wifi, X } });

let type = data.defaultType;
let mode = data.defaultMode;
let renderRevision = 0;
let renderTimer;
let currentPayload = '';
let cameraStream;
let cameraRevision = 0;
let readerRevision = 0;
let scanTimer;
let isReading = false;
let workflowsReady;
const modes = ['create', 'read', 'batch', 'sign', 'calendar'];
const exportButtons = document.querySelectorAll('.export');
const cameraVideo = $('camera-video');
const scratchCanvas = document.createElement('canvas');
$('stop-camera').hidden = true;
$('copy-content').disabled = true;
$('use-content').disabled = true;

function status(message, error = false) {
  $('generate-status-text').textContent = message;
  $('generate-status').classList.toggle('error', error);
}
function readStatus(message, error = false) {
  $('reader-status').textContent = message;
  $('reader-status').classList.toggle('error', error);
}
function settings() {
  return { width: Number($('png-size').value), margin: 4, errorCorrectionLevel: $('correction').value, color: { dark: $('foreground').value, light: $('background').value } };
}
function fields() {
  const form = $(`form-${type}`);
  const values = Object.fromEntries(new FormData(form));
  values.hidden = form.querySelector('[name="hidden"]')?.checked ?? false;
  return values;
}
function clearPreview() {
  currentPayload = '';
  $('qr-preview').hidden = true;
  $('empty-preview').hidden = false;
  for (const button of exportButtons) button.disabled = true;
}
function changeType(next) {
  type = next;
  for (const button of document.querySelectorAll('[data-type]')) {
    const selected = button.dataset.type === type;
    button.setAttribute('aria-selected', selected);
    button.tabIndex = selected ? 0 : -1;
    $(`form-${button.dataset.type}`).hidden = !selected;
  }
  clearTimeout(renderTimer);
  return render();
}

async function render() {
  const revision = ++renderRevision;
  for (const button of exportButtons) button.disabled = true;
  try {
    let payload;
    try {
      payload = makePayload(type, fields());
    } catch (error) {
      throw new Error(messages[error.message] ? error.message : 'invalidLink');
    }
    if (!payload.trim()) {
      clearPreview();
      status(ui.empty);
      return;
    }
    if (contrastRatio($('foreground').value, $('background').value) < 4.5) {
      clearPreview();
      status(messages.contrast, true);
      return;
    }
    if (new TextEncoder().encode(payload).length > 7089) throw new Error('tooLong');
    // Render off-screen, so stale async work cannot replace a newer preview.
    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, payload, settings());
    if (revision !== renderRevision) return;
    const preview = $('qr-preview');
    // The encoder can round a fractional canvas width down by one pixel.
    // Pad its raster rather than resampling QR modules during export.
    const size = Number($('png-size').value);
    preview.width = size;
    preview.height = size;
    const context = preview.getContext('2d');
    context.fillStyle = $('background').value;
    context.fillRect(0, 0, size, size);
    context.drawImage(canvas, Math.floor((size - canvas.width) / 2), Math.floor((size - canvas.height) / 2));
    preview.hidden = false;
    $('empty-preview').hidden = true;
    currentPayload = payload;
    for (const button of exportButtons) button.disabled = false;
    if (!navigator.clipboard?.write || !window.ClipboardItem) {
      $('copy-image').disabled = true;
      $('copy-image').title = ui.notSupported;
    }
    const file = new File([], 'qr-code.png', { type: 'image/png' });
    if (!navigator.canShare?.({ files: [file] })) {
      $('share-image').disabled = true;
      $('share-image').title = ui.notSupported;
    }
    status(ui.ready);
  } catch (error) {
    if (revision !== renderRevision) return;
    clearPreview();
    const key = messages[error.message] ? error.message : 'tooLong';
    status(messages[key], true);
  }
}

for (const button of document.querySelectorAll('[data-type]')) {
  button.addEventListener('click', () => changeType(button.dataset.type));
}
function keyboardTabs(container, selector) {
  container.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const buttons = [...container.querySelectorAll(selector)];
    const current = buttons.indexOf(event.target);
    if (current < 0) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next].click();
    buttons[next].focus();
  });
}
keyboardTabs(document.querySelector('.content-tabs'), '[role="tab"]');
keyboardTabs(document.querySelector('.mode-switch'), '[role="tab"]');

for (const form of document.querySelectorAll('[data-form]')) {
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('input', () => {
    ++renderRevision;
    clearTimeout(renderTimer);
    for (const button of exportButtons) button.disabled = true;
    renderTimer = setTimeout(render, 120);
  });
}
for (const id of ['foreground', 'background', 'correction', 'png-size']) {
  $(id).addEventListener('input', () => {
    $('foreground-value').textContent = $('foreground').value.toUpperCase();
    $('background-value').textContent = $('background').value.toUpperCase();
    render();
  });
}
$('language').addEventListener('change', (event) => { window.location.href = event.target.value; });
$('show-password').addEventListener('change', (event) => { $('field-password').type = event.target.checked ? 'text' : 'password'; });
$('encryption').addEventListener('change', (event) => { $('field-password').disabled = event.target.value === 'nopass'; });
$('reset').addEventListener('click', () => {
  $(`form-${type}`).reset();
  for (const element of $(`form-${type}`).querySelectorAll('input:not([type="checkbox"]), textarea')) element.value = '';
  $('foreground').value = '#000000';
  $('background').value = '#ffffff';
  $('foreground-value').textContent = '#000000';
  $('background-value').textContent = '#FFFFFF';
  $('correction').value = 'H';
  $('png-size').value = '1024';
  $('field-password').type = 'password';
  $('field-password').disabled = false;
  $('show-password').checked = false;
  render();
});
$('clean-link').addEventListener('click', async () => {
  try {
    const cleaned = cleanLink($('field-url').value);
    $('field-url').value = cleaned.value;
    await render();
    status(cleaned.removed ? messages.cleaned : messages.noTracking);
  } catch { status(messages.invalidLink, true); }
});

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
function pngBlob() {
  return new Promise((resolve, reject) => {
    if (!currentPayload) { reject(new Error('empty')); return; }
    $('qr-preview').toBlob((blob) => blob ? resolve(blob) : reject(new Error('exportFailed')), 'image/png');
  });
}
$('download-png').addEventListener('click', async () => {
  try { download(await pngBlob(), `qr-tools-${type}.png`); } catch { status(messages.exportFailed, true); }
});
$('download-svg').addEventListener('click', async () => {
  try {
    if (!currentPayload) return;
    const svg = await QRCode.toString(currentPayload, { ...settings(), type: 'svg' });
    download(new Blob([svg], { type: 'image/svg+xml' }), `qr-tools-${type}.svg`);
  } catch { status(messages.exportFailed, true); }
});
$('copy-image').addEventListener('click', async () => {
  try {
    // A promised blob preserves Safari's user activation for clipboard writes.
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': pngBlob() })]);
    status(messages.copied);
  } catch { status(messages.copyFailed, true); }
});
$('share-image').addEventListener('click', async () => {
  try {
    const file = new File([await pngBlob()], 'qr-tools.png', { type: 'image/png' });
    await navigator.share({ files: [file], title: 'QR Tools' });
  } catch (error) { if (error.name !== 'AbortError') status(messages.shareFailed, true); }
});

function stopCamera() {
  ++cameraRevision;
  clearTimeout(scanTimer);
  cameraStream?.getTracks().forEach((track) => track.stop());
  cameraStream = null;
  cameraVideo.srcObject = null;
  cameraVideo.hidden = true;
  $('start-camera').disabled = false;
  $('stop-camera').hidden = true;
}
function changeMode(next) {
  mode = next;
  ++readerRevision;
  if (mode !== 'read') stopCamera();
  for (const item of modes) {
    $(`mode-${item}`).setAttribute('aria-selected', mode === item);
    $(`mode-${item}`).tabIndex = mode === item ? 0 : -1;
    $(`${item}-panel`).hidden = mode !== item;
  }
  if (['batch', 'sign', 'calendar'].includes(next) && !workflowsReady) {
    workflowsReady = import('./workflows.mjs').then(({ initWorkflows }) => initWorkflows(data)).catch(() => {
      workflowsReady = null;
      for (const item of ['batch', 'sign', 'calendar']) {
        $(`${item}-status`).textContent = messages.exportFailed;
        $(`${item}-status`).classList.add('error');
      }
    });
  }
}
for (const item of modes) $(`mode-${item}`).addEventListener('click', () => changeMode(item));
$('stop-camera').addEventListener('click', () => { stopCamera(); readStatus(''); });
document.addEventListener('visibilitychange', () => { if (document.hidden) stopCamera(); });
window.addEventListener('pagehide', stopCamera);

function showInspection(value) {
  const inspection = inspectContent(value);
  const { extra: x, fields } = data;
  $('inspection').hidden = !value.trim();
  $('inspection-fields').replaceChildren();
  $('inspection-warnings').replaceChildren();
  const addField = (label, value, secret = false) => {
    const dt = document.createElement('dt'), dd = document.createElement('dd');
    dt.textContent = label;
    if (secret) {
      const details = document.createElement('details'), summary = document.createElement('summary'), text = document.createElement('span');
      summary.textContent = ui.showPassword;
      text.textContent = value;
      details.append(summary, text); dd.append(details);
    } else dd.textContent = value;
    $('inspection-fields').append(dt, dd);
  };
  addField(x.contentType, data.contentTypes[inspection.type]);
  for (const field of inspection.fields) addField(`${fields[field.label] || x[field.label]}${field.name ? `: ${field.name}` : ''}`, field.value, field.secret);
  for (const warning of inspection.warnings) { const li = document.createElement('li'); li.textContent = x[warning]; $('inspection-warnings').append(li); }
  $('confirm-link').checked = false;
  $('confirm-link-label').hidden = !inspection.link;
  $('open-link').hidden = true;
  $('open-link').removeAttribute('href');
  if (inspection.link) $('open-link').href = inspection.link;
  $('copy-content').disabled = !value.trim();
  $('use-content').disabled = !value.trim();
  return inspection;
}
$('confirm-link').addEventListener('change', (event) => { $('open-link').hidden = !event.target.checked || !$('open-link').hasAttribute('href'); });
$('decoded-content').addEventListener('input', () => { ++readerRevision; stopCamera(); showInspection($('decoded-content').value); });
$('inspect-content').addEventListener('click', () => showInspection($('decoded-content').value));
function showResult(value) {
  stopCamera();
  $('decoded-content').value = value;
  const inspection = showInspection(value);
  $('raw-details').open = inspection.type !== 'wifi';
  readStatus(messages.found);
}
async function processFile(file) {
  if (!file || isReading) return;
  stopCamera();
  isReading = true;
  const revision = ++readerRevision;
  $('decoded-content').value = '';
  showInspection('');
  $('copy-content').disabled = true;
  $('use-content').disabled = true;
  $('open-link').hidden = true;
  readStatus(messages.reading);
  try {
    const { readImage } = await import('./reader.mjs');
    const result = await readImage(file);
    if (revision !== readerRevision) return;
    if (result !== null) showResult(result);
    else readStatus(messages.notFound, true);
  } catch (error) {
    if (revision === readerRevision) readStatus(messages[error.message] || messages.imageOnly, true);
  } finally {
    isReading = false;
    $('qr-file').value = '';
  }
}
$('qr-file').addEventListener('change', (event) => processFile(event.target.files[0]));
const dropZone = $('drop-zone');
for (const eventName of ['dragenter', 'dragover']) dropZone.addEventListener(eventName, (event) => { event.preventDefault(); dropZone.classList.add('dragging'); });
for (const eventName of ['dragleave', 'drop']) dropZone.addEventListener(eventName, (event) => { event.preventDefault(); dropZone.classList.remove('dragging'); });
dropZone.addEventListener('drop', (event) => processFile(event.dataTransfer.files[0]));
$('read-panel').addEventListener('paste', (event) => {
  const image = [...event.clipboardData.items].find((item) => item.type.startsWith('image/'));
  if (image) { event.preventDefault(); processFile(image.getAsFile()); }
});
$('copy-content').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('decoded-content').value); readStatus(messages.copied); }
  catch { $('decoded-content').select(); readStatus(messages.copyFailed, true); }
});
$('use-content').addEventListener('click', async () => {
  $('field-text').value = $('decoded-content').value;
  await changeType('text');
  changeMode('create');
  $('field-text').focus();
});
$('start-camera').addEventListener('click', async () => {
  if (!navigator.mediaDevices?.getUserMedia) { readStatus(messages.cameraUnavailable, true); return; }
  stopCamera();
  const revision = cameraRevision;
  $('start-camera').disabled = true;
  $('stop-camera').hidden = false;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 } }, audio: false });
    if (revision !== cameraRevision || mode !== 'read' || document.hidden) {
      stream.getTracks().forEach((track) => track.stop());
      return;
    }
    cameraStream = stream;
    cameraVideo.srcObject = stream;
    cameraVideo.hidden = false;
    await cameraVideo.play();
    readStatus(messages.cameraActive);
    const { decodeFrame } = await import('./reader.mjs');
    const scan = () => {
      if (revision !== cameraRevision) return;
      if (cameraVideo.readyState >= 2 && cameraVideo.videoWidth) {
        const result = decodeFrame(cameraVideo, cameraVideo.videoWidth, cameraVideo.videoHeight, scratchCanvas, 960);
        if (result !== null) { showResult(result); return; }
      }
      scanTimer = setTimeout(scan, 200);
    };
    scan();
  } catch (error) {
    if (revision === cameraRevision) { stopCamera(); readStatus(messages.cameraFailed, true); }
  }
});

if (!navigator.mediaDevices?.getUserMedia) {
  $('start-camera').disabled = true;
  $('start-camera').title = ui.notSupported;
}
render();
changeMode(data.defaultMode);
