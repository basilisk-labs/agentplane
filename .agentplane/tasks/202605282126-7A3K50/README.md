---
id: "202605282126-7A3K50"
title: "PR integrate merge strategy decomposition"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hotspot"
  - "integrate"
  - "refactor"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bun run format:changed"
  - "bun run lint:core"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts --config vitest.workspace.ts"
  - "node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300"
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T21:26:28.092Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T21:30:26.507Z"
  updated_by: "CODER"
  note: "PR integrate merge strategy decomposition verified locally."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose PR integrate merge strategy helpers while preserving merge lane behavior and failure handling."
events:
  -
    type: "status"
    at: "2026-05-28T21:26:47.067Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose PR integrate merge strategy helpers while preserving merge lane behavior and failure handling."
  -
    type: "verify"
    at: "2026-05-28T21:30:26.507Z"
    author: "CODER"
    state: "ok"
    note: "PR integrate merge strategy decomposition verified locally."
doc_version: 3
doc_updated_at: "2026-05-28T21:30:26.534Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/pr/integrate/internal/merge.ts into focused merge strategy helper modules without changing squash merge, merge commit, rebase fast-forward, task artifact collision handling, integration mutation lock behavior, or verify execution semantics. Reduce the merge strategy file below the hotspot warning threshold when safe."
sections:
  Summary: |-
    PR integrate merge strategy decomposition

    Decompose packages/agentplane/src/commands/pr/integrate/internal/merge.ts into focused merge strategy helper modules without changing squash merge, merge commit, rebase fast-forward, task artifact collision handling, integration mutation lock behavior, or verify execution semantics. Reduce the merge strategy file below the hotspot warning threshold when safe.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/pr/integrate/internal/merge.ts into focused merge strategy helper modules without changing squash merge, merge commit, rebase fast-forward, task artifact collision handling, integration mutation lock behavior, or verify execution semantics. Reduce the merge strategy file below the hotspot warning threshold when safe.
    - Out of scope: unrelated refactors not required for "PR integrate merge strategy decomposition".
  Plan: |-
    1. Inspect pr/integrate/internal/merge.ts, merge strategy tests, and integrate command tests to identify extraction boundaries that preserve existing GitHub/local merge semantics.
    2. Extract task artifact collision helpers and integration mutation wrapper/classification into focused internal modules.
    3. Extract squash/merge/rebase strategy helpers only where behavior-preserving; keep public runSquashMerge, runMergeCommit, and runRebaseFastForward contracts stable.
    4. Run focused PR integrate merge/failure/strategy tests, typecheck, lint:core, format:changed, and hotspot-report check.
    5. Publish PR artifacts, record verification/evaluator evidence, wait for hosted checks including Windows, then merge through the GitHub branch_pr route.
  Verify Steps: |-
    1. Run focused merge behavior tests: bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts --config vitest.workspace.ts. Expected: all selected tests pass and cover GitHub PR merge handoff, merge strategies, and failure recovery behavior.
    2. Run bun run typecheck. Expected: TypeScript project build passes without new type errors.
    3. Run bun run lint:core. Expected: ESLint passes for core source.
    4. Run bun run format:changed. Expected: changed files are formatted.
    5. Run node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300. Expected: no oversized runtime/test errors; merge.ts is reduced below 400 lines if extraction remains behavior-preserving, otherwise any residual warning is recorded with rationale.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T21:30:26.507Z — VERIFY — ok

    By: CODER

    Note: PR integrate merge strategy decomposition verified locally.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T21:26:47.067Z, excerpt_hash=sha256:01be2817bdcaf6e0d477444d35a1304ab9617e6b793f6a0c8a0ae2aea50299c3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282126-7A3K50-pr-integrate-merge-strategy-decomposition/.agentplane/tasks/202605282126-7A3K50/blueprint/resolved-snapshot.json
    - old_digest: d92238d9feb19103cdd5fee4a1f958f4f5d9c44f86b26991503c1b938e0a7c38
    - current_digest: d92238d9feb19103cdd5fee4a1f958f4f5d9c44f86b26991503c1b938e0a7c38
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605282126-7A3K50

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts --config vitest.workspace.ts; Result: pass; Evidence: 5 files, 44 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bun run lint:core; Result: pass; Evidence: ESLint completed. Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier. Command: node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; Result: pass; Evidence: runtime hotspot warnings reduced 44 to 43 and merge.ts is 324 lines.
      Impact: merge.ts now keeps public merge strategy functions while git mutation diagnostics and task artifact collision handling live in focused internal modules.
      Resolution: Proceed to PR, evaluator review, and hosted checks.
