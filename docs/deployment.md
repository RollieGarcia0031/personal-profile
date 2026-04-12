# Deployment Guide

Detailed instructions for deploying the Personal Profile Website to root domains and GitHub Pages.

## Deployment Strategy

The site supports two deployment bases:

1. **Root deployment** (`/`) for Vercel or custom domains.
2. **Repository subpath deployment** (`/personal-profile/`) for GitHub Pages.

> [!IMPORTANT]
> `BASE_URL` controls generated asset/link paths at build time via Vite config normalization.

---

## 1. Build Targets

### Root build (Vercel/custom host)

```bash
pnpm build:vercel
```

Equivalent to `BASE_URL=/ pnpm build`.

### GitHub Pages build

```bash
pnpm build:github-pages
```

Equivalent to `BASE_URL=/personal-profile/ pnpm build`.

### Local verification

```bash
pnpm build:local
pnpm preview
```

---

## 2. Automatic GitHub Pages Deployment (GitHub Actions)

Workflow file: `.github/workflows/gh-page-deploy.yml`

### Trigger behavior

The workflow runs on:

- `push` to `dev` and `main`
- `pull_request` targeting `dev` and `main`

### Job flow (`gh_build_deployment`)

1. Checkout repository.
2. Install pnpm.
3. Setup Node.js (`lts/*`) with pnpm cache.
4. Install dependencies and run `pnpm build:github-pages`.
5. Publish `dist/` using `npx gh-pages` with `${{ secrets.GITHUB_TOKEN }}`.

### Required repository settings

- **Actions permissions:** allow workflow write access to contents (already set in workflow).
- **Pages source:** use the branch that `gh-pages` publishes to (typically `gh-pages`).

---

## 3. Manual Deployment Fallback

If GitHub Actions is unavailable, deploy manually:

```bash
pnpm install
pnpm build:github-pages
npx gh-pages -d dist
```

---

## 4. Deployment Validation Checklist

- [ ] Header/footer links resolve under correct base path.
- [ ] Track image/audio assets load without 404s.
- [ ] Generated pages under `/track-info/*/` exist in `dist`.
- [ ] Service worker and cached image manifest are emitted.
- [ ] Navigation works on Home, About, Tracks, Contact, and Track detail pages.
