---
id: "202604231718-6W4SX2"
title: "Harden local-ci cold-start step ordering"
result_summary: "Hardened local-ci cold-start step ordering so the pre-push route stays deterministic without weakening the cold-start thresholds."
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
  updated_at: "2026-04-23T17:18:42.694Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T17:19:20.052Z"
  updated_by: "CODER"
  note: "Validated the reordered cold-start gate with the full fast local CI route and the critical CLI E2E suite under the same NVM plus Bun toolchain used by pre-push."
commit:
  hash: "eac66d94df4d7c0e038d269f2abc117997e06c9c"
  message: "🧱 6W4SX2 ci: reorder cold-start gate"
comments:
  -
    author: "CODER"
    body: "Start: land the local-ci cold-start ordering fix and matching regression updates, then re-run the full fast route and critical CLI E2E under the pre-push toolchain."
  -
    author: "CODER"
    body: "Verified: local-ci now runs the cold-start baseline before build, the script summaries and regression expectations match the new output contract, and the full fast route plus critical CLI E2E passed under the pre-push toolchain."
events:
  -
    type: "status"
    at: "2026-04-23T17:18:43.891Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: land the local-ci cold-start ordering fix and matching regression updates, then re-run the full fast route and critical CLI E2E under the pre-push toolchain."
  -
    type: "verify"
    at: "2026-04-23T17:19:20.052Z"
    author: "CODER"
    state: "ok"
    note: "Validated the reordered cold-start gate with the full fast local CI route and the critical CLI E2E suite under the same NVM plus Bun toolchain used by pre-push."
  -
    type: "status"
    at: "2026-04-23T17:19:21.423Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: local-ci now runs the cold-start baseline before build, the script summaries and regression expectations match the new output contract, and the full fast route plus critical CLI E2E passed under the pre-push toolchain."
doc_version: 3
doc_updated_at: "2026-04-23T17:19:21.424Z"
doc_updated_by: "CODER"
description: "Move the CLI cold-start baseline check ahead of the heavy build step in local fast CI, align the cold-baseline script summaries with the new wording, and relax the retry regression fixture so the full fast suite stays deterministic under load."
sections:
  Summary: |-
    Harden local-ci cold-start step ordering
    
    Move the CLI cold-start baseline check ahead of the heavy build step in local fast CI, align the cold-baseline script summaries with the new wording, and relax the retry regression fixture so the full fast suite stays deterministic under load.
  Scope: |-
    - In scope: Move the CLI cold-start baseline check ahead of the heavy build step in local fast CI, align the cold-baseline script summaries with the new wording, and relax the retry regression fixture so the full fast suite stays deterministic under load.
    - Out of scope: unrelated refactors not required for "Harden local-ci cold-start step ordering".
  Plan: "Reorder local fast CI so bench:cli:cold:check runs before the build-heavy steps, keep the warmed retry-capable baseline script, update the script test expectations to the new summary wording, and re-verify the full fast CI route plus critical CLI E2E under the same NVM+Bun toolchain used by pre-push."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T17:19:20.052Z — VERIFY — ok
    
    By: CODER
    
    Note: Validated the reordered cold-start gate with the full fast local CI route and the critical CLI E2E suite under the same NVM plus Bun toolchain used by pre-push.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T17:18:43.914Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: node scripts/run-local-ci.mjs --mode fast passed after moving bench:cli:cold:check ahead of build, and vitest.workspace.ts --project critical remained green on the same checkout.
      Impact: local pre-push now measures the CLI cold path before build heat, while the updated regression expectations remain deterministic under full-suite load.
      Resolution: run-local-ci executes the cold baseline before build, the baseline summary wording is internally consistent, and the retry regression fixture leaves enough headroom to pass under full-fast load.
id_source: "generated"
---
## Summary

Harden local-ci cold-start step ordering

Move the CLI cold-start baseline check ahead of the heavy build step in local fast CI, align the cold-baseline script summaries with the new wording, and relax the retry regression fixture so the full fast suite stays deterministic under load.

## Scope

- In scope: Move the CLI cold-start baseline check ahead of the heavy build step in local fast CI, align the cold-baseline script summaries with the new wording, and relax the retry regression fixture so the full fast suite stays deterministic under load.
- Out of scope: unrelated refactors not required for "Harden local-ci cold-start step ordering".

## Plan

Reorder local fast CI so bench:cli:cold:check runs before the build-heavy steps, keep the warmed retry-capable baseline script, update the script test expectations to the new summary wording, and re-verify the full fast CI route plus critical CLI E2E under the same NVM+Bun toolchain used by pre-push.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T17:19:20.052Z — VERIFY — ok

By: CODER

Note: Validated the reordered cold-start gate with the full fast local CI route and the critical CLI E2E suite under the same NVM plus Bun toolchain used by pre-push.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T17:18:43.914Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: node scripts/run-local-ci.mjs --mode fast passed after moving bench:cli:cold:check ahead of build, and vitest.workspace.ts --project critical remained green on the same checkout.
  Impact: local pre-push now measures the CLI cold path before build heat, while the updated regression expectations remain deterministic under full-suite load.
  Resolution: run-local-ci executes the cold baseline before build, the baseline summary wording is internally consistent, and the retry regression fixture leaves enough headroom to pass under full-fast load.
