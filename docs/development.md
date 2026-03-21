# Development Guide

This document explains how to work on the project locally, how the build pipeline works, and what each `package.json` script does.

## Project overview

This is a Vite-based multi-page site with:

- a homepage
- About, Tracks, and Contact pages
- generated track detail pages under `src/track-info/`
- a service worker that pre-caches image assets

The project supports both:

- root deployment (`/`)
- subpath deployment (`/personal-profile/`)

That is why URL handling is base-aware in both runtime code and generator scripts.

---

## Getting started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start the local development server

```bash
pnpm dev
```

This starts the Vite development server.

Before the dev server starts, `predev` runs automatically to generate supporting files.

---

## Development workflow

A typical workflow looks like this:

1. install dependencies
2. run `pnpm dev`
3. edit source files in `src/`, `content/`, or `scripts/`
4. if you update track content, regenerate generated files when needed
5. test with production builds before merging

### When editing track data

Track content lives in:

```text
content/tracks.json
```

That file drives:

- the tracks listing page
- generated track detail pages
- the image cache manifest

If you change track metadata, audio paths, image paths, or IDs, make sure generated artifacts stay in sync.

---

## Script reference

Below is a clear explanation of every script in `package.json`.

### `pnpm dev`

```bash
pnpm dev
```

Starts the Vite development server.

What it is used for:

- local UI development
- testing changes in the browser
- verifying page structure, links, styles, and interactions

Important note:

- `predev` runs automatically before `dev`

---

### `pnpm predev`

```bash
pnpm predev
```

Runs setup tasks before local development starts.

It currently does two things:

1. regenerates track detail pages
2. regenerates the image cache manifest

This helps keep development output aligned with the latest track content.

---

### `pnpm build`

```bash
pnpm build
```

Runs the production Vite build.

What happens:

1. `prebuild` runs automatically first
2. Vite builds the app into `dist/`

This script uses the current environment value of `BASE_URL`.
If `BASE_URL` is not provided, the app defaults to root deployment behavior.

---

### `pnpm prebuild`

```bash
pnpm prebuild
```

Runs all generation steps needed before a production build.

It does:

1. `pnpm generate:track-info`
2. `pnpm generate:image-cache-manifest`

Use this when you want to refresh generated content without running a full Vite build manually.

---

### `pnpm build:local`

```bash
pnpm build:local
```

Builds the site for a root-path deployment using:

```text
BASE_URL=/
```

Best for:

- local production verification
- testing the same path setup used by Vercel

---

### `pnpm build:vercel`

```bash
pnpm build:vercel
```

Builds the site for Vercel using:

```text
BASE_URL=/
```

This is effectively the root-deployment production build.

Best for:

- Vercel deployments
- matching production behavior when the app is hosted at the domain root

---

### `pnpm build:github-pages`

```bash
pnpm build:github-pages
```

Builds the site for GitHub Pages using:

```text
BASE_URL=/personal-profile/
```

Best for:

- subpath deployment verification
- GitHub Pages publishing

This is the script you should use when preparing Pages artifacts.

---

### `pnpm preview`

```bash
pnpm preview
```

Starts Vite's local preview server for the latest production build in `dist/`.

Best for:

- checking the built app instead of the dev server version
- smoke-testing production output locally

---

### `pnpm generate:track-info`

```bash
pnpm generate:track-info
```

Generates static track detail pages from `content/tracks.json`.

Output location:

```text
src/track-info/<track-id>/index.html
```

What it is used for:

- creating build-time track detail pages
- syncing track detail HTML with the content source
- making sure page links and asset URLs follow the active base path

---

### `pnpm generate:image-cache-manifest`

```bash
pnpm generate:image-cache-manifest
```

Generates the image manifest used by the service worker.

Output location:

```text
src/public/track-images.json
```

What it is used for:

- listing public image assets
- listing track image assets referenced by track content
- providing cache input for the service worker install step

---

## Important folders

### `src/`

Main application source.

Contains:

- page entry HTML files
- styles
- JavaScript modules
- partials
- generated track pages

### `content/`

Structured content used by the tracks experience.

Contains:

- `tracks.json`

### `scripts/`

Build-time generators and support scripts.

Contains:

- track page generation
- image cache manifest generation

### `docs/`

Project documentation.

Contains:

- deployment instructions
- development workflow guidance

---

## Recommended local checks

Before opening a PR, it is a good idea to run:

```bash
pnpm build:local
pnpm build:github-pages
```

That confirms both deployment targets still work correctly.

You should also manually check:

- navigation links
- track detail pages
- audio playback
- images
- service worker behavior

---

## Base URL behavior in development

The frontend uses a shared base-url helper and Vite's `import.meta.env.BASE_URL`.

That means:

- local development and Vercel builds resolve URLs from `/`
- GitHub Pages builds resolve URLs from `/personal-profile/`

When making changes to links, images, audio, or service worker logic, avoid hardcoding root-absolute paths unless they are intentionally generated from the active base.
