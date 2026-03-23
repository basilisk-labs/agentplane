---
id: "202603231521-2W4JX9"
title: "Restore agentplane source build after runner execution merge"
result_summary: "Restored a green agentplane source build after the shared runner execution merge."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
depends_on: []
tags:
  - "code"
  - "runner"
  - "typescript"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T15:21:45.272Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T15:24:17.450Z"
  updated_by: "CODER"
  note: "Build repair verified. Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/cli-contract.test.ts packages/agentplane/src/cli/exit-code.contract.test.ts. Result: pass. Evidence: 37 tests passed across runner/task/scenario and exit-code coverage. Scope: shared runner adapter, task run, scenario execute, and runtime error-code contract. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Result: pass. Evidence: both packages built successfully from current source. Scope: full source build integrity. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor. Result: pass. Evidence: errors=0 warnings=0, only historical archive info remained. Scope: runtime wiring and repository health after the fix."
commit:
  hash: "872167252c7ef508bd7c8b7477beb9e3ae260d64"
  message: "✅ 2W4JX9 code: done"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the current source build failure, apply the smallest type-safe fixes in runner/task/scenario execution paths, and restore a green agentplane build without changing behavior."
  -
    author: "CODER"
    body: "Verified: restore the source build by aligning runner artifact typing, output path narrowing, and the CLI runtime error-code contract used by task run and scenario execute."
events:
  -
    type: "status"
    at: "2026-03-23T15:21:50.473Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the current source build failure, apply the smallest type-safe fixes in runner/task/scenario execution paths, and restore a green agentplane build without changing behavior."
  -
    type: "verify"
    at: "2026-03-23T15:24:17.450Z"
    author: "CODER"
    state: "ok"
    note: "Build repair verified. Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/cli-contract.test.ts packages/agentplane/src/cli/exit-code.contract.test.ts. Result: pass. Evidence: 37 tests passed across runner/task/scenario and exit-code coverage. Scope: shared runner adapter, task run, scenario execute, and runtime error-code contract. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Result: pass. Evidence: both packages built successfully from current source. Scope: full source build integrity. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor. Result: pass. Evidence: errors=0 warnings=0, only historical archive info remained. Scope: runtime wiring and repository health after the fix."
  -
    type: "status"
    at: "2026-03-23T15:24:26.453Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: restore the source build by aligning runner artifact typing, output path narrowing, and the CLI runtime error-code contract used by task run and scenario execute."
doc_version: 3
doc_updated_at: "2026-03-23T15:24:30.593Z"
doc_updated_by: "CODER"
description: "Fix the confirmed TypeScript build errors introduced around task run, scenario execute, and shared runner artifacts so bun run --filter=agentplane build succeeds again without changing shipped behavior."
sections:
  Summary: |-
    Restore agentplane source build after runner execution merge
    
    Fix the confirmed TypeScript build errors introduced around task run, scenario execute, and shared runner artifacts so bun run --filter=agentplane build succeeds again without changing shipped behavior.
  Scope: |-
    - In scope: Fix the confirmed TypeScript build errors introduced around task run, scenario execute, and shared runner artifacts so bun run --filter=agentplane build succeeds again without changing shipped behavior.
    - Out of scope: unrelated refactors not required for "Restore agentplane source build after runner execution merge".
  Plan: |-
    1. Reproduce the current build failure and inspect the typed call sites in task run, scenario execute, Codex adapter, and task-run artifact assembly.
    2. Apply the smallest type-safe fixes that preserve the current runner/scenario behavior and keep the shared bundle contract unchanged.
    3. Re-run the targeted tests plus bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build, then record verification and close the task in one commit.
  Verify Steps: |-
    1. Run targeted runner CLI regressions: `bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts`. Expected: all touched runner/task/scenario flows pass with no new failures.
    2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages build successfully from current source.
    3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: no errors and no new warnings related to this scope.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T15:24:17.450Z — VERIFY — ok
    
    By: CODER
    
    Note: Build repair verified. Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/cli-contract.test.ts packages/agentplane/src/cli/exit-code.contract.test.ts. Result: pass. Evidence: 37 tests passed across runner/task/scenario and exit-code coverage. Scope: shared runner adapter, task run, scenario execute, and runtime error-code contract. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Result: pass. Evidence: both packages built successfully from current source. Scope: full source build integrity. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor. Result: pass. Evidence: errors=0 warnings=0, only historical archive info remained. Scope: runtime wiring and repository health after the fix.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T15:21:50.474Z, excerpt_hash=sha256:4df7b9e080de39c3ffa8b07ea46f683c5d63fcfd89ce98251a38228b59020b0e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Restore agentplane source build after runner execution merge

Fix the confirmed TypeScript build errors introduced around task run, scenario execute, and shared runner artifacts so bun run --filter=agentplane build succeeds again without changing shipped behavior.

## Scope

- In scope: Fix the confirmed TypeScript build errors introduced around task run, scenario execute, and shared runner artifacts so bun run --filter=agentplane build succeeds again without changing shipped behavior.
- Out of scope: unrelated refactors not required for "Restore agentplane source build after runner execution merge".

## Plan

1. Reproduce the current build failure and inspect the typed call sites in task run, scenario execute, Codex adapter, and task-run artifact assembly.
2. Apply the smallest type-safe fixes that preserve the current runner/scenario behavior and keep the shared bundle contract unchanged.
3. Re-run the targeted tests plus bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build, then record verification and close the task in one commit.

## Verify Steps

1. Run targeted runner CLI regressions: `bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts`. Expected: all touched runner/task/scenario flows pass with no new failures.
2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages build successfully from current source.
3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: no errors and no new warnings related to this scope.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T15:24:17.450Z — VERIFY — ok

By: CODER

Note: Build repair verified. Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/cli-contract.test.ts packages/agentplane/src/cli/exit-code.contract.test.ts. Result: pass. Evidence: 37 tests passed across runner/task/scenario and exit-code coverage. Scope: shared runner adapter, task run, scenario execute, and runtime error-code contract. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Result: pass. Evidence: both packages built successfully from current source. Scope: full source build integrity. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor. Result: pass. Evidence: errors=0 warnings=0, only historical archive info remained. Scope: runtime wiring and repository health after the fix.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T15:21:50.474Z, excerpt_hash=sha256:4df7b9e080de39c3ffa8b07ea46f683c5d63fcfd89ce98251a38228b59020b0e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
