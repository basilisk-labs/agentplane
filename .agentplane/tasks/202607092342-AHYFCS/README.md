---
id: "202607092342-AHYFCS"
title: "Enforce cross-surface context integrity for v0.6.22"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "patch-0.6.22"
  - "quality"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/context/check.unit.test.ts packages/agentplane/src/commands/context/wiki-reports.unit.test.ts packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T23:43:16.688Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement global cross-surface context integrity checks and regression coverage for v0.6.22."
events:
  -
    type: "status"
    at: "2026-07-09T23:43:35.553Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement global cross-surface context integrity checks and regression coverage for v0.6.22."
doc_version: 3
doc_updated_at: "2026-07-09T23:43:35.553Z"
doc_updated_by: "CODER"
description: "Make global context checks validate wiki graph references, entity page policy, manifest/source coverage, and freshness of derived wiki reports so structurally valid but semantically disconnected context cannot pass."
sections:
  Summary: |-
    Enforce cross-surface context integrity for v0.6.22

    Make global context checks validate wiki graph references, entity page policy, manifest/source coverage, and freshness of derived wiki reports so structurally valid but semantically disconnected context cannot pass.
  Scope: |-
    - In scope: global read-only integrity validation across wiki, graph, manifest/raw source inventory, and derived link/orphan reports.
    - In scope: actionable diagnostics and regression tests.
    - Out of scope: rewriting existing repository wiki content, changing public context schemas, or implementing semantic search ranking.
  Plan: |-
    1. Add one reusable global integrity validator for wiki graph references, active entity page policy, manifest/raw source coverage, and freshness markers for link/orphan reports.
    2. Wire the validator into context check and doctor without weakening task-scoped maximum-assimilation verification.
    3. Add fixtures covering missing graph entities, stale reports, and untracked raw sources, while preserving valid legacy/minimal workspaces.
    4. Run focused tests, typecheck, and ci:contract.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/commands/context/check.unit.test.ts packages/agentplane/src/commands/context/wiki-reports.unit.test.ts packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts; broken graph refs, stale reports, and untracked raw source fixtures fail while valid fixtures pass.
    2. Run bun run typecheck; it passes.
    3. Run bun run ci:contract; it passes.
    4. Run git diff --check; it passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task commits.
    - Re-run the focused context checks and ci:contract to confirm the previous validation behavior is restored.
  Findings: ""
id_source: "generated"
---
## Summary

Enforce cross-surface context integrity for v0.6.22

Make global context checks validate wiki graph references, entity page policy, manifest/source coverage, and freshness of derived wiki reports so structurally valid but semantically disconnected context cannot pass.

## Scope

- In scope: global read-only integrity validation across wiki, graph, manifest/raw source inventory, and derived link/orphan reports.
- In scope: actionable diagnostics and regression tests.
- Out of scope: rewriting existing repository wiki content, changing public context schemas, or implementing semantic search ranking.

## Plan

1. Add one reusable global integrity validator for wiki graph references, active entity page policy, manifest/raw source coverage, and freshness markers for link/orphan reports.
2. Wire the validator into context check and doctor without weakening task-scoped maximum-assimilation verification.
3. Add fixtures covering missing graph entities, stale reports, and untracked raw sources, while preserving valid legacy/minimal workspaces.
4. Run focused tests, typecheck, and ci:contract.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/commands/context/check.unit.test.ts packages/agentplane/src/commands/context/wiki-reports.unit.test.ts packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts; broken graph refs, stale reports, and untracked raw source fixtures fail while valid fixtures pass.
2. Run bun run typecheck; it passes.
3. Run bun run ci:contract; it passes.
4. Run git diff --check; it passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task commits.
- Re-run the focused context checks and ci:contract to confirm the previous validation behavior is restored.

## Findings
