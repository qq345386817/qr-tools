import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const port = Number(process.env.PORT || 4173);
const mime = { '.html': 'text/html; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.ico': 'image/x-icon', '.txt': 'text/plain', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = resolve(root, `.${pathname}`);
    if (!file.startsWith(`${root}${sep}`) && file !== root) throw new Error('invalidPath');
    if (pathname.endsWith('/')) file = resolve(file, 'index.html');
    else if (!extname(file)) file += '.html';
    if ((await stat(file)).isDirectory()) throw new Error('invalidPath');
    const content = await readFile(file);
    response.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(content);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`QR Tools: http://127.0.0.1:${port}`));
