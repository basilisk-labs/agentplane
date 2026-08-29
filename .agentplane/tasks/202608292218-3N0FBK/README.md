---
id: "202608292218-3N0FBK"
title: "Prevent branch closeout while required WorkItems are incomplete"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 27
origin:
  system: "manual"
depends_on: []
tags:
  - "bootstrap-fix"
  - "task-centric"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run typecheck"
  - "bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-29T22:47:53.131Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:c19e38eb8e48f78702fb813eace7ab0c97821d1fb93b2bb8b175af439fb85847"
verification:
  state: "ok"
  updated_at: "2026-08-29T23:20:02.016Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-29T23:21:27.356Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 5 typed finding(s)."
  evaluated_sha: "f6dae0b382002f07850fd1d5f343eda0b7da6f97"
  blueprint_digest: "8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c"
  evidence_refs:
    - ".agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/0746e6bf83a188f6678201af5c5c2e782aaaa0faebaf297aeaf0f1b9057cf4c2.md"
    - ".agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608292218-3N0FBK/README.md"
    - ".agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/6508f2281bdb76c7a51465f00997415cbb1144f19fa37a27045d5eb8eeaa13cf.patch"
    - ".agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/705fd23cea4f0661155d847cbe29aa51c0c7ce19052019f39df3424f3d34d10d.json"
    - ".agentplane/tasks/202608292218-3N0FBK/verification/20260829232002016-276e3b6422ad5f09.json"
    - ".agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/9f512f0819486738a0914d14aafef8ee94d25191007e8e94c679c6aedca6fbd9.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "A non-optional current-plan WorkItem is treated as incomplete for every runtime state other than COMPLETED, including READY, PLANNED, missing runtime state, claimed, running, failed, or blocked states."
    - "The regression fixture proves stale commit, verification, and passing quality evidence cannot bypass a READY required WorkItem, while a COMPLETED WorkItem permits the existing closeout authority route."
    - "The evaluator calibration fixture was correctly updated to complete its synthetic WorkItem before asserting the post-implementation quality route."
    - "Supervisor-owned typecheck, focused integration tests, and the full local CI suite all passed at implementation commit f6dae0b382002f07850fd1d5f343eda0b7da6f97."
    - "Residual risk: The route module remains close to the 600-line hotspot ceiling, so future edits may require a separate structural extraction."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The fix changes central branch route selection and requires an isolated task branch plus hosted integration."
      - "The implementation is bounded to one route guard and its regression test."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-10"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "recorded-check-4"
        result: "pass"
      -
        id: "recorded-check-5"
        result: "pass"
      -
        id: "recorded-check-6"
        result: "pass"
      -
        id: "recorded-check-7"
        result: "pass"
      -
        id: "recorded-check-8"
        result: "pass"
      -
        id: "recorded-check-9"
        result: "pass"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:020f87f3064d322d4a688df68f6b1b819bc61486df111b35abdcf04504374614"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/workflow-step-branch.ts"
        - "central_component:packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-branch.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
      phase: "task"
      policy_floor:
        monotonic_strengthening: true
        pr_full_regression: true
        unknown_or_central_full_regression: true
      requires_full_regression: true
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "full_regression"
        - "hosted_integration"
        - "task_outcome"
      selector:
        bucket: null
        buckets: []
        execution_mode: "semantic"
        kind: "semantic"
        lint_targets: []
        reason: "execution_declaration"
        run_cli_docs_check: false
        selected_test_files: []
        vitest_pool: "forks"
      source: "execution_contract"
    required_evidence:
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "f6dae0b382002f07850fd1d5f343eda0b7da6f97"
  message: "🚧 3N0FBK task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: ac767de9db0d. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: ac767de9db0d. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: a025114ef3c0. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: a025114ef3c0. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: resolve the recorded hotspot threshold blocker with a bounded route-state extraction."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: f6dae0b38200. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-29T22:21:11.408Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-29T22:27:44.518Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: ac767de9db0d. CLI accepted one state-bound external-agent semantic result."
    commit: "ac767de9db0d91cfb3ece989e1cf36e0a10eee2d"
  -
    type: "verify"
    at: "2026-08-29T22:34:58.865Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-29T22:38:44.803Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: ac767de9db0d. CLI accepted one state-bound external-agent semantic result."
    commit: "ac767de9db0d91cfb3ece989e1cf36e0a10eee2d"
  -
    type: "verify"
    at: "2026-08-29T22:46:25.339Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-29T22:48:01.909Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-29T22:50:56.383Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: a025114ef3c0. CLI accepted one state-bound external-agent semantic result."
    commit: "a025114ef3c0b1f7b93380d2c957b18741c537b5"
  -
    type: "verify"
    at: "2026-08-29T22:58:00.434Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-29T22:58:49.123Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: a025114ef3c0. CLI accepted one state-bound external-agent semantic result."
    commit: "a025114ef3c0b1f7b93380d2c957b18741c537b5"
  -
    type: "verify"
    at: "2026-08-29T23:05:55.501Z"
    author: "SUPERVISOR"
    state: "blocked_external"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-29T23:07:18.612Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: resolve the recorded hotspot threshold blocker with a bounded route-state extraction."
  -
    type: "status"
    at: "2026-08-29T23:12:21.034Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: f6dae0b38200. CLI accepted one state-bound external-agent semantic result."
    commit: "f6dae0b382002f07850fd1d5f343eda0b7da6f97"
  -
    type: "verify"
    at: "2026-08-29T23:20:02.016Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-29T23:20:04.090Z"
