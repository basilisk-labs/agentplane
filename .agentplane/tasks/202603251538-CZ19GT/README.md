---
id: "202603251538-CZ19GT"
title: "Split TaskBackend ports and separate summary/full task reads"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603251535-H2EGEM"
tags:
  - "code"
  - "architecture"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-27T09:02:11.550Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-27T09:17:21.152Z"
  updated_by: "CODER"
  note: "Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; bunx eslint touched backend/query files; bunx prettier --check touched backend/query files. Result: pass. Evidence: 5 test files / 122 tests passed. Scope: TaskBackend port split, summary projection reads, local/redmine backend projection typing, summary-consumer command helpers."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split TaskBackend into explicit ports and separate summary reads from full task loads before touching runner/backend consumers."
events:
  -
    type: "status"
    at: "2026-03-27T09:02:12.589Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split TaskBackend into explicit ports and separate summary reads from full task loads before touching runner/backend consumers."
  -
    type: "verify"
    at: "2026-03-27T09:17:21.152Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; bunx eslint touched backend/query files; bunx prettier --check touched backend/query files. Result: pass. Evidence: 5 test files / 122 tests passed. Scope: TaskBackend port split, summary projection reads, local/redmine backend projection typing, summary-consumer command helpers."
doc_version: 3
doc_updated_at: "2026-03-27T09:17:21.157Z"
doc_updated_by: "CODER"
description: "Refactor task backend contracts into explicit query, mutation, doc, sync, export, and inspection ports, and introduce distinct summary versus full task entity reads so commands and backends stop overloading one task shape for every persistence surface."
sections:
  Summary: |-
    Split TaskBackend ports and separate summary/full task reads
    
    Refactor task backend contracts into explicit query, mutation, doc, sync, export, and inspection ports, and introduce distinct summary versus full task entity reads so commands and backends stop overloading one task shape for every persistence surface.
  Scope: |-
    - In scope: Refactor task backend contracts into explicit query, mutation, doc, sync, export, and inspection ports, and introduce distinct summary versus full task entity reads so commands and backends stop overloading one task shape for every persistence surface.
    - Out of scope: unrelated refactors not required for "Split TaskBackend ports and separate summary/full task reads".
  Plan: |-
    1. Split the current wide TaskBackend contract into explicit ports for query, mutation, task-doc access, sync, export, and inspection, and introduce distinct TaskSummary versus full TaskData reads instead of overloading one task shape for every call site.
    2. Migrate local/redmine backends plus shared command helpers to the new port boundaries so list/query code consumes summaries while full task loads remain available only where doc/events/sections are actually required.
    3. Add targeted regression coverage for backend query/mutation/export/doc flows and run the smallest relevant backend and build checks before recording any residual follow-up in Findings.
  Verify Steps: |-
    1. Inspect the shared backend types and the local/redmine backend implementations after the refactor. Expected: query, mutation, task-doc, sync, export, and inspection concerns are expressed through explicit ports, and summary reads are distinct from full task reads.
    2. Run targeted backend and shared-command regressions around list/get/write/doc/export/sync flows. Expected: summary consumers no longer depend on full task entities, full task loads still preserve doc/events where needed, and local plus Redmine behavior stays stable.
    3. Run the smallest relevant package builds. Expected: the split backend contracts compile cleanly in core and agentplane, and touched command/backend imports stay consistent.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-27T09:17:21.152Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; bunx eslint touched backend/query files; bunx prettier --check touched backend/query files. Result: pass. Evidence: 5 test files / 122 tests passed. Scope: TaskBackend port split, summary projection reads, local/redmine backend projection typing, summary-consumer command helpers.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T09:02:12.591Z, excerpt_hash=sha256:16c1b0058df5d7abc3167bb1f3e333501ad7f28f1a428b61ea45101c958bb02d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Split TaskBackend ports and separate summary/full task reads

Refactor task backend contracts into explicit query, mutation, doc, sync, export, and inspection ports, and introduce distinct summary versus full task entity reads so commands and backends stop overloading one task shape for every persistence surface.

## Scope

- In scope: Refactor task backend contracts into explicit query, mutation, doc, sync, export, and inspection ports, and introduce distinct summary versus full task entity reads so commands and backends stop overloading one task shape for every persistence surface.
- Out of scope: unrelated refactors not required for "Split TaskBackend ports and separate summary/full task reads".

## Plan

1. Split the current wide TaskBackend contract into explicit ports for query, mutation, task-doc access, sync, export, and inspection, and introduce distinct TaskSummary versus full TaskData reads instead of overloading one task shape for every call site.
2. Migrate local/redmine backends plus shared command helpers to the new port boundaries so list/query code consumes summaries while full task loads remain available only where doc/events/sections are actually required.
3. Add targeted regression coverage for backend query/mutation/export/doc flows and run the smallest relevant backend and build checks before recording any residual follow-up in Findings.

## Verify Steps

1. Inspect the shared backend types and the local/redmine backend implementations after the refactor. Expected: query, mutation, task-doc, sync, export, and inspection concerns are expressed through explicit ports, and summary reads are distinct from full task reads.
2. Run targeted backend and shared-command regressions around list/get/write/doc/export/sync flows. Expected: summary consumers no longer depend on full task entities, full task loads still preserve doc/events where needed, and local plus Redmine behavior stays stable.
3. Run the smallest relevant package builds. Expected: the split backend contracts compile cleanly in core and agentplane, and touched command/backend imports stay consistent.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-27T09:17:21.152Z — VERIFY — ok

By: CODER

Note: Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; bunx eslint touched backend/query files; bunx prettier --check touched backend/query files. Result: pass. Evidence: 5 test files / 122 tests passed. Scope: TaskBackend port split, summary projection reads, local/redmine backend projection typing, summary-consumer command helpers.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T09:02:12.591Z, excerpt_hash=sha256:16c1b0058df5d7abc3167bb1f3e333501ad7f28f1a428b61ea45101c958bb02d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
