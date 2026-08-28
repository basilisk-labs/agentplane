---
id: "202608280009-QMVHM2"
title: "Recover interrupted verification-to-WorkItem completion without false DONE"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "integration-recovery"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-28T00:15:21.776Z"
  updated_by: "USER"
  note: "Operator approval under the user-authorized autonomous refactoring exception. Exact prepared plan f1268d36bbb2c0c541cf3a769f5cbe3ad4b141236b5b4fa60d40af1580da45a1; bounded integration-recovery contract only. No release publication, Core graph reorder, new protocol or mandatory-check weakening."
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
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
      - "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Preserve canonical completion and stale-result guards without advancing the broader Core migration."
      - "Repair a reproduced blocker in the existing allowed integration route."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
      - "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
          - "packages/agentplane/src/commands/task/finish-shared.ts"
          - "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
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
      digest: "sha256:9c3691232f3c24078c28a3f937e8ece4de67efdb88a8c3967b3d1d51db55200d"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components: []
        changed_files: []
        external_effects: []
        repository_effects: []
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-28T00:15:41.000Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-28T00:15:41.000Z"
doc_updated_by: "CODER"
description: "Repair the reproduced integration blocker on main e43acc5f72ba1f884966a16325d6dbc94fcb1f04. DVS5NN accepted and committed the cleanup at b577984d8418b4cb7fed521c14b6ab00bf773a93, then completed full checks, but verification persistence rejected a docs_contract mapping added by observed base history. Result application stopped before WorkItem projection. Supported TESTER verification and EVALUATOR PASS did not complete the READY WorkItem. finish then wrote legacy DONE before rejecting required_work_item_incomplete. CFKR4P also completed full checks for a task-level null-WorkItem rework but result application failed because all WorkItems were already completed. Preserve one complete scenario: accepted semantic result, exact implementation and plan binding, current mandatory verification, interruption, supported restart, exactly-once WorkItem projection, and finish without false completion. Diagnose the smallest repair before planning. Prefer existing exchange, verification and runtime receipts; do not add a parallel state store or generic replay subsystem. Preserve stale result rejection, plan and commit identity, missing-evidence rejection, approval gates and mandatory checks. Do not implement AP-CORE-012, AP-CORE-013 or AP-CORE-015 ahead of the approved graph; limit the change to this demonstrated integration recovery and prevention contract. Include real-Git positive, interruption, repeat, changed-plan/head and incomplete-WorkItem negative regressions. Keep DVS5NN and CFKR4P source scopes unchanged. No release publication or CI weakening. The user authorized autonomous completion and supported operator approvals. Stop on any unsupported authority or materially larger architectural scope."
sections:
  Summary: |-
    Recover interrupted verification-to-WorkItem completion without false DONE

    Repair the reproduced integration blocker on main e43acc5f72ba1f884966a16325d6dbc94fcb1f04. DVS5NN accepted and committed the cleanup at b577984d8418b4cb7fed521c14b6ab00bf773a93, then completed full checks, but verification persistence rejected a docs_contract mapping added by observed base history. Result application stopped before WorkItem projection. Supported TESTER verification and EVALUATOR PASS did not complete the READY WorkItem. finish then wrote legacy DONE before rejecting required_work_item_incomplete. CFKR4P also completed full checks for a task-level null-WorkItem rework but result application failed because all WorkItems were already completed. Preserve one complete scenario: accepted semantic result, exact implementation and plan binding, current mandatory verification, interruption, supported restart, exactly-once WorkItem projection, and finish without false completion. Diagnose the smallest repair before planning. Prefer existing exchange, verification and runtime receipts; do not add a parallel state store or generic replay subsystem. Preserve stale result rejection, plan and commit identity, missing-evidence rejection, approval gates and mandatory checks. Do not implement AP-CORE-012, AP-CORE-013 or AP-CORE-015 ahead of the approved graph; limit the change to this demonstrated integration recovery and prevention contract. Include real-Git positive, interruption, repeat, changed-plan/head and incomplete-WorkItem negative regressions. Keep DVS5NN and CFKR4P source scopes unchanged. No release publication or CI weakening. The user authorized autonomous completion and supported operator approvals. Stop on any unsupported authority or materially larger architectural scope.
  Scope: |-
    - In scope: Repair the reproduced integration blocker on main e43acc5f72ba1f884966a16325d6dbc94fcb1f04. DVS5NN accepted and committed the cleanup at b577984d8418b4cb7fed521c14b6ab00bf773a93, then completed full checks, but verification persistence rejected a docs_contract mapping added by observed base history. Result application stopped before WorkItem projection. Supported TESTER verification and EVALUATOR PASS did not complete the READY WorkItem. finish then wrote legacy DONE before rejecting required_work_item_incomplete. CFKR4P also completed full checks for a task-level null-WorkItem rework but result application failed because all WorkItems were already completed. Preserve one complete scenario: accepted semantic result, exact implementation and plan binding, current mandatory verification, interruption, supported restart, exactly-once WorkItem projection, and finish without false completion. Diagnose the smallest repair before planning. Prefer existing exchange, verification and runtime receipts; do not add a parallel state store or generic replay subsystem. Preserve stale result rejection, plan and commit identity, missing-evidence rejection, approval gates and mandatory checks. Do not implement AP-CORE-012, AP-CORE-013 or AP-CORE-015 ahead of the approved graph; limit the change to this demonstrated integration recovery and prevention contract. Include real-Git positive, interruption, repeat, changed-plan/head and incomplete-WorkItem negative regressions. Keep DVS5NN and CFKR4P source scopes unchanged. No release publication or CI weakening. The user authorized autonomous completion and supported operator approvals. Stop on any unsupported authority or materially larger architectural scope.
    - Out of scope: unrelated refactors not required for "Recover interrupted verification-to-WorkItem completion without false DONE".
  Plan: "Repair one interrupted implementation-to-completion scenario within the existing CLI-owned exchange and verification model. First reproduce the orphaned READY WorkItem, null-WorkItem rework failure and partial legacy DONE using real-Git task fixtures. Preserve the original accepted result and exact plan/implementation identity during supported continuation; use existing exchange and runtime receipts rather than a new store. Align the observed verification contract before recording command coverage. Keep task-level rework separate from a selected WorkItem. Check canonical completion eligibility before persisting legacy DONE. Cover successful execution, interruption after commit and verification, repeat continuation, next transition, stale plan/head/result and missing-evidence rejection. Run focused tests, unchanged full CI and diff check. Stop with a bounded scope-extension or blocker if safe recovery requires a new public protocol, a Core migration, or unsupported historical artifact mutation. Keep release/Core order and the two existing task source scopes unchanged."
  Verify Steps: |-
    PLANNER fallback scaffold for "Recover interrupted verification-to-WorkItem completion without false DONE". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Recover interrupted verification-to-WorkItem completion without false DONE". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
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
    digest: "sha256:26d50c1dbb4b663cc62d9a1360c083c0572d662b154a24eecf77c68315bb89e3"
    grant_id: "c811bef5-c74c-4fb6-bf71-2d210148ad76"
    issued_at: "2026-08-28T00:15:21.776Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:74cf66127f5d85756a8507d8c24ad15708930ec63a027221d4ef592d1688ff8b"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608280009-QMVHM2"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-28T00:15:21.776Z"
        approved_by: "USER"
        approved_digest: "sha256:f1268d36bbb2c0c541cf3a769f5cbe3ad4b141236b5b4fa60d40af1580da45a1"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-28T00:14:54.191Z"
      digest: "sha256:f1268d36bbb2c0c541cf3a769f5cbe3ad4b141236b5b4fa60d40af1580da45a1"
      proposal:
        assumptions:
          - "Fresh semantic work and verification remain required when historical authority cannot be proven."
          - "No manual mutation of existing task, journal or exchange state is an implementation or recovery strategy."
          - "The fix remains a bounded compatibility repair; canonical Core migration tasks remain in their approved order."
        planning_baseline:
          captured_at: "2026-08-28T00:10:00.782Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:3583546dcdcf86aea188bb0149fb873d3d808449e3e5606b1ec456523b0a32f4"
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
            - ".agentplane/tasks/202608280009-QMVHM2/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "e43acc5f72ba1f884966a16325d6dbc94fcb1f04"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608280009-QMVHM2"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-ci"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "diff-check"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "full-ci"
                - "diff-check"
              description: "Resume an interrupted accepted implementation through the existing supervisor route only after proving the original result, approved plan, WorkItem, implementation and current required verification. Repeated resume records one WorkItem result. Reject changed plan, unrelated head, missing evidence and divergent result. Preserve historical artifacts."
              id: "exact-recovery"
              required: true
            -
              check_ids:
                - "full-ci"
                - "diff-check"
              description: "A task-level rework with no selected WorkItem and all required WorkItems already completed verifies the current implementation without inventing or re-completing a WorkItem. Missing or ambiguous real WorkItems still fail."
              id: "task-level-rework"
              required: true
            -
              check_ids:
                - "full-ci"
                - "diff-check"
              description: "A task whose required WorkItem is incomplete must fail completion before legacy DONE, success comments or closure proof is persisted. Successful completion remains replay-safe and retains current quality and authority gates."
              id: "no-false-done"
              required: true
            -
              check_ids:
                - "full-ci"
                - "diff-check"
              description: "Resolve and preserve the complete observed verification contract before mapping executed commands to required checks. A docs requirement discovered from the frozen task diff must not be omitted. A real check failure cannot become passed through recovery."
              id: "evidence-alignment"
              required: true
          evidence_fingerprint: "sha256:3583546dcdcf86aea188bb0149fb873d3d808449e3e5606b1ec456523b0a32f4"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "full-ci"
                    - "diff-check"
                  description: "Resume an interrupted accepted implementation through the existing supervisor route only after proving the original result, approved plan, WorkItem, implementation and current required verification. Repeated resume records one WorkItem result. Reject changed plan, unrelated head, missing evidence and divergent result. Preserve historical artifacts."
                  id: "exact-recovery"
                  required: true
                -
                  check_ids:
                    - "full-ci"
                    - "diff-check"
                  description: "A task-level rework with no selected WorkItem and all required WorkItems already completed verifies the current implementation without inventing or re-completing a WorkItem. Missing or ambiguous real WorkItems still fail."
                  id: "task-level-rework"
                  required: true
                -
                  check_ids:
                    - "full-ci"
                    - "diff-check"
                  description: "A task whose required WorkItem is incomplete must fail completion before legacy DONE, success comments or closure proof is persisted. Successful completion remains replay-safe and retains current quality and authority gates."
                  id: "no-false-done"
                  required: true
                -
                  check_ids:
                    - "full-ci"
                    - "diff-check"
                  description: "Resolve and preserve the complete observed verification contract before mapping executed commands to required checks. A docs requirement discovered from the frozen task diff must not be omitted. A real check failure cannot become passed through recovery."
                  id: "evidence-alignment"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 200000
                optional_sources:
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                  - "packages/agentplane/src/commands/shared/quality-review-target.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                  - "packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                  - "packages/agentplane/src/commands/task/finish-shared.ts"
                  - "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                symbol_hints:
                  - "applyExternalImplementationResult"
                  - "recordTaskCentricExternalResult"
                  - "completeTaskFromLegacyVerification"
              depends_on: []
              expected_outputs:
                - "source_patch:verification-result-recovery"
                - "verification_evidence:interruption-replay-negative-cases"
              id: "recover-verified-implementation"
              objective: "Repair one interrupted implementation-to-completion scenario within the existing CLI-owned exchange and verification model. First reproduce the orphaned READY WorkItem, null-WorkItem rework failure and partial legacy DONE using real-Git task fixtures. Preserve the original accepted result and exact plan/implementation identity during supported continuation; use existing exchange and runtime receipts rather than a new store. Align the observed verification contract before recording command coverage. Keep task-level rework separate from a selected WorkItem. Check canonical completion eligibility before persisting legacy DONE. Cover successful execution, interruption after commit and verification, repeat continuation, next transition, stale plan/head/result and missing-evidence rejection. Run focused tests, unchanged full CI and diff check. Stop with a bounded scope-extension or blocker if safe recovery requires a new public protocol, a Core migration, or unsupported historical artifact mutation. Keep release/Core order and the two existing task source scopes unchanged."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/direct-task-verification.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/finish-shared.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                - "packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
                - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                - "packages/agentplane/src/commands/task/finish-shared.ts"
                - "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-ci"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "diff-check"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "full-ci"
                      - "diff-check"
                    description: "Resume an interrupted accepted implementation through the existing supervisor route only after proving the original result, approved plan, WorkItem, implementation and current required verification. Repeated resume records one WorkItem result. Reject changed plan, unrelated head, missing evidence and divergent result. Preserve historical artifacts."
                    id: "exact-recovery"
                    required: true
                  -
                    check_ids:
                      - "full-ci"
                      - "diff-check"
                    description: "A task-level rework with no selected WorkItem and all required WorkItems already completed verifies the current implementation without inventing or re-completing a WorkItem. Missing or ambiguous real WorkItems still fail."
                    id: "task-level-rework"
                    required: true
                  -
                    check_ids:
                      - "full-ci"
                      - "diff-check"
                    description: "A task whose required WorkItem is incomplete must fail completion before legacy DONE, success comments or closure proof is persisted. Successful completion remains replay-safe and retains current quality and authority gates."
                    id: "no-false-done"
                    required: true
                  -
                    check_ids:
                      - "full-ci"
                      - "diff-check"
                    description: "Resolve and preserve the complete observed verification contract before mapping executed commands to required checks. A docs requirement discovered from the frozen task diff must not be omitted. A real check failure cannot become passed through recovery."
                    id: "evidence-alignment"
                    required: true
                evidence_fingerprint: "sha256:3583546dcdcf86aea188bb0149fb873d3d808449e3e5606b1ec456523b0a32f4"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608280009-QMVHM2"
    event_cursor: 0
    final_validation: null
    id: "202608280009-QMVHM2"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "git diff --check"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-28T00:09:47.847Z"
      constraints: []
      request: |-
        Recover interrupted verification-to-WorkItem completion without false DONE

        Repair the reproduced integration blocker on main e43acc5f72ba1f884966a16325d6dbc94fcb1f04. DVS5NN accepted and committed the cleanup at b577984d8418b4cb7fed521c14b6ab00bf773a93, then completed full checks, but verification persistence rejected a docs_contract mapping added by observed base history. Result application stopped before WorkItem projection. Supported TESTER verification and EVALUATOR PASS did not complete the READY WorkItem. finish then wrote legacy DONE before rejecting required_work_item_incomplete. CFKR4P also completed full checks for a task-level null-WorkItem rework but result application failed because all WorkItems were already completed. Preserve one complete scenario: accepted semantic result, exact implementation and plan binding, current mandatory verification, interruption, supported restart, exactly-once WorkItem projection, and finish without false completion. Diagnose the smallest repair before planning. Prefer existing exchange, verification and runtime receipts; do not add a parallel state store or generic replay subsystem. Preserve stale result rejection, plan and commit identity, missing-evidence rejection, approval gates and mandatory checks. Do not implement AP-CORE-012, AP-CORE-013 or AP-CORE-015 ahead of the approved graph; limit the change to this demonstrated integration recovery and prevention contract. Include real-Git positive, interruption, repeat, changed-plan/head and incomplete-WorkItem negative regressions. Keep DVS5NN and CFKR4P source scopes unchanged. No release publication or CI weakening. The user authorized autonomous completion and supported operator approvals. Stop on any unsupported authority or materially larger architectural scope.
      task_id: "202608280009-QMVHM2"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-28T00:15:21.776Z"
    work_items:
      recover-verified-implementation:
        attempt: 0
        claim_id: null
        id: "recover-verified-implementation"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "e43acc5f72ba1f884966a16325d6dbc94fcb1f04"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "e43acc5f72ba1f884966a16325d6dbc94fcb1f04"
    version: 1
