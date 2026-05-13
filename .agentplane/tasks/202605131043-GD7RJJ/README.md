---
id: "202605131043-GD7RJJ"
title: "Reorganize repository scripts by ownership"
result_summary: "Reorganized repository scripts by ownership with root compatibility wrappers and updated script docs; merged via PR #3634."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T13:01:20.953Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T13:13:43.175Z"
  updated_by: "CODER"
  note: "Verified: root script implementations are grouped under scripts/checks, scripts/generate, scripts/bench, scripts/release, and scripts/workflow with root compatibility wrappers and updated package script references. Checks passed: docs:scripts:check, check:types-files, hotspots:check, clone:check, knip:check, arch:check, eslint/prettier, framework:dev:bootstrap."
  attempts: 0
commit:
  hash: "d61a19de647411b18df12fa28bd417b59b67043c"
  message: "Merge task 202605131043-2GMHKQ: generated scripts context refactor"
comments:
  -
    author: "CODER"
    body: "Start: Reorganizing repository scripts by ownership while preserving callable package and compatibility entrypoints."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated through PR #3634 with the scripts ownership reorganization included; hosted Core and Docs checks passed, and main includes merge d61a19de."
events:
  -
    type: "status"
    at: "2026-05-13T13:01:45.883Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Reorganizing repository scripts by ownership while preserving callable package and compatibility entrypoints."
  -
    type: "verify"
    at: "2026-05-13T13:13:43.175Z"
    author: "CODER"
    state: "ok"
    note: "Verified: root script implementations are grouped under scripts/checks, scripts/generate, scripts/bench, scripts/release, and scripts/workflow with root compatibility wrappers and updated package script references. Checks passed: docs:scripts:check, check:types-files, hotspots:check, clone:check, knip:check, arch:check, eslint/prettier, framework:dev:bootstrap."
  -
    type: "status"
    at: "2026-05-13T13:45:55.252Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated through PR #3634 with the scripts ownership reorganization included; hosted Core and Docs checks passed, and main includes merge d61a19de."
doc_version: 3
doc_updated_at: "2026-05-13T13:45:55.252Z"
doc_updated_by: "INTEGRATOR"
description: "Split the root scripts directory into purpose-owned groups such as checks, generate, bench, release, workflow, and shared lib, updating package scripts and compatibility surfaces safely."
sections:
  Summary: |-
    Reorganize repository scripts by ownership
    
    Split the root scripts directory into purpose-owned groups such as checks, generate, bench, release, workflow, and shared lib, updating package scripts and compatibility surfaces safely.
  Scope: |-
    - In scope: Split the root scripts directory into purpose-owned groups such as checks, generate, bench, release, workflow, and shared lib, updating package scripts and compatibility surfaces safely.
    - Out of scope: unrelated refactors not required for "Reorganize repository scripts by ownership".
  Plan: "Batch member under primary 202605131043-2GMHKQ. Scope: reorganize root scripts into purpose-owned directories, update package/docs/CI references, and preserve compatibility for existing script entrypoints. Verification: package script reference scan, focused script checks, typecheck/lint, and hosted checks."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T13:13:43.175Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: root script implementations are grouped under scripts/checks, scripts/generate, scripts/bench, scripts/release, and scripts/workflow with root compatibility wrappers and updated package script references. Checks passed: docs:scripts:check, check:types-files, hotspots:check, clone:check, knip:check, arch:check, eslint/prettier, framework:dev:bootstrap.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T13:01:45.883Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131043-2GMHKQ-generated-scripts-context-refactor/.agentplane/tasks/202605131043-GD7RJJ/blueprint/resolved-snapshot.json
    - old_digest: 17d6bee1ca04234e1fd06fbd7539e0704090dcb7ee5b7a46cd8d51ae8522f260
    - current_digest: 17d6bee1ca04234e1fd06fbd7539e0704090dcb7ee5b7a46cd8d51ae8522f260
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131043-GD7RJJ
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Reorganize repository scripts by ownership

Split the root scripts directory into purpose-owned groups such as checks, generate, bench, release, workflow, and shared lib, updating package scripts and compatibility surfaces safely.

## Scope

- In scope: Split the root scripts directory into purpose-owned groups such as checks, generate, bench, release, workflow, and shared lib, updating package scripts and compatibility surfaces safely.
- Out of scope: unrelated refactors not required for "Reorganize repository scripts by ownership".

## Plan

Batch member under primary 202605131043-2GMHKQ. Scope: reorganize root scripts into purpose-owned directories, update package/docs/CI references, and preserve compatibility for existing script entrypoints. Verification: package script reference scan, focused script checks, typecheck/lint, and hosted checks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T13:13:43.175Z — VERIFY — ok

By: CODER

Note: Verified: root script implementations are grouped under scripts/checks, scripts/generate, scripts/bench, scripts/release, and scripts/workflow with root compatibility wrappers and updated package script references. Checks passed: docs:scripts:check, check:types-files, hotspots:check, clone:check, knip:check, arch:check, eslint/prettier, framework:dev:bootstrap.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T13:01:45.883Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131043-2GMHKQ-generated-scripts-context-refactor/.agentplane/tasks/202605131043-GD7RJJ/blueprint/resolved-snapshot.json
- old_digest: 17d6bee1ca04234e1fd06fbd7539e0704090dcb7ee5b7a46cd8d51ae8522f260
- current_digest: 17d6bee1ca04234e1fd06fbd7539e0704090dcb7ee5b7a46cd8d51ae8522f260
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131043-GD7RJJ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
