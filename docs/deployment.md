# Deployment Guide

Detailed instructions for deploying the Personal Profile Website to various platforms.

## Deployment Strategy

The project supports two main deployment targets:
1.  **Root Deployment:** For platforms like Vercel or custom domains (e.g., `https://example.com/`).
2.  **Subpath Deployment:** For GitHub Pages (e.g., `https://user.github.io/personal-profile/`).

> [!IMPORTANT]
> The `BASE_URL` environment variable determines how links, images, and audio paths are generated. If not set, it defaults to `/`.

---

## 1. Deploying to Vercel

Vercel is the recommended platform for root-level deployments.

### Configuration

- **Framework Preset:** `Vite`
- **Build Command:** `pnpm build:vercel`
- **Output Directory:** `dist`

### Local Verification

To test a Vercel-like build locally:
```bash
pnpm build:local
pnpm preview
```

---

## 2. Deploying to GitHub Pages

GitHub Pages serves the site from a repository subpath: `/personal-profile/`.

### Deployment Steps

1.  **Build Code:**
    ```bash
    pnpm build:github-pages
    ```
2.  **Publish:** Deploy the contents of the `dist/` directory to your GitHub Pages branch (e.g., using `gh-pages` package or GitHub Actions).

### Manual Verification

To verify the subpath build locally:
```bash
BASE_URL=/personal-profile/ pnpm build
```

---

## Deployment Checklist

- [ ] **Navigation:** All links (Home, About, Tracks, Detail Pages) work correctly.
- [ ] **Media:** Audio files play and images load on all pages.
- [ ] **SEO:** `/track-info/` pages are correctly generated.
- [ ] **Offline Cache:** Service worker registers and pre-caches images.

> [!TIP]
> Check the browser's DevTools "Network" tab to ensure all assets are loading from the correct path (with or without the subpath).
