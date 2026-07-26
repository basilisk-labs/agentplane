---
id: "202607221848-VC4VVS"
title: "Unify brief, next-action, runner, and Hermes on AgentWorkOrder v2"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 23
origin:
  system: "manual"
depends_on:
  - "202607221848-T9B3PS"
  - "202607221848-VBV9B1"
tags:
  - "hermes"
  - "milestone-alpha2"
  - "refactor"
  - "rf-05"
  - "rf-25"
  - "runner"
  - "v0.7"
  - "wave-contracts"
  - "work-order"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run guards:check"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-26T08:57:43.713Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-26T16:21:53.406Z"
  updated_by: "TESTER"
  note: "TESTER confirmed 70e456c: fast CI 466 files/3232 tests, critical CLI 11/11, Knip 546/546, trust ratchet 12, focused 37/37, typecheck, lifecycle, guards, and docs checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-26T16:25:11.809Z"
  updated_by: "EVALUATOR"
  note: "Independent review of 70e456c passes: the Knip public API ratchet removes only stale facade debt, preserves private TaskBrief trust-boundary coverage, and has fresh deterministic evidence."
  evaluated_sha: "70e456c70ebf6b95e8892401795661c73f0d247d"
  blueprint_digest: "50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b"
  evidence_refs:
    - ".agentplane/tasks/202607221848-VC4VVS/README.md"
    - ".agentplane/tasks/202607221848-VC4VVS/quality/20260726-162511809-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221848-VC4VVS/quality/20260726-162511809-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221848-VC4VVS/quality/20260726-162511809-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json"
    - "git show --check 70e456c70ebf6b95e8892401795661c73f0d247d"
    - "bun run ci:local:fast: pass (466 files / 3232 tests; critical CLI 11/11)"
    - "focused RF05b Vitest: pass (4 files / 37 tests)"
    - "bun run knip:check; bun run trust:ratchet:check; bun run typecheck: pass"
  findings:
    - "TaskBrief is private but used by the legacy projection and remains indexed by the ratchet; removed facade exports are not reintroduced, while SourceManifest remains exported only from its required internal projection module."
    - "Knip semantic delta removes only PromptModuleDiagnostic; no entries were added, and the 178/367/546 baseline matches the current checker."
commit:
  hash: "70e456c70ebf6b95e8892401795661c73f0d247d"
  message: "🐛 VC4VVS task: repair Knip public API ratchet"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-26T10:53:22.520Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-26T10:57:41.946Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework required: the current branch contains only task/blueprint/PR artifacts and no implementation paths for the approved AgentWorkOrder v2 scope."
  -
    type: "verify"
    at: "2026-07-26T12:07:59.217Z"
    author: "CODER"
    state: "ok"
    note: "Rework at cd59e4d7 adds the approved AgentWorkOrder v2 production paths and passes declared checks."
  -
    type: "status"
    at: "2026-07-26T12:47:47.162Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-26T13:28:32.871Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-26T13:34:57.281Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Generated CLI reference is stale after adding explicit remote options."
  -
    type: "verify"
    at: "2026-07-26T15:24:04.065Z"
    author: "TESTER"
    state: "ok"
    note: "TESTER confirmed 81570066: clean worktree; fast CI 466 files/3232 tests, critical 11/11, focused 88/88 passed."
  -
    type: "status"
    at: "2026-07-26T15:26:41.304Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-26T16:12:27.894Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Hosted Core CI run 30208318242 failed verify-static (Knip new unused VC4 exports/types and stale PromptModuleDiagnostic); PR verification consequently failed. Rework required before publication."
  -
    type: "verify"
    at: "2026-07-26T16:21:53.406Z"
    author: "TESTER"
    state: "ok"
    note: "TESTER confirmed 70e456c: fast CI 466 files/3232 tests, critical CLI 11/11, Knip 546/546, trust ratchet 12, focused 37/37, typecheck, lifecycle, guards, and docs checks passed."
  -
    type: "status"
    at: "2026-07-26T16:26:15.753Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-26T16:26:15.753Z"
