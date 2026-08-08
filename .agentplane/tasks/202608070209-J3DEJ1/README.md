---
id: "202608070209-J3DEJ1"
title: "Harden automatic task intake against unknown intent and stale locks"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on:
  - "202608061646-30TKV4"
tags:
  - "code"
verify:
  - "bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-readme-io.test.ts packages/agentplane/src/runtime/task-routing/resolve.test.ts packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts"
  - "bun run typecheck"
  - "bun run ci:contract"
plan_approval:
  state: "approved"
  updated_at: "2026-08-07T02:09:25.021Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-08T02:34:58.265Z"
  updated_by: "TESTER"
  note: "All local and hosted acceptance checks passed for implementation commit 1f452c38 and PR head 839d615a."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-08T02:36:04.132Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "1f452c38f24122aa1ce00e9ba7c38afc388ff8a6"
  blueprint_digest: "67be03c5bf385fd03a972ca395680961064d3f079059ea55a5d14681478c55c6"
  evidence_refs:
    - ".agentplane/tasks/202608070209-J3DEJ1/quality/20260808-023516368-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608070209-J3DEJ1/quality/20260808-023516368-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608070209-J3DEJ1/quality/objects/sha256/05a9711a127a89045099c6b661407a1deed83cbb60c9ff4a40a1432525c028d3.md"
    - ".agentplane/tasks/202608070209-J3DEJ1/quality/20260808-023516368-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608070209-J3DEJ1/quality/20260808-023516368-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608070209-J3DEJ1/quality/20260808-023516368-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608070209-J3DEJ1/README.md"
    - ".agentplane/tasks/202608070209-J3DEJ1/quality/objects/sha256/6d5ee6502327b98e935bc94e6e7ce7dbde9c0a6d4d847aaee9ff3708fdc67de3.patch"
    - ".agentplane/tasks/202608070209-J3DEJ1/quality/objects/sha256/eb542046354cbf2b54e32e9e69ba5e8314d6e70c9f20e266366bd02a5f731b6d.json"
    - ".agentplane/tasks/202608070209-J3DEJ1/verification/20260808023458265-d2416214d187e60f.json"
    - ".agentplane/tasks/202608070209-J3DEJ1/quality/objects/sha256/a2ba69a380e48f032b46d95590f3b233521dff6a4ddef6ed545527402c3e3d8e.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Final repository cleanliness evidence is not included in the frozen verification packet."
token_usage:
  agent_runs: 1
  input_tokens: 203548
  journal_digest: "sha256:74db76b5619b1e5efe9400da06493353de641d5de7fc05ac59b378b0057ff1b4"
  observed_agent_runs: 1
  observed_by: "agentplane"
  output_tokens: 1924
  reasoning_tokens: 425
  schema_version: 1
  source: "supervisor_journal"
  state: "observed"
  total_tokens: 205897
  unavailable_reason: null
  updated_at: "2026-08-08T02:36:40.231Z"
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "839d615a8fcf35ff3bc45b562579b216adbf12e9"
  message: "🧩 J3DEJ1 task: record implementation evidence"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: unknown natural-language outcomes now persist an explicit unknown mutation scope and require confirmation; stale task-creation locks recover through serialized claims while unverifiable locks remain fail-closed. Focused 18/18, critical CLI 84/84, core 394/394, typecheck, and ci:contract passed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-08T02:08:29.760Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-08T02:25:11.783Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: unknown natural-language outcomes now persist an explicit unknown mutation scope and require confirmation; stale task-creation locks recover through serialized claims while unverifiable locks remain fail-closed. Focused 18/18, critical CLI 84/84, core 394/394, typecheck, and ci:contract passed."
  -
    type: "verify"
    at: "2026-08-08T02:33:27.722Z"
    author: "TESTER"
    state: "ok"
    note: "Unknown-intent routing and stale-lock recovery verified on implementation commit 1f452c38 and PR head 839d615a."
  -
    type: "verify"
    at: "2026-08-08T02:34:58.265Z"
    author: "TESTER"
    state: "ok"
    note: "All local and hosted acceptance checks passed for implementation commit 1f452c38 and PR head 839d615a."
  -
    type: "status"
    at: "2026-08-08T02:36:40.231Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-08T02:36:40.241Z"
