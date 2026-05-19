---
id: "202605191451-1E0EHD"
title: "Add daily cloud pull before task start"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T14:52:16.223Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T15:36:20.083Z"
  updated_by: "CODER"
  note: |-
    Command: npm test -- --run packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts
    Result: pass
    Evidence: 3 files, 30 tests passed after extracting daily-start tests.
    Scope: cloud backend state parsing/writing, existing cloud backend behavior, and daily task-start pull behavior.

    Command: npm run typecheck
    Result: pass
    Evidence: tsc -b exited 0.
    Scope: TypeScript project references.

    Command: npm run build
    Result: pass
    Evidence: tsc -b plus core, recipes, and agentplane bundles built successfully.
    Scope: package build outputs.

    Command: bun run hotspots:check
    Result: pass
    Evidence: hotspot threshold check passed; oversized test baseline OK.
    Scope: line-budget regression from the cloud backend split.

    Command: ap doctor
    Result: pass
    Evidence: doctor (OK), errors=0 warnings=0.
    Scope: repo-local runtime/workflow health.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy routing contract.
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement daily cloud projection pull before task start-ready with focused backend state tests."
events:
  -
    type: "status"
    at: "2026-05-19T14:52:45.190Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement daily cloud projection pull before task start-ready with focused backend state tests."
  -
    type: "verify"
    at: "2026-05-19T15:03:49.046Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: npm test -- --run packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts
      Result: pass
      Evidence: 2 files, 30 tests passed.
      Scope: cloud backend state parsing/writing and daily task-start pull behavior.

      Command: npm run typecheck
      Result: pass
      Evidence: tsc -b exited 0 after state parser type fix.
      Scope: TypeScript project references.

      Command: npm run build
      Result: pass
      Evidence: tsc -b plus core, recipes, and agentplane bundles built successfully.
      Scope: package build outputs.

      Command: ap doctor
      Result: pass
      Evidence: doctor (OK), errors=0 warnings=0.
      Scope: repo-local runtime/workflow health.

      Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK.
      Scope: policy routing contract.
  -
    type: "verify"
    at: "2026-05-19T15:08:21.753Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: npm test -- --run packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts
      Result: pass
      Evidence: 2 files, 30 tests passed after final code changes.
      Scope: cloud backend state parsing/writing and daily task-start pull behavior.

      Command: npm run typecheck
      Result: pass
      Evidence: tsc -b exited 0.
      Scope: TypeScript project references.

      Command: npm run build
      Result: pass
      Evidence: tsc -b plus core, recipes, and agentplane bundles built successfully.
      Scope: package build outputs.

      Command: ap doctor
      Result: pass
      Evidence: doctor (OK), errors=0 warnings=0.
      Scope: repo-local runtime/workflow health.

      Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK.
      Scope: policy routing contract.
  -
    type: "verify"
    at: "2026-05-19T15:36:20.083Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: npm test -- --run packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts
      Result: pass
      Evidence: 3 files, 30 tests passed after extracting daily-start tests.
      Scope: cloud backend state parsing/writing, existing cloud backend behavior, and daily task-start pull behavior.

      Command: npm run typecheck
      Result: pass
      Evidence: tsc -b exited 0.
      Scope: TypeScript project references.

      Command: npm run build
      Result: pass
      Evidence: tsc -b plus core, recipes, and agentplane bundles built successfully.
      Scope: package build outputs.

      Command: bun run hotspots:check
      Result: pass
      Evidence: hotspot threshold check passed; oversized test baseline OK.
      Scope: line-budget regression from the cloud backend split.

      Command: ap doctor
      Result: pass
      Evidence: doctor (OK), errors=0 warnings=0.
      Scope: repo-local runtime/workflow health.

      Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK.
      Scope: policy routing contract.
