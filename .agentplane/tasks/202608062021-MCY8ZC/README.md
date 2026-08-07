---
id: "202608062021-MCY8ZC"
title: "Polish the external supervisor protocol and canonical task help"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 15
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "supervisor"
  - "ux"
  - "v0.7.5"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts"
  - "bun run docs:cli:check"
  - "bun run typecheck"
  - "bun run test:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T20:25:49.745Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-07T22:30:51.490Z"
  updated_by: "TESTER"
  note: "Rebased onto current main; protocol, compact help, generated docs, type safety, and all critical compatibility gates pass."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement protocol polish in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: exact external resume protocol, typed operator boundaries, dependency-safe routing, canonical task help, human plan provenance, and one-call branch worktree preparation."
events:
  -
    type: "status"
    at: "2026-08-06T21:35:28.888Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement protocol polish in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-06T21:58:48.882Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: exact external resume protocol, typed operator boundaries, dependency-safe routing, canonical task help, human plan provenance, and one-call branch worktree preparation."
  -
    type: "verify"
    at: "2026-08-06T22:01:33.652Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Task-local protocol, CLI, docs, typecheck, and shared suites pass (89 cli-core + 334 agentplane tests). Critical suite is blocked by the shared compatibility-contract ratchet owned by foundational task 202608061850-BZT3D9; do not duplicate its baseline update in this branch. Rebase after BZT3D9, rerun the exact Verify Steps, then record pass."
  -
    type: "verify"
    at: "2026-08-07T22:30:51.490Z"
    author: "TESTER"
    state: "ok"
    note: "Rebased onto current main; protocol, compact help, generated docs, type safety, and all critical compatibility gates pass."
doc_version: 3
doc_updated_at: "2026-08-07T22:30:52.475Z"
doc_updated_by: "CODER"
description: "Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, make quickstart and role command guides supervisor-first, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes."
sections:
  Summary: |-
    Polish the external supervisor protocol and canonical task help

    Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes.
  Scope: |-
    - In scope: Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes.
    - Out of scope: unrelated refactors not required for "Polish the external supervisor protocol and canonical task help".
  Plan: "1. Extend the external-agent packet with an exact result_path and structured resume_argv while preserving compatibility fields. 2. Return a typed, actionable operator boundary for approvals instead of a prose-only placeholder. 3. Rewrite runtime quickstart, role guidance, mode notes, and compact task help so normal agents see only task active, advance, run, and brief, while manual lifecycle commands remain forensic/operator-only behind help --all. 4. Correct explicit plan provenance in task begin with a human attribution or explicit plan-author contract. 5. Add an end-to-end branch_pr integration test starting task advance from the base checkout and asserting that automatic deterministic transitions produce a WorkOrder whose checkout, branch/head, writable roots, source manifest, and exchange paths all point to the created worktree without caller cwd changes. 6. Run critical compatibility and CLI documentation checks."
  Verify Steps: |-
    - bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
    - bun run docs:cli:check
    - bun run typecheck
    - bun run test:critical
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-06T22:01:33.652Z — VERIFY — needs_rework

    By: TESTER

    Note: Task-local protocol, CLI, docs, typecheck, and shared suites pass (89 cli-core + 334 agentplane tests). Critical suite is blocked by the shared compatibility-contract ratchet owned by foundational task 202608061850-BZT3D9; do not duplicate its baseline update in this branch. Rebase after BZT3D9, rerun the exact Verify Steps, then record pass.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T21:58:48.882Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
    - old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-MCY8ZC
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-07T22:30:51.490Z — VERIFY — ok

    By: TESTER

    Note: Rebased onto current main; protocol, compact help, generated docs, type safety, and all critical compatibility gates pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T22:01:34.506Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

    Details:

    Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
    Result: pass; 3 test files and 18 tests passed.
    Evidence: Vitest completed with exit code 0 in the authoritative MCY8ZC worktree.
    Scope: external supervisor packet, task routing, and command guide contracts.

    Command: bun run docs:cli:check
    Result: pass; generated CLI reference is current.
    Evidence: check-cli-reference-fresh exited 0 and reported the reference up to date.
    Scope: generated CLI documentation and compact task help.

    Command: bun run typecheck
    Result: pass.
    Evidence: run-typescript-build exited 0.
    Scope: repository TypeScript contracts after rebase and conflict resolution.

    Command: bun run test:critical
    Result: pass; all 12 chunks and 84 tests passed.
    Evidence: critical-cli runner exited 0; every chunk reported passed.
    Scope: compatibility baseline, replay hardening, exit codes, protected paths, symlink roots, and trust-boundary ratchets.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
    - old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: task next-action advertised start-ready as executable while task readiness still rejected it because a dependency was open.
      Impact: The route packet violated its executable-command contract and forced the caller into a failed lifecycle command.
      Resolution: Cover dependency readiness in route/action parity and preserve foundational merge ordering as an integration gate rather than an implementation blocker.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: bun run test:critical stops at run-cli.critical.agent-efficiency-baseline.test.ts because the immutable v0.7.4 compatibility candidate no longer matches current shared CLI and prompt surfaces.
      Impact: The task cannot receive a passing verification record or publish its PR head until the foundational compatibility baseline is merged.
      Resolution: Merge 202608061850-BZT3D9, rebase this branch, rerun targeted, docs, typecheck, and critical suites, then replace this rework record with verified evidence.
