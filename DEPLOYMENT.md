# QR Tools Deployment

Deploy this directory as the document root for:

`https://qrtools.luopeike.com`

## Online Tools

The homepage and three dedicated tools are generated in all eight site languages:

- `/`: link, text, Wi-Fi, email, SMS and vCard generation
- `/wifi-qr-code-generator`: Wi-Fi generator
- `/contact-qr-code-generator`: vCard generator
- `/qr-code-reader`: local image and camera decoding

QR input, passwords and images are processed in the browser. There is no account,
server upload, analytics event containing QR content, or persistent history.
Camera access is optional and starts only after a user clicks its button. Camera
tracks stop when the user changes modes, hides the tab, leaves the page, or a code
is found. Clipboard and file sharing depend on browser support; PNG/SVG download
is available independently.

The committed HTML and `script/` bundles can be served directly by Cloudflare
Pages. No build step is required on the host. To regenerate them after editing
`src/`, use Node.js 22 or later:

```sh
npm ci
npm run build
npm test
```

`src/locales.mjs` owns localized labels and page metadata. `scripts/build.mjs`
generates the tool pages and adds their clean canonical URLs to `sitemap.xml`.
The QR encoder and image decoder are bundled locally; reading loads the decoder
only when needed. Dependency versions are locked in `package-lock.json`.

For a local preview, run `npm run dev` and open `http://127.0.0.1:4173`. Set `PORT`
to another value if that port is occupied. This preview server emulates clean
Cloudflare page routes and is for local development only.

## Redirects

The previous public path was:

`http://luopeike.com/qr-tools`

Recommended redirects:

- `http://luopeike.com/qr-tools/` -> `https://qrtools.luopeike.com/`
- `http://luopeike.com/qr-tools/index.html` -> `https://qrtools.luopeike.com/`
- `http://luopeike.com/qr-tools/help.html` -> `https://qrtools.luopeike.com/help`
- `http://luopeike.com/qr-tools/help_win.html` -> `https://qrtools.luopeike.com/help_win`
- `http://luopeike.com/qr-tools/support.html` -> `https://qrtools.luopeike.com/support`
- `http://luopeike.com/qr-tools/privacy-policy.html` -> `https://qrtools.luopeike.com/privacy-policy`

Use permanent `301` redirects once the new domain is live.

## HTTP

After HTTPS is configured and verified for `qrtools.luopeike.com`, disable plain HTTP serving for the new domain or redirect all HTTP requests to HTTPS.

## Checks

- `https://qrtools.luopeike.com/robots.txt`
- `https://qrtools.luopeike.com/sitemap.xml`
- `https://qrtools.luopeike.com/`
- `https://qrtools.luopeike.com/zh-Hans/`
- `https://qrtools.luopeike.com/zh-Hant/`
- `https://qrtools.luopeike.com/ja/`
- `https://qrtools.luopeike.com/ko/`
- `https://qrtools.luopeike.com/de-DE/`
- `https://qrtools.luopeike.com/fr-FR/`
- `https://qrtools.luopeike.com/es-ES/`
