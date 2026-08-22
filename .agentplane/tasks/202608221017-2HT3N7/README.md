---
id: "202608221017-2HT3N7"
title: "Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task."
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "release-blocker"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-22T10:18:42.753Z"
  updated_by: "USER"
  note: "Approved clean recovery plan under the previously granted autonomous release authority; scope matches the blocked task fix."
verification:
  state: "ok"
  updated_at: "2026-08-22T10:22:35.168Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-22T10:23:54.394Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 5 typed finding(s)."
  evaluated_sha: "b2e7c138fd33a094ac62d263af4debb087c3b7c2"
  blueprint_digest: "75a45a4fa8d14c4953f8a8a12c22d37a87eba56267143799b3eaf8773f4cb705"
  evidence_refs:
    - ".agentplane/tasks/202608221017-2HT3N7/quality/20260822-102251625-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608221017-2HT3N7/quality/20260822-102251625-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608221017-2HT3N7/quality/objects/sha256/c138d04d66e1b13901a083644cd1059fa982cb72d7e6552a757b1117c8da8598.md"
    - ".agentplane/tasks/202608221017-2HT3N7/quality/20260822-102251625-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608221017-2HT3N7/quality/20260822-102251625-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608221017-2HT3N7/quality/20260822-102251625-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608221017-2HT3N7/README.md"
    - ".agentplane/tasks/202608221017-2HT3N7/quality/objects/sha256/d7d07de9baacb223b5f0c92621edb7f3d9d01903bb53b9cdfd6327bacf371a68.patch"
    - ".agentplane/tasks/202608221017-2HT3N7/quality/objects/sha256/d779fd3719458caa5880806184a234fed0e7dce651cece1611af37931f8af479.json"
    - ".agentplane/tasks/202608221017-2HT3N7/verification/20260822102235168-c0477463db4b4d92.json"
    - ".agentplane/tasks/202608221017-2HT3N7/quality/objects/sha256/db5535bad06e966855e2678a3ea5532e81f1e64e32df13f19d9cb83eaee04fef.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The finish gate requires implementation ancestry and task-artifact-only drift before accepting a reviewed descendant."
    - "Lifecycle normalization ignores token usage and only the implementation commit message while preserving the implementation hash."
    - "A replacement canonical plan clears the stale replan marker."
    - "Focused regression tests, typecheck, ESLint, and diff validation pass."
    - "Residual risk: Hosted integration remains a supervisor-owned post-PR gate."
token_usage:
  agent_runs: 3
  input_tokens: null
  journal_digest: "sha256:f15590baad860ad4f4bb3d26b51156854c488f9bad9eb1fcbad1d32e0072e15d"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "provider_token_telemetry_unavailable"
  updated_at: "2026-08-22T10:24:03.073Z"
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
      - "packages/agentplane/src/commands/shared/quality-review-target.ts"
      - "packages/agentplane/src/commands/task"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Port already proven release-blocking lifecycle fixes through a clean task-owned branch."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/shared/quality-review-target.ts"
      - "packages/agentplane/src/commands/task"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/shared/quality-review-target.ts"
      - "packages/agentplane/src/commands/task/finish-blueprint-evidence.ts"
      - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
      - "packages/agentplane/src/commands/task/plan.ts"
      - "packages/agentplane/src/commands/task/plan.unit.test.ts"
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
          - "packages/agentplane/src/commands/shared/quality-review-target.ts"
          - "packages/agentplane/src/commands/task"
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
      digest: "sha256:8b7e271887390f608a9aa0f0aabc4ccec7b53c017f50220404281c67dda36043"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/quality-review-target.ts"
        - "central_path:packages/agentplane/src/commands/shared/quality-review-target.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/shared/quality-review-target.ts"
          - "packages/agentplane/src/commands/task/finish-blueprint-evidence.ts"
          - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
          - "packages/agentplane/src/commands/task/plan.ts"
          - "packages/agentplane/src/commands/task/plan.unit.test.ts"
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
  hash: "7251d79d8d4ed911dc37895c4c4f4231e1b44d12"
  message: "🚧 2HT3N7 task: record external evaluator result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: b2e7c138fd33. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-22T10:19:00.088Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-22T10:22:32.645Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: b2e7c138fd33. CLI accepted one state-bound external-agent semantic result."
    commit: "b2e7c138fd33a094ac62d263af4debb087c3b7c2"
  -
    type: "verify"
    at: "2026-08-22T10:22:35.168Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-22T10:24:03.073Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "7251d79d8d4ed911dc37895c4c4f4231e1b44d12"