extensions:
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Polish the external supervisor protocol and canonical task help

Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes.

## Scope

- In scope: Return an exact result_path and structured resume_argv from task advance, expose a typed operator action at approval boundaries, show the canonical new/active/advance/run/brief subset in compact task help, attribute explicit begin plans to a human source, and add an end-to-end branch_pr test that advances once from the base checkout and receives a worktree-bound WorkOrder without caller cwd changes.
- Out of scope: unrelated refactors not required for "Polish the external supervisor protocol and canonical task help".

## Plan

1. Extend the external-agent packet with an exact result_path and structured resume_argv while preserving compatibility fields. 2. Return a typed, actionable operator boundary for approvals instead of a prose-only placeholder. 3. Rewrite runtime quickstart, role guidance, mode notes, and compact task help so normal agents see only task active, advance, run, and brief, while manual lifecycle commands remain forensic/operator-only behind help --all. 4. Correct explicit plan provenance in task begin with a human attribution or explicit plan-author contract. 5. Add an end-to-end branch_pr integration test starting task advance from the base checkout and asserting that automatic deterministic transitions produce a WorkOrder whose checkout, branch/head, writable roots, source manifest, and exchange paths all point to the created worktree without caller cwd changes. 6. Run critical compatibility and CLI documentation checks.

## Verify Steps

- bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
- bun run docs:cli:check
- bun run typecheck
- bun run test:critical

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-06T22:01:33.652Z — VERIFY — needs_rework

By: TESTER

Note: Task-local protocol, CLI, docs, typecheck, and shared suites pass (89 cli-core + 334 agentplane tests). Critical suite is blocked by the shared compatibility-contract ratchet owned by foundational task 202608061850-BZT3D9; do not duplicate its baseline update in this branch. Rebase after BZT3D9, rerun the exact Verify Steps, then record pass.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T21:58:48.882Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
- old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-MCY8ZC
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-07T22:30:51.490Z — VERIFY — ok

By: TESTER

Note: Rebased onto current main; protocol, compact help, generated docs, type safety, and all critical compatibility gates pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T22:01:34.506Z, excerpt_hash=sha256:e7b785b4af2458a5bf3ddea4bbab3158dc569e3b026d3f1b1fc95a2df69b1c31

Details:

Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts packages/agentplane/src/cli/command-guide.test.ts
Result: pass; 3 test files and 18 tests passed.
Evidence: Vitest completed with exit code 0 in the authoritative MCY8ZC worktree.
Scope: external supervisor packet, task routing, and command guide contracts.

Command: bun run docs:cli:check
Result: pass; generated CLI reference is current.
Evidence: check-cli-reference-fresh exited 0 and reported the reference up to date.
Scope: generated CLI documentation and compact task help.

Command: bun run typecheck
Result: pass.
Evidence: run-typescript-build exited 0.
Scope: repository TypeScript contracts after rebase and conflict resolution.

Command: bun run test:critical
Result: pass; all 12 chunks and 84 tests passed.
Evidence: critical-cli runner exited 0; every chunk reported passed.
Scope: compatibility baseline, replay hardening, exit codes, protected paths, symlink roots, and trust-boundary ratchets.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-MCY8ZC-polish-the-external-supervisor-protocol-and-cano/.agentplane/tasks/202608062021-MCY8ZC/blueprint/resolved-snapshot.json
- old_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- current_digest: 98d8bde50ed945a5db69126bdd4613eabfeda24055748a0c5e3462fd27b087e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-MCY8ZC

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
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

- Observation: task next-action advertised start-ready as executable while task readiness still rejected it because a dependency was open.
  Impact: The route packet violated its executable-command contract and forced the caller into a failed lifecycle command.
  Resolution: Cover dependency readiness in route/action parity and preserve foundational merge ordering as an integration gate rather than an implementation blocker.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: bun run test:critical stops at run-cli.critical.agent-efficiency-baseline.test.ts because the immutable v0.7.4 compatibility candidate no longer matches current shared CLI and prompt surfaces.
  Impact: The task cannot receive a passing verification record or publish its PR head until the foundational compatibility baseline is merged.
  Resolution: Merge 202608061850-BZT3D9, rebase this branch, rerun targeted, docs, typecheck, and critical suites, then replace this rework record with verified evidence.
