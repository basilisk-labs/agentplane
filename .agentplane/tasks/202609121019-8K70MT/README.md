---
id: "202609121019-8K70MT"
title: "Make verification rework exhaustion atomically project BLOCKED into the task-centric aggregate, with focused regression coverage, so supervisor verification failures cannot leave a partial task-centric projection"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 18
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run typecheck"
  - "bunx --no-install vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts --maxWorkers=1"
plan_approval:
  state: "approved"
  updated_at: "2026-09-12T12:24:25.160Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:e73a41a0b87ec2c4ac2e53dc41c4480c77359ed79e4fae0202322ca2d59d8075"
verification:
  state: "needs_rework"
  updated_at: "2026-09-12T12:13:50.978Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Declared check failed: bun run ci:local:full"
  attempts: 3
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
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-projection.ts"
      - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Hosted integration is required because the projection guards all task lifecycle mutations."
      - "The defect is isolated to compatibility projection of the terminal verification status and its closest atomic mutation regression coverage."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-projection.ts"
      - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
  observed:
    authority_violations:
      - "verification:recorded-check-4:fail"
      - "verification:verification-record:fail"
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-projection.ts"
      - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
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
        result: "fail"
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
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-projection.ts"
          - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
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
      digest: "sha256:79bb5ef05a4fc16f988ef89cb50c4825c7099c4249fb7d42253f6744034f1dfe"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/task-mutation.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-mutation.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-projection.ts"
          - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
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
      - "verification_recovery:recorded-check-4"
      - "verification_recovery:verification-record"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 623d972500d9. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: f5a14428c66f. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 8b46de617d4a. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-12T10:28:07.196Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-12T10:31:19.804Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 623d972500d9. CLI accepted one state-bound external-agent semantic result."
    commit: "623d972500d99d1250ad28d04bd93bee803a4d6f"
  -
    type: "verify"
    at: "2026-09-12T11:02:21.202Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-09-12T11:07:14.670Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: f5a14428c66f. CLI accepted one state-bound external-agent semantic result."
    commit: "f5a14428c66f80bd41e194d5973b97165b0d8654"
  -
    type: "verify"
    at: "2026-09-12T11:37:36.294Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-09-12T11:43:36.595Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 8b46de617d4a. CLI accepted one state-bound external-agent semantic result."
    commit: "8b46de617d4a91c37ca8ae976e3309dd0f9fc872"
  -
    type: "verify"
    at: "2026-09-12T12:13:50.978Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
