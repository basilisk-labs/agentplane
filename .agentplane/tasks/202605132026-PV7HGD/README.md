---
id: "202605132026-PV7HGD"
title: "Cloud backend: auto-sync on task reads/writes"
result_summary: "Merged to main in PR #3694; v0.6 readiness and assimilation checks passed."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "cloud"
  - "code"
  - "sync"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T20:26:20.049Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T07:59:34.920Z"
  updated_by: "CODER"
  note: "Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed."
  attempts: 0
commit:
  hash: "ec628cd9a2aa899cca01611be9519181845ba555"
  message: "Merge pull request #3694 from basilisk-labs/task/202605140709-5H7BAA/v06-readiness-blockers"
comments:
  -
    author: "CODER"
    body: "Start: Implement cloud backend autosync (auto pull on stale + auto push after writes) so local status changes propagate to cloud/GitHub without manual backend sync, while preserving conflict safety."
  -
    author: "INTEGRATOR"
    body: "Verified: merged via PR #3694 after full v0.6 readiness checks and GitHub CI passed."
events:
  -
    type: "status"
    at: "2026-05-13T20:27:37.798Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement cloud backend autosync (auto pull on stale + auto push after writes) so local status changes propagate to cloud/GitHub without manual backend sync, while preserving conflict safety."
  -
    type: "verify"
    at: "2026-05-13T20:36:01.518Z"
    author: "CODER"
    state: "ok"
    note: "Auto-sync implemented for cloud backend. Verified locally: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts (all pass)."
  -
    type: "verify"
    at: "2026-05-13T20:39:51.814Z"
    author: "CODER"
    state: "ok"
    note: "Refactor: split cloud push helper to satisfy hotspot limit (<600 loc). Verified locally: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts."
  -
    type: "verify"
    at: "2026-05-14T07:59:34.920Z"
    author: "CODER"
    state: "ok"
    note: "Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed."
  -
    type: "status"
    at: "2026-05-14T09:04:46.435Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: merged via PR #3694 after full v0.6 readiness checks and GitHub CI passed."
doc_version: 3
doc_updated_at: "2026-05-14T09:04:46.438Z"
doc_updated_by: "INTEGRATOR"
description: "Implement automatic cloud projection refresh + push after local task mutations, so local ↔ cloud ↔ GitHub status stays in sync without explicit 'backend sync'. User request: bidirectional sync local folder ↔ GitHub via cloud backend."
sections:
  Summary: |-
    Cloud backend: auto-sync on task reads/writes
    
    Implement automatic cloud projection refresh + push after local task mutations, so local ↔ cloud ↔ GitHub status stays in sync without explicit 'backend sync'. User request: bidirectional sync local folder ↔ GitHub via cloud backend.
  Scope: |-
    - In scope: Implement automatic cloud projection refresh + push after local task mutations, so local ↔ cloud ↔ GitHub status stays in sync without explicit 'backend sync'. User request: bidirectional sync local folder ↔ GitHub via cloud backend.
    - Out of scope: unrelated refactors not required for "Cloud backend: auto-sync on task reads/writes".
  Plan: |-
    1) Define desired autosync semantics (when: read/write; how: pull-on-stale, push-after-write; conflict behavior)
    2) Extend CloudBackend runtime to auto-pull when stale before writes; fail-safe on conflicts
    3) Add optional auto-push after successful write (debounced per-process)
    4) Add read-path auto-refresh when projection is stale (list/get) with safe error if conflicts
    5) Add unit tests covering: stale -> auto pull; write -> auto push; require_network=true disables autosync
    6) Update docs/help text for cloud backend; keep explicit backend sync as escape hatch
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T20:36:01.518Z — VERIFY — ok
    
    By: CODER
    
    Note: Auto-sync implemented for cloud backend. Verified locally: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts (all pass).
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T20:27:37.798Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132026-PV7HGD-cloud-autosync/.agentplane/tasks/202605132026-PV7HGD/blueprint/resolved-snapshot.json
    - old_digest: a4ccdd692cc733d6b5ac6c796a283e64fa564e1f0812be7a3c64bee81a61faa7
    - current_digest: a4ccdd692cc733d6b5ac6c796a283e64fa564e1f0812be7a3c64bee81a61faa7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605132026-PV7HGD
    
    ### 2026-05-13T20:39:51.814Z — VERIFY — ok
    
    By: CODER
    
    Note: Refactor: split cloud push helper to satisfy hotspot limit (<600 loc). Verified locally: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T20:36:01.526Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132026-PV7HGD-cloud-autosync/.agentplane/tasks/202605132026-PV7HGD/blueprint/resolved-snapshot.json
    - old_digest: a4ccdd692cc733d6b5ac6c796a283e64fa564e1f0812be7a3c64bee81a61faa7
    - current_digest: a4ccdd692cc733d6b5ac6c796a283e64fa564e1f0812be7a3c64bee81a61faa7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605132026-PV7HGD
    
    ### 2026-05-14T07:59:34.920Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T20:39:51.819Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605140709-5H7BAA-v06-readiness-blockers/.agentplane/tasks/202605132026-PV7HGD/blueprint/resolved-snapshot.json
    - old_digest: a4ccdd692cc733d6b5ac6c796a283e64fa564e1f0812be7a3c64bee81a61faa7
    - current_digest: a4ccdd692cc733d6b5ac6c796a283e64fa564e1f0812be7a3c64bee81a61faa7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605132026-PV7HGD
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Cloud backend: auto-sync on task reads/writes

