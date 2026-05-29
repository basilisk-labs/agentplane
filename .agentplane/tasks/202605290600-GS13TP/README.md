---
id: "202605290600-GS13TP"
title: "Context ingest task prompt decomposition"
result_summary: "Merged via PR #4294."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "hotspot"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T06:00:21.741Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T06:04:57.428Z"
  updated_by: "CODER"
  note: "Context ingest prompt construction extracted into packages/agentplane/src/context/ingest-task-prompt.ts; createTaskNewParsed behavior and prompt payload are preserved. Checks passed: bun test packages/agentplane/src/commands/context/release-readiness.test.ts (21 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 5 -> 4)."
  attempts: 0
commit:
  hash: "1fd1619d745dfae7629209888c4948ae804d6c44"
  message: "♻️ GS13TP task: decompose context ingest prompt"
comments:
  -
    author: "CODER"
    body: "Start: extracting context ingest task prompt construction into a focused helper module while preserving createTaskNewParsed behavior and maximum-assimilation task payloads."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4294 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-29T06:00:46.900Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extracting context ingest task prompt construction into a focused helper module while preserving createTaskNewParsed behavior and maximum-assimilation task payloads."
  -
    type: "verify"
    at: "2026-05-29T06:04:57.428Z"
    author: "CODER"
    state: "ok"
    note: "Context ingest prompt construction extracted into packages/agentplane/src/context/ingest-task-prompt.ts; createTaskNewParsed behavior and prompt payload are preserved. Checks passed: bun test packages/agentplane/src/commands/context/release-readiness.test.ts (21 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 5 -> 4)."
  -
    type: "status"
    at: "2026-05-29T06:08:41.664Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4294 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-29T06:08:41.667Z"
doc_updated_by: "INTEGRATOR"
description: "Refactor packages/agentplane/src/context/ingest-task.ts below the 400-line hotspot warning by extracting context assimilation prompt/metadata helpers into focused module(s). Preserve createTaskNewParsed public API, maximum-assimilation task contract, prompt module payload, source-set behavior, and allowed/forbidden output semantics. Acceptance: context release-readiness tests covering ingest pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot."
sections:
  Summary: |-
    Context ingest task prompt decomposition

    Refactor packages/agentplane/src/context/ingest-task.ts below the 400-line hotspot warning by extracting context assimilation prompt/metadata helpers into focused module(s). Preserve createTaskNewParsed public API, maximum-assimilation task contract, prompt module payload, source-set behavior, and allowed/forbidden output semantics. Acceptance: context release-readiness tests covering ingest pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.
  Scope: |-
    - In scope: Refactor packages/agentplane/src/context/ingest-task.ts below the 400-line hotspot warning by extracting context assimilation prompt/metadata helpers into focused module(s). Preserve createTaskNewParsed public API, maximum-assimilation task contract, prompt module payload, source-set behavior, and allowed/forbidden output semantics. Acceptance: context release-readiness tests covering ingest pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.
    - Out of scope: unrelated refactors not required for "Context ingest task prompt decomposition".
  Plan: "1. Extract context assimilation prompt-module construction from packages/agentplane/src/context/ingest-task.ts into a focused helper module while preserving the generated prompt content byte-for-byte except import/export placement. 2. Keep createTaskNewParsed, selectedSourceRows, and exported ContextWorkspaceMode behavior stable; update imports/types only as needed. 3. Run targeted context release-readiness tests that cover ingest task creation and maximum-assimilation validation, then full required repo checks: typecheck, arch, knip, lint, format, hotspots. 4. Open a branch_pr PR, wait for hosted checks, merge to main, record evaluator/finish evidence, and clean merged task worktree."
  Verify Steps: |-
    1. `bun test packages/agentplane/src/commands/context/release-readiness.test.ts`
    2. `bun run typecheck`
    3. `bun run arch:check`
    4. `bun run knip:check`
    5. `bun run lint:core`
    6. `bun run format:changed`
    7. `bun run hotspots:check`
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T06:04:57.428Z — VERIFY — ok

    By: CODER

    Note: Context ingest prompt construction extracted into packages/agentplane/src/context/ingest-task-prompt.ts; createTaskNewParsed behavior and prompt payload are preserved. Checks passed: bun test packages/agentplane/src/commands/context/release-readiness.test.ts (21 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 5 -> 4).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T06:00:46.900Z, excerpt_hash=sha256:0f88d27226edb785e64b1c61b9f3cd8c026e132d100276c77c25a3c1964cf958

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290600-GS13TP/blueprint/resolved-snapshot.json
    - old_digest: fa65d61fe71740da3f9cc5a0ecedabb69e9d212c8dd58785550e8657c37d1e51
    - current_digest: fa65d61fe71740da3f9cc5a0ecedabb69e9d212c8dd58785550e8657c37d1e51
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290600-GS13TP

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Context ingest task prompt decomposition

Refactor packages/agentplane/src/context/ingest-task.ts below the 400-line hotspot warning by extracting context assimilation prompt/metadata helpers into focused module(s). Preserve createTaskNewParsed public API, maximum-assimilation task contract, prompt module payload, source-set behavior, and allowed/forbidden output semantics. Acceptance: context release-readiness tests covering ingest pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.

## Scope

- In scope: Refactor packages/agentplane/src/context/ingest-task.ts below the 400-line hotspot warning by extracting context assimilation prompt/metadata helpers into focused module(s). Preserve createTaskNewParsed public API, maximum-assimilation task contract, prompt module payload, source-set behavior, and allowed/forbidden output semantics. Acceptance: context release-readiness tests covering ingest pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.
- Out of scope: unrelated refactors not required for "Context ingest task prompt decomposition".

## Plan

1. Extract context assimilation prompt-module construction from packages/agentplane/src/context/ingest-task.ts into a focused helper module while preserving the generated prompt content byte-for-byte except import/export placement. 2. Keep createTaskNewParsed, selectedSourceRows, and exported ContextWorkspaceMode behavior stable; update imports/types only as needed. 3. Run targeted context release-readiness tests that cover ingest task creation and maximum-assimilation validation, then full required repo checks: typecheck, arch, knip, lint, format, hotspots. 4. Open a branch_pr PR, wait for hosted checks, merge to main, record evaluator/finish evidence, and clean merged task worktree.

## Verify Steps

1. `bun test packages/agentplane/src/commands/context/release-readiness.test.ts`
2. `bun run typecheck`
3. `bun run arch:check`
4. `bun run knip:check`
5. `bun run lint:core`
6. `bun run format:changed`
7. `bun run hotspots:check`

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T06:04:57.428Z — VERIFY — ok

By: CODER

Note: Context ingest prompt construction extracted into packages/agentplane/src/context/ingest-task-prompt.ts; createTaskNewParsed behavior and prompt payload are preserved. Checks passed: bun test packages/agentplane/src/commands/context/release-readiness.test.ts (21 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 5 -> 4).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T06:00:46.900Z, excerpt_hash=sha256:0f88d27226edb785e64b1c61b9f3cd8c026e132d100276c77c25a3c1964cf958

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290600-GS13TP/blueprint/resolved-snapshot.json
- old_digest: fa65d61fe71740da3f9cc5a0ecedabb69e9d212c8dd58785550e8657c37d1e51
- current_digest: fa65d61fe71740da3f9cc5a0ecedabb69e9d212c8dd58785550e8657c37d1e51
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290600-GS13TP

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
