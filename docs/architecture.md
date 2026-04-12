# Project Architecture

This document explains the technical architecture of the Personal Profile Website, including the custom web component system, build-time page generation, and HTML partial injection.

## Technical Stack

- **Build Tool:** [Vite](https://vitejs.dev/)
- **Logic:** Vanilla JavaScript (ES modules)
- **Styling:** Vanilla CSS
- **Icons:** [Bootstrap Icons](https://icons.getbootstrap.com/)

---

## 1. Runtime UI Layers

The UI is split into three reusable layers:

1. **Page entry scripts** (for example `src/main.js`, `src/tracks/main.js`) initialize page-specific behavior.
2. **Shared header behavior** (`src/partials/header.js`) controls mobile nav and light/dark theme state.
3. **Web Components** under `src/assets/js/components/` encapsulate reusable interactive blocks.

---

## 2. Custom Web Components

The project uses vanilla **Web Components** for reusable music UI.

### Component Structure

Each component folder typically contains:

- `*.js`: class extending `HTMLElement`
- `*-template.js`: template renderer that returns HTML
- `style.css`: component styles

Current component modules:

- `audio-player`
- `track-option`

### Component Workflow

1. Component class reads attributes through getters.
2. `connectedCallback()` injects template HTML.
3. Page entry scripts register elements using `customElements.define()`.
4. A lightweight pub/sub state utility (`createPubSub`) coordinates multi-player behavior.

---

## 3. HTML Partials System (Build-Time)

Shared header/footer markup is injected by the custom Vite plugin `site-partials` in `vite.config.js`.

### Partial Sources

- `templates/partials/header.html`
- `templates/partials/footer.html`

These templates use `__BASE_URL__` placeholders so links resolve correctly for both root (`/`) and GitHub Pages subpath (`/personal-profile/`) deployments.

### Injection Markers

Any HTML page under `src/` can include:

```html
<!-- @site-header -->
<main>...</main>
<!-- @site-footer -->
```

During `vite dev` and `vite build`, the plugin replaces markers with resolved partial HTML.

### Related Assets

- Header/footers styles: `src/partials/header.css`, `src/partials/footer.css`
- Header interactions: `src/partials/header.js`

---

## 4. Build Inputs and Generated Pages

`vite.config.js` scans `src/**/index.html` as rollup inputs (excluding `src/track-info-fake/**`).

Track detail pages are generated before both dev and build via scripts:

- `scripts/generate-track-info.mjs`
- `scripts/generate-image-cache-manifest.mjs`

This is wired through `predev` and `prebuild` scripts in `package.json`.

---

## 5. Theme Management

- **Storage:** `localStorage` key `theme`
- **Values:** `light` / `dark`
- **Fallback:** `prefers-color-scheme: dark`
- **Application:** `document.documentElement[data-theme]`

The toggle button label/icon and accessibility text (`aria-label`, `title`) are synchronized when theme changes.
