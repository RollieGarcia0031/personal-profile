# Personal Profile Website

> Welcome to the repository for Rollie’s personal music portfolio website.

This project is a modern, high-performance web application built with **Vite** and **Vanilla JavaScript**. It showcases a music catalog with custom audio playback, build-time generated track detail pages, shared HTML partials, and GitHub Pages automation.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```
2. **Start development:**
   ```bash
   pnpm dev
   ```

---

## 🗺️ Documentation Map

- **[Development Guide](docs/development.md):** Local setup, scripts, and day-to-day workflow.
- **[Deployment Guide](docs/deployment.md):** Root vs GitHub Pages builds and CI deployment behavior.
- **[Architecture Guide](docs/architecture.md):** Component model, partial HTML system, and build pipeline.
- **[Data & Content Management](docs/data-management.md):** `tracks.json` editing and generated track pages.

---

## 📁 Project Structure

```text
├── .github/workflows/              # CI/CD workflows (GitHub Pages deploy)
├── content/                        # Source content (tracks.json)
├── docs/                           # Project documentation
├── scripts/                        # Build-time content/cache generators
├── templates/partials/             # Shared HTML partial templates
├── src/
│   ├── assets/                     # JS components, state utils, shared styles, fonts
│   ├── partials/                   # Header behavior JS + header/footer CSS
│   ├── about/ contact/ tracks/     # Route-level pages
│   ├── track-info/                 # Generated detail pages
│   └── public/                     # Static media (audio, images, service worker assets)
└── vite.config.js                  # Vite + custom site-partials plugin
```

---

## 🌟 Key Features

- **Custom Web Components:** Reusable `audio-player` and `track-option` elements.
- **HTML Partials Injection:** Shared header/footer injected at build/dev via Vite plugin.
- **Static Generation:** Track detail pages generated from `content/tracks.json`.
- **GitHub Pages CI Deployment:** Workflow builds with repo subpath base and publishes `dist`.
- **Service Worker Support:** Offline-friendly image caching strategy.

---

## License

This project is private and intended for personal use.
