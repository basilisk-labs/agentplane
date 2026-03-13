---
id: "202603131309-HSRN23"
title: "Canonical task schema v1 in frontmatter"
result_summary: "Seeded one-file canonical task state via revision and sections frontmatter fields without changing readable body semantics."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 1
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
  state: "ok"
  updated_at: "2026-03-13T14:07:54.355Z"
  updated_by: "CODER"
  note: |-
    Command: bun x vitest run packages/core/src/tasks/task-readme.test.ts packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/shared/task-store.test.ts --hookTimeout 60000 --testTimeout 60000
    Result: pass
    Evidence: 3 test files passed, 40 tests passed.
    Scope: canonical frontmatter parsing/rendering, legacy fallback, local TaskStore canonical seeding.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited with code 0.
    Scope: compile and packaging integrity for touched core and CLI task layers.
    
    Command: node --input-type=module -e "import { renderTaskReadme } from ./packages/core/dist/index.js; const text = renderTaskReadme({ id: \"202603130000-TEST\", title: \"Schema sample\", status: \"TODO\", priority: \"med\", owner: \"CODER\", revision: 1, depends_on: [], tags: [\"code\"], verify: [], plan_approval: { state: \"pending\", updated_at: null, updated_by: null, note: null }, verification: { state: \"pending\", updated_at: null, updated_by: null, note: null }, comments: [], doc_version: 3, doc_updated_at: \"2026-03-13T00:00:00.000Z\", doc_updated_by: \"CODER\", description: \"sample\", sections: { Summary: \"Readable summary\", \"Verify Steps\": \"1. Run focused checks.\" } }, \"## Summary\
    \
    Readable summary\
    \
    ## Verify Steps\
    \
    1. Run focused checks.\
    \"); console.log(text);"
    Result: pass
    Evidence: rendered sample kept revision and sections in frontmatter while README body remained readable.
    Scope: human-readable projection shape for canonical schema v1.
commit:
  hash: "fc9758fc7cdae570c77c7af317e0bbb44035674b"
  message: "🧱 HSRN23 task: Introduce canonical task schema v1 in frontmatter"
comments:
  -
    author: "CODER"
    body: "Start: implement canonical schema v1 in frontmatter with legacy README fallback and targeted parser/store coverage."
  -
    author: "CODER"
    body: "Verified: canonical schema v1 now seeds revision and canonical sections in frontmatter while legacy markdown-body fallback remains intact."
events:
  -
    type: "status"
    at: "2026-03-13T13:39:35.568Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement canonical schema v1 in frontmatter with legacy README fallback and targeted parser/store coverage."
  -
    type: "verify"
    at: "2026-03-13T14:07:54.355Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x vitest run packages/core/src/tasks/task-readme.test.ts packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/shared/task-store.test.ts --hookTimeout 60000 --testTimeout 60000
      Result: pass
      Evidence: 3 test files passed, 40 tests passed.
      Scope: canonical frontmatter parsing/rendering, legacy fallback, local TaskStore canonical seeding.
      
      Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
      Result: pass
      Evidence: both package builds exited with code 0.
      Scope: compile and packaging integrity for touched core and CLI task layers.
      
      Command: node --input-type=module -e "import { renderTaskReadme } from ./packages/core/dist/index.js; const text = renderTaskReadme({ id: \"202603130000-TEST\", title: \"Schema sample\", status: \"TODO\", priority: \"med\", owner: \"CODER\", revision: 1, depends_on: [], tags: [\"code\"], verify: [], plan_approval: { state: \"pending\", updated_at: null, updated_by: null, note: null }, verification: { state: \"pending\", updated_at: null, updated_by: null, note: null }, comments: [], doc_version: 3, doc_updated_at: \"2026-03-13T00:00:00.000Z\", doc_updated_by: \"CODER\", description: \"sample\", sections: { Summary: \"Readable summary\", \"Verify Steps\": \"1. Run focused checks.\" } }, \"## Summary\
      \
      Readable summary\
      \
      ## Verify Steps\
      \
      1. Run focused checks.\
      \"); console.log(text);"
      Result: pass
      Evidence: rendered sample kept revision and sections in frontmatter while README body remained readable.
      Scope: human-readable projection shape for canonical schema v1.
  -
    type: "status"
    at: "2026-03-13T14:08:13.055Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: canonical schema v1 now seeds revision and canonical sections in frontmatter while legacy markdown-body fallback remains intact."
doc_version: 3
doc_updated_at: "2026-03-13T14:08:13.056Z"
doc_updated_by: "CODER"
description: "Introduce minimal canonical structured task state in one-file task READMEs: revision, canonical section map, and the smallest metadata needed to stop treating markdown body as operational source of truth."
sections:
  Summary: |-
    Canonical task schema v1 in frontmatter
    
    Introduce minimal canonical structured task state in one-file task READMEs: revision, canonical section map, and the smallest metadata needed to stop treating markdown body as operational source of truth.
  Scope: |-
    - In scope: Introduce minimal canonical structured task state in one-file task READMEs: revision, canonical section map, and the smallest metadata needed to stop treating markdown body as operational source of truth.
    - Out of scope: unrelated refactors not required for "Canonical task schema v1 in frontmatter".
  Plan: |-
    1. Extend the task schema and frontmatter conversion layer with minimal canonical state fields for one-file tasks: `revision` and canonical `sections`, while preserving backward compatibility.
    2. Teach task parsing and local task-store reads to prefer canonical frontmatter sections when present and fall back to legacy markdown-body extraction otherwise.
    3. Add targeted regressions for frontmatter round-trip, legacy fallback, and local task-store behavior so schema v1 lands without body-render rollout in this task.
  Verify Steps: |-
    1. Run `bun x vitest run packages/core/src/tasks/task-readme.test.ts packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/shared/task-store.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: canonical frontmatter parsing/rendering and legacy fallback paths pass.
    2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: task schema changes compile in both packages without type or runtime regressions.
    3. Inspect a generated task README fixture or round-trip output. Expected: `revision` and canonical `sections` stay in frontmatter while the visible task document remains readable.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
