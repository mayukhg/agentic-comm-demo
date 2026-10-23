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

### Additional saved live reports

| Report | Display | Definition |
| --- | --- | --- |
| Trust comprehension | 540 correct, 60 incorrect (90%) | Evaluated, broken down by trust_question_correct |
| Recovery | 124 correct, 8 incorrect (93.94%) | Evaluated filtered recovery_injected=true, broken down by recovery_correct; denominator 132 injected missions only |
| Arm outcomes | wizard 143/57; search 131/69; agent_hypothesis 159/41 | Evaluated broken down by arm and success, 200 missions each. Fabricated differences, not treatment effects |
| Mean effort by arm | search 395.49 seconds / 1.43 corrections; wizard 383.74 / 1.46; agent_hypothesis 387.4 / 1.53 | Average duration_seconds and average corrections on Evaluated, broken down by arm |
| Full-cost composition | INR 18K fixed allocation, 3240 support, 701.66 inference, 500.95 recovery loss, 76.97 tools | Five component sums on Costed. Fixed allocation is already included in total_cost_inr |
| Hypothetical contribution | INR 12.99K revenue minus INR 22.52K full cost = -9530 rounded | SUM hypothetical_net_revenue_inr minus SUM total_cost_inr on Costed; exact fixture -9529.5898 INR. Not GMV or actual profitability |

All listed cards were saved and visually checked in the live board. Rates shown in titles are calculated from the displayed outcome counts. The board's synthetic-data caveat explains the denominators and excluded percentile metrics.

### Percentile reconciliation limit

Median and p90 are deliberately excluded from the final board. Mixpanel Insights returned changing percentile values that did not consistently match the fixture, including differences within arms. The exact fixture median is 392 seconds and nearest-rank p90 is 628 seconds. The cause is not established; documentation about Funnel time-to-convert approximation does not establish Insights behavior. Do not claim the mismatch was fixed or proven to be approximation.

The final effort card instead uses reconciled arithmetic means. Overall fixture mean duration is 388.875 seconds (388.88 rounded), and mean corrections is 1.4733333333 (1.47 rounded). The arm means above match the saved live card. Any experimental percentile copies in saved reports are diagnostics, not final board evidence.

## Reconciliation and import

Use `analytics/data/events.json` and `analytics/data/expected-summary.json` as the deterministic reference. Each event type occurs once per mission. Unit-cost formulas use Costed alone so counts and costs share an event population. Segment only by dimensions on those same events.

Run `node analytics/generate-synthetic.mjs` to regenerate the fixture. Run `node analytics/import-mixpanel.mjs` for a local dry run. The fixture was already imported into the dedicated authorized demo project; do not repeat it without first checking the current project and counts.

For a new authorized project only, verify residency and provide its token locally through environment variables. Never commit tokens or credentials. The importer requires `--send` and `MIXPANEL_CONFIRM_SYNTHETIC_PROJECT=yes`. It does not create a project or board. Use `MIXPANEL_REGION=US`, `EU` or `IN` according to the project's real residency, not the operator's location. Keep the fixed fixture dates and adjust the board range when reviewing later.

The importer uses project-token authentication, strict validation, stable insert IDs, geolocation disabled, sequential 500-event batches and no automatic retries. A failed batch can partially ingest; inspect the project and count before any retry.

Official API references:
- https://docs.mixpanel.com/reference/import-events
- https://docs.mixpanel.com/reference/overview
