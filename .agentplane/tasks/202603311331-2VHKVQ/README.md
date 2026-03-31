---
id: "202603311331-2VHKVQ"
title: "N2.4 Move bulk task mutators onto the bridge"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603311331-838REB"
tags:
  - "code"
  - "refactor"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T15:26:52.855Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T15:29:56.288Z"
  updated_by: "CODER"
  note: "Introduced a shared bulk collection-mutation bridge and moved task add/normalize/scrub onto it; verified with bunx eslint packages/agentplane/src/commands/shared/task-mutation.ts packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/add.ts packages/agentplane/src/commands/task/normalize.ts packages/agentplane/src/commands/task/scrub.ts and bunx vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/commands/workflow.maintenance.test.ts --testNamePattern \"applyTaskCollectionMutation|task add writes tasks via writeTask when writeTasks is missing|task scrub falls back to writeTask when writeTasks is missing|task normalize handles writeTask|task normalize prefers backend normalizeTasks output when available\"."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: move bulk task mutators onto one shared collection bridge so add, normalize, and scrub stop open-coding list/transform/write orchestration."
events:
  -
    type: "status"
    at: "2026-03-31T15:27:21.754Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move bulk task mutators onto one shared collection bridge so add, normalize, and scrub stop open-coding list/transform/write orchestration."
  -
    type: "verify"
    at: "2026-03-31T15:29:56.288Z"
    author: "CODER"
    state: "ok"
    note: "Introduced a shared bulk collection-mutation bridge and moved task add/normalize/scrub onto it; verified with bunx eslint packages/agentplane/src/commands/shared/task-mutation.ts packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/add.ts packages/agentplane/src/commands/task/normalize.ts packages/agentplane/src/commands/task/scrub.ts and bunx vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/commands/workflow.maintenance.test.ts --testNamePattern \"applyTaskCollectionMutation|task add writes tasks via writeTask when writeTasks is missing|task scrub falls back to writeTask when writeTasks is missing|task normalize handles writeTask|task normalize prefers backend normalizeTasks output when available\"."
doc_version: 3
doc_updated_at: "2026-03-31T15:29:56.290Z"
doc_updated_by: "CODER"
description: "Implement N2.4 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: bulk task writes use one shared path and keep their current behavior. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N2.4 Move bulk task mutators onto the bridge
    
    Implement N2.4 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: bulk task writes use one shared path and keep their current behavior. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N2.4 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: bulk task writes use one shared path and keep their current behavior. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N2.4 Move bulk task mutators onto the bridge".
  Plan: |-
    1. Audit `task/add.ts`, `task/normalize.ts`, `task/scrub.ts` and isolate the narrowest change set that satisfies N2.4.
    2. Implement move bulk task mutators onto the bridge with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `task/add.ts`, `task/normalize.ts`, `task/scrub.ts`. Expected: the behavior targeted by N2.4 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-2VHKVQ. Expected: scope stays anchored to `task/add.ts`, `task/normalize.ts`, `task/scrub.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: bulk task writes use one shared path and keep their current behavior.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T15:29:56.288Z — VERIFY — ok
    
    By: CODER
    
    Note: Introduced a shared bulk collection-mutation bridge and moved task add/normalize/scrub onto it; verified with bunx eslint packages/agentplane/src/commands/shared/task-mutation.ts packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/add.ts packages/agentplane/src/commands/task/normalize.ts packages/agentplane/src/commands/task/scrub.ts and bunx vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/commands/workflow.maintenance.test.ts --testNamePattern "applyTaskCollectionMutation|task add writes tasks via writeTask when writeTasks is missing|task scrub falls back to writeTask when writeTasks is missing|task normalize handles writeTask|task normalize prefers backend normalizeTasks output when available".
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T15:27:21.755Z, excerpt_hash=sha256:acc5b139745de3180c270a77df67688d52c7e146ef33d739ae68c935aa054d65
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N2.4 Move bulk task mutators onto the bridge

Implement N2.4 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: bulk task writes use one shared path and keep their current behavior. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N2.4 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: bulk task writes use one shared path and keep their current behavior. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N2.4 Move bulk task mutators onto the bridge".

## Plan

1. Audit `task/add.ts`, `task/normalize.ts`, `task/scrub.ts` and isolate the narrowest change set that satisfies N2.4.
2. Implement move bulk task mutators onto the bridge with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `task/add.ts`, `task/normalize.ts`, `task/scrub.ts`. Expected: the behavior targeted by N2.4 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-2VHKVQ. Expected: scope stays anchored to `task/add.ts`, `task/normalize.ts`, `task/scrub.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: bulk task writes use one shared path and keep their current behavior.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T15:29:56.288Z — VERIFY — ok

By: CODER

Note: Introduced a shared bulk collection-mutation bridge and moved task add/normalize/scrub onto it; verified with bunx eslint packages/agentplane/src/commands/shared/task-mutation.ts packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/add.ts packages/agentplane/src/commands/task/normalize.ts packages/agentplane/src/commands/task/scrub.ts and bunx vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/commands/workflow.maintenance.test.ts --testNamePattern "applyTaskCollectionMutation|task add writes tasks via writeTask when writeTasks is missing|task scrub falls back to writeTask when writeTasks is missing|task normalize handles writeTask|task normalize prefers backend normalizeTasks output when available".

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T15:27:21.755Z, excerpt_hash=sha256:acc5b139745de3180c270a77df67688d52c7e146ef33d739ae68c935aa054d65

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