doc_updated_by: "CODER"
description: "Treat unmatched natural-language outcomes as unknown instead of safe direct; make repository-wide task creation locking safely recoverable after process interruption; add regression and recovery tests before 0.7.5."
sections:
  Summary: |-
    Harden automatic task intake against unknown intent and stale locks

    Treat unmatched natural-language outcomes as unknown instead of safe direct; make repository-wide task creation locking safely recoverable after process interruption; add regression and recovery tests before 0.7.5.
  Scope: |-
    - In scope: Treat unmatched natural-language outcomes as unknown instead of safe direct; make repository-wide task creation locking safely recoverable after process interruption; add regression and recovery tests before 0.7.5.
    - Out of scope: unrelated refactors not required for "Harden automatic task intake against unknown intent and stale locks".
  Plan: "1. Replace the unmatched-intent direct fallback with an explicit unknown/confirmation route while preserving explainable recognized classifications. 2. Replace or harden the repository-wide creation lock so an interrupted process cannot block future task creation, without reintroducing duplicate-ID races. 3. Add focused classification, interruption-recovery, duplicate, and CLI regression tests. 4. Run focused tests plus typecheck, formatting, lint, Knip, compatibility, Windows, and hosted PR checks."
  Verify Steps: |-
    1. Run the focused core lock, route resolver, and user-first CLI suites. Expected: unknown outcomes require confirmation and branch isolation; explicit code outcomes retain the direct route; stale same-host process locks recover; malformed or unverifiable locks remain fail-closed; concurrent creators produce one task.
    2. Run `bun run typecheck`. Expected: all workspace packages typecheck.
    3. Run `bun run ci:contract`. Expected: formatting, schemas, compatibility, architecture, clone, Knip, and coverage contract gates pass.
    4. Run hosted Windows, unit, static, critical, contract, coverage, docs, and CodeQL checks on the exact PR head. Expected: all required checks pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-08T02:33:27.722Z — VERIFY — ok

    By: TESTER

    Note: Unknown-intent routing and stale-lock recovery verified on implementation commit 1f452c38 and PR head 839d615a.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T02:25:11.783Z, excerpt_hash=sha256:6c65d3895482f8de2d6e290107cf68ece00194ea75dd5dcdcaf0d012970b04ca

    Details:

    Focused suites: 18/18 passed. Core package: 394/394 passed. Critical CLI: 12/12 chunks, 84/84 passed. Typecheck and ci:contract passed locally. Hosted PR #4797 on head 839d615a8fcf35ff3bc45b562579b216adbf12e9: Windows, unit, static, critical CLI, contract, coverage, workflow, package runtimes, docs, CodeQL, and aggregate PR verification all passed. Unknown fallback persists mutation_scope=unknown with mutation_scope_unknown branch isolation and confirmation_required=true; explicit code verbs retain code.direct. Stale exact process locks recover through serialized claims; malformed or unverifiable locks remain fail-closed; duplicate creators remain serialized.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608070209-J3DEJ1-harden-automatic-task-intake-against-unknown-int/.agentplane/tasks/202608070209-J3DEJ1/blueprint/resolved-snapshot.json
    - old_digest: 67be03c5bf385fd03a972ca395680961064d3f079059ea55a5d14681478c55c6
    - current_digest: 67be03c5bf385fd03a972ca395680961064d3f079059ea55a5d14681478c55c6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608070209-J3DEJ1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608070209-J3DEJ1
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-08T02:34:58.265Z — VERIFY — ok

    By: TESTER

    Note: All local and hosted acceptance checks passed for implementation commit 1f452c38 and PR head 839d615a.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T02:33:28.619Z, excerpt_hash=sha256:6c65d3895482f8de2d6e290107cf68ece00194ea75dd5dcdcaf0d012970b04ca

    Details:

    Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-readme-io.test.ts packages/agentplane/src/runtime/task-routing/resolve.test.ts packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts
    Result: pass; 3 files and 18 tests passed.
    Evidence: local process exited 0 after the repo-local runtime was rebuilt from the evaluated source.
    Scope: unknown-intent classification, route isolation, stale and unverifiable task locks, same-process recovery contention, interrupted CLI creation, and cross-process duplicate serialization.

    Command: bun run ci:core && bun run test:critical && bun run typecheck
    Result: pass; core 31 files/394 tests, critical CLI 12 chunks/84 tests, and workspace typecheck passed.
    Evidence: all three local commands exited 0 on implementation commit 1f452c38.
    Scope: complete core package regressions, critical CLI behavior, and TypeScript contracts.

    Command: bun run ci:contract
    Result: pass; all contract gates passed.
    Evidence: format, schemas, policy, compatibility 263/180/843, TypeScript 7 toolchain, architecture, clone, Knip, and coverage thresholds exited 0.
    Scope: repository-wide static and compatibility contracts.

    Command: gh pr checks 4797 --watch
    Result: pass; exact PR head 839d615a8fcf35ff3bc45b562579b216adbf12e9 passed.
    Evidence: Windows, unit, static, critical CLI, contract, coverage, workflow, package runtimes, docs, CodeQL, and aggregate PR verification all completed successfully.
    Scope: hosted Linux and Windows execution plus security and documentation gates.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608070209-J3DEJ1-harden-automatic-task-intake-against-unknown-int/.agentplane/tasks/202608070209-J3DEJ1/blueprint/resolved-snapshot.json
    - old_digest: 67be03c5bf385fd03a972ca395680961064d3f079059ea55a5d14681478c55c6
    - current_digest: 67be03c5bf385fd03a972ca395680961064d3f079059ea55a5d14681478c55c6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608070209-J3DEJ1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608070209-J3DEJ1
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
  implementation_commit:
    hash: "1f452c38f24122aa1ce00e9ba7c38afc388ff8a6"
    message: "🐛 J3DEJ1 code: recover stale creation locks"
  workflow_route_baseline:
    start_head_sha: "17632349ed759437d905d0945933c3d99ad3fea8"
    version: 1