id_source: "generated"
---
## Summary

Recover interrupted verification-to-WorkItem completion without false DONE

Repair the reproduced integration blocker on main e43acc5f72ba1f884966a16325d6dbc94fcb1f04. DVS5NN accepted and committed the cleanup at b577984d8418b4cb7fed521c14b6ab00bf773a93, then completed full checks, but verification persistence rejected a docs_contract mapping added by observed base history. Result application stopped before WorkItem projection. Supported TESTER verification and EVALUATOR PASS did not complete the READY WorkItem. finish then wrote legacy DONE before rejecting required_work_item_incomplete. CFKR4P also completed full checks for a task-level null-WorkItem rework but result application failed because all WorkItems were already completed. Preserve one complete scenario: accepted semantic result, exact implementation and plan binding, current mandatory verification, interruption, supported restart, exactly-once WorkItem projection, and finish without false completion. Diagnose the smallest repair before planning. Prefer existing exchange, verification and runtime receipts; do not add a parallel state store or generic replay subsystem. Preserve stale result rejection, plan and commit identity, missing-evidence rejection, approval gates and mandatory checks. Do not implement AP-CORE-012, AP-CORE-013 or AP-CORE-015 ahead of the approved graph; limit the change to this demonstrated integration recovery and prevention contract. Include real-Git positive, interruption, repeat, changed-plan/head and incomplete-WorkItem negative regressions. Keep DVS5NN and CFKR4P source scopes unchanged. No release publication or CI weakening. The user authorized autonomous completion and supported operator approvals. Stop on any unsupported authority or materially larger architectural scope.

