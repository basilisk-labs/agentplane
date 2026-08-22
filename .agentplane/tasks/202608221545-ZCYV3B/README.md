---
id: "202608221545-ZCYV3B"
title: "Stop verification receipts from overstating check coverage"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "regression"
  - "verification"
  - "task-centric"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/external-agent-verification-result.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-22T15:47:18.423Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:defee467b01eefa8d1131fcd66aa9f6b83c7e5a46f97ab5b6eae0014070d57a4"
verification:
  state: "needs_rework"
  updated_at: "2026-08-22T15:55:08.257Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Declared check failed: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/external-agent-verification-result.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts"
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
      - "packages/agentplane/src/commands/shared/task-verification-records.test.ts"
      - "packages/agentplane/src/commands/shared/task-verification-records.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-verification-result.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-verification-result.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Only the proven coverage regression and its tests are in scope."
      - "The fix changes verification evidence semantics and requires isolated review."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/shared/task-verification-records.test.ts"
      - "packages/agentplane/src/commands/shared/task-verification-records.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-verification-result.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-verification-result.ts"
  observed:
    authority_violations:
      - "verification:recorded-check-1:fail"
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/shared/task-verification-records.test.ts"
      - "packages/agentplane/src/commands/shared/task-verification-records.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-verification-result.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-verification-result.ts"
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
          - "packages/agentplane/src/commands/shared/task-verification-records.test.ts"
          - "packages/agentplane/src/commands/shared/task-verification-records.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/external-agent-verification-result.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-verification-result.ts"
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
      digest: "sha256:9efc66dd86035ff3ee662cd3266b4bb05673b9bf2240f6057736111d9c251d95"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/task-verification-records.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-verification-records.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-verification-records.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-verification-records.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/shared/task-verification-records.test.ts"
          - "packages/agentplane/src/commands/shared/task-verification-records.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/external-agent-verification-result.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-verification-result.ts"
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
      - "verification_recovery:recorded-check-1"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: aba4ff2cec7f. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-22T15:47:33.996Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-22T15:55:05.583Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: aba4ff2cec7f. CLI accepted one state-bound external-agent semantic result."
    commit: "aba4ff2cec7f07dcfe90e6ca0036c8fc5b4f468c"
  -
    type: "verify"
    at: "2026-08-22T15:55:08.257Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/external-agent-verification-result.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts"
  -
    type: "status"
    at: "2026-08-22T15:55:12.864Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-22T15:55:12.864Z"
