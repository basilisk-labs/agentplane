---
id: "202608101506-4Y8ZY0"
title: "Accept safe shell-free Bun test checks in supervised verification"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "verifier"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-10T15:08:01.351Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-10T15:53:41.698Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "19da6e260c15c58ad6c5bce41fbc73548a8fca69"
  message: "🚧 4Y8ZY0 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 8e38a866dfee. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 19da6e260c15. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-10T15:08:59.533Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-10T15:33:54.793Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 8e38a866dfee. CLI accepted one state-bound external-agent semantic result."
    commit: "8e38a866dfee0f9c801bc6b178db56f0dfeb1e86"
  -
    type: "verify"
    at: "2026-08-10T15:40:35.199Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
  -
    type: "status"
    at: "2026-08-10T15:47:35.335Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 19da6e260c15. CLI accepted one state-bound external-agent semantic result."
    commit: "19da6e260c15c58ad6c5bce41fbc73548a8fca69"
  -
    type: "verify"
    at: "2026-08-10T15:53:41.698Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
doc_version: 3
doc_updated_at: "2026-08-10T15:53:44.683Z"
doc_updated_by: "SUPERVISOR"
description: "The supervisor currently accepts only three-token bun run scripts and rejects valid repository checks such as bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts. Reuse the existing shell-free argv parser, accept bounded Bun run and test invocations without invoking a shell, preserve fixed policy checks and evidence capture, and prove that task advance no longer creates false implementation-rework cycles for valid Bun tests."
sections:
  Summary: |-
    Accept safe shell-free Bun test checks in supervised verification

    The supervisor currently accepts only three-token bun run scripts and rejects valid repository checks such as bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts. Reuse the existing shell-free argv parser, accept bounded Bun run and test invocations without invoking a shell, preserve fixed policy checks and evidence capture, and prove that task advance no longer creates false implementation-rework cycles for valid Bun tests.
  Scope: |-
    - In scope: The supervisor currently accepts only three-token bun run scripts and rejects valid repository checks such as bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts. Reuse the existing shell-free argv parser, accept bounded Bun run and test invocations without invoking a shell, preserve fixed policy checks and evidence capture, and prove that task advance no longer creates false implementation-rework cycles for valid Bun tests.
    - Out of scope: unrelated refactors not required for "Accept safe shell-free Bun test checks in supervised verification".
  Plan: |-
    Goal: remove false verification rework for valid Bun test commands while preserving the supervisor's no-shell execution boundary.

    1. Add a failing regression for the exact reported command shape: bun test <repository test paths>. Assert execution uses executable=bun with argv=[test, ...] and never invokes a shell.
    2. Reuse the repository's existing quoted-argv parser instead of maintaining a second keyword/token-count grammar. Accept only the Bun run and Bun test subcommands in supervised declared checks; preserve the fixed routing and doctor checks.
    3. Permit normal inert argv for those Bun subcommands, including multiple test paths and quoted paths, while rejecting shell metacharacters, environment prefixes, unsupported executables, and unsupported Bun subcommands before process launch.
    4. Preserve timeout selection, output tails, stop-on-first-failure behavior, and durable declared-check evidence.
    5. Add regression coverage for accepted bun test and bun run arguments plus rejected injection/unsupported forms.
    6. Run the focused verifier tests, the task-advance lifecycle suite, typecheck, formatting/lint for changed files, and test:critical.

    Success: the exact P11 check bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts executes successfully through structured argv and can no longer create a false implementation-rework cycle. No shell is invoked and unsupported command families still fail closed.

    Scope: packages/agentplane verifier parsing/execution and focused tests only. No natural-language task classification, policy, workflow, or release changes.

    Rollback: revert the parser integration and its tests; existing three-token bun run behavior remains the fallback.
  Verify Steps: |-
    1. Run bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts. Expected: bun test with one or more repository paths is parsed into executable bun plus inert argv, quoted arguments remain single argv entries, and runProcess is called without a shell.
    2. Exercise negative parser cases for shell metacharacters, environment prefixes, unsupported executables, and unsupported Bun subcommands. Expected: each is rejected before runProcess is called.
    3. Run the exact P11 command bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts through supervised declared-check execution. Expected: status=passed and durable evidence records the exact command, exit code 0, and output tail.
    4. Run bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts. Expected: all focused verifier and lifecycle regressions pass.
    5. Run bun run typecheck and bun run test:critical. Expected: both pass.
    6. Run lint, formatting, and git diff --check for changed files. Expected: no findings.
    7. Inspect the final diff. Expected: changes stay inside verifier parsing/execution and focused tests; no shell execution, policy change, workflow change, or unrelated refactor is introduced.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-10T15:40:35.199Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T15:33:54.793Z, excerpt_hash=sha256:096ad1a48f15c3fef8ee0ada006dd0aaa185399688650edb1eb8d3afd6000260

    Details:

    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/tasks/202608101506-4Y8ZY0/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608101506-4Y8ZY0 declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608101506-4Y8ZY0/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608101506-4Y8ZY0 declared verification

    Command: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
    Result: fail
    Evidence: .agentplane/tasks/202608101506-4Y8ZY0/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608101506-4Y8ZY0 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608101506-4Y8ZY0-accept-safe-shell-free-bun-test-checks-in-superv/.agentplane/tasks/202608101506-4Y8ZY0/blueprint/resolved-snapshot.json
    - old_digest: e9896b989c3ebae1e6efacc43e759bc6c69e5978f2e09383e7e45ae2e30fda89
    - current_digest: e9896b989c3ebae1e6efacc43e759bc6c69e5978f2e09383e7e45ae2e30fda89
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608101506-4Y8ZY0

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608101506-4Y8ZY0
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-10T15:53:41.698Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T15:47:35.335Z, excerpt_hash=sha256:096ad1a48f15c3fef8ee0ada006dd0aaa185399688650edb1eb8d3afd6000260

    Details:

    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/tasks/202608101506-4Y8ZY0/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608101506-4Y8ZY0 declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608101506-4Y8ZY0/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608101506-4Y8ZY0 declared verification

    Command: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608101506-4Y8ZY0/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608101506-4Y8ZY0 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608101506-4Y8ZY0-accept-safe-shell-free-bun-test-checks-in-superv/.agentplane/tasks/202608101506-4Y8ZY0/blueprint/resolved-snapshot.json
    - old_digest: e9896b989c3ebae1e6efacc43e759bc6c69e5978f2e09383e7e45ae2e30fda89
    - current_digest: e9896b989c3ebae1e6efacc43e759bc6c69e5978f2e09383e7e45ae2e30fda89
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608101506-4Y8ZY0

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608101506-4Y8ZY0
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "3d417620e9a8b333416d25c2cf19b3ccbdbdd1c9"
    version: 1
