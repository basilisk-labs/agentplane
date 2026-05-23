---
id: "202605221745-CH6ENY"
title: "Expose batch ownership in agent context"
result_summary: "Merged via PR #4071."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202605221726-R90HC5"
  - "202605221726-WY8F98"
tags:
  - "cli"
  - "code"
  - "tasks"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Add tests for route or brief output when a task is part of a related batch worktree."
  - "Confirm primary task, included task ids, branch owner, and per-task verification states are visible in JSON output."
  - "Confirm text output gives one safe next action and does not instruct satellite tasks to open conflicting PRs."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:45:32.206Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T04:16:09.682Z"
  updated_by: "CODER"
  note: "Removed exported-only batch task state type after verify-static/knip flagged it; local knip, format, and batch tests pass."
  attempts: 0
commit:
  hash: "2dc6456c6fff980641e0dcd87cc631b5462ff0a1"
  message: "Merge pull request #4071 from basilisk-labs/task/202605221745-CH6ENY/batch-ownership-context"
comments:
  -
    author: "CODER"
    body: "Start: Implement batch ownership metadata in task route and brief output, with tests covering JSON fields and safe satellite next-action guidance."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4071 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-23T03:48:17.121Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement batch ownership metadata in task route and brief output, with tests covering JSON fields and safe satellite next-action guidance."
  -
    type: "verify"
    at: "2026-05-23T03:56:09.280Z"
    author: "CODER"
    state: "ok"
    note: "Implemented batch ownership in task route/brief output and verified focused tests, typecheck, lint, formatting, task-scope, knip, and framework bootstrap."
  -
    type: "verify"
    at: "2026-05-23T04:04:24.869Z"
    author: "CODER"
    state: "ok"
    note: "Refactored batch ownership resolver out of route-decision.ts after hosted hotspot gate failed; local hotspots, focused tests, typecheck, lint, format, and task-scope checks pass."
  -
    type: "verify"
    at: "2026-05-23T04:11:13.543Z"
    author: "CODER"
    state: "ok"
    note: "Addressed Codex review by gating batch ownership to branch_pr and moving batch tests into a dedicated file to keep hotspot baselines green."
  -
    type: "verify"
    at: "2026-05-23T04:16:09.682Z"
    author: "CODER"
    state: "ok"
    note: "Removed exported-only batch task state type after verify-static/knip flagged it; local knip, format, and batch tests pass."
  -
    type: "status"
    at: "2026-05-23T04:22:57.802Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4071 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-23T04:22:57.810Z"
