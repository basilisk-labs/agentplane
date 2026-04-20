---
id: "202604191644-D2RV5K"
title: "Extend significant coverage enforcement to new hotspots"
result_summary: "Expanded significant coverage guard from 2 to 21 source targets across init, finish, hosted merge sync, and guard modules."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T16:24:52.662Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T16:28:27.029Z"
  updated_by: "CODER"
  note: "Command: agentplane task verify-show 202604191644-D2RV5K; Result: pass; Evidence: verification contract reviewed. Command: bun run coverage:significant; Result: pass; Evidence: Significant suite contract OK, 21 source targets. Command: bun run lint:core; Result: pass; Evidence: eslint completed. Command: bun run format:check; Result: pass; Evidence: Prettier reported all matched files use style."
commit:
  hash: "24c9e3d6338cb3849508911d3ad77e2f7cb17dfa"
  message: "🧪 D2RV5K test: extend significant coverage targets"
comments:
  -
    author: "CODER"
    body: "Start: Extending significant coverage contract to the recently split hotspot modules."
  -
    author: "CODER"
    body: "Verified: significant coverage contract now includes the newly decomposed hotspot modules and passes local checks."
events:
  -
    type: "status"
    at: "2026-04-20T16:24:56.912Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extending significant coverage contract to the recently split hotspot modules."
  -
    type: "verify"
    at: "2026-04-20T16:28:27.029Z"
    author: "CODER"
    state: "ok"
    note: "Command: agentplane task verify-show 202604191644-D2RV5K; Result: pass; Evidence: verification contract reviewed. Command: bun run coverage:significant; Result: pass; Evidence: Significant suite contract OK, 21 source targets. Command: bun run lint:core; Result: pass; Evidence: eslint completed. Command: bun run format:check; Result: pass; Evidence: Prettier reported all matched files use style."
  -
    type: "status"
    at: "2026-04-20T16:28:41.223Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: significant coverage contract now includes the newly decomposed hotspot modules and passes local checks."
doc_version: 3
doc_updated_at: "2026-04-20T16:28:41.223Z"
doc_updated_by: "CODER"
description: "Epic J′. Add the newly split hotspot modules to significant coverage enforcement."
sections:
  Summary: |-
    Extend significant coverage enforcement to new hotspots
    
    Epic J′. Add the newly split hotspot modules to significant coverage enforcement.
  Scope: |-
    - In scope: Epic J′. Add the newly split hotspot modules to significant coverage enforcement.
    - Out of scope: unrelated refactors not required for "Extend significant coverage enforcement to new hotspots".
  Plan: "Extend scripts/check-significant-coverage.mjs from the old guard-only contract to cover the newly decomposed hotspot surfaces. Add source->test entries for init, hosted-merge-sync, finish, and guard split modules; keep the script as a fast existence/contract check rather than a slow coverage run. Verification: agentplane task verify-show; bun run coverage:significant; bun run lint:core; bun run format:check."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T16:28:27.029Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane task verify-show 202604191644-D2RV5K; Result: pass; Evidence: verification contract reviewed. Command: bun run coverage:significant; Result: pass; Evidence: Significant suite contract OK, 21 source targets. Command: bun run lint:core; Result: pass; Evidence: eslint completed. Command: bun run format:check; Result: pass; Evidence: Prettier reported all matched files use style.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T16:24:56.922Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Extend significant coverage enforcement to new hotspots

Epic J′. Add the newly split hotspot modules to significant coverage enforcement.

## Scope

- In scope: Epic J′. Add the newly split hotspot modules to significant coverage enforcement.
- Out of scope: unrelated refactors not required for "Extend significant coverage enforcement to new hotspots".

## Plan

Extend scripts/check-significant-coverage.mjs from the old guard-only contract to cover the newly decomposed hotspot surfaces. Add source->test entries for init, hosted-merge-sync, finish, and guard split modules; keep the script as a fast existence/contract check rather than a slow coverage run. Verification: agentplane task verify-show; bun run coverage:significant; bun run lint:core; bun run format:check.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T16:28:27.029Z — VERIFY — ok

By: CODER

Note: Command: agentplane task verify-show 202604191644-D2RV5K; Result: pass; Evidence: verification contract reviewed. Command: bun run coverage:significant; Result: pass; Evidence: Significant suite contract OK, 21 source targets. Command: bun run lint:core; Result: pass; Evidence: eslint completed. Command: bun run format:check; Result: pass; Evidence: Prettier reported all matched files use style.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T16:24:56.922Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