doc_updated_by: "SUPERVISOR"
description: "Fix branch_pr route selection so an approved task with any incomplete required canonical WorkItem returns to the bounded EXECUTOR WorkItem episode before verification, quality review, PR publication, or pre-merge closure. Add a regression test for a task that has stale verification, quality review, and commit evidence while a required WorkItem remains READY or PLANNED."
sections:
  Summary: |-
    Prevent branch closeout while required WorkItems are incomplete

    Fix branch_pr route selection so an approved task with any incomplete required canonical WorkItem returns to the bounded EXECUTOR WorkItem episode before verification, quality review, PR publication, or pre-merge closure. Add a regression test for a task that has stale verification, quality review, and commit evidence while a required WorkItem remains READY or PLANNED.
  Scope: |-
    - In scope: Fix branch_pr route selection so an approved task with any incomplete required canonical WorkItem returns to the bounded EXECUTOR WorkItem episode before verification, quality review, PR publication, or pre-merge closure. Add a regression test for a task that has stale verification, quality review, and commit evidence while a required WorkItem remains READY or PLANNED.
    - Out of scope: unrelated refactors not required for "Prevent branch closeout while required WorkItems are incomplete".
  Plan: "Refined the bootstrap plan with one additional calibration test fixture required by full regression; production scope and risk are unchanged."
  Verify Steps: |-
    PLANNER fallback scaffold for "Prevent branch closeout while required WorkItems are incomplete". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Prevent branch closeout while required WorkItems are incomplete". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-29T22:34:58.865Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:3fe794b0ab3823b6d1e9c301fca5b3def1d8d411a1faca2430333864dab15df1, input_digest=sha256:c2abf4f79323da4cbb29ffa54b24a1961e76040f5ad225b08329ac0ca7d7d236

    Details:

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608292218-3N0FBK declared verification

    Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608292218-3N0FBK declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292218-3N0FBK declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608292218-3N0FBK-prevent-branch-closeout-while-required-workitems/.agentplane/tasks/202608292218-3N0FBK/blueprint/resolved-snapshot.json
    - old_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
    - current_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608292218-3N0FBK

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

    ### 2026-08-29T22:46:25.339Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:3fe794b0ab3823b6d1e9c301fca5b3def1d8d411a1faca2430333864dab15df1, input_digest=sha256:1e3a8160540728e12c4f36aefc620457772efd2be53d98a459581eed7700ee17

    Details:

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608292218-3N0FBK declared verification

    Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608292218-3N0FBK declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292218-3N0FBK declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608292218-3N0FBK-prevent-branch-closeout-while-required-workitems/.agentplane/tasks/202608292218-3N0FBK/blueprint/resolved-snapshot.json
    - old_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
    - current_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608292218-3N0FBK

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-29T22:58:00.434Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 3

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:3fe794b0ab3823b6d1e9c301fca5b3def1d8d411a1faca2430333864dab15df1, input_digest=sha256:c19e168bc6d978b75882b375b71fef325a212089519b40a29eb23037953a3ab0

    Details:

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608292218-3N0FBK declared verification

    Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608292218-3N0FBK declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292218-3N0FBK declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608292218-3N0FBK-prevent-branch-closeout-while-required-workitems/.agentplane/tasks/202608292218-3N0FBK/blueprint/resolved-snapshot.json
    - old_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
    - current_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608292218-3N0FBK

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

    ### 2026-08-29T23:05:55.501Z — VERIFY — blocked_external

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 4

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:3fe794b0ab3823b6d1e9c301fca5b3def1d8d411a1faca2430333864dab15df1, input_digest=sha256:4e09ca28ab351ba5df0f523847260312dbf1cd622874aea4ec97230ad6ab7891

    Details:

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608292218-3N0FBK declared verification

    Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608292218-3N0FBK declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292218-3N0FBK declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608292218-3N0FBK-prevent-branch-closeout-while-required-workitems/.agentplane/tasks/202608292218-3N0FBK/blueprint/resolved-snapshot.json
    - old_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
    - current_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608292218-3N0FBK

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-29T23:20:02.016Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:3fe794b0ab3823b6d1e9c301fca5b3def1d8d411a1faca2430333864dab15df1, input_digest=sha256:ee18946de2221c3c6d98b88afb53fd2087a039d4675ea25f647e7d629fa4c5ed

    Details:

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608292218-3N0FBK Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608292218-3N0FBK Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292218-3N0FBK Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608292218-3N0FBK Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608292218-3N0FBK Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292218-3N0FBK Verification Contract check critical_paths (3/3)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292218-3N0FBK Verification Contract check full_regression

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608292218-3N0FBK Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608292218-3N0FBK Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608292218-3N0FBK Verification Contract check task_outcome (3/3)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608292218-3N0FBK-prevent-branch-closeout-while-required-workitems/.agentplane/tasks/202608292218-3N0FBK/blueprint/resolved-snapshot.json
    - old_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
    - current_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608292218-3N0FBK

    DecisionContextRef:
    - operator_action: provider_action
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
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex:USER"
    approval_evidence_digest: "sha256:c19e38eb8e48f78702fb813eace7ab0c97821d1fb93b2bb8b175af439fb85847"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:5035054f6dcdc32b462d0dce4fb80a6cb277a6510b57c8ea037e5dcaf149a66a"
    grant_id: "07d60ec0-559f-46c9-9335-8c6e1161c108"
    issued_at: "2026-08-29T22:47:53.131Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:ef702a5984826ae41f379d0d7bf000157f851edf9bb5db83323358a61e154ce4"
    plan_revision: 13
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608292218-3N0FBK"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-29T22:47:53.131Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:d3e3f89738c8623e63dfd2acee0e187bcc323d17676f456f031c6ff8ca11100c"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-08-29T22:47:39.828Z"
      digest: "sha256:d3e3f89738c8623e63dfd2acee0e187bcc323d17676f456f031c6ff8ca11100c"
      proposal:
        assumptions:
          - "Canonical WorkItem state in task extensions is the authority for whether semantic implementation remains outstanding."
          - "Existing downstream routing remains correct once every required WorkItem is COMPLETED or CANCELLED only when optional."
        planning_baseline:
          captured_at: "2026-08-29T22:46:30.719Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:5e31b7c37af9f01d7b74d82f3f3ada000a0d65c6b2c2fad14120786edaa2aa85"
          dirty_paths:
            - ".agentplane/tasks/202608292218-3N0FBK/README.md"
            - ".agentplane/tasks/202608292218-3N0FBK/pr/github-body.md"
            - ".agentplane/tasks/202608292218-3N0FBK/pr/meta.json"
            - ".agentplane/tasks/202608292218-3N0FBK/pr/review.md"
            - ".agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json"
            - ".agentplane/tasks/202608292218-3N0FBK/supervision/implementation-evidence.json"
            - ".agentplane/tasks/202608292218-3N0FBK/verification/20260829223458865-779a4c712ea93918.json"
            - ".agentplane/tasks/202608292218-3N0FBK/verification/20260829224625339-315ba0801ec5e6ea.json"
          git:
            kind: "commit"
            ref: null
            sha: "ac767de9db0d91cfb3ece989e1cf36e0a10eee2d"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:12"
        schema_version: 1
        task_id: "202608292218-3N0FBK"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
              id: "check-route-regression"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "check-typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
          criteria:
            -
              check_ids:
                - "check-route-regression"
              description: "A branch_pr task with any incomplete required canonical WorkItem routes to a bounded EXECUTOR implementation episode even when commit, verification, and quality evidence exist."
              id: "criterion-route-priority"
              required: true
            -
              check_ids:
                - "check-route-regression"
              description: "Completed WorkItem tasks retain the existing verification, quality, PR, and pre-merge closure sequence."
              id: "criterion-no-closeout-regression"
              required: true
            -
              check_ids:
                - "check-typecheck"
              description: "The route selection change passes repository type checking."
              id: "criterion-types"
              required: true
            -
              check_ids:
                - "check-route-regression"
              description: "Post-implementation evaluator calibration fixtures mark required canonical WorkItems completed before asserting downstream quality evidence refresh."
              id: "criterion-calibration-fixture"
              required: true
          evidence_fingerprint: "sha256:7b2cc70b24d92bd87935143e4abf377e8f495e07d3e3c23960fb27546048aeaa"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-route-regression"
                  description: "A branch_pr task with any incomplete required canonical WorkItem routes to a bounded EXECUTOR implementation episode even when commit, verification, and quality evidence exist."
                  id: "criterion-route-priority"
                  required: true
                -
                  check_ids:
                    - "check-route-regression"
                  description: "Completed WorkItem tasks retain the existing verification, quality, PR, and pre-merge closure sequence."
                  id: "criterion-no-closeout-regression"
                  required: true
                -
                  check_ids:
                    - "check-typecheck"
                  description: "The route selection change passes repository type checking."
                  id: "criterion-types"
                  required: true
                -
                  check_ids:
                    - "check-route-regression"
                  description: "Post-implementation evaluator calibration fixtures mark required canonical WorkItems completed before asserting downstream quality evidence refresh."
                  id: "criterion-calibration-fixture"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 160000
                optional_sources:
                  - "packages/agentplane/src/commands/task/finish-shared.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
                  - "packages/core/src/tasks/task-centric/model.ts"
                  - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
                symbol_hints:
                  - "branchStep"
                  - "branchImplementationStep"
                  - "taskCentricAggregateFromExtensions"
              depends_on: []
              expected_outputs:
                - "branch-route-priority-fix"
                - "incomplete-workitem-regression-evidence"
                - "calibration-fixture-alignment"
              id: "prioritize-incomplete-required-work-items"
              objective: "Make branch_pr route selection return to the canonical WorkItem EXECUTOR episode before downstream verification, quality, PR, or closeout steps whenever a required WorkItem is incomplete."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                    id: "check-route-regression"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "check-typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "check-route-regression"
                    description: "A branch_pr task with any incomplete required canonical WorkItem routes to a bounded EXECUTOR implementation episode even when commit, verification, and quality evidence exist."
                    id: "criterion-route-priority"
                    required: true
                  -
                    check_ids:
                      - "check-route-regression"
                    description: "Completed WorkItem tasks retain the existing verification, quality, PR, and pre-merge closure sequence."
                    id: "criterion-no-closeout-regression"
                    required: true
                  -
                    check_ids:
                      - "check-typecheck"
                    description: "The route selection change passes repository type checking."
                    id: "criterion-types"
                    required: true
                  -
                    check_ids:
                      - "check-route-regression"
                    description: "Post-implementation evaluator calibration fixtures mark required canonical WorkItems completed before asserting downstream quality evidence refresh."
                    id: "criterion-calibration-fixture"
                    required: true
                evidence_fingerprint: "sha256:7b2cc70b24d92bd87935143e4abf377e8f495e07d3e3c23960fb27546048aeaa"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202608292218-3N0FBK"
    event_cursor: 0
    final_validation: null
    id: "202608292218-3N0FBK"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-29T22:18:51.327Z"
      constraints: []
      request: |-
        Prevent branch closeout while required WorkItems are incomplete

        Fix branch_pr route selection so an approved task with any incomplete required canonical WorkItem returns to the bounded EXECUTOR WorkItem episode before verification, quality review, PR publication, or pre-merge closure. Add a regression test for a task that has stale verification, quality review, and commit evidence while a required WorkItem remains READY or PLANNED.
      task_id: "202608292218-3N0FBK"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-08-29T22:20:57.877Z"
          approved_by: "HOST:codex:USER"
          approved_digest: "sha256:9803e91caef2d673b2ab7e7450e2618a323f73f1dd4c9db76a62914b9cbb6f22"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-08-29T22:20:23.712Z"
        digest: "sha256:9803e91caef2d673b2ab7e7450e2618a323f73f1dd4c9db76a62914b9cbb6f22"
        proposal:
          assumptions:
            - "Canonical WorkItem state in task extensions is the authority for whether semantic implementation remains outstanding."
            - "Existing downstream routing remains correct once every required WorkItem is COMPLETED or CANCELLED only when optional."
          planning_baseline:
            captured_at: "2026-08-29T22:18:58.538Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:186965e48140c0c5f8d11feaedce897b99f6937b21d293b831079c2a39f959d0"
            dirty_paths:
              - ".agentplane/tasks/202608210955-9SX2C6/README.md"
              - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
              - ".agentplane/tasks/202608220034-FPEFRK/README.md"
              - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
              - ".agentplane/tasks/202608241434-129F8R/README.md"
              - ".agentplane/tasks/202608241434-EH8E74/README.md"
              - ".agentplane/tasks/202608241434-KCC9K4/README.md"
              - ".agentplane/tasks/202608241434-QQNDGT/README.md"
              - ".agentplane/tasks/202608241434-SFPD91/README.md"
              - ".agentplane/tasks/202608241434-TA84WK/README.md"
              - ".agentplane/tasks/202608241434-WVYA5T/README.md"
              - ".agentplane/tasks/202608241435-40YZCE/README.md"
              - ".agentplane/tasks/202608241435-73DA89/README.md"
              - ".agentplane/tasks/202608241435-D001ET/README.md"
              - ".agentplane/tasks/202608241435-HTV4K2/README.md"
              - ".agentplane/tasks/202608241435-NDR0BX/README.md"
              - ".agentplane/tasks/202608241435-RJXGHQ/README.md"
              - ".agentplane/tasks/202608241435-W3DG6V/README.md"
              - ".agentplane/tasks/202608241435-YSW0E0/README.md"
              - ".agentplane/tasks/202608241436-2G9DA8/README.md"
              - ".agentplane/tasks/202608241436-63W678/README.md"
              - ".agentplane/tasks/202608241436-8PJKJP/README.md"
              - ".agentplane/tasks/202608241436-99B067/README.md"
              - ".agentplane/tasks/202608241436-A87Y59/README.md"
              - ".agentplane/tasks/202608241436-DHPR5E/README.md"
              - ".agentplane/tasks/202608241436-H60MCY/README.md"
              - ".agentplane/tasks/202608241436-TX6TRF/README.md"
              - ".agentplane/tasks/202608241436-W6A113/README.md"
              - ".agentplane/tasks/202608241437-5YZ0N8/README.md"
              - ".agentplane/tasks/202608241437-H5418M/README.md"
              - ".agentplane/tasks/202608241437-SH3CDX/README.md"
              - ".agentplane/tasks/202608241437-V8BA7Q/README.md"
              - ".agentplane/tasks/202608241437-XY3950/README.md"
              - ".agentplane/tasks/202608250007-P5BWP0/README.md"
              - ".agentplane/tasks/202608250007-P5BWP0/blueprint/resolved-snapshot.json"
              - ".agentplane/tasks/202608251038-42AC0D/README.md"
              - ".agentplane/tasks/202608251053-QAZ236/README.md"
              - ".agentplane/tasks/202608251706-V287W1/README.md"
              - ".agentplane/tasks/202608251735-ZJ7YZE/README.md"
              - ".agentplane/tasks/202608252233-JR4T47/README.md"
              - ".agentplane/tasks/202608252234-4CKSWA/README.md"
              - ".agentplane/tasks/202608252234-4CKSWA/blueprint/resolved-snapshot.json"
              - ".agentplane/tasks/202608262032-MAJQ5E/README.md"
              - ".agentplane/tasks/202608270848-0RAFH9/README.md"
              - ".agentplane/tasks/202608270848-37XB2K/README.md"
              - ".agentplane/tasks/202608270848-N28TBB/README.md"
              - ".agentplane/tasks/202608270848-V32542/README.md"
              - ".agentplane/tasks/202608271350-HVGQPQ/README.md"
              - ".agentplane/tasks/202608291005-33PHG4/README.md"
              - ".agentplane/tasks/202608291006-255K66/README.md"
              - ".agentplane/tasks/202608291006-2A6BJC/README.md"
              - ".agentplane/tasks/202608292218-3N0FBK/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "dbaf4bc2878eab7b50f8ea6d14179d8d91030159"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202608292218-3N0FBK"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                id: "check-route-regression"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "check-typecheck"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
            criteria:
              -
                check_ids:
                  - "check-route-regression"
                description: "A branch_pr task with any incomplete required canonical WorkItem routes to a bounded EXECUTOR implementation episode even when commit, verification, and quality evidence exist."
                id: "criterion-route-priority"
                required: true
              -
                check_ids:
                  - "check-route-regression"
                description: "Completed WorkItem tasks retain the existing verification, quality, PR, and pre-merge closure sequence."
                id: "criterion-no-closeout-regression"
                required: true
              -
                check_ids:
                  - "check-typecheck"
                description: "The route selection change passes repository type checking."
                id: "criterion-types"
                required: true
            evidence_fingerprint: "sha256:7b2cc70b24d92bd87935143e4abf377e8f495e07d3e3c23960fb27546048aeaa"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "check-route-regression"
                    description: "A branch_pr task with any incomplete required canonical WorkItem routes to a bounded EXECUTOR implementation episode even when commit, verification, and quality evidence exist."
                    id: "criterion-route-priority"
                    required: true
                  -
                    check_ids:
                      - "check-route-regression"
                    description: "Completed WorkItem tasks retain the existing verification, quality, PR, and pre-merge closure sequence."
                    id: "criterion-no-closeout-regression"
                    required: true
                  -
                    check_ids:
                      - "check-typecheck"
                    description: "The route selection change passes repository type checking."
                    id: "criterion-types"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 160000
                  optional_sources:
                    - "packages/agentplane/src/commands/task/finish-shared.ts"
                    - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                    - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
                    - "packages/core/src/tasks/task-centric/model.ts"
                  symbol_hints:
                    - "branchStep"
                    - "branchImplementationStep"
                    - "taskCentricAggregateFromExtensions"
                depends_on: []
                expected_outputs:
                  - "branch-route-priority-fix"
                  - "incomplete-workitem-regression-evidence"
                id: "prioritize-incomplete-required-work-items"
                objective: "Make branch_pr route selection return to the canonical WorkItem EXECUTOR episode before downstream verification, quality, PR, or closeout steps whenever a required WorkItem is incomplete."
                optional: false
                priority: 100
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                      id: "check-route-regression"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "check-typecheck"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "check-route-regression"
                      description: "A branch_pr task with any incomplete required canonical WorkItem routes to a bounded EXECUTOR implementation episode even when commit, verification, and quality evidence exist."
                      id: "criterion-route-priority"
                      required: true
                    -
                      check_ids:
                        - "check-route-regression"
                      description: "Completed WorkItem tasks retain the existing verification, quality, PR, and pre-merge closure sequence."
                      id: "criterion-no-closeout-regression"
                      required: true
                    -
                      check_ids:
                        - "check-typecheck"
                      description: "The route selection change passes repository type checking."
                      id: "criterion-types"
                      required: true
                  evidence_fingerprint: "sha256:7b2cc70b24d92bd87935143e4abf377e8f495e07d3e3c23960fb27546048aeaa"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202608292218-3N0FBK"
    revision: 19
    schema_version: 1
    updated_at: "2026-08-29T22:58:03.797Z"
    work_items:
      prioritize-incomplete-required-work-items:
        attempt: 1
        claim_id: null
        id: "prioritize-incomplete-required-work-items"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:a325a651be54e0175b72aad093fb73cfcb8153d924ba2d25be55545a2ac28b50"
            id: "branch-route-priority-fix"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202608292218-3N0FBK"
              work_item_id: "prioritize-incomplete-required-work-items"
            provenance:
              - "sha256:6d0a2699e4906fe22473bf58a57dad9eb96d04ac5fa7fee5dbff3f2c5d736175"
              - ".agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:02a637a0705738879db6cdc97b7251127d184fc3a106434d50dfdefa6c267974"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:7bc6b500bfb69425ae1a20d992b3be2fecba3bd8906771cf14ae975d6704bd40"
            id: "incomplete-workitem-regression-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202608292218-3N0FBK"
              work_item_id: "prioritize-incomplete-required-work-items"
            provenance:
              - "sha256:6d0a2699e4906fe22473bf58a57dad9eb96d04ac5fa7fee5dbff3f2c5d736175"
              - ".agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:02a637a0705738879db6cdc97b7251127d184fc3a106434d50dfdefa6c267974"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:22afd7cefce8562b77d08a1bdd59e8de22ed00095512a8668ad9a7e0e35ef66c"
            id: "calibration-fixture-alignment"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202608292218-3N0FBK"
              work_item_id: "prioritize-incomplete-required-work-items"
            provenance:
              - "sha256:6d0a2699e4906fe22473bf58a57dad9eb96d04ac5fa7fee5dbff3f2c5d736175"
              - ".agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:02a637a0705738879db6cdc97b7251127d184fc3a106434d50dfdefa6c267974"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json"
              check_id: "check-route-regression"
              command_identity: "bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-08-29T22:58:03.788Z"
              repository_snapshot_digest: "sha256:02a637a0705738879db6cdc97b7251127d184fc3a106434d50dfdefa6c267974"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json"
              check_id: "check-typecheck"
              command_identity: "bun run typecheck"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-08-29T22:58:03.788Z"
              repository_snapshot_digest: "sha256:02a637a0705738879db6cdc97b7251127d184fc3a106434d50dfdefa6c267974"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608292218-3N0FBK-executor-15459b7cf7d93011334728cf:
        aggregate_digest: "sha256:3b5c0d767165c408910acf35849723e3950cd8ed29c197c4136f6c3b7374f8bb"
        event:
          actor_id: "agentplane"
          at: "2026-08-29T22:35:02.361Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_8f4dfd7105dabb599707a326"
          mutation_id: "external-result:work-order-202608292218-3N0FBK-executor-15459b7cf7d93011334728cf"
          plan_digest: "sha256:9803e91caef2d673b2ab7e7450e2618a323f73f1dd4c9db76a62914b9cbb6f22"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608292218-3N0FBK"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "prioritize-incomplete-required-work-items"
        mutation_id: "external-result:work-order-202608292218-3N0FBK-executor-15459b7cf7d93011334728cf"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202608292218-3N0FBK"
      external-result:work-order-202608292218-3N0FBK-executor-37f690eee41d4957971ef93e:
        aggregate_digest: "sha256:c028ae84ed318fb9d73d5a8248c416a11c093a219d12fa10a58ae6a5427b3eef"
        event:
          actor_id: "agentplane"
          at: "2026-08-29T22:58:03.797Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_a4390ff9eb7edccd98477d4f"
          mutation_id: "external-result:work-order-202608292218-3N0FBK-executor-37f690eee41d4957971ef93e"
          plan_digest: "sha256:d3e3f89738c8623e63dfd2acee0e187bcc323d17676f456f031c6ff8ca11100c"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608292218-3N0FBK"
          task_revision: 18
          to: "COMPLETED"
          work_item_id: "prioritize-incomplete-required-work-items"
        mutation_id: "external-result:work-order-202608292218-3N0FBK-executor-37f690eee41d4957971ef93e"
        next_revision: 19
        previous_revision: 18
        schema_version: 1
        task_id: "202608292218-3N0FBK"
      plan-refinement:work-order-202608292218-3N0FBK-executor-fbc25c117934591ae019b38e:
        aggregate_digest: "sha256:3ba3a0de6bad0c00f60e4f6e2fd97d87335ffd2487dcc37f534a9f2712ceeca9"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-29T22:46:28.891Z"
          cause_refs:
            - "scope_expanded"
            - "outputs_changed"
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_4e2fee276fed19ac1a66dbac"
          mutation_id: "plan-refinement:work-order-202608292218-3N0FBK-executor-fbc25c117934591ae019b38e"
          plan_digest: "sha256:9803e91caef2d673b2ab7e7450e2618a323f73f1dd4c9db76a62914b9cbb6f22"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608292218-3N0FBK"
          task_revision: 11
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608292218-3N0FBK-executor-fbc25c117934591ae019b38e"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202608292218-3N0FBK"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "f6dae0b382002f07850fd1d5f343eda0b7da6f97"
  task_execution_context:
    base_ref: "main"
    base_sha: "dbaf4bc2878eab7b50f8ea6d14179d8d91030159"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "dbaf4bc2878eab7b50f8ea6d14179d8d91030159"
    version: 1
