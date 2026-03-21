# Deployment Guide

This project can be deployed in two ways:

1. **Root deployment** on Vercel or a local static host, where the site is served from `/`.
2. **Subpath deployment** on GitHub Pages, where the site is served from `/personal-profile/`.

The project uses the `BASE_URL` environment variable to generate the correct paths for:

- page links
- images
- audio files
- generated track pages
- the service worker
- the image cache manifest

## Prerequisites

Before deploying, make sure you have:

- **Node.js** installed
- **pnpm** installed
- dependencies installed with:

```bash
pnpm install
```

## How deployment works

The Vite config reads `BASE_URL` and uses it as the active Vite `base`.

- For **Vercel/local/root** deployments, use `BASE_URL=/`
- For **GitHub Pages** deployments, use `BASE_URL=/personal-profile/`

During builds, the project also regenerates:

- `src/track-info/*/index.html`
- `src/public/track-images.json`

That makes sure generated HTML and service-worker cache data match the deployment target.

---

## Deploying to Vercel

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run the Vercel build locally

```bash
pnpm build:vercel
```

This script sets `BASE_URL=/` and then runs the production build.

### 3. Verify the output

After the build finishes, the production files are in:

```text
dist/
```

### 4. Configure Vercel

In Vercel, set:

- **Framework preset:** Vite
- **Build command:** `pnpm build:vercel`
- **Output directory:** `dist`

### 5. Deploy

Push the repository to the branch connected to Vercel, or deploy through the Vercel dashboard.

Because this deployment uses `/` as the base path, links like these resolve from the site root:

- `/tracks/`
- `/contact/`
- `/mp3/...`
- `/album-cover/...`

---

## Deploying to GitHub Pages

GitHub Pages serves this site from a repository subpath.
For this repository, the expected public base path is:

```text
/personal-profile/
```

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run the GitHub Pages build

```bash
pnpm build:github-pages
```

This script sets:

```text
BASE_URL=/personal-profile/
```

and then runs the full production build.

### 3. Verify the output

After the build finishes, the built files are in:

```text
dist/
```

You should expect generated paths such as:

- `/personal-profile/tracks/`
- `/personal-profile/contact/`
- `/personal-profile/mp3/...`
- `/personal-profile/album-cover/...`
- `/personal-profile/track-info/...`

### 4. Publish `dist/` to GitHub Pages

A common approach is to publish the contents of `dist/` to the GitHub Pages branch or artifact used by your workflow.

Typical options:

- deploy `dist/` with a GitHub Actions workflow
- publish `dist/` to `gh-pages`
- use Pages build artifacts if your workflow uploads them

### 5. Configure Pages

In GitHub repository settings:

- open **Settings → Pages**
- choose the branch or workflow that publishes `dist/`

---

## Deployment checklist

Before publishing to either platform, verify these areas:

### Navigation

- Home link works
- About page works
- Tracks page works
- Contact page works
- Generated track detail pages open correctly

### Media

- Track cover images load
- Hero image loads
- Audio files play

### Generated pages

- `/track-info/<id>/` pages render correctly
- Back link returns to the tracks page

### Service worker

- service worker registers successfully
- image manifest loads successfully
- cached images still resolve under the active base path

---

## Recommended commands

### Root/Vercel deployment build

```bash
pnpm build:vercel
```

### GitHub Pages deployment build

```bash
pnpm build:github-pages
```

### Generic production build

```bash
pnpm build
```

This generic build uses the current environment value of `BASE_URL`. If `BASE_URL` is not set, the app defaults to root deployment behavior.
