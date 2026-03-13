---
id: "202603131309-JYPPQS"
title: "Generate task body from canonical state"
result_summary: "Made one-file task README body a generated projection of canonical sections with legacy passthrough only when sections are absent."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 1
depends_on:
  - "202603131309-HSRN23"
tags:
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T15:08:15.596Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T15:12:12.750Z"
  updated_by: "CODER"
  note: |-
    Command: bun x vitest run packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-store.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts --hookTimeout 60000 --testTimeout 60000
    Result: pass
    Evidence: 4 test files passed, 51 tests passed.
    Scope: render precedence, legacy passthrough, core/local writer-path projection repair.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited with code 0.
    Scope: compile integrity for renderer and local writer-path changes.
    
    Command: node --input-type=module -e "import { renderTaskReadme } from ./packages/core/dist/index.js; const text = renderTaskReadme({ id: \"202603130001-TEST\", title: \"Projection sample\", status: \"TODO\", priority: \"med\", owner: \"CODER\", revision: 1, depends_on: [], tags: [\"code\"], verify: [], plan_approval: { state: \"pending\", updated_at: null, updated_by: null, note: null }, verification: { state: \"pending\", updated_at: null, updated_by: null, note: null }, comments: [], doc_version: 3, doc_updated_at: \"2026-03-13T00:00:00.000Z\", doc_updated_by: \"CODER\", description: \"sample\", sections: { Summary: \"Canonical summary\", Findings: \"Canonical finding\" } }, \"## Summary\
    \
    stale body\
    \"); console.log(text);"
    Result: pass
    Evidence: rendered sample dropped stale body text and regenerated the visible README body from canonical frontmatter sections.
    Scope: runtime projection behavior when canonical sections exist.
commit:
  hash: "bb2c9592e4971b6a70ea8c182146133de910a0f0"
  message: "🧱 JYPPQS task: Generate task body from canonical state"
comments:
  -
    author: "CODER"
    body: "Start: make README body a generated projection of canonical frontmatter sections with legacy passthrough only when sections are absent."
  -
    author: "CODER"
    body: "Verified: README body is now regenerated from canonical frontmatter sections, and local writer paths no longer preserve stale body text when canonical sections exist."
events:
  -
    type: "status"
    at: "2026-03-13T15:08:16.032Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make README body a generated projection of canonical frontmatter sections with legacy passthrough only when sections are absent."
  -
    type: "verify"
    at: "2026-03-13T15:12:12.750Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x vitest run packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-store.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts --hookTimeout 60000 --testTimeout 60000
      Result: pass
      Evidence: 4 test files passed, 51 tests passed.
      Scope: render precedence, legacy passthrough, core/local writer-path projection repair.
      
      Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
      Result: pass
      Evidence: both package builds exited with code 0.
      Scope: compile integrity for renderer and local writer-path changes.
      
      Command: node --input-type=module -e "import { renderTaskReadme } from ./packages/core/dist/index.js; const text = renderTaskReadme({ id: \"202603130001-TEST\", title: \"Projection sample\", status: \"TODO\", priority: \"med\", owner: \"CODER\", revision: 1, depends_on: [], tags: [\"code\"], verify: [], plan_approval: { state: \"pending\", updated_at: null, updated_by: null, note: null }, verification: { state: \"pending\", updated_at: null, updated_by: null, note: null }, comments: [], doc_version: 3, doc_updated_at: \"2026-03-13T00:00:00.000Z\", doc_updated_by: \"CODER\", description: \"sample\", sections: { Summary: \"Canonical summary\", Findings: \"Canonical finding\" } }, \"## Summary\
      \
      stale body\
      \"); console.log(text);"
      Result: pass
      Evidence: rendered sample dropped stale body text and regenerated the visible README body from canonical frontmatter sections.
      Scope: runtime projection behavior when canonical sections exist.
  -
    type: "status"
    at: "2026-03-13T15:13:39.620Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: README body is now regenerated from canonical frontmatter sections, and local writer paths no longer preserve stale body text when canonical sections exist."
