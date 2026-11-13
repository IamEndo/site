# PayDeck Website

Source of [paydeck.org](https://paydeck.org): the landing page, the documentation
and the browser-based firmware installer for PayDeck, the open-source,
non-custodial point-of-sale for Nexa payments.

The firmware lives in a separate repository: <https://gitlab.com/IamEndo/paydeck>.

## Stack

- Next.js 16 (App Router, every page statically prerendered), React 19, TypeScript (strict)
- Tailwind CSS 4
- three.js via `@react-three/fiber` / `@react-three/drei` for the two 3D models
- Node.js 22 or newer

## Layout

```
app/
├── layout.tsx, page.tsx        Root layout and landing page
├── globals.css
├── robots.ts, sitemap.ts
├── _data/                      Landing page content (features, steps, FAQ, device, releases)
├── _components/
│   ├── layout/                 Header, Footer
│   ├── sections/               Hero, Features, Device, HowItWorks, Screens, Comparison, Security, FAQ
│   └── ui/                     Button, Accordion, ScrollReveal, ThemeToggle, DeviceScreen, Device3D, Board3D
└── docs/
    ├── layout.tsx
    ├── _data/navigation.ts     Sidebar structure; also drives the sitemap and prev/next links
    ├── _data/search-index.json Generated, see below
    ├── _components/            DocsHeader, DocsSidebar, DocsArticle (breadcrumb, "On this page"),
    │                           DocsSearch, DocsBlocks (shared page building blocks)
    └── <section>/<page>/page.tsx

lib/
├── constants.ts                Site links, navigation, FIRMWARE_VERSION
├── docs-metadata.ts            Per-page canonical + Open Graph metadata for docs pages
└── slug.ts                     Heading id generation

public/
├── firmware/                   Web-flasher images and manifests
├── screens/                    Firmware screen renders (see "Device screenshots")
├── hdri/                       Lighting maps for the 3D scenes
├── .well-known/security.txt
└── vendor/esp-web-tools-*/     Vendored flasher library (unmodified, with SHA256SUMS)

scripts/build-docs-index.mjs    Builds the docs search index and the per-page heading list
scripts/shrink-hdr.mjs          Downsamples a Radiance .hdr lighting map
```

## Development

```bash
npm install
npm run dev          # development server
npm run typecheck    # tsc --noEmit
npm run build        # regenerates the search index, then builds
npm start            # serves the build on $PORT
```

## Common tasks

**Add a docs page.** Create `app/docs/<section>/<page>/page.tsx`, export
`metadata = docsMetadata("/docs/<section>/<page>", { title, description })`, wrap the
content in `<DocsArticle>`, and add the page to `app/docs/_data/navigation.ts`.
Every `<h2>` automatically gets an anchor and appears under "On this page".
Run `npm run docs:index` and commit the updated `search-index.json` and `toc.json`.
If you rename a page, add a redirect in `next.config.mjs`.

**Publish a firmware release.**

1. Put the merged images in `public/firmware/` and update both manifests.
2. Set `FIRMWARE_VERSION` in `lib/constants.ts` (the hero, the 3D label, structured
   data and the flasher file names all read it).
3. Update the sizes and SHA-256 hashes in `app/docs/install/web-flasher/page.tsx`.
4. Add the release to `app/_data/releases.ts` (feeds the Release Notes page and
   the Atom feed at `/releases.xml`).
5. Check the docs against the firmware changelog for anything the release
   added or changed.

**Yearly.** `public/.well-known/security.txt` carries an `Expires` date
(currently 2027-11-01). Move it forward before it passes.

**Device screenshots.** The images in `public/screens/` are rendered by the
firmware's host simulator (`tests/sim`, `make gallery` in the firmware
repository) and recompressed. Re-copy them when the firmware UI changes; use
them through `<DeviceScreen name="..." />`.

**3D lighting maps.** `public/hdri/*.hdr` are 256x128 reductions of two CC0
Poly Haven maps, made with `scripts/shrink-hdr.mjs`.

**Upgrade the flasher library.** Vendor the new `dist/web/` files into a new
versioned directory under `public/vendor/`, verify the tarball against the npm
registry integrity value, regenerate `SHA256SUMS`, and update `ESP_WEB_TOOLS_SRC`
in `app/docs/install/web-flasher/_components/Flasher.tsx`.

## Security headers

`next.config.mjs` sends HSTS, `nosniff`, frame denial, a referrer policy and a
permissions policy on every response, plus an enforced Content-Security-Policy
that only allows same-origin resources. Anything new loaded from another host
(a script, font, image or API) has to be added to that policy or vendored.
