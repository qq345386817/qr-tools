import { trackingParameters } from './content.mjs';

function delimitedFields(value, separator = ';') {
  const parts = [];
  let current = '', escaped = false;
  for (const char of value) {
    if (escaped) { current += char; escaped = false; }
    else if (char === '\\') escaped = true;
    else if (char === separator) { parts.push(current); current = ''; }
    else current += char;
  }
  parts.push(current);
  return parts;
}

export function inspectContent(value) {
  const text = value.trim();
  const result = { type: 'text', fields: [], warnings: [], link: null };
  if (!text) return result;
  if (text.startsWith('WIFI:')) {
    result.type = 'wifi';
    const fields = Object.fromEntries(delimitedFields(text.slice(5)).filter((part) => part.includes(':')).map((part) => {
      const index = part.indexOf(':');
      return [part.slice(0, index), part.slice(index + 1)];
    }));
    for (const [key, label] of [['S', 'ssid'], ['T', 'encryption'], ['P', 'password'], ['H', 'hidden']]) {
      if (fields[key] !== undefined) result.fields.push({ label, value: fields[key], secret: key === 'P' });
    }
    return result;
  }
  if (/^BEGIN:VCARD\r?\n/i.test(text)) {
    result.type = 'contact';
    const unfolded = text.replace(/\r?\n[ \t]/g, '');
    for (const line of unfolded.split(/\r?\n/)) {
      const index = line.indexOf(':');
      if (index < 0) continue;
      const key = line.slice(0, index).split(';')[0].toUpperCase();
      const label = { FN: 'name', TEL: 'phone', EMAIL: 'email', ORG: 'company', URL: 'website' }[key];
      if (label) result.fields.push({ label, value: line.slice(index + 1).replace(/\\([nN,;\\])/g, (_, char) => /n/i.test(char) ? '\n' : char) });
    }
    return result;
  }
  if (/^SMSTO:/i.test(text)) {
    result.type = 'sms';
    const index = text.indexOf(':', 6);
    result.fields.push({ label: 'phone', value: index < 0 ? text.slice(6) : text.slice(6, index) });
    if (index >= 0) result.fields.push({ label: 'message', value: text.slice(index + 1) });
    return result;
  }
  let url;
  try { url = new URL(text); } catch { return result; }
  if (url.protocol === 'mailto:') {
    result.type = 'email';
    try { result.fields.push({ label: 'email', value: decodeURIComponent(url.pathname) }); }
    catch { result.fields.push({ label: 'email', value: url.pathname }); }
    for (const key of ['subject', 'body']) if (url.searchParams.has(key)) result.fields.push({ label: key, value: url.searchParams.get(key) });
    return result;
  }
  if (!['http:', 'https:'].includes(url.protocol)) {
    result.fields.push({ label: 'protocol', value: url.protocol });
    result.warnings.push('unsupportedScheme');
    return result;
  }
  result.type = 'link';
  result.fields.push({ label: 'hostname', value: url.hostname }, { label: 'protocol', value: url.protocol }, { label: 'path', value: url.pathname });
  if (url.port) result.fields.push({ label: 'port', value: url.port });
  for (const [name, value] of url.searchParams) result.fields.push({ label: 'parameter', name, value });
  if (url.hash) result.fields.push({ label: 'fragment', value: url.hash });
  if (url.protocol === 'http:') result.warnings.push('insecure');
  if (url.username || url.password) result.warnings.push('credentials');
  if (url.hostname.split('.').some((part) => part.startsWith('xn--'))) result.warnings.push('internationalDomain');
  if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(url.hostname) || url.hostname.startsWith('[')) result.warnings.push('ipAddress');
  if ([...url.searchParams.keys()].some((key) => trackingParameters.has(key.toLowerCase()))) result.warnings.push('tracking');
  // Credential-bearing links require editing rather than silently carrying credentials to another site.
  if (!url.username && !url.password) result.link = url.href;
  return result;
}
