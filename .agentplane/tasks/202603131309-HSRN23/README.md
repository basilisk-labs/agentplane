---
id: "202603131309-HSRN23"
title: "Canonical task schema v1 in frontmatter"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T13:39:35.146Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement canonical schema v1 in frontmatter with legacy README fallback and targeted parser/store coverage."
events:
  -
    type: "status"
    at: "2026-03-13T13:39:35.568Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement canonical schema v1 in frontmatter with legacy README fallback and targeted parser/store coverage."
doc_version: 3
doc_updated_at: "2026-03-13T13:39:35.569Z"
doc_updated_by: "CODER"
description: "Introduce minimal canonical structured task state in one-file task READMEs: revision, canonical section map, and the smallest metadata needed to stop treating markdown body as operational source of truth."
id_source: "generated"
---
## Summary

Canonical task schema v1 in frontmatter

Introduce minimal canonical structured task state in one-file task READMEs: revision, canonical section map, and the smallest metadata needed to stop treating markdown body as operational source of truth.

## Scope

- In scope: Introduce minimal canonical structured task state in one-file task READMEs: revision, canonical section map, and the smallest metadata needed to stop treating markdown body as operational source of truth.
- Out of scope: unrelated refactors not required for "Canonical task schema v1 in frontmatter".

## Plan

1. Extend the task schema and frontmatter conversion layer with minimal canonical state fields for one-file tasks: `revision` and canonical `sections`, while preserving backward compatibility.
2. Teach task parsing and local task-store reads to prefer canonical frontmatter sections when present and fall back to legacy markdown-body extraction otherwise.
3. Add targeted regressions for frontmatter round-trip, legacy fallback, and local task-store behavior so schema v1 lands without body-render rollout in this task.

## Verify Steps

1. Run `bun x vitest run packages/core/src/tasks/task-readme.test.ts packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/shared/task-store.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: canonical frontmatter parsing/rendering and legacy fallback paths pass.
2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: task schema changes compile in both packages without type or runtime regressions.
3. Inspect a generated task README fixture or round-trip output. Expected: `revision` and canonical `sections` stay in frontmatter while the visible task document remains readable.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