doc_updated_by: "CODER"
description: "Fix only the proven task-centric verification regression from PR #4873: one focused declared command must not be recorded as full_regression or hosted_integration evidence. Preserve separate hosted-provider gating, run a real repository full-regression command when the contract requires it, and bind each recorded check to concrete executed evidence. Add regression tests. Do not change context or Knowledge Assimilation behavior."
sections:
  Summary: |-
    Stop verification receipts from overstating check coverage

    Fix only the proven task-centric verification regression from PR #4873: one focused declared command must not be recorded as full_regression or hosted_integration evidence. Preserve separate hosted-provider gating, run a real repository full-regression command when the contract requires it, and bind each recorded check to concrete executed evidence. Add regression tests. Do not change context or Knowledge Assimilation behavior.
  Scope: |-
    - In scope: Fix only the proven task-centric verification regression from PR #4873: one focused declared command must not be recorded as full_regression or hosted_integration evidence. Preserve separate hosted-provider gating, run a real repository full-regression command when the contract requires it, and bind each recorded check to concrete executed evidence. Add regression tests. Do not change context or Knowledge Assimilation behavior.
    - Out of scope: unrelated refactors not required for "Stop verification receipts from overstating check coverage".
  Plan: "Correct verification evidence coverage without changing context behavior or the hosted integration gate."
  Verify Steps: |-
    PLANNER fallback scaffold for "Stop verification receipts from overstating check coverage". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Stop verification receipts from overstating check coverage". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-22T15:55:08.257Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/external-agent-verification-result.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:e53c419db3d564888ffad6f61c6eb347c5fdeb5fbcad08289828f74178742ef3, input_digest=sha256:e89d5844383f9d21c485c3502c3865506d974b0cdc78c523098f7e35e6c55c53

    Details:

    Command: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/external-agent-verification-result.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts
    Result: fail
    Evidence: .agentplane/tasks/202608221545-ZCYV3B/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608221545-ZCYV3B declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608221545-ZCYV3B-stop-verification-receipts-from-overstating-chec/.agentplane/tasks/202608221545-ZCYV3B/blueprint/resolved-snapshot.json
    - old_digest: 0908521a4bb6f372401ef4b654d1664ba9b376aa40d7435924e69f415ea9dddb
    - current_digest: 0908521a4bb6f372401ef4b654d1664ba9b376aa40d7435924e69f415ea9dddb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608221545-ZCYV3B

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
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:defee467b01eefa8d1131fcd66aa9f6b83c7e5a46f97ab5b6eae0014070d57a4"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:3a70b53c6c6e115d033c6127acdb3be8b77557a89376aed44aca048811758ad3"
    grant_id: "117d791b-4314-43c3-a611-c91515e4cff3"
    issued_at: "2026-08-22T15:47:18.423Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:18f9844eaa0654affa955a73e0fe040394c8ef6050870e182adfdb0cb3cdf58e"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608221545-ZCYV3B"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-22T15:47:18.423Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:3291318d9a3a174c1368a1c505706c19a5faa3b8cd921b0b73411c22c0dcbd49"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-08-22T15:46:53.036Z"
      digest: "sha256:3291318d9a3a174c1368a1c505706c19a5faa3b8cd921b0b73411c22c0dcbd49"
      proposal:
        assumptions:
          - "Hosted integration continues to be enforced by the branch PR provider route rather than the local verification receipt."
        planning_baseline:
          captured_at: "2026-08-22T15:45:41.933Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:b1656d15162bb12baaa3d6c531101b6c7811d60364a56df302da220771be9aa0"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608221545-ZCYV3B/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "1d68d8f8aa4d3edc9c350a65cdc056fd38a0990a"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608221545-ZCYV3B"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/external-agent-verification-result.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts"
              id: "check-regression-fixed"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "check-regression-fixed"
              description: "Focused commands cannot overstate full or hosted verification coverage."
              id: "criterion-regression-fixed"
              required: true
          evidence_fingerprint: "sha256:a1b58fe59c94f5a3e72e09560fefc7bd8c1424f7943c66cb23bb5bcbe56b9044"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-verification-coverage"
                  description: "Each locally passed contract check is backed by a command that actually exercises its scope."
                  id: "criterion-exact-evidence"
                  required: true
                -
                  check_ids:
                    - "check-verification-coverage"
                  description: "hosted_integration remains provider-owned and is never emitted as local command evidence."
                  id: "criterion-hosted-separation"
                  required: true
                -
                  check_ids:
                    - "check-verification-coverage"
                  description: "A required full_regression uses concrete repository full-regression evidence or remains unsatisfied."
                  id: "criterion-full-regression"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 131072
                optional_sources:
                  - "packages/agentplane/src/cli/verification-contract.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/external-agent-verification-result.ts"
                  - "packages/agentplane/src/commands/shared/task-verification-records.ts"
                symbol_hints:
                  - "renderDirectTaskVerificationDetails"
                  - "completedVerificationDetails"
                  - "requiredVerificationContractChecks"
              depends_on: []
              expected_outputs:
                - "verification-coverage-regression-fix"
              id: "bind-verification-evidence-to-executed-scope"
              objective: "Prevent focused local checks from satisfying full_regression or hosted_integration, execute concrete local full-regression evidence when selected and available, and retain provider-owned hosted gating."
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
                  resource: "packages/agentplane/src/commands/task/external-agent-verification-result.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/task-verification-records.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-verification-result.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/task-verification-records.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/external-agent-verification-result.ts"
                - "packages/agentplane/src/commands/shared/task-verification-records.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                - "packages/agentplane/src/commands/task/external-agent-verification-result.test.ts"
                - "packages/agentplane/src/commands/shared/task-verification-records.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/external-agent-verification-result.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts"
                    id: "check-verification-coverage"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "check-verification-coverage"
                    description: "Each locally passed contract check is backed by a command that actually exercises its scope."
                    id: "criterion-exact-evidence"
                    required: true
                  -
                    check_ids:
                      - "check-verification-coverage"
                    description: "hosted_integration remains provider-owned and is never emitted as local command evidence."
                    id: "criterion-hosted-separation"
                    required: true
                  -
                    check_ids:
                      - "check-verification-coverage"
                    description: "A required full_regression uses concrete repository full-regression evidence or remains unsatisfied."
                    id: "criterion-full-regression"
                    required: true
                evidence_fingerprint: "sha256:56939561585e345399300d2035db515469c64404909123818a248927c085bc3e"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608221545-ZCYV3B"
    event_cursor: 0
    final_validation: null
    id: "202608221545-ZCYV3B"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/external-agent-verification-result.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts"
          id: "legacy-1"
          required: true
      captured_at: "2026-08-22T15:45:36.799Z"
      constraints: []
      request: |-
        Stop verification receipts from overstating check coverage

        Fix only the proven task-centric verification regression from PR #4873: one focused declared command must not be recorded as full_regression or hosted_integration evidence. Preserve separate hosted-provider gating, run a real repository full-regression command when the contract requires it, and bind each recorded check to concrete executed evidence. Add regression tests. Do not change context or Knowledge Assimilation behavior.
      task_id: "202608221545-ZCYV3B"
    lifecycle: "PLANNING"
    plan_amendments: []
    plan_history: []
    revision: 8
    schema_version: 1
    updated_at: "2026-08-22T15:55:11.801Z"
    work_items:
      bind-verification-evidence-to-executed-scope:
        attempt: 0
        claim_id: null
        id: "bind-verification-evidence-to-executed-scope"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      plan-refinement:work-order-202608221545-ZCYV3B-executor-82ff76e3b4718b385c11ce0b:
        aggregate_digest: "sha256:d2a3bd897041ce8e44ceceb59c43336e2181b24482aef62714122d0c527de78a"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-22T15:55:11.801Z"
          cause_refs:
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_b675061f4f16687b4f108e70"
          mutation_id: "plan-refinement:work-order-202608221545-ZCYV3B-executor-82ff76e3b4718b385c11ce0b"
          plan_digest: "sha256:3291318d9a3a174c1368a1c505706c19a5faa3b8cd921b0b73411c22c0dcbd49"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608221545-ZCYV3B"
          task_revision: 7
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608221545-ZCYV3B-executor-82ff76e3b4718b385c11ce0b"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202608221545-ZCYV3B"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "1d68d8f8aa4d3edc9c350a65cdc056fd38a0990a"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "1d68d8f8aa4d3edc9c350a65cdc056fd38a0990a"
    version: 1