doc_version: 3
doc_updated_at: "2026-09-12T12:21:14.214Z"
doc_updated_by: "SUPERVISOR"
description: "When a needs_rework verification exceeds evaluator.max_rework_attempts, compatibility mutation currently sets the legacy task status to BLOCKED while leaving the canonical task-centric lifecycle ACTIVE, triggering task_centric_projection_mismatch and preventing recovery. Preserve normal ACTIVE rework behavior, atomically project terminal exhaustion to BLOCKED, and cover the boundary with focused tests."
sections:
  Summary: |-
    Make verification rework exhaustion atomically project BLOCKED into the task-centric aggregate, with focused regression coverage, so supervisor verification failures cannot leave a partial task-centric projection

    When a needs_rework verification exceeds evaluator.max_rework_attempts, compatibility mutation currently sets the legacy task status to BLOCKED while leaving the canonical task-centric lifecycle ACTIVE, triggering task_centric_projection_mismatch and preventing recovery. Preserve normal ACTIVE rework behavior, atomically project terminal exhaustion to BLOCKED, and cover the boundary with focused tests.
  Scope: |-
    - In scope: When a needs_rework verification exceeds evaluator.max_rework_attempts, compatibility mutation currently sets the legacy task status to BLOCKED while leaving the canonical task-centric lifecycle ACTIVE, triggering task_centric_projection_mismatch and preventing recovery. Preserve normal ACTIVE rework behavior, atomically project terminal exhaustion to BLOCKED, and cover the boundary with focused tests.
    - Out of scope: unrelated refactors not required for "Make verification rework exhaustion atomically project BLOCKED into the task-centric aggregate, with focused regression coverage, so supervisor verification failures cannot leave a partial task-centric projection".
  Plan: "Preserve the implementation scope and give the required full regression check a 45-minute outer timeout."
  Verify Steps: |-
    1. Run `bunx --no-install vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts --maxWorkers=1`. Expected: terminal verification exhaustion projects canonical BLOCKED while existing rework behavior remains unchanged.
    2. Run `bun run typecheck`. Expected: TypeScript build passes.
    3. Run `git diff --check`. Expected: no whitespace errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-12T11:02:21.202Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:b0d80d98554e3667a80aa23348e4f870335af77f2c3d7653cf076e48bbc36666, input_digest=sha256:d43b073ae036dbeb9e9c72453eb1933bdb9cf84171c9fcbd66743a8942f87f99

    Details:

    Command: bunx --no-install vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609121019-8K70MT declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609121019-8K70MT declared verification

    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609121019-8K70MT declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609121019-8K70MT declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202609121019-8K70MT-make-verification-rework-exhaustion-atomically-p/.agentplane/tasks/202609121019-8K70MT/blueprint/resolved-snapshot.json
    - old_digest: 64d8ed4597711fd2487eaf045d531db4d83fa7be2833be34da0bf5b386c33cda
    - current_digest: 64d8ed4597711fd2487eaf045d531db4d83fa7be2833be34da0bf5b386c33cda
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609121019-8K70MT

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609121019-8K70MT
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-12T11:37:36.294Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:b0d80d98554e3667a80aa23348e4f870335af77f2c3d7653cf076e48bbc36666, input_digest=sha256:8ba92fbe8d60443fc952df8ed1fce1e6f29d74070bae2c9ee24062730cad715e

    Details:

    Command: bunx --no-install vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609121019-8K70MT declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609121019-8K70MT declared verification

    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609121019-8K70MT declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609121019-8K70MT declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202609121019-8K70MT-make-verification-rework-exhaustion-atomically-p/.agentplane/tasks/202609121019-8K70MT/blueprint/resolved-snapshot.json
    - old_digest: 64d8ed4597711fd2487eaf045d531db4d83fa7be2833be34da0bf5b386c33cda
    - current_digest: 64d8ed4597711fd2487eaf045d531db4d83fa7be2833be34da0bf5b386c33cda
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609121019-8K70MT

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609121019-8K70MT
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-12T12:13:50.978Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 3

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:b0d80d98554e3667a80aa23348e4f870335af77f2c3d7653cf076e48bbc36666, input_digest=sha256:288935b02ce6a36d4bec709dc7f7fc63cee73251d7716910a6b8b2683bbb2d6f

    Details:

    Command: bunx --no-install vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609121019-8K70MT declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609121019-8K70MT declared verification

    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609121019-8K70MT declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609121019-8K70MT declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202609121019-8K70MT-make-verification-rework-exhaustion-atomically-p/.agentplane/tasks/202609121019-8K70MT/blueprint/resolved-snapshot.json
    - old_digest: 64d8ed4597711fd2487eaf045d531db4d83fa7be2833be34da0bf5b386c33cda
    - current_digest: 64d8ed4597711fd2487eaf045d531db4d83fa7be2833be34da0bf5b386c33cda
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609121019-8K70MT

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609121019-8K70MT
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
    approval_evidence_digest: "sha256:e73a41a0b87ec2c4ac2e53dc41c4480c77359ed79e4fae0202322ca2d59d8075"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a926c963876adf9a9f73425d250dc5309d71be07d4585e6c546f21d1c546e780"
    digest: "sha256:05f24a299e3e21dc62e70732e0266b39465a6193d36a61d4342c21f189a1a644"
    grant_id: "38d0b198-f2ab-445a-bd79-f2d0851705d7"
    issued_at: "2026-09-12T12:24:25.160Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:240d60e3ed1cbc29b2cc7aaab2887d3f73721865aa6517e93e18b83964461060"
    plan_revision: 17
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609121019-8K70MT"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-12T12:24:25.160Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:93e7f3a2d314dd2cb370893f494cf41377a615bc4c9dee65bf408270a3a33a9e"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-12T12:21:14.078Z"
      digest: "sha256:93e7f3a2d314dd2cb370893f494cf41377a615bc4c9dee65bf408270a3a33a9e"
      proposal:
        assumptions:
          - "A 2700000ms outer timeout is sufficient for the clean full regression gate based on observed runtime near 1800000ms before forced termination."
        planning_baseline:
          captured_at: "2026-09-12T12:18:56.397Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:cf981590863d1b8511c8a16582c295eaa1469140aee77cca716bcbffccbb1da6"
          dirty_paths:
            - ".agentplane/tasks/202609121019-8K70MT/README.md"
            - ".agentplane/tasks/202609121019-8K70MT/pr/meta.json"
            - ".agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json"
            - ".agentplane/tasks/202609121019-8K70MT/verification/20260912121350978-f8947c4a9a45e3cb.json"
          git:
            kind: "commit"
            ref: null
            sha: "bdfa9d6d00847f4b7229f64ba4be4a5b2061e79d"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:16"
        schema_version: 1
        task_id: "202609121019-8K70MT"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx --no-install vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts --maxWorkers=1"
              id: "projection-regressions"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "diff-check"
              kind: "deterministic"
              required: true
              timeout_ms: 60000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-regression"
              kind: "deterministic"
              required: true
              timeout_ms: 2700000
          criteria:
            -
              check_ids:
                - "projection-regressions"
              description: "When verification rework exhaustion produces legacy status BLOCKED and verification state blocked_external from an ACTIVE task-centric aggregate, the same compatibility mutation advances the canonical lifecycle to BLOCKED at the same next revision."
              id: "terminal-rework-projects-blocked"
              required: true
            -
              check_ids:
                - "projection-regressions"
                - "typecheck"
              description: "Ordinary ACTIVE metadata mutations and the existing COMPLETED-to-ACTIVE verification rework projection retain their current behavior and atomic revision receipts."
              id: "existing-projection-semantics-preserved"
              required: true
            -
              check_ids:
                - "diff-check"
              description: "The implementation changes only the compatibility projection and its closest regression test; verification policy, attempt limits, supervisor routing, and CI implementation remain unchanged."
              id: "product-scope-remains-narrow"
              required: true
            -
              check_ids:
                - "full-regression"
              description: "The repository full regression gate completes successfully with an explicit 2700000ms task-level timeout budget."
              id: "full-regression-completes"
              required: true
          evidence_fingerprint: "sha256:cf981590863d1b8511c8a16582c295eaa1469140aee77cca716bcbffccbb1da6"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "projection-regressions"
                  description: "When verification rework exhaustion produces legacy status BLOCKED and verification state blocked_external from an ACTIVE task-centric aggregate, the same compatibility mutation advances the canonical lifecycle to BLOCKED at the same next revision."
                  id: "terminal-rework-projects-blocked"
                  required: true
                -
                  check_ids:
                    - "projection-regressions"
                    - "typecheck"
                  description: "Ordinary ACTIVE metadata mutations and the existing COMPLETED-to-ACTIVE verification rework projection retain their current behavior and atomic revision receipts."
                  id: "existing-projection-semantics-preserved"
                  required: true
                -
                  check_ids:
                    - "diff-check"
                  description: "The implementation changes only the compatibility projection and its closest regression test; verification policy, attempt limits, supervisor routing, and CI implementation remain unchanged."
                  id: "product-scope-remains-narrow"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 140000
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-projection.ts"
                  - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
                  - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
                  - "packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts"
                symbol_hints:
                  - "projectTaskCentricCompatibilityMutation"
                  - "executeTaskVerificationTransitionRequest"
              depends_on: []
              expected_outputs:
                - "atomic terminal rework BLOCKED projection"
                - "focused regression coverage"
              id: "project-terminal-verification-block"
              objective: "Teach the task-centric compatibility projection to map only the terminal verification rework exhaustion shape to canonical BLOCKED, and cover the persisted atomic mutation while preserving existing projection semantics."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend/task-centric-backend-projection.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/task-mutation.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend/task-centric-backend-projection.ts"
                - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx --no-install vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts --maxWorkers=1"
                    id: "projection-regressions"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "diff-check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 60000
                criteria:
                  -
                    check_ids:
                      - "projection-regressions"
                    description: "When verification rework exhaustion produces legacy status BLOCKED and verification state blocked_external from an ACTIVE task-centric aggregate, the same compatibility mutation advances the canonical lifecycle to BLOCKED at the same next revision."
                    id: "terminal-rework-projects-blocked"
                    required: true
                  -
                    check_ids:
                      - "projection-regressions"
                      - "typecheck"
                    description: "Ordinary ACTIVE metadata mutations and the existing COMPLETED-to-ACTIVE verification rework projection retain their current behavior and atomic revision receipts."
                    id: "existing-projection-semantics-preserved"
                    required: true
                  -
                    check_ids:
                      - "diff-check"
                    description: "The implementation changes only the compatibility projection and its closest regression test; verification policy, attempt limits, supervisor routing, and CI implementation remain unchanged."
                    id: "product-scope-remains-narrow"
                    required: true
                evidence_fingerprint: "sha256:cf981590863d1b8511c8a16582c295eaa1469140aee77cca716bcbffccbb1da6"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202609121019-8K70MT"
    event_cursor: 13
    final_validation: null
    id: "202609121019-8K70MT"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bunx --no-install vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts --maxWorkers=1"
          id: "legacy-2"
          required: true
      captured_at: "2026-09-12T10:19:45.957Z"
      constraints: []
      request: |-
        Make verification rework exhaustion atomically project BLOCKED into the task-centric aggregate, with focused regression coverage, so supervisor verification failures cannot leave a partial task-centric projection

        When a needs_rework verification exceeds evaluator.max_rework_attempts, compatibility mutation currently sets the legacy task status to BLOCKED while leaving the canonical task-centric lifecycle ACTIVE, triggering task_centric_projection_mismatch and preventing recovery. Preserve normal ACTIVE rework behavior, atomically project terminal exhaustion to BLOCKED, and cover the boundary with focused tests.
      task_id: "202609121019-8K70MT"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-12T10:27:30.950Z"
          approved_by: "HOST:codex:USER"
          approved_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-12T10:21:57.654Z"
        digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
        proposal:
          assumptions:
            - "A legacy status BLOCKED paired with verification state blocked_external is the terminal rework-exhaustion shape that must advance the canonical lifecycle to BLOCKED."
          planning_baseline:
            captured_at: "2026-09-12T10:19:53.313Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:8bda2c3f10021684c5a519407b22629b13d8ca01a2b4c35d1ad3583484c53ff0"
            dirty_paths:
              - ".agentplane/tasks/202609111341-FK9C2T/README.md"
              - ".agentplane/tasks/202609111341-SED9K5/README.md"
              - ".agentplane/tasks/202609111502-4XSWZQ/README.md"
              - ".agentplane/tasks/202609121019-8K70MT/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "50b1810dda648be0c0762b47e885c6ad0b2d42af"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609121019-8K70MT"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bunx --no-install vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts --maxWorkers=1"
                id: "projection-regressions"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "typecheck"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "git diff --check"
                id: "diff-check"
                kind: "deterministic"
                required: true
                timeout_ms: 60000
            criteria:
              -
                check_ids:
                  - "projection-regressions"
                description: "When verification rework exhaustion produces legacy status BLOCKED and verification state blocked_external from an ACTIVE task-centric aggregate, the same compatibility mutation advances the canonical lifecycle to BLOCKED at the same next revision."
                id: "terminal-rework-projects-blocked"
                required: true
              -
                check_ids:
                  - "projection-regressions"
                  - "typecheck"
                description: "Ordinary ACTIVE metadata mutations and the existing COMPLETED-to-ACTIVE verification rework projection retain their current behavior and atomic revision receipts."
                id: "existing-projection-semantics-preserved"
                required: true
              -
                check_ids:
                  - "diff-check"
                description: "The implementation changes only the compatibility projection and its closest regression test; verification policy, attempt limits, supervisor routing, and timeout behavior remain unchanged."
                id: "scope-remains-narrow"
                required: true
            evidence_fingerprint: "sha256:8bda2c3f10021684c5a519407b22629b13d8ca01a2b4c35d1ad3583484c53ff0"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "projection-regressions"
                    description: "When verification rework exhaustion produces legacy status BLOCKED and verification state blocked_external from an ACTIVE task-centric aggregate, the same compatibility mutation advances the canonical lifecycle to BLOCKED at the same next revision."
                    id: "terminal-rework-projects-blocked"
                    required: true
                  -
                    check_ids:
                      - "projection-regressions"
                      - "typecheck"
                    description: "Ordinary ACTIVE metadata mutations and the existing COMPLETED-to-ACTIVE verification rework projection retain their current behavior and atomic revision receipts."
                    id: "existing-projection-semantics-preserved"
                    required: true
                  -
                    check_ids:
                      - "diff-check"
                    description: "The implementation changes only the compatibility projection and its closest regression test; verification policy, attempt limits, supervisor routing, and timeout behavior remain unchanged."
                    id: "scope-remains-narrow"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 140000
                  optional_sources: []
                  required_sources:
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-projection.ts"
                    - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
                    - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
                    - "packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts"
                  symbol_hints:
                    - "projectTaskCentricCompatibilityMutation"
                    - "executeTaskVerificationTransitionRequest"
                depends_on: []
                expected_outputs:
                  - "atomic terminal rework BLOCKED projection"
                  - "focused regression coverage"
                id: "project-terminal-verification-block"
                objective: "Teach the task-centric compatibility projection to map only the terminal verification rework exhaustion shape to canonical BLOCKED, and add an atomic mutation regression while preserving existing projection semantics."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend/task-centric-backend-projection.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared/task-mutation.test.ts"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-projection.ts"
                  - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx --no-install vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts --maxWorkers=1"
                      id: "projection-regressions"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "typecheck"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "diff-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 60000
                  criteria:
                    -
                      check_ids:
                        - "projection-regressions"
                      description: "When verification rework exhaustion produces legacy status BLOCKED and verification state blocked_external from an ACTIVE task-centric aggregate, the same compatibility mutation advances the canonical lifecycle to BLOCKED at the same next revision."
                      id: "terminal-rework-projects-blocked"
                      required: true
                    -
                      check_ids:
                        - "projection-regressions"
                        - "typecheck"
                      description: "Ordinary ACTIVE metadata mutations and the existing COMPLETED-to-ACTIVE verification rework projection retain their current behavior and atomic revision receipts."
                      id: "existing-projection-semantics-preserved"
                      required: true
                    -
                      check_ids:
                        - "diff-check"
                      description: "The implementation changes only the compatibility projection and its closest regression test; verification policy, attempt limits, supervisor routing, and timeout behavior remain unchanged."
                      id: "scope-remains-narrow"
                      required: true
                  evidence_fingerprint: "sha256:8bda2c3f10021684c5a519407b22629b13d8ca01a2b4c35d1ad3583484c53ff0"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609121019-8K70MT"
    revision: 18
    schema_version: 1
    updated_at: "2026-09-12T12:21:14.214Z"
    work_items:
      project-terminal-verification-block:
        attempt: 0
        claim_id: null
        id: "project-terminal-verification-block"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-12T10:31:40.323Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:91146d2e3375450ee05698a2294b6f02174c28f0b172f8509767b84790bb2709"
        entity: "work_item"
        id: "event_15981df2fb28b77893378f8f"
        mutation_id: "external-result:work-order-202609121019-8K70MT-executor-b7eab56d1e2e4e1820a72101"
        plan_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121019-8K70MT"
        task_revision: 7
        work_item_id: "project-terminal-verification-block"
      -
        at: "2026-09-12T12:18:42.730Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "acceptance_changed"
        entity: "task"
        id: "event_fcdf55c1b832916523da85f4"
        mutation_id: "plan-refinement:work-order-202609121019-8K70MT-executor-1119fee01124128d064340a4"
        plan_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121019-8K70MT"
        task_revision: 15
        work_item_id: null
    leases: []
    mutation_receipts:
      compatibility:sha256:15a2ce2dfca794811fcdaf14a65dca8abf08b2f102f0a26140fbb68645f0a5bf:
        aggregate_digest: "sha256:98b9929170d39cb122d35708bd7118325d64de2cea5239cfd94823d2f6bce3a0"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T11:02:30.592Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_a8d7b9e11766f873f4ceacff"
          mutation_id: "compatibility:sha256:15a2ce2dfca794811fcdaf14a65dca8abf08b2f102f0a26140fbb68645f0a5bf"
          plan_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121019-8K70MT"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:15a2ce2dfca794811fcdaf14a65dca8abf08b2f102f0a26140fbb68645f0a5bf"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609121019-8K70MT"
      compatibility:sha256:189bf9eeaa928743be7018dfe6d90c2bc410f7f7c4a4f31190e8f5ac8f66a8cb:
        aggregate_digest: "sha256:57d615d40e8896d2cf8d54504193c8450967051eceb3754c3334b70391014fda"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T10:26:57.067Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_44d55fc200b0a693e242b9db"
          mutation_id: "compatibility:sha256:189bf9eeaa928743be7018dfe6d90c2bc410f7f7c4a4f31190e8f5ac8f66a8cb"
          plan_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121019-8K70MT"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:189bf9eeaa928743be7018dfe6d90c2bc410f7f7c4a4f31190e8f5ac8f66a8cb"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609121019-8K70MT"
      compatibility:sha256:40d9620d9774223f1672dbda95137cfed5ec8c28e033c4bba54ff4525f24cc0c:
        aggregate_digest: "sha256:2c330c19f8ff9fe46c5ef23aa6794f2f6ea012ba95d4b0eff8c67fadb26c8680"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T10:31:19.804Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3a296e996024f6bc773396cb"
          mutation_id: "compatibility:sha256:40d9620d9774223f1672dbda95137cfed5ec8c28e033c4bba54ff4525f24cc0c"
          plan_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121019-8K70MT"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:40d9620d9774223f1672dbda95137cfed5ec8c28e033c4bba54ff4525f24cc0c"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609121019-8K70MT"
      compatibility:sha256:4c8c5928aa6619d22df4d81ac5e3f6bc2a11e6b066fa43fbfa7a725eea49c3b2:
        aggregate_digest: "sha256:b995feb2cd1e7a2302aa5d86a7fda15de6cafd020de371621f480e434a8d6b99"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T11:38:02.177Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_45ec7bfa15d265e3e2d3e31e"
          mutation_id: "compatibility:sha256:4c8c5928aa6619d22df4d81ac5e3f6bc2a11e6b066fa43fbfa7a725eea49c3b2"
          plan_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121019-8K70MT"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:4c8c5928aa6619d22df4d81ac5e3f6bc2a11e6b066fa43fbfa7a725eea49c3b2"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609121019-8K70MT"
      compatibility:sha256:6418fab8c649d4d0fd258c36d734ff374c88723c9f87334d467fb6c7d289d6cd:
        aggregate_digest: "sha256:751acdd9fef91e3afb84dd7873d4917ce6606073e864cd100812fd495389cb00"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T11:43:36.595Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_d8a0f36b9e53b2c1f9a05b64"
          mutation_id: "compatibility:sha256:6418fab8c649d4d0fd258c36d734ff374c88723c9f87334d467fb6c7d289d6cd"
          plan_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121019-8K70MT"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6418fab8c649d4d0fd258c36d734ff374c88723c9f87334d467fb6c7d289d6cd"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609121019-8K70MT"
      compatibility:sha256:6b7bff0026d43adada3d13b170cfc56bc94c93617ef26f8dc444e686a6f593dd:
        aggregate_digest: "sha256:a48c4c886d43165cabc40aba7fe0c5a281eecc465183c3806ca888ca4f474c10"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T10:28:07.196Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_90bcd05f9da9a78cd1944a4c"
          mutation_id: "compatibility:sha256:6b7bff0026d43adada3d13b170cfc56bc94c93617ef26f8dc444e686a6f593dd"
          plan_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121019-8K70MT"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6b7bff0026d43adada3d13b170cfc56bc94c93617ef26f8dc444e686a6f593dd"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609121019-8K70MT"
      compatibility:sha256:722e71a91759134181e6a72be74149b00cd878c75abd887ac78cc926fd32453b:
        aggregate_digest: "sha256:406c266e2a9349aeb759b89193caf3783bdc6598ccf0f5d31437c0829606987a"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T10:31:19.804Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_adcb4698837bd68778a33c76"
          mutation_id: "compatibility:sha256:722e71a91759134181e6a72be74149b00cd878c75abd887ac78cc926fd32453b"
          plan_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121019-8K70MT"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:722e71a91759134181e6a72be74149b00cd878c75abd887ac78cc926fd32453b"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609121019-8K70MT"
      compatibility:sha256:9b932cbe878b1d9ebf83f3923b4d0218d825ae60afec22669ae00d2c153c27e2:
        aggregate_digest: "sha256:65a0e6254fb89c3d76d420802c4e8d579ee2a20beec9003a55594d5e5c0587e2"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T10:26:57.069Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_5ac25676e77e9c6fb8beefed"
          mutation_id: "compatibility:sha256:9b932cbe878b1d9ebf83f3923b4d0218d825ae60afec22669ae00d2c153c27e2"
          plan_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121019-8K70MT"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:9b932cbe878b1d9ebf83f3923b4d0218d825ae60afec22669ae00d2c153c27e2"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609121019-8K70MT"
      compatibility:sha256:a5c5405a055eff160e206b625b5e68fe64e1be6c604c7ac6f01d465c8ebcb341:
        aggregate_digest: "sha256:b477f2d883193499df780507bb3b521f1aaa46caa5de0f01dbc488ed4a9e82f0"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T11:07:14.670Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_022885bdbcd0920c76759028"
          mutation_id: "compatibility:sha256:a5c5405a055eff160e206b625b5e68fe64e1be6c604c7ac6f01d465c8ebcb341"
          plan_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121019-8K70MT"
          task_revision: 10
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a5c5405a055eff160e206b625b5e68fe64e1be6c604c7ac6f01d465c8ebcb341"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609121019-8K70MT"
      compatibility:sha256:b92ebf6a234f912dd494b0e8e9f9a33965f348362fcd66b3b7086cdbde363002:
        aggregate_digest: "sha256:0ed3904d2b160b734cb2de0009a165ce0853dc032aa408b49d4802cc82236a7a"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T12:21:14.214Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_d543c3cae081f8e6288657f6"
          mutation_id: "compatibility:sha256:b92ebf6a234f912dd494b0e8e9f9a33965f348362fcd66b3b7086cdbde363002"
          plan_digest: "sha256:93e7f3a2d314dd2cb370893f494cf41377a615bc4c9dee65bf408270a3a33a9e"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121019-8K70MT"
          task_revision: 17
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b92ebf6a234f912dd494b0e8e9f9a33965f348362fcd66b3b7086cdbde363002"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202609121019-8K70MT"
      compatibility:sha256:c3fe48dad0a0cdf14ff7fcd59177a9ed910879284a796c27c56b525ef6a39e4c:
        aggregate_digest: "sha256:56389671a529f3bc6b8e0a01998889a8019b19be56605ccbc9398e8c27910ef7"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T12:14:56.483Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_0b3b75ae915425bd7aa284ec"
          mutation_id: "compatibility:sha256:c3fe48dad0a0cdf14ff7fcd59177a9ed910879284a796c27c56b525ef6a39e4c"
          plan_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121019-8K70MT"
          task_revision: 14
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:c3fe48dad0a0cdf14ff7fcd59177a9ed910879284a796c27c56b525ef6a39e4c"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609121019-8K70MT"
      compatibility:sha256:e4ebb39d688d9eb7d75ccc7597c3dbf38edd27b001ce14be4d73de0ce489de3c:
        aggregate_digest: "sha256:7afce5c9fadf6f106e3df5f6cbfd2695689fc5b72b791d6546643e53ae1acfbd"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T11:07:14.670Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_a550d671ff7dafa6f59aa459"
          mutation_id: "compatibility:sha256:e4ebb39d688d9eb7d75ccc7597c3dbf38edd27b001ce14be4d73de0ce489de3c"
          plan_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121019-8K70MT"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e4ebb39d688d9eb7d75ccc7597c3dbf38edd27b001ce14be4d73de0ce489de3c"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609121019-8K70MT"
      compatibility:sha256:f5933e2445a96a41529c878c3220ba13d09d6ae34e366ecfdceab92f4b18750e:
        aggregate_digest: "sha256:68d59765cf43c57beabea6026dbfb20be18970fa2b8565807d5c4dbb17af9e11"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T11:43:36.595Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_9c3ca0c391b49172876289d3"
          mutation_id: "compatibility:sha256:f5933e2445a96a41529c878c3220ba13d09d6ae34e366ecfdceab92f4b18750e"
          plan_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121019-8K70MT"
          task_revision: 13
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f5933e2445a96a41529c878c3220ba13d09d6ae34e366ecfdceab92f4b18750e"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609121019-8K70MT"
      external-result:work-order-202609121019-8K70MT-executor-b7eab56d1e2e4e1820a72101:
        aggregate_digest: "sha256:455e894b50899f12c8d08627cb0670499a6bcb9fe209605b61e7dc60af74a72c"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T10:31:40.323Z"
          cause_refs:
            - "semantic-result:sha256:91146d2e3375450ee05698a2294b6f02174c28f0b172f8509767b84790bb2709"
          entity: "work_item"
          from: "READY"
          id: "event_15981df2fb28b77893378f8f"
          mutation_id: "external-result:work-order-202609121019-8K70MT-executor-b7eab56d1e2e4e1820a72101"
          plan_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121019-8K70MT"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "project-terminal-verification-block"
        mutation_id: "external-result:work-order-202609121019-8K70MT-executor-b7eab56d1e2e4e1820a72101"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609121019-8K70MT"
      plan-refinement:work-order-202609121019-8K70MT-executor-1119fee01124128d064340a4:
        aggregate_digest: "sha256:ab0d003cbb3536df5374803d3355c6ac9be2a440cb3670eb6807363d04779684"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-12T12:18:42.730Z"
          cause_refs:
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_fcdf55c1b832916523da85f4"
          mutation_id: "plan-refinement:work-order-202609121019-8K70MT-executor-1119fee01124128d064340a4"
          plan_digest: "sha256:b433fea5232868963d7e2a901a4ac1a46d3998e0f110d4d454510a21a4cd5a34"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121019-8K70MT"
          task_revision: 15
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121019-8K70MT-executor-1119fee01124128d064340a4"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609121019-8K70MT"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "50b1810dda648be0c0762b47e885c6ad0b2d42af"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "50b1810dda648be0c0762b47e885c6ad0b2d42af"
    version: 1