doc_updated_by: "INTEGRATOR"
description: "Expose primary batch task, included task ids, shared worktree branch, per-task verification state, and next owner action in route/brief output so agents do not confuse satellite tasks with integration owners."
sections:
  Summary: |-
    Expose batch ownership in agent context

    Expose primary batch task, included task ids, shared worktree branch, per-task verification state, and next owner action in route/brief output so agents do not confuse satellite tasks with integration owners.
  Scope: |-
    - In scope: Expose primary batch task, included task ids, shared worktree branch, per-task verification state, and next owner action in route/brief output so agents do not confuse satellite tasks with integration owners.
    - Out of scope: unrelated refactors not required for "Expose batch ownership in agent context".
  Plan: "Teach route/brief output about related task batch ownership. A satellite task should point agents to the primary task/worktree and its own verification duty, instead of encouraging duplicate branches, PRs, or close-tail actions."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `Add tests for route or brief output when a task is part of a related batch worktree.`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `Confirm primary task, included task ids, branch owner, and per-task verification states are visible in JSON output.`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `Confirm text output gives one safe next action and does not instruct satellite tasks to open conflicting PRs.`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T03:56:09.280Z — VERIFY — ok

    By: CODER

    Note: Implemented batch ownership in task route/brief output and verified focused tests, typecheck, lint, formatting, task-scope, knip, and framework bootstrap.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T03:48:17.121Z, excerpt_hash=sha256:89967c92feb6b3c0686492f4a752fda55ed287de724c90830a35519f424bed7e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221745-CH6ENY-batch-ownership-context/.agentplane/tasks/202605221745-CH6ENY/blueprint/resolved-snapshot.json
    - old_digest: 24852f0952df9955124f58a1426ce5029913a0fdac7ba1c32668da96dc4eb986
    - current_digest: 24852f0952df9955124f58a1426ce5029913a0fdac7ba1c32668da96dc4eb986
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221745-CH6ENY

    ### 2026-05-23T04:04:24.869Z — VERIFY — ok

    By: CODER

    Note: Refactored batch ownership resolver out of route-decision.ts after hosted hotspot gate failed; local hotspots, focused tests, typecheck, lint, format, and task-scope checks pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T03:56:09.306Z, excerpt_hash=sha256:89967c92feb6b3c0686492f4a752fda55ed287de724c90830a35519f424bed7e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221745-CH6ENY-batch-ownership-context/.agentplane/tasks/202605221745-CH6ENY/blueprint/resolved-snapshot.json
    - old_digest: 24852f0952df9955124f58a1426ce5029913a0fdac7ba1c32668da96dc4eb986
    - current_digest: 24852f0952df9955124f58a1426ce5029913a0fdac7ba1c32668da96dc4eb986
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221745-CH6ENY

    ### 2026-05-23T04:11:13.543Z — VERIFY — ok

    By: CODER

    Note: Addressed Codex review by gating batch ownership to branch_pr and moving batch tests into a dedicated file to keep hotspot baselines green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T04:04:24.896Z, excerpt_hash=sha256:89967c92feb6b3c0686492f4a752fda55ed287de724c90830a35519f424bed7e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221745-CH6ENY-batch-ownership-context/.agentplane/tasks/202605221745-CH6ENY/blueprint/resolved-snapshot.json
    - old_digest: 24852f0952df9955124f58a1426ce5029913a0fdac7ba1c32668da96dc4eb986
    - current_digest: 24852f0952df9955124f58a1426ce5029913a0fdac7ba1c32668da96dc4eb986
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221745-CH6ENY

    ### 2026-05-23T04:16:09.682Z — VERIFY — ok

    By: CODER

    Note: Removed exported-only batch task state type after verify-static/knip flagged it; local knip, format, and batch tests pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T04:11:13.571Z, excerpt_hash=sha256:89967c92feb6b3c0686492f4a752fda55ed287de724c90830a35519f424bed7e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221745-CH6ENY-batch-ownership-context/.agentplane/tasks/202605221745-CH6ENY/blueprint/resolved-snapshot.json
    - old_digest: 24852f0952df9955124f58a1426ce5029913a0fdac7ba1c32668da96dc4eb986
    - current_digest: 24852f0952df9955124f58a1426ce5029913a0fdac7ba1c32668da96dc4eb986
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221745-CH6ENY

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; Result: pass; Evidence: 10 tests passed, including branch_pr batch ownership JSON/text coverage; Scope: route/brief output. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0; Scope: TypeScript contracts. Command: bun run lint:core -- touched files; Result: pass; Evidence: eslint exited 0; Scope: touched implementation/tests. Command: bun run format:check -- touched files; Result: pass; Evidence: all matched files use Prettier style; Scope: formatting. Command: bun run dev:task-scope:check; Result: pass; Evidence: task scope looks coherent. Command: bun run knip:check; Result: pass; Evidence: unused-code baseline OK. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready.
      Impact: Satellite batch tasks now point to the primary batch PR and their own verification duty instead of suggesting conflicting PR branches.
      Resolution: Route decision now derives batch ownership from local PR metadata and exposes primary, included ids, branch, per-task verification state, and safe owner action.

    - Observation: Command: bun run hotspots:check; Result: pass; Evidence: hotspot threshold check passed, route-decision.ts below 600-line hard limit. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; Result: pass; Evidence: 10 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run lint:core -- touched files; Result: pass; Evidence: eslint exited 0. Command: bun run format:check -- touched files; Result: pass; Evidence: all matched files use Prettier style. Command: bun run dev:task-scope:check; Result: pass; Evidence: task scope looks coherent.
      Impact: CI hotspot contract is satisfied without weakening coverage or adding an oversized-file exception.
      Resolution: Moved branch_pr batch ownership discovery into route-batch-ownership.ts and kept route-decision.ts focused on route assembly.

    - Observation: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts; Result: pass; Evidence: 2 files, 11 tests passed, including direct-mode stale batch artifact regression. Command: bun run hotspots:check; Result: pass; Evidence: runtime and oversized test baselines OK. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run lint:core -- touched files; Result: pass; Evidence: eslint exited 0. Command: bun run format:check -- touched files; Result: pass; Evidence: all matched files use Prettier style. Command: bun run dev:task-scope:check; Result: pass; Evidence: task scope looks coherent.
      Impact: Direct-mode repositories with stale/migrated PR metadata keep direct next-action behavior; branch_pr batch tasks still expose ownership context.
      Resolution: Batch ownership is resolved only for workflow_mode=branch_pr, with batch tests isolated from the existing oversized route-decision test file.

    - Observation: Command: bun run knip:check; Result: pass; Evidence: unused-code baseline OK. Command: bun run format:check -- packages/agentplane/src/commands/shared/route-batch-ownership.ts; Result: pass; Evidence: Prettier matched. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts; Result: pass; Evidence: 2 tests passed.
      Impact: verify-static dead-code baseline should no longer fail on route-batch-ownership.ts.
      Resolution: Kept RouteBatchTaskState local to the resolver module because no external module needs to import it.
