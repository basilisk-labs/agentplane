---
id: "202608290920-1PZGG8"
title: "Allow task-centric plan refinement before WorkItem selection"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 25
origin:
  system: "manual"
depends_on: []
tags:
  - "task-centric"
  - "recovery"
  - "integration-blocker"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-29T11:09:57.120Z"
  updated_by: "USER"
  note: "User explicitly approved plan 3eaa9900 in the current Codex conversation."
verification:
  state: "blocked_external"
  updated_at: "2026-08-29T11:00:02.485Z"
  updated_by: "SUPERVISOR"
  note: "Rework: No executable declared verification checks are configured for this task."
  attempts: 4
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-29T10:03:24.516Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 5 typed finding(s)."
  evaluated_sha: "4aede6beb635097fcd6f5a94fb60c37bc45dc09a"
  blueprint_digest: "8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e"
  evidence_refs:
    - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/de714e1ae1e5247163e5007b3fe727baf606367028fdd58ebcb9f94f7333b4d9.md"
    - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608290920-1PZGG8/README.md"
    - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/6238bed33ff5edad09db6bb76534efbfd68babd7775a75c0db7b0b53a128a033.patch"
    - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/5bf18a85abd14fe0a9a2152613220bc2ad006608710b4b329837619185c0189d.json"
    - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829093430895-6606b487cced4039.json"
    - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/e35839039295af7993b80adfdaa63da9729d59a2955432cd06975115f9057010.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The intended material-refinement case is correctly recorded before WorkItem selection and returns replan_required with a nullable work_item_id."
    - "The claimedIds ambiguity check moved implicitly after recordPlanRefinement. A local amendment paired with a null-ID result and multiple claimed WorkItems can now mutate plan amendments before the same call rejects as ambiguous."
    - "Compute and reject multiple claimed WorkItems before recording refinement, while retaining material refinement before actual WorkItem selection."
    - "Add a regression proving an ambiguous null-ID local refinement leaves task revision and plan amendments unchanged."
    - "The prepared verification evidence does not record the task plan's declared bun run ci:local:full check; exact full-regression evidence remains required before PASS."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
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
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "A branch PR preserves independent hosted evidence before the runtime is used to recover 7JCQPF."
      - "The fix changes one task-centric projection boundary and its focused regression tests."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
  observed:
    authority_violations:
      - "verification:verification-record:fail"
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
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
      -
        id: "verification-record"
        result: "fail"
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
          - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
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
      digest: "sha256:82dcb6d6787c1347fcf408abe1c2f01f44e3041541f14ab3b8f8f76bb2661260"
      escalation_reasons: []
      execution_groups:
        - "core"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
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
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
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
      - "verification_recovery:verification-record"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 4aede6beb635. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: c9d0e2a977df. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: c9d0e2a977df. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: c9d0e2a977df. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: c9d0e2a977df. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-29T09:23:27.947Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-29T09:25:49.159Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 4aede6beb635. CLI accepted one state-bound external-agent semantic result."
    commit: "4aede6beb635097fcd6f5a94fb60c37bc45dc09a"
  -
    type: "verify"
    at: "2026-08-29T09:34:30.895Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-29T10:55:34.599Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: c9d0e2a977df. CLI accepted one state-bound external-agent semantic result."
    commit: "c9d0e2a977df6ce2156290bce5b9002a72a6e9c7"
  -
    type: "verify"
    at: "2026-08-29T10:55:35.831Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: No executable declared verification checks are configured for this task."
  -
    type: "status"
    at: "2026-08-29T10:57:02.648Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: c9d0e2a977df. CLI accepted one state-bound external-agent semantic result."
    commit: "c9d0e2a977df6ce2156290bce5b9002a72a6e9c7"
  -
    type: "verify"
    at: "2026-08-29T10:57:05.983Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: No executable declared verification checks are configured for this task."
  -
    type: "status"
    at: "2026-08-29T10:58:40.481Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: c9d0e2a977df. CLI accepted one state-bound external-agent semantic result."
    commit: "c9d0e2a977df6ce2156290bce5b9002a72a6e9c7"
  -
    type: "verify"
    at: "2026-08-29T10:58:43.774Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: No executable declared verification checks are configured for this task."
  -
    type: "status"
    at: "2026-08-29T11:00:00.210Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: c9d0e2a977df. CLI accepted one state-bound external-agent semantic result."
    commit: "c9d0e2a977df6ce2156290bce5b9002a72a6e9c7"
  -
    type: "verify"
    at: "2026-08-29T11:00:02.485Z"
    author: "SUPERVISOR"
    state: "blocked_external"
    note: "Rework: No executable declared verification checks are configured for this task."
  -
    type: "status"
    at: "2026-08-29T11:10:04.748Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-29T11:10:04.748Z"
