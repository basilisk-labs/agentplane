---
id: "202604261637-7VVX7E"
title: "Prune runner adapter re-exports"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "knip"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-26T16:37:36.654Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T16:38:52.143Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/runner/config.test.ts
    Result: pass
    Evidence: 4 files, 33 tests passed.
    Scope: runner adapter factory, codex/custom adapter behavior, and lifecycle consumers.
    
    Command: bun run typecheck
    Result: pass
    Evidence: tsc -b exited 0.
    Scope: repository TypeScript after pruning adapter index exports.
    
    Command: bun run lint:core
    Result: pass
    Evidence: eslint exited 0.
    Scope: packages, scripts, and root lint config.
    
    Command: node scripts/check-knip-baseline.mjs
    Result: pass
    Evidence: baseline OK total=423/423.
    Scope: unused-code baseline after removing runner adapter re-exports.
    
    Command: bun run format:check
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: repository formatting.
    
    Command: git diff --check
    Result: pass
    Evidence: no whitespace errors.
    Scope: changed diff.
    
    Command: bun run framework:dev:bootstrap
    Result: pass
    Evidence: Framework dev runtime is ready.
    Scope: repo-local CLI/runtime after runner source change.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Prune unused runner adapter re-exports from the adapters index while keeping createRunnerAdapter behavior intact, then refresh Knip and run runner-focused verification."
events:
  -
    type: "status"
    at: "2026-04-26T16:37:40.429Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Prune unused runner adapter re-exports from the adapters index while keeping createRunnerAdapter behavior intact, then refresh Knip and run runner-focused verification."
  -
    type: "verify"
    at: "2026-04-26T16:38:52.143Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/runner/config.test.ts
      Result: pass
      Evidence: 4 files, 33 tests passed.
      Scope: runner adapter factory, codex/custom adapter behavior, and lifecycle consumers.
      
      Command: bun run typecheck
      Result: pass
      Evidence: tsc -b exited 0.
      Scope: repository TypeScript after pruning adapter index exports.
      
      Command: bun run lint:core
      Result: pass
      Evidence: eslint exited 0.
      Scope: packages, scripts, and root lint config.
      
      Command: node scripts/check-knip-baseline.mjs
      Result: pass
      Evidence: baseline OK total=423/423.
      Scope: unused-code baseline after removing runner adapter re-exports.
      
      Command: bun run format:check
      Result: pass
      Evidence: All matched files use Prettier code style.
      Scope: repository formatting.
      
      Command: git diff --check
      Result: pass
      Evidence: no whitespace errors.
      Scope: changed diff.
      
      Command: bun run framework:dev:bootstrap
      Result: pass
      Evidence: Framework dev runtime is ready.
      Scope: repo-local CLI/runtime after runner source change.
doc_version: 3
doc_updated_at: "2026-04-26T16:38:52.146Z"
doc_updated_by: "CODER"
description: "Remove unused class/helper/type re-exports from runner/adapters/index.ts while keeping createRunnerAdapter as the internal factory, then refresh the Knip baseline."
sections:
  Summary: |-
    Prune runner adapter re-exports
    
    Remove unused class/helper/type re-exports from runner/adapters/index.ts while keeping createRunnerAdapter as the internal factory, then refresh the Knip baseline.
  Scope: |-
    - In scope: Remove unused class/helper/type re-exports from runner/adapters/index.ts while keeping createRunnerAdapter as the internal factory, then refresh the Knip baseline.
    - Out of scope: unrelated refactors not required for "Prune runner adapter re-exports".
  Plan: |-
    1. Remove unused re-exports from packages/agentplane/src/runner/adapters/index.ts while preserving createRunnerAdapter.
    2. Refresh scripts/baselines/knip-baseline.json and confirm the total decreases.
    3. Run focused runner adapter tests plus typecheck, lint, Knip check, format, diff check, framework bootstrap, and task verification.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T16:38:52.143Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/runner/config.test.ts
    Result: pass
    Evidence: 4 files, 33 tests passed.
    Scope: runner adapter factory, codex/custom adapter behavior, and lifecycle consumers.
    
    Command: bun run typecheck
    Result: pass
    Evidence: tsc -b exited 0.
    Scope: repository TypeScript after pruning adapter index exports.
    
    Command: bun run lint:core
    Result: pass
    Evidence: eslint exited 0.
    Scope: packages, scripts, and root lint config.
    
    Command: node scripts/check-knip-baseline.mjs
    Result: pass
    Evidence: baseline OK total=423/423.
    Scope: unused-code baseline after removing runner adapter re-exports.
    
    Command: bun run format:check
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: repository formatting.
    
    Command: git diff --check
    Result: pass
    Evidence: no whitespace errors.
    Scope: changed diff.
    
    Command: bun run framework:dev:bootstrap
    Result: pass
    Evidence: Framework dev runtime is ready.
    Scope: repo-local CLI/runtime after runner source change.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T16:37:40.435Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prune runner adapter re-exports

Remove unused class/helper/type re-exports from runner/adapters/index.ts while keeping createRunnerAdapter as the internal factory, then refresh the Knip baseline.

## Scope

- In scope: Remove unused class/helper/type re-exports from runner/adapters/index.ts while keeping createRunnerAdapter as the internal factory, then refresh the Knip baseline.
- Out of scope: unrelated refactors not required for "Prune runner adapter re-exports".

## Plan

1. Remove unused re-exports from packages/agentplane/src/runner/adapters/index.ts while preserving createRunnerAdapter.
2. Refresh scripts/baselines/knip-baseline.json and confirm the total decreases.
3. Run focused runner adapter tests plus typecheck, lint, Knip check, format, diff check, framework bootstrap, and task verification.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T16:38:52.143Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/runner/config.test.ts
Result: pass
Evidence: 4 files, 33 tests passed.
Scope: runner adapter factory, codex/custom adapter behavior, and lifecycle consumers.

Command: bun run typecheck
Result: pass
Evidence: tsc -b exited 0.
Scope: repository TypeScript after pruning adapter index exports.

Command: bun run lint:core
Result: pass
Evidence: eslint exited 0.
Scope: packages, scripts, and root lint config.

Command: node scripts/check-knip-baseline.mjs
Result: pass
Evidence: baseline OK total=423/423.
Scope: unused-code baseline after removing runner adapter re-exports.

Command: bun run format:check
Result: pass
Evidence: All matched files use Prettier code style.
Scope: repository formatting.

Command: git diff --check
Result: pass
Evidence: no whitespace errors.
Scope: changed diff.

Command: bun run framework:dev:bootstrap
Result: pass
Evidence: Framework dev runtime is ready.
Scope: repo-local CLI/runtime after runner source change.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T16:37:40.435Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