doc_updated_by: "CODER"
description: "RF-05b/RF-25c: make task brief, next-action, runner bootstrap, and Hermes projections views of one prepared AgentWorkOrder v2 result instead of independent route/context reconstruction."
sections:
  Summary: |-
    Unify brief, next-action, runner, and Hermes on AgentWorkOrder v2

    RF-05b/RF-25c: make task brief, next-action, runner bootstrap, and Hermes projections views of one prepared AgentWorkOrder v2 result instead of independent route/context reconstruction.
  Scope: |-
    - In scope: one in-process work-order builder, typed use-case result, human/JSON compatibility renderers, shared remote policy, prompt compilation, source/test context manifests, and deletion of unsafe casts and duplicate snake/camel aliases from the v2 surface.
    - Out of scope: removing the announced v1 compatibility output during its support window.
  Plan: |-
    1. Build AgentWorkOrder once from task, route, policy, Git, knowledge, prompt, and verification inputs.
    2. Return a typed use-case result independent of stdout.
    3. Render brief, next-action, runner, and Hermes compatibility views from that result.
    4. Use the real prompt-module compiler and fail preparation on error diagnostics.
    5. Remove duplicated reconstruction and add cross-surface equality/freshness fixtures.
  Verify Steps: |-
    1. Prepare one task through brief, next-action, runner, and Hermes paths. Expected: all views share one work-order id, fingerprint, remote policy, route step, source manifest, and verification intent.
    2. Change task/Git/policy state after preparation. Expected: every invocation path rejects the same stale work order.
    3. Introduce a prompt compiler error. Expected: all launch surfaces stop before agent execution.
    4. Compare v1 compatibility and v2 JSON snapshots. Expected: v1 remains explicit and v2 has one casing without duplicate aliases.
    5. Run focused route/brief/runner/Hermes tests, lifecycle invariants, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-26T10:57:41.946Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework required: the current branch contains only task/blueprint/PR artifacts and no implementation paths for the approved AgentWorkOrder v2 scope.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T10:53:22.520Z, excerpt_hash=sha256:d2f6c6f20f6879962cc44710c469d54d50ecf5b8cd8c7fb3dae9389597c7fc90

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VC4VVS-unify-brief-next-action-runner-and-hermes-on-age/.agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json
    - old_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
    - current_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221848-VC4VVS

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221848-VC4VVS
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-26T12:07:59.217Z — VERIFY — ok

    By: CODER

    Note: Rework at cd59e4d7 adds the approved AgentWorkOrder v2 production paths and passes declared checks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T10:57:42.605Z, excerpt_hash=sha256:d2f6c6f20f6879962cc44710c469d54d50ecf5b8cd8c7fb3dae9389597c7fc90

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VC4VVS-unify-brief-next-action-runner-and-hermes-on-age/.agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json
    - old_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
    - current_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221848-VC4VVS

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

    ### 2026-07-26T13:34:57.281Z — VERIFY — needs_rework

    By: TESTER

    Note: Generated CLI reference is stale after adding explicit remote options.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T13:28:32.872Z, excerpt_hash=sha256:d2f6c6f20f6879962cc44710c469d54d50ecf5b8cd8c7fb3dae9389597c7fc90

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VC4VVS-unify-brief-next-action-runner-and-hermes-on-age/.agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json
    - old_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
    - current_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221848-VC4VVS

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task next-action 202607221848-VC4VVS --remote --explain
    - diagnostic_command: agentplane task next-action 202607221848-VC4VVS --remote --explain
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-26T15:24:04.065Z — VERIFY — ok

    By: TESTER

    Note: TESTER confirmed 81570066: clean worktree; fast CI 466 files/3232 tests, critical 11/11, focused 88/88 passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T13:34:58.093Z, excerpt_hash=sha256:d2f6c6f20f6879962cc44710c469d54d50ecf5b8cd8c7fb3dae9389597c7fc90

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VC4VVS-unify-brief-next-action-runner-and-hermes-on-age/.agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json
    - old_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
    - current_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221848-VC4VVS

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

    ### 2026-07-26T16:12:27.894Z — VERIFY — needs_rework

    By: TESTER

    Note: Hosted Core CI run 30208318242 failed verify-static (Knip new unused VC4 exports/types and stale PromptModuleDiagnostic); PR verification consequently failed. Rework required before publication.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T15:26:41.305Z, excerpt_hash=sha256:d2f6c6f20f6879962cc44710c469d54d50ecf5b8cd8c7fb3dae9389597c7fc90

    Details:

    GitHub PR #4632, head 57610db86c9ff62e4d816d5f157b6bee9a30ecd2. Local corrective diff is independently reviewed and uncommitted; this record captures the completed hosted failure, not a new test result.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VC4VVS-unify-brief-next-action-runner-and-hermes-on-age/.agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json
    - old_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
    - current_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221848-VC4VVS

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

    ### 2026-07-26T16:21:53.406Z — VERIFY — ok

    By: TESTER

    Note: TESTER confirmed 70e456c: fast CI 466 files/3232 tests, critical CLI 11/11, Knip 546/546, trust ratchet 12, focused 37/37, typecheck, lifecycle, guards, and docs checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T16:12:28.643Z, excerpt_hash=sha256:d2f6c6f20f6879962cc44710c469d54d50ecf5b8cd8c7fb3dae9389597c7fc90

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VC4VVS-unify-brief-next-action-runner-and-hermes-on-age/.agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json
    - old_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
    - current_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221848-VC4VVS

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
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: |-
    - Observation: Compared with main, changed paths are limited to .agentplane/tasks/202607221848-VC4VVS artifacts.
      Impact: The declared behavioral Verify Steps cannot be satisfied without a source implementation.
      Resolution: Return the task to CODER for the approved implementation, then run the declared focused and contract checks.

    - Observation: Clean task worktree at cd59e4d7; guards:check, lifecycle:invariants, test:critical (11 files/72 tests), typecheck, and agent-work-order.integration.test.ts (3 tests) passed.
      Impact: The initial needs_rework finding is resolved: the branch now contains source implementation plus cross-surface integration coverage.
      Resolution: Record CODER verification and return route to TESTER; no PR or provider action performed.

    - Observation: ci:local:fast failed docs:cli:check
      Impact: PR cannot be safely published
      Resolution: Regenerate and review CLI reference, then rerun full-fast.

    - Observation: Command: bun run ci:local:fast; Result: pass; Evidence: 466 files/3232 tests; Scope: RF05b work-order, route, manifest, fixtures, and generated CLI reference.
      Impact: The prior stale-CLI-reference rework is resolved locally; no hosted PR or provider action was performed.
      Resolution: Record local TESTER approval at 81570066 and recompute the route before any publication or integration.
