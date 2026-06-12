---
id: "202606120737-7B9JN2"
title: "Hide runner from default agent prompts"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "policy"
  - "prompts"
verify:
  - "bunx vitest run packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runtime/prompt-modules/registry.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
  - "ap doctor"
plan_approval:
  state: "approved"
  updated_at: "2026-06-12T07:38:24.803Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-12T08:28:03.420Z"
  updated_by: "CODER"
  note: "Verified merge HEAD after rebasing on origin/main: bun run format:check; bun run lint:core; focused vitest route-guidance/base-prompts/route-decision/help-snap/command-catalog suite; bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs."
  attempts: 0
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: hide runner execution guidance from default agent prompt and route surfaces while preserving the explicit parallel-codex runner exception."
events:
  -
    type: "status"
    at: "2026-06-12T07:39:05.392Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: hide runner execution guidance from default agent prompt and route surfaces while preserving the explicit parallel-codex runner exception."
  -
    type: "verify"
    at: "2026-06-12T07:49:03.022Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: runner is hidden from default route/help/prompt surfaces while internal task run remains available for explicit recipe paths. Checks: focused vitest route/help/prompt suite passed (8 files, 53 tests); bun run --filter=agentplane build passed; node .agentplane/policy/check-routing.mjs passed; bun run docs:cli:check passed after regenerating CLI reference; ap doctor passed with only pre-existing DONE task commit-hash warnings."
  -
    type: "verify"
    at: "2026-06-12T07:50:21.188Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: current HEAD 1e7d5cfd3 hides runner from default route/help/prompt surfaces while keeping internal task run dispatch and the parallel-codex runner prompt exception. Checks passed on this branch: focused vitest route/help/prompt suite (8 files, 53 tests); bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs; bun run docs:cli:check; ap doctor (OK with two pre-existing DONE task commit-hash warnings)."
  -
    type: "verify"
    at: "2026-06-12T08:01:21.346Z"
    author: "CODER"
    state: "ok"
    note: "Verified current HEAD after CI fixes: bun run format:check; bun run lint:core; bunx vitest run route-guidance/base-prompts/route-decision/help-snap/command-catalog focused suite."
  -
    type: "verify"
    at: "2026-06-12T08:11:03.533Z"
    author: "CODER"
    state: "ok"
    note: "Verified current HEAD after review fix: unstarted direct tasks route to task start-ready with current agent, started direct tasks still route to verify-show, and no direct path emits task run. Checks passed: bun run format:check; bun run lint:core; bunx vitest run route-guidance/base-prompts/route-decision/help-snap/command-catalog focused suite; bun run --filter=agentplane build."
  -
    type: "verify"
    at: "2026-06-12T08:28:03.420Z"
    author: "CODER"
    state: "ok"
    note: "Verified merge HEAD after rebasing on origin/main: bun run format:check; bun run lint:core; focused vitest route-guidance/base-prompts/route-decision/help-snap/command-catalog suite; bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs."
