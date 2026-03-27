---
id: "202603251535-H2EGEM"
title: "Type PR artifact state and decouple integrate/finalize from finish command reuse"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603251535-3DZ26K"
tags:
  - "code"
  - "architecture"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-26T19:08:10.301Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-26T19:39:17.463Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; bunx eslint packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/shared/pr-meta.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts; bunx prettier --check packages/core/src/tasks/task-artifact-schema.ts packages/core/schemas/pr-meta.schema.json packages/spec/schemas/pr-meta.schema.json packages/spec/examples/pr-meta.json packages/agentplane/src/commands/shared/pr-meta.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/pr/open.ts packages/agentplane/src/commands/pr/update.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts. Result: pass. Evidence: 7 test files / 88 tests passed; focused finish unit passed; core and agentplane builds passed after worktree-local core symlink bootstrap. Scope: PR meta typing, integrate finalize close path, finish handoff, schema sync."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: introduce a typed PR artifact state contract and decouple integrate/finalize from finish-command reuse without changing merge or close semantics."
events:
  -
    type: "status"
    at: "2026-03-26T19:08:46.087Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: introduce a typed PR artifact state contract and decouple integrate/finalize from finish-command reuse without changing merge or close semantics."
  -
    type: "verify"
    at: "2026-03-26T19:39:17.463Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; bunx eslint packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/shared/pr-meta.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts; bunx prettier --check packages/core/src/tasks/task-artifact-schema.ts packages/core/schemas/pr-meta.schema.json packages/spec/schemas/pr-meta.schema.json packages/spec/examples/pr-meta.json packages/agentplane/src/commands/shared/pr-meta.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/pr/open.ts packages/agentplane/src/commands/pr/update.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts. Result: pass. Evidence: 7 test files / 88 tests passed; focused finish unit passed; core and agentplane builds passed after worktree-local core symlink bootstrap. Scope: PR meta typing, integrate finalize close path, finish handoff, schema sync."
doc_version: 3
doc_updated_at: "2026-03-26T19:39:17.464Z"
doc_updated_by: "CODER"
description: "Introduce a typed PR state contract and stop integrating through loose Record-based PR metadata plus recursive finish-command reuse inside finalize flows."
sections:
  Summary: |-
    Type PR artifact state and decouple integrate/finalize from finish command reuse
    
    Introduce a typed PR state contract and stop integrating through loose Record-based PR metadata plus recursive finish-command reuse inside finalize flows.
  Scope: |-
    - In scope: Introduce a typed PR state contract and stop integrating through loose Record-based PR metadata plus recursive finish-command reuse inside finalize flows.
    - Out of scope: unrelated refactors not required for "Type PR artifact state and decouple integrate/finalize from finish command reuse".
  Plan: |-
    1. Inventory the current PR artifact read/write seams across pr open/update/check and integrate/finalize, and define one typed PR artifact state contract that replaces loose Record-based metadata access.
    2. Refactor finalize/integrate flows to consume that typed PR state and remove recursive finish-command reuse, keeping merge/verification/close behavior stable.
    3. Add focused regression coverage for PR artifact parsing plus integrate/finalize orchestration, then run the smallest targeted build/test surface and record any residual follow-up in Findings.
  Verify Steps: |-
    1. Inspect the PR artifact readers/writers and integrate/finalize orchestration. Expected: PR state is loaded through one typed contract, and finalize no longer depends on recursive finish-command reuse to close tasks.
    2. Run focused PR-flow and lifecycle regressions around pr open/update/check, integrate, finalize, and finish handoff paths. Expected: merge metadata, verification evidence, and close semantics remain stable for the touched flows.
    3. Run the smallest relevant package builds for core and agentplane. Expected: typed PR artifact state compiles cleanly and no downstream command/import breakage appears in touched workflow paths.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-26T19:39:17.463Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; bunx eslint packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/shared/pr-meta.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts; bunx prettier --check packages/core/src/tasks/task-artifact-schema.ts packages/core/schemas/pr-meta.schema.json packages/spec/schemas/pr-meta.schema.json packages/spec/examples/pr-meta.json packages/agentplane/src/commands/shared/pr-meta.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/pr/open.ts packages/agentplane/src/commands/pr/update.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts. Result: pass. Evidence: 7 test files / 88 tests passed; focused finish unit passed; core and agentplane builds passed after worktree-local core symlink bootstrap. Scope: PR meta typing, integrate finalize close path, finish handoff, schema sync.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-26T19:08:46.088Z, excerpt_hash=sha256:b848cf91dfba1bfdaba93e847ef0bdfca1ac00049da69866f7b3a88aa9de9f20
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Type PR artifact state and decouple integrate/finalize from finish command reuse

Introduce a typed PR state contract and stop integrating through loose Record-based PR metadata plus recursive finish-command reuse inside finalize flows.

## Scope

- In scope: Introduce a typed PR state contract and stop integrating through loose Record-based PR metadata plus recursive finish-command reuse inside finalize flows.
- Out of scope: unrelated refactors not required for "Type PR artifact state and decouple integrate/finalize from finish command reuse".

## Plan

1. Inventory the current PR artifact read/write seams across pr open/update/check and integrate/finalize, and define one typed PR artifact state contract that replaces loose Record-based metadata access.
2. Refactor finalize/integrate flows to consume that typed PR state and remove recursive finish-command reuse, keeping merge/verification/close behavior stable.
3. Add focused regression coverage for PR artifact parsing plus integrate/finalize orchestration, then run the smallest targeted build/test surface and record any residual follow-up in Findings.

## Verify Steps

1. Inspect the PR artifact readers/writers and integrate/finalize orchestration. Expected: PR state is loaded through one typed contract, and finalize no longer depends on recursive finish-command reuse to close tasks.
2. Run focused PR-flow and lifecycle regressions around pr open/update/check, integrate, finalize, and finish handoff paths. Expected: merge metadata, verification evidence, and close semantics remain stable for the touched flows.
3. Run the smallest relevant package builds for core and agentplane. Expected: typed PR artifact state compiles cleanly and no downstream command/import breakage appears in touched workflow paths.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-26T19:39:17.463Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/core/src/tasks/task-artifact-schema.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; bunx eslint packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/shared/pr-meta.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts; bunx prettier --check packages/core/src/tasks/task-artifact-schema.ts packages/core/schemas/pr-meta.schema.json packages/spec/schemas/pr-meta.schema.json packages/spec/examples/pr-meta.json packages/agentplane/src/commands/shared/pr-meta.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/pr/open.ts packages/agentplane/src/commands/pr/update.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts. Result: pass. Evidence: 7 test files / 88 tests passed; focused finish unit passed; core and agentplane builds passed after worktree-local core symlink bootstrap. Scope: PR meta typing, integrate finalize close path, finish handoff, schema sync.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-26T19:08:46.088Z, excerpt_hash=sha256:b848cf91dfba1bfdaba93e847ef0bdfca1ac00049da69866f7b3a88aa9de9f20

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
