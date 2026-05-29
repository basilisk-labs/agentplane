---
id: "202605290610-R6288F"
title: "Context reindex projection decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
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
  updated_at: "2026-05-29T06:10:14.517Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T06:14:58.566Z"
  updated_by: "CODER"
  note: "Context reindex projection row helpers extracted into packages/agentplane/src/context/reindex-projection.ts; cmdContextReindex and readContextProjection semantics are preserved. Checks passed: bun test packages/agentplane/src/commands/context/release-readiness.test.ts (21 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 4 -> 3)."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extracting context reindex projection row helpers while preserving CLI reindex behavior, SQLite projection payloads, and read fallback semantics."
events:
  -
    type: "status"
    at: "2026-05-29T06:10:23.186Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extracting context reindex projection row helpers while preserving CLI reindex behavior, SQLite projection payloads, and read fallback semantics."
  -
    type: "verify"
    at: "2026-05-29T06:14:58.566Z"
    author: "CODER"
    state: "ok"
    note: "Context reindex projection row helpers extracted into packages/agentplane/src/context/reindex-projection.ts; cmdContextReindex and readContextProjection semantics are preserved. Checks passed: bun test packages/agentplane/src/commands/context/release-readiness.test.ts (21 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 4 -> 3)."
doc_version: 3
doc_updated_at: "2026-05-29T06:14:58.591Z"
doc_updated_by: "CODER"
description: "Refactor packages/agentplane/src/context/reindex.ts below the 400-line hotspot warning by extracting projection row helpers into focused module(s). Preserve cmdContextReindex behavior, projection metadata, path selection, markdown/jsonl/text row generation, SQLite projection writes, and readContextProjection fallback semantics. Acceptance: context release-readiness tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot."
sections:
  Summary: |-
    Context reindex projection decomposition

    Refactor packages/agentplane/src/context/reindex.ts below the 400-line hotspot warning by extracting projection row helpers into focused module(s). Preserve cmdContextReindex behavior, projection metadata, path selection, markdown/jsonl/text row generation, SQLite projection writes, and readContextProjection fallback semantics. Acceptance: context release-readiness tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.
  Scope: |-
    - In scope: Refactor packages/agentplane/src/context/reindex.ts below the 400-line hotspot warning by extracting projection row helpers into focused module(s). Preserve cmdContextReindex behavior, projection metadata, path selection, markdown/jsonl/text row generation, SQLite projection writes, and readContextProjection fallback semantics. Acceptance: context release-readiness tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.
    - Out of scope: unrelated refactors not required for "Context reindex projection decomposition".
  Plan: "1. Extract projection helper types/functions from packages/agentplane/src/context/reindex.ts into a focused projection module. 2. Keep cmdContextReindex and readContextProjection behavior stable; only update imports and exported helper boundaries needed by tests. 3. Run context release-readiness coverage plus typecheck, arch, knip, lint, format, and hotspots checks. 4. Open the branch_pr PR, wait for hosted checks, merge, record evaluator/finish evidence, and cleanup."
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
    ### 2026-05-29T06:14:58.566Z — VERIFY — ok

    By: CODER

    Note: Context reindex projection row helpers extracted into packages/agentplane/src/context/reindex-projection.ts; cmdContextReindex and readContextProjection semantics are preserved. Checks passed: bun test packages/agentplane/src/commands/context/release-readiness.test.ts (21 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 4 -> 3).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T06:10:23.186Z, excerpt_hash=sha256:0f88d27226edb785e64b1c61b9f3cd8c026e132d100276c77c25a3c1964cf958

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290610-R6288F/blueprint/resolved-snapshot.json
    - old_digest: bbb48196e13d88d509f1c15f8dfeaaaf5daa084d6258cb356d0dd7ea28a47c0d
    - current_digest: bbb48196e13d88d509f1c15f8dfeaaaf5daa084d6258cb356d0dd7ea28a47c0d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290610-R6288F

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Context reindex projection decomposition

Refactor packages/agentplane/src/context/reindex.ts below the 400-line hotspot warning by extracting projection row helpers into focused module(s). Preserve cmdContextReindex behavior, projection metadata, path selection, markdown/jsonl/text row generation, SQLite projection writes, and readContextProjection fallback semantics. Acceptance: context release-readiness tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.

## Scope

- In scope: Refactor packages/agentplane/src/context/reindex.ts below the 400-line hotspot warning by extracting projection row helpers into focused module(s). Preserve cmdContextReindex behavior, projection metadata, path selection, markdown/jsonl/text row generation, SQLite projection writes, and readContextProjection fallback semantics. Acceptance: context release-readiness tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.
- Out of scope: unrelated refactors not required for "Context reindex projection decomposition".

## Plan

1. Extract projection helper types/functions from packages/agentplane/src/context/reindex.ts into a focused projection module. 2. Keep cmdContextReindex and readContextProjection behavior stable; only update imports and exported helper boundaries needed by tests. 3. Run context release-readiness coverage plus typecheck, arch, knip, lint, format, and hotspots checks. 4. Open the branch_pr PR, wait for hosted checks, merge, record evaluator/finish evidence, and cleanup.

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
### 2026-05-29T06:14:58.566Z — VERIFY — ok

By: CODER

Note: Context reindex projection row helpers extracted into packages/agentplane/src/context/reindex-projection.ts; cmdContextReindex and readContextProjection semantics are preserved. Checks passed: bun test packages/agentplane/src/commands/context/release-readiness.test.ts (21 pass); bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check (runtime hotspots 4 -> 3).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T06:10:23.186Z, excerpt_hash=sha256:0f88d27226edb785e64b1c61b9f3cd8c026e132d100276c77c25a3c1964cf958

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290610-R6288F/blueprint/resolved-snapshot.json
- old_digest: bbb48196e13d88d509f1c15f8dfeaaaf5daa084d6258cb356d0dd7ea28a47c0d
- current_digest: bbb48196e13d88d509f1c15f8dfeaaaf5daa084d6258cb356d0dd7ea28a47c0d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290610-R6288F

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
