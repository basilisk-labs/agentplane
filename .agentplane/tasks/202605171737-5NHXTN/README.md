---
id: "202605171737-5NHXTN"
title: "Fix issue #3843 branch_pr base start-ready recovery"
result_summary: "Merged via PR #3850."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T17:37:15.533Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T17:54:39.890Z"
  updated_by: "CODER"
  note: "Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts --runInBand; Result: pass; Evidence: 17 tests passed across branch_pr work start/start-ready routing suites, including base checkout recovery regression. Scope: work start/task start-ready route behavior. Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts --runInBand; Result: pass; Evidence: 1 focused regression test passed. Scope: issue #3843 route. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts; Result: pass; Evidence: 2 files, 9 tests passed. Scope: existing task start/finish lifecycle unit coverage. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: repo TypeScript project references. Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier style. Scope: touched files. Command: bun run hotspots:check; Result: pass; Evidence: hotspot threshold check passed after moving regression out of oversized pr-flow suite. Scope: CI hotspot gate. Command: bun run lint:core -- packages/agentplane/src/commands/task/start-ready.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts; Result: pass; Evidence: eslint exited 0. Scope: repo core lint. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing."
  attempts: 0
commit:
  hash: "b2db42c1f5e3d3d97102e533b14076b1505fbd63"
  message: "Merge pull request #3850 from basilisk-labs/task/202605171737-5NHXTN/fix-3843-base-start-ready"
comments:
  -
    author: "CODER"
    body: "Start: fix branch_pr base checkout start-ready handling for GitHub issue #3843 with a regression test and route-specific behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3850 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-17T17:37:29.073Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix branch_pr base checkout start-ready handling for GitHub issue #3843 with a regression test and route-specific behavior."
  -
    type: "verify"
    at: "2026-05-17T17:47:08.756Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --runInBand; Result: pass; Evidence: 17 tests passed including branch_pr base start-ready recovery regression. Scope: work start/task start-ready route behavior. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts; Result: pass; Evidence: 2 files, 9 tests passed. Scope: existing task start/finish lifecycle unit coverage. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: repo TypeScript project references. Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier style. Scope: touched files. Command: bun run lint:core -- packages/agentplane/src/commands/task/start-ready.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts; Result: pass; Evidence: eslint exited 0. Scope: repo core lint. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing."
  -
    type: "verify"
    at: "2026-05-17T17:54:39.890Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts --runInBand; Result: pass; Evidence: 17 tests passed across branch_pr work start/start-ready routing suites, including base checkout recovery regression. Scope: work start/task start-ready route behavior. Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts --runInBand; Result: pass; Evidence: 1 focused regression test passed. Scope: issue #3843 route. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts; Result: pass; Evidence: 2 files, 9 tests passed. Scope: existing task start/finish lifecycle unit coverage. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: repo TypeScript project references. Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier style. Scope: touched files. Command: bun run hotspots:check; Result: pass; Evidence: hotspot threshold check passed after moving regression out of oversized pr-flow suite. Scope: CI hotspot gate. Command: bun run lint:core -- packages/agentplane/src/commands/task/start-ready.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts; Result: pass; Evidence: eslint exited 0. Scope: repo core lint. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing."
  -
    type: "status"
    at: "2026-05-17T18:13:31.044Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3850 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-17T18:13:31.049Z"