id_source: "generated"
---
## Summary

Expose batch ownership in agent context

Expose primary batch task, included task ids, shared worktree branch, per-task verification state, and next owner action in route/brief output so agents do not confuse satellite tasks with integration owners.

## Scope

- In scope: Expose primary batch task, included task ids, shared worktree branch, per-task verification state, and next owner action in route/brief output so agents do not confuse satellite tasks with integration owners.
- Out of scope: unrelated refactors not required for "Expose batch ownership in agent context".

## Plan

Teach route/brief output about related task batch ownership. A satellite task should point agents to the primary task/worktree and its own verification duty, instead of encouraging duplicate branches, PRs, or close-tail actions.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `Add tests for route or brief output when a task is part of a related batch worktree.`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `Confirm primary task, included task ids, branch owner, and per-task verification states are visible in JSON output.`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `Confirm text output gives one safe next action and does not instruct satellite tasks to open conflicting PRs.`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T03:56:09.280Z — VERIFY — ok

By: CODER

Note: Implemented batch ownership in task route/brief output and verified focused tests, typecheck, lint, formatting, task-scope, knip, and framework bootstrap.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T03:48:17.121Z, excerpt_hash=sha256:89967c92feb6b3c0686492f4a752fda55ed287de724c90830a35519f424bed7e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221745-CH6ENY-batch-ownership-context/.agentplane/tasks/202605221745-CH6ENY/blueprint/resolved-snapshot.json
- old_digest: 24852f0952df9955124f58a1426ce5029913a0fdac7ba1c32668da96dc4eb986
- current_digest: 24852f0952df9955124f58a1426ce5029913a0fdac7ba1c32668da96dc4eb986
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221745-CH6ENY

### 2026-05-23T04:04:24.869Z — VERIFY — ok

By: CODER

Note: Refactored batch ownership resolver out of route-decision.ts after hosted hotspot gate failed; local hotspots, focused tests, typecheck, lint, format, and task-scope checks pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T03:56:09.306Z, excerpt_hash=sha256:89967c92feb6b3c0686492f4a752fda55ed287de724c90830a35519f424bed7e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221745-CH6ENY-batch-ownership-context/.agentplane/tasks/202605221745-CH6ENY/blueprint/resolved-snapshot.json
- old_digest: 24852f0952df9955124f58a1426ce5029913a0fdac7ba1c32668da96dc4eb986
- current_digest: 24852f0952df9955124f58a1426ce5029913a0fdac7ba1c32668da96dc4eb986
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221745-CH6ENY

### 2026-05-23T04:11:13.543Z — VERIFY — ok

By: CODER

