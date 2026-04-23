---
id: "202604231729-54VSBP"
title: "Handle failed measurement payloads in cold-start retry guard"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T17:30:05.633Z"
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
    body: "Start: make failed measurement attempts parseable inside the cold-start retry guard, then verify the focused retry regression before republishing the branch through pre-push."
events:
  -
    type: "status"
    at: "2026-04-23T17:30:07.369Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make failed measurement attempts parseable inside the cold-start retry guard, then verify the focused retry regression before republishing the branch through pre-push."
doc_version: 3
doc_updated_at: "2026-04-23T17:30:07.397Z"
doc_updated_by: "CODER"
description: "Teach scripts/check-cli-cold-baseline.mjs to parse the JSON payload from a failed measurement attempt so retry logic can compare exit-code failures instead of aborting early, and keep the retry regression deterministic under full-suite load."
sections:
  Summary: |-
    Handle failed measurement payloads in cold-start retry guard
    
    Teach scripts/check-cli-cold-baseline.mjs to parse the JSON payload from a failed measurement attempt so retry logic can compare exit-code failures instead of aborting early, and keep the retry regression deterministic under full-suite load.
  Scope: |-
    - In scope: Teach scripts/check-cli-cold-baseline.mjs to parse the JSON payload from a failed measurement attempt so retry logic can compare exit-code failures instead of aborting early, and keep the retry regression deterministic under full-suite load.
    - Out of scope: unrelated refactors not required for "Handle failed measurement payloads in cold-start retry guard".
  Plan: "Update scripts/check-cli-cold-baseline.mjs so retry logic can parse a JSON measurement payload even when the measurement subprocess exits non-zero, then verify the deterministic retry regression through the focused script test and rely on pre-push local CI for the full route."
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

Handle failed measurement payloads in cold-start retry guard

Teach scripts/check-cli-cold-baseline.mjs to parse the JSON payload from a failed measurement attempt so retry logic can compare exit-code failures instead of aborting early, and keep the retry regression deterministic under full-suite load.

## Scope

- In scope: Teach scripts/check-cli-cold-baseline.mjs to parse the JSON payload from a failed measurement attempt so retry logic can compare exit-code failures instead of aborting early, and keep the retry regression deterministic under full-suite load.
- Out of scope: unrelated refactors not required for "Handle failed measurement payloads in cold-start retry guard".

## Plan

Update scripts/check-cli-cold-baseline.mjs so retry logic can parse a JSON measurement payload even when the measurement subprocess exits non-zero, then verify the deterministic retry regression through the focused script test and rely on pre-push local CI for the full route.

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
