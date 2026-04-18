---
id: "202604172036-XPCNRE"
title: "Decompose CLI test harness into focused fixture modules"
result_summary: "Merged via PR #425."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "testkit"
  - "tests"
verify:
  - "bun run lint:core"
  - "bun run test:fast"
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T20:56:22.485Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T21:05:14.946Z"
  updated_by: "CODER"
  note: |-
    Command: bun run framework:dev:bootstrap
    Result: pass; repo-local runtime rebuilt for the worktree after moving testing modules.
    
    Command: bun run lint:core
    Result: pass.
    
    Command: bun run typecheck
    Result: pass.
    
    Command: bunx vitest run packages/testkit/src/index.test.ts packages/testkit/src/cli.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts
    Result: pass (5 files, 15 tests).
    
    Command: bun run test:fast
    Result: pass (211 files, 1269 tests, 2 skipped).
    
    Observation: the first full test:fast run exposed a regression in createUpgradeBundle after the module move; the manifest path was corrected in the same task and the failing upgrade tests plus the full suite were re-run successfully.
commit:
  hash: "d89bd16e816363f15562e201a094b876692a7d0f"
  message: "refactor/testkit: Decompose CLI test harness into focused fixture modules (XPCNRE) (#425)"
comments:
  -
    author: "CODER"
    body: "Start: inspect cli-harness boundaries, extract the first cohesive fixture modules, and keep the public harness contract stable for existing tests."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #425 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-17T20:56:34.497Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect cli-harness boundaries, extract the first cohesive fixture modules, and keep the public harness contract stable for existing tests."
  -
    type: "verify"
    at: "2026-04-17T21:04:58.793Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun run framework:dev:bootstrap
      Result: pass; repo-local runtime rebuilt for the worktree after moving testing modules.
      
      Command: bun run lint:core
      Result: pass.
      
      Command: bun run typecheck
      Result: pass.
      
      Command: bunx vitest run packages/testkit/src/index.test.ts packages/testkit/src/cli.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts
      Result: pass (5 files, 15 tests).
      
      Command: bun run test:fast
      Result: pass (211 files, 1269 tests, 2 skipped).
      
      Observation: the first full test:fast run exposed a regression in createUpgradeBundle after the module move; the manifest path was corrected in the same task and the failing upgrade tests plus the full suite were re-run successfully.
  -
    type: "verify"
    at: "2026-04-17T21:05:14.946Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun run framework:dev:bootstrap
      Result: pass; repo-local runtime rebuilt for the worktree after moving testing modules.
      
      Command: bun run lint:core
      Result: pass.
      
      Command: bun run typecheck
      Result: pass.
      
      Command: bunx vitest run packages/testkit/src/index.test.ts packages/testkit/src/cli.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts
      Result: pass (5 files, 15 tests).
      
      Command: bun run test:fast
      Result: pass (211 files, 1269 tests, 2 skipped).
      
      Observation: the first full test:fast run exposed a regression in createUpgradeBundle after the module move; the manifest path was corrected in the same task and the failing upgrade tests plus the full suite were re-run successfully.
  -
    type: "status"
    at: "2026-04-18T04:52:26.209Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #425 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-18T04:52:26.214Z"