doc_version: 3
doc_updated_at: "2026-06-12T08:28:03.613Z"
doc_updated_by: "DOCS"
description: "Keep runner code in place but remove default public/agent prompt guidance that makes agents aware of or able to launch the runner. Preserve runner visibility only when the parallel-codex recipe is explicitly active."
sections:
  Summary: |-
    Hide runner from default agent prompts

    Keep runner code in place but remove default public/agent prompt guidance that makes agents aware of or able to launch the runner. Preserve runner visibility only when the parallel-codex recipe is explicitly active.
  Scope: |-
    - In scope: Keep runner code in place but remove default public/agent prompt guidance that makes agents aware of or able to launch the runner. Preserve runner visibility only when the parallel-codex recipe is explicitly active.
    - Out of scope: unrelated refactors not required for "Hide runner from default agent prompts".
  Plan: |-
    1. Implement the change for "Hide runner from default agent prompts".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold for "Hide runner from default agent prompts". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Hide runner from default agent prompts". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-12T07:49:03.022Z — VERIFY — ok

    By: DOCS

    Note: Verified: runner is hidden from default route/help/prompt surfaces while internal task run remains available for explicit recipe paths. Checks: focused vitest route/help/prompt suite passed (8 files, 53 tests); bun run --filter=agentplane build passed; node .agentplane/policy/check-routing.mjs passed; bun run docs:cli:check passed after regenerating CLI reference; ap doctor passed with only pre-existing DONE task commit-hash warnings.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T07:39:05.392Z, excerpt_hash=sha256:d98c57099bc86c0a0aced11b25e46acac0c113adf57a40ebc6d03a7b2cba14d2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606120737-7B9JN2-hide-runner-default-prompts/.agentplane/tasks/202606120737-7B9JN2/blueprint/resolved-snapshot.json
    - old_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
    - current_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606120737-7B9JN2

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606120737-7B9JN2
    - diagnostic_command: agentplane pr check 202606120737-7B9JN2
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-12T07:50:21.188Z — VERIFY — ok

    By: DOCS

    Note: Verified: current HEAD 1e7d5cfd3 hides runner from default route/help/prompt surfaces while keeping internal task run dispatch and the parallel-codex runner prompt exception. Checks passed on this branch: focused vitest route/help/prompt suite (8 files, 53 tests); bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs; bun run docs:cli:check; ap doctor (OK with two pre-existing DONE task commit-hash warnings).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T07:49:03.243Z, excerpt_hash=sha256:d98c57099bc86c0a0aced11b25e46acac0c113adf57a40ebc6d03a7b2cba14d2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606120737-7B9JN2-hide-runner-default-prompts/.agentplane/tasks/202606120737-7B9JN2/blueprint/resolved-snapshot.json
    - old_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
    - current_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606120737-7B9JN2

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606120737-7B9JN2
    - diagnostic_command: agentplane pr check 202606120737-7B9JN2
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-12T08:01:21.346Z — VERIFY — ok

    By: CODER

    Note: Verified current HEAD after CI fixes: bun run format:check; bun run lint:core; bunx vitest run route-guidance/base-prompts/route-decision/help-snap/command-catalog focused suite.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T07:50:21.382Z, excerpt_hash=sha256:d98c57099bc86c0a0aced11b25e46acac0c113adf57a40ebc6d03a7b2cba14d2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606120737-7B9JN2-hide-runner-default-prompts/.agentplane/tasks/202606120737-7B9JN2/blueprint/resolved-snapshot.json
    - old_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
    - current_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606120737-7B9JN2

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606120737-7B9JN2
    - diagnostic_command: agentplane pr check 202606120737-7B9JN2
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-12T08:11:03.533Z — VERIFY — ok

    By: CODER

    Note: Verified current HEAD after review fix: unstarted direct tasks route to task start-ready with current agent, started direct tasks still route to verify-show, and no direct path emits task run. Checks passed: bun run format:check; bun run lint:core; bunx vitest run route-guidance/base-prompts/route-decision/help-snap/command-catalog focused suite; bun run --filter=agentplane build.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T08:01:21.620Z, excerpt_hash=sha256:d98c57099bc86c0a0aced11b25e46acac0c113adf57a40ebc6d03a7b2cba14d2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606120737-7B9JN2-hide-runner-default-prompts/.agentplane/tasks/202606120737-7B9JN2/blueprint/resolved-snapshot.json
    - old_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
    - current_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606120737-7B9JN2

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606120737-7B9JN2
    - diagnostic_command: agentplane pr check 202606120737-7B9JN2
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-12T08:28:03.420Z — VERIFY — ok

    By: CODER

    Note: Verified merge HEAD after rebasing on origin/main: bun run format:check; bun run lint:core; focused vitest route-guidance/base-prompts/route-decision/help-snap/command-catalog suite; bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T08:11:03.813Z, excerpt_hash=sha256:d98c57099bc86c0a0aced11b25e46acac0c113adf57a40ebc6d03a7b2cba14d2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606120737-7B9JN2-hide-runner-default-prompts/.agentplane/tasks/202606120737-7B9JN2/blueprint/resolved-snapshot.json
    - old_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
    - current_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606120737-7B9JN2

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606120737-7B9JN2
    - diagnostic_command: agentplane pr check 202606120737-7B9JN2
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Default direct routing now returns current-agent verify-show instead of task run; normal task brief/next-action text no longer prints runner_route_active=false or non-runner warnings; task run commands are internal help surface only; framework runner prompt is included only for active parallel-codex recipe context.
      Impact: Agents following normal prompts/help/routes should not learn about or launch the runner during the stabilization window.
      Resolution: Preserved runner code and internal command dispatch, but removed public/default visibility and guarded the executable runner prompt behind the parallel-codex recipe.

    - Observation: Default direct routing returns current-agent verify-show instead of task run; normal task brief/next-action text omits runner_route_active=false; task run commands are internal help surface only; framework runner prompt is collected only when recipe_id is parallel-codex.
      Impact: Default agents should not discover or launch the runner during stabilization.
      Resolution: Left runner implementation code in place, removed public/default route and prompt exposure, and preserved the explicit parallel-codex recipe escape hatch.

    - Observation: Hosted failures were format drift in base-prompts.test.ts and unused helper in route-decision-next-action.ts.
      Impact: Runner remains hidden from default prompts and public help while CI static/contract checks are addressed.
      Resolution: Removed the unused helper, formatted the test, and reran local format, lint, and focused regression tests.

    - Observation: Review thread identified that approved direct tasks before start-ready were routed to verify-show no-op.
      Impact: Agents following task next-action can now start direct tasks without discovering or launching the runner.
      Resolution: Route unstarted direct tasks to task start-ready, keep started direct tasks on current-agent verify-show, and preserve runner state handling only for existing runner metadata.

    - Observation: Task branch was behind origin/main after hosted checks passed.
      Impact: PR can be rechecked from an up-to-date branch while preserving the runner-hidden behavior.
      Resolution: Merged origin/main, rebuilt agentplane runtime, and reran local verification on the merge HEAD.
