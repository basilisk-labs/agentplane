---
id: "202608290920-1PZGG8"
title: "Allow task-centric plan refinement before WorkItem selection"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
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
  updated_at: "2026-08-29T09:23:17.423Z"
  updated_by: "HOST:slingshot:env_e_6a1ef5a7691083289addb82f53997126:USER"
  note: "host_user_decision=sha256:0268726170606a97f4887c0caf68358918008be50f7a9ae73adc4edc96a2fa0b"
verification:
  state: "ok"
  updated_at: "2026-08-29T09:34:30.895Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  attempts: 0
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
    authority_violations: []
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
commit:
  hash: "4aede6beb635097fcd6f5a94fb60c37bc45dc09a"
  message: "🚧 1PZGG8 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 4aede6beb635. CLI accepted one state-bound external-agent semantic result."
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
doc_version: 3
doc_updated_at: "2026-08-29T09:34:33.241Z"
doc_updated_by: "SUPERVISOR"
description: "Fix the supported recovery path exposed by 7JCQPF. In recordTaskCentricExternalResult, when semantic.plan_refinement is present, record the refinement against the current approved plan before selecting or projecting a WorkItem result. If the refinement requires replan, return replan_required without requiring a schedulable WorkItem. Preserve normal WorkItem result selection, idempotency, validation, and fail-closed behavior when no refinement is present. Add focused tests for an unschedulable READY WorkItem whose refinement is still recorded, plus unchanged normal result behavior. This is an integration-path blocker for 7JCQPF and PR #5870; do not change release ordering, policy, scheduler semantics, or task stores."
sections:
  Summary: |-
    Allow task-centric plan refinement before WorkItem selection

    Fix the supported recovery path exposed by 7JCQPF. In recordTaskCentricExternalResult, when semantic.plan_refinement is present, record the refinement against the current approved plan before selecting or projecting a WorkItem result. If the refinement requires replan, return replan_required without requiring a schedulable WorkItem. Preserve normal WorkItem result selection, idempotency, validation, and fail-closed behavior when no refinement is present. Add focused tests for an unschedulable READY WorkItem whose refinement is still recorded, plus unchanged normal result behavior. This is an integration-path blocker for 7JCQPF and PR #5870; do not change release ordering, policy, scheduler semantics, or task stores.
  Scope: |-
    - In scope: Fix the supported recovery path exposed by 7JCQPF. In recordTaskCentricExternalResult, when semantic.plan_refinement is present, record the refinement against the current approved plan before selecting or projecting a WorkItem result. If the refinement requires replan, return replan_required without requiring a schedulable WorkItem. Preserve normal WorkItem result selection, idempotency, validation, and fail-closed behavior when no refinement is present. Add focused tests for an unschedulable READY WorkItem whose refinement is still recorded, plus unchanged normal result behavior. This is an integration-path blocker for 7JCQPF and PR #5870; do not change release ordering, policy, scheduler semantics, or task stores.
    - Out of scope: unrelated refactors not required for "Allow task-centric plan refinement before WorkItem selection".
  Plan: "Plan a two-file recovery fix that records a requested plan refinement before WorkItem selection and leaves ordinary result projection unchanged."
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

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:slingshot:env_e_6a1ef5a7691083289addb82f53997126:USER"
    approval_evidence_digest: "sha256:0268726170606a97f4887c0caf68358918008be50f7a9ae73adc4edc96a2fa0b"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:b54e33669ab803c32cb0a302f6d215edf80d31966a5f03d0e8497823472da67d"
    grant_id: "fffd755f-0d60-4297-8cc2-adced93cf283"
    issued_at: "2026-08-29T09:23:17.423Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:56fb5f24236c6c0ff09850d76c874a387ea7acfc424006e54adf2661847f73d9"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608290920-1PZGG8"
  agentplane.task_centric:
    current_plan:
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
    plan_history: []
    revision: 8
    schema_version: 1
    updated_at: "2026-08-29T09:34:34.313Z"
    work_items:
      refine-before-selection:
        attempt: 1
        claim_id: null
        id: "refine-before-selection"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:dcd638340e44be148b1280d0d83219a2d9ded82bde24642cc08f9fe09d6113a0"
            id: "refinement-before-selection behavior"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608290920-1PZGG8"
              work_item_id: "refine-before-selection"
            provenance:
              - "sha256:74c247e3fa95cb3b964773f0db998694766f1b62069dc16c472d2f2c8c88053b"
              - ".agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:799fd8402e021d1b5b7725a481ec2b545e16aa022652014c92742d3952883880"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:7f03820eaca9fe27623354191c0172e0635580d75115eb59eda3b7f1cdd5b807"
            id: "focused regression evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608290920-1PZGG8"
              work_item_id: "refine-before-selection"
            provenance:
              - "sha256:74c247e3fa95cb3b964773f0db998694766f1b62069dc16c472d2f2c8c88053b"
              - ".agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:799fd8402e021d1b5b7725a481ec2b545e16aa022652014c92742d3952883880"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json"
              check_id: "check-focused"
              command_identity: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers=1"
              detail: "Observed by node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-08-29T09:34:34.304Z"
              repository_snapshot_digest: "sha256:799fd8402e021d1b5b7725a481ec2b545e16aa022652014c92742d3952883880"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json"
              check_id: "check-full"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-08-29T09:34:34.304Z"
              repository_snapshot_digest: "sha256:799fd8402e021d1b5b7725a481ec2b545e16aa022652014c92742d3952883880"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json"
              check_id: "check-diff"
              command_identity: "git diff --check"
              detail: "Observed by git diff --check."
              exit_code: 0
              observed_at: "2026-08-29T09:34:34.304Z"
              repository_snapshot_digest: "sha256:799fd8402e021d1b5b7725a481ec2b545e16aa022652014c92742d3952883880"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
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
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "4aede6beb635097fcd6f5a94fb60c37bc45dc09a"
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

Plan a two-file recovery fix that records a requested plan refinement before WorkItem selection and leaves ordinary result projection unchanged.

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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
