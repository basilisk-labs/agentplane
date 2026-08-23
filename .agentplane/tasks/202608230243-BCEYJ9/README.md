---
id: "202608230243-BCEYJ9"
title: "Honor task-centric PLANNING after material plan refinement"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "release-blocker"
  - "supervisor"
  - "task-centric"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run ci:local:full"
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-08-23T03:00:29.027Z"
  updated_by: "USER"
  note: "User blanket-approved the exact revised plan digest sha256:9e3372d1ae56e5d4bb75ba445914751cb302bd040acbef132359d3c0ca0076e4 for autonomous v0.7.8 release completion."
verification:
  state: "needs_rework"
  updated_at: "2026-08-23T03:06:45.960Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Declared check failed: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000"
  attempts: 1
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
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The change alters shared branch-supervisor routing and requires hosted integration."
      - "The third file is a test-only fixture correction required by the already-declared focused check."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
  observed:
    authority_violations:
      - "verification:recorded-check-2:fail"
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
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
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
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
      digest: "sha256:cfcfeed5398c6b5190b073bf6560875503176f518aea1e4f86530865ce21b294"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
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
      - "verification_recovery:recorded-check-2"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 3b6d0d1b65b9. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-23T02:47:35.741Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-23T02:53:18.032Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 3b6d0d1b65b9. CLI accepted one state-bound external-agent semantic result."
    commit: "3b6d0d1b65b9df4f631874c9953119d2c66534fb"
  -
    type: "verify"
    at: "2026-08-23T03:06:45.960Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000"
