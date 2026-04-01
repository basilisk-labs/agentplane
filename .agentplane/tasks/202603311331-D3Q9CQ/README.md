---
id: "202603311331-D3Q9CQ"
title: "N2.3 Move low-risk task mutators onto the bridge"
result_summary: "integrate: squash task/202603311331-D3Q9CQ/low-risk-task-mutators"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603311331-BVYTP3"
tags:
  - "code"
  - "refactor"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T15:17:23.977Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T15:25:00.442Z"
  updated_by: "CODER"
  note: "Moved low-risk mutators onto the shared task-mutation bridge: task comment and verified no-op close paths now build one shared mutation plan, and close-noop/close-duplicate no longer branch on local store preloads; verified with bunx eslint packages/agentplane/src/commands/task/comment.ts packages/agentplane/src/commands/task/close-shared.ts packages/agentplane/src/commands/task/close-noop.ts packages/agentplane/src/commands/task/close-duplicate.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts and bunx vitest run packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts plus bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts --testNamePattern \"task close-noop closes bookkeeping tasks in one command\"."
commit:
  hash: "16d34ea89895ed242efdca097b44d8cda0b1d4ce"
  message: "📝 D3Q9CQ task: add PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: move low-risk single-task mutators onto the shared mutation bridge so simple commands stop branching on local store versus backend writes."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311331-D3Q9CQ/pr."
events:
  -
    type: "status"
    at: "2026-03-31T15:20:06.422Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move low-risk single-task mutators onto the shared mutation bridge so simple commands stop branching on local store versus backend writes."
  -
    type: "verify"
    at: "2026-03-31T15:25:00.442Z"
    author: "CODER"
    state: "ok"
    note: "Moved low-risk mutators onto the shared task-mutation bridge: task comment and verified no-op close paths now build one shared mutation plan, and close-noop/close-duplicate no longer branch on local store preloads; verified with bunx eslint packages/agentplane/src/commands/task/comment.ts packages/agentplane/src/commands/task/close-shared.ts packages/agentplane/src/commands/task/close-noop.ts packages/agentplane/src/commands/task/close-duplicate.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts and bunx vitest run packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts plus bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts --testNamePattern \"task close-noop closes bookkeeping tasks in one command\"."
  -
    type: "status"
    at: "2026-03-31T15:25:58.924Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311331-D3Q9CQ/pr."
doc_version: 3
doc_updated_at: "2026-03-31T15:25:58.926Z"
doc_updated_by: "INTEGRATOR"
description: "Implement N2.3 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: these commands become thin wrappers around the shared mutation helper. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N2.3 Move low-risk task mutators onto the bridge
    
    Implement N2.3 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: these commands become thin wrappers around the shared mutation helper. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N2.3 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: these commands become thin wrappers around the shared mutation helper. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N2.3 Move low-risk task mutators onto the bridge".
  Plan: |-
    1. Audit `task/comment.ts`, `task/close-noop.ts`, and other simple patch-style commands and isolate the narrowest change set that satisfies N2.3.
    2. Implement move low-risk task mutators onto the bridge with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `task/comment.ts`, `task/close-noop.ts`, and other simple patch-style commands. Expected: the behavior targeted by N2.3 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-D3Q9CQ. Expected: scope stays anchored to `task/comment.ts`, `task/close-noop.ts`, and other simple patch-style commands plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: these commands become thin wrappers around the shared mutation helper.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T15:25:00.442Z — VERIFY — ok
    
    By: CODER
    
    Note: Moved low-risk mutators onto the shared task-mutation bridge: task comment and verified no-op close paths now build one shared mutation plan, and close-noop/close-duplicate no longer branch on local store preloads; verified with bunx eslint packages/agentplane/src/commands/task/comment.ts packages/agentplane/src/commands/task/close-shared.ts packages/agentplane/src/commands/task/close-noop.ts packages/agentplane/src/commands/task/close-duplicate.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts and bunx vitest run packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts plus bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts --testNamePattern "task close-noop closes bookkeeping tasks in one command".
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T15:20:06.423Z, excerpt_hash=sha256:8c107d1405eccc961d04bc028ca69a98b37dc0a810647b26285c84a29ca5fb2a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N2.3 Move low-risk task mutators onto the bridge

Implement N2.3 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: these commands become thin wrappers around the shared mutation helper. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N2.3 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: these commands become thin wrappers around the shared mutation helper. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N2.3 Move low-risk task mutators onto the bridge".

## Plan

1. Audit `task/comment.ts`, `task/close-noop.ts`, and other simple patch-style commands and isolate the narrowest change set that satisfies N2.3.
2. Implement move low-risk task mutators onto the bridge with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `task/comment.ts`, `task/close-noop.ts`, and other simple patch-style commands. Expected: the behavior targeted by N2.3 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-D3Q9CQ. Expected: scope stays anchored to `task/comment.ts`, `task/close-noop.ts`, and other simple patch-style commands plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: these commands become thin wrappers around the shared mutation helper.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T15:25:00.442Z — VERIFY — ok

By: CODER

Note: Moved low-risk mutators onto the shared task-mutation bridge: task comment and verified no-op close paths now build one shared mutation plan, and close-noop/close-duplicate no longer branch on local store preloads; verified with bunx eslint packages/agentplane/src/commands/task/comment.ts packages/agentplane/src/commands/task/close-shared.ts packages/agentplane/src/commands/task/close-noop.ts packages/agentplane/src/commands/task/close-duplicate.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts and bunx vitest run packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts plus bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts --testNamePattern "task close-noop closes bookkeeping tasks in one command".

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T15:20:06.423Z, excerpt_hash=sha256:8c107d1405eccc961d04bc028ca69a98b37dc0a810647b26285c84a29ca5fb2a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
