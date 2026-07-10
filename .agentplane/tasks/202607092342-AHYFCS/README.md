---
id: "202607092342-AHYFCS"
title: "Enforce cross-surface context integrity for v0.6.22"
result_summary: "pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "patch-0.6.22"
  - "quality"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/context/check.unit.test.ts packages/agentplane/src/commands/context/wiki-reports.unit.test.ts packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T23:43:16.688Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-10T00:13:21.353Z"
  updated_by: "CODER"
  note: "Verified: review fix ignores hidden .obsidian and raw archive directories; 10 focused tests, typecheck, lint, diff check, prior full ci:contract, 2,132-test fast suite, and critical CLI remain green."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T00:13:23.689Z"
  updated_by: "EVALUATOR"
  note: "Cross-surface integrity is strict for managed context while preserving ignored hidden directories."
  evaluated_sha: "0c828f95913c21997368cbd31741a99dd22ed834"
  blueprint_digest: "a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2"
  evidence_refs:
    - ".agentplane/tasks/202607092342-AHYFCS/README.md"
    - ".agentplane/tasks/202607092342-AHYFCS/quality/20260710-001323689-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607092342-AHYFCS/quality/20260710-001323689-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607092342-AHYFCS/quality/20260710-001323689-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607092342-AHYFCS/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/context/check.unit.test.ts"
  findings:
    - "The final collector skips hidden and service directories consistently with ingest and wiki report traversal; focused regression coverage verifies ignored vault/plugin and raw archive paths."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement global cross-surface context integrity checks and regression coverage for v0.6.22."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-09T23:43:35.553Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement global cross-surface context integrity checks and regression coverage for v0.6.22."
  -
    type: "verify"
    at: "2026-07-09T23:53:41.766Z"
    author: "CODER"
    state: "ok"
    note: "Verified: cross-surface graph, entity page policy, raw manifest coverage, and report freshness gates pass 40 focused tests, typecheck, lint, diff check, and ci:contract."
  -
    type: "verify"
    at: "2026-07-10T00:08:14.065Z"
    author: "CODER"
    state: "ok"
    note: "Verified: current main-targeting PR head preserves the passing integrity tests, 2,132-test full fast suite, critical CLI suite, typecheck, lint, and ci:contract evidence."
  -
    type: "status"
    at: "2026-07-10T00:08:38.183Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-10T00:12:59.924Z"
    author: "CODER"
    state: "needs_rework"
    note: "Rework: PR review identified hidden .obsidian and raw archive directories must follow existing ingest/report exclusions before merge."
  -
    type: "verify"
    at: "2026-07-10T00:13:21.353Z"
    author: "CODER"
    state: "ok"
    note: "Verified: review fix ignores hidden .obsidian and raw archive directories; 10 focused tests, typecheck, lint, diff check, prior full ci:contract, 2,132-test fast suite, and critical CLI remain green."
