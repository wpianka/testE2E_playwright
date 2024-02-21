# Playwright – testy automatyczne E2E

## Links

- test site https://demo-bank.vercel.app/

## Install

- wykonaj polecenie `npm install` aby zainstalować zależności
- wykonaj polecenie `npx playwright install` aby pobrać aktualne przeglądarki
- uruchom testy `npx playwright test`

## Commands

- new project with Playwright  
  `npm init playwright@latest`
- record tests for given site  
  `npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
  `npx playwright test`
- run tests with browser GUI  
  `npx playwright test --headed`
- view report  
  `npx playwright show-report`
- run Trace Viewer on zip file
  `npx playwright show-trace trace.zip`

### Playwright snippets

- import:
  ```typescript
  import { test, expect } from "@playwright/test";
  ```
- test:
  ```typescript
  test("test description", async ({ page }) => {
    //your code
  });
  ```
- describe:
  ```typescript
  test.describe("Group description", () => {
    //your code
  });
  ```
- running given test: `test.only`

### Locators

- `getByTestId` i.e. `getByTestId('login-input')` for element with `data-testid="login-input"`
- `getByRole` i.e. `getByRole('button', { name: 'wykonaj' })`
- `locator` i.e. `locator('#some-id')` (with `css` selector) for element with attribute `id="some-id"`

### Chrome

- use English version!
- open DevTools <kbd>F12</kbd> or right click `Inspect`
- get selector: right click on element -> Copy -> Copy selector
- testing CSS selectors in Console: `$$('selector')`

### Prettier

- install Prettier  
  `npm install --save-dev --save-exact prettier`
- configure Prettier

  - exlude files in `.prettierignore`

    ```
    package-lock.json
    playwright-report

    ```

  - set rules in `.prettierrc.json`
    ```
    {
        "singleQuote": true
    }
    ```

- run Prettier  
  `npx prettier --write .`
- additionaly you can install VSC extension: **Prettier**