doc_version: 3
doc_updated_at: "2026-08-23T03:06:47.000Z"
doc_updated_by: "SUPERVISOR"
description: "Fix the proven branch supervisor regression where a material external result.plan_refinement moves the task-centric aggregate to PLANNING but the legacy branch route continues through verification, quality review, and finish. After refinement, the next packet must be PLANNER for a revised plan; no closeout may run while a required WorkItem is REWORK_READY. Keep the correction generic and limited to route/supervisor reconciliation plus focused regression tests. Evidence: Task 202608230020-TEK7WE failed pre-merge finish with required_work_item_incomplete:stabilize-runtime-full-ci while aggregate lifecycle=PLANNING and WorkItem state=REWORK_READY."
sections:
  Summary: |-
    Honor task-centric PLANNING after material plan refinement

    Fix the proven branch supervisor regression where a material external result.plan_refinement moves the task-centric aggregate to PLANNING but the legacy branch route continues through verification, quality review, and finish. After refinement, the next packet must be PLANNER for a revised plan; no closeout may run while a required WorkItem is REWORK_READY. Keep the correction generic and limited to route/supervisor reconciliation plus focused regression tests. Evidence: Task 202608230020-TEK7WE failed pre-merge finish with required_work_item_incomplete:stabilize-runtime-full-ci while aggregate lifecycle=PLANNING and WorkItem state=REWORK_READY.
  Scope: |-
    - In scope: Fix the proven branch supervisor regression where a material external result.plan_refinement moves the task-centric aggregate to PLANNING but the legacy branch route continues through verification, quality review, and finish. After refinement, the next packet must be PLANNER for a revised plan; no closeout may run while a required WorkItem is REWORK_READY. Keep the correction generic and limited to route/supervisor reconciliation plus focused regression tests. Evidence: Task 202608230020-TEK7WE failed pre-merge finish with required_work_item_incomplete:stabilize-runtime-full-ci while aggregate lifecycle=PLANNING and WorkItem state=REWORK_READY.
    - Out of scope: unrelated refactors not required for "Honor task-centric PLANNING after material plan refinement".
  Plan: "Revised the bounded plan to persist the material-replan compatibility marker and repair only the unborn Git fixtures exposed by the declared route test."
  Verify Steps: |-
    PLANNER fallback scaffold for "Honor task-centric PLANNING after material plan refinement". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Honor task-centric PLANNING after material plan refinement". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-23T03:06:45.960Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c75fdc21aa15f507992b2352892020ae52b172799d53533a3b96cd21f2f59050, input_digest=sha256:9ff2fec34be0124ba0aefbd0f8f1996057548c40d401a0095d51cc4d079de2ca

    Details:

    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608230243-BCEYJ9/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608230243-BCEYJ9 declared verification

    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000
    Result: fail
    Evidence: .agentplane/tasks/202608230243-BCEYJ9/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608230243-BCEYJ9 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608230243-BCEYJ9-honor-task-centric-planning-after-material-plan/.agentplane/tasks/202608230243-BCEYJ9/blueprint/resolved-snapshot.json
    - old_digest: 889b5d6f1dab7d0cdcf260f041861bd2e8afdf9d612d8f19135e4e40102a7489
    - current_digest: 889b5d6f1dab7d0cdcf260f041861bd2e8afdf9d612d8f19135e4e40102a7489
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608230243-BCEYJ9

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608230243-BCEYJ9
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
    digest: "sha256:64efd9cdcecb1e0e18a72ec506a7804b362ec31669b44c971d4eff387f426b8b"
    grant_id: "909a9c8e-5a43-47b7-9ae9-feaf09a5ae2b"
    issued_at: "2026-08-23T03:00:29.027Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:549d1b472b5b7cc3d2d86bb404af7ecddbafc6c5e7f2c0b9569aa4d9eafd68ae"
    plan_revision: 8
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608230243-BCEYJ9"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-23T03:00:29.027Z"
        approved_by: "USER"
        approved_digest: "sha256:9e3372d1ae56e5d4bb75ba445914751cb302bd040acbef132359d3c0ca0076e4"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-23T03:00:09.426Z"
      digest: "sha256:9e3372d1ae56e5d4bb75ba445914751cb302bd040acbef132359d3c0ca0076e4"
      proposal:
        assumptions:
          - "The compatibility marker remains the canonical bridge used by the legacy workflow reducer until route state is fully projected from the task-centric aggregate."
          - "The route-test fixture correction is limited to creating the commit that production execution-base resolution already requires."
        planning_baseline:
          captured_at: "2026-08-23T02:56:46.699Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:d92b15aaa3d3b5dc12e15d150a4d1608cae2585726481678ce08073b399523fe"
          dirty_paths:
            - ".agentplane/tasks/202608230243-BCEYJ9/README.md"
            - ".agentplane/tasks/202608230243-BCEYJ9/supervision/implementation-evidence.json"
          git:
            kind: "commit"
            ref: null
            sha: "3b6d0d1b65b9df4f631874c9953119d2c66534fb"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:7"
        schema_version: 1
        task_id: "202608230243-BCEYJ9"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000"
              id: "check-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "check-full"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
          criteria:
            -
              check_ids:
                - "check-focused"
                - "check-full"
              description: "Material replan cannot fall through to verification, quality review, or pre-merge completion while the aggregate is PLANNING."
              id: "criterion-release-blocker-removed"
              required: true
          evidence_fingerprint: "sha256:2222222222222222222222222222222222222222222222222222222222222222"
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
                  description: "A material plan refinement atomically persists agentplane.task_centric_replan_required together with lifecycle PLANNING."
                  id: "criterion-marker-persisted"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                  description: "The existing task route consumes the marker and emits a PLANNER planning episode before verification or closeout."
                  id: "criterion-route-replans"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                  description: "Task-advance fixtures have an initial main commit so all existing route assertions run without changing production execution-base behavior."
                  id: "criterion-fixtures-preserve-route-assertions"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                    - "check-full"
                  description: "WorkItem completion and root completion gates remain unchanged."
                  id: "criterion-no-lifecycle-weakening"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 196608
                optional_sources:
                  - "packages/core/src/tasks/task-centric/compatibility.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-reducer.ts"
                  - ".agentplane/tasks/202608230020-TEK7WE/README.md"
                required_sources:
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
                symbol_hints:
                  - "TaskCentricBackendAdapter.recordPlanRefinement"
                  - "taskCentricReplanRequiredFromExtensions"
                  - "mkGitRepoRootWithCommit"
                  - "mkGitRepoRootWithBranch"
              depends_on: []
              expected_outputs:
                - "task-centric-replan-route-regression-fix"
                - "committed-route-test-fixtures"
              id: "preserve-material-replan-route"
              objective: "Persist the replan-required compatibility marker with the task-centric aggregate, prove the next route returns to PLANNER, and seed commits in only the route-test repositories that must resolve main."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000"
                    id: "check-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "check-full"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                criteria:
                  -
                    check_ids:
                      - "check-focused"
                    description: "A material plan refinement atomically persists agentplane.task_centric_replan_required together with lifecycle PLANNING."
                    id: "criterion-marker-persisted"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                    description: "The existing task route consumes the marker and emits a PLANNER planning episode before verification or closeout."
                    id: "criterion-route-replans"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                    description: "Task-advance fixtures have an initial main commit so all existing route assertions run without changing production execution-base behavior."
                    id: "criterion-fixtures-preserve-route-assertions"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                      - "check-full"
                    description: "WorkItem completion and root completion gates remain unchanged."
                    id: "criterion-no-lifecycle-weakening"
                    required: true
                evidence_fingerprint: "sha256:1111111111111111111111111111111111111111111111111111111111111111"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202608230243-BCEYJ9"
    event_cursor: 0
    final_validation: null
    id: "202608230243-BCEYJ9"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-23T02:43:38.093Z"
      constraints: []
      request: |-
        Honor task-centric PLANNING after material plan refinement

        Fix the proven branch supervisor regression where a material external result.plan_refinement moves the task-centric aggregate to PLANNING but the legacy branch route continues through verification, quality review, and finish. After refinement, the next packet must be PLANNER for a revised plan; no closeout may run while a required WorkItem is REWORK_READY. Keep the correction generic and limited to route/supervisor reconciliation plus focused regression tests. Evidence: Task 202608230020-TEK7WE failed pre-merge finish with required_work_item_incomplete:stabilize-runtime-full-ci while aggregate lifecycle=PLANNING and WorkItem state=REWORK_READY.
      task_id: "202608230243-BCEYJ9"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-08-23T02:47:20.974Z"
          approved_by: "USER"
          approved_digest: "sha256:0b9a3ec24fd856ad291550ee27876affdbe28e42114c2fb3fc9b4288f33b5a67"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-08-23T02:47:03.266Z"
        digest: "sha256:0b9a3ec24fd856ad291550ee27876affdbe28e42114c2fb3fc9b4288f33b5a67"
        proposal:
          assumptions:
            - "The compatibility marker remains the canonical bridge used by the legacy workflow reducer until route state is fully projected from the task-centric aggregate."
          planning_baseline:
            captured_at: "2026-08-23T02:43:45.370Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:b330872e8b7f530332eff4420bf729e15e2a8a20e8cdc686d89ac62498baa344"
            dirty_paths:
              - ".agentplane/tasks/202608210955-9SX2C6/README.md"
              - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
              - ".agentplane/tasks/202608220034-FPEFRK/README.md"
              - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
              - ".agentplane/tasks/202608230243-BCEYJ9/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202608230243-BCEYJ9"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000"
                id: "check-focused"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "check-full"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
            criteria:
              -
                check_ids:
                  - "check-focused"
                  - "check-full"
                description: "Material replan cannot fall through to verification, quality review, or pre-merge completion while the aggregate is PLANNING."
                id: "criterion-release-blocker-removed"
                required: true
            evidence_fingerprint: "sha256:589985830198aa99c190d6d1956197476518efd680d0ae81c92f4067b1ac4cf5"
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
                    description: "A material plan refinement atomically persists agentplane.task_centric_replan_required together with lifecycle PLANNING."
                    id: "criterion-marker-persisted"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                    description: "The existing task route consumes the marker and emits a PLANNER planning episode before verification or closeout."
                    id: "criterion-route-replans"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                      - "check-full"
                    description: "WorkItem completion and root completion gates remain unchanged."
                    id: "criterion-no-lifecycle-weakening"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 196608
                  optional_sources:
                    - "packages/core/src/tasks/task-centric/compatibility.ts"
                    - ".agentplane/tasks/202608230020-TEK7WE/README.md"
                  required_sources:
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                    - "packages/agentplane/src/commands/shared/workflow-step-reducer.ts"
                  symbol_hints:
                    - "TaskCentricBackendAdapter.recordPlanRefinement"
                    - "withTaskCentricAggregate"
                    - "taskCentricReplanRequiredFromExtensions"
                    - "recordTaskCentricExternalResult"
                depends_on: []
                expected_outputs:
                  - "task-centric-replan-route-regression-fix"
                id: "preserve-material-replan-route"
                objective: "Persist the replan-required compatibility marker with the task-centric aggregate and prove the next branch supervisor route returns to PLANNER."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000"
                      id: "check-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "check-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                  criteria:
                    -
                      check_ids:
                        - "check-focused"
                      description: "A material plan refinement atomically persists agentplane.task_centric_replan_required together with lifecycle PLANNING."
                      id: "criterion-marker-persisted"
                      required: true
                    -
                      check_ids:
                        - "check-focused"
                      description: "The existing task route consumes the marker and emits a PLANNER planning episode before verification or closeout."
                      id: "criterion-route-replans"
                      required: true
                    -
                      check_ids:
                        - "check-focused"
                        - "check-full"
                      description: "WorkItem completion and root completion gates remain unchanged."
                      id: "criterion-no-lifecycle-weakening"
                      required: true
                  evidence_fingerprint: "sha256:382534d7d3724b5e70c2b404e3ee70c38bf7f5f0ef9ce57c3b57ba7cd8188226"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202608230243-BCEYJ9"
    revision: 3
    schema_version: 1
    updated_at: "2026-08-23T03:00:29.027Z"
    work_items:
      preserve-material-replan-route:
        attempt: 0
        claim_id: null
        id: "preserve-material-replan-route"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
    version: 1
