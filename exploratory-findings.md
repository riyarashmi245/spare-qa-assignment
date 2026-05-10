# Exploratory Testing and Security Findings

## Environment

- Product: Product Hunt
- Website: https://www.producthunt.com
- API: https://api.producthunt.com/v2/api/graphql
- Browser: Chrome / Playwright Chromium
- Runtime: Bun
- Language: TypeScript
- UI auth state: Unauthenticated
- API auth state: Developer token
- Testing style: Exploratory testing + automated smoke/API checks

---

## Summary

I explored Product Hunt from two angles:

1. As a normal user using the web app
2. As an API consumer using the public GraphQL API

The main areas I focused on were product discovery, product page navigation, API correctness, authentication behaviour, error handling, and automation stability.

Since this is a public production product, I stayed within ethical boundaries. I did not perform destructive actions, aggressive load testing, voting/commenting, or any attempt to bypass security controls.

---

## Finding 1: Product Hunt shows bot protection in headless automation

**Area:** E2E automation  
**Type:** Testability / Security  
**Severity:** Medium  
**Status:** Observed

### Observation

When running Playwright in headless mode, Product Hunt sometimes shows a page with the title "Just a moment..." before the actual homepage loads.