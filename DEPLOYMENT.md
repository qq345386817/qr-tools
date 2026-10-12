# QR Tools Deployment

Deploy this directory as the document root for:

`https://qrtools.luopeike.com`

## Online Tools

The homepage and seven dedicated tools are generated in all eight site languages:

- `/`: link, text, Wi-Fi, email, SMS and vCard generation
- `/wifi-qr-code-generator`: Wi-Fi generator
- `/contact-qr-code-generator`: vCard generator
- `/qr-code-reader`: local image and camera decoding
- `/bulk-qr-code-generator`: CSV batches, PNG/SVG ZIP and A4/Letter label printing
- `/qr-code-url-inspector`: local structure checks, not site reputation checks
- `/printable-qr-code-sign`: guest Wi-Fi, event and menu-link signs
- `/calendar-event-qr-code-generator`: Google Calendar template QR and ICS download

CSV input uses exactly two headers, `name,content`. Batches are limited to 100
codes and 1 MB of input. Invalid rows stay visible; only valid rows are exported.
Filenames have unique numeric prefixes and sanitized names. Each label sheet
contains eight 38 mm QR images. Codes above QR version 17 cannot use this small
label layout; download the images or shorten their content. Test physical scans
before distributing printed output. Print/PDF uses the browser print dialog.

URL inspection displays actual hostnames, parameters and local warning signs.
It does not contact a reputation API or certify a link as safe. Links require
explicit destination confirmation; credential-bearing and non-HTTP(S) URLs are
not opened. Wi-Fi passwords and raw scanned Wi-Fi contents are collapsed by
default, but remain available through explicit controls and copy/export actions.

Event times require an explicit IANA time zone. Nonexistent or repeated local
times during DST changes are rejected; the user can choose another time or UTC.
QR codes point to a Google Calendar event-entry template, not a saved event.
The separate ICS uses equivalent UTC instants and can be imported into compatible
calendars. Event content is present in the QR and ICS. Opening the Google link
sends it to Google, so no external calendar opens without a user click. No local
`blob:` URL is distributed as a cross-device event link.

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
only when needed. Batch, print and calendar code loads on first use of an advanced
tool. Dependency versions are locked in `package-lock.json`. CSV parsing uses
Papa Parse, ZIP creation uses fflate, and timezone/calendar handling uses Luxon
and ics. Bundled license notices are in `script/THIRD_PARTY_LICENSES.txt`.

## Search and AI Content

`src/seo.mjs` owns the tool-specific search titles, descriptions and visible
questions for all eight languages. Titles describe the real online tools;
answers explain static QR codes, privacy, supported formats and limitations.
Do not add fabricated ratings, expiry claims, or hosted dynamic-code features.

The build also emits `llms.txt` and a Markdown version of every tool page. The
Markdown copy comes from the same localized content as the HTML. Each HTML page
links to its Markdown alternate and to the `llms.txt` overview. These files are
optional agent-readable resources, not a Google indexing or ranking requirement.

Cloudflare Pages reads `_headers` to serve Markdown as `text/markdown` with
`X-Robots-Tag: noindex, follow`; search indexing stays focused on the canonical
HTML pages. Markdown and `llms.txt` are deliberately excluded from the sitemap.
Keep `robots.txt` crawlable and verify actual Google fetches in URL Inspection.

Old `.html` URLs permanently redirect to the clean canonical routes. They are
expected to remain in GSC's redirect exclusion list, even if someone previously
started a validation request for them. Do not remove the correct redirects just
to make that report empty. The historical Cloudflare email-protection URL is
not a content page and stays 404; page links to it were removed by `email_off`.

The build emits localized `404.html` files. Cloudflare Pages uses these to return
a real 404 for unknown paths instead of its default SPA-style homepage fallback.
All recovery links and assets use absolute paths so deeply nested missing URLs
still render correctly. Error pages are not included in `sitemap.xml`.

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
