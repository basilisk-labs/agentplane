---
id: "202607311707-DRYTNK"
title: "Adopt TypeScript 7 for typechecking with TypeScript 6 API compatibility"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202607311706-QB60J5"
tags:
  - "code"
  - "migration"
  - "milestone-rc2"
  - "performance"
  - "toolchain"
  - "typescript7"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Root typecheck, package builds, lint, critical/unit tests, declaration/manifest checks, and Windows CI pass with deterministic checker/builder limits."
  - "The benchmark-approved TypeScript 7 binary is the canonical root and package typecheck path, with exact versions and aliases frozen in package.json and bun.lock."
  - "The task records before/after timing evidence and proves the documented one-command rollback restores the TypeScript 6 compiler path."
  - "typescript-eslint and every repository script importing typescript continue to use the pinned TypeScript 6 compatibility API; trust-boundary and compatibility gates pass unchanged."
plan_approval:
  state: "approved"
  updated_at: "2026-07-31T17:07:48.886Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after the benchmark gate; implementation must retain TypeScript 6 API compatibility."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-31T17:07:48.535Z"
doc_updated_by: "PLANNER"
description: "Implement the benchmark-approved TypeScript 7 compiler path for AgentPlane 0.7 while retaining a pinned TypeScript 6 compatibility package for typescript-eslint and repository scripts that consume the compiler API. Keep package installation deterministic across Bun, Node, and Windows; bound compiler parallelism for CI; preserve an immediate rollback path."
sections:
  Summary: |-
    Adopt TypeScript 7 for typechecking with TypeScript 6 API compatibility

    Implement the benchmark-approved TypeScript 7 compiler path for AgentPlane 0.7 while retaining a pinned TypeScript 6 compatibility package for typescript-eslint and repository scripts that consume the compiler API. Keep package installation deterministic across Bun, Node, and Windows; bound compiler parallelism for CI; preserve an immediate rollback path.
  Scope: |-
    - In scope: Implement the benchmark-approved TypeScript 7 compiler path for AgentPlane 0.7 while retaining a pinned TypeScript 6 compatibility package for typescript-eslint and repository scripts that consume the compiler API. Keep package installation deterministic across Bun, Node, and Windows; bound compiler parallelism for CI; preserve an immediate rollback path.
    - Out of scope: unrelated refactors not required for "Adopt TypeScript 7 for typechecking with TypeScript 6 API compatibility".
  Plan: |-
    1. Consume the approved package/version/concurrency contract from the TypeScript 7 benchmark task.
    2. Wire TypeScript 7 only into compiler/typecheck entrypoints while preserving TypeScript 6 API consumers.
    3. Update lockfile and CI deterministically across supported platforms.
    4. Run the focused compatibility matrix, then the full release-relevant gates.
    5. Record performance delta, rollback proof, residual risks, and installed-package evidence.
  Verify Steps: |-
    1. Apply only the package aliases, scripts, tsconfig adjustments, and CI concurrency settings frozen by 202607311706-QB60J5. The canonical root and package typecheck commands must invoke the pinned TypeScript 7 binary.
    2. Keep typescript-eslint and every scripts/** compiler-API consumer on the pinned TypeScript 6 compatibility package. ESLint, trust-boundary gates, compatibility baseline, schema/declaration emit, and package builds must pass without weakening checks.
    3. Run bun install --frozen-lockfile, root typecheck, package builds, lint, critical CLI tests, unit tests, format, routing, release parity, and the Windows CI matrix. All must pass with deterministic checker/builder limits appropriate to hosted runners.
    4. Record before/after benchmark evidence from 202607311706-QB60J5 and verify the documented rollback command restores the TypeScript 6 typecheck path without lockfile or generated-artifact drift.
    5. Confirm installed-package behavior and Node 20/24 support remain unchanged; no TypeScript 7 compiler API dependency may leak into runtime packages.
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

Adopt TypeScript 7 for typechecking with TypeScript 6 API compatibility

Implement the benchmark-approved TypeScript 7 compiler path for AgentPlane 0.7 while retaining a pinned TypeScript 6 compatibility package for typescript-eslint and repository scripts that consume the compiler API. Keep package installation deterministic across Bun, Node, and Windows; bound compiler parallelism for CI; preserve an immediate rollback path.

## Scope

- In scope: Implement the benchmark-approved TypeScript 7 compiler path for AgentPlane 0.7 while retaining a pinned TypeScript 6 compatibility package for typescript-eslint and repository scripts that consume the compiler API. Keep package installation deterministic across Bun, Node, and Windows; bound compiler parallelism for CI; preserve an immediate rollback path.
- Out of scope: unrelated refactors not required for "Adopt TypeScript 7 for typechecking with TypeScript 6 API compatibility".

## Plan

1. Consume the approved package/version/concurrency contract from the TypeScript 7 benchmark task.
2. Wire TypeScript 7 only into compiler/typecheck entrypoints while preserving TypeScript 6 API consumers.
3. Update lockfile and CI deterministically across supported platforms.
4. Run the focused compatibility matrix, then the full release-relevant gates.
5. Record performance delta, rollback proof, residual risks, and installed-package evidence.

## Verify Steps

1. Apply only the package aliases, scripts, tsconfig adjustments, and CI concurrency settings frozen by 202607311706-QB60J5. The canonical root and package typecheck commands must invoke the pinned TypeScript 7 binary.
2. Keep typescript-eslint and every scripts/** compiler-API consumer on the pinned TypeScript 6 compatibility package. ESLint, trust-boundary gates, compatibility baseline, schema/declaration emit, and package builds must pass without weakening checks.
3. Run bun install --frozen-lockfile, root typecheck, package builds, lint, critical CLI tests, unit tests, format, routing, release parity, and the Windows CI matrix. All must pass with deterministic checker/builder limits appropriate to hosted runners.
4. Record before/after benchmark evidence from 202607311706-QB60J5 and verify the documented rollback command restores the TypeScript 6 typecheck path without lockfile or generated-artifact drift.
5. Confirm installed-package behavior and Node 20/24 support remain unchanged; no TypeScript 7 compiler API dependency may leak into runtime packages.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
