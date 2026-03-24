# Data & Content Management

This guide explains how content is managed in this project, specifically the track information that powers the music portfolio.

## The Source of Truth: `tracks.json`

The file `content/tracks.json` is the **single source of truth** for all track metadata. It drives:

1.  **The Tracks Listing Page:** The `/tracks/` page renders and filters tracks client-side.
2.  **Detail Pages:** Individual `/track-info/:id/` pages are generated at build-time.
3.  **Image Caching:** The service worker uses this file to know which images to pre-cache.

---

## Track Object Guide

Each entry in `tracks.json` should follow this structure:

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | **Required.** Unique slug (used for URLs and folder names). |
| `title` | `string` | **Required.** Display title of the track. |
| `audioSrc` | `string` | **Required.** Path to the audio file (relative to `src/public/`). |
| `description`| `string` | Short summary for the track card. |
| `genre` | `string` | Music genre (used for filtering). |
| `imgSrc` | `string` | Path to the cover image. |
| `date` | `string` | Release date (Format: `YYYY-MM-DD`). |
| `duration` | `string` | Track length (Format: `mm:ss`). |

---

## Build-Time Generation

To keep the site fast and SEO-friendly, we generate static HTML for every track detail page.

### Generation Workflow

1.  **Validation:** `scripts/generate-track-info.mjs` validates that each track has an `id`, `title`, and `audioSrc`.
2.  **Output:** For each track, a folder `src/track-info/<id>/` is created containing an `index.html`.
3.  **Automation:** This process is automatically run by `pnpm predev` and `pnpm prebuild`.

> [!IMPORTANT]
> If you modify `tracks.json` while the dev server is running, you may need to restart it or manually run `pnpm generate:track-info` to see changes on the detail pages.

---

## Image Caching (Service Worker)

We use a vanilla JavaScript service worker to cache images for offline use.

1.  `scripts/generate-image-cache-manifest.mjs` scans `src/public/` and `tracks.json` for images.
2.  It generates `src/public/track-images.json`.
3.  The service worker (`src/public/service-worker.js`) pre-caches these files during installation.

> [!TIP]
> To update the cache after adding new images, ensure you run `pnpm generate:image-cache-manifest` (included in `prebuild`/`predev`).