doc_version: 3
doc_updated_at: "2026-07-10T00:13:21.657Z"
doc_updated_by: "CODER"
description: "Make global context checks validate wiki graph references, entity page policy, manifest/source coverage, and freshness of derived wiki reports so structurally valid but semantically disconnected context cannot pass."
sections:
  Summary: |-
    Enforce cross-surface context integrity for v0.6.22

    Make global context checks validate wiki graph references, entity page policy, manifest/source coverage, and freshness of derived wiki reports so structurally valid but semantically disconnected context cannot pass.
  Scope: |-
    - In scope: global read-only integrity validation across wiki, graph, manifest/raw source inventory, and derived link/orphan reports.
    - In scope: actionable diagnostics and regression tests.
    - Out of scope: rewriting existing repository wiki content, changing public context schemas, or implementing semantic search ranking.
  Plan: |-
    1. Add one reusable global integrity validator for wiki graph references, active entity page policy, manifest/raw source coverage, and freshness markers for link/orphan reports.
    2. Wire the validator into context check and doctor without weakening task-scoped maximum-assimilation verification.
    3. Add fixtures covering missing graph entities, stale reports, and untracked raw sources, while preserving valid legacy/minimal workspaces.
    4. Run focused tests, typecheck, and ci:contract.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/commands/context/check.unit.test.ts packages/agentplane/src/commands/context/wiki-reports.unit.test.ts packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts; broken graph refs, stale reports, and untracked raw source fixtures fail while valid fixtures pass.
    2. Run bun run typecheck; it passes.
    3. Run bun run ci:contract; it passes.
    4. Run git diff --check; it passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-09T23:53:41.766Z — VERIFY — ok

    By: CODER

    Note: Verified: cross-surface graph, entity page policy, raw manifest coverage, and report freshness gates pass 40 focused tests, typecheck, lint, diff check, and ci:contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-09T23:43:35.553Z, excerpt_hash=sha256:a048fab14dab3ec0b1cb44ac4e5067eb124319bc5f3d6256e3cd5dfb73d8b3d8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092342-AHYFCS-enforce-cross-surface-context-integrity-for-v0-6/.agentplane/tasks/202607092342-AHYFCS/blueprint/resolved-snapshot.json
    - old_digest: a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2
    - current_digest: a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607092342-AHYFCS

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607092342-AHYFCS
    - diagnostic_command: agentplane pr check 202607092342-AHYFCS
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-07-10T00:08:14.065Z — VERIFY — ok

    By: CODER

    Note: Verified: current main-targeting PR head preserves the passing integrity tests, 2,132-test full fast suite, critical CLI suite, typecheck, lint, and ci:contract evidence.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-09T23:53:41.875Z, excerpt_hash=sha256:a048fab14dab3ec0b1cb44ac4e5067eb124319bc5f3d6256e3cd5dfb73d8b3d8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092342-AHYFCS-enforce-cross-surface-context-integrity-for-v0-6/.agentplane/tasks/202607092342-AHYFCS/blueprint/resolved-snapshot.json
    - old_digest: a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2
    - current_digest: a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607092342-AHYFCS

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane finish 202607092342-AHYFCS --author CODER --body Verified: pre-merge closure packet is ready for the task PR. --result pre-merge closure --commit d68187dbcaedd4e35412aec44b18c62ddc9f3e78 --pre-merge-closure
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-07-10T00:12:59.924Z — VERIFY — needs_rework

    By: CODER

    Note: Rework: PR review identified hidden .obsidian and raw archive directories must follow existing ingest/report exclusions before merge.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T00:08:38.184Z, excerpt_hash=sha256:a048fab14dab3ec0b1cb44ac4e5067eb124319bc5f3d6256e3cd5dfb73d8b3d8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092342-AHYFCS-enforce-cross-surface-context-integrity-for-v0-6/.agentplane/tasks/202607092342-AHYFCS/blueprint/resolved-snapshot.json
    - old_digest: a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2
    - current_digest: a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607092342-AHYFCS

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607092342-AHYFCS --branch task/202607092342-AHYFCS/enforce-cross-surface-context-integrity-for-v0-6
    - diagnostic_command: agentplane pr check 202607092342-AHYFCS
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-07-10T00:13:21.353Z — VERIFY — ok

    By: CODER

    Note: Verified: review fix ignores hidden .obsidian and raw archive directories; 10 focused tests, typecheck, lint, diff check, prior full ci:contract, 2,132-test fast suite, and critical CLI remain green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T00:13:02.669Z, excerpt_hash=sha256:a048fab14dab3ec0b1cb44ac4e5067eb124319bc5f3d6256e3cd5dfb73d8b3d8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092342-AHYFCS-enforce-cross-surface-context-integrity-for-v0-6/.agentplane/tasks/202607092342-AHYFCS/blueprint/resolved-snapshot.json
    - old_digest: a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2
    - current_digest: a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607092342-AHYFCS

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607092342-AHYFCS --branch task/202607092342-AHYFCS/enforce-cross-surface-context-integrity-for-v0-6
    - diagnostic_command: agentplane pr check 202607092342-AHYFCS
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task commits.
    - Re-run the focused context checks and ci:contract to confirm the previous validation behavior is restored.
  Findings: ""
extensions:
  implementation_commit:
    hash: "1ac42ed68fef6764b464e114614fb99b02f102de"
    message: "🛡️ AHYFCS context: enforce cross-surface integrity"
id_source: "generated"
---
## Summary

Enforce cross-surface context integrity for v0.6.22

Make global context checks validate wiki graph references, entity page policy, manifest/source coverage, and freshness of derived wiki reports so structurally valid but semantically disconnected context cannot pass.

## Scope

- In scope: global read-only integrity validation across wiki, graph, manifest/raw source inventory, and derived link/orphan reports.
- In scope: actionable diagnostics and regression tests.
- Out of scope: rewriting existing repository wiki content, changing public context schemas, or implementing semantic search ranking.

## Plan