extensions:
  implementation_commit:
    hash: "a6c34e0a4510c78ad0e72493d3c5b0172a89e328"
    message: "🐛 VC4VVS task: ratchet explicit remote CLI options"
  workflow_route_baseline:
    start_head_sha: "4da09cdaca713eb3be1576f00a4f57e72b1353db"
    version: 1
id_source: "generated"
---
## Summary

Unify brief, next-action, runner, and Hermes on AgentWorkOrder v2

RF-05b/RF-25c: make task brief, next-action, runner bootstrap, and Hermes projections views of one prepared AgentWorkOrder v2 result instead of independent route/context reconstruction.

## Scope

- In scope: one in-process work-order builder, typed use-case result, human/JSON compatibility renderers, shared remote policy, prompt compilation, source/test context manifests, and deletion of unsafe casts and duplicate snake/camel aliases from the v2 surface.
- Out of scope: removing the announced v1 compatibility output during its support window.

## Plan

1. Build AgentWorkOrder once from task, route, policy, Git, knowledge, prompt, and verification inputs.
2. Return a typed use-case result independent of stdout.
3. Render brief, next-action, runner, and Hermes compatibility views from that result.
4. Use the real prompt-module compiler and fail preparation on error diagnostics.
5. Remove duplicated reconstruction and add cross-surface equality/freshness fixtures.

## Verify Steps

1. Prepare one task through brief, next-action, runner, and Hermes paths. Expected: all views share one work-order id, fingerprint, remote policy, route step, source manifest, and verification intent.
2. Change task/Git/policy state after preparation. Expected: every invocation path rejects the same stale work order.
3. Introduce a prompt compiler error. Expected: all launch surfaces stop before agent execution.
4. Compare v1 compatibility and v2 JSON snapshots. Expected: v1 remains explicit and v2 has one casing without duplicate aliases.
5. Run focused route/brief/runner/Hermes tests, lifecycle invariants, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-26T10:57:41.946Z — VERIFY — needs_rework

By: TESTER

Note: Rework required: the current branch contains only task/blueprint/PR artifacts and no implementation paths for the approved AgentWorkOrder v2 scope.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T10:53:22.520Z, excerpt_hash=sha256:d2f6c6f20f6879962cc44710c469d54d50ecf5b8cd8c7fb3dae9389597c7fc90

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VC4VVS-unify-brief-next-action-runner-and-hermes-on-age/.agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json
- old_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
- current_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221848-VC4VVS

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221848-VC4VVS
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-26T12:07:59.217Z — VERIFY — ok

By: CODER