id_source: "generated"
---
## Summary

PR integrate merge strategy decomposition

Decompose packages/agentplane/src/commands/pr/integrate/internal/merge.ts into focused merge strategy helper modules without changing squash merge, merge commit, rebase fast-forward, task artifact collision handling, integration mutation lock behavior, or verify execution semantics. Reduce the merge strategy file below the hotspot warning threshold when safe.

## Scope

- In scope: Decompose packages/agentplane/src/commands/pr/integrate/internal/merge.ts into focused merge strategy helper modules without changing squash merge, merge commit, rebase fast-forward, task artifact collision handling, integration mutation lock behavior, or verify execution semantics. Reduce the merge strategy file below the hotspot warning threshold when safe.
- Out of scope: unrelated refactors not required for "PR integrate merge strategy decomposition".

## Plan

1. Inspect pr/integrate/internal/merge.ts, merge strategy tests, and integrate command tests to identify extraction boundaries that preserve existing GitHub/local merge semantics.
2. Extract task artifact collision helpers and integration mutation wrapper/classification into focused internal modules.
3. Extract squash/merge/rebase strategy helpers only where behavior-preserving; keep public runSquashMerge, runMergeCommit, and runRebaseFastForward contracts stable.
4. Run focused PR integrate merge/failure/strategy tests, typecheck, lint:core, format:changed, and hotspot-report check.
5. Publish PR artifacts, record verification/evaluator evidence, wait for hosted checks including Windows, then merge through the GitHub branch_pr route.

## Verify Steps

1. Run focused merge behavior tests: bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts --config vitest.workspace.ts. Expected: all selected tests pass and cover GitHub PR merge handoff, merge strategies, and failure recovery behavior.
2. Run bun run typecheck. Expected: TypeScript project build passes without new type errors.
3. Run bun run lint:core. Expected: ESLint passes for core source.
4. Run bun run format:changed. Expected: changed files are formatted.
5. Run node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300. Expected: no oversized runtime/test errors; merge.ts is reduced below 400 lines if extraction remains behavior-preserving, otherwise any residual warning is recorded with rationale.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T21:30:26.507Z — VERIFY — ok

By: CODER

Note: PR integrate merge strategy decomposition verified locally.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T21:26:47.067Z, excerpt_hash=sha256:01be2817bdcaf6e0d477444d35a1304ab9617e6b793f6a0c8a0ae2aea50299c3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282126-7A3K50-pr-integrate-merge-strategy-decomposition/.agentplane/tasks/202605282126-7A3K50/blueprint/resolved-snapshot.json
- old_digest: d92238d9feb19103cdd5fee4a1f958f4f5d9c44f86b26991503c1b938e0a7c38
- current_digest: d92238d9feb19103cdd5fee4a1f958f4f5d9c44f86b26991503c1b938e0a7c38
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605282126-7A3K50

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts --config vitest.workspace.ts; Result: pass; Evidence: 5 files, 44 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bun run lint:core; Result: pass; Evidence: ESLint completed. Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier. Command: node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300; Result: pass; Evidence: runtime hotspot warnings reduced 44 to 43 and merge.ts is 324 lines.
  Impact: merge.ts now keeps public merge strategy functions while git mutation diagnostics and task artifact collision handling live in focused internal modules.
  Resolution: Proceed to PR, evaluator review, and hosted checks.