Implement automatic cloud projection refresh + push after local task mutations, so local ↔ cloud ↔ GitHub status stays in sync without explicit 'backend sync'. User request: bidirectional sync local folder ↔ GitHub via cloud backend.

## Scope

- In scope: Implement automatic cloud projection refresh + push after local task mutations, so local ↔ cloud ↔ GitHub status stays in sync without explicit 'backend sync'. User request: bidirectional sync local folder ↔ GitHub via cloud backend.
- Out of scope: unrelated refactors not required for "Cloud backend: auto-sync on task reads/writes".

## Plan

1) Define desired autosync semantics (when: read/write; how: pull-on-stale, push-after-write; conflict behavior)
2) Extend CloudBackend runtime to auto-pull when stale before writes; fail-safe on conflicts
3) Add optional auto-push after successful write (debounced per-process)
4) Add read-path auto-refresh when projection is stale (list/get) with safe error if conflicts
5) Add unit tests covering: stale -> auto pull; write -> auto push; require_network=true disables autosync
6) Update docs/help text for cloud backend; keep explicit backend sync as escape hatch

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T20:36:01.518Z — VERIFY — ok

By: CODER

Note: Auto-sync implemented for cloud backend. Verified locally: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts (all pass).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T20:27:37.798Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132026-PV7HGD-cloud-autosync/.agentplane/tasks/202605132026-PV7HGD/blueprint/resolved-snapshot.json
- old_digest: a4ccdd692cc733d6b5ac6c796a283e64fa564e1f0812be7a3c64bee81a61faa7
- current_digest: a4ccdd692cc733d6b5ac6c796a283e64fa564e1f0812be7a3c64bee81a61faa7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605132026-PV7HGD

### 2026-05-13T20:39:51.814Z — VERIFY — ok

By: CODER

Note: Refactor: split cloud push helper to satisfy hotspot limit (<600 loc). Verified locally: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T20:36:01.526Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132026-PV7HGD-cloud-autosync/.agentplane/tasks/202605132026-PV7HGD/blueprint/resolved-snapshot.json
- old_digest: a4ccdd692cc733d6b5ac6c796a283e64fa564e1f0812be7a3c64bee81a61faa7
- current_digest: a4ccdd692cc733d6b5ac6c796a283e64fa564e1f0812be7a3c64bee81a61faa7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605132026-PV7HGD

### 2026-05-14T07:59:34.920Z — VERIFY — ok

By: CODER

Note: Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T20:39:51.819Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605140709-5H7BAA-v06-readiness-blockers/.agentplane/tasks/202605132026-PV7HGD/blueprint/resolved-snapshot.json
- old_digest: a4ccdd692cc733d6b5ac6c796a283e64fa564e1f0812be7a3c64bee81a61faa7
- current_digest: a4ccdd692cc733d6b5ac6c796a283e64fa564e1f0812be7a3c64bee81a61faa7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605132026-PV7HGD

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