doc_updated_by: "INTEGRATOR"
description: "Split the monolithic CLI harness into focused fixture modules for git repo setup, stdio capture, recipe fixtures, and command execution while preserving the @agentplane/testkit facade and existing test behavior."
sections:
  Summary: |-
    Decompose CLI test harness into focused fixture modules
    
    Split the monolithic CLI harness into focused fixture modules for git repo setup, stdio capture, recipe fixtures, and command execution while preserving the @agentplane/testkit facade and existing test behavior.
  Scope: |-
    - In scope: Split the monolithic CLI harness into focused fixture modules for git repo setup, stdio capture, recipe fixtures, and command execution while preserving the @agentplane/testkit facade and existing test behavior.
    - Out of scope: unrelated refactors not required for "Decompose CLI test harness into focused fixture modules".
  Plan: |-
    1. Inspect the current cli-harness surface and map the main responsibility seams: fixture creation, stdio capture, command execution, and assertion helpers.
    2. Extract the lowest-risk seams into dedicated testing modules under packages/agentplane/src/testing/ without changing the public harness contract consumed by existing tests.
    3. Update the harness entrypoint to compose the new modules, keeping imports stable where possible and avoiding a test-only package cycle.
    4. Run focused harness and CLI test suites plus repo checks, then record any remaining oversized harness clusters as follow-up work instead of widening this PR.
  Verify Steps: |-
    1. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:fast`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T21:04:58.793Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run framework:dev:bootstrap
    Result: pass; repo-local runtime rebuilt for the worktree after moving testing modules.
    
    Command: bun run lint:core
    Result: pass.
    
    Command: bun run typecheck
    Result: pass.
    
    Command: bunx vitest run packages/testkit/src/index.test.ts packages/testkit/src/cli.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts
    Result: pass (5 files, 15 tests).
    
    Command: bun run test:fast
    Result: pass (211 files, 1269 tests, 2 skipped).
    
    Observation: the first full test:fast run exposed a regression in createUpgradeBundle after the module move; the manifest path was corrected in the same task and the failing upgrade tests plus the full suite were re-run successfully.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T20:56:34.509Z, excerpt_hash=sha256:6a52fa9919b2a85431f853e5d4ee21d781173a416f24000b5a0bdd62ac62bdd1
    
    ### 2026-04-17T21:05:14.946Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run framework:dev:bootstrap
    Result: pass; repo-local runtime rebuilt for the worktree after moving testing modules.
    
    Command: bun run lint:core
    Result: pass.
    
    Command: bun run typecheck
    Result: pass.
    
    Command: bunx vitest run packages/testkit/src/index.test.ts packages/testkit/src/cli.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts
    Result: pass (5 files, 15 tests).
    
    Command: bun run test:fast
    Result: pass (211 files, 1269 tests, 2 skipped).
    
    Observation: the first full test:fast run exposed a regression in createUpgradeBundle after the module move; the manifest path was corrected in the same task and the failing upgrade tests plus the full suite were re-run successfully.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T21:04:58.797Z, excerpt_hash=sha256:6a52fa9919b2a85431f853e5d4ee21d781173a416f24000b5a0bdd62ac62bdd1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Decompose CLI test harness into focused fixture modules

Split the monolithic CLI harness into focused fixture modules for git repo setup, stdio capture, recipe fixtures, and command execution while preserving the @agentplane/testkit facade and existing test behavior.

## Scope

- In scope: Split the monolithic CLI harness into focused fixture modules for git repo setup, stdio capture, recipe fixtures, and command execution while preserving the @agentplane/testkit facade and existing test behavior.
- Out of scope: unrelated refactors not required for "Decompose CLI test harness into focused fixture modules".

## Plan

1. Inspect the current cli-harness surface and map the main responsibility seams: fixture creation, stdio capture, command execution, and assertion helpers.
2. Extract the lowest-risk seams into dedicated testing modules under packages/agentplane/src/testing/ without changing the public harness contract consumed by existing tests.
3. Update the harness entrypoint to compose the new modules, keeping imports stable where possible and avoiding a test-only package cycle.
4. Run focused harness and CLI test suites plus repo checks, then record any remaining oversized harness clusters as follow-up work instead of widening this PR.

## Verify Steps

1. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:fast`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T21:04:58.793Z — VERIFY — ok

By: CODER

Note: Command: bun run framework:dev:bootstrap
Result: pass; repo-local runtime rebuilt for the worktree after moving testing modules.

Command: bun run lint:core
Result: pass.

Command: bun run typecheck
Result: pass.

Command: bunx vitest run packages/testkit/src/index.test.ts packages/testkit/src/cli.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts
Result: pass (5 files, 15 tests).

Command: bun run test:fast
Result: pass (211 files, 1269 tests, 2 skipped).

Observation: the first full test:fast run exposed a regression in createUpgradeBundle after the module move; the manifest path was corrected in the same task and the failing upgrade tests plus the full suite were re-run successfully.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T20:56:34.509Z, excerpt_hash=sha256:6a52fa9919b2a85431f853e5d4ee21d781173a416f24000b5a0bdd62ac62bdd1

### 2026-04-17T21:05:14.946Z — VERIFY — ok

By: CODER

Note: Command: bun run framework:dev:bootstrap
Result: pass; repo-local runtime rebuilt for the worktree after moving testing modules.

Command: bun run lint:core
Result: pass.

Command: bun run typecheck
Result: pass.

Command: bunx vitest run packages/testkit/src/index.test.ts packages/testkit/src/cli.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts
Result: pass (5 files, 15 tests).

Command: bun run test:fast
Result: pass (211 files, 1269 tests, 2 skipped).

Observation: the first full test:fast run exposed a regression in createUpgradeBundle after the module move; the manifest path was corrected in the same task and the failing upgrade tests plus the full suite were re-run successfully.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T21:04:58.797Z, excerpt_hash=sha256:6a52fa9919b2a85431f853e5d4ee21d781173a416f24000b5a0bdd62ac62bdd1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
