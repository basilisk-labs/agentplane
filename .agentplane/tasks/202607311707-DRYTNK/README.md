---
id: "202607311707-DRYTNK"
title: "Adopt TypeScript 7 for typechecking with TypeScript 6 API compatibility"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
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
  state: "ok"
  updated_at: "2026-07-31T21:46:15.293Z"
  updated_by: "TESTER"
  note: "Local migration verification passed: TS7/TS6 probes, root/workspace typechecks, rollback, build, critical tests, isolated concurrency tests, lint, architecture, Knip, package install, and docs build. Hosted full unit and Windows remain required before integration."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-31T21:47:17.724Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "9e2fb9caac3cfa5561a074c2ca846c38a90e61d6"
  blueprint_digest: "1e52f772c7855fef3c6ae0acefd3152bb235fe4c84fc78f15a4b77e4c88100cc"
  evidence_refs:
    - ".agentplane/tasks/202607311707-DRYTNK/quality/20260731-214717522-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607311707-DRYTNK/quality/20260731-214717522-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607311707-DRYTNK/quality/20260731-214717522-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607311707-DRYTNK/quality/20260731-214717522-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607311707-DRYTNK/quality/20260731-214717522-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607311707-DRYTNK/README.md"
    - ".agentplane/tasks/202607311707-DRYTNK/quality/20260731-214717522-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607311707-DRYTNK/quality/20260731-214717522-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607311707-DRYTNK/quality/20260731-214717522-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The native compiler is confined to canonical typecheck entrypoints; runtime packages and compiler-API consumers remain on TypeScript 6.0.3."
commit:
  hash: "9e2fb9caac3cfa5561a074c2ca846c38a90e61d6"
  message: "🧪 DRYTNK task: preserve RF-04 anchor isolation"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: TypeScript 7 typecheck path, TypeScript 6 API compatibility, rollback, Docusaurus bridge, and RF-04 anchor isolation."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-31T20:59:44.608Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-31T21:24:33.453Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: TypeScript 7 typecheck path, TypeScript 6 API compatibility, rollback, Docusaurus bridge, and RF-04 anchor isolation."
  -
    type: "verify"
    at: "2026-07-31T21:46:15.293Z"
    author: "TESTER"
    state: "ok"
    note: "Local migration verification passed: TS7/TS6 probes, root/workspace typechecks, rollback, build, critical tests, isolated concurrency tests, lint, architecture, Knip, package install, and docs build. Hosted full unit and Windows remain required before integration."
  -
    type: "status"
    at: "2026-07-31T21:48:18.547Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-31T21:48:18.548Z"
doc_updated_by: "CODER"
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
    ### 2026-07-31T21:46:15.293Z — VERIFY — ok

    By: TESTER

    Note: Local migration verification passed: TS7/TS6 probes, root/workspace typechecks, rollback, build, critical tests, isolated concurrency tests, lint, architecture, Knip, package install, and docs build. Hosted full unit and Windows remain required before integration.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T21:24:33.453Z, excerpt_hash=sha256:5a20a91b25029c8acc169ce6a343a01002be798f90a72af3e510cb3a003c169b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311707-DRYTNK-adopt-typescript-7-for-typechecking-with-typescr/.agentplane/tasks/202607311707-DRYTNK/blueprint/resolved-snapshot.json
    - old_digest: 1e52f772c7855fef3c6ae0acefd3152bb235fe4c84fc78f15a4b77e4c88100cc
    - current_digest: 1e52f772c7855fef3c6ae0acefd3152bb235fe4c84fc78f15a4b77e4c88100cc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311707-DRYTNK

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607311707-DRYTNK
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    1. Run AGENTPLANE_TYPESCRIPT_PACKAGE=typescript bun run typecheck to restore the pinned TypeScript 6 compiler immediately without changing the lockfile.
    2. If the hosted migration itself must be removed, revert the single DRYTNK merge through a protected-base PR and rerun the root typecheck, package build, lint, trust, compatibility, installed-package, and Windows checks.
  Findings: |-
    - Observation: QB60J5 approved TypeScript 7.0.2 only as @typescript/native alongside pinned TypeScript 6.0.3; root baseUrl and the inherited Docusaurus 3.10.1 baseUrl are incompatible, and declaration emit has reviewed order-only drift.
      Impact: DRYTNK must include the config bridge, deterministic emit classification, hosted platform resolution, and a runtime-selectable compiler rollback instead of a wholesale package replacement.
      Resolution: Implement benchmark/typescript-7-adoption-contract.md exactly, including AGENTPLANE_TYPESCRIPT_PACKAGE=typescript as the rollback override and default automatic builder concurrency.

    - Observation: The parallel local test:fast run produced common 30-second wall-clock timeouts under machine oversubscription.
      Impact: Parallel timeout output was not a reliable functional regression signal.
      Resolution: Reran every affected file sequentially: 7/7 files and 80/80 tests passed; keep hosted verify-unit and Windows as mandatory gates.
extensions:
  workflow_route_baseline:
    start_head_sha: "ae4f903e99126484dcbe54ae3ec152dd20ba667b"
    version: 1
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
### 2026-07-31T21:46:15.293Z — VERIFY — ok

By: TESTER

Note: Local migration verification passed: TS7/TS6 probes, root/workspace typechecks, rollback, build, critical tests, isolated concurrency tests, lint, architecture, Knip, package install, and docs build. Hosted full unit and Windows remain required before integration.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T21:24:33.453Z, excerpt_hash=sha256:5a20a91b25029c8acc169ce6a343a01002be798f90a72af3e510cb3a003c169b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311707-DRYTNK-adopt-typescript-7-for-typechecking-with-typescr/.agentplane/tasks/202607311707-DRYTNK/blueprint/resolved-snapshot.json
- old_digest: 1e52f772c7855fef3c6ae0acefd3152bb235fe4c84fc78f15a4b77e4c88100cc
- current_digest: 1e52f772c7855fef3c6ae0acefd3152bb235fe4c84fc78f15a4b77e4c88100cc
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311707-DRYTNK

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607311707-DRYTNK
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Run AGENTPLANE_TYPESCRIPT_PACKAGE=typescript bun run typecheck to restore the pinned TypeScript 6 compiler immediately without changing the lockfile.
2. If the hosted migration itself must be removed, revert the single DRYTNK merge through a protected-base PR and rerun the root typecheck, package build, lint, trust, compatibility, installed-package, and Windows checks.

## Findings

- Observation: QB60J5 approved TypeScript 7.0.2 only as @typescript/native alongside pinned TypeScript 6.0.3; root baseUrl and the inherited Docusaurus 3.10.1 baseUrl are incompatible, and declaration emit has reviewed order-only drift.
  Impact: DRYTNK must include the config bridge, deterministic emit classification, hosted platform resolution, and a runtime-selectable compiler rollback instead of a wholesale package replacement.
  Resolution: Implement benchmark/typescript-7-adoption-contract.md exactly, including AGENTPLANE_TYPESCRIPT_PACKAGE=typescript as the rollback override and default automatic builder concurrency.

- Observation: The parallel local test:fast run produced common 30-second wall-clock timeouts under machine oversubscription.
  Impact: Parallel timeout output was not a reliable functional regression signal.
  Resolution: Reran every affected file sequentially: 7/7 files and 80/80 tests passed; keep hosted verify-unit and Windows as mandatory gates.