id_source: "generated"
---
## Summary

Prevent branch closeout while required WorkItems are incomplete

Fix branch_pr route selection so an approved task with any incomplete required canonical WorkItem returns to the bounded EXECUTOR WorkItem episode before verification, quality review, PR publication, or pre-merge closure. Add a regression test for a task that has stale verification, quality review, and commit evidence while a required WorkItem remains READY or PLANNED.

## Scope

- In scope: Fix branch_pr route selection so an approved task with any incomplete required canonical WorkItem returns to the bounded EXECUTOR WorkItem episode before verification, quality review, PR publication, or pre-merge closure. Add a regression test for a task that has stale verification, quality review, and commit evidence while a required WorkItem remains READY or PLANNED.
- Out of scope: unrelated refactors not required for "Prevent branch closeout while required WorkItems are incomplete".

## Plan

Refined the bootstrap plan with one additional calibration test fixture required by full regression; production scope and risk are unchanged.

## Verify Steps

PLANNER fallback scaffold for "Prevent branch closeout while required WorkItems are incomplete". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Prevent branch closeout while required WorkItems are incomplete". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-29T22:34:58.865Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:3fe794b0ab3823b6d1e9c301fca5b3def1d8d411a1faca2430333864dab15df1, input_digest=sha256:c2abf4f79323da4cbb29ffa54b24a1961e76040f5ad225b08329ac0ca7d7d236

