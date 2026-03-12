# `src/partials` guide

This folder contains **shared HTML partials** that are injected into every page at build/dev time:

- `header.html`
- `footer.html`

These are not custom elements/web components by themselves. Instead, they are reusable HTML fragments wired through a Vite plugin (`site-partials`) in `vite.config.js`.

## How the partial system works

1. In each page (for example `src/index.html`, `src/about/index.html`, `src/tracks/index.html`), you place markers:

   ```html
   <!-- @site-header -->
   <!-- @site-footer -->
   ```

2. In `vite.config.js`, the `sitePartialsPlugin()` function reads:
   - `src/partials/header.html`
   - `src/partials/footer.html`

3. During `transformIndexHtml`, the plugin replaces each marker string with the partial content.

So every HTML entry can stay small while still sharing a consistent header/footer layout.

## How to use the existing partials

### 1) Add placeholders to any new page

Inside a page under `src/**/index.html`, add:

```html
<body>
  <!-- @site-header -->

  <main>
    <!-- page-specific content -->
  </main>

  <!-- @site-footer -->
</body>
```

### 2) Include the CSS/JS dependencies expected by the partials

Current partial behavior relies on existing shared assets:

- Header interactions (open/close mobile menu) are handled by `src/assets/js/header.js`.
- Header/footer icon markup uses Bootstrap Icons classes (`bi ...`), so the icon CSS must be loaded.

For root-level pages (like `src/index.html`):

```html
<link rel="stylesheet" href="./assets/font/bootstrap-icons.css" />
<script src="./assets/js/header.js" type="module" defer></script>
```

For nested pages (like `src/about/index.html`):

```html
<link rel="stylesheet" href="../assets/font/bootstrap-icons.css" />
<script src="../assets/js/header.js" type="module" defer></script>
```

Use the correct relative path depth for each page.

## How to customize existing partials

### Edit structure/content

- Update `header.html` to change nav links, labels, or menu button markup.
- Update `footer.html` to change contact links, CTA text, or layout sections.

Because these files are injected globally, a single edit updates all pages that include the placeholders.

### Edit styles

Styles for these partials live outside this folder:

- `src/assets/styles/header.css`
- `src/assets/styles/footer.css`
- `src/assets/styles/global.css` (shared utilities/variables)

Keep structure changes in partial files and visual changes in CSS files when possible.

### Edit behavior

Header menu behavior is in `src/assets/js/header.js` and depends on these IDs/classes:

- `#menu-collapse-btn`
- `#menu-close-btn`
- `header nav` with class toggling (`hidden`)

If you rename those selectors in `header.html`, also update `header.js`.

## How to add a new reusable partial/component

If you want another reusable HTML fragment (example: promo banner), follow this pattern:

### 1) Create a partial file

Example:

- `src/partials/promo-banner.html`

### 2) Add a placeholder in page HTML

Example marker:

```html
<!-- @promo-banner -->
```

### 3) Extend `sitePartialsPlugin()` in `vite.config.js`

Read the new file and replace the new marker:

```js
const promoBannerPartialPath = resolve(__dirname, 'src/partials/promo-banner.html')

function sitePartialsPlugin() {
  return {
    name: 'site-partials',
    transformIndexHtml(html) {
      const headerPartial = readFileSync(headerPartialPath, 'utf8')
      const footerPartial = readFileSync(footerPartialPath, 'utf8')
      const promoBannerPartial = readFileSync(promoBannerPartialPath, 'utf8')

      return html
        .replace('<!-- @site-header -->', headerPartial)
        .replace('<!-- @promo-banner -->', promoBannerPartial)
        .replace('<!-- @site-footer -->', footerPartial)
    }
  }
}
```

### 4) Add any styles/scripts the new partial requires

- Add CSS to an appropriate stylesheet and include it from pages that need it.
- Add JS module behavior if needed and ensure the script path is correct for each page depth.

## Tips and limitations

- `String.replace(...)` only replaces the first matching marker. Keep one marker occurrence per page unless you intentionally update logic.
- Markers are plain text, so spelling must match exactly (including `@site-header`/`@site-footer`).
- Partial injection happens at dev/build HTML transform time, not dynamically in the browser.