id_source: "generated"
---
## Summary

Hide runner from default agent prompts

Keep runner code in place but remove default public/agent prompt guidance that makes agents aware of or able to launch the runner. Preserve runner visibility only when the parallel-codex recipe is explicitly active.

## Scope

- In scope: Keep runner code in place but remove default public/agent prompt guidance that makes agents aware of or able to launch the runner. Preserve runner visibility only when the parallel-codex recipe is explicitly active.
- Out of scope: unrelated refactors not required for "Hide runner from default agent prompts".

## Plan

1. Implement the change for "Hide runner from default agent prompts".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold for "Hide runner from default agent prompts". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Hide runner from default agent prompts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-12T07:49:03.022Z — VERIFY — ok

By: DOCS

Note: Verified: runner is hidden from default route/help/prompt surfaces while internal task run remains available for explicit recipe paths. Checks: focused vitest route/help/prompt suite passed (8 files, 53 tests); bun run --filter=agentplane build passed; node .agentplane/policy/check-routing.mjs passed; bun run docs:cli:check passed after regenerating CLI reference; ap doctor passed with only pre-existing DONE task commit-hash warnings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T07:39:05.392Z, excerpt_hash=sha256:d98c57099bc86c0a0aced11b25e46acac0c113adf57a40ebc6d03a7b2cba14d2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606120737-7B9JN2-hide-runner-default-prompts/.agentplane/tasks/202606120737-7B9JN2/blueprint/resolved-snapshot.json
- old_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
- current_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606120737-7B9JN2

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606120737-7B9JN2
- diagnostic_command: agentplane pr check 202606120737-7B9JN2
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-12T07:50:21.188Z — VERIFY — ok

By: DOCS

Note: Verified: current HEAD 1e7d5cfd3 hides runner from default route/help/prompt surfaces while keeping internal task run dispatch and the parallel-codex runner prompt exception. Checks passed on this branch: focused vitest route/help/prompt suite (8 files, 53 tests); bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs; bun run docs:cli:check; ap doctor (OK with two pre-existing DONE task commit-hash warnings).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T07:49:03.243Z, excerpt_hash=sha256:d98c57099bc86c0a0aced11b25e46acac0c113adf57a40ebc6d03a7b2cba14d2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606120737-7B9JN2-hide-runner-default-prompts/.agentplane/tasks/202606120737-7B9JN2/blueprint/resolved-snapshot.json
- old_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
- current_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606120737-7B9JN2

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606120737-7B9JN2
- diagnostic_command: agentplane pr check 202606120737-7B9JN2
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-12T08:01:21.346Z — VERIFY — ok

