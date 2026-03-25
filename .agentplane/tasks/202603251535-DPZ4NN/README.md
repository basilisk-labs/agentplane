---
id: "202603251535-DPZ4NN"
title: "Generate and enforce canonical task artifact schemas from runtime contracts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603251523-G3Z6BQ"
tags:
  - "code"
  - "architecture"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-25T15:58:32.080Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T17:22:45.300Z"
  updated_by: "CODER"
  note: "Validated the PR #9 follow-up compatibility fix. Checks: bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/doctor.command.test.ts -t \"accepts short non-git commit hashes in task README frontmatter|creates issues on writeTask and writes custom fields|prefers live task projection over a stale exported snapshot for README migration checks\"; bunx vitest run packages/agentplane/src/backends/task-backend.load.test.ts -t \"exports task snapshots with canonicalized fields\"; bun run test:fast; bun scripts/sync-schemas.mjs check; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx eslint targeted files; bunx prettier --check targeted files and generated schemas. Result: restored server-compatible task artifact validation and export coercion without widening runtime policy."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement one canonical source for task artifact contracts, emit generated schemas from it, and wire runtime validation across task artifact read and write boundaries before downstream projection refactors."
events:
  -
    type: "status"
    at: "2026-03-25T16:00:24.649Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement one canonical source for task artifact contracts, emit generated schemas from it, and wire runtime validation across task artifact read and write boundaries before downstream projection refactors."
  -
    type: "verify"
    at: "2026-03-25T16:35:51.609Z"
    author: "CODER"
    state: "ok"
    note: "Validated canonical task artifact schemas from one runtime source. Checks: bun scripts/sync-schemas.mjs check; bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/tasks/task-store.test.ts packages/core/src/tasks/tasks-export.test.ts packages/core/src/tasks/tasks-lint.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx prettier --check targeted files; bunx eslint targeted files."
  -
    type: "verify"
    at: "2026-03-25T17:22:45.300Z"
    author: "CODER"
    state: "ok"
    note: "Validated the PR #9 follow-up compatibility fix. Checks: bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/doctor.command.test.ts -t \"accepts short non-git commit hashes in task README frontmatter|creates issues on writeTask and writes custom fields|prefers live task projection over a stale exported snapshot for README migration checks\"; bunx vitest run packages/agentplane/src/backends/task-backend.load.test.ts -t \"exports task snapshots with canonicalized fields\"; bun run test:fast; bun scripts/sync-schemas.mjs check; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx eslint targeted files; bunx prettier --check targeted files and generated schemas. Result: restored server-compatible task artifact validation and export coercion without widening runtime policy."
doc_version: 3
doc_updated_at: "2026-03-25T17:22:45.308Z"
doc_updated_by: "CODER"
description: "Make task README frontmatter and tasks export artifacts derive from one executable runtime contract, then sync generated schema/example artifacts from that source instead of maintaining partial handwritten drift across core and spec."
sections:
  Summary: |-
    Generate and enforce canonical task artifact schemas from runtime contracts
    
    Make task README frontmatter and tasks export artifacts derive from one executable runtime contract, then sync generated schema/example artifacts from that source instead of maintaining partial handwritten drift across core and spec.
  Scope: |-
    - In scope: Make task README frontmatter and tasks export artifacts derive from one executable runtime contract, then sync generated schema/example artifacts from that source instead of maintaining partial handwritten drift across core and spec.
    - Out of scope: unrelated refactors not required for "Generate and enforce canonical task artifact schemas from runtime contracts".
  Plan: |-
    1. Inventory every runtime task artifact shape that currently acts as a contract boundary: task README frontmatter, task export snapshot, task index entry, PR meta, and any generated schema mirrors.
    2. Choose one canonical contract source for those artifacts and implement generated runtime validation plus schema emission from that source.
    3. Wire task read/write paths to validate against the canonical contract, add targeted regression coverage, and record any remaining follow-up seams for later projection refactors.
  Verify Steps: |-
    1. Run targeted task artifact tests. Expected: task README/frontmatter, export, and schema generation paths validate against the same canonical contract.
    2. Review generated schema artifacts and runtime validators. Expected: one contract source drives both runtime validation and emitted schemas without drift.
    3. Run the smallest relevant build/test commands for touched packages. Expected: the refactor preserves existing task lifecycle behavior while rejecting invalid artifact shapes deterministically.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T16:35:51.609Z — VERIFY — ok
    
    By: CODER
    
    Note: Validated canonical task artifact schemas from one runtime source. Checks: bun scripts/sync-schemas.mjs check; bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/tasks/task-store.test.ts packages/core/src/tasks/tasks-export.test.ts packages/core/src/tasks/tasks-lint.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx prettier --check targeted files; bunx eslint targeted files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T16:00:24.656Z, excerpt_hash=sha256:49b8d6c8312ecc1ce6238772ca09bbcb676c36ccbc9bb76a6095157080bacbe9
    
    #### 2026-03-25T17:22:45.300Z — VERIFY — ok
    
    By: CODER
    
    Note: Validated the PR #9 follow-up compatibility fix. Checks: bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/doctor.command.test.ts -t "accepts short non-git commit hashes in task README frontmatter|creates issues on writeTask and writes custom fields|prefers live task projection over a stale exported snapshot for README migration checks"; bunx vitest run packages/agentplane/src/backends/task-backend.load.test.ts -t "exports task snapshots with canonicalized fields"; bun run test:fast; bun scripts/sync-schemas.mjs check; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx eslint targeted files; bunx prettier --check targeted files and generated schemas. Result: restored server-compatible task artifact validation and export coercion without widening runtime policy.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T16:35:51.621Z, excerpt_hash=sha256:49b8d6c8312ecc1ce6238772ca09bbcb676c36ccbc9bb76a6095157080bacbe9
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Generate and enforce canonical task artifact schemas from runtime contracts

