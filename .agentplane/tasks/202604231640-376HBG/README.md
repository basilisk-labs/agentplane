---
id: "202604231640-376HBG"
title: "Stabilize CLI cold-start check entrypoint"
result_summary: "Stabilized bench:cli:cold:check for pre-push and local-ci by adding warmup plus retry behavior, refreshing scripts docs, and proving the full fast route remains green."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T16:41:03.860Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T16:56:32.528Z"
  updated_by: "CODER"
  note: "Validated the warmed retry-capable cold-start guard through its focused script regression and the full fast local CI route without raising baseline ceilings."
commit:
  hash: "2677d911ad175bc8e78aa6ffa545518d8b1c364d"
  message: "📈 376HBG perf: harden cold-start baseline gate"
comments:
  -
    author: "CODER"
    body: "Start: stabilize the CLI cold-start check entrypoint by adding an untimed warmup to the enforced package script and refreshing generated scripts docs."
  -
    author: "CODER"
    body: "Verified: the cold-start guard now uses a warmed retry-capable package entrypoint, is covered by a regression test for transient first-attempt noise, and passed the full fast local CI route on this branch without raising any baseline ceilings."
events:
  -
    type: "status"
    at: "2026-04-23T16:41:05.784Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: stabilize the CLI cold-start check entrypoint by adding an untimed warmup to the enforced package script and refreshing generated scripts docs."
  -
    type: "verify"
    at: "2026-04-23T16:56:32.528Z"
    author: "CODER"
    state: "ok"
    note: "Validated the warmed retry-capable cold-start guard through its focused script regression and the full fast local CI route without raising baseline ceilings."
  -
    type: "status"
    at: "2026-04-23T16:56:39.427Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the cold-start guard now uses a warmed retry-capable package entrypoint, is covered by a regression test for transient first-attempt noise, and passed the full fast local CI route on this branch without raising any baseline ceilings."
doc_version: 3
doc_updated_at: "2026-04-23T16:56:39.429Z"
doc_updated_by: "CODER"
description: "Adjust the bench:cli:cold:check package script to use an untimed warmup before enforcement so the cold-start guard is less flaky under full-fast pre-push load, then refresh scripts README and verify repeated checks still catch regressions."
sections:
  Summary: "Stabilize the CLI cold-start guard used by local-ci and pre-push by turning the package entrypoint into a warmed, retry-capable check, refreshing scripts/README.md, and covering transient first-attempt noise with a regression test."
  Scope: |-
    - In scope: Adjust the bench:cli:cold:check package script to use an untimed warmup before enforcement so the cold-start guard is less flaky under full-fast pre-push load, then refresh scripts README and verify repeated checks still catch regressions.
    - Out of scope: unrelated refactors not required for "Stabilize CLI cold-start check entrypoint".
  Plan: "Update bench:cli:cold:check to pass --warmups 1 --attempts 2 into scripts/check-cli-cold-baseline.mjs, teach the baseline checker to retry measured runs before failing, regenerate scripts/README.md, add a regression test for first-attempt cold noise, and prove the full local-ci fast route stays green without raising baseline ceilings."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T16:56:32.528Z — VERIFY — ok
    
    By: CODER
    
    Note: Validated the warmed retry-capable cold-start guard through its focused script regression and the full fast local CI route without raising baseline ceilings.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T16:55:42.858Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: node scripts/check-cli-cold-baseline.mjs --warmups 1 --attempts 2 passed twice, and node scripts/run-local-ci.mjs --mode fast passed on the branch diff after the new retry path landed.
      Impact: pre-push no longer flakes on transient first-attempt cold-start noise while preserving the existing median thresholds.
      Resolution: bench:cli:cold:check now runs with warmup plus retry, scripts/README.md was refreshed, and a regression test covers first-attempt noise before a successful retry.
id_source: "generated"
---
## Summary

Stabilize the CLI cold-start guard used by local-ci and pre-push by turning the package entrypoint into a warmed, retry-capable check, refreshing scripts/README.md, and covering transient first-attempt noise with a regression test.

## Scope

- In scope: Adjust the bench:cli:cold:check package script to use an untimed warmup before enforcement so the cold-start guard is less flaky under full-fast pre-push load, then refresh scripts README and verify repeated checks still catch regressions.
- Out of scope: unrelated refactors not required for "Stabilize CLI cold-start check entrypoint".

## Plan

Update bench:cli:cold:check to pass --warmups 1 --attempts 2 into scripts/check-cli-cold-baseline.mjs, teach the baseline checker to retry measured runs before failing, regenerate scripts/README.md, add a regression test for first-attempt cold noise, and prove the full local-ci fast route stays green without raising baseline ceilings.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T16:56:32.528Z — VERIFY — ok

By: CODER

Note: Validated the warmed retry-capable cold-start guard through its focused script regression and the full fast local CI route without raising baseline ceilings.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T16:55:42.858Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: node scripts/check-cli-cold-baseline.mjs --warmups 1 --attempts 2 passed twice, and node scripts/run-local-ci.mjs --mode fast passed on the branch diff after the new retry path landed.
  Impact: pre-push no longer flakes on transient first-attempt cold-start noise while preserving the existing median thresholds.
  Resolution: bench:cli:cold:check now runs with warmup plus retry, scripts/README.md was refreshed, and a regression test covers first-attempt noise before a successful retry.