doc_version: 3
doc_updated_at: "2026-05-19T15:36:20.728Z"
doc_updated_by: "CODER"
description: "Before task start-ready on the cloud backend, pull the cloud projection once per local day so GitHub issue intake tasks are visible before local work begins."
sections:
  Summary: |-
    Add daily cloud pull before task start

    Before task start-ready on the cloud backend, pull the cloud projection once per local day so GitHub issue intake tasks are visible before local work begins.
  Scope: |-
    - In scope: Before task start-ready on the cloud backend, pull the cloud projection once per local day so GitHub issue intake tasks are visible before local work begins.
    - Out of scope: unrelated refactors not required for "Add daily cloud pull before task start".
  Plan: |-
    Summary: Add a cloud backend guard so task start-ready refreshes cloud projection once per local calendar day before local task mutation.

    Scope:
    - Cloud backend state schema and read/write compatibility.
    - CloudBackend pull decision logic before local mutations.
    - Focused unit tests for daily start pull behavior and state persistence.

    Plan:
    1. Extend cloud backend state with a dedicated start-ready pull timestamp while preserving existing state files.
    2. Add a CloudBackend method used before task start-ready/local mutation to pull when the last start pull date is before today.
    3. Wire start-ready to call that guard only for capable cloud backends without adding public CLI commands.
    4. Cover stale-day, same-day, and failure behavior with focused tests.

    Verify Steps:
    - npm test -- --run packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts
    - npm run typecheck
    - ap doctor
    - node .agentplane/policy/check-routing.mjs

    Rollback Plan: Revert the CloudBackend state/guard changes and tests; existing manual cloud pull remains available via backend sync.
  Verify Steps: |-
    - npm test -- --run packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts
    - npm run typecheck
    - npm run build
    - bun run hotspots:check
    - ap doctor
    - node .agentplane/policy/check-routing.mjs
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T15:03:49.046Z — VERIFY — ok

    By: CODER

    Note: Command: npm test -- --run packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts
    Result: pass
    Evidence: 2 files, 30 tests passed.
    Scope: cloud backend state parsing/writing and daily task-start pull behavior.

    Command: npm run typecheck
    Result: pass
    Evidence: tsc -b exited 0 after state parser type fix.
    Scope: TypeScript project references.

    Command: npm run build
    Result: pass
    Evidence: tsc -b plus core, recipes, and agentplane bundles built successfully.
    Scope: package build outputs.

    Command: ap doctor
    Result: pass
    Evidence: doctor (OK), errors=0 warnings=0.
    Scope: repo-local runtime/workflow health.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy routing contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:52:45.190Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191451-1E0EHD-daily-cloud-start-pull/.agentplane/tasks/202605191451-1E0EHD/blueprint/resolved-snapshot.json
    - old_digest: 3c61eab9093133e1fb2902afe4387bec8983889fe8d0749f1e9ae512226737d3
    - current_digest: 3c61eab9093133e1fb2902afe4387bec8983889fe8d0749f1e9ae512226737d3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191451-1E0EHD

    ### 2026-05-19T15:08:21.753Z — VERIFY — ok

    By: CODER

    Note: Command: npm test -- --run packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts
    Result: pass
    Evidence: 2 files, 30 tests passed after final code changes.
    Scope: cloud backend state parsing/writing and daily task-start pull behavior.

    Command: npm run typecheck
    Result: pass
    Evidence: tsc -b exited 0.
    Scope: TypeScript project references.

    Command: npm run build
    Result: pass
    Evidence: tsc -b plus core, recipes, and agentplane bundles built successfully.
    Scope: package build outputs.

    Command: ap doctor
    Result: pass
    Evidence: doctor (OK), errors=0 warnings=0.
    Scope: repo-local runtime/workflow health.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy routing contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:07:28.931Z, excerpt_hash=sha256:53e5c086a764aa3b9007b1dbb288210d602f0884bd83118f80f0d2186484e062

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191451-1E0EHD-daily-cloud-start-pull/.agentplane/tasks/202605191451-1E0EHD/blueprint/resolved-snapshot.json
    - old_digest: 3c61eab9093133e1fb2902afe4387bec8983889fe8d0749f1e9ae512226737d3
    - current_digest: 3c61eab9093133e1fb2902afe4387bec8983889fe8d0749f1e9ae512226737d3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191451-1E0EHD

    ### 2026-05-19T15:36:20.083Z — VERIFY — ok

    By: CODER

    Note: Command: npm test -- --run packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts
    Result: pass
    Evidence: 3 files, 30 tests passed after extracting daily-start tests.
    Scope: cloud backend state parsing/writing, existing cloud backend behavior, and daily task-start pull behavior.

    Command: npm run typecheck
    Result: pass
    Evidence: tsc -b exited 0.
    Scope: TypeScript project references.

    Command: npm run build
    Result: pass
    Evidence: tsc -b plus core, recipes, and agentplane bundles built successfully.
    Scope: package build outputs.

    Command: bun run hotspots:check
    Result: pass
    Evidence: hotspot threshold check passed; oversized test baseline OK.
    Scope: line-budget regression from the cloud backend split.

    Command: ap doctor
    Result: pass
    Evidence: doctor (OK), errors=0 warnings=0.
    Scope: repo-local runtime/workflow health.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy routing contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:36:04.664Z, excerpt_hash=sha256:782bb64e41c9ea0083027075ce7090c9c589b2154a3b0b14e5e4521fb904951b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191451-1E0EHD-daily-cloud-start-pull/.agentplane/tasks/202605191451-1E0EHD/blueprint/resolved-snapshot.json
    - old_digest: 3c61eab9093133e1fb2902afe4387bec8983889fe8d0749f1e9ae512226737d3
    - current_digest: 3c61eab9093133e1fb2902afe4387bec8983889fe8d0749f1e9ae512226737d3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191451-1E0EHD

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add daily cloud pull before task start

Before task start-ready on the cloud backend, pull the cloud projection once per local day so GitHub issue intake tasks are visible before local work begins.

## Scope

- In scope: Before task start-ready on the cloud backend, pull the cloud projection once per local day so GitHub issue intake tasks are visible before local work begins.
- Out of scope: unrelated refactors not required for "Add daily cloud pull before task start".