id_source: "generated"
---
## Summary

Make verification rework exhaustion atomically project BLOCKED into the task-centric aggregate, with focused regression coverage, so supervisor verification failures cannot leave a partial task-centric projection

When a needs_rework verification exceeds evaluator.max_rework_attempts, compatibility mutation currently sets the legacy task status to BLOCKED while leaving the canonical task-centric lifecycle ACTIVE, triggering task_centric_projection_mismatch and preventing recovery. Preserve normal ACTIVE rework behavior, atomically project terminal exhaustion to BLOCKED, and cover the boundary with focused tests.

## Scope

- In scope: When a needs_rework verification exceeds evaluator.max_rework_attempts, compatibility mutation currently sets the legacy task status to BLOCKED while leaving the canonical task-centric lifecycle ACTIVE, triggering task_centric_projection_mismatch and preventing recovery. Preserve normal ACTIVE rework behavior, atomically project terminal exhaustion to BLOCKED, and cover the boundary with focused tests.
- Out of scope: unrelated refactors not required for "Make verification rework exhaustion atomically project BLOCKED into the task-centric aggregate, with focused regression coverage, so supervisor verification failures cannot leave a partial task-centric projection".

## Plan

Preserve the implementation scope and give the required full regression check a 45-minute outer timeout.

## Verify Steps