By: CODER

Note: Verified current HEAD after CI fixes: bun run format:check; bun run lint:core; bunx vitest run route-guidance/base-prompts/route-decision/help-snap/command-catalog focused suite.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T07:50:21.382Z, excerpt_hash=sha256:d98c57099bc86c0a0aced11b25e46acac0c113adf57a40ebc6d03a7b2cba14d2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606120737-7B9JN2-hide-runner-default-prompts/.agentplane/tasks/202606120737-7B9JN2/blueprint/resolved-snapshot.json
- old_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
- current_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606120737-7B9JN2

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606120737-7B9JN2
- diagnostic_command: agentplane pr check 202606120737-7B9JN2
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-12T08:11:03.533Z — VERIFY — ok

By: CODER

Note: Verified current HEAD after review fix: unstarted direct tasks route to task start-ready with current agent, started direct tasks still route to verify-show, and no direct path emits task run. Checks passed: bun run format:check; bun run lint:core; bunx vitest run route-guidance/base-prompts/route-decision/help-snap/command-catalog focused suite; bun run --filter=agentplane build.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T08:01:21.620Z, excerpt_hash=sha256:d98c57099bc86c0a0aced11b25e46acac0c113adf57a40ebc6d03a7b2cba14d2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606120737-7B9JN2-hide-runner-default-prompts/.agentplane/tasks/202606120737-7B9JN2/blueprint/resolved-snapshot.json
- old_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
- current_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606120737-7B9JN2

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606120737-7B9JN2
- diagnostic_command: agentplane pr check 202606120737-7B9JN2
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-12T08:28:03.420Z — VERIFY — ok

By: CODER

Note: Verified merge HEAD after rebasing on origin/main: bun run format:check; bun run lint:core; focused vitest route-guidance/base-prompts/route-decision/help-snap/command-catalog suite; bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T08:11:03.813Z, excerpt_hash=sha256:d98c57099bc86c0a0aced11b25e46acac0c113adf57a40ebc6d03a7b2cba14d2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606120737-7B9JN2-hide-runner-default-prompts/.agentplane/tasks/202606120737-7B9JN2/blueprint/resolved-snapshot.json
- old_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
- current_digest: 896693a74ddd02d87117785ebcf8fc0b5c180e3923165e7712312a3ffe255c7c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606120737-7B9JN2

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606120737-7B9JN2
- diagnostic_command: agentplane pr check 202606120737-7B9JN2
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Default direct routing now returns current-agent verify-show instead of task run; normal task brief/next-action text no longer prints runner_route_active=false or non-runner warnings; task run commands are internal help surface only; framework runner prompt is included only for active parallel-codex recipe context.
  Impact: Agents following normal prompts/help/routes should not learn about or launch the runner during the stabilization window.
  Resolution: Preserved runner code and internal command dispatch, but removed public/default visibility and guarded the executable runner prompt behind the parallel-codex recipe.

- Observation: Default direct routing returns current-agent verify-show instead of task run; normal task brief/next-action text omits runner_route_active=false; task run commands are internal help surface only; framework runner prompt is collected only when recipe_id is parallel-codex.
  Impact: Default agents should not discover or launch the runner during stabilization.
  Resolution: Left runner implementation code in place, removed public/default route and prompt exposure, and preserved the explicit parallel-codex recipe escape hatch.

- Observation: Hosted failures were format drift in base-prompts.test.ts and unused helper in route-decision-next-action.ts.
  Impact: Runner remains hidden from default prompts and public help while CI static/contract checks are addressed.
  Resolution: Removed the unused helper, formatted the test, and reran local format, lint, and focused regression tests.

- Observation: Review thread identified that approved direct tasks before start-ready were routed to verify-show no-op.
  Impact: Agents following task next-action can now start direct tasks without discovering or launching the runner.
  Resolution: Route unstarted direct tasks to task start-ready, keep started direct tasks on current-agent verify-show, and preserve runner state handling only for existing runner metadata.

- Observation: Task branch was behind origin/main after hosted checks passed.
  Impact: PR can be rechecked from an up-to-date branch while preserving the runner-hidden behavior.
  Resolution: Merged origin/main, rebuilt agentplane runtime, and reran local verification on the merge HEAD.