doc_updated_by: "CODER"
description: "Fix the supported recovery path exposed by 7JCQPF. In recordTaskCentricExternalResult, when semantic.plan_refinement is present, record the refinement against the current approved plan before selecting or projecting a WorkItem result. If the refinement requires replan, return replan_required without requiring a schedulable WorkItem. Preserve normal WorkItem result selection, idempotency, validation, and fail-closed behavior when no refinement is present. Add focused tests for an unschedulable READY WorkItem whose refinement is still recorded, plus unchanged normal result behavior. This is an integration-path blocker for 7JCQPF and PR #5870; do not change release ordering, policy, scheduler semantics, or task stores."
sections:
  Summary: |-
    Allow task-centric plan refinement before WorkItem selection

    Fix the supported recovery path exposed by 7JCQPF. In recordTaskCentricExternalResult, when semantic.plan_refinement is present, record the refinement against the current approved plan before selecting or projecting a WorkItem result. If the refinement requires replan, return replan_required without requiring a schedulable WorkItem. Preserve normal WorkItem result selection, idempotency, validation, and fail-closed behavior when no refinement is present. Add focused tests for an unschedulable READY WorkItem whose refinement is still recorded, plus unchanged normal result behavior. This is an integration-path blocker for 7JCQPF and PR #5870; do not change release ordering, policy, scheduler semantics, or task stores.
  Scope: |-
    - In scope: Fix the supported recovery path exposed by 7JCQPF. In recordTaskCentricExternalResult, when semantic.plan_refinement is present, record the refinement against the current approved plan before selecting or projecting a WorkItem result. If the refinement requires replan, return replan_required without requiring a schedulable WorkItem. Preserve normal WorkItem result selection, idempotency, validation, and fail-closed behavior when no refinement is present. Add focused tests for an unschedulable READY WorkItem whose refinement is still recorded, plus unchanged normal result behavior. This is an integration-path blocker for 7JCQPF and PR #5870; do not change release ordering, policy, scheduler semantics, or task stores.
    - Out of scope: unrelated refactors not required for "Allow task-centric plan refinement before WorkItem selection".
  Plan: "Prepared a one-WorkItem recovery plan that validates the evaluator rework on the current commit without widening scope."
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow task-centric plan refinement before WorkItem selection". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow task-centric plan refinement before WorkItem selection". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-29T09:34:30.895Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:24870fce63c2455441b09f56243e72d224fcac20b52a9799326e9de05d62a231, input_digest=sha256:0379f374b7e860d4b7161bc23cb2064a2872d58a2449ccad32607109515596b5

    Details:

    Check: affected_unit_integration
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check critical_paths (3/3)

    Check: task_outcome
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check task_outcome (3/3)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290920-1PZGG8-allow-task-centric-plan-refinement-before-workit/.agentplane/tasks/202608290920-1PZGG8/blueprint/resolved-snapshot.json
    - old_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
    - current_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608290920-1PZGG8

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

    ### 2026-08-29T10:55:35.831Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: No executable declared verification checks are configured for this task.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:24870fce63c2455441b09f56243e72d224fcac20b52a9799326e9de05d62a231, input_digest=sha256:e7eaa55729ed399258bb1640b7b5e86cb72a93956310600b9c6b95ac9bba1ee6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290920-1PZGG8-allow-task-centric-plan-refinement-before-workit/.agentplane/tasks/202608290920-1PZGG8/blueprint/resolved-snapshot.json
    - old_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
    - current_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608290920-1PZGG8

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608290920-1PZGG8
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-29T10:57:05.983Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: No executable declared verification checks are configured for this task.
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:24870fce63c2455441b09f56243e72d224fcac20b52a9799326e9de05d62a231, input_digest=sha256:e7eaa55729ed399258bb1640b7b5e86cb72a93956310600b9c6b95ac9bba1ee6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290920-1PZGG8-allow-task-centric-plan-refinement-before-workit/.agentplane/tasks/202608290920-1PZGG8/blueprint/resolved-snapshot.json
    - old_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
    - current_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608290920-1PZGG8

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608290920-1PZGG8
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-29T10:58:43.774Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: No executable declared verification checks are configured for this task.
    Attempts: 3

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:24870fce63c2455441b09f56243e72d224fcac20b52a9799326e9de05d62a231, input_digest=sha256:e7eaa55729ed399258bb1640b7b5e86cb72a93956310600b9c6b95ac9bba1ee6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290920-1PZGG8-allow-task-centric-plan-refinement-before-workit/.agentplane/tasks/202608290920-1PZGG8/blueprint/resolved-snapshot.json
    - old_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
    - current_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608290920-1PZGG8

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608290920-1PZGG8
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-29T11:00:02.485Z — VERIFY — blocked_external

    By: SUPERVISOR

    Note: Rework: No executable declared verification checks are configured for this task.
    Attempts: 4

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:24870fce63c2455441b09f56243e72d224fcac20b52a9799326e9de05d62a231, input_digest=sha256:8712b04ad0872ab0ad667f1e4ba766ab10877f12d08ad5d95d5b2732252db6b0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290920-1PZGG8-allow-task-centric-plan-refinement-before-workit/.agentplane/tasks/202608290920-1PZGG8/blueprint/resolved-snapshot.json
    - old_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
    - current_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608290920-1PZGG8

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608290920-1PZGG8
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
    actor: "USER"
    approval_evidence_digest: null
    approval_kind: "manual_operator"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:ac2572671eeb01469aaf951c66d5d5995654ffb5e2e3c6effc5dc3092a740f37"
    digest: "sha256:8d17030ce78efd99a880a4cd2a4c80a6e0ff20cd1634f6b00d9df2e29680fcce"
    grant_id: "28f51928-8c71-4d6e-ba42-a70a9adedcde"
    issued_at: "2026-08-29T11:09:57.120Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:7cafd4772392ab43380c39bfecf3ddb85663879d3e3e20c65894cc7bf30f0b1a"
    plan_revision: 23
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608290920-1PZGG8"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-29T11:09:57.120Z"
        approved_by: "USER"
        approved_digest: "sha256:3eaa9900eaed68996750a7af04241ac7b0341027794268553f57036f4b8f81fe"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-29T11:01:26.636Z"
      digest: "sha256:3eaa9900eaed68996750a7af04241ac7b0341027794268553f57036f4b8f81fe"
      proposal:
        assumptions:
          - "Commit c9d0e2a97 contains the complete evaluator-requested source and test rework."
          - "No additional scope is needed unless a declared check fails."
        planning_baseline:
          captured_at: "2026-08-29T11:00:10.766Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:dd96e3d10d3f0df67ba54b668383f538793555cbef32b894b82f89a04dc1c562"
          dirty_paths:
            - ".agentplane/tasks/202608290920-1PZGG8/README.md"
            - ".agentplane/tasks/202608290920-1PZGG8/pr/github-body.md"
            - ".agentplane/tasks/202608290920-1PZGG8/pr/github-title.txt"
            - ".agentplane/tasks/202608290920-1PZGG8/pr/meta.json"
            - ".agentplane/tasks/202608290920-1PZGG8/pr/review.md"
            - ".agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json"
            - ".agentplane/tasks/202608290920-1PZGG8/supervision/implementation-evidence.json"
            - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829105535831-b4c997c8906f47d0.json"
            - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829105705983-3742ca4441ecc2c3.json"
            - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829105843774-eef5a01e10b276a9.json"
            - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829110002485-b669a1777bc06949.json"
          git:
            kind: "commit"
            ref: null
            sha: "c9d0e2a977df6ce2156290bce5b9002a72a6e9c7"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:22"
        schema_version: 1
        task_id: "202608290920-1PZGG8"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers=1"
              id: "check-focused-rework"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "check-full-rework"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "check-diff-rework"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "check-focused-rework"
              description: "Ambiguous null-ID results are rejected before recordPlanRefinement can mutate the approved plan."
              id: "criterion-guard-order"
              required: true
            -
              check_ids:
                - "check-focused-rework"
              description: "The regression proves that rejected ambiguous refinement leaves task revision and plan_amendments unchanged."
              id: "criterion-no-partial-mutation"
              required: true
            -
              check_ids:
                - "check-full-rework"
              description: "The full local CI passes on commit c9d0e2a97 after evaluator rework."
              id: "criterion-full-rework"
              required: true
            -
              check_ids:
                - "check-diff-rework"
              description: "The scoped patch contains no whitespace errors."
              id: "criterion-diff-rework"
              required: true
          evidence_fingerprint: "sha256:dd96e3d10d3f0df67ba54b668383f538793555cbef32b894b82f89a04dc1c562"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-focused-rework"
                  description: "Ambiguous null-ID results are rejected before recordPlanRefinement can mutate the approved plan."
                  id: "criterion-guard-order"
                  required: true
                -
                  check_ids:
                    - "check-focused-rework"
                  description: "The regression proves that rejected ambiguous refinement leaves task revision and plan_amendments unchanged."
                  id: "criterion-no-partial-mutation"
                  required: true
                -
                  check_ids:
                    - "check-full-rework"
                  description: "The full local CI passes on commit c9d0e2a97 after evaluator rework."
                  id: "criterion-full-rework"
                  required: true
                -
                  check_ids:
                    - "check-diff-rework"
                  description: "The scoped patch contains no whitespace errors."
                  id: "criterion-diff-rework"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 65536
                optional_sources:
                  - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-opinion.md"
                required_sources:
                  - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                symbol_hints:
                  - "recordTaskCentricExternalResult"
                  - "recordPlanRefinement"
                  - "claimedIds"
              depends_on: []
              expected_outputs:
                - "evaluator rework behavior"
                - "fresh focused and full verification evidence"
              id: "verify-evaluator-rework"
              objective: "Validate and, only if necessary, repair the evaluator-required guard ordering and no-partial-mutation regression on the current implementation commit."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers=1"
                    id: "check-focused-rework"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "check-full-rework"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "check-diff-rework"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "check-focused-rework"
                    description: "Ambiguous null-ID results are rejected before recordPlanRefinement can mutate the approved plan."
                    id: "criterion-guard-order"
                    required: true
                  -
                    check_ids:
                      - "check-focused-rework"
                    description: "The regression proves that rejected ambiguous refinement leaves task revision and plan_amendments unchanged."
                    id: "criterion-no-partial-mutation"
                    required: true
                  -
                    check_ids:
                      - "check-full-rework"
                    description: "The full local CI passes on commit c9d0e2a97 after evaluator rework."
                    id: "criterion-full-rework"
                    required: true
                  -
                    check_ids:
                      - "check-diff-rework"
                    description: "The scoped patch contains no whitespace errors."
                    id: "criterion-diff-rework"
                    required: true
                evidence_fingerprint: "sha256:dd96e3d10d3f0df67ba54b668383f538793555cbef32b894b82f89a04dc1c562"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202608290920-1PZGG8"
    event_cursor: 0
    final_validation: null
    id: "202608290920-1PZGG8"
    intent:
      acceptance_criteria: []
      captured_at: "2026-08-29T09:20:02.412Z"
      constraints: []
      request: |-
        Allow task-centric plan refinement before WorkItem selection

        Fix the supported recovery path exposed by 7JCQPF. In recordTaskCentricExternalResult, when semantic.plan_refinement is present, record the refinement against the current approved plan before selecting or projecting a WorkItem result. If the refinement requires replan, return replan_required without requiring a schedulable WorkItem. Preserve normal WorkItem result selection, idempotency, validation, and fail-closed behavior when no refinement is present. Add focused tests for an unschedulable READY WorkItem whose refinement is still recorded, plus unchanged normal result behavior. This is an integration-path blocker for 7JCQPF and PR #5870; do not change release ordering, policy, scheduler semantics, or task stores.
      task_id: "202608290920-1PZGG8"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-08-29T09:23:17.423Z"
          approved_by: "HOST:slingshot:env_e_6a1ef5a7691083289addb82f53997126:USER"
          approved_digest: "sha256:7f565d70cda39bcf352b1043b604939aaa83c8bd2728f93d9a109db6093a3721"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-08-29T09:21:37.189Z"
        digest: "sha256:7f565d70cda39bcf352b1043b604939aaa83c8bd2728f93d9a109db6093a3721"
        proposal:
          assumptions:
            - "A plan refinement that requires replan must not project a result into the superseded current WorkItem graph."
            - "No-refinement result recording remains semantically unchanged."
          planning_baseline:
            captured_at: "2026-08-29T09:20:07.898Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:14ee61a2bfa91fde9b7be11f0d7eba56ee6258f1a38d7636fef047baa4b29327"
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
              - ".agentplane/tasks/202608290920-1PZGG8/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202608290920-1PZGG8"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers=1"
                id: "check-focused"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "check-full"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "git diff --check"
                id: "check-diff"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "check-focused"
                description: "An unschedulable current graph still records semantic.plan_refinement and returns replan_required without projecting a WorkItem result."
                id: "criterion-refinement"
                required: true
              -
                check_ids:
                  - "check-focused"
                description: "The no-refinement path retains normal WorkItem selection, idempotency, validation, and fail-closed behavior."
                id: "criterion-normal"
                required: true
              -
                check_ids:
                  - "check-full"
                description: "The complete unchanged local CI suite passes on the final candidate."
                id: "criterion-full"
                required: true
              -
                check_ids:
                  - "check-diff"
                description: "The final patch has no whitespace errors."
                id: "criterion-diff"
                required: true
            evidence_fingerprint: "sha256:8d207fb3ce0dbf64a02e542e5f4be27be31121dd0fa968079488ace7016f41b8"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "check-focused"
                    description: "An unschedulable current graph still records semantic.plan_refinement and returns replan_required without projecting a WorkItem result."
                    id: "criterion-refinement"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                    description: "The no-refinement path retains normal WorkItem selection, idempotency, validation, and fail-closed behavior."
                    id: "criterion-normal"
                    required: true
                  -
                    check_ids:
                      - "check-full"
                    description: "The complete unchanged local CI suite passes on the final candidate."
                    id: "criterion-full"
                    required: true
                  -
                    check_ids:
                      - "check-diff"
                    description: "The final patch has no whitespace errors."
                    id: "criterion-diff"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 65536
                  optional_sources:
                    - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                  symbol_hints:
                    - "recordTaskCentricExternalResult"
                    - "recordPlanRefinement"
                    - "WorkItemScheduler"
                depends_on: []
                expected_outputs:
                  - "refinement-before-selection behavior"
                  - "focused regression evidence"
                id: "refine-before-selection"
                objective: "Record semantic plan refinement before selecting or projecting a WorkItem, return replan_required immediately when the refinement invalidates the current plan, and preserve the ordinary result path."
                optional: false
                priority: 100
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers=1"
                      id: "check-focused"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "check-full"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "check-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "check-focused"
                      description: "An unschedulable current graph still records semantic.plan_refinement and returns replan_required without projecting a WorkItem result."
                      id: "criterion-refinement"
                      required: true
                    -
                      check_ids:
                        - "check-focused"
                      description: "The no-refinement path retains normal WorkItem selection, idempotency, validation, and fail-closed behavior."
                      id: "criterion-normal"
                      required: true
                    -
                      check_ids:
                        - "check-full"
                      description: "The complete unchanged local CI suite passes on the final candidate."
                      id: "criterion-full"
                      required: true
                    -
                      check_ids:
                        - "check-diff"
                      description: "The final patch has no whitespace errors."
                      id: "criterion-diff"
                      required: true
                  evidence_fingerprint: "sha256:8d207fb3ce0dbf64a02e542e5f4be27be31121dd0fa968079488ace7016f41b8"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202608290920-1PZGG8"
    revision: 23
    schema_version: 1
    updated_at: "2026-08-29T11:09:57.120Z"
    work_items:
      verify-evaluator-rework:
        attempt: 0
        claim_id: null
        id: "verify-evaluator-rework"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608290920-1PZGG8-executor-d827f9c36c4124f5b9128d60:
        aggregate_digest: "sha256:28f561cdb465e12431f810e15518a9d4431d0fc0311e91cdbb0c66b9addf1eaa"
        event:
          actor_id: "agentplane"
          at: "2026-08-29T09:34:34.313Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_01ae401db02775e7b7f7412f"
          mutation_id: "external-result:work-order-202608290920-1PZGG8-executor-d827f9c36c4124f5b9128d60"
          plan_digest: "sha256:7f565d70cda39bcf352b1043b604939aaa83c8bd2728f93d9a109db6093a3721"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608290920-1PZGG8"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "refine-before-selection"
        mutation_id: "external-result:work-order-202608290920-1PZGG8-executor-d827f9c36c4124f5b9128d60"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202608290920-1PZGG8"
      plan-refinement:work-order-202608290920-1PZGG8-executor-3e8675c71cf07eb42838889c:
        aggregate_digest: "sha256:5f8e664116f1f3307c9b027091c35c8c26fae8409168a7d1164c86d7d59c198f"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-29T11:00:09.125Z"
          cause_refs:
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_7cee3c128c7782e30c28bd2e"
          mutation_id: "plan-refinement:work-order-202608290920-1PZGG8-executor-3e8675c71cf07eb42838889c"
          plan_digest: "sha256:7f565d70cda39bcf352b1043b604939aaa83c8bd2728f93d9a109db6093a3721"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608290920-1PZGG8"
          task_revision: 21
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608290920-1PZGG8-executor-3e8675c71cf07eb42838889c"
        next_revision: 22
        previous_revision: 21
        schema_version: 1
        task_id: "202608290920-1PZGG8"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    version: 1