Details:

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608292218-3N0FBK declared verification

Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608292218-3N0FBK declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292218-3N0FBK declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608292218-3N0FBK-prevent-branch-closeout-while-required-workitems/.agentplane/tasks/202608292218-3N0FBK/blueprint/resolved-snapshot.json
- old_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
- current_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608292218-3N0FBK

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

### 2026-08-29T22:46:25.339Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:3fe794b0ab3823b6d1e9c301fca5b3def1d8d411a1faca2430333864dab15df1, input_digest=sha256:1e3a8160540728e12c4f36aefc620457772efd2be53d98a459581eed7700ee17

Details:

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608292218-3N0FBK declared verification

Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608292218-3N0FBK declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292218-3N0FBK declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608292218-3N0FBK-prevent-branch-closeout-while-required-workitems/.agentplane/tasks/202608292218-3N0FBK/blueprint/resolved-snapshot.json
- old_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
- current_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608292218-3N0FBK

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-29T22:58:00.434Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 3

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:3fe794b0ab3823b6d1e9c301fca5b3def1d8d411a1faca2430333864dab15df1, input_digest=sha256:c19e168bc6d978b75882b375b71fef325a212089519b40a29eb23037953a3ab0

Details:

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608292218-3N0FBK declared verification

Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608292218-3N0FBK declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292218-3N0FBK declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608292218-3N0FBK-prevent-branch-closeout-while-required-workitems/.agentplane/tasks/202608292218-3N0FBK/blueprint/resolved-snapshot.json
- old_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
- current_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608292218-3N0FBK

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