## Scope

- In scope: Repair the reproduced integration blocker on main e43acc5f72ba1f884966a16325d6dbc94fcb1f04. DVS5NN accepted and committed the cleanup at b577984d8418b4cb7fed521c14b6ab00bf773a93, then completed full checks, but verification persistence rejected a docs_contract mapping added by observed base history. Result application stopped before WorkItem projection. Supported TESTER verification and EVALUATOR PASS did not complete the READY WorkItem. finish then wrote legacy DONE before rejecting required_work_item_incomplete. CFKR4P also completed full checks for a task-level null-WorkItem rework but result application failed because all WorkItems were already completed. Preserve one complete scenario: accepted semantic result, exact implementation and plan binding, current mandatory verification, interruption, supported restart, exactly-once WorkItem projection, and finish without false completion. Diagnose the smallest repair before planning. Prefer existing exchange, verification and runtime receipts; do not add a parallel state store or generic replay subsystem. Preserve stale result rejection, plan and commit identity, missing-evidence rejection, approval gates and mandatory checks. Do not implement AP-CORE-012, AP-CORE-013 or AP-CORE-015 ahead of the approved graph; limit the change to this demonstrated integration recovery and prevention contract. Include real-Git positive, interruption, repeat, changed-plan/head and incomplete-WorkItem negative regressions. Keep DVS5NN and CFKR4P source scopes unchanged. No release publication or CI weakening. The user authorized autonomous completion and supported operator approvals. Stop on any unsupported authority or materially larger architectural scope.
- Out of scope: unrelated refactors not required for "Recover interrupted verification-to-WorkItem completion without false DONE".

## Plan

Repair one interrupted implementation-to-completion scenario within the existing CLI-owned exchange and verification model. First reproduce the orphaned READY WorkItem, null-WorkItem rework failure and partial legacy DONE using real-Git task fixtures. Preserve the original accepted result and exact plan/implementation identity during supported continuation; use existing exchange and runtime receipts rather than a new store. Align the observed verification contract before recording command coverage. Keep task-level rework separate from a selected WorkItem. Check canonical completion eligibility before persisting legacy DONE. Cover successful execution, interruption after commit and verification, repeat continuation, next transition, stale plan/head/result and missing-evidence rejection. Run focused tests, unchanged full CI and diff check. Stop with a bounded scope-extension or blocker if safe recovery requires a new public protocol, a Core migration, or unsupported historical artifact mutation. Keep release/Core order and the two existing task source scopes unchanged.

## Verify Steps

PLANNER fallback scaffold for "Recover interrupted verification-to-WorkItem completion without false DONE". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Recover interrupted verification-to-WorkItem completion without false DONE". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