id_source: "generated"
---
## Summary

Harden automatic task intake against unknown intent and stale locks

Treat unmatched natural-language outcomes as unknown instead of safe direct; make repository-wide task creation locking safely recoverable after process interruption; add regression and recovery tests before 0.7.5.

## Scope

- In scope: Treat unmatched natural-language outcomes as unknown instead of safe direct; make repository-wide task creation locking safely recoverable after process interruption; add regression and recovery tests before 0.7.5.
- Out of scope: unrelated refactors not required for "Harden automatic task intake against unknown intent and stale locks".

## Plan

1. Replace the unmatched-intent direct fallback with an explicit unknown/confirmation route while preserving explainable recognized classifications. 2. Replace or harden the repository-wide creation lock so an interrupted process cannot block future task creation, without reintroducing duplicate-ID races. 3. Add focused classification, interruption-recovery, duplicate, and CLI regression tests. 4. Run focused tests plus typecheck, formatting, lint, Knip, compatibility, Windows, and hosted PR checks.

## Verify Steps

1. Run the focused core lock, route resolver, and user-first CLI suites. Expected: unknown outcomes require confirmation and branch isolation; explicit code outcomes retain the direct route; stale same-host process locks recover; malformed or unverifiable locks remain fail-closed; concurrent creators produce one task.
2. Run `bun run typecheck`. Expected: all workspace packages typecheck.
3. Run `bun run ci:contract`. Expected: formatting, schemas, compatibility, architecture, clone, Knip, and coverage contract gates pass.
4. Run hosted Windows, unit, static, critical, contract, coverage, docs, and CodeQL checks on the exact PR head. Expected: all required checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-08T02:33:27.722Z — VERIFY — ok

By: TESTER

