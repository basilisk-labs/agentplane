---
id: "202603131310-0KBWXJ"
title: "Introduce intent-based task mutation API"
result_summary: "Intent-based task mutations now exist as a first-class TaskStore API and power the first store-backed comment, verify, and verified-close flows."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
depends_on:
  - "202603131309-HSRN23"
  - "202603131309-YDAC7K"
tags:
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T15:24:33.084Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T15:34:56.441Z"
  updated_by: "CODER"
  note: |-
    Command: bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts --hookTimeout 60000 --testTimeout 60000 && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build && node --input-type=module <intent-runtime-check>
    Result: TaskStore now exposes mutate(intents), patch delegates through the same apply path, migrated local consumers use explicit intents, and built-runtime intent writes preserve revision-aware CAS conflicts.
commit:
  hash: "d7f2f891c064d8b46b27c83a44ac2bdf8e823c96"
  message: "🧩 0KBWXJ task: Introduce intent-based task mutation API"
comments:
  -
    author: "CODER"
    body: "Start: add an explicit TaskStore intent layer, keep patch as a compatibility wrapper, and move the first simple store-backed consumers onto named intents."
  -
    author: "CODER"
    body: "Verified: TaskStore now exposes mutate(intents), patch routes through the same apply path, and the first local consumers use named intents without regressing CAS behavior."
events:
  -
    type: "status"
    at: "2026-03-13T15:24:38.349Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add an explicit TaskStore intent layer, keep patch as a compatibility wrapper, and move the first simple store-backed consumers onto named intents."
  -
    type: "verify"
    at: "2026-03-13T15:34:56.441Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts --hookTimeout 60000 --testTimeout 60000 && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build && node --input-type=module <intent-runtime-check>
      Result: TaskStore now exposes mutate(intents), patch delegates through the same apply path, migrated local consumers use explicit intents, and built-runtime intent writes preserve revision-aware CAS conflicts.
  -
    type: "status"
    at: "2026-03-13T15:35:18.409Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: TaskStore now exposes mutate(intents), patch routes through the same apply path, and the first local consumers use named intents without regressing CAS behavior."
doc_version: 3
doc_updated_at: "2026-03-13T15:35:18.410Z"
doc_updated_by: "CODER"
description: "Replace ad hoc nextTask assembly with explicit task intents like set_section, append_comment, append_event, set_status, approve_plan, and record_verification."
sections:
  Summary: |-
    Introduce intent-based task mutation API
    
    Replace ad hoc nextTask assembly with explicit task intents like set_section, append_comment, append_event, set_status, approve_plan, and record_verification.
  Scope: |-
    - In scope: Replace ad hoc nextTask assembly with explicit task intents like set_section, append_comment, append_event, set_status, approve_plan, and record_verification.
    - Out of scope: unrelated refactors not required for "Introduce intent-based task mutation API".
  Plan: |-
    1. Add a first-class TaskStore intent model and a mutate/apply path that applies named intents instead of ad hoc nextTask assembly.
    2. Support the initial intent set needed for current consumers: set task fields, set section, replace doc, append comments, append events, and touch doc metadata.
    3. Migrate the smallest existing store-backed consumers that benefit immediately from explicit intents: task comment, verify recording, and verified noop/duplicate closure helper paths.
    4. Keep TaskStore.patch as a compatibility wrapper for now; full doc-command and lifecycle migration stays in follow-up tasks ABPXYY and 0KHGZD.
    5. Add regressions for intent application, CAS interaction, and the migrated command surfaces.
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: the new intent layer and migrated consumers pass without regressions.
    2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages compile with the new TaskStore API.
    3. Inspect a temp task through the built runtime after an intent-based mutation. Expected: the write updates canonical frontmatter/body consistently and preserves CAS conflict behavior for stale expectedRevision writes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-13T15:34:56.441Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts --hookTimeout 60000 --testTimeout 60000 && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build && node --input-type=module <intent-runtime-check>
    Result: TaskStore now exposes mutate(intents), patch delegates through the same apply path, migrated local consumers use explicit intents, and built-runtime intent writes preserve revision-aware CAS conflicts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T15:24:38.350Z, excerpt_hash=sha256:8d5fbb4f91280a301a83457f23d54197da450c09a0324db067fa2be22531b8be
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Introduce intent-based task mutation API

Replace ad hoc nextTask assembly with explicit task intents like set_section, append_comment, append_event, set_status, approve_plan, and record_verification.

## Scope

- In scope: Replace ad hoc nextTask assembly with explicit task intents like set_section, append_comment, append_event, set_status, approve_plan, and record_verification.
- Out of scope: unrelated refactors not required for "Introduce intent-based task mutation API".

## Plan

1. Add a first-class TaskStore intent model and a mutate/apply path that applies named intents instead of ad hoc nextTask assembly.
2. Support the initial intent set needed for current consumers: set task fields, set section, replace doc, append comments, append events, and touch doc metadata.
3. Migrate the smallest existing store-backed consumers that benefit immediately from explicit intents: task comment, verify recording, and verified noop/duplicate closure helper paths.
4. Keep TaskStore.patch as a compatibility wrapper for now; full doc-command and lifecycle migration stays in follow-up tasks ABPXYY and 0KHGZD.
5. Add regressions for intent application, CAS interaction, and the migrated command surfaces.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: the new intent layer and migrated consumers pass without regressions.
2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages compile with the new TaskStore API.
3. Inspect a temp task through the built runtime after an intent-based mutation. Expected: the write updates canonical frontmatter/body consistently and preserves CAS conflict behavior for stale expectedRevision writes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T15:34:56.441Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts --hookTimeout 60000 --testTimeout 60000 && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build && node --input-type=module <intent-runtime-check>
Result: TaskStore now exposes mutate(intents), patch delegates through the same apply path, migrated local consumers use explicit intents, and built-runtime intent writes preserve revision-aware CAS conflicts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T15:24:38.350Z, excerpt_hash=sha256:8d5fbb4f91280a301a83457f23d54197da450c09a0324db067fa2be22531b8be

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
