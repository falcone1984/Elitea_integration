# EPAM Website - Playwright Test Suite

This repository contains automated end-to-end tests for the EPAM website using Playwright and TypeScript.

## Test Scenario

### Test: Navigate to Client Work Page

**Description:** This test validates the navigation flow from the EPAM homepage to the Client Work page.

**Steps:**
1. Navigate to https://www.epam.com/
2. Select "Services" from the header menu
3. Click the "Explore Our Client Work" link
4. Verify that the "Client Work" text is visible on the page

## Project Structure

```
.
├── tests/
│   └── epam-client-work-navigation.spec.ts  # Main test file
├── playwright.config.ts                      # Playwright configuration
├── package.json                              # Project dependencies
├── tsconfig.json                             # TypeScript configuration
└── README.md                                 # This file
```

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/falcone1984/Elitea_integration.git
cd Elitea_integration
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (with browser visible)
```bash
npm run test:headed
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests on specific browsers
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:mobile
```

### View test report
```bash
npm run report
```

## Test Configuration

The tests are configured to run on multiple browsers:
- Desktop: Chrome, Firefox, Safari
- Mobile: Chrome (Pixel 5), Safari (iPhone 12)

### Configuration Options

- **Timeout:** 30 seconds per test
- **Retries:** 2 retries on CI, 0 locally
- **Parallel Execution:** Enabled for faster test runs
- **Screenshots:** Captured on failure
- **Video:** Recorded on failure
- **Traces:** Captured on first retry

## Test Results

Test results are generated in the following formats:
- HTML report (interactive)
- JSON report (for CI/CD integration)
- Console list report

## Continuous Integration

The tests are designed to run in CI/CD pipelines with appropriate configuration:
- Fail-fast on `test.only` in CI
- Reduced parallelism in CI environments
- Automatic retries for flaky tests

## Code Generation

To generate new test code using Playwright's codegen tool:
```bash
npm run codegen
```

## Contributing

When adding new tests:
1. Create a new branch from `master`
2. Add test files in the `tests/` directory
3. Follow the existing test structure and naming conventions
4. Create a pull request with a descriptive title and summary

## License

MIT

## Author

Automation Tester

## Contact

For questions or issues, please open an issue in the GitHub repository.
