# MissionCart synthetic evaluation and unit-economics dashboard

## Deployed state, 23 October 2026

Board: https://mixpanel.com/s/4sAzfJ

The link resolves to the MissionCart synthetic evaluation and economics board for a signed-in authorized viewer. A separate signed-out check showed a permission/login page, so this is not an anonymous public dashboard.

All data is fabricated for a demonstration. It is not real usage, executed evaluation evidence, causal uplift, market evidence or actual revenue. The current app uses a deterministic rules-based constraint engine, not a production agent.

The dedicated synthetic project contains 600 missions and 1,800 events. Do not import this fixture again merely to inspect the board. The board uses September 24 through October 23, 2026 inclusive in UTC, `dataset_id = missioncart-synthetic-v1`, and `synthetic = true`.

### Implemented and visually checked

| Report | Display | Definition |
| --- | --- | --- |
| Attempts | 600 | Total Synthetic Mission Started events |
| Success outcome counts | 433 successful, 167 unsuccessful | Total Synthetic Mission Evaluated, broken down by success. 433/600 = 72.17%, calculated from those counts |
| Safety counters | Four zeros | Sums of unauthorized_actions, hard_constraint_violations, wrong_total and review_stale on Evaluated. Zero by construction, not proof of safety |
| Full cost per attempt | INR 37.53 | Mean total_cost_inr on Synthetic Mission Costed |
| Total full cost | INR 22.52K | Sum total_cost_inr on all Costed events; exact fixture sum INR 22519.5898 |
| Full cost per success | INR 52.01 | Sum total_cost_inr on ALL Costed divided by total Costed filtered success=true. Failed missions remain in numerator |

### Implemented but provisional

Effort report contains median and p90 duration_seconds and mean corrections on Evaluated. Mean corrections displays 1.47 and p90 displays 628 seconds. Mixpanel's displayed median changed across queries and most recently displayed 399 seconds; the exact fixture median is 392 seconds. Do not use the displayed median as a reconciled result. The board title marks this report provisional. Its percentile implementation or query behavior still needs investigation.

### Still required in the live board

The board is not complete against the requested evaluation/economics scope. The following remain specification and reproducible fixture reference values, not completed live cards:

- Arm segmentation: search 131/200 successful (65.5%), wizard 143/200 (71.5%), agent_hypothesis 159/200 (79.5%). These fabricated differences are not treatment effects.
- Effort broken down by arm, with the median discrepancy reconciled first.
- Recovery: Evaluated with recovery_injected=true and recovery_correct=true divided by Evaluated with recovery_injected=true. Fixture 124/132 = 93.94%. Exclude all non-injected rows from denominator.
- Trust comprehension: Evaluated with trust_question_correct=true divided by all Evaluated. Fixture 540/600 = 90%. Fabricated question results.
- Cost composition: sums of inference_inr (701.6607), tools_inr (76.9747), support_inr (3240), recovery_loss_inr (500.9544), fixed_allocation_inr (18000) on Costed. INR; fixed allocation is already in total_cost_inr and must not be added twice.
- Hypothetical net contribution: SUM hypothetical_net_revenue_inr minus SUM total_cost_inr on Costed. Fixture 12990 - 22519.5898 = -9529.5898 INR. Not GMV or actual profitability.

## Reconciliation and import

Use `analytics/data/events.json` and `analytics/data/expected-summary.json` as the deterministic reference. Each event type occurs once per mission. Unit-cost formulas use Costed alone so counts and costs share an event population. Segment only by dimensions on those same events.

Run `node analytics/generate-synthetic.mjs` to regenerate the fixture. Run `node analytics/import-mixpanel.mjs` for a local dry run. The fixture was already imported into the dedicated authorized demo project; do not repeat it without first checking the current project and counts.

For a new authorized project only, verify residency and provide its token locally through environment variables. Never commit tokens or credentials. The importer requires `--send` and `MIXPANEL_CONFIRM_SYNTHETIC_PROJECT=yes`. It does not create a project or board. Use `MIXPANEL_REGION=US`, `EU` or `IN` according to the project's real residency, not the operator's location. Keep the fixed fixture dates and adjust the board range when reviewing later.

The importer uses project-token authentication, strict validation, stable insert IDs, geolocation disabled, sequential 500-event batches and no automatic retries. A failed batch can partially ingest; inspect the project and count before any retry.

Official API references:
- https://docs.mixpanel.com/reference/import-events
- https://docs.mixpanel.com/reference/overview