1. Add one reusable global integrity validator for wiki graph references, active entity page policy, manifest/raw source coverage, and freshness markers for link/orphan reports.
2. Wire the validator into context check and doctor without weakening task-scoped maximum-assimilation verification.
3. Add fixtures covering missing graph entities, stale reports, and untracked raw sources, while preserving valid legacy/minimal workspaces.
4. Run focused tests, typecheck, and ci:contract.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/commands/context/check.unit.test.ts packages/agentplane/src/commands/context/wiki-reports.unit.test.ts packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts; broken graph refs, stale reports, and untracked raw source fixtures fail while valid fixtures pass.
2. Run bun run typecheck; it passes.
3. Run bun run ci:contract; it passes.
4. Run git diff --check; it passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-09T23:53:41.766Z — VERIFY — ok

By: CODER

Note: Verified: cross-surface graph, entity page policy, raw manifest coverage, and report freshness gates pass 40 focused tests, typecheck, lint, diff check, and ci:contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-09T23:43:35.553Z, excerpt_hash=sha256:a048fab14dab3ec0b1cb44ac4e5067eb124319bc5f3d6256e3cd5dfb73d8b3d8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092342-AHYFCS-enforce-cross-surface-context-integrity-for-v0-6/.agentplane/tasks/202607092342-AHYFCS/blueprint/resolved-snapshot.json
- old_digest: a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2
- current_digest: a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607092342-AHYFCS

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607092342-AHYFCS
- diagnostic_command: agentplane pr check 202607092342-AHYFCS
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-07-10T00:08:14.065Z — VERIFY — ok

By: CODER

Note: Verified: current main-targeting PR head preserves the passing integrity tests, 2,132-test full fast suite, critical CLI suite, typecheck, lint, and ci:contract evidence.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-09T23:53:41.875Z, excerpt_hash=sha256:a048fab14dab3ec0b1cb44ac4e5067eb124319bc5f3d6256e3cd5dfb73d8b3d8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092342-AHYFCS-enforce-cross-surface-context-integrity-for-v0-6/.agentplane/tasks/202607092342-AHYFCS/blueprint/resolved-snapshot.json
- old_digest: a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2
- current_digest: a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607092342-AHYFCS

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane finish 202607092342-AHYFCS --author CODER --body Verified: pre-merge closure packet is ready for the task PR. --result pre-merge closure --commit d68187dbcaedd4e35412aec44b18c62ddc9f3e78 --pre-merge-closure
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-07-10T00:12:59.924Z — VERIFY — needs_rework

By: CODER

Note: Rework: PR review identified hidden .obsidian and raw archive directories must follow existing ingest/report exclusions before merge.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T00:08:38.184Z, excerpt_hash=sha256:a048fab14dab3ec0b1cb44ac4e5067eb124319bc5f3d6256e3cd5dfb73d8b3d8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092342-AHYFCS-enforce-cross-surface-context-integrity-for-v0-6/.agentplane/tasks/202607092342-AHYFCS/blueprint/resolved-snapshot.json
- old_digest: a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2
- current_digest: a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607092342-AHYFCS

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607092342-AHYFCS --branch task/202607092342-AHYFCS/enforce-cross-surface-context-integrity-for-v0-6
- diagnostic_command: agentplane pr check 202607092342-AHYFCS
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-07-10T00:13:21.353Z — VERIFY — ok

By: CODER

Note: Verified: review fix ignores hidden .obsidian and raw archive directories; 10 focused tests, typecheck, lint, diff check, prior full ci:contract, 2,132-test fast suite, and critical CLI remain green.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T00:13:02.669Z, excerpt_hash=sha256:a048fab14dab3ec0b1cb44ac4e5067eb124319bc5f3d6256e3cd5dfb73d8b3d8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092342-AHYFCS-enforce-cross-surface-context-integrity-for-v0-6/.agentplane/tasks/202607092342-AHYFCS/blueprint/resolved-snapshot.json
- old_digest: a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2
- current_digest: a8361a32f0a7051b16c3aab0dd86d3e3de499bf7cfbbd6ecedff558e63c892a2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607092342-AHYFCS

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607092342-AHYFCS --branch task/202607092342-AHYFCS/enforce-cross-surface-context-integrity-for-v0-6
- diagnostic_command: agentplane pr check 202607092342-AHYFCS
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task commits.
- Re-run the focused context checks and ci:contract to confirm the previous validation behavior is restored.

## Findings