### 2026-08-29T23:05:55.501Z — VERIFY — blocked_external

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 4

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:3fe794b0ab3823b6d1e9c301fca5b3def1d8d411a1faca2430333864dab15df1, input_digest=sha256:4e09ca28ab351ba5df0f523847260312dbf1cd622874aea4ec97230ad6ab7891

Details:

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608292218-3N0FBK declared verification

Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608292218-3N0FBK declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292218-3N0FBK declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608292218-3N0FBK-prevent-branch-closeout-while-required-workitems/.agentplane/tasks/202608292218-3N0FBK/blueprint/resolved-snapshot.json
- old_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
- current_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608292218-3N0FBK

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-29T23:20:02.016Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:3fe794b0ab3823b6d1e9c301fca5b3def1d8d411a1faca2430333864dab15df1, input_digest=sha256:ee18946de2221c3c6d98b88afb53fd2087a039d4675ea25f647e7d629fa4c5ed

Details:

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608292218-3N0FBK Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608292218-3N0FBK Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292218-3N0FBK Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608292218-3N0FBK Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608292218-3N0FBK Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292218-3N0FBK Verification Contract check critical_paths (3/3)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292218-3N0FBK Verification Contract check full_regression

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608292218-3N0FBK Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608292218-3N0FBK Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608292218-3N0FBK Verification Contract check task_outcome (3/3)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608292218-3N0FBK-prevent-branch-closeout-while-required-workitems/.agentplane/tasks/202608292218-3N0FBK/blueprint/resolved-snapshot.json
- old_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
- current_digest: 8b81c44d2d42ad42a5fd11120416523cc699aa4f3f26c2f8502e97d2f3e77a2c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608292218-3N0FBK

DecisionContextRef:
- operator_action: provider_action
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
