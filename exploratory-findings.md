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
---

## Finding: New user onboarding redirects back to homepage after profile setup

**Area:** Homepage / New user onboarding  
**Type:** Functional / User flow  
**Severity:** Low  
**Status:** Observed manually

### Observation

On the Product Hunt homepage, a popup was shown for new user onboarding. After clicking it, I was redirected to:

```txt
https://www.producthunt.com/my/welcome

---

## Finding: Pre-launch dashboard final submission flow was unclear

**Area:** Pre-launch dashboard / Launch flow  
**Type:** Functional / UX  
**Severity:** Medium  
**Status:** Observed manually  
**URL:** https://www.producthunt.com/products/riya/riya/prelaunch

### Observation

While exploring the logged-in user flow, I opened the Pre-Launch Dashboard for a test product.

The dashboard had multiple pages/steps in the setup flow. On the final step, when I tried to submit, the flow asked for an image. There was a button related to adding or uploading an image, but clicking the button did not clearly redirect me to the expected upload/selection area.

Some of the visible page text included:

```txt
Home
riya
Pre-Launch Dashboard
checking it

---

## Finding: Thread creation submits even after heading validation error

**Area:** Pre-launch dashboard / Discussions / Thread creation  
**Type:** Functional / Validation  
**Severity:** Medium  
**Status:** Observed manually  
**URL:** https://www.producthunt.com/products/riya/riya/prelaunch

### Observation

On the pre-launch page, I clicked the **Start a new thread** button. I added a heading and description for the new thread.

The heading started with a comma. The UI showed a validation error saying that the heading was incorrect. However, the error appeared only for a short time and the thread still got submitted successfully.

### Steps to reproduce

1. Open the pre-launch dashboard page.
2. Click **Start a new thread**.
3. Enter a heading that starts with a comma.
4. Enter a description.
5. Submit the thread.
6. Observe the validation error and final submission behaviour.

### Expected result

If the heading is invalid, the thread should not be submitted. The validation error should stay visible until the user fixes the heading.

### Actual result

The UI showed a heading validation error briefly, but the thread still got created.

### Impact

This can allow invalid thread titles to be saved. It can also confuse users because the UI says there is an error, but the action still succeeds.

### Recommendation

The frontend and backend validation should be aligned. If the heading is invalid, the submit action should be blocked and the API should also reject the request. The error message should remain visible until the user corrects the input.

### Automation status

Manual only. I did not automate this because it involves a logged-in production flow and creates real user-generated content. In a real setup, I would automate this on staging with a test user and clean-up logic.