id_source: "generated"
---
## Summary

Stop verification receipts from overstating check coverage

Fix only the proven task-centric verification regression from PR #4873: one focused declared command must not be recorded as full_regression or hosted_integration evidence. Preserve separate hosted-provider gating, run a real repository full-regression command when the contract requires it, and bind each recorded check to concrete executed evidence. Add regression tests. Do not change context or Knowledge Assimilation behavior.

## Scope

- In scope: Fix only the proven task-centric verification regression from PR #4873: one focused declared command must not be recorded as full_regression or hosted_integration evidence. Preserve separate hosted-provider gating, run a real repository full-regression command when the contract requires it, and bind each recorded check to concrete executed evidence. Add regression tests. Do not change context or Knowledge Assimilation behavior.
- Out of scope: unrelated refactors not required for "Stop verification receipts from overstating check coverage".

## Plan

Correct verification evidence coverage without changing context behavior or the hosted integration gate.

## Verify Steps

PLANNER fallback scaffold for "Stop verification receipts from overstating check coverage". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Stop verification receipts from overstating check coverage". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-22T15:55:08.257Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/external-agent-verification-result.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:e53c419db3d564888ffad6f61c6eb347c5fdeb5fbcad08289828f74178742ef3, input_digest=sha256:e89d5844383f9d21c485c3502c3865506d974b0cdc78c523098f7e35e6c55c53

Details:

Command: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/external-agent-verification-result.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts
Result: fail
Evidence: .agentplane/tasks/202608221545-ZCYV3B/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608221545-ZCYV3B declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608221545-ZCYV3B-stop-verification-receipts-from-overstating-chec/.agentplane/tasks/202608221545-ZCYV3B/blueprint/resolved-snapshot.json
- old_digest: 0908521a4bb6f372401ef4b654d1664ba9b376aa40d7435924e69f415ea9dddb
- current_digest: 0908521a4bb6f372401ef4b654d1664ba9b376aa40d7435924e69f415ea9dddb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608221545-ZCYV3B

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
