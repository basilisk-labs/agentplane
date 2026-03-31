---
id: "202603311331-838REB"
title: "N2.1 Introduce a shared bulk-write helper"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603311331-Y8QMNA"
tags:
  - "code"
  - "refactor"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T14:54:51.732Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T14:56:35.613Z"
  updated_by: "CODER"
  note: "Introduced shared bulk-write helper and moved task add/normalize/scrub onto it; verified with bunx eslint packages/agentplane/src/commands/shared/task-backend.ts packages/agentplane/src/commands/task/add.ts packages/agentplane/src/commands/task/normalize.ts packages/agentplane/src/commands/task/scrub.ts packages/agentplane/src/commands/workflow.maintenance.test.ts packages/agentplane/src/commands/workflow.test.ts and bunx vitest run packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/commands/workflow.maintenance.test.ts --testNamePattern 'task add writes tasks via writeTask when writeTasks is missing|task scrub writes updates and respects quiet mode|task scrub falls back to writeTask when writeTasks is missing|task normalize handles writeTask|task normalize prefers backend normalizeTasks output when available'."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extract one shared bulk-write helper for task backends so add/normalize/scrub stop duplicating writeTasks vs sequential writeTask fallback orchestration."
events:
  -
    type: "status"
    at: "2026-03-31T14:54:52.312Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract one shared bulk-write helper for task backends so add/normalize/scrub stop duplicating writeTasks vs sequential writeTask fallback orchestration."
  -
    type: "verify"
    at: "2026-03-31T14:56:35.613Z"
    author: "CODER"
    state: "ok"
    note: "Introduced shared bulk-write helper and moved task add/normalize/scrub onto it; verified with bunx eslint packages/agentplane/src/commands/shared/task-backend.ts packages/agentplane/src/commands/task/add.ts packages/agentplane/src/commands/task/normalize.ts packages/agentplane/src/commands/task/scrub.ts packages/agentplane/src/commands/workflow.maintenance.test.ts packages/agentplane/src/commands/workflow.test.ts and bunx vitest run packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/commands/workflow.maintenance.test.ts --testNamePattern 'task add writes tasks via writeTask when writeTasks is missing|task scrub writes updates and respects quiet mode|task scrub falls back to writeTask when writeTasks is missing|task normalize handles writeTask|task normalize prefers backend normalizeTasks output when available'."
doc_version: 3
doc_updated_at: "2026-03-31T14:56:35.615Z"
doc_updated_by: "CODER"
description: "Implement N2.1 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: those commands stop open-coding `writeTasks(...)` vs sequential `writeTask(...)`. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N2.1 Introduce a shared bulk-write helper
    
    Implement N2.1 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: those commands stop open-coding `writeTasks(...)` vs sequential `writeTask(...)`. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N2.1 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: those commands stop open-coding `writeTasks(...)` vs sequential `writeTask(...)`. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N2.1 Introduce a shared bulk-write helper".
  Plan: |-
    1. Audit task backend helpers used by `task/add.ts`, `task/normalize.ts`, `task/scrub.ts` and isolate the narrowest change set that satisfies N2.1.
    2. Implement introduce a shared bulk-write helper with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering task backend helpers used by `task/add.ts`, `task/normalize.ts`, `task/scrub.ts`. Expected: the behavior targeted by N2.1 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-838REB. Expected: scope stays anchored to task backend helpers used by `task/add.ts`, `task/normalize.ts`, `task/scrub.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: those commands stop open-coding `writeTasks(...)` vs sequential `writeTask(...)`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T14:56:35.613Z — VERIFY — ok
    
    By: CODER
    
    Note: Introduced shared bulk-write helper and moved task add/normalize/scrub onto it; verified with bunx eslint packages/agentplane/src/commands/shared/task-backend.ts packages/agentplane/src/commands/task/add.ts packages/agentplane/src/commands/task/normalize.ts packages/agentplane/src/commands/task/scrub.ts packages/agentplane/src/commands/workflow.maintenance.test.ts packages/agentplane/src/commands/workflow.test.ts and bunx vitest run packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/commands/workflow.maintenance.test.ts --testNamePattern 'task add writes tasks via writeTask when writeTasks is missing|task scrub writes updates and respects quiet mode|task scrub falls back to writeTask when writeTasks is missing|task normalize handles writeTask|task normalize prefers backend normalizeTasks output when available'.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T14:54:52.313Z, excerpt_hash=sha256:c07f76a8314b650d4f2ed2ba2c24a8ae572a4aaddf3bdeaa50383d075d22d2cc
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N2.1 Introduce a shared bulk-write helper

Implement N2.1 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: those commands stop open-coding `writeTasks(...)` vs sequential `writeTask(...)`. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N2.1 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: those commands stop open-coding `writeTasks(...)` vs sequential `writeTask(...)`. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N2.1 Introduce a shared bulk-write helper".

## Plan

1. Audit task backend helpers used by `task/add.ts`, `task/normalize.ts`, `task/scrub.ts` and isolate the narrowest change set that satisfies N2.1.
2. Implement introduce a shared bulk-write helper with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering task backend helpers used by `task/add.ts`, `task/normalize.ts`, `task/scrub.ts`. Expected: the behavior targeted by N2.1 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-838REB. Expected: scope stays anchored to task backend helpers used by `task/add.ts`, `task/normalize.ts`, `task/scrub.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: those commands stop open-coding `writeTasks(...)` vs sequential `writeTask(...)`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T14:56:35.613Z — VERIFY — ok

By: CODER

Note: Introduced shared bulk-write helper and moved task add/normalize/scrub onto it; verified with bunx eslint packages/agentplane/src/commands/shared/task-backend.ts packages/agentplane/src/commands/task/add.ts packages/agentplane/src/commands/task/normalize.ts packages/agentplane/src/commands/task/scrub.ts packages/agentplane/src/commands/workflow.maintenance.test.ts packages/agentplane/src/commands/workflow.test.ts and bunx vitest run packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/commands/workflow.maintenance.test.ts --testNamePattern 'task add writes tasks via writeTask when writeTasks is missing|task scrub writes updates and respects quiet mode|task scrub falls back to writeTask when writeTasks is missing|task normalize handles writeTask|task normalize prefers backend normalizeTasks output when available'.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T14:54:52.313Z, excerpt_hash=sha256:c07f76a8314b650d4f2ed2ba2c24a8ae572a4aaddf3bdeaa50383d075d22d2cc

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
