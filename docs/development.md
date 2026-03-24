# Development Guide

This document explains how to work on the project locally, the build pipeline, and provides a reference for all project scripts.

## Getting Started

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

### 2. Local Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Start the development server:
    ```bash
    pnpm dev
    ```

> [!NOTE]
> `pnpm dev` automatically runs `predev`, which generates required track data and image manifests before starting the server.

---

## Development Workflow

1.  **Edit Source:** Modify files in `src/`, `content/`, or `scripts/`.
2.  **Track Content:** If you update `content/tracks.json`, the generated pages will be refreshed automatically by the `predev` script.
3.  **Production Check:** Always test your changes with a production build before deploying.

---

## Script Reference

### Core Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the Vite development server with hot reload. |
| `pnpm build` | Creates an optimized production bundle in `dist/`. |
| `pnpm preview` | Serves the production build locally for verification. |

### Build Variants

- `pnpm build:local`: Builds for a root-path deployment (e.g., Vercel).
- `pnpm build:github-pages`: Builds for subpath deployment (`/personal-profile/`).

### Generation Tools

- `pnpm generate:track-info`: Manually generates track detail pages.
- `pnpm generate:image-cache-manifest`: Manually rebuilds the service worker image cache.

---

## Project Organization

### Key Directories

- `src/`: Main source code.
- `content/`: Data sources (JSON).
- `scripts/`: Build-time automation.
- `docs/`: Detailed technical documentation.

> [!TIP]
> For more details on the project's technical architecture, see the **[Architecture Guide](./architecture.md)**.
