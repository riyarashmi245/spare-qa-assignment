# Product Hunt QA Assignment

## Overview

This is my QA take-home assignment for Spare.

For this assignment, I treated Product Hunt as a product that was recently shipped and looked at it from a QA ownership point of view. I focused on the areas that would matter most for users and engineering teams: product discovery, page navigation, API correctness, error handling, and safe handling of authentication tokens.

The project contains:

- A short test strategy
- Exploratory testing and security observations
- Playwright E2E tests for the web app
- Bun + TypeScript API tests for the Product Hunt GraphQL API
- Basic project structure that can be extended later

---

## Tech Stack

- Bun
- TypeScript
- Playwright
- Product Hunt GraphQL API
- dotenv for environment variables

---

## Project Structure

```txt
.
├── README.md
├── test-strategy.md
├── exploratory-findings.md
├── package.json
├── playwright.config.ts
├── .env.example
├── .gitignore
│
├── src/
│   └── api/
│       └── graphqlClient.ts
│
├── tests/
│   ├── api/
│   │   ├── posts.spec.ts
│   │   ├── pagination.spec.ts
│   │   └── graphql-negative.spec.ts
│   │
│   └── e2e/
│       └── home.spec.ts
│
└── .github/
    └── workflows/