id_source: "generated"
---
## Summary

Allow task-centric plan refinement before WorkItem selection

Fix the supported recovery path exposed by 7JCQPF. In recordTaskCentricExternalResult, when semantic.plan_refinement is present, record the refinement against the current approved plan before selecting or projecting a WorkItem result. If the refinement requires replan, return replan_required without requiring a schedulable WorkItem. Preserve normal WorkItem result selection, idempotency, validation, and fail-closed behavior when no refinement is present. Add focused tests for an unschedulable READY WorkItem whose refinement is still recorded, plus unchanged normal result behavior. This is an integration-path blocker for 7JCQPF and PR #5870; do not change release ordering, policy, scheduler semantics, or task stores.

## Scope

- In scope: Fix the supported recovery path exposed by 7JCQPF. In recordTaskCentricExternalResult, when semantic.plan_refinement is present, record the refinement against the current approved plan before selecting or projecting a WorkItem result. If the refinement requires replan, return replan_required without requiring a schedulable WorkItem. Preserve normal WorkItem result selection, idempotency, validation, and fail-closed behavior when no refinement is present. Add focused tests for an unschedulable READY WorkItem whose refinement is still recorded, plus unchanged normal result behavior. This is an integration-path blocker for 7JCQPF and PR #5870; do not change release ordering, policy, scheduler semantics, or task stores.
- Out of scope: unrelated refactors not required for "Allow task-centric plan refinement before WorkItem selection".

