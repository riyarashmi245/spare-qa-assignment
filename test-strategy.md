# Test Strategy

## Goal

For this assignment, I treated Product Hunt as a product where users mainly come to discover new products, open product pages, and trust that the data shown on the UI/API is correct.

If I was the only QA engineer for this product, I would focus first on the flows that directly affect user trust and product discovery.

## What matters most

### 1. Product discovery should not break

The homepage and product listing areas are the most important parts of Product Hunt. If users cannot see products, open them, or understand what they are about, the main purpose of the product is affected.

I would test:

- Homepage loads correctly
- Product links/cards are visible
- Product detail pages open properly
- Important product information is shown

### 2. API data should be reliable

Product Hunt provides a public GraphQL API, so API correctness is important. Since the UI and external consumers may depend on this data, the API should return a stable and predictable structure.

I would test:

- Valid GraphQL queries return expected data
- Required fields like product id, name, tagline, and URL are present
- Pagination works correctly
- Invalid queries fail safely

### 3. Authentication and token handling should be safe

The API uses a developer token, so token handling is an important security area.

I would check:

- Tokens are not committed to GitHub
- Missing token requests are rejected
- Invalid token requests are rejected
- Error responses do not expose internal details

### 4. Tests should avoid flakiness

Product Hunt content changes frequently. Product names, rankings, images, and vote counts can change at any time.

Because of this, I avoided hardcoding exact product names or counts. Instead, I focused on stable behaviour like:

- At least one product is visible
- Product links have text
- Images are loaded
- Product pages open correctly

## Scope

### In scope

- Basic E2E smoke tests for Product Hunt web app
- API tests for public GraphQL queries
- Negative API tests for invalid/missing authentication
- Exploratory testing and security observations
- CI-ready API test setup

### Out of scope

- Voting, commenting, posting, or any destructive action
- Trying to bypass bot protection
- Load testing or aggressive API usage
- Testing private user data
- Full cross-browser coverage

## Automation approach

For E2E automation, I used Playwright with TypeScript. The tests are written to be simple and readable. They rely on visible user behaviour instead of fixed waits.

For API automation, I used Bun test runner with TypeScript and a small reusable GraphQL client. This keeps the API tests clean and avoids repeating request logic in every test.

## Risks

- Product Hunt may show bot protection in automated headless browsers
- UI content changes frequently
- API rate limits can affect large test suites
- Public data may change between test runs

## What I would do next

With more time, I would add:

- Search flow tests
- Topic/category page tests
- More product detail page validations
- Accessibility checks
- Visual regression checks
- GraphQL schema/type generation
- More CI reporting with screenshots, traces, and test artifacts