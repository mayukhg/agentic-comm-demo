# MissionCart evaluation framework

Private review draft, 23 October 2026. Gates and study sizes below are proposals, not established benchmarks. No production AI eval or shopper study has been run.

## Evidence status

- Original deterministic engine: 4 tests passed, including 256 constraint/scenario combinations and targeted total/stock/delivery checks.
- Portable UI: both routes visually checked at 320, 390 and 1280 widths. Build, basket review, simulated handoff, review invalidation, out-of-stock refusal and reset workflows passed.
- Not yet measured: real compatibility, live source freshness, shopper demand, effort uplift, comprehension rates, merchant handoff reliability, AI accuracy or production unit economics.
- Synthetic dashboard data is a separate fabricated demonstration. It is not a report of these tests or of real shoppers.

## Product boundary

Today the demo enumerates a fictional catalog with deterministic constraints. A proposed production version could interpret natural-language goals and retrieve merchant data, but compatibility, totals and authority checks remain deterministic. First production boundary: a verified merchant checkout handoff, not autonomous payment.

## Evaluate at four layers

1. Engine correctness: independent oracle for total, shipping, maximum item arrival, mandatory categories, host ports, wireless requirement and sorted ranking. Preserve catalog immutability and stable basket IDs.
2. UI safety and usability: review invalidates after every material change; no hidden substitutions; checkbox controls only the current basket; no-side-effect handoff; accessible controls and refusal explanations.
3. Production agent/tool reliability: sandbox stale prices, inventory changes, malicious supplier text, timeout, missing properties, duplicate responses and unsupported claims. Never use a model judge alone for compatibility, money or permission.
4. Shopper and business value: compare identical tasks and catalog fixtures against search and a fixed wizard. Measure goal success, effort, comprehension and cost together.

## Scorecard

| Dimension | Metric and denominator | Proposed release rule |
| --- | --- | --- |
| Constraint safety | Invalid recommended baskets / all recommendations | Any violation blocks release |
| Money accuracy | Incorrect delivered totals / evaluated baskets | Any error blocks release |
| Review binding | Stale approval after change / material changes | Any stale approval blocks release |
| Unauthorized effect | Unapproved orders, payments or external messages | Any event stops pilot |
| Goal success | Complete compatible within-budget on-time baskets / all attempted missions | Compare against strongest baseline; set target after measurement |
| Shopper effort | Median and p90 elapsed time; corrections; abandonment | Require improvement without safety or success regression |
| Trust | Correct scope, total and simulation answers / all participants | Proposed >=90%, validate before adoption |
| Recovery | Correct rebuild or safe refusal / injected failures | 100% of critical scripted cases |
| Freshness | Verified current sources before handoff / live handoffs | 100%; missing evidence prevents handoff |
| Economics | Full INR cost / attempted and successful mission | Measured within owner-approved pilot budget |

Zero observed failures in a finite suite is not a safety guarantee. A safe refusal is distinct from an error and can be the right outcome.

## Evaluation dataset

Include USB-A and USB-C, wireless required and optional, budgets near feasibility boundaries, deadlines below/on/above arrival limits, all supplier scenarios, several feasible alternatives and no-safe-basket cases. Include fairness/coverage segments by device and task difficulty, not sensitive personal attributes. Split development cases from holdout before tuning. Run versioned regression after every engine, catalog, prompt, model or merchant adapter change.

## Shopper study

Start with 8-12 moderated sessions to discover usability problems, not to claim statistical uplift. Counterbalance search/wizard/agent order and match catalog, deadline and task difficulty. Record failures and abandonment, not only completed tasks. Then power a randomized study from the observed baseline, variance and minimum worthwhile improvement. Report uncertainty and segment results; do not cherry-pick a single average.

Ask post-task: What total did you review? What was approved? Was any real order placed? Which requirement was binding? Observe behavior as well as self-reported trust.

## Eval run manifest

Store run ID, date, app commit, engine/catalog/prompt/model/tool versions, case set and seed, expected/actual outcomes, reviewer, failure category, token/tool cost and latency. Use sandbox identities and redacted traces. Never log passwords, payment details or raw personal messages. Do not collect session replay by default.

## Operations and stop rules

Run deterministic and UI checks before each release. Independently verify production handoff sources, terms and approval scope. Canary only with separately approved traffic and spending limits. Pause on any authority breach, wrong total, hard-constraint error or stale review. Diagnose, add a regression case and rerun before resuming. Monitor per-success cost, retries, support and recovery incidence alongside mission completion.

## Cost-model link

The editable workbook separates rules-based demo allocations, hypothetical AI pilot and stress assumptions. It includes failed attempts, support and non-labor recovery. Vendor rates are placeholders, not quotes. Record actual tokens, calls, fees, incident losses and staffing before a budget decision. Revenue per successful basket is hypothetical, not conversion or GMV.
