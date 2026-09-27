# Demoblaze Test Automation

Smoke test suite for [Demoblaze](https://www.demoblaze.com/) built with Playwright and TypeScript.

---

## Test Coverage

The smoke suite covers the three critical business flows of the store:

1. **Store Access & Navigation**: Verifies that the store loads, the navigation bar is present, and product categories (`Phones`, `Laptops`, `Monitors`) are accessible and filter correctly.
2. **User Authentication Lifecycle**: Verifies new user sign-up with dynamic credentials, successful login and greeting verification, and session logout.
3. **End-to-End Purchase Flow**: Verifies product selection, detail and price consistency, adding to cart (with browser alert handling), cart review, and completing checkout with receipt confirmation.

---

## Quick run (no local installation required)

If you don't have Node.js or Playwright installed, you can run and view the tests directly on GitHub:

1. Go to the **Actions** tab in this GitHub repository.
2. Select **Playwright Tests** from the left sidebar.
3. Click **Run workflow** -> Select `main` branch -> Click the green **Run workflow** button.
4. Once completed, click the run to view execution steps or download the `playwright-report` artifact.

---

## Local Setup & Execution

### Prerequisites
- Node.js (v18+)
- npm

### 1. Installation
Clone the repository and install dependencies:

```bash
npm install
npx playwright install
```

### 2. Running Tests

Run all smoke tests (headless):
```bash
npm run test:smoke
```

Run in headed browser mode:
```bash
npm run test:headed
```

Run in interactive UI mode:
```bash
npm run test:ui
```

View the HTML test report:
```bash
npm run report
```

Run TypeScript type check:
```bash
npm run typecheck
```

---

## Alternative: Run with Docker (no node.js required locally)

If you have Docker installed, you can run the entire test suite using Microsoft's official Playwright image:

```bash
docker run --rm -v $(pwd):/work/ -w /work/ mcr.microsoft.com/playwright:v1.63.0-noble /bin/bash -c "npm install && npx playwright test"
```

---

## Project Structure

```text
├── .github/workflows/ # GitHub Actions CI workflow (manual + push triggers)
├── fixtures/          # Custom Playwright test fixture injecting page objects
├── helpers/           # Utility functions and dynamic test data generators
├── page-objects/      # Page Object Model classes
├── tests/             # Test specifications
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Implementation Notes

- **Page Object Model (POM)**: Locators and user actions are modularized into dedicated page and component classes (`LandingPage`, `NavBar`, `AuthenticationModal`, `ProductPage`, `CartPage`).
- **Fixtures Dependency Injection**: Used Playwright's `test.extend` in `fixtures/test-extend.ts` to provide page objects automatically to tests, avoiding repetitive page imports and keeping test files cleaner.
- **Dynamic Test Data**: Sign-up tests use unique timestamp-based usernames (`helpers/dataFunctions.ts`) so that each test run avoids account collisions in Demoblaze's shared database.
- **Browser Native Dialogs**: Demoblaze uses browser `window.alert()` for sign-up and cart notifications; these are handled explicitly using `page.waitForEvent('dialog')`.
- **Test Filtering**: Suites are tagged (e.g. `@smoke`) allowing selective execution via `--grep`.
- **Network Resilience**: Configured a 10s assertion timeout in `playwright.config.ts` to protect against latency spikes on Demoblaze's public sandbox backend.
