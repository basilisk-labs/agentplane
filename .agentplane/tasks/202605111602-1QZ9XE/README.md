---
id: "202605111602-1QZ9XE"
title: "Resolve v0.5 CLI upgrade test timeouts and artifact paths"
status: "DOING"
priority: "med"
owner: "UPGRADER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "cli,bug,upgrade"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-12T06:11:53.775Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-12T06:12:53.329Z"
  updated_by: "UPGRADER"
  note: "Command: bun run test:platform-critical. Result: pass. Evidence: 6 files, 72 tests passed including run-cli.core.upgrade.test.ts upgrade dry-run, artifact restore, legacy config removal, and migrate-task-docs paths. Scope: v0.5 upgrade/init artifact paths and timeout-sensitive CLI regressions."
  attempts: 0
commit: null
comments:
  -
    author: "UPGRADER"
    body: "Start: stabilizing v0.5 upgrade and init artifact-path behavior with focused CLI regression evidence."
events:
  -
    type: "status"
    at: "2026-05-12T06:11:54.161Z"
    author: "UPGRADER"
    from: "TODO"
    to: "DOING"
    note: "Start: stabilizing v0.5 upgrade and init artifact-path behavior with focused CLI regression evidence."
  -
    type: "verify"
    at: "2026-05-12T06:12:53.329Z"
    author: "UPGRADER"
    state: "ok"
    note: "Command: bun run test:platform-critical. Result: pass. Evidence: 6 files, 72 tests passed including run-cli.core.upgrade.test.ts upgrade dry-run, artifact restore, legacy config removal, and migrate-task-docs paths. Scope: v0.5 upgrade/init artifact paths and timeout-sensitive CLI regressions."
doc_version: 3
doc_updated_at: "2026-05-12T06:12:53.340Z"
doc_updated_by: "UPGRADER"
description: "Сократить регрессии по upgrade и восстановить стабильные пути артефактов для dry-run/restore сценариев в рамках подготовки релиза v0.5."
sections:
  Summary: |-
    Resolve v0.5 CLI upgrade test timeouts and artifact paths
    
    Сократить регрессии по upgrade и восстановить стабильные пути артефактов для dry-run/restore сценариев в рамках подготовки релиза v0.5.
  Scope: |-
    - In scope: Сократить регрессии по upgrade и восстановить стабильные пути артефактов для dry-run/restore сценариев в рамках подготовки релиза v0.5.
    - Out of scope: unrelated refactors not required for "Resolve v0.5 CLI upgrade test timeouts and artifact paths".
  Plan: "Batch v0.5 release readiness plan: 1. Stabilize upgrade/init artifact-path regressions and timeout-sensitive tests. 2. Verify with platform-critical and full cli-core coverage. 3. Record residual release blockers explicitly before finish."
  Verify Steps: |-
    1. Review the requested outcome for "Resolve v0.5 CLI upgrade test timeouts and artifact paths". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-12T06:12:53.329Z — VERIFY — ok
    
    By: UPGRADER
    
    Note: Command: bun run test:platform-critical. Result: pass. Evidence: 6 files, 72 tests passed including run-cli.core.upgrade.test.ts upgrade dry-run, artifact restore, legacy config removal, and migrate-task-docs paths. Scope: v0.5 upgrade/init artifact paths and timeout-sensitive CLI regressions.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-12T06:11:54.161Z, excerpt_hash=sha256:3fd897f8d9ea31eaae7340cc754ff0bd94b68cd52da3a7d089fe5f11960b7df9
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605111602-1QZ9XE/blueprint/resolved-snapshot.json
    - old_digest: cae1b50c5af08c5b997d5f987799d082b7a52e2d524c945265eef38dd4fe13df
    - current_digest: cae1b50c5af08c5b997d5f987799d082b7a52e2d524c945265eef38dd4fe13df
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605111602-1QZ9XE
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Resolve v0.5 CLI upgrade test timeouts and artifact paths

Сократить регрессии по upgrade и восстановить стабильные пути артефактов для dry-run/restore сценариев в рамках подготовки релиза v0.5.

## Scope

- In scope: Сократить регрессии по upgrade и восстановить стабильные пути артефактов для dry-run/restore сценариев в рамках подготовки релиза v0.5.
- Out of scope: unrelated refactors not required for "Resolve v0.5 CLI upgrade test timeouts and artifact paths".

## Plan

Batch v0.5 release readiness plan: 1. Stabilize upgrade/init artifact-path regressions and timeout-sensitive tests. 2. Verify with platform-critical and full cli-core coverage. 3. Record residual release blockers explicitly before finish.

## Verify Steps

1. Review the requested outcome for "Resolve v0.5 CLI upgrade test timeouts and artifact paths". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-12T06:12:53.329Z — VERIFY — ok

By: UPGRADER

Note: Command: bun run test:platform-critical. Result: pass. Evidence: 6 files, 72 tests passed including run-cli.core.upgrade.test.ts upgrade dry-run, artifact restore, legacy config removal, and migrate-task-docs paths. Scope: v0.5 upgrade/init artifact paths and timeout-sensitive CLI regressions.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-12T06:11:54.161Z, excerpt_hash=sha256:3fd897f8d9ea31eaae7340cc754ff0bd94b68cd52da3a7d089fe5f11960b7df9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605111602-1QZ9XE/blueprint/resolved-snapshot.json
- old_digest: cae1b50c5af08c5b997d5f987799d082b7a52e2d524c945265eef38dd4fe13df
- current_digest: cae1b50c5af08c5b997d5f987799d082b7a52e2d524c945265eef38dd4fe13df
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605111602-1QZ9XE

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
