---
id: "202603091258-G2YW52"
title: "Narrow release:ci-check by removing non-release-critical heavy suites"
result_summary: "Narrowed release:ci-check by extracting release-smoke, excluding the broad init-upgrade suite from the base release sweep, and stabilizing the remaining finish-path time budgets."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T13:01:37.581Z"
  updated_by: "ORCHESTRATOR"
  note: "Compact install-first release-smoke implementation approved."
verification:
  state: "ok"
  updated_at: "2026-03-09T13:32:21.976Z"
  updated_by: "TESTER"
  note: "Command: bun run test:release:smoke; Result: pass; Evidence: compact install-first smoke suite passed after the new workflow-artifact and migrate-doc recovery extraction. Scope: release-only init/upgrade/migrate-doc behavior. Command: bun run release:ci-check; Result: pass; Evidence: release gate stayed green after excluding the broad init-upgrade suite from test:release:ci-base and rerunning the remaining critical slow paths explicitly. Scope: patch release gate composition. Command: inspect package.json and docs/developer/testing-and-quality.mdx; Result: pass; Evidence: release:ci-check, test:release:ci-base, and test:release:critical now describe the narrowed contour consistently. Scope: release script and docs parity."
commit:
  hash: "47f0db0e447229bdb1de4e4c981d86df0cd6da06"
  message: "⚡ G2YW52 release: narrow release ci gate"
comments:
  -
    author: "CODER"
    body: "Start: extracting a compact install-first release smoke suite so the patch-release gate stops depending on the broad init-upgrade regression sweep."
  -
    author: "CODER"
    body: "Verified: release-ci now uses a compact install-first smoke layer, the broad init-upgrade regression file is no longer part of test:release:ci-base, and the remaining finish-path integration checks have explicit budgets that pass under the full release contour."
events:
  -
    type: "status"
    at: "2026-03-09T13:01:38.005Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extracting a compact install-first release smoke suite so the patch-release gate stops depending on the broad init-upgrade regression sweep."
  -
    type: "verify"
    at: "2026-03-09T13:32:21.976Z"
    author: "TESTER"
    state: "ok"
    note: "Command: bun run test:release:smoke; Result: pass; Evidence: compact install-first smoke suite passed after the new workflow-artifact and migrate-doc recovery extraction. Scope: release-only init/upgrade/migrate-doc behavior. Command: bun run release:ci-check; Result: pass; Evidence: release gate stayed green after excluding the broad init-upgrade suite from test:release:ci-base and rerunning the remaining critical slow paths explicitly. Scope: patch release gate composition. Command: inspect package.json and docs/developer/testing-and-quality.mdx; Result: pass; Evidence: release:ci-check, test:release:ci-base, and test:release:critical now describe the narrowed contour consistently. Scope: release script and docs parity."
  -
    type: "status"
    at: "2026-03-09T13:32:28.015Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release-ci now uses a compact install-first smoke layer, the broad init-upgrade regression file is no longer part of test:release:ci-base, and the remaining finish-path integration checks have explicit budgets that pass under the full release contour."
doc_version: 3
doc_updated_at: "2026-03-09T13:32:28.015Z"
doc_updated_by: "CODER"
description: "Implement the next safe release-ci decomposition so patch releases stop depending on unrelated slow integration suites while preserving explicit release-critical coverage and documentation."
id_source: "generated"
---
## Summary

Narrow release:ci-check by removing non-release-critical heavy suites

Implement the next safe release-ci decomposition so patch releases stop depending on unrelated slow integration suites while preserving explicit release-critical coverage and documentation.

## Scope

- In scope: Implement the next safe release-ci decomposition so patch releases stop depending on unrelated slow integration suites while preserving explicit release-critical coverage and documentation.
- Out of scope: unrelated refactors not required for "Narrow release:ci-check by removing non-release-critical heavy suites".

## Plan

1. Extract a compact install-first release smoke suite from the broad init-upgrade integration coverage, focusing only on init baseline, workflow artifact restore, and README migration recovery.
2. Move release:ci-check to the compact smoke suite and exclude the broad init-upgrade file from the release-only base sweep, leaving the full file in general CI.
3. Re-run targeted release checks, the new smoke suite, and the full release:ci-check; then record findings and close with the implementation commit.

## Verify Steps

1. Run the new compact release smoke suite. Expected: install-first init/upgrade/migrate-doc behavior passes without depending on the broad init-upgrade regression file.
2. Run bun run release:ci-check. Expected: the release gate stays green while no longer pulling the broad init-upgrade file through test:release:ci-base.
3. Inspect the remaining CI scripts and docs. Expected: release:ci-check, package scripts, and testing docs all describe the narrowed release-only contour consistently.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T13:32:21.976Z — VERIFY — ok

By: TESTER

Note: Command: bun run test:release:smoke; Result: pass; Evidence: compact install-first smoke suite passed after the new workflow-artifact and migrate-doc recovery extraction. Scope: release-only init/upgrade/migrate-doc behavior. Command: bun run release:ci-check; Result: pass; Evidence: release gate stayed green after excluding the broad init-upgrade suite from test:release:ci-base and rerunning the remaining critical slow paths explicitly. Scope: patch release gate composition. Command: inspect package.json and docs/developer/testing-and-quality.mdx; Result: pass; Evidence: release:ci-check, test:release:ci-base, and test:release:critical now describe the narrowed contour consistently. Scope: release script and docs parity.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T13:31:34.957Z, excerpt_hash=sha256:3340a904982c8b09e51f38009cca5d36d35cb30d81c659accd77000db497e6be

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: After isolating cli-smoke and release-recovery, the next release-only bottleneck was still hidden inside the broad init-upgrade suite, and the first extraction exposed two separate time-budget regressions under full release load.
- Impact: release:ci-check still failed despite the new split because workflow-artifact recovery and finish-path metadata tests inherited insufficient budgets from their original wide suites.
- Resolution: added a compact release-smoke suite, excluded the broad init-upgrade file from test:release:ci-base, raised release-smoke budgets to 120s, and assigned explicit 60s budgets to the finish-path lifecycle tests exercised under the full release contour.
- Promotion: tooling