doc_updated_by: "INTEGRATOR"
description: "Fix GitHub issue #3843: in branch_pr, task start-ready from the base checkout after work start must not fail with missing task README; it should route to the task worktree or provide deterministic recovery."
sections:
  Summary: |-
    Fix issue #3843 branch_pr base start-ready recovery

    Fix GitHub issue #3843: in branch_pr, task start-ready from the base checkout after work start must not fail with missing task README; it should route to the task worktree or provide deterministic recovery.
  Scope: |-
    - In scope: Fix GitHub issue #3843: in branch_pr, task start-ready from the base checkout after work start must not fail with missing task README; it should route to the task worktree or provide deterministic recovery.
    - Out of scope: unrelated refactors not required for "Fix issue #3843 branch_pr base start-ready recovery".
  Plan: "Fix issue #3843 by making branch_pr task start-ready from the base checkout deterministic after work start. First reproduce/cover the missing README route with a focused CLI/unit test. Then update the lifecycle route so base checkout start-ready either resolves the task worktree task document and records the normal start event, or emits an explicit route-specific recovery without raw ENOENT. Keep scope to task/worktree route handling and docs/help only if required. PR body must include Fixes #3843."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T17:47:08.756Z — VERIFY — ok

    By: CODER

    Note: Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --runInBand; Result: pass; Evidence: 17 tests passed including branch_pr base start-ready recovery regression. Scope: work start/task start-ready route behavior. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts; Result: pass; Evidence: 2 files, 9 tests passed. Scope: existing task start/finish lifecycle unit coverage. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: repo TypeScript project references. Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier style. Scope: touched files. Command: bun run lint:core -- packages/agentplane/src/commands/task/start-ready.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts; Result: pass; Evidence: eslint exited 0. Scope: repo core lint. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:37:29.073Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171737-5NHXTN-fix-3843-base-start-ready/.agentplane/tasks/202605171737-5NHXTN/blueprint/resolved-snapshot.json
    - old_digest: 550de5f9a0e5327c7d006afe31f30ba3488290595c5384cdd0df4b5f37dc3450
    - current_digest: 550de5f9a0e5327c7d006afe31f30ba3488290595c5384cdd0df4b5f37dc3450
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171737-5NHXTN

    ### 2026-05-17T17:54:39.890Z — VERIFY — ok

    By: CODER

    Note: Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts --runInBand; Result: pass; Evidence: 17 tests passed across branch_pr work start/start-ready routing suites, including base checkout recovery regression. Scope: work start/task start-ready route behavior. Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts --runInBand; Result: pass; Evidence: 1 focused regression test passed. Scope: issue #3843 route. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts; Result: pass; Evidence: 2 files, 9 tests passed. Scope: existing task start/finish lifecycle unit coverage. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: repo TypeScript project references. Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier style. Scope: touched files. Command: bun run hotspots:check; Result: pass; Evidence: hotspot threshold check passed after moving regression out of oversized pr-flow suite. Scope: CI hotspot gate. Command: bun run lint:core -- packages/agentplane/src/commands/task/start-ready.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts; Result: pass; Evidence: eslint exited 0. Scope: repo core lint. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:47:08.795Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171737-5NHXTN-fix-3843-base-start-ready/.agentplane/tasks/202605171737-5NHXTN/blueprint/resolved-snapshot.json
    - old_digest: 550de5f9a0e5327c7d006afe31f30ba3488290595c5384cdd0df4b5f37dc3450
    - current_digest: 550de5f9a0e5327c7d006afe31f30ba3488290595c5384cdd0df4b5f37dc3450
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171737-5NHXTN

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix issue #3843 branch_pr base start-ready recovery

Fix GitHub issue #3843: in branch_pr, task start-ready from the base checkout after work start must not fail with missing task README; it should route to the task worktree or provide deterministic recovery.

## Scope

- In scope: Fix GitHub issue #3843: in branch_pr, task start-ready from the base checkout after work start must not fail with missing task README; it should route to the task worktree or provide deterministic recovery.
- Out of scope: unrelated refactors not required for "Fix issue #3843 branch_pr base start-ready recovery".

## Plan

Fix issue #3843 by making branch_pr task start-ready from the base checkout deterministic after work start. First reproduce/cover the missing README route with a focused CLI/unit test. Then update the lifecycle route so base checkout start-ready either resolves the task worktree task document and records the normal start event, or emits an explicit route-specific recovery without raw ENOENT. Keep scope to task/worktree route handling and docs/help only if required. PR body must include Fixes #3843.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T17:47:08.756Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --runInBand; Result: pass; Evidence: 17 tests passed including branch_pr base start-ready recovery regression. Scope: work start/task start-ready route behavior. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts; Result: pass; Evidence: 2 files, 9 tests passed. Scope: existing task start/finish lifecycle unit coverage. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: repo TypeScript project references. Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier style. Scope: touched files. Command: bun run lint:core -- packages/agentplane/src/commands/task/start-ready.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts; Result: pass; Evidence: eslint exited 0. Scope: repo core lint. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:37:29.073Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171737-5NHXTN-fix-3843-base-start-ready/.agentplane/tasks/202605171737-5NHXTN/blueprint/resolved-snapshot.json
- old_digest: 550de5f9a0e5327c7d006afe31f30ba3488290595c5384cdd0df4b5f37dc3450
- current_digest: 550de5f9a0e5327c7d006afe31f30ba3488290595c5384cdd0df4b5f37dc3450
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171737-5NHXTN

### 2026-05-17T17:54:39.890Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts --runInBand; Result: pass; Evidence: 17 tests passed across branch_pr work start/start-ready routing suites, including base checkout recovery regression. Scope: work start/task start-ready route behavior. Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts --runInBand; Result: pass; Evidence: 1 focused regression test passed. Scope: issue #3843 route. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts; Result: pass; Evidence: 2 files, 9 tests passed. Scope: existing task start/finish lifecycle unit coverage. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: repo TypeScript project references. Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier style. Scope: touched files. Command: bun run hotspots:check; Result: pass; Evidence: hotspot threshold check passed after moving regression out of oversized pr-flow suite. Scope: CI hotspot gate. Command: bun run lint:core -- packages/agentplane/src/commands/task/start-ready.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts; Result: pass; Evidence: eslint exited 0. Scope: repo core lint. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:47:08.795Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171737-5NHXTN-fix-3843-base-start-ready/.agentplane/tasks/202605171737-5NHXTN/blueprint/resolved-snapshot.json
- old_digest: 550de5f9a0e5327c7d006afe31f30ba3488290595c5384cdd0df4b5f37dc3450
- current_digest: 550de5f9a0e5327c7d006afe31f30ba3488290595c5384cdd0df4b5f37dc3450
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171737-5NHXTN

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