## Plan

Summary: Add a cloud backend guard so task start-ready refreshes cloud projection once per local calendar day before local task mutation.

Scope:
- Cloud backend state schema and read/write compatibility.
- CloudBackend pull decision logic before local mutations.
- Focused unit tests for daily start pull behavior and state persistence.

Plan:
1. Extend cloud backend state with a dedicated start-ready pull timestamp while preserving existing state files.
2. Add a CloudBackend method used before task start-ready/local mutation to pull when the last start pull date is before today.
3. Wire start-ready to call that guard only for capable cloud backends without adding public CLI commands.
4. Cover stale-day, same-day, and failure behavior with focused tests.

Verify Steps:
- npm test -- --run packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts
- npm run typecheck
- ap doctor
- node .agentplane/policy/check-routing.mjs

Rollback Plan: Revert the CloudBackend state/guard changes and tests; existing manual cloud pull remains available via backend sync.

## Verify Steps

- npm test -- --run packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts
- npm run typecheck
- npm run build
- bun run hotspots:check
- ap doctor
- node .agentplane/policy/check-routing.mjs

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T15:03:49.046Z — VERIFY — ok

By: CODER

Note: Command: npm test -- --run packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts
Result: pass
Evidence: 2 files, 30 tests passed.
Scope: cloud backend state parsing/writing and daily task-start pull behavior.

Command: npm run typecheck
Result: pass
Evidence: tsc -b exited 0 after state parser type fix.
Scope: TypeScript project references.

Command: npm run build
Result: pass
Evidence: tsc -b plus core, recipes, and agentplane bundles built successfully.
Scope: package build outputs.

Command: ap doctor
Result: pass
Evidence: doctor (OK), errors=0 warnings=0.
Scope: repo-local runtime/workflow health.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy routing contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:52:45.190Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191451-1E0EHD-daily-cloud-start-pull/.agentplane/tasks/202605191451-1E0EHD/blueprint/resolved-snapshot.json
- old_digest: 3c61eab9093133e1fb2902afe4387bec8983889fe8d0749f1e9ae512226737d3
- current_digest: 3c61eab9093133e1fb2902afe4387bec8983889fe8d0749f1e9ae512226737d3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191451-1E0EHD

### 2026-05-19T15:08:21.753Z — VERIFY — ok

By: CODER

Note: Command: npm test -- --run packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts
Result: pass
Evidence: 2 files, 30 tests passed after final code changes.
Scope: cloud backend state parsing/writing and daily task-start pull behavior.

Command: npm run typecheck
Result: pass
Evidence: tsc -b exited 0.
Scope: TypeScript project references.

Command: npm run build
Result: pass
Evidence: tsc -b plus core, recipes, and agentplane bundles built successfully.
Scope: package build outputs.

Command: ap doctor
Result: pass
Evidence: doctor (OK), errors=0 warnings=0.
Scope: repo-local runtime/workflow health.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy routing contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:07:28.931Z, excerpt_hash=sha256:53e5c086a764aa3b9007b1dbb288210d602f0884bd83118f80f0d2186484e062

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191451-1E0EHD-daily-cloud-start-pull/.agentplane/tasks/202605191451-1E0EHD/blueprint/resolved-snapshot.json
- old_digest: 3c61eab9093133e1fb2902afe4387bec8983889fe8d0749f1e9ae512226737d3
- current_digest: 3c61eab9093133e1fb2902afe4387bec8983889fe8d0749f1e9ae512226737d3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191451-1E0EHD

### 2026-05-19T15:36:20.083Z — VERIFY — ok

By: CODER

Note: Command: npm test -- --run packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts
Result: pass
Evidence: 3 files, 30 tests passed after extracting daily-start tests.
Scope: cloud backend state parsing/writing, existing cloud backend behavior, and daily task-start pull behavior.

Command: npm run typecheck
Result: pass
Evidence: tsc -b exited 0.
Scope: TypeScript project references.

Command: npm run build
Result: pass
Evidence: tsc -b plus core, recipes, and agentplane bundles built successfully.
Scope: package build outputs.

Command: bun run hotspots:check
Result: pass
Evidence: hotspot threshold check passed; oversized test baseline OK.
Scope: line-budget regression from the cloud backend split.

Command: ap doctor
Result: pass
Evidence: doctor (OK), errors=0 warnings=0.
Scope: repo-local runtime/workflow health.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy routing contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T15:36:04.664Z, excerpt_hash=sha256:782bb64e41c9ea0083027075ce7090c9c589b2154a3b0b14e5e4521fb904951b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191451-1E0EHD-daily-cloud-start-pull/.agentplane/tasks/202605191451-1E0EHD/blueprint/resolved-snapshot.json
- old_digest: 3c61eab9093133e1fb2902afe4387bec8983889fe8d0749f1e9ae512226737d3
- current_digest: 3c61eab9093133e1fb2902afe4387bec8983889fe8d0749f1e9ae512226737d3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191451-1E0EHD

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
