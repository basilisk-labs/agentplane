---
id: "202604172036-47KDMZ"
title: "Extract task-store services from shared monolith"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "backend"
  - "code"
  - "refactor"
verify:
  - "bun run lint:core"
  - "bun run test:fast"
plan_approval:
  state: "approved"
  updated_at: "2026-04-18T05:02:39.439Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-18T05:13:39.616Z"
  updated_by: "CODER"
  note: "Validated task-store service extraction: public task-store import surface stayed stable while implementation split into intent, README IO, store, and types modules; bun run lint:core and bun run test:fast both passed in the task worktree."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split task-store into smaller read/mutate/doc-state services without changing command behavior, then verify with lint and fast tests."
events:
  -
    type: "status"
    at: "2026-04-18T05:02:47.199Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split task-store into smaller read/mutate/doc-state services without changing command behavior, then verify with lint and fast tests."
  -
    type: "verify"
    at: "2026-04-18T05:13:39.616Z"
    author: "CODER"
    state: "ok"
    note: "Validated task-store service extraction: public task-store import surface stayed stable while implementation split into intent, README IO, store, and types modules; bun run lint:core and bun run test:fast both passed in the task worktree."
doc_version: 3
doc_updated_at: "2026-04-18T05:13:39.626Z"
doc_updated_by: "CODER"
description: "Refactor commands/shared/task-store.ts into smaller read/write/projection services with explicit task backend capability boundaries so command flows stop depending on one large shared module."
sections:
  Summary: |-
    Extract task-store services from shared monolith
    
    Refactor commands/shared/task-store.ts into smaller read/write/projection services with explicit task backend capability boundaries so command flows stop depending on one large shared module.
  Scope: |-
    - In scope: Refactor commands/shared/task-store.ts into smaller read/write/projection services with explicit task backend capability boundaries so command flows stop depending on one large shared module.
    - Out of scope: unrelated refactors not required for "Extract task-store services from shared monolith".
  Plan: |-
    1. Implement the change for "Extract task-store services from shared monolith".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:fast`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-18T05:13:39.616Z — VERIFY — ok
    
    By: CODER
    
    Note: Validated task-store service extraction: public task-store import surface stayed stable while implementation split into intent, README IO, store, and types modules; bun run lint:core and bun run test:fast both passed in the task worktree.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T05:02:47.218Z, excerpt_hash=sha256:6a52fa9919b2a85431f853e5d4ee21d781173a416f24000b5a0bdd62ac62bdd1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Extract task-store services from shared monolith

Refactor commands/shared/task-store.ts into smaller read/write/projection services with explicit task backend capability boundaries so command flows stop depending on one large shared module.

## Scope

- In scope: Refactor commands/shared/task-store.ts into smaller read/write/projection services with explicit task backend capability boundaries so command flows stop depending on one large shared module.
- Out of scope: unrelated refactors not required for "Extract task-store services from shared monolith".

## Plan

1. Implement the change for "Extract task-store services from shared monolith".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:fast`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-18T05:13:39.616Z — VERIFY — ok

By: CODER

Note: Validated task-store service extraction: public task-store import surface stayed stable while implementation split into intent, README IO, store, and types modules; bun run lint:core and bun run test:fast both passed in the task worktree.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T05:02:47.218Z, excerpt_hash=sha256:6a52fa9919b2a85431f853e5d4ee21d781173a416f24000b5a0bdd62ac62bdd1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
