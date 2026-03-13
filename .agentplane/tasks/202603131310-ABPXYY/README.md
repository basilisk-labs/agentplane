---
id: "202603131310-ABPXYY"
title: "Migrate doc commands to canonical sections"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
depends_on:
  - "202603131309-HSRN23"
  - "202603131309-JYPPQS"
  - "202603131310-0KBWXJ"
tags:
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T15:37:32.332Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T17:09:18.040Z"
  updated_by: "CODER"
  note: |-
    Command: bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts --hookTimeout 60000 --testTimeout 60000 && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build && node --input-type=module <canonical-section-runtime-check>
    Result: local doc and plan paths now persist canonical frontmatter sections, task doc show/verify-show read from canonical sections when available, and rendered README body matches the stored section map.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: move doc and plan commands to canonical frontmatter sections so body generation becomes a pure projection, not the write surface."
events:
  -
    type: "status"
    at: "2026-03-13T15:37:36.700Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move doc and plan commands to canonical frontmatter sections so body generation becomes a pure projection, not the write surface."
  -
    type: "verify"
    at: "2026-03-13T17:09:18.040Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts --hookTimeout 60000 --testTimeout 60000 && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build && node --input-type=module <canonical-section-runtime-check>
      Result: local doc and plan paths now persist canonical frontmatter sections, task doc show/verify-show read from canonical sections when available, and rendered README body matches the stored section map.
doc_version: 3
doc_updated_at: "2026-03-13T17:09:18.046Z"
doc_updated_by: "CODER"
description: "Move task doc set/show, verify-show, and plan/doc write paths to canonical section storage in frontmatter while preserving one-file task artifacts."
sections:
  Summary: |-
    Migrate doc commands to canonical sections
    
    Move task doc set/show, verify-show, and plan/doc write paths to canonical section storage in frontmatter while preserving one-file task artifacts.
  Scope: |-
    - In scope: Move task doc set/show, verify-show, and plan/doc write paths to canonical section storage in frontmatter while preserving one-file task artifacts.
    - Out of scope: unrelated refactors not required for "Migrate doc commands to canonical sections".
  Plan: |-
    1. Move local task doc and plan write paths from markdown-body patching to canonical `sections` mutations stored in frontmatter.
    2. Teach the doc mutation layer to replace full docs by parsing them into canonical sections and to update single sections without treating body markdown as the source of truth.
    3. Make read surfaces (`task doc show`, `task verify-show`) prefer canonical sections directly when available.
    4. Preserve one-file task artifacts and remote-backend fallback behavior; do not widen this task into lifecycle command migration.
    5. Add regressions for canonical section writes, reads, and generated-body consistency.
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: canonical section read/write paths stay green, including plan/doc workflows.
    2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages compile with canonical section mutations.
    3. Inspect a temp task through the built runtime after `task doc set`-style canonical section updates. Expected: frontmatter `sections` changes are the write source and the rendered body matches them exactly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-13T17:09:18.040Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts --hookTimeout 60000 --testTimeout 60000 && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build && node --input-type=module <canonical-section-runtime-check>
    Result: local doc and plan paths now persist canonical frontmatter sections, task doc show/verify-show read from canonical sections when available, and rendered README body matches the stored section map.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T15:37:36.702Z, excerpt_hash=sha256:188976b936a1d0c1e425fb4a510dff64c4f218e8417c338471c991e6723d54f8
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate doc commands to canonical sections

Move task doc set/show, verify-show, and plan/doc write paths to canonical section storage in frontmatter while preserving one-file task artifacts.

## Scope

- In scope: Move task doc set/show, verify-show, and plan/doc write paths to canonical section storage in frontmatter while preserving one-file task artifacts.
- Out of scope: unrelated refactors not required for "Migrate doc commands to canonical sections".

## Plan

1. Move local task doc and plan write paths from markdown-body patching to canonical `sections` mutations stored in frontmatter.
2. Teach the doc mutation layer to replace full docs by parsing them into canonical sections and to update single sections without treating body markdown as the source of truth.
3. Make read surfaces (`task doc show`, `task verify-show`) prefer canonical sections directly when available.
4. Preserve one-file task artifacts and remote-backend fallback behavior; do not widen this task into lifecycle command migration.
5. Add regressions for canonical section writes, reads, and generated-body consistency.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: canonical section read/write paths stay green, including plan/doc workflows.
2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages compile with canonical section mutations.
3. Inspect a temp task through the built runtime after `task doc set`-style canonical section updates. Expected: frontmatter `sections` changes are the write source and the rendered body matches them exactly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T17:09:18.040Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts --hookTimeout 60000 --testTimeout 60000 && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build && node --input-type=module <canonical-section-runtime-check>
Result: local doc and plan paths now persist canonical frontmatter sections, task doc show/verify-show read from canonical sections when available, and rendered README body matches the stored section map.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T15:37:36.702Z, excerpt_hash=sha256:188976b936a1d0c1e425fb4a510dff64c4f218e8417c338471c991e6723d54f8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