id_source: "generated"
---
## Summary

Honor task-centric PLANNING after material plan refinement

Fix the proven branch supervisor regression where a material external result.plan_refinement moves the task-centric aggregate to PLANNING but the legacy branch route continues through verification, quality review, and finish. After refinement, the next packet must be PLANNER for a revised plan; no closeout may run while a required WorkItem is REWORK_READY. Keep the correction generic and limited to route/supervisor reconciliation plus focused regression tests. Evidence: Task 202608230020-TEK7WE failed pre-merge finish with required_work_item_incomplete:stabilize-runtime-full-ci while aggregate lifecycle=PLANNING and WorkItem state=REWORK_READY.

## Scope

- In scope: Fix the proven branch supervisor regression where a material external result.plan_refinement moves the task-centric aggregate to PLANNING but the legacy branch route continues through verification, quality review, and finish. After refinement, the next packet must be PLANNER for a revised plan; no closeout may run while a required WorkItem is REWORK_READY. Keep the correction generic and limited to route/supervisor reconciliation plus focused regression tests. Evidence: Task 202608230020-TEK7WE failed pre-merge finish with required_work_item_incomplete:stabilize-runtime-full-ci while aggregate lifecycle=PLANNING and WorkItem state=REWORK_READY.
- Out of scope: unrelated refactors not required for "Honor task-centric PLANNING after material plan refinement".

## Plan

Revised the bounded plan to persist the material-replan compatibility marker and repair only the unborn Git fixtures exposed by the declared route test.

## Verify Steps

PLANNER fallback scaffold for "Honor task-centric PLANNING after material plan refinement". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Honor task-centric PLANNING after material plan refinement". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-23T03:06:45.960Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c75fdc21aa15f507992b2352892020ae52b172799d53533a3b96cd21f2f59050, input_digest=sha256:9ff2fec34be0124ba0aefbd0f8f1996057548c40d401a0095d51cc4d079de2ca

Details:

Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608230243-BCEYJ9/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608230243-BCEYJ9 declared verification

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000
Result: fail
Evidence: .agentplane/tasks/202608230243-BCEYJ9/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608230243-BCEYJ9 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608230243-BCEYJ9-honor-task-centric-planning-after-material-plan/.agentplane/tasks/202608230243-BCEYJ9/blueprint/resolved-snapshot.json
- old_digest: 889b5d6f1dab7d0cdcf260f041861bd2e8afdf9d612d8f19135e4e40102a7489
- current_digest: 889b5d6f1dab7d0cdcf260f041861bd2e8afdf9d612d8f19135e4e40102a7489
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608230243-BCEYJ9

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608230243-BCEYJ9
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
