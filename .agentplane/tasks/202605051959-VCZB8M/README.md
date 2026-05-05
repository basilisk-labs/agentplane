---
id: "202605051959-VCZB8M"
title: "Add blueprint explain CLI surface"
result_summary: "Merged via PR #942. Blueprint list and explain CLI surfaces are available on main."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "cli"
  - "code"
  - "rc1"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T20:00:06.364Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T20:44:39.075Z"
  updated_by: "CODER"
  note: "Blueprint CLI verified: blueprint list, synthetic blueprint explain, task-based blueprint explain --json, and generated CLI reference all pass. Checks: CLI smoke commands; docs:cli:check; ci:local:fast."
commit:
  hash: "c8c9cbe086a86a9c396eeef9e26ff35027260159"
  message: "🔀 5WRJZK integrate: Bridge recipe hints into blueprint resolver"
comments:
  -
    author: "CODER"
    body: "Start: Adding read-only blueprint list and explain CLI surfaces for task-based and synthetic resolver inputs without executing blueprint nodes."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #942 merged into main with blueprint list and explain CLI surfaces verified locally and by hosted checks."
events:
  -
    type: "status"
    at: "2026-05-05T20:25:56.485Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding read-only blueprint list and explain CLI surfaces for task-based and synthetic resolver inputs without executing blueprint nodes."
  -
    type: "verify"
    at: "2026-05-05T20:44:39.075Z"
    author: "CODER"
    state: "ok"
    note: "Blueprint CLI verified: blueprint list, synthetic blueprint explain, task-based blueprint explain --json, and generated CLI reference all pass. Checks: CLI smoke commands; docs:cli:check; ci:local:fast."
  -
    type: "status"
    at: "2026-05-05T20:52:06.290Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #942 merged into main with blueprint list and explain CLI surfaces verified locally and by hosted checks."
doc_version: 3
doc_updated_at: "2026-05-05T20:52:06.292Z"
doc_updated_by: "INTEGRATOR"
description: "Add agentplane blueprint list and agentplane blueprint explain with task-id and synthetic inputs, JSON output, and command/help tests so resolved routes are visible before execution."
sections:
  Summary: |-
    Add blueprint explain CLI surface
    
    Add agentplane blueprint list and agentplane blueprint explain with task-id and synthetic inputs, JSON output, and command/help tests so resolved routes are visible before execution.
  Scope: |-
    - In scope: Add agentplane blueprint list and agentplane blueprint explain with task-id and synthetic inputs, JSON output, and command/help tests so resolved routes are visible before execution.
    - Out of scope: unrelated refactors not required for "Add blueprint explain CLI surface".
  Plan: "Add the first user-visible blueprint CLI. Scope: command specs/loaders/catalog entries for agentplane blueprint list and agentplane blueprint explain; task-id and synthetic explain inputs; --json output; tests for human and JSON output. Must not execute blueprint nodes or mutate task state. Depends on existing resolver/explain code from 202605051928-26C18X."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T20:44:39.075Z — VERIFY — ok
    
    By: CODER
    
    Note: Blueprint CLI verified: blueprint list, synthetic blueprint explain, task-based blueprint explain --json, and generated CLI reference all pass. Checks: CLI smoke commands; docs:cli:check; ci:local:fast.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T20:25:56.485Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add blueprint explain CLI surface

Add agentplane blueprint list and agentplane blueprint explain with task-id and synthetic inputs, JSON output, and command/help tests so resolved routes are visible before execution.

## Scope

- In scope: Add agentplane blueprint list and agentplane blueprint explain with task-id and synthetic inputs, JSON output, and command/help tests so resolved routes are visible before execution.
- Out of scope: unrelated refactors not required for "Add blueprint explain CLI surface".

## Plan

Add the first user-visible blueprint CLI. Scope: command specs/loaders/catalog entries for agentplane blueprint list and agentplane blueprint explain; task-id and synthetic explain inputs; --json output; tests for human and JSON output. Must not execute blueprint nodes or mutate task state. Depends on existing resolver/explain code from 202605051928-26C18X.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T20:44:39.075Z — VERIFY — ok

By: CODER

Note: Blueprint CLI verified: blueprint list, synthetic blueprint explain, task-based blueprint explain --json, and generated CLI reference all pass. Checks: CLI smoke commands; docs:cli:check; ci:local:fast.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T20:25:56.485Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