Make task README frontmatter and tasks export artifacts derive from one executable runtime contract, then sync generated schema/example artifacts from that source instead of maintaining partial handwritten drift across core and spec.

## Scope

- In scope: Make task README frontmatter and tasks export artifacts derive from one executable runtime contract, then sync generated schema/example artifacts from that source instead of maintaining partial handwritten drift across core and spec.
- Out of scope: unrelated refactors not required for "Generate and enforce canonical task artifact schemas from runtime contracts".

## Plan

1. Inventory every runtime task artifact shape that currently acts as a contract boundary: task README frontmatter, task export snapshot, task index entry, PR meta, and any generated schema mirrors.
2. Choose one canonical contract source for those artifacts and implement generated runtime validation plus schema emission from that source.
3. Wire task read/write paths to validate against the canonical contract, add targeted regression coverage, and record any remaining follow-up seams for later projection refactors.

## Verify Steps

1. Run targeted task artifact tests. Expected: task README/frontmatter, export, and schema generation paths validate against the same canonical contract.
2. Review generated schema artifacts and runtime validators. Expected: one contract source drives both runtime validation and emitted schemas without drift.
3. Run the smallest relevant build/test commands for touched packages. Expected: the refactor preserves existing task lifecycle behavior while rejecting invalid artifact shapes deterministically.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T16:35:51.609Z — VERIFY — ok

By: CODER

Note: Validated canonical task artifact schemas from one runtime source. Checks: bun scripts/sync-schemas.mjs check; bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/tasks/task-store.test.ts packages/core/src/tasks/tasks-export.test.ts packages/core/src/tasks/tasks-lint.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx prettier --check targeted files; bunx eslint targeted files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T16:00:24.656Z, excerpt_hash=sha256:49b8d6c8312ecc1ce6238772ca09bbcb676c36ccbc9bb76a6095157080bacbe9

#### 2026-03-25T17:22:45.300Z — VERIFY — ok

By: CODER

Note: Validated the PR #9 follow-up compatibility fix. Checks: bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/doctor.command.test.ts -t "accepts short non-git commit hashes in task README frontmatter|creates issues on writeTask and writes custom fields|prefers live task projection over a stale exported snapshot for README migration checks"; bunx vitest run packages/agentplane/src/backends/task-backend.load.test.ts -t "exports task snapshots with canonicalized fields"; bun run test:fast; bun scripts/sync-schemas.mjs check; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx eslint targeted files; bunx prettier --check targeted files and generated schemas. Result: restored server-compatible task artifact validation and export coercion without widening runtime policy.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T16:35:51.621Z, excerpt_hash=sha256:49b8d6c8312ecc1ce6238772ca09bbcb676c36ccbc9bb76a6095157080bacbe9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
