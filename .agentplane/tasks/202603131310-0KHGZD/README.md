---
id: "202603131310-0KHGZD"
title: "Migrate lifecycle commands to canonical task state"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
depends_on:
  - "202603131310-0KBWXJ"
  - "202603131310-ABPXYY"
tags:
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T17:10:56.522Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T17:20:51.823Z"
  updated_by: "CODER"
  note: "Remaining local lifecycle writes now run through TaskStore intents; start/block/set-status/finish suites and run-cli.core.lifecycle are green, and a built-runtime smoke confirmed revision 1->2 plus stale task_revision_conflict."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: move the remaining lifecycle writes onto TaskStore intents so status/comment/event/doc-meta updates all flow through canonical one-file task state."
events:
  -
    type: "status"
    at: "2026-03-13T17:11:04.629Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move the remaining lifecycle writes onto TaskStore intents so status/comment/event/doc-meta updates all flow through canonical one-file task state."
  -
    type: "verify"
    at: "2026-03-13T17:20:51.823Z"
    author: "CODER"
    state: "ok"
    note: "Remaining local lifecycle writes now run through TaskStore intents; start/block/set-status/finish suites and run-cli.core.lifecycle are green, and a built-runtime smoke confirmed revision 1->2 plus stale task_revision_conflict."
doc_version: 3
doc_updated_at: "2026-03-13T17:20:51.826Z"
doc_updated_by: "CODER"
description: "Move start, block, set-status, verify, comment, and finish to the canonical one-file task state and intent-based mutation layer."
sections:
  Summary: |-
    Migrate lifecycle commands to canonical task state
    
    Move start, block, set-status, verify, comment, and finish to the canonical one-file task state and intent-based mutation layer.
  Scope: |-
    - In scope: Move start, block, set-status, verify, comment, and finish to the canonical one-file task state and intent-based mutation layer.
    - Out of scope: unrelated refactors not required for "Migrate lifecycle commands to canonical task state".
  Plan: |-
    1. Migrate the remaining local lifecycle mutation paths from ad hoc TaskStore patches to explicit intents: start, block, set-status, finish, and finish-adjacent close/status updates.
    2. Keep comment and verify on their current intent path; do not reopen already migrated consumers from 0KBWXJ.
    3. Preserve current lifecycle validation semantics while making the canonical task state/intents layer the only local write surface.
    4. Add regressions for the migrated command surfaces and for finish/status paths that still assemble task patches manually today.
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: remaining lifecycle commands pass on the canonical intent layer without regressions.
    2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages compile with the migrated lifecycle mutation paths.
    3. Inspect one temp lifecycle mutation through the built runtime. Expected: start/block/status/finish-style writes update canonical task state through intents and preserve revision/CAS behavior.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-13T17:20:51.823Z — VERIFY — ok
    
    By: CODER
    
    Note: Remaining local lifecycle writes now run through TaskStore intents; start/block/set-status/finish suites and run-cli.core.lifecycle are green, and a built-runtime smoke confirmed revision 1->2 plus stale task_revision_conflict.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T17:11:04.630Z, excerpt_hash=sha256:fba4c175e59dc909410065fc0dfa7911f7540c0ee2becab93eeee9aa0b54fbf9
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate lifecycle commands to canonical task state

Move start, block, set-status, verify, comment, and finish to the canonical one-file task state and intent-based mutation layer.

## Scope

- In scope: Move start, block, set-status, verify, comment, and finish to the canonical one-file task state and intent-based mutation layer.
- Out of scope: unrelated refactors not required for "Migrate lifecycle commands to canonical task state".

## Plan

1. Migrate the remaining local lifecycle mutation paths from ad hoc TaskStore patches to explicit intents: start, block, set-status, finish, and finish-adjacent close/status updates.
2. Keep comment and verify on their current intent path; do not reopen already migrated consumers from 0KBWXJ.
3. Preserve current lifecycle validation semantics while making the canonical task state/intents layer the only local write surface.
4. Add regressions for the migrated command surfaces and for finish/status paths that still assemble task patches manually today.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: remaining lifecycle commands pass on the canonical intent layer without regressions.
2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages compile with the migrated lifecycle mutation paths.
3. Inspect one temp lifecycle mutation through the built runtime. Expected: start/block/status/finish-style writes update canonical task state through intents and preserve revision/CAS behavior.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T17:20:51.823Z — VERIFY — ok

By: CODER

Note: Remaining local lifecycle writes now run through TaskStore intents; start/block/set-status/finish suites and run-cli.core.lifecycle are green, and a built-runtime smoke confirmed revision 1->2 plus stale task_revision_conflict.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T17:11:04.630Z, excerpt_hash=sha256:fba4c175e59dc909410065fc0dfa7911f7540c0ee2becab93eeee9aa0b54fbf9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
