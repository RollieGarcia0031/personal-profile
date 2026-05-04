# Testing Documentation

This document provides an overview of the testing strategy for the project, required installations, and instructions on how to run the various test suites.

The project employs three levels of testing to ensure code quality and functionality:

- **Unit Tests**: Powered by [Vitest](https://vitest.dev/), running in a Node.js environment.
- **Integration Tests**: Powered by [Vitest](https://vitest.dev/), running in a simulated browser environment using `jsdom`.
- **End-to-End (E2E) Tests**: Powered by [Playwright](https://playwright.dev/), testing the fully built application.

---

## Required Installation

Before running the tests, ensure you have the required dependencies installed. This project uses `pnpm` (version 10.25.0 or compatible) as its package manager.

1. **Install Node.js Dependencies**:
   Ensure you are in the project's root directory and run:

   ```bash
   pnpm install
   ```

2. **Install Playwright Browsers**:
   Playwright requires specific browser binaries to run E2E tests. Install them by running:
   ```bash
   pnpm exec playwright install
   ```
   _Note: You may also need to install system dependencies for Playwright if you are on Linux using `pnpm exec playwright install-deps`._

---

## How to Run the Tests

The `package.json` provides several scripts to execute tests easily.

### Run All Tests

To run all tests (Unit, Integration, and E2E) sequentially in one command:

```bash
pnpm test
```

### Run Unit Tests

Unit tests are focused on testing individual functions and standalone scripts in isolation. They are configured to run in a `node` environment and match `scripts/**/*.test.mjs` and `src/**/*.unit.test.js`.

```bash
pnpm test:unit
```

### Run Integration Tests

Integration tests run in a `jsdom` environment to simulate DOM interactions and browser APIs. They match `src/**/*.test.js` (excluding `*.unit.test.js`).

```bash
pnpm test:integration
```

### Run End-to-End (E2E) Tests

E2E tests verify the application as a whole from the user's perspective. The test script automatically builds the app (`pnpm build:local`), spins up a local preview server (`pnpm preview` on port 4173), and tests the application flow using Playwright. Test files are located in `./tests/e2e/`.

```bash
pnpm test:e2e
```

### Watch Mode

During development, it can be useful to run Vitest in watch mode. This will automatically re-run your unit and integration tests whenever you save file changes:

```bash
pnpm test:watch
```

---

## Configuration Files

- **Vitest**: Configuration is defined in `vitest.config.js`. It utilizes Vitest's `projects` feature to cleanly separate unit tests (Node environment) from integration tests (jsdom environment). Common test setup files are located at `tests/setup/vitest.setup.js`.
- **Playwright**: Configuration is defined in `playwright.config.js`. The configuration serves the app on `http://127.0.0.1:4173` locally, defines the test directory, and specifies browser options.
