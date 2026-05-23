---
id: "202605230831-AFG753"
title: "Strict release task registry hidden artifact scan"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T08:54:40.017Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T08:58:07.143Z"
  updated_by: "CODER"
  note: "Commands: bun test packages/agentplane/src/commands/release/task-state-script.test.ts; bun run lint:core. Result: pass. Evidence: task-state script test 1 pass; lint clean. Scope: release task registry hidden README artifact detection."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: harden release task registry readiness so task directories missing README artifacts fail release checks instead of being silently skipped."
events:
  -
    type: "status"
    at: "2026-05-23T08:54:53.905Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: harden release task registry readiness so task directories missing README artifacts fail release checks instead of being silently skipped."
  -
    type: "verify"
    at: "2026-05-23T08:58:07.143Z"
    author: "CODER"
    state: "ok"
    note: "Commands: bun test packages/agentplane/src/commands/release/task-state-script.test.ts; bun run lint:core. Result: pass. Evidence: task-state script test 1 pass; lint clean. Scope: release task registry hidden README artifact detection."
doc_version: 3
doc_updated_at: "2026-05-23T08:58:07.159Z"
doc_updated_by: "CODER"
description: "Make release readiness fail when task directories exist without README artifacts so hidden active tasks cannot bypass task list."
sections:
  Summary: |-
    Strict release task registry hidden artifact scan

    Make release readiness fail when task directories exist without README artifacts so hidden active tasks cannot bypass task list.
  Scope: |-
    - In scope: Make release readiness fail when task directories exist without README artifacts so hidden active tasks cannot bypass task list.
    - Out of scope: unrelated refactors not required for "Strict release task registry hidden artifact scan".
  Plan: "Plan: make release task registry checks scan every task directory, not only directories with README.md; fail release readiness on task directories missing README.md; add regression coverage for hidden active task artifacts; keep ordinary task listing behavior unchanged."
  Verify Steps: |-
    1. Run bun test packages/agentplane/src/commands/release/task-state-script.test.ts. Expected: check-task-registry-ready fails when a task directory is missing README.md.
    2. Run bun run lint:core. Expected: no lint errors in touched script/test paths.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T08:58:07.143Z — VERIFY — ok

    By: CODER

    Note: Commands: bun test packages/agentplane/src/commands/release/task-state-script.test.ts; bun run lint:core. Result: pass. Evidence: task-state script test 1 pass; lint clean. Scope: release task registry hidden README artifact detection.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T08:58:04.470Z, excerpt_hash=sha256:9424ed718561715783ccf4cb5939c30bfaa75e1c7db323a77c38a90659753ba9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230831-AFG753-strict-release-task-registry/.agentplane/tasks/202605230831-AFG753/blueprint/resolved-snapshot.json
    - old_digest: 94f868fcca2cd5fe092711d46a2a944ecd68339907efb2fd5fd6739a68289d22
    - current_digest: 94f868fcca2cd5fe092711d46a2a944ecd68339907efb2fd5fd6739a68289d22
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230831-AFG753

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Strict release task registry hidden artifact scan

Make release readiness fail when task directories exist without README artifacts so hidden active tasks cannot bypass task list.

## Scope

- In scope: Make release readiness fail when task directories exist without README artifacts so hidden active tasks cannot bypass task list.
- Out of scope: unrelated refactors not required for "Strict release task registry hidden artifact scan".

## Plan

Plan: make release task registry checks scan every task directory, not only directories with README.md; fail release readiness on task directories missing README.md; add regression coverage for hidden active task artifacts; keep ordinary task listing behavior unchanged.

## Verify Steps

1. Run bun test packages/agentplane/src/commands/release/task-state-script.test.ts. Expected: check-task-registry-ready fails when a task directory is missing README.md.
2. Run bun run lint:core. Expected: no lint errors in touched script/test paths.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T08:58:07.143Z — VERIFY — ok

By: CODER

Note: Commands: bun test packages/agentplane/src/commands/release/task-state-script.test.ts; bun run lint:core. Result: pass. Evidence: task-state script test 1 pass; lint clean. Scope: release task registry hidden README artifact detection.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T08:58:04.470Z, excerpt_hash=sha256:9424ed718561715783ccf4cb5939c30bfaa75e1c7db323a77c38a90659753ba9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230831-AFG753-strict-release-task-registry/.agentplane/tasks/202605230831-AFG753/blueprint/resolved-snapshot.json
- old_digest: 94f868fcca2cd5fe092711d46a2a944ecd68339907efb2fd5fd6739a68289d22
- current_digest: 94f868fcca2cd5fe092711d46a2a944ecd68339907efb2fd5fd6739a68289d22
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230831-AFG753

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
