export const trackingParameters = new Set([
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id',
  'fbclid', 'gclid', 'gbraid', 'wbraid', 'mc_cid', 'mc_eid', 'igshid',
]);

export function cleanLink(value) {
  const url = new URL(value.trim());
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('invalidLink');
  let removed = 0;
  for (const name of [...url.searchParams.keys()]) {
    if (trackingParameters.has(name.toLowerCase())) {
      url.searchParams.delete(name);
      removed += 1;
    }
  }
  return { value: removed ? url.href : value.trim(), removed };
}

const escapeWifi = (value) => value.replace(/[\\;,:"']/g, '\\$&');
const escapeVCard = (value) => value.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/[;,]/g, '\\$&');
const oneLine = (value) => value.replace(/[\r\n]/g, '');
const validEmail = (value) => /^[^\s@,;?&#]+@[^\s@,;?&#]+\.[^\s@,;?&#]+$/.test(value);

export function makePayload(type, fields) {
  const get = (name) => String(fields[name] ?? '').trim();
  if (type === 'link') {
    const value = get('url');
    if (!value) return '';
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('invalidLink');
    return value;
  }
  if (type === 'text') return String(fields.text ?? '');
  if (type === 'wifi') {
    if (!get('ssid')) return '';
    const encryption = ['WPA', 'WEP', 'nopass'].includes(get('encryption')) ? get('encryption') : 'WPA';
    const password = encryption === 'nopass' ? '' : `P:${escapeWifi(String(fields.password ?? ''))};`;
    return `WIFI:T:${encryption};S:${escapeWifi(String(fields.ssid))};${password}H:${fields.hidden ? 'true' : 'false'};;`;
  }
  if (type === 'email') {
    const address = get('email');
    if (!address) return '';
    if (!validEmail(address)) throw new Error('invalidEmail');
    const params = [];
    for (const key of ['subject', 'body']) {
      if (fields[key]) params.push(`${key}=${encodeURIComponent(String(fields[key]))}`);
    }
    return `mailto:${encodeURIComponent(address).replace(/%40/g, '@')}${params.length ? `?${params.join('&')}` : ''}`;
  }
  if (type === 'sms') {
    const phone = get('phone');
    if (!phone) return '';
    if (!/^\+?[\d ()-]+$/.test(phone)) throw new Error('invalidPhone');
    return `SMSTO:${phone.replace(/[ ()-]/g, '')}:${String(fields.message ?? '')}`;
  }
  if (type === 'contact') {
    if (!get('firstName') && !get('lastName')) return '';
    if (get('email') && !validEmail(get('email'))) throw new Error('invalidEmail');
    const rows = ['BEGIN:VCARD', 'VERSION:3.0',
      `N:${escapeVCard(get('lastName'))};${escapeVCard(get('firstName'))};;;`,
      `FN:${escapeVCard([get('firstName'), get('lastName')].filter(Boolean).join(' '))}`];
    for (const [field, key] of [['phone', 'TEL'], ['email', 'EMAIL'], ['company', 'ORG'], ['website', 'URL']]) {
      if (get(field)) rows.push(`${key}:${escapeVCard(field === 'company' ? get(field) : oneLine(get(field)))}`);
    }
    rows.push('END:VCARD');
    return rows.join('\r\n');
  }
  throw new Error('unknownType');
}

export function contrastRatio(foreground, background) {
  const luminance = (hex) => {
    const channels = hex.slice(1).match(/.{2}/g).map((part) => parseInt(part, 16) / 255);
    const linear = channels.map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  };
  return (luminance(background) + 0.05) / (luminance(foreground) + 0.05);
}

export function safeWebLink(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