id_source: "generated"
---
## Summary

Accept safe shell-free Bun test checks in supervised verification

The supervisor currently accepts only three-token bun run scripts and rejects valid repository checks such as bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts. Reuse the existing shell-free argv parser, accept bounded Bun run and test invocations without invoking a shell, preserve fixed policy checks and evidence capture, and prove that task advance no longer creates false implementation-rework cycles for valid Bun tests.

## Scope

- In scope: The supervisor currently accepts only three-token bun run scripts and rejects valid repository checks such as bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts. Reuse the existing shell-free argv parser, accept bounded Bun run and test invocations without invoking a shell, preserve fixed policy checks and evidence capture, and prove that task advance no longer creates false implementation-rework cycles for valid Bun tests.
- Out of scope: unrelated refactors not required for "Accept safe shell-free Bun test checks in supervised verification".

## Plan

Goal: remove false verification rework for valid Bun test commands while preserving the supervisor's no-shell execution boundary.

1. Add a failing regression for the exact reported command shape: bun test <repository test paths>. Assert execution uses executable=bun with argv=[test, ...] and never invokes a shell.
2. Reuse the repository's existing quoted-argv parser instead of maintaining a second keyword/token-count grammar. Accept only the Bun run and Bun test subcommands in supervised declared checks; preserve the fixed routing and doctor checks.
3. Permit normal inert argv for those Bun subcommands, including multiple test paths and quoted paths, while rejecting shell metacharacters, environment prefixes, unsupported executables, and unsupported Bun subcommands before process launch.
4. Preserve timeout selection, output tails, stop-on-first-failure behavior, and durable declared-check evidence.
5. Add regression coverage for accepted bun test and bun run arguments plus rejected injection/unsupported forms.
6. Run the focused verifier tests, the task-advance lifecycle suite, typecheck, formatting/lint for changed files, and test:critical.

