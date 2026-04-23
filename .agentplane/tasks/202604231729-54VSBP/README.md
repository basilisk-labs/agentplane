---
id: "202604231729-54VSBP"
title: "Handle failed measurement payloads in cold-start retry guard"
result_summary: "Hardened the cold-start retry guard so failed measurement attempts are parseable and the pre-push path remains publishable."
status: "DONE"
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
  updated_at: "2026-04-23T17:30:05.633Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T17:40:50.207Z"
  updated_by: "CODER"
  note: "Validated the failed-measurement retry path with the focused baseline-script test, then exercised the full pre-push route end to end by publishing the branch successfully."
commit:
  hash: "13c694e285f875e062e37556e306effc5f0f1eed"
  message: "🧹 54VSBP test: satisfy numeric separator lint"
comments:
  -
    author: "CODER"
    body: "Start: make failed measurement attempts parseable inside the cold-start retry guard, then verify the focused retry regression before republishing the branch through pre-push."
  -
    author: "CODER"
    body: "Verified: the cold-start retry guard now survives non-zero measurement attempts, the regression test is deterministic under suite load, and the branch was pushed through the real pre-push route after the change."
events:
  -
    type: "status"
    at: "2026-04-23T17:30:07.369Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make failed measurement attempts parseable inside the cold-start retry guard, then verify the focused retry regression before republishing the branch through pre-push."
  -
    type: "verify"
    at: "2026-04-23T17:40:50.207Z"
    author: "CODER"
    state: "ok"
    note: "Validated the failed-measurement retry path with the focused baseline-script test, then exercised the full pre-push route end to end by publishing the branch successfully."
  -
    type: "status"
    at: "2026-04-23T17:41:05.103Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the cold-start retry guard now survives non-zero measurement attempts, the regression test is deterministic under suite load, and the branch was pushed through the real pre-push route after the change."
doc_version: 3
doc_updated_at: "2026-04-23T17:41:05.103Z"
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
    ### 2026-04-23T17:40:50.207Z — VERIFY — ok
    
    By: CODER
    
    Note: Validated the failed-measurement retry path with the focused baseline-script test, then exercised the full pre-push route end to end by publishing the branch successfully.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T17:30:07.397Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: node ./node_modules/vitest/vitest.mjs run packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts passed after the retry-path change, and git push -u origin codex/hotspot-refactors-20260423 completed after local-ci fast plus critical CLI E2E.
      Impact: the retry guard now handles non-zero measurement attempts instead of aborting early, and the deterministic regression stays green under the real pre-push path.
      Resolution: scripts/check-cli-cold-baseline.mjs now parses JSON payloads from failed measurement runs when available, while the retry regression uses deterministic first-attempt exit failures instead of load-sensitive timing thresholds.
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
### 2026-04-23T17:40:50.207Z — VERIFY — ok

By: CODER

Note: Validated the failed-measurement retry path with the focused baseline-script test, then exercised the full pre-push route end to end by publishing the branch successfully.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T17:30:07.397Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: node ./node_modules/vitest/vitest.mjs run packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts passed after the retry-path change, and git push -u origin codex/hotspot-refactors-20260423 completed after local-ci fast plus critical CLI E2E.
  Impact: the retry guard now handles non-zero measurement attempts instead of aborting early, and the deterministic regression stays green under the real pre-push path.
  Resolution: scripts/check-cli-cold-baseline.mjs now parses JSON payloads from failed measurement runs when available, while the retry regression uses deterministic first-attempt exit failures instead of load-sensitive timing thresholds.
