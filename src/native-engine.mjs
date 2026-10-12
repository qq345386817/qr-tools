import { makePayload, cleanLink } from './content.mjs';
import { inspectContent } from './inspection.mjs';
import { parseBatch, batchFilename, exampleCsv } from './batch.mjs';
import { makeCalendar } from './calendar.mjs';
import { zipSync } from 'fflate';

export function perform(operation, args) {
  switch (operation) {
    case 'payload': return makePayload(args.type, args.fields);
    case 'inspect': return inspectContent(args.value);
    case 'batch': return parseBatch(args.value);
    case 'calendar': return makeCalendar(args);
    case 'clean': return cleanLink(args.value);
    case 'template': return exampleCsv;
    case 'zip': {
      if (!args.entries.length || args.entries.length > 100) throw new Error('csvLimit');
      const files = Object.fromEntries(args.entries.map((entry, index) => [batchFilename(index, entry.name, args.extension), Uint8Array.from(atob(entry.base64), (char) => char.charCodeAt(0))]));
      const bytes = zipSync(files, { level: 0 });
      const parts = [];
      for (let index = 0; index < bytes.length; index += 32768) parts.push(String.fromCharCode(...bytes.subarray(index, index + 32768)));
      return btoa(parts.join(''));
    }
    default: throw new Error('unknownOperation');
  }
}

if (typeof window !== 'undefined' && window.webkit?.messageHandlers?.QRNative) {
  const post = (value) => window.webkit.messageHandlers.QRNative.postMessage(value);
  window.QRNative = {
    async run({ id, operation, args }) {
      try { post({ id, result: await perform(operation, args) }); }
      catch (error) { post({ id, error: error.message }); }
    },
  };
  post({ ready: true });
}