Success: the exact P11 check bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts executes successfully through structured argv and can no longer create a false implementation-rework cycle. No shell is invoked and unsupported command families still fail closed.

Scope: packages/agentplane verifier parsing/execution and focused tests only. No natural-language task classification, policy, workflow, or release changes.

Rollback: revert the parser integration and its tests; existing three-token bun run behavior remains the fallback.

## Verify Steps

1. Run bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts. Expected: bun test with one or more repository paths is parsed into executable bun plus inert argv, quoted arguments remain single argv entries, and runProcess is called without a shell.
2. Exercise negative parser cases for shell metacharacters, environment prefixes, unsupported executables, and unsupported Bun subcommands. Expected: each is rejected before runProcess is called.
3. Run the exact P11 command bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts through supervised declared-check execution. Expected: status=passed and durable evidence records the exact command, exit code 0, and output tail.
4. Run bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts. Expected: all focused verifier and lifecycle regressions pass.
5. Run bun run typecheck and bun run test:critical. Expected: both pass.
6. Run lint, formatting, and git diff --check for changed files. Expected: no findings.
7. Inspect the final diff. Expected: changes stay inside verifier parsing/execution and focused tests; no shell execution, policy change, workflow change, or unrelated refactor is introduced.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-10T15:40:35.199Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T15:33:54.793Z, excerpt_hash=sha256:096ad1a48f15c3fef8ee0ada006dd0aaa185399688650edb1eb8d3afd6000260

Details:

Command: bun run test:critical
Result: pass
Evidence: .agentplane/tasks/202608101506-4Y8ZY0/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608101506-4Y8ZY0 declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608101506-4Y8ZY0/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608101506-4Y8ZY0 declared verification

Command: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
Result: fail
Evidence: .agentplane/tasks/202608101506-4Y8ZY0/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608101506-4Y8ZY0 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608101506-4Y8ZY0-accept-safe-shell-free-bun-test-checks-in-superv/.agentplane/tasks/202608101506-4Y8ZY0/blueprint/resolved-snapshot.json
- old_digest: e9896b989c3ebae1e6efacc43e759bc6c69e5978f2e09383e7e45ae2e30fda89
- current_digest: e9896b989c3ebae1e6efacc43e759bc6c69e5978f2e09383e7e45ae2e30fda89
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608101506-4Y8ZY0

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608101506-4Y8ZY0
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-10T15:53:41.698Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T15:47:35.335Z, excerpt_hash=sha256:096ad1a48f15c3fef8ee0ada006dd0aaa185399688650edb1eb8d3afd6000260

Details:

Command: bun run test:critical
Result: pass
Evidence: .agentplane/tasks/202608101506-4Y8ZY0/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608101506-4Y8ZY0 declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608101506-4Y8ZY0/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608101506-4Y8ZY0 declared verification

Command: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
Result: pass
Evidence: .agentplane/tasks/202608101506-4Y8ZY0/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608101506-4Y8ZY0 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608101506-4Y8ZY0-accept-safe-shell-free-bun-test-checks-in-superv/.agentplane/tasks/202608101506-4Y8ZY0/blueprint/resolved-snapshot.json
- old_digest: e9896b989c3ebae1e6efacc43e759bc6c69e5978f2e09383e7e45ae2e30fda89
- current_digest: e9896b989c3ebae1e6efacc43e759bc6c69e5978f2e09383e7e45ae2e30fda89
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608101506-4Y8ZY0

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608101506-4Y8ZY0
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
