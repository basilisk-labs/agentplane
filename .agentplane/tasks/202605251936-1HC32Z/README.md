---
id: "202605251936-1HC32Z"
title: "Fix active task selector projection fallback"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-25T19:39:45.636Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-25T19:54:30.527Z"
  updated_by: "CODER"
  note: "Command: bun run test:project -- agentplane packages/agentplane/src/commands/shared/task-backend.test.ts; Result: pass; Evidence: 1 file, 12 tests passed. Scope: regression for native projection fallback when DONE dependency rows hide active tasks. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts; Result: pass; Evidence: 2 files, 26 tests passed. Scope: active/list query behavior. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; Result: pass; Evidence: 1 file, 9 tests passed. Scope: route context commands. Command: bun run typecheck; Result: pass. Scope: repository TypeScript build graph. Command: node .agentplane/policy/check-routing.mjs and ap doctor; Result: pass; Evidence: policy routing OK and doctor OK. Scope: policy/workspace health."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-25T19:56:04.554Z"
  updated_by: "EVALUATOR"
  note: "Projection fallback fix is scoped and verified."
  evaluated_sha: "4c37ee09bfcd1fad435260618801e87dd643e289"
  blueprint_digest: "51d243d2d94f4ee3c26392cbd5aa2086bc314c822b80d0f204dd5106de2ce642"
  evidence_refs:
    - ".agentplane/tasks/202605251936-1HC32Z/README.md"
    - ".agentplane/tasks/202605251936-1HC32Z/quality/20260525-195604554-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605251936-1HC32Z/quality/20260525-195604554-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605251936-1HC32Z/quality/20260525-195604554-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605251936-1HC32Z/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/shared/task-backend.test.ts"
    - "packages/agentplane/src/commands/shared/task-backend.ts"
  findings:
    - "listTaskSummariesMemo now falls back to canonical summaries when a filtered native projection returns only DONE dependency rows for an active-status request, preventing task list/task active from silently hiding active tasks under stale projection state."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce and fix active task selector projection fallback so visible TODO tasks are not hidden by stale query projection state."
events:
  -
    type: "status"
    at: "2026-05-25T19:41:21.196Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce and fix active task selector projection fallback so visible TODO tasks are not hidden by stale query projection state."
  -
    type: "verify"
    at: "2026-05-25T19:54:30.527Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run test:project -- agentplane packages/agentplane/src/commands/shared/task-backend.test.ts; Result: pass; Evidence: 1 file, 12 tests passed. Scope: regression for native projection fallback when DONE dependency rows hide active tasks. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts; Result: pass; Evidence: 2 files, 26 tests passed. Scope: active/list query behavior. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; Result: pass; Evidence: 1 file, 9 tests passed. Scope: route context commands. Command: bun run typecheck; Result: pass. Scope: repository TypeScript build graph. Command: node .agentplane/policy/check-routing.mjs and ap doctor; Result: pass; Evidence: policy routing OK and doctor OK. Scope: policy/workspace health."