doc_version: 3
doc_updated_at: "2026-08-22T10:24:03.083Z"
doc_updated_by: "CODER"
description: "A clean task is required because the original supervisor journal correctly refuses replay after state drift. Keep changes to packages/agentplane/src/commands/task and packages/agentplane/src/commands/shared/quality-review-target.ts plus task-owned tests."
sections:
  Summary: |-
    Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.

    A clean task is required because the original supervisor journal correctly refuses replay after state drift. Keep changes to packages/agentplane/src/commands/task and packages/agentplane/src/commands/shared/quality-review-target.ts plus task-owned tests.
  Scope: |-
    - In scope: A clean task is required because the original supervisor journal correctly refuses replay after state drift. Keep changes to packages/agentplane/src/commands/task and packages/agentplane/src/commands/shared/quality-review-target.ts plus task-owned tests.
    - Out of scope: unrelated refactors not required for "Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.".
  Plan: "Port the proven lifecycle quality-gate and canonical-plan fixes into one clean, schedulable branch_pr WorkItem."
  Verify Steps: |-
    PLANNER fallback scaffold for "Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-22T10:22:35.168Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:26dd3a31aaf3763020301924d517a4a5b502aa094f75b76e490f126a2efc955e, input_digest=sha256:8c82be4ca185ea607ffbdda581e0f3d96dd2759a3f823c2cdbeb10a08b1351dd

    Details:

    Check: affected_unit_integration
    Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts && bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608221017-2HT3N7/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221017-2HT3N7 Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts && bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608221017-2HT3N7/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221017-2HT3N7 Verification Contract check critical_paths

    Check: full_regression
    Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts && bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608221017-2HT3N7/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221017-2HT3N7 Verification Contract check full_regression

    Check: hosted_integration
    Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts && bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608221017-2HT3N7/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221017-2HT3N7 Verification Contract check hosted_integration

    Check: task_outcome
    Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts && bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608221017-2HT3N7/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221017-2HT3N7 Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608221017-2HT3N7-port-the-complete-pre-merge-quality-review-lifec/.agentplane/tasks/202608221017-2HT3N7/blueprint/resolved-snapshot.json
    - old_digest: 75a45a4fa8d14c4953f8a8a12c22d37a87eba56267143799b3eaf8773f4cb705
    - current_digest: 75a45a4fa8d14c4953f8a8a12c22d37a87eba56267143799b3eaf8773f4cb705
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608221017-2HT3N7

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
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:cba3cb1fcf1b4bd2c705c6f0fe99e66604d86573e4be5226dcdc2abdd523104f"
    grant_id: "5e963133-e9d6-4498-9ce1-876ead92e93f"
    issued_at: "2026-08-22T10:18:42.753Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:2f78abbdca6d4edbb1ffaa510e40458ed8e6e7dba083f68bc779f1633952e0a8"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608221017-2HT3N7"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-22T10:18:42.753Z"
        approved_by: "USER"
        approved_digest: "sha256:366fd98e153cbf154e8006694401cd8b22798ee857bdc30542c4cededbda61be"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-22T10:18:32.982Z"
      digest: "sha256:366fd98e153cbf154e8006694401cd8b22798ee857bdc30542c4cededbda61be"
      proposal:
        assumptions:
          - "The blocked task branch is evidence only; no task artifacts are copied."
        planning_baseline:
          captured_at: "2026-08-22T10:17:29.204Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:e738b06c1af6b4bfcd968cf8b176e9efac1f7df53e6b162225fea4a37cae502a"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608221017-2HT3N7/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "49a18763cb42144bc5279ddb129c51c63acd9244"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608221017-2HT3N7"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts"
              id: "top-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "top-types"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
          criteria:
            -
              check_ids:
                - "top-focused"
                - "top-types"
              description: "Focused tests and typecheck pass."
              id: "all"
              required: true
          evidence_fingerprint: "sha256:f5f67f2b63232e8e7f88771295082f981f3687623660914cccf23ba8d75e7957"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused"
                    - "types"
                  description: "Artifact-only descendants pass; semantic and unrelated drift fail; closure metadata stays lifecycle-only."
                  id: "quality"
                  required: true
                -
                  check_ids:
                    - "focused"
                  description: "Replacement canonical plans clear stale replan markers without weakening other state."
                  id: "replan"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 200000
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/commands/shared/quality-review-target.ts"
                  - "packages/agentplane/src/commands/task/finish-blueprint-evidence.ts"
                  - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
                  - "packages/agentplane/src/commands/task/plan.ts"
                  - "packages/agentplane/src/commands/task/plan.unit.test.ts"
                symbol_hints:
                  - "resolveExpectedQualitySha"
                  - "taskReadmesHaveOnlyLifecycleDrift"
                  - "setTaskPlan"
              depends_on: []
              expected_outputs:
                - "source_change:lifecycle_quality_gate"
                - "regression_tests:lifecycle_quality_gate"
              id: "port-lifecycle-fixes"
              objective: "Port the reviewed quality ancestry, lifecycle metadata normalization, and canonical replan marker fixes with regression tests."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/quality-review-target.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared/quality-review-target.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts"
                    id: "focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "types"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "focused"
                      - "types"
                    description: "Run quality lifecycle regression coverage."
                    id: "quality"
                    required: true
                  -
                    check_ids:
                      - "focused"
                    description: "Run canonical plan replacement regression coverage."
                    id: "replan"
                    required: true
                evidence_fingerprint: "sha256:1e75328e03e5e2867fa4de035c84ab71bb81545e2cb7546c59d79e97aff3b43c"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608221017-2HT3N7"
    event_cursor: 0
    final_validation:
      evidence:
        -
          artifact_refs:
            - "task-verification:202608221017-2HT3N7"
            - "git:b2e7c138fd33a094ac62d263af4debb087c3b7c2"
          check_id: "top-focused"
          command_identity: "bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-22T10:22:35.168Z"
          repository_snapshot_digest: "sha256:eb287c786ef5725e0aaa9ab788b921e6e1a003a676a908caa5a9ac7a70334ea1"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202608221017-2HT3N7"
            - "git:b2e7c138fd33a094ac62d263af4debb087c3b7c2"
          check_id: "top-types"
          command_identity: "bun run typecheck"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-22T10:22:35.168Z"
          repository_snapshot_digest: "sha256:eb287c786ef5725e0aaa9ab788b921e6e1a003a676a908caa5a9ac7a70334ea1"
          status: "passed"
      schema_version: 1
      stale_evidence: []
      status: "passed"
      unsatisfied_criteria: []
    id: "202608221017-2HT3N7"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-22T10:17:22.512Z"
      constraints: []
      request: |-
        Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.

        A clean task is required because the original supervisor journal correctly refuses replay after state drift. Keep changes to packages/agentplane/src/commands/task and packages/agentplane/src/commands/shared/quality-review-target.ts plus task-owned tests.
      task_id: "202608221017-2HT3N7"
    lifecycle: "COMPLETED"
    plan_amendments: []
    plan_history: []
    revision: 11
    schema_version: 1
    updated_at: "2026-08-22T10:24:03.073Z"
    work_items:
      port-lifecycle-fixes:
        attempt: 1
        claim_id: null
        id: "port-lifecycle-fixes"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:0629591fa34b1bf072504056a638a5e4d26b47de66a31c6ff9865da5583f9d9c"
            id: "source_change:lifecycle_quality_gate"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608221017-2HT3N7"
              work_item_id: "port-lifecycle-fixes"
            provenance:
              - "sha256:dbddb04644d9d68537cee4306cdc0f42eadc00282cde67e473e7587be6101c20"
              - ".agentplane/tasks/202608221017-2HT3N7/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:780307945565b0a98b88d35bc7884757edb6e53ec65693e98c27447ebb813325"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:5aad5f5c8352f785d8b86fee647da6f67eb429b47c05dd62e0fa54c5cabcc4f2"
            id: "regression_tests:lifecycle_quality_gate"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608221017-2HT3N7"
              work_item_id: "port-lifecycle-fixes"
            provenance:
              - "sha256:dbddb04644d9d68537cee4306cdc0f42eadc00282cde67e473e7587be6101c20"
              - ".agentplane/tasks/202608221017-2HT3N7/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:780307945565b0a98b88d35bc7884757edb6e53ec65693e98c27447ebb813325"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608221017-2HT3N7/supervision/declared-checks.json"
              check_id: "focused"
              command_identity: "bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts"
              detail: "Observed by bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts."
              exit_code: 0
              observed_at: "2026-08-22T10:22:38.246Z"
              repository_snapshot_digest: "sha256:780307945565b0a98b88d35bc7884757edb6e53ec65693e98c27447ebb813325"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608221017-2HT3N7/supervision/declared-checks.json"
              check_id: "types"
              command_identity: "bun run typecheck"
              detail: "Observed by bun run typecheck."
              exit_code: 0
              observed_at: "2026-08-22T10:22:38.246Z"
              repository_snapshot_digest: "sha256:780307945565b0a98b88d35bc7884757edb6e53ec65693e98c27447ebb813325"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608221017-2HT3N7-executor-c2be665ffaf645dfa8d20e49:
        aggregate_digest: "sha256:ee317b1801af2c18ef7a3f7b1bc3729033e5135d6e3ba1ea9f32a14b517a9260"
        event:
          actor_id: "agentplane"
          at: "2026-08-22T10:22:38.250Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_2d84697878b2aed16b5dad1a"
          mutation_id: "external-result:work-order-202608221017-2HT3N7-executor-c2be665ffaf645dfa8d20e49"
          plan_digest: "sha256:366fd98e153cbf154e8006694401cd8b22798ee857bdc30542c4cededbda61be"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608221017-2HT3N7"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "port-lifecycle-fixes"
        mutation_id: "external-result:work-order-202608221017-2HT3N7-executor-c2be665ffaf645dfa8d20e49"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202608221017-2HT3N7"
      legacy-finish:202608221017-2HT3N7:2026-08-22T10:22:35.168Z:b2e7c138fd33a094ac62d263af4debb087c3b7c2:
        aggregate_digest: "sha256:3823938c7e487eb0160b092fa1711baceaffe213eb6f32785ad1a4bfb339b94a"
        event:
          actor_id: "CODER"
          at: "2026-08-22T10:24:03.073Z"
          cause_refs:
            - "task-verification:202608221017-2HT3N7"
            - "git:b2e7c138fd33a094ac62d263af4debb087c3b7c2"
          entity: "task"
          from: "ACTIVE"
          id: "event_5482547ead6d7524587c59ee"
          mutation_id: "legacy-finish:202608221017-2HT3N7:2026-08-22T10:22:35.168Z:b2e7c138fd33a094ac62d263af4debb087c3b7c2"
          plan_digest: "sha256:366fd98e153cbf154e8006694401cd8b22798ee857bdc30542c4cededbda61be"
          plan_revision: 1
          repository_fingerprint: "sha256:eb287c786ef5725e0aaa9ab788b921e6e1a003a676a908caa5a9ac7a70334ea1"
          schema_version: 1
          task_id: "202608221017-2HT3N7"
          task_revision: 8
          to: "COMPLETED"
          work_item_id: null
        mutation_id: "legacy-finish:202608221017-2HT3N7:2026-08-22T10:22:35.168Z:b2e7c138fd33a094ac62d263af4debb087c3b7c2"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202608221017-2HT3N7"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "b2e7c138fd33a094ac62d263af4debb087c3b7c2"
    message: "🚧 2HT3N7 task: apply external agent result"
  task_execution_context:
    base_ref: "main"
    base_sha: "49a18763cb42144bc5279ddb129c51c63acd9244"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "49a18763cb42144bc5279ddb129c51c63acd9244"
    version: 1
