# Personal Profile Website

This repository contains Rollie’s personal music portfolio website, built with Vite and vanilla JavaScript.

## Website Overview

The site presents Rollie as a producer focused on anime-style, OPM, and classical fusion music. It includes:

- **Home page** with a hero introduction, genre highlights, featured demo tracks, and contact/social links.
- **About page** with background details such as DAWs, instruments, inspirations, goals, and location.
- **Tracks page** that lists the full catalog from `content/tracks.json`, with search UI and grid/list view toggles.
- **Track detail pages** generated from track data, each with artwork, metadata, playback controls, and story/description sections.

The project uses custom web components for audio playback and track cards, with shared header/footer styling and reusable assets.


## Offline image caching (Service Worker)

The app now registers a vanilla JavaScript service worker that caches image assets so cover art and hero images load faster and continue to work offline after first visit.

- Service worker file: `src/public/service-worker.js`
- Registration script: `src/assets/js/register-service-worker.js`
- Image cache manifest generator: `scripts/generate-image-cache-manifest.mjs`
- Generated manifest consumed by service worker: `src/public/track-images.json`

### How cached images are selected

1. `pnpm generate:image-cache-manifest` scans `src/public/**` for image files.
2. It also reads all `imgSrc` values in `content/tracks.json`.
3. Both lists are merged into `src/public/track-images.json`.
4. On install, `service-worker.js` pre-caches those image URLs.

### Updating track images correctly

When you add or change a track image:

1. Put the image file under `src/public` (for example `src/public/album-cover/new-cover.png`).
2. Update `imgSrc` in `content/tracks.json` (for example `"/album-cover/new-cover.png"`).
3. Run `pnpm generate:image-cache-manifest`.
4. Restart `pnpm dev` (or rebuild) so the newest manifest is served.

`predev` and `prebuild` already regenerate this manifest automatically.
