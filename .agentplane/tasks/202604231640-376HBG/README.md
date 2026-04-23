---
id: "202604231640-376HBG"
title: "Stabilize CLI cold-start check entrypoint"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: stabilize the CLI cold-start check entrypoint by adding an untimed warmup to the enforced package script and refreshing generated scripts docs."
events:
  -
    type: "status"
    at: "2026-04-23T16:41:05.784Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: stabilize the CLI cold-start check entrypoint by adding an untimed warmup to the enforced package script and refreshing generated scripts docs."
doc_version: 3
doc_updated_at: "2026-04-23T16:55:42.858Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