Note: Rework at cd59e4d7 adds the approved AgentWorkOrder v2 production paths and passes declared checks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T10:57:42.605Z, excerpt_hash=sha256:d2f6c6f20f6879962cc44710c469d54d50ecf5b8cd8c7fb3dae9389597c7fc90

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VC4VVS-unify-brief-next-action-runner-and-hermes-on-age/.agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json
- old_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
- current_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221848-VC4VVS

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

### 2026-07-26T13:34:57.281Z — VERIFY — needs_rework

By: TESTER

Note: Generated CLI reference is stale after adding explicit remote options.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T13:28:32.872Z, excerpt_hash=sha256:d2f6c6f20f6879962cc44710c469d54d50ecf5b8cd8c7fb3dae9389597c7fc90

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VC4VVS-unify-brief-next-action-runner-and-hermes-on-age/.agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json
- old_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
- current_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221848-VC4VVS

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task next-action 202607221848-VC4VVS --remote --explain
- diagnostic_command: agentplane task next-action 202607221848-VC4VVS --remote --explain
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-26T15:24:04.065Z — VERIFY — ok

By: TESTER

Note: TESTER confirmed 81570066: clean worktree; fast CI 466 files/3232 tests, critical 11/11, focused 88/88 passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T13:34:58.093Z, excerpt_hash=sha256:d2f6c6f20f6879962cc44710c469d54d50ecf5b8cd8c7fb3dae9389597c7fc90

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VC4VVS-unify-brief-next-action-runner-and-hermes-on-age/.agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json
- old_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
- current_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221848-VC4VVS

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

### 2026-07-26T16:12:27.894Z — VERIFY — needs_rework

By: TESTER

Note: Hosted Core CI run 30208318242 failed verify-static (Knip new unused VC4 exports/types and stale PromptModuleDiagnostic); PR verification consequently failed. Rework required before publication.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T15:26:41.305Z, excerpt_hash=sha256:d2f6c6f20f6879962cc44710c469d54d50ecf5b8cd8c7fb3dae9389597c7fc90

Details:

GitHub PR #4632, head 57610db86c9ff62e4d816d5f157b6bee9a30ecd2. Local corrective diff is independently reviewed and uncommitted; this record captures the completed hosted failure, not a new test result.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VC4VVS-unify-brief-next-action-runner-and-hermes-on-age/.agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json
- old_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
- current_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221848-VC4VVS

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

### 2026-07-26T16:21:53.406Z — VERIFY — ok

By: TESTER

Note: TESTER confirmed 70e456c: fast CI 466 files/3232 tests, critical CLI 11/11, Knip 546/546, trust ratchet 12, focused 37/37, typecheck, lifecycle, guards, and docs checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T16:12:28.643Z, excerpt_hash=sha256:d2f6c6f20f6879962cc44710c469d54d50ecf5b8cd8c7fb3dae9389597c7fc90

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VC4VVS-unify-brief-next-action-runner-and-hermes-on-age/.agentplane/tasks/202607221848-VC4VVS/blueprint/resolved-snapshot.json
- old_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
- current_digest: 50309d8cd21a0a68cf5481cf5ea2ed8e90ca936a04ac8bba4dba183cd6d3675b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221848-VC4VVS

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

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings

- Observation: Compared with main, changed paths are limited to .agentplane/tasks/202607221848-VC4VVS artifacts.
  Impact: The declared behavioral Verify Steps cannot be satisfied without a source implementation.
  Resolution: Return the task to CODER for the approved implementation, then run the declared focused and contract checks.

- Observation: Clean task worktree at cd59e4d7; guards:check, lifecycle:invariants, test:critical (11 files/72 tests), typecheck, and agent-work-order.integration.test.ts (3 tests) passed.
  Impact: The initial needs_rework finding is resolved: the branch now contains source implementation plus cross-surface integration coverage.
  Resolution: Record CODER verification and return route to TESTER; no PR or provider action performed.

- Observation: ci:local:fast failed docs:cli:check
  Impact: PR cannot be safely published
  Resolution: Regenerate and review CLI reference, then rerun full-fast.

- Observation: Command: bun run ci:local:fast; Result: pass; Evidence: 466 files/3232 tests; Scope: RF05b work-order, route, manifest, fixtures, and generated CLI reference.
  Impact: The prior stale-CLI-reference rework is resolved locally; no hosted PR or provider action was performed.
  Resolution: Record local TESTER approval at 81570066 and recompute the route before any publication or integration.
