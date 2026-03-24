# Personal Profile Website

> Welcome to the repository for Rollie’s personal music portfolio website.

This project is a modern, high-performance web application built with **Vite** and **Vanilla JavaScript**. It showcases a music catalog with custom audio playback, automated track detail page generation, and offline-first image caching.

## 🚀 Quick Start

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```
2.  **Start development:**
    ```bash
    pnpm dev
    ```

---

## 🗺️ Documentation Map

Explore the detailed guides below to learn more about the project:

- **[Development Guide](docs/development.md):** Local setup, script reference, and development workflow.
- **[Deployment Guide](docs/deployment.md):** How to deploy to Vercel and GitHub Pages.
- **[Architecture Guide](docs/architecture.md):** Technical stack, custom web components, and partials system.
- **[Data & Content Management](docs/data-management.md):** How `tracks.json` works and how pages are generated.

---

## 📁 Project Structure

```text
├── content/         # Site content (tracks.json)
├── docs/            # Project documentation
├── scripts/         # Build-time generation scripts
├── src/             # Application source code
│   ├── assets/      # Styles, fonts, and JS modules
│   ├── about/       # About page
│   ├── tracks/      # Tracks listing page
│   ├── track-info/  # Generated track detail pages
│   └── partials/    # Shared HTML fragments (header/footer)
└── vite.config.js   # Build and plugin configuration
```

---

## 🌟 Key Features

- **Custom Audio Player:** Built using vanilla Web Components.
- **Static Site Generation:** Automated build-time HTML generation for track pages.
- **Service Worker:** Offline image caching for a seamless user experience.
- **Theme Support:** Native light and dark mode toggling.

---

## License

This project is private and intended for personal use.
