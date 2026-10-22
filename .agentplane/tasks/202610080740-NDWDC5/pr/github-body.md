Task: `202610080740-NDWDC5`
Title: Qualify M05 live campaign contract and durable accounting offline
Canonical task record: `.agentplane/tasks/202610080740-NDWDC5/README.md`

## Summary

Qualify M05 live campaign contract and durable accounting offline

Latest release-owner decision for 0.7.13 is require measured savings before publication, superseding debt acceptance. Implement and offline-qualify M05 live campaign safety and durable accounting through existing paired-production-driver, paired-live-codex-launcher and paired-result-report owners, with narrowly bounded internal helpers. Preserve historical v1 and offline-v2 behavior. Require exact immutable campaign/model/effort/runtime/network/product/oracle identities and finite enforceable spend/retry/token limits; no authority inferred from manifest contents or mode flag. Persist assignments before invocation, reconcile interruptions without duplicate uncertain launches, retain every failed/blocked/cancelled attempt and complete multi-role/host/retry usage accounting; missing cost must stay unknown. Add separately versioned M05 reporting with all-assigned cost per verified success, matched comparisons and uncertainty. Offline injected-provider tests only: NO live calls, credentials, network campaign, artifact fabrication or claims of savings. Do not merely remove the current live rejection. Corpus/oracle qualification and exact campaign materialization remain a subsequent task; paid execution requires separate USER approval of that concrete campaign per charter179/203-241. User authorizes necessary development and integration for release.

## Scope

- In scope: Latest release-owner decision for 0.7.13 is require measured savings before publication, superseding debt acceptance. Implement and offline-qualify M05 live campaign safety and durable accounting through existing paired-production-driver, paired-live-codex-launcher and paired-result-report owners, with narrowly bounded internal helpers. Preserve historical v1 and offline-v2 behavior. Require exact immutable campaign/model/effort/runtime/network/product/oracle identities and finite enforceable spend/retry/token limits; no authority inferred from manifest contents or mode flag. Persist assignments before invocation, reconcile interruptions without duplicate uncertain launches, retain every failed/blocked/cancelled attempt and complete multi-role/host/retry usage accounting; missing cost must stay unknown. Add separately versioned M05 reporting with all-assigned cost per verified success, matched comparisons and uncertainty. Offline injected-provider tests only: NO live calls, credentials, network campaign, artifact fabrication or claims of savings. Do not merely remove the current live rejection. Corpus/oracle qualification and exact campaign materialization remain a subsequent task; paid execution requires separate USER approval of that concrete campaign per charter179/203-241. User authorizes necessary development and integration for release.
- Out of scope: unrelated refactors not required for "Qualify M05 live campaign contract and durable accounting offline".

## Verification

- State: ok
- Note: Canonical validation sha256:8b25eddc8fc7f5be36f375e15d18a53b5cd3dca57f1b82693d094f74805be9a4
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-08T08:48:22.477Z
- Branch: task/202610080740-NDWDC5/qualify-m05-live-campaign-contract-and-durable-a
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 scripts/bench/internal/paired-m05/boundary.mjs     | 100 ++++++
 .../bench/internal/paired-m05/boundary.test.mjs    | 303 ++++++++++++++++++
 scripts/bench/internal/paired-m05/contract.mjs     | 140 +++++++++
 scripts/bench/internal/paired-m05/ledger.mjs       | 227 ++++++++++++++
 scripts/bench/internal/paired-m05/ledger.test.mjs  | 348 +++++++++++++++++++++
 scripts/bench/internal/paired-m05/report.mjs       | 215 +++++++++++++
 scripts/bench/internal/paired-m05/report.test.mjs  | 335 ++++++++++++++++++++
 scripts/bench/paired-live-codex-launcher.mjs       |  14 +
 scripts/bench/paired-live-codex-launcher.test.mjs  |   3 +
 scripts/bench/paired-production-driver.mjs         |  14 +
 scripts/bench/paired-production-driver.test.mjs    |   3 +
 scripts/bench/paired-result-report.mjs             |   3 +
 scripts/bench/paired-result-report.test.mjs        |   2 +
 13 files changed, 1707 insertions(+)
```

</details>