id_source: "generated"
---
## Summary

Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.

A clean task is required because the original supervisor journal correctly refuses replay after state drift. Keep changes to packages/agentplane/src/commands/task and packages/agentplane/src/commands/shared/quality-review-target.ts plus task-owned tests.

## Scope

- In scope: A clean task is required because the original supervisor journal correctly refuses replay after state drift. Keep changes to packages/agentplane/src/commands/task and packages/agentplane/src/commands/shared/quality-review-target.ts plus task-owned tests.
- Out of scope: unrelated refactors not required for "Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.".

## Plan

Port the proven lifecycle quality-gate and canonical-plan fixes into one clean, schedulable branch_pr WorkItem.

## Verify Steps

PLANNER fallback scaffold for "Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-22T10:22:35.168Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:26dd3a31aaf3763020301924d517a4a5b502aa094f75b76e490f126a2efc955e, input_digest=sha256:8c82be4ca185ea607ffbdda581e0f3d96dd2759a3f823c2cdbeb10a08b1351dd

Details:

Check: affected_unit_integration
Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts && bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608221017-2HT3N7/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221017-2HT3N7 Verification Contract check affected_unit_integration

Check: critical_paths
Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts && bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608221017-2HT3N7/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221017-2HT3N7 Verification Contract check critical_paths

Check: full_regression
Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts && bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608221017-2HT3N7/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221017-2HT3N7 Verification Contract check full_regression

Check: hosted_integration
Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts && bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608221017-2HT3N7/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221017-2HT3N7 Verification Contract check hosted_integration

Check: task_outcome
Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts && bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608221017-2HT3N7/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221017-2HT3N7 Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608221017-2HT3N7-port-the-complete-pre-merge-quality-review-lifec/.agentplane/tasks/202608221017-2HT3N7/blueprint/resolved-snapshot.json
- old_digest: 75a45a4fa8d14c4953f8a8a12c22d37a87eba56267143799b3eaf8773f4cb705
- current_digest: 75a45a4fa8d14c4953f8a8a12c22d37a87eba56267143799b3eaf8773f4cb705
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608221017-2HT3N7

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

## Token Usage

- State: `unavailable`
- Completeness: `0/3` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:f15590baad860ad4f4bb3d26b51156854c488f9bad9eb1fcbad1d32e0072e15d`
- Unavailable reason: `provider_token_telemetry_unavailable`
- Updated at: `2026-08-22T10:24:03.073Z`
