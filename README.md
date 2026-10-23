# Agentic Commerce Demo: MissionCart

A portable React prototype that turns a home-office setup goal into a compatible basket within one budget and delivery deadline.

## Why this app?

Buying a keyboard, webcam and hub is a coordination problem, not three independent searches. A shopper has to check ports, total cost including shipping, stock and delivery, then start again when something changes. MissionCart explores whether an intent-to-basket assistant can reduce that work while keeping the shopper in control.

This customer pain is a hypothesis to validate, not a claim backed by completed interviews. Product demand and willingness to pay have not been established.

## What it solves

For a small fictional catalog, the demo finds complete baskets that satisfy the shopper's budget, deadline, computer port and wireless-keyboard requirement. It explains rejected choices and refuses to offer a basket when none is safe under those limits. It never silently relaxes a requirement.

## How it solves it

1. Collect explicit constraints rather than guessing them.
2. Enumerate the keyboard, webcam and hub combinations.
3. Reject port mismatches, budget overruns, late deliveries and missing wireless requirements.
4. Include fictional shipping in the total and rank feasible baskets by lowest delivered cost.
5. Re-plan after stock, price or delivery changes. Changes clear the previous review.
6. Require a review before preparing a simulated checkout handoff.

The case-study page compares search, a fixed bundle wizard and an agentic approach, and presents three product ideas before explaining the selected concept.

## Why agentic commerce, rather than a simpler wizard?

A production agent could clarify messy goals, retrieve current merchant data and coordinate revisions across products. It would still need deterministic compatibility, total-cost and approval checks. For this small, stable catalog a rules-based wizard is a strong baseline and may be enough. An agent earns its complexity only if measured outcomes and effort saved beat that baseline.

**This demo is rules-based. It does not call an AI model.** It is not evidence that an agentic solution is already the best solution.

## Run locally

Use Node.js 22 or later and npm:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. No API keys, accounts or payment details are needed. Hash-based routes work with static hosting.

```sh
npm test          # Engine checks, including 256 constraint/scenario combinations
npm run typecheck # TypeScript checks
npm run build     # Production files in dist/
npm run preview   # Preview the built application
```

## Try it

- Open **Working demo**, then select **Build my basket**. The default fictional delivered total is INR 5,696.
- Select a different basket and review its contents and total.
- Check the review box and prepare a simulated handoff. No purchase occurs.
- Select **Hub C out of stock**, rebuild, and observe the **No safe basket** state for the default USB-C setup.
- Change the budget, deadline or requirements, then rebuild. Old reviews never carry over.
- Use **Reset demo** to return to the starting conditions. Reloading also clears state.

## Implementation

- `src/engine.js`: original basket engine and fictional catalog, unchanged from the hosted demo.
- `src/App.tsx`: customer case and interactive flow adapted from the hosted demo.
- `src/ui.tsx`: standalone React presentation components written for this version.
- `src/style.css`: dark, high-contrast responsive layout.
- `src/main.tsx`: React entrypoint and hash routing.
- `tests/engine.test.js`: constraint, total, ranking and failure-scenario checks.

This is a portable adaptation of the hosted MissionCart prototype, not a byte-for-byte copy of its published implementation. The basket engine, fictional catalog and product behavior are preserved; presentation components and routing are standalone. Dependencies are public npm packages and the lockfile is included.

## Scope and limitations

All products, merchants, prices, tax assumptions, stock and delivery times are fictional. All three item categories are required. A USB-C computer is assumed to have two free USB-C ports; a USB-A computer has one free USB-A port. The hub uses one host port and supplies three USB-A ports. Bluetooth is assumed available. This is a simplified compatibility model, not hardware buying advice.

No live AI inference, merchant integration, real checkout, payment, order, external message or persistent customer data is involved. State lasts only while the page is open.

Production work would include real inventory and catalog APIs, postcode-based delivery quotes, richer compatibility data, natural-language planning, secure merchant checkout, price revalidation, order confirmation, tracking, returns and recovery. Merchant text must never grant payment authority.

## Validation plan

Interview target shoppers about a recent setup purchase, then compare the prototype with search and a bundle wizard. Measure complete compatible baskets within budget and deadline, time to a valid basket, corrections, abandonment and approval comprehension. Any real unintended-order rate must be zero. Assess unit economics before scaling; this prototype assumes no conversion or revenue uplift.

## Analytics dashboard

The synthetic evaluation and unit-economics dashboard for this demo lives in Mixpanel: https://mixpanel.com/s/4sAzfJ

Opening that link requires a signed-in Mixpanel account with access to the project; it is not anonymously public. Board definitions and reconciliation notes are in [analytics/BOARD-SPEC.md](analytics/BOARD-SPEC.md). All dashboard figures are fabricated demonstration data, not real customer results.

## Research foundations

- https://shopify.dev/docs/agents
- https://ap2-protocol.org/ap2/specification/
- https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search
- Full Agentic Commerce PM immersion report: [docs/agentic-commerce-pm-immersion.pdf](docs/agentic-commerce-pm-immersion.pdf)

These informed the distinction between discovery, checkout and authorization. The prototype does not implement those integrations or claim protocol compliance.

## License

No open-source license has been selected. Public visibility alone does not grant an open-source license.