1. Run `bunx --no-install vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts --maxWorkers=1`. Expected: terminal verification exhaustion projects canonical BLOCKED while existing rework behavior remains unchanged.
2. Run `bun run typecheck`. Expected: TypeScript build passes.
3. Run `git diff --check`. Expected: no whitespace errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-12T11:02:21.202Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:b0d80d98554e3667a80aa23348e4f870335af77f2c3d7653cf076e48bbc36666, input_digest=sha256:d43b073ae036dbeb9e9c72453eb1933bdb9cf84171c9fcbd66743a8942f87f99

Details:

Command: bunx --no-install vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609121019-8K70MT declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609121019-8K70MT declared verification

Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609121019-8K70MT declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609121019-8K70MT declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202609121019-8K70MT-make-verification-rework-exhaustion-atomically-p/.agentplane/tasks/202609121019-8K70MT/blueprint/resolved-snapshot.json
- old_digest: 64d8ed4597711fd2487eaf045d531db4d83fa7be2833be34da0bf5b386c33cda
- current_digest: 64d8ed4597711fd2487eaf045d531db4d83fa7be2833be34da0bf5b386c33cda
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609121019-8K70MT

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609121019-8K70MT
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-12T11:37:36.294Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:b0d80d98554e3667a80aa23348e4f870335af77f2c3d7653cf076e48bbc36666, input_digest=sha256:8ba92fbe8d60443fc952df8ed1fce1e6f29d74070bae2c9ee24062730cad715e