## Plan

Prepared a one-WorkItem recovery plan that validates the evaluator rework on the current commit without widening scope.

## Verify Steps

PLANNER fallback scaffold for "Allow task-centric plan refinement before WorkItem selection". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow task-centric plan refinement before WorkItem selection". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-29T09:34:30.895Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:24870fce63c2455441b09f56243e72d224fcac20b52a9799326e9de05d62a231, input_digest=sha256:0379f374b7e860d4b7161bc23cb2064a2872d58a2449ccad32607109515596b5

Details:

Check: affected_unit_integration
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check critical_paths (3/3)

Check: task_outcome
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608290920-1PZGG8 Verification Contract check task_outcome (3/3)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290920-1PZGG8-allow-task-centric-plan-refinement-before-workit/.agentplane/tasks/202608290920-1PZGG8/blueprint/resolved-snapshot.json
- old_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
- current_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608290920-1PZGG8

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

### 2026-08-29T10:55:35.831Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: No executable declared verification checks are configured for this task.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:24870fce63c2455441b09f56243e72d224fcac20b52a9799326e9de05d62a231, input_digest=sha256:e7eaa55729ed399258bb1640b7b5e86cb72a93956310600b9c6b95ac9bba1ee6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290920-1PZGG8-allow-task-centric-plan-refinement-before-workit/.agentplane/tasks/202608290920-1PZGG8/blueprint/resolved-snapshot.json
- old_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
- current_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608290920-1PZGG8

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608290920-1PZGG8
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-29T10:57:05.983Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: No executable declared verification checks are configured for this task.
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:24870fce63c2455441b09f56243e72d224fcac20b52a9799326e9de05d62a231, input_digest=sha256:e7eaa55729ed399258bb1640b7b5e86cb72a93956310600b9c6b95ac9bba1ee6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290920-1PZGG8-allow-task-centric-plan-refinement-before-workit/.agentplane/tasks/202608290920-1PZGG8/blueprint/resolved-snapshot.json
- old_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
- current_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608290920-1PZGG8

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608290920-1PZGG8
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-29T10:58:43.774Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: No executable declared verification checks are configured for this task.
Attempts: 3

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:24870fce63c2455441b09f56243e72d224fcac20b52a9799326e9de05d62a231, input_digest=sha256:e7eaa55729ed399258bb1640b7b5e86cb72a93956310600b9c6b95ac9bba1ee6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290920-1PZGG8-allow-task-centric-plan-refinement-before-workit/.agentplane/tasks/202608290920-1PZGG8/blueprint/resolved-snapshot.json
- old_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
- current_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608290920-1PZGG8

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608290920-1PZGG8
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-29T11:00:02.485Z — VERIFY — blocked_external

By: SUPERVISOR

Note: Rework: No executable declared verification checks are configured for this task.
Attempts: 4

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:24870fce63c2455441b09f56243e72d224fcac20b52a9799326e9de05d62a231, input_digest=sha256:8712b04ad0872ab0ad667f1e4ba766ab10877f12d08ad5d95d5b2732252db6b0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290920-1PZGG8-allow-task-centric-plan-refinement-before-workit/.agentplane/tasks/202608290920-1PZGG8/blueprint/resolved-snapshot.json
- old_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
- current_digest: 8ea523d85b10d9639a2d3a53bac171c4c1c116ba1da4fa5f9db36607f1d0691e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608290920-1PZGG8

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608290920-1PZGG8
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
