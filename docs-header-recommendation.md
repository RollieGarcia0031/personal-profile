# Reusable Header Strategy (Modern + SEO-safe)

Short answer: **yes** — the modern standard is to use a **layout component in an SSR/SSG framework** so header markup is rendered in HTML at build/request time.

## What is the standard way today?

For marketing sites, portfolios, blogs, and most content-heavy pages:

1. Put global UI (header, footer, nav) in a **shared layout component**.
2. Render pages with **SSR/SSG** (server-rendered or statically generated HTML).
3. Keep content/metadata page-specific (`<title>`, meta description, canonical).

Common tools used in production:

- **Astro** (very common for content/portfolio sites, excellent SEO defaults)
- **Next.js / Nuxt / SvelteKit** (SSR frameworks with shared layouts)
- **11ty** for very lightweight static templating

## Development process: “If it’s build-time, how do I preview it?”

Great question. In modern tooling, build-time includes can still be visible in development.

In this repo, we use a Vite HTML transform plugin with a header partial:

- Source of truth: `src/partials/header.html`
- Marker in each page: `<!-- @site-header -->`
- Vite injects the partial in **both** `npm run dev` and `npm run build`

So during development, you still see the real combined page in the browser, and when you edit the partial, refresh (or HMR reload) shows updates.

## Why this is SEO-safe

Search engines receive complete HTML directly (including `<header><nav>...</nav></header>`), without relying on JavaScript execution to inject core navigation.

## For this repository (current plain multi-page Vite setup)

The practical approach is:

- Keep one shared partial at `src/partials/header.html`
- Keep the `<!-- @site-header -->` marker in each HTML page/template
- Let Vite inject partials in dev + build
- Keep links as normal `<a href="...">` anchors

## What to avoid as your primary approach

- Runtime DOM injection for critical layout (for example `fetch('/header.html')` then `innerHTML = ...`) for pages where SEO is important.

## Migration recommendation (if you want the most modern setup)

If you plan to evolve this project, move to **Astro + shared `Layout.astro` + `Header.astro`**:

- You write the header once.
- Every page imports the same layout.
- Final output remains crawlable static HTML.
- You can still add interactive JS only where needed.
