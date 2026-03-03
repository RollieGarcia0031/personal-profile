# Reusable Header Strategy (SEO-safe)

If you want one consistent header across all pages **without hurting SEO**, use a **build-time shared partial** (not client-side JS injection).

## Why this approach

- **Reusable:** one header source file used everywhere.
- **SEO-safe:** the final built HTML for each page contains the full `<header>` markup, so crawlers can read it without executing JavaScript.
- **Low maintenance:** edit once, apply everywhere.

## Recommended pattern for this project

1. Create a shared file like `src/partials/header.html`.
2. Use a build-time include system (SSG/template includes) so each page gets the same header at build.
3. Keep page-level metadata (`<title>`, `<meta name="description">`, canonical URL) unique per page.
4. Keep navigation links as normal `<a href="...">` links.

## Avoid for SEO-critical pages

- Injecting header HTML at runtime with JavaScript (e.g., `fetch('/header.html')` then `innerHTML = ...`) as your primary strategy.

## Minimal header structure guidance

- Use semantic tags: `<header>`, `<nav>`, and an accessible skip/link pattern if possible.
- Keep nav labels descriptive (good for users and crawlers).
- Ensure the same primary nav appears on all pages for consistency.