Note: Addressed Codex review by gating batch ownership to branch_pr and moving batch tests into a dedicated file to keep hotspot baselines green.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T04:04:24.896Z, excerpt_hash=sha256:89967c92feb6b3c0686492f4a752fda55ed287de724c90830a35519f424bed7e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221745-CH6ENY-batch-ownership-context/.agentplane/tasks/202605221745-CH6ENY/blueprint/resolved-snapshot.json
- old_digest: 24852f0952df9955124f58a1426ce5029913a0fdac7ba1c32668da96dc4eb986
- current_digest: 24852f0952df9955124f58a1426ce5029913a0fdac7ba1c32668da96dc4eb986
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221745-CH6ENY

### 2026-05-23T04:16:09.682Z — VERIFY — ok

By: CODER

Note: Removed exported-only batch task state type after verify-static/knip flagged it; local knip, format, and batch tests pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T04:11:13.571Z, excerpt_hash=sha256:89967c92feb6b3c0686492f4a752fda55ed287de724c90830a35519f424bed7e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221745-CH6ENY-batch-ownership-context/.agentplane/tasks/202605221745-CH6ENY/blueprint/resolved-snapshot.json
- old_digest: 24852f0952df9955124f58a1426ce5029913a0fdac7ba1c32668da96dc4eb986
- current_digest: 24852f0952df9955124f58a1426ce5029913a0fdac7ba1c32668da96dc4eb986
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221745-CH6ENY

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; Result: pass; Evidence: 10 tests passed, including branch_pr batch ownership JSON/text coverage; Scope: route/brief output. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0; Scope: TypeScript contracts. Command: bun run lint:core -- touched files; Result: pass; Evidence: eslint exited 0; Scope: touched implementation/tests. Command: bun run format:check -- touched files; Result: pass; Evidence: all matched files use Prettier style; Scope: formatting. Command: bun run dev:task-scope:check; Result: pass; Evidence: task scope looks coherent. Command: bun run knip:check; Result: pass; Evidence: unused-code baseline OK. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime ready.
  Impact: Satellite batch tasks now point to the primary batch PR and their own verification duty instead of suggesting conflicting PR branches.
  Resolution: Route decision now derives batch ownership from local PR metadata and exposes primary, included ids, branch, per-task verification state, and safe owner action.

- Observation: Command: bun run hotspots:check; Result: pass; Evidence: hotspot threshold check passed, route-decision.ts below 600-line hard limit. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; Result: pass; Evidence: 10 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run lint:core -- touched files; Result: pass; Evidence: eslint exited 0. Command: bun run format:check -- touched files; Result: pass; Evidence: all matched files use Prettier style. Command: bun run dev:task-scope:check; Result: pass; Evidence: task scope looks coherent.
  Impact: CI hotspot contract is satisfied without weakening coverage or adding an oversized-file exception.
  Resolution: Moved branch_pr batch ownership discovery into route-batch-ownership.ts and kept route-decision.ts focused on route assembly.

- Observation: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts; Result: pass; Evidence: 2 files, 11 tests passed, including direct-mode stale batch artifact regression. Command: bun run hotspots:check; Result: pass; Evidence: runtime and oversized test baselines OK. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bun run lint:core -- touched files; Result: pass; Evidence: eslint exited 0. Command: bun run format:check -- touched files; Result: pass; Evidence: all matched files use Prettier style. Command: bun run dev:task-scope:check; Result: pass; Evidence: task scope looks coherent.
  Impact: Direct-mode repositories with stale/migrated PR metadata keep direct next-action behavior; branch_pr batch tasks still expose ownership context.
  Resolution: Batch ownership is resolved only for workflow_mode=branch_pr, with batch tests isolated from the existing oversized route-decision test file.

- Observation: Command: bun run knip:check; Result: pass; Evidence: unused-code baseline OK. Command: bun run format:check -- packages/agentplane/src/commands/shared/route-batch-ownership.ts; Result: pass; Evidence: Prettier matched. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts; Result: pass; Evidence: 2 tests passed.
  Impact: verify-static dead-code baseline should no longer fail on route-batch-ownership.ts.
  Resolution: Kept RouteBatchTaskState local to the resolver module because no external module needs to import it.