Details:

Command: bunx --no-install vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609121019-8K70MT declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609121019-8K70MT declared verification

Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609121019-8K70MT declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609121019-8K70MT declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202609121019-8K70MT-make-verification-rework-exhaustion-atomically-p/.agentplane/tasks/202609121019-8K70MT/blueprint/resolved-snapshot.json
- old_digest: 64d8ed4597711fd2487eaf045d531db4d83fa7be2833be34da0bf5b386c33cda
- current_digest: 64d8ed4597711fd2487eaf045d531db4d83fa7be2833be34da0bf5b386c33cda
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609121019-8K70MT

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609121019-8K70MT
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-12T12:13:50.978Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 3

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:b0d80d98554e3667a80aa23348e4f870335af77f2c3d7653cf076e48bbc36666, input_digest=sha256:288935b02ce6a36d4bec709dc7f7fc63cee73251d7716910a6b8b2683bbb2d6f

Details:

Command: bunx --no-install vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609121019-8K70MT declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609121019-8K70MT declared verification

Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609121019-8K70MT declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202609121019-8K70MT/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609121019-8K70MT declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202609121019-8K70MT-make-verification-rework-exhaustion-atomically-p/.agentplane/tasks/202609121019-8K70MT/blueprint/resolved-snapshot.json
- old_digest: 64d8ed4597711fd2487eaf045d531db4d83fa7be2833be34da0bf5b386c33cda
- current_digest: 64d8ed4597711fd2487eaf045d531db4d83fa7be2833be34da0bf5b386c33cda
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609121019-8K70MT

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609121019-8K70MT
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