doc_version: 3
doc_updated_at: "2026-05-25T19:54:30.548Z"
doc_updated_by: "CODER"
description: "Fix the task list/task active selector path so active TODO tasks visible to direct task lookup are not silently hidden by stale or incomplete projection state."
sections:
  Summary: |-
    Fix active task selector projection fallback

    Fix the task list/task active selector path so active TODO tasks visible to direct task lookup are not silently hidden by stale or incomplete projection state.
  Scope: |-
    - In scope: Fix the task list/task active selector path so active TODO tasks visible to direct task lookup are not silently hidden by stale or incomplete projection state.
    - Out of scope: unrelated refactors not required for "Fix active task selector projection fallback".
  Plan: |-
    1. Reproduce the selector/projection gap where direct task lookup can see an active TODO task but task list/task active returns no rows.
    2. Locate the query/projection fallback path responsible for hiding active task directories when projection state is stale, incomplete, or empty.
    3. Add focused regression coverage for task list/task active canonical fallback in the active selector path.
    4. Implement the smallest fix that preserves projection performance while preventing silent active-task hiding.
    5. Verify with focused cli-core task query tests, route-decision tests if impacted, policy routing, and doctor.
  Verify Steps: |-
    1. Run `ap task list --status TODO --limit 10` against a state containing an active TODO task visible to direct task lookup. Expected: active TODO tasks are listed, or a clear fallback diagnostic is emitted instead of a silent zero.
    2. Run `ap task active --status TODO --limit 10` against the same state. Expected: active TODO tasks are included instead of silently returning zero.
    3. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts`. Expected: focused active/list query behavior passes.
    4. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts`. Expected: route context commands still pass.
    5. Run `node .agentplane/policy/check-routing.mjs` and `ap doctor`. Expected: policy routing and workspace doctor pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-25T19:54:30.527Z — VERIFY — ok

    By: CODER

    Note: Command: bun run test:project -- agentplane packages/agentplane/src/commands/shared/task-backend.test.ts; Result: pass; Evidence: 1 file, 12 tests passed. Scope: regression for native projection fallback when DONE dependency rows hide active tasks. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts; Result: pass; Evidence: 2 files, 26 tests passed. Scope: active/list query behavior. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; Result: pass; Evidence: 1 file, 9 tests passed. Scope: route context commands. Command: bun run typecheck; Result: pass. Scope: repository TypeScript build graph. Command: node .agentplane/policy/check-routing.mjs and ap doctor; Result: pass; Evidence: policy routing OK and doctor OK. Scope: policy/workspace health.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T19:41:21.196Z, excerpt_hash=sha256:6ce1fcafea08f8fd4d18aa0367e67bd68ffdc8e570884218544b224c999542ad

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605251936-1HC32Z-fix-active-task-selector-projection-fallback/.agentplane/tasks/202605251936-1HC32Z/blueprint/resolved-snapshot.json
    - old_digest: 51d243d2d94f4ee3c26392cbd5aa2086bc314c822b80d0f204dd5106de2ce642
    - current_digest: 51d243d2d94f4ee3c26392cbd5aa2086bc314c822b80d0f204dd5106de2ce642
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605251936-1HC32Z

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix active task selector projection fallback

Fix the task list/task active selector path so active TODO tasks visible to direct task lookup are not silently hidden by stale or incomplete projection state.

## Scope

- In scope: Fix the task list/task active selector path so active TODO tasks visible to direct task lookup are not silently hidden by stale or incomplete projection state.
- Out of scope: unrelated refactors not required for "Fix active task selector projection fallback".

## Plan

1. Reproduce the selector/projection gap where direct task lookup can see an active TODO task but task list/task active returns no rows.
2. Locate the query/projection fallback path responsible for hiding active task directories when projection state is stale, incomplete, or empty.
3. Add focused regression coverage for task list/task active canonical fallback in the active selector path.
4. Implement the smallest fix that preserves projection performance while preventing silent active-task hiding.
5. Verify with focused cli-core task query tests, route-decision tests if impacted, policy routing, and doctor.

## Verify Steps

1. Run `ap task list --status TODO --limit 10` against a state containing an active TODO task visible to direct task lookup. Expected: active TODO tasks are listed, or a clear fallback diagnostic is emitted instead of a silent zero.
2. Run `ap task active --status TODO --limit 10` against the same state. Expected: active TODO tasks are included instead of silently returning zero.
3. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts`. Expected: focused active/list query behavior passes.
4. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts`. Expected: route context commands still pass.
5. Run `node .agentplane/policy/check-routing.mjs` and `ap doctor`. Expected: policy routing and workspace doctor pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-25T19:54:30.527Z — VERIFY — ok

By: CODER

Note: Command: bun run test:project -- agentplane packages/agentplane/src/commands/shared/task-backend.test.ts; Result: pass; Evidence: 1 file, 12 tests passed. Scope: regression for native projection fallback when DONE dependency rows hide active tasks. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts; Result: pass; Evidence: 2 files, 26 tests passed. Scope: active/list query behavior. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; Result: pass; Evidence: 1 file, 9 tests passed. Scope: route context commands. Command: bun run typecheck; Result: pass. Scope: repository TypeScript build graph. Command: node .agentplane/policy/check-routing.mjs and ap doctor; Result: pass; Evidence: policy routing OK and doctor OK. Scope: policy/workspace health.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T19:41:21.196Z, excerpt_hash=sha256:6ce1fcafea08f8fd4d18aa0367e67bd68ffdc8e570884218544b224c999542ad

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605251936-1HC32Z-fix-active-task-selector-projection-fallback/.agentplane/tasks/202605251936-1HC32Z/blueprint/resolved-snapshot.json
- old_digest: 51d243d2d94f4ee3c26392cbd5aa2086bc314c822b80d0f204dd5106de2ce642
- current_digest: 51d243d2d94f4ee3c26392cbd5aa2086bc314c822b80d0f204dd5106de2ce642
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605251936-1HC32Z

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