Note: Unknown-intent routing and stale-lock recovery verified on implementation commit 1f452c38 and PR head 839d615a.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T02:25:11.783Z, excerpt_hash=sha256:6c65d3895482f8de2d6e290107cf68ece00194ea75dd5dcdcaf0d012970b04ca

Details:

Focused suites: 18/18 passed. Core package: 394/394 passed. Critical CLI: 12/12 chunks, 84/84 passed. Typecheck and ci:contract passed locally. Hosted PR #4797 on head 839d615a8fcf35ff3bc45b562579b216adbf12e9: Windows, unit, static, critical CLI, contract, coverage, workflow, package runtimes, docs, CodeQL, and aggregate PR verification all passed. Unknown fallback persists mutation_scope=unknown with mutation_scope_unknown branch isolation and confirmation_required=true; explicit code verbs retain code.direct. Stale exact process locks recover through serialized claims; malformed or unverifiable locks remain fail-closed; duplicate creators remain serialized.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608070209-J3DEJ1-harden-automatic-task-intake-against-unknown-int/.agentplane/tasks/202608070209-J3DEJ1/blueprint/resolved-snapshot.json
- old_digest: 67be03c5bf385fd03a972ca395680961064d3f079059ea55a5d14681478c55c6
- current_digest: 67be03c5bf385fd03a972ca395680961064d3f079059ea55a5d14681478c55c6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608070209-J3DEJ1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608070209-J3DEJ1
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-08T02:34:58.265Z — VERIFY — ok

By: TESTER

Note: All local and hosted acceptance checks passed for implementation commit 1f452c38 and PR head 839d615a.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T02:33:28.619Z, excerpt_hash=sha256:6c65d3895482f8de2d6e290107cf68ece00194ea75dd5dcdcaf0d012970b04ca

Details:

Command: bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-readme-io.test.ts packages/agentplane/src/runtime/task-routing/resolve.test.ts packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts
Result: pass; 3 files and 18 tests passed.
Evidence: local process exited 0 after the repo-local runtime was rebuilt from the evaluated source.
Scope: unknown-intent classification, route isolation, stale and unverifiable task locks, same-process recovery contention, interrupted CLI creation, and cross-process duplicate serialization.

Command: bun run ci:core && bun run test:critical && bun run typecheck
Result: pass; core 31 files/394 tests, critical CLI 12 chunks/84 tests, and workspace typecheck passed.
Evidence: all three local commands exited 0 on implementation commit 1f452c38.
Scope: complete core package regressions, critical CLI behavior, and TypeScript contracts.

Command: bun run ci:contract
Result: pass; all contract gates passed.
Evidence: format, schemas, policy, compatibility 263/180/843, TypeScript 7 toolchain, architecture, clone, Knip, and coverage thresholds exited 0.
Scope: repository-wide static and compatibility contracts.

Command: gh pr checks 4797 --watch
Result: pass; exact PR head 839d615a8fcf35ff3bc45b562579b216adbf12e9 passed.
Evidence: Windows, unit, static, critical CLI, contract, coverage, workflow, package runtimes, docs, CodeQL, and aggregate PR verification all completed successfully.
Scope: hosted Linux and Windows execution plus security and documentation gates.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608070209-J3DEJ1-harden-automatic-task-intake-against-unknown-int/.agentplane/tasks/202608070209-J3DEJ1/blueprint/resolved-snapshot.json
- old_digest: 67be03c5bf385fd03a972ca395680961064d3f079059ea55a5d14681478c55c6
- current_digest: 67be03c5bf385fd03a972ca395680961064d3f079059ea55a5d14681478c55c6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608070209-J3DEJ1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608070209-J3DEJ1
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

## Token Usage

- State: `observed`
- Completeness: `1/1` agent runs
- Input tokens: `203548`
- Output tokens: `1924`
- Reasoning tokens: `425`
- Total tokens: `205897`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:74db76b5619b1e5efe9400da06493353de641d5de7fc05ac59b378b0057ff1b4`
- Unavailable reason: `none`
- Updated at: `2026-08-08T02:36:40.231Z`
