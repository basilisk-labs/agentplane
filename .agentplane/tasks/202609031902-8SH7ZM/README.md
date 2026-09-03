---
id: "202609031902-8SH7ZM"
title: "Repair plan-amendment Verify Steps projection routing"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "lifecycle"
  - "task-centric"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:local:full"
  - "bun run lifecycle:invariants"
  - "bun run lint:core"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-03T19:33:02.545Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:cedcb4b2170ae36f6151c5513c204e75f95eae7fdb479c8346e8bec5c5cb1f28"
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks/task-centric"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "A branch_pr worktree isolates the recovery and permits hosted integration after local verification."
      - "No release metadata, dependency, publication, credential, or destructive Git effect is required."
      - "The correction changes central lifecycle persistence and routing behavior and requires regression tests in the existing task-centric and route suites."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks/task-centric"
  observed:
    authority_violations:
      - "verification:recorded-check-1:fail"
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "fail"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
          - "packages/core/src/tasks/task-centric"
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
          reversibility: "recovery_required"
      digest: "sha256:89edbd2fc18570bef9595e725f7a502a623da228259bff9263ecc8fd5124c99a"
      escalation_reasons:
        - "central_component:packages/core/src/tasks/task-centric"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
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
      requires_real_e2e: true
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "full_regression"
        - "hosted_integration"
        - "real_e2e"
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
      - "verification_recovery:recorded-check-1"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 57487e09cfbd. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: b3e8d65e05a1. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-03T19:09:23.398Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-03T19:17:55.058Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 57487e09cfbd. CLI accepted one state-bound external-agent semantic result."
    commit: "57487e09cfbd905e2dda2e16dd240905367ddb1d"
  -
    type: "status"
    at: "2026-09-03T19:33:10.894Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-09-03T19:33:39.803Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-09-03T19:35:11.639Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: b3e8d65e05a1. CLI accepted one state-bound external-agent semantic result."
    commit: "b3e8d65e05a17f47b45b1bdbc364c8cd97fedd60"