doc_version: 3
doc_updated_at: "2026-03-13T15:13:39.621Z"
doc_updated_by: "CODER"
description: "Add deterministic renderer that rebuilds README body from canonical frontmatter state so the body becomes a generated projection, not a write surface."
sections:
  Summary: |-
    Generate task body from canonical state
    
    Add deterministic renderer that rebuilds README body from canonical frontmatter state so the body becomes a generated projection, not a write surface.
  Scope: |-
    - In scope: Add deterministic renderer that rebuilds README body from canonical frontmatter state so the body becomes a generated projection, not a write surface.
    - Out of scope: unrelated refactors not required for "Generate task body from canonical state".
  Plan: |-
    1. Teach the task README renderer to rebuild the visible body from canonical frontmatter sections whenever `sections` are present, while preserving legacy body passthrough when canonical sections are absent.
    2. Update core and local write paths so projection drift gets corrected by the renderer instead of relying on ad hoc body preservation.
    3. Add focused regressions for canonical render precedence, legacy passthrough, and projection-drift repair in core and local backend/store tests.
  Verify Steps: |-
    1. Run `bun x vitest run packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-store.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: canonical sections drive rendered bodies, legacy passthrough remains intact, and writer paths repair projection drift.
    2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: renderer and writer-path changes compile cleanly in both packages.
    3. Inspect a rendered README sample or updated task file. Expected: when canonical sections exist, the visible body is regenerated from them rather than preserving stale body text.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-13T15:12:12.750Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-store.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts --hookTimeout 60000 --testTimeout 60000
    Result: pass
    Evidence: 4 test files passed, 51 tests passed.
    Scope: render precedence, legacy passthrough, core/local writer-path projection repair.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited with code 0.
    Scope: compile integrity for renderer and local writer-path changes.
    
    Command: node --input-type=module -e "import { renderTaskReadme } from ./packages/core/dist/index.js; const text = renderTaskReadme({ id: \"202603130001-TEST\", title: \"Projection sample\", status: \"TODO\", priority: \"med\", owner: \"CODER\", revision: 1, depends_on: [], tags: [\"code\"], verify: [], plan_approval: { state: \"pending\", updated_at: null, updated_by: null, note: null }, verification: { state: \"pending\", updated_at: null, updated_by: null, note: null }, comments: [], doc_version: 3, doc_updated_at: \"2026-03-13T00:00:00.000Z\", doc_updated_by: \"CODER\", description: \"sample\", sections: { Summary: \"Canonical summary\", Findings: \"Canonical finding\" } }, \"## Summary\\n\\nstale body\\n\"); console.log(text);"\nResult: pass\nEvidence: rendered sample dropped stale body text and regenerated the visible README body from canonical frontmatter sections.\nScope: runtime projection behavior when canonical sections exist.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T15:11:59.442Z, excerpt_hash=sha256:347b4cb7311e36bc5b5943f5dd86c5e7a9c98a8f5b5c93bf884f7959a1c339b2
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- Bootstrap finding: before generated-body rollout, task doc updates could leave frontmatter.sections stale while the visible body changed; plan approval then read old Verify Steps from canonical state."
id_source: "generated"
---
## Summary

Generate task body from canonical state

Add deterministic renderer that rebuilds README body from canonical frontmatter state so the body becomes a generated projection, not a write surface.

## Scope

- In scope: Add deterministic renderer that rebuilds README body from canonical frontmatter state so the body becomes a generated projection, not a write surface.
- Out of scope: unrelated refactors not required for "Generate task body from canonical state".

## Plan

1. Teach the task README renderer to rebuild the visible body from canonical frontmatter sections whenever `sections` are present, while preserving legacy body passthrough when canonical sections are absent.
2. Update core and local write paths so projection drift gets corrected by the renderer instead of relying on ad hoc body preservation.
3. Add focused regressions for canonical render precedence, legacy passthrough, and projection-drift repair in core and local backend/store tests.

## Verify Steps

1. Run `bun x vitest run packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-store.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: canonical sections drive rendered bodies, legacy passthrough remains intact, and writer paths repair projection drift.
2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: renderer and writer-path changes compile cleanly in both packages.
3. Inspect a rendered README sample or updated task file. Expected: when canonical sections exist, the visible body is regenerated from them rather than preserving stale body text.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T15:12:12.750Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-store.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts --hookTimeout 60000 --testTimeout 60000
Result: pass
Evidence: 4 test files passed, 51 tests passed.
Scope: render precedence, legacy passthrough, core/local writer-path projection repair.

Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: both package builds exited with code 0.
Scope: compile integrity for renderer and local writer-path changes.

Command: node --input-type=module -e "import { renderTaskReadme } from ./packages/core/dist/index.js; const text = renderTaskReadme({ id: \"202603130001-TEST\", title: \"Projection sample\", status: \"TODO\", priority: \"med\", owner: \"CODER\", revision: 1, depends_on: [], tags: [\"code\"], verify: [], plan_approval: { state: \"pending\", updated_at: null, updated_by: null, note: null }, verification: { state: \"pending\", updated_at: null, updated_by: null, note: null }, comments: [], doc_version: 3, doc_updated_at: \"2026-03-13T00:00:00.000Z\", doc_updated_by: \"CODER\", description: \"sample\", sections: { Summary: \"Canonical summary\", Findings: \"Canonical finding\" } }, \"## Summary\\n\\nstale body\\n\"); console.log(text);"\nResult: pass\nEvidence: rendered sample dropped stale body text and regenerated the visible README body from canonical frontmatter sections.\nScope: runtime projection behavior when canonical sections exist.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T15:11:59.442Z, excerpt_hash=sha256:347b4cb7311e36bc5b5943f5dd86c5e7a9c98a8f5b5c93bf884f7959a1c339b2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Bootstrap finding: before generated-body rollout, task doc updates could leave frontmatter.sections stale while the visible body changed; plan approval then read old Verify Steps from canonical state.