doc_version: 3
doc_updated_at: "2026-09-03T19:35:11.639Z"
doc_updated_by: "SUPERVISOR"
description: "Fix the AgentPlane invariant where a task-specific plan amendment is persisted but sections.Verify Steps remains a PLANNER fallback scaffold, causing EVALUATOR rework to loop into code-only EXECUTOR authority that excludes protected task projections. Materialize accepted task-specific verification amendments atomically into the authoritative task document, invalidate stale evaluator/context packets, and route document-level rework to PLANNER or the AgentPlane-owned projection owner before emitting a fresh EVALUATOR packet. Add focused replay, idempotency, authority-closure, projection, stale-packet, and impossible-loop regressions. Do not grant ordinary EXECUTOR episodes access to .agentplane/tasks, weaken quality gates, hand-edit PX8PZT state, or touch release/version/publication/dependency scope."
sections:
  Summary: |-
    Repair plan-amendment Verify Steps projection routing

    Fix the AgentPlane invariant where a task-specific plan amendment is persisted but sections.Verify Steps remains a PLANNER fallback scaffold, causing EVALUATOR rework to loop into code-only EXECUTOR authority that excludes protected task projections. Materialize accepted task-specific verification amendments atomically into the authoritative task document, invalidate stale evaluator/context packets, and route document-level rework to PLANNER or the AgentPlane-owned projection owner before emitting a fresh EVALUATOR packet. Add focused replay, idempotency, authority-closure, projection, stale-packet, and impossible-loop regressions. Do not grant ordinary EXECUTOR episodes access to .agentplane/tasks, weaken quality gates, hand-edit PX8PZT state, or touch release/version/publication/dependency scope.
  Scope: |-
    - In scope: Fix the AgentPlane invariant where a task-specific plan amendment is persisted but sections.Verify Steps remains a PLANNER fallback scaffold, causing EVALUATOR rework to loop into code-only EXECUTOR authority that excludes protected task projections. Materialize accepted task-specific verification amendments atomically into the authoritative task document, invalidate stale evaluator/context packets, and route document-level rework to PLANNER or the AgentPlane-owned projection owner before emitting a fresh EVALUATOR packet. Add focused replay, idempotency, authority-closure, projection, stale-packet, and impossible-loop regressions. Do not grant ordinary EXECUTOR episodes access to .agentplane/tasks, weaken quality gates, hand-edit PX8PZT state, or touch release/version/publication/dependency scope.
    - Out of scope: unrelated refactors not required for "Repair plan-amendment Verify Steps projection routing".
  Plan: "Refined the three-stage recovery plan so every WorkItem validation command is an exact declared Task check, while preserving commit 57487e09cfbd905e2dda2e16dd240905367ddb1d and assigning the stale CLI fixture correction only to the WorkItem that already owns packages/agentplane/src/cli."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run lifecycle:invariants`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-03T19:33:39.803Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:e5760cbcb744625659d15e314a6b7fcbe83138c978c561d51d27e780214877f8, input_digest=sha256:9ced16bc821c58b1aaa61bde540ff01d8d44498398c77acf8c2688938b6e117c

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609031902-8SH7ZM declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609031902-8SH7ZM-repair-plan-amendment-verify-steps-projection-ro/.agentplane/tasks/202609031902-8SH7ZM/blueprint/resolved-snapshot.json
    - old_digest: 987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86
    - current_digest: 987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609031902-8SH7ZM

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609031902-8SH7ZM
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
    approval_evidence_digest: "sha256:cedcb4b2170ae36f6151c5513c204e75f95eae7fdb479c8346e8bec5c5cb1f28"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:4805140edda15a9847fd70af854cc7bc0b39b8d9baa6bdd18e912159a55b189a"
    grant_id: "7e8c0dd9-8a5e-4695-8ce2-76b56f9ca63a"
    issued_at: "2026-09-03T19:33:02.545Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:855af62bfc83062e8784b8ebc088a3c0930a925ebc7e9d46b979f38d6fab9b13"
    plan_revision: 8
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:db3e90d13fc84277fa70e6738f1e0d1cd502b35ac0cd39bffc1eb2a32226ef30"
    status: "active"
    task_id: "202609031902-8SH7ZM"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-03T19:33:02.545Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-03T19:20:35.226Z"
      digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
      proposal:
        assumptions:
          - "The native task backend remains the sole owner of task README projection writes."
          - "Commit 57487e09cfbd905e2dda2e16dd240905367ddb1d is preserved as recovery implementation evidence."
          - "The provider-digest authority comparison added on main remains fail-closed; only stale fixtures are corrected."
          - "Full local CI executes the focused test files named in the recovery task context."
        planning_baseline:
          captured_at: "2026-09-03T19:18:43.340Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:f3fbfd103afdaab1efad97b6119e39b37611be435e54665d551447a66ab53ccd"
          dirty_paths:
            - ".agentplane/tasks/202609031902-8SH7ZM/README.md"
            - ".agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json"
            - ".agentplane/tasks/202609031902-8SH7ZM/supervision/implementation-evidence.json"
          git:
            kind: "commit"
            ref: null
            sha: "57487e09cfbd905e2dda2e16dd240905367ddb1d"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:7"
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run lint:core"
              id: "lint-core"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "typecheck"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "node .agentplane/policy/check-routing.mjs"
              id: "routing-policy"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run lifecycle:invariants"
              id: "lifecycle-invariants"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-local-ci"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "lint-core"
                - "typecheck"
                - "routing-policy"
                - "lifecycle-invariants"
                - "full-local-ci"
              description: "The lifecycle exits the amendment/evaluator loop with atomic projection, fresh authority, correct role routing, and all quality gates intact."
              id: "recovery-outcome"
              required: true
          evidence_fingerprint: "sha256:f3fbfd103afdaab1efad97b6119e39b37611be435e54665d551447a66ab53ccd"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "typecheck"
                  description: "A clarification amendment replaces only a fallback Verify Steps section from the approved top-level validation and persists the aggregate, document projection, attribution, event, and receipt in one revision-guarded write."
                  id: "amendment-projection-atomic"
                  required: true
                -
                  check_ids:
                    - "typecheck"
                  description: "Replaying the same amendment receipt performs no second write and returns the durable result before expected-revision rejection."
                  id: "amendment-replay-idempotent"
                  required: true
                -
                  check_ids:
                    - "typecheck"
                  description: "Ordinary EXECUTOR authority still excludes .agentplane/tasks; only AgentPlane-owned persistence updates the protected projection."
                  id: "executor-authority-closed"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 131072
                optional_sources:
                  - "packages/core/src/tasks/task-centric/policy.ts"
                required_sources:
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                symbol_hints:
                  - "recordPlanRefinement"
                  - "verificationAmendmentProjection"
                  - "taskSpecificVerifySteps"
              depends_on: []
              expected_outputs:
                - "artifact:verification-amendment-projection"
              id: "materialize-verification-amendment"
              objective: "Complete focused in-scope regression coverage for the committed atomic amendment and Verify Steps projection implementation, preserving receipt-first replay and protected task-document ownership."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-centric"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks/task-centric"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/commands/task"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "typecheck"
                    description: "Typecheck the atomic projection implementation and its focused regression."
                    id: "amendment-projection-atomic"
                    required: true
                  -
                    check_ids:
                      - "typecheck"
                    description: "Typecheck receipt-first idempotent replay."
                    id: "amendment-replay-idempotent"
                    required: true
                  -
                    check_ids:
                      - "typecheck"
                    description: "Typecheck the AgentPlane-owned projection boundary without widening EXECUTOR roots."
                    id: "executor-authority-closed"
                    required: true
                evidence_fingerprint: "sha256:f3fbfd103afdaab1efad97b6119e39b37611be435e54665d551447a66ab53ccd"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "lint-core"
                  description: "Evidence-rework fixtures that change pr/meta.json request a fresh packet instead of reusing stale provider-bound authority."
                  id: "fresh-packet-after-provider-change"
                  required: true
                -
                  check_ids:
                    - "lint-core"
                  description: "A verification-document defect does not emit code-only implementation_rework; the projection owner repairs it before fresh evaluation."
                  id: "correct-owner-routing"
                  required: true
                -
                  check_ids:
                    - "lint-core"
                  description: "Evaluator and prepared-context artifacts issued before the projection transition cannot be accepted as current afterward."
                  id: "stale-review-invalidated"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 163840
                optional_sources:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
                required_sources:
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
                  - "packages/agentplane/src/commands/task/external-agent-plan-refinement.ts"
                symbol_hints:
                  - "implementationReworkStep"
                  - "assertExternalImplementationReturnState"
                  - "isExternalPlanRefinementApplied"
              depends_on:
                - "materialize-verification-amendment"
              expected_outputs:
                - "artifact:document-rework-routing"
              id: "route-document-rework"
              objective: "Correct the stale evidence-rework fixtures without weakening provider fingerprint checks, invalidate obsolete evaluator/context projections after document repair, and route verification-document rework to its owner before a fresh EVALUATOR packet."
              optional: false
              priority: 2
              required_inputs:
                - "artifact:verification-amendment-projection"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/cli"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lint:core"
                    id: "lint-core"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "lint-core"
                    description: "Lint the corrected fresh-packet fixture path."
                    id: "fresh-packet-after-provider-change"
                    required: true
                  -
                    check_ids:
                      - "lint-core"
                    description: "Lint the role-routing correction."
                    id: "correct-owner-routing"
                    required: true
                  -
                    check_ids:
                      - "lint-core"
                    description: "Lint stale evaluator/context invalidation logic."
                    id: "stale-review-invalidated"
                    required: true
                evidence_fingerprint: "sha256:f3fbfd103afdaab1efad97b6119e39b37611be435e54665d551447a66ab53ccd"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "full-local-ci"
                  description: "Focused suites cover amendment projection, replay, authority closure, stale-packet invalidation, owner routing, and repeated-loop convergence."
                  id: "focused-recovery-regressions"
                  required: true
                -
                  check_ids:
                    - "lint-core"
                    - "typecheck"
                    - "routing-policy"
                    - "lifecycle-invariants"
                    - "full-local-ci"
                  description: "Every declared local repository gate succeeds with no release, dependency, publication, workflow, policy, or security-boundary drift."
                  id: "all-repository-gates"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 196608
                optional_sources:
                  - "package.json"
                  - ".agentplane/policy/check-routing.mjs"
                required_sources:
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
                symbol_hints:
                  - "plan refinement"
                  - "Verify Steps"
                  - "implementation_rework_required"
              depends_on:
                - "route-document-rework"
              expected_outputs:
                - "artifact:verified-recovery-invariants"
              id: "prove-recovery-invariants"
              objective: "Run focused recovery regressions and the complete declared lint, typecheck, routing, lifecycle, and local-CI contract, then leave hosted integration to AgentPlane."
              optional: false
              priority: 3
              required_inputs:
                - "artifact:document-rework-routing"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-centric"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks/task-centric"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/cli"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lint:core"
                    id: "lint-core"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "node .agentplane/policy/check-routing.mjs"
                    id: "routing-policy"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "lifecycle-invariants"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-local-ci"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "full-local-ci"
                    description: "Full CI includes and passes the focused recovery regressions."
                    id: "focused-recovery-regressions"
                    required: true
                  -
                    check_ids:
                      - "lint-core"
                      - "typecheck"
                      - "routing-policy"
                      - "lifecycle-invariants"
                      - "full-local-ci"
                    description: "All declared task verification commands pass."
                    id: "all-repository-gates"
                    required: true
                evidence_fingerprint: "sha256:f3fbfd103afdaab1efad97b6119e39b37611be435e54665d551447a66ab53ccd"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202609031902-8SH7ZM"
    event_cursor: 5
    final_validation: null
    id: "202609031902-8SH7ZM"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run lifecycle:invariants"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run lint:core"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-4"
          required: true
        -
          check_ids: []
          description: "node .agentplane/policy/check-routing.mjs"
          id: "legacy-5"
          required: true
      captured_at: "2026-09-03T19:02:26.269Z"
      constraints: []
      request: |-
        Repair plan-amendment Verify Steps projection routing

        Fix the AgentPlane invariant where a task-specific plan amendment is persisted but sections.Verify Steps remains a PLANNER fallback scaffold, causing EVALUATOR rework to loop into code-only EXECUTOR authority that excludes protected task projections. Materialize accepted task-specific verification amendments atomically into the authoritative task document, invalidate stale evaluator/context packets, and route document-level rework to PLANNER or the AgentPlane-owned projection owner before emitting a fresh EVALUATOR packet. Add focused replay, idempotency, authority-closure, projection, stale-packet, and impossible-loop regressions. Do not grant ordinary EXECUTOR episodes access to .agentplane/tasks, weaken quality gates, hand-edit PX8PZT state, or touch release/version/publication/dependency scope.
      task_id: "202609031902-8SH7ZM"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-03T19:09:13.806Z"
          approved_by: "HOST:codex:USER"
          approved_digest: "sha256:1caa7a94a9728c64bc3f06d12d39f8c1dbecfeea263e58d0d36467fd9e05b20a"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-03T19:07:03.762Z"
        digest: "sha256:1caa7a94a9728c64bc3f06d12d39f8c1dbecfeea263e58d0d36467fd9e05b20a"
        proposal:
          assumptions:
            - "The existing native backend remains the authoritative owner for task README projection writes."
            - "The accepted non-material amendment carries enough task-specific verification text to replace the fallback scaffold without synthesizing new acceptance requirements."
            - "Existing task-centric receipt and revision checks remain the idempotency and concurrency boundary."
          planning_baseline:
            captured_at: "2026-09-03T19:03:17.243Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:3df4c1962be3ee3c38e00711d371d525b675767e835147c9898cebcae62e9dca"
            dirty_paths:
              - ".agentplane/tasks/202609031902-8SH7ZM/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "65625c1a19230dd1ca73e87f31a1b975c5363b54"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bunx vitest run packages/agentplane/src/commands/task/task-centric-external-result.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
                id: "focused-recovery-suite"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run lint:core"
                id: "lint-core"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "typecheck"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "node .agentplane/policy/check-routing.mjs"
                id: "routing-policy"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "lifecycle-invariants"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-local-ci"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "focused-recovery-suite"
                  - "lint-core"
                  - "typecheck"
                  - "routing-policy"
                  - "lifecycle-invariants"
                  - "full-local-ci"
                description: "The recovery eliminates the impossible plan-amendment/evaluator loop while preserving authority closure and quality gates."
                id: "task-outcome"
                required: true
            evidence_fingerprint: "sha256:3df4c1962be3ee3c38e00711d371d525b675767e835147c9898cebcae62e9dca"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-amendment-projection"
                    description: "A non-material task-specific verification amendment persists once and replaces the fallback Verify Steps projection in the same guarded transition; replay returns the same authoritative state."
                    id: "amendment-projection-atomic"
                    required: true
                  -
                    check_ids:
                      - "focused-amendment-projection"
                    description: "The implementation keeps .agentplane/tasks outside ordinary EXECUTOR writable roots and uses the AgentPlane-owned persistence boundary for the document projection."
                    id: "executor-authority-unchanged"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 131072
                  optional_sources:
                    - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
                  required_sources:
                    - "packages/core/src/tasks/task-centric/policy.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                    - "packages/agentplane/src/commands/task/external-agent-plan-refinement.ts"
                  symbol_hints:
                    - "applyPlanRefinement"
                    - "recordPlanRefinement"
                    - "applyExternalPlanRefinement"
                depends_on: []
                expected_outputs:
                  - "artifact:verification-amendment-projection"
                id: "materialize-verification-amendment"
                objective: "Make accepted task-specific verification refinements atomically update both the task-centric amendment aggregate and the authoritative task-document Verify Steps projection while preserving replay safety."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-centric"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks/task-centric"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/commands/task"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/commands/task/task-centric-external-result.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                      id: "focused-amendment-projection"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "focused-amendment-projection"
                      description: "Verify atomic amendment and Verify Steps projection persistence, authority closure, and replay idempotency."
                      id: "amendment-projection-atomic"
                      required: true
                    -
                      check_ids:
                        - "focused-amendment-projection"
                      description: "Verify protected task documents remain outside ordinary EXECUTOR writable authority."
                      id: "executor-authority-unchanged"
                      required: true
                  evidence_fingerprint: "sha256:3df4c1962be3ee3c38e00711d371d525b675767e835147c9898cebcae62e9dca"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-routing-convergence"
                    description: "A verification-document defect no longer emits code-only agent.implementation_rework; the authoritative projection is repaired by its owner and the next review uses a fresh packet and context fingerprint."
                    id: "correct-owner-routing"
                    required: true
                  -
                    check_ids:
                      - "focused-routing-convergence"
                    description: "The previously persisted evaluator/context projection cannot be replayed as current after the amendment transition."
                    id: "stale-review-invalidated"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 131072
                  optional_sources:
                    - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
                    - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                    - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
                    - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
                    - "packages/agentplane/src/commands/task/external-agent-plan-refinement.ts"
                  symbol_hints:
                    - "implementationReworkStep"
                    - "executeProductionBranchEpisode"
                    - "isExternalPlanRefinementApplied"
                depends_on:
                  - "materialize-verification-amendment"
                expected_outputs:
                  - "artifact:document-rework-routing"
                id: "route-document-rework"
                objective: "Invalidate stale evaluator and prepared-context projections after a verification amendment and route remaining document-level rework to PLANNER or the AgentPlane-owned projection owner before issuing a fresh EVALUATOR packet."
                optional: false
                priority: 2
                required_inputs:
                  - "artifact:verification-amendment-projection"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/cli"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                      id: "focused-routing-convergence"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "focused-routing-convergence"
                      description: "Verify document-level rework is routed to its owning role instead of code-only implementation rework."
                      id: "correct-owner-routing"
                      required: true
                    -
                      check_ids:
                        - "focused-routing-convergence"
                      description: "Verify stale evaluator and prepared-context projections are invalidated before a fresh review packet."
                      id: "stale-review-invalidated"
                      required: true
                  evidence_fingerprint: "sha256:3df4c1962be3ee3c38e00711d371d525b675767e835147c9898cebcae62e9dca"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-recovery-suite"
                    description: "Focused tests prove amendment persistence, Verify Steps projection, stale-packet invalidation, authority closure, role routing, replay idempotency, and repeated-loop convergence."
                    id: "focused-regressions-pass"
                    required: true
                  -
                    check_ids:
                      - "lint-core"
                      - "typecheck"
                      - "routing-policy"
                      - "lifecycle-invariants"
                      - "full-local-ci"
                    description: "All declared repository checks pass without weakening gates or changing release, dependency, publication, workflow, or policy scope."
                    id: "repository-gates-pass"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 196608
                  optional_sources:
                    - "package.json"
                    - ".agentplane/policy/check-routing.mjs"
                  required_sources:
                    - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                    - "packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
                  symbol_hints:
                    - "pure external plan refinement"
                    - "implementation_rework_required"
                    - "Verify Steps"
                depends_on:
                  - "route-document-rework"
                expected_outputs:
                  - "artifact:verified-recovery-invariants"
                id: "prove-recovery-invariants"
                objective: "Complete focused regression coverage and run the declared lint, typecheck, routing, lifecycle, and full-CI gates for the bounded recovery."
                optional: false
                priority: 3
                required_inputs:
                  - "artifact:document-rework-routing"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-centric"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks/task-centric"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/cli"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/commands/task/task-centric-external-result.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
                      id: "focused-recovery-suite"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lint:core"
                      id: "lint-core"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "typecheck"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-policy"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-local-ci"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "focused-recovery-suite"
                      description: "Focused regressions prove every stated recovery invariant and repeated-loop convergence."
                      id: "focused-regressions-pass"
                      required: true
                    -
                      check_ids:
                        - "lint-core"
                        - "typecheck"
                        - "routing-policy"
                        - "lifecycle-invariants"
                        - "full-local-ci"
                      description: "All declared repository-wide quality gates pass."
                      id: "repository-gates-pass"
                      required: true
                  evidence_fingerprint: "sha256:3df4c1962be3ee3c38e00711d371d525b675767e835147c9898cebcae62e9dca"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
    revision: 14
    schema_version: 1
    updated_at: "2026-09-03T19:35:12.156Z"
    work_items:
      materialize-verification-amendment:
        attempt: 1
        claim_id: null
        id: "materialize-verification-amendment"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:2f148e31c4044631d125d3b1acaf58ec415b1d355ebbd50a0ba86dfb580f458e"
            id: "artifact:verification-amendment-projection"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609031902-8SH7ZM"
              work_item_id: "materialize-verification-amendment"
            provenance:
              - "sha256:bf0b9ee171b9560ef76a4aa987475495be7699440370ac0f7fc42c5ca3f8f2b3"
              - ".agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:98ba17535d98c928eb87def4cf7cb4e1706382d06b253b77ee034ba733cb205f"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json"
              check_id: "typecheck"
              command_identity: "bun run typecheck"
              detail: "Observed by bun run typecheck."
              exit_code: 0
              observed_at: "2026-09-03T19:35:12.150Z"
              repository_snapshot_digest: "sha256:98ba17535d98c928eb87def4cf7cb4e1706382d06b253b77ee034ba733cb205f"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      prove-recovery-invariants:
        attempt: 0
        claim_id: null
        id: "prove-recovery-invariants"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      route-document-rework:
        attempt: 0
        claim_id: null
        id: "route-document-rework"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-03T19:18:41.736Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "acceptance_changed"
        entity: "task"
        id: "event_943edd86bcded561faa816f2"
        mutation_id: "plan-refinement:work-order-202609031902-8SH7ZM-executor-6b7854f90b7b872be4a891e9"
        plan_digest: "sha256:1caa7a94a9728c64bc3f06d12d39f8c1dbecfeea263e58d0d36467fd9e05b20a"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
        task_revision: 6
        work_item_id: null
      -
        at: "2026-09-03T19:35:12.156Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_8fc297ecdcd79b05dbbb8e65"
        mutation_id: "external-result:work-order-202609031902-8SH7ZM-executor-5200afdc59bf3d0cc0f3df7f"
        plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
        task_revision: 13
        work_item_id: "materialize-verification-amendment"
    leases: []
    mutation_receipts:
      compatibility:sha256:899eb14641cb7bbef1fdc413b6989b5398c1f4d3a271ec1c1a3050aa9d6c4ff8:
        aggregate_digest: "sha256:d2ded195e5d275a9751a8af892135c5268d9ee4c6353a248317017e63fca59da"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T19:33:10.894Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_407e56675facecec3cade4ad"
          mutation_id: "compatibility:sha256:899eb14641cb7bbef1fdc413b6989b5398c1f4d3a271ec1c1a3050aa9d6c4ff8"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:899eb14641cb7bbef1fdc413b6989b5398c1f4d3a271ec1c1a3050aa9d6c4ff8"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      compatibility:sha256:bafe362c4d5d7febb43191d92be88e4b262ce04db599a5a300eafd0f6ba9b402:
        aggregate_digest: "sha256:65e5ae0d0d8006ea3f89b4296198a7a7e9c98fcde088a711ee4ac44c2d6788f7"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T19:35:11.639Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_aad2043b0a65d3e6905d7202"
          mutation_id: "compatibility:sha256:bafe362c4d5d7febb43191d92be88e4b262ce04db599a5a300eafd0f6ba9b402"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:bafe362c4d5d7febb43191d92be88e4b262ce04db599a5a300eafd0f6ba9b402"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      compatibility:sha256:cc48b6510a5207463b9731a8eb4ecf0b348a66a1b26bf45af667b783d93e1248:
        aggregate_digest: "sha256:f2c336f81c34dac6cf2d9f21ff2fc642a1e337da490508a0493b444e7f63f0fb"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T19:17:55.058Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3360c91f8ff3dcab6134482b"
          mutation_id: "compatibility:sha256:cc48b6510a5207463b9731a8eb4ecf0b348a66a1b26bf45af667b783d93e1248"
          plan_digest: "sha256:1caa7a94a9728c64bc3f06d12d39f8c1dbecfeea263e58d0d36467fd9e05b20a"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:cc48b6510a5207463b9731a8eb4ecf0b348a66a1b26bf45af667b783d93e1248"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      compatibility:sha256:d45c75d9e5d1405e563383cb2361495de2e7f3d1b7d54e17ae42e2fa1ff02fdb:
        aggregate_digest: "sha256:563baa3d27251936cc84c83adca9743b2489d5f26d800597fc09c4139671644f"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T19:33:40.688Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_ed5c76f97b32fc25bfa2b27c"
          mutation_id: "compatibility:sha256:d45c75d9e5d1405e563383cb2361495de2e7f3d1b7d54e17ae42e2fa1ff02fdb"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 10
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d45c75d9e5d1405e563383cb2361495de2e7f3d1b7d54e17ae42e2fa1ff02fdb"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      compatibility:sha256:f37bdfaee058ac8b29a42117cef8a5c76eb84c76920c559993b6b59712865ecd:
        aggregate_digest: "sha256:82c587eb9e9a4e9cada0b1136d7477fbe19fa4846c6ddc8afcd83fba98ead1b0"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T19:09:23.398Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_77e2fc00c8c8af8d5b9cc640"
          mutation_id: "compatibility:sha256:f37bdfaee058ac8b29a42117cef8a5c76eb84c76920c559993b6b59712865ecd"
          plan_digest: "sha256:1caa7a94a9728c64bc3f06d12d39f8c1dbecfeea263e58d0d36467fd9e05b20a"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f37bdfaee058ac8b29a42117cef8a5c76eb84c76920c559993b6b59712865ecd"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      external-result:work-order-202609031902-8SH7ZM-executor-5200afdc59bf3d0cc0f3df7f:
        aggregate_digest: "sha256:dbcd48c37142b1aea2857f4c80f17e836e8884d0213f70bbe0c8bc445cbf1213"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T19:35:12.156Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_8fc297ecdcd79b05dbbb8e65"
          mutation_id: "external-result:work-order-202609031902-8SH7ZM-executor-5200afdc59bf3d0cc0f3df7f"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 13
          to: "COMPLETED"
          work_item_id: "materialize-verification-amendment"
        mutation_id: "external-result:work-order-202609031902-8SH7ZM-executor-5200afdc59bf3d0cc0f3df7f"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      plan-refinement:work-order-202609031902-8SH7ZM-executor-6b7854f90b7b872be4a891e9:
        aggregate_digest: "sha256:d7adc5aff85f50ea9f7cb206b812ec0393a6c46362386cf0fa032d207bcc283a"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-03T19:18:41.736Z"
          cause_refs:
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_943edd86bcded561faa816f2"
          mutation_id: "plan-refinement:work-order-202609031902-8SH7ZM-executor-6b7854f90b7b872be4a891e9"
          plan_digest: "sha256:1caa7a94a9728c64bc3f06d12d39f8c1dbecfeea263e58d0d36467fd9e05b20a"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 6
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609031902-8SH7ZM-executor-6b7854f90b7b872be4a891e9"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "b3e8d65e05a17f47b45b1bdbc364c8cd97fedd60"
  task_execution_context:
    base_ref: "main"
    base_sha: "65625c1a19230dd1ca73e87f31a1b975c5363b54"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "65625c1a19230dd1ca73e87f31a1b975c5363b54"
    version: 1
id_source: "generated"
---
## Summary

Repair plan-amendment Verify Steps projection routing

Fix the AgentPlane invariant where a task-specific plan amendment is persisted but sections.Verify Steps remains a PLANNER fallback scaffold, causing EVALUATOR rework to loop into code-only EXECUTOR authority that excludes protected task projections. Materialize accepted task-specific verification amendments atomically into the authoritative task document, invalidate stale evaluator/context packets, and route document-level rework to PLANNER or the AgentPlane-owned projection owner before emitting a fresh EVALUATOR packet. Add focused replay, idempotency, authority-closure, projection, stale-packet, and impossible-loop regressions. Do not grant ordinary EXECUTOR episodes access to .agentplane/tasks, weaken quality gates, hand-edit PX8PZT state, or touch release/version/publication/dependency scope.

## Scope

- In scope: Fix the AgentPlane invariant where a task-specific plan amendment is persisted but sections.Verify Steps remains a PLANNER fallback scaffold, causing EVALUATOR rework to loop into code-only EXECUTOR authority that excludes protected task projections. Materialize accepted task-specific verification amendments atomically into the authoritative task document, invalidate stale evaluator/context packets, and route document-level rework to PLANNER or the AgentPlane-owned projection owner before emitting a fresh EVALUATOR packet. Add focused replay, idempotency, authority-closure, projection, stale-packet, and impossible-loop regressions. Do not grant ordinary EXECUTOR episodes access to .agentplane/tasks, weaken quality gates, hand-edit PX8PZT state, or touch release/version/publication/dependency scope.
- Out of scope: unrelated refactors not required for "Repair plan-amendment Verify Steps projection routing".

## Plan

Refined the three-stage recovery plan so every WorkItem validation command is an exact declared Task check, while preserving commit 57487e09cfbd905e2dda2e16dd240905367ddb1d and assigning the stale CLI fixture correction only to the WorkItem that already owns packages/agentplane/src/cli.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run lifecycle:invariants`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-03T19:33:39.803Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:e5760cbcb744625659d15e314a6b7fcbe83138c978c561d51d27e780214877f8, input_digest=sha256:9ced16bc821c58b1aaa61bde540ff01d8d44498398c77acf8c2688938b6e117c

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609031902-8SH7ZM declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609031902-8SH7ZM-repair-plan-amendment-verify-steps-projection-ro/.agentplane/tasks/202609031902-8SH7ZM/blueprint/resolved-snapshot.json
- old_digest: 987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86
- current_digest: 987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609031902-8SH7ZM

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609031902-8SH7ZM
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
