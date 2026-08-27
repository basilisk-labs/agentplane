---
id: "202608271538-T21JCA"
title: "Recover green behind PRs through provider branch update"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202608271251-GHHA0Q"
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-08-27T15:40:50.358Z"
  updated_by: "USER"
  note: "User authorized autonomous continuation and all required approvals for the refactoring and its demonstrated release blockers in this conversation."
verification:
  state: "ok"
  updated_at: "2026-08-27T15:55:41.958Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
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
      - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
      - "packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Bounded routing correction reuses the existing protected provider operation and its exact identity checks."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
      - "packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
      - "packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch.ts"
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
          - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
          - "packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch.ts"
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
      digest: "sha256:bd37bb7bf5c5ff66b106f43e65d497b5ef387d0b76bae82b472c9aaf78a38663"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
        - "central_component:packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/workflow-step-provider-update-branch.ts"
        - "central_path:packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-provider-update-branch.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
          - "packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch.ts"
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
  hash: "da64f2d0ea907c7f18a113743f731db104b0d564"
  message: "🚧 T21JCA task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: da64f2d0ea90. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-27T15:41:26.597Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-27T15:46:45.030Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: da64f2d0ea90. CLI accepted one state-bound external-agent semantic result."
    commit: "da64f2d0ea907c7f18a113743f731db104b0d564"
  -
    type: "verify"
    at: "2026-08-27T15:55:41.958Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-27T15:55:47.779Z"
doc_updated_by: "SUPERVISOR"
description: "Repair the demonstrated recovery gap for an OPEN GitHub PR whose exact aligned head has successful required checks but whose provider mergeability is behind under strict protection. PR #5854 is the observed case: queue handoff after HTTP 405 required PR verification expected; no merge conflict, no live runner. Route the existing provider.pr.update_branch operation for coherent exact-head behind evidence, preserve stale-head/provider/base/authority guards, required checks, and queue ownership. Add focused regression tests. Do not merge or publish from semantic implementation, bypass protection, manufacture hosted failures, or rewrite frozen task bases."
sections:
  Summary: |-
    Recover green behind PRs through provider branch update

    Repair the demonstrated recovery gap for an OPEN GitHub PR whose exact aligned head has successful required checks but whose provider mergeability is behind under strict protection. PR #5854 is the observed case: queue handoff after HTTP 405 required PR verification expected; no merge conflict, no live runner. Route the existing provider.pr.update_branch operation for coherent exact-head behind evidence, preserve stale-head/provider/base/authority guards, required checks, and queue ownership. Add focused regression tests. Do not merge or publish from semantic implementation, bypass protection, manufacture hosted failures, or rewrite frozen task bases.
  Scope: |-
    - In scope: Repair the demonstrated recovery gap for an OPEN GitHub PR whose exact aligned head has successful required checks but whose provider mergeability is behind under strict protection. PR #5854 is the observed case: queue handoff after HTTP 405 required PR verification expected; no merge conflict, no live runner. Route the existing provider.pr.update_branch operation for coherent exact-head behind evidence, preserve stale-head/provider/base/authority guards, required checks, and queue ownership. Add focused regression tests. Do not merge or publish from semantic implementation, bypass protection, manufacture hosted failures, or rewrite frozen task bases.
    - Out of scope: unrelated refactors not required for "Recover green behind PRs through provider branch update".
  Plan: "Use the existing exact-head provider branch-update route for coherent GitHub behind observations regardless of whether completed hosted checks are green or failing. Keep the existing authority operation, guarded provider write, verification restart, and queue ownership. Add focused positive and negative regression coverage."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-27T15:55:41.958Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c7f40471aab7f29cb33117fa69b09c04daf0ab903aa1dd9b971374c6efdb5765, input_digest=sha256:dca1e9d37fb25247462b59519bf61816b39899fd526c39c5d9b506a113ab4b9a

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608271538-T21JCA Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: node node_modules/vitest/vitest.mjs run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts --pool=threads --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608271538-T21JCA Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608271538-T21JCA Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: node node_modules/vitest/vitest.mjs run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts --pool=threads --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608271538-T21JCA Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608271538-T21JCA Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608271538-T21JCA Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: node node_modules/vitest/vitest.mjs run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts --pool=threads --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608271538-T21JCA Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608271538-T21JCA-recover-green-behind-prs-through-provider-branch/.agentplane/tasks/202608271538-T21JCA/blueprint/resolved-snapshot.json
    - old_digest: bf6412e3d49da0bea86f3add5fbd4a74730f923069b0d97f7d3737c785393ad9
    - current_digest: bf6412e3d49da0bea86f3add5fbd4a74730f923069b0d97f7d3737c785393ad9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608271538-T21JCA

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
    digest: "sha256:f79454a42afa6fa318d7f7c1a17c652639a434a73e6f94c47a8f8b1c62ac9411"
    grant_id: "d9bb6315-92b2-4e31-a94f-3dd37ceda29a"
    issued_at: "2026-08-27T15:40:50.358Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:8c399bd6b9e4a9c2ba1dc4ff05857e18717e99b5bcf4c148c08d36ae2515cef4"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608271538-T21JCA"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-27T15:40:50.358Z"
        approved_by: "USER"
        approved_digest: "sha256:a140615d520f400234e42cf17067be1c08443c8cca9712aba4bfbbc7894c2994"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-27T15:40:37.699Z"
      digest: "sha256:a140615d520f400234e42cf17067be1c08443c8cca9712aba4bfbbc7894c2994"
      proposal:
        assumptions:
          - "A coherent provider behind observation is sufficient to request the existing guarded branch update; it does not itself authorize a provider write or prove merge readiness."
        planning_baseline:
          captured_at: "2026-08-27T15:39:04.704Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:7ccb15affd4d5ca08e04351e4df601c6c49884b206c906c30850b9a31cb11755"
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
            - ".agentplane/tasks/202608271538-T21JCA/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "2c9a2f59146c302c517524136e66abb902f92ba6"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608271538-T21JCA"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts --pool=threads --maxWorkers=2"
              id: "scoped-tests"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-ci"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "scoped-tests"
                - "full-ci"
              description: "Coherent exact-head GitHub behind PRs with green or failing checks select the existing digest-bound update operation. Unchecked, stale-head, conflicting, unknown and non-behind states remain excluded. No approval, provider identity, required check, merge, or queue ownership gate is bypassed."
              id: "green-behind-recovery"
              required: true
          evidence_fingerprint: "sha256:7ccb15affd4d5ca08e04351e4df601c6c49884b206c906c30850b9a31cb11755"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "scoped-tests"
                    - "full-ci"
                  description: "Coherent exact-head GitHub behind PRs with green or failing checks select the existing digest-bound update operation. Unchecked, stale-head, conflicting, unknown and non-behind states remain excluded. No approval, provider identity, required check, merge, or queue ownership gate is bypassed."
                  id: "green-behind-recovery"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 100000
                optional_sources:
                  - "packages/agentplane/src/commands/pr/provider-update-branch.test.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch.ts"
                  - "packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
                symbol_hints:
                  - "providerUpdateBranchParams"
                  - "provider.pr.update_branch"
              depends_on: []
              expected_outputs:
                - "artifact:provider-update-report"
              id: "recover-green-behind"
              objective: "Use the existing exact-head provider branch-update route for coherent GitHub behind observations regardless of whether completed hosted checks are green or failing. Keep the existing authority operation, guarded provider write, verification restart, and queue ownership. Add focused positive and negative regression coverage."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
                - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch.ts"
                - "packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
                - "packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts --pool=threads --maxWorkers=2"
                    id: "scoped-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-ci"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "scoped-tests"
                      - "full-ci"
                    description: "Coherent exact-head GitHub behind PRs with green or failing checks select the existing digest-bound update operation. Unchecked, stale-head, conflicting, unknown and non-behind states remain excluded. No approval, provider identity, required check, merge, or queue ownership gate is bypassed."
                    id: "green-behind-recovery"
                    required: true
                evidence_fingerprint: "sha256:7ccb15affd4d5ca08e04351e4df601c6c49884b206c906c30850b9a31cb11755"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608271538-T21JCA"
    event_cursor: 0
    final_validation: null
    id: "202608271538-T21JCA"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
      captured_at: "2026-08-27T15:38:50.011Z"
      constraints: []
      request: |-
        Recover green behind PRs through provider branch update

        Repair the demonstrated recovery gap for an OPEN GitHub PR whose exact aligned head has successful required checks but whose provider mergeability is behind under strict protection. PR #5854 is the observed case: queue handoff after HTTP 405 required PR verification expected; no merge conflict, no live runner. Route the existing provider.pr.update_branch operation for coherent exact-head behind evidence, preserve stale-head/provider/base/authority guards, required checks, and queue ownership. Add focused regression tests. Do not merge or publish from semantic implementation, bypass protection, manufacture hosted failures, or rewrite frozen task bases.
      task_id: "202608271538-T21JCA"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 8
    schema_version: 1
    updated_at: "2026-08-27T15:55:49.603Z"
    work_items:
      recover-green-behind:
        attempt: 1
        claim_id: null
        id: "recover-green-behind"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:259252b08403e7faea43181efc56bf883d0ef096075c15345665e53708f25e7d"
            id: "artifact:provider-update-report"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608271538-T21JCA"
              work_item_id: "recover-green-behind"
            provenance:
              - "sha256:187ebcaa53585ac352ac77ba15dc5883c7d26314c07ac9b7d82747c2479667d3"
              - ".agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:1c70bd7d803f276655b9faf4fba9dcfcec407c601ec8c06e78f1d6d39feb5307"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json"
              check_id: "scoped-tests"
              command_identity: "node node_modules/vitest/vitest.mjs run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts --pool=threads --maxWorkers=2"
              detail: "Observed by node node_modules/vitest/vitest.mjs run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts --pool=threads --maxWorkers=2."
              exit_code: 0
              observed_at: "2026-08-27T15:55:49.589Z"
              repository_snapshot_digest: "sha256:1c70bd7d803f276655b9faf4fba9dcfcec407c601ec8c06e78f1d6d39feb5307"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json"
              check_id: "full-ci"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-08-27T15:55:49.590Z"
              repository_snapshot_digest: "sha256:1c70bd7d803f276655b9faf4fba9dcfcec407c601ec8c06e78f1d6d39feb5307"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608271538-T21JCA-executor-5841c35ac854c6cb561cb9be:
        aggregate_digest: "sha256:72ae89d409be08028abd522f1089bbe487b5ea43ee95d12b09e52b19429ee89d"
        event:
          actor_id: "agentplane"
          at: "2026-08-27T15:55:49.603Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_9f4e972105efe26c5915cb77"
          mutation_id: "external-result:work-order-202608271538-T21JCA-executor-5841c35ac854c6cb561cb9be"
          plan_digest: "sha256:a140615d520f400234e42cf17067be1c08443c8cca9712aba4bfbbc7894c2994"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608271538-T21JCA"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "recover-green-behind"
        mutation_id: "external-result:work-order-202608271538-T21JCA-executor-5841c35ac854c6cb561cb9be"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202608271538-T21JCA"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "da64f2d0ea907c7f18a113743f731db104b0d564"
  task_execution_context:
    base_ref: "main"
    base_sha: "2c9a2f59146c302c517524136e66abb902f92ba6"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "2c9a2f59146c302c517524136e66abb902f92ba6"
    version: 1
id_source: "generated"
---
## Summary

Recover green behind PRs through provider branch update

Repair the demonstrated recovery gap for an OPEN GitHub PR whose exact aligned head has successful required checks but whose provider mergeability is behind under strict protection. PR #5854 is the observed case: queue handoff after HTTP 405 required PR verification expected; no merge conflict, no live runner. Route the existing provider.pr.update_branch operation for coherent exact-head behind evidence, preserve stale-head/provider/base/authority guards, required checks, and queue ownership. Add focused regression tests. Do not merge or publish from semantic implementation, bypass protection, manufacture hosted failures, or rewrite frozen task bases.

## Scope

- In scope: Repair the demonstrated recovery gap for an OPEN GitHub PR whose exact aligned head has successful required checks but whose provider mergeability is behind under strict protection. PR #5854 is the observed case: queue handoff after HTTP 405 required PR verification expected; no merge conflict, no live runner. Route the existing provider.pr.update_branch operation for coherent exact-head behind evidence, preserve stale-head/provider/base/authority guards, required checks, and queue ownership. Add focused regression tests. Do not merge or publish from semantic implementation, bypass protection, manufacture hosted failures, or rewrite frozen task bases.
- Out of scope: unrelated refactors not required for "Recover green behind PRs through provider branch update".

## Plan

Use the existing exact-head provider branch-update route for coherent GitHub behind observations regardless of whether completed hosted checks are green or failing. Keep the existing authority operation, guarded provider write, verification restart, and queue ownership. Add focused positive and negative regression coverage.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-27T15:55:41.958Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c7f40471aab7f29cb33117fa69b09c04daf0ab903aa1dd9b971374c6efdb5765, input_digest=sha256:dca1e9d37fb25247462b59519bf61816b39899fd526c39c5d9b506a113ab4b9a

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608271538-T21JCA Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: node node_modules/vitest/vitest.mjs run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts --pool=threads --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608271538-T21JCA Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608271538-T21JCA Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: node node_modules/vitest/vitest.mjs run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts --pool=threads --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608271538-T21JCA Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608271538-T21JCA Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608271538-T21JCA Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: node node_modules/vitest/vitest.mjs run packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/commands/pr/provider-update-branch.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts --pool=threads --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608271538-T21JCA Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608271538-T21JCA-recover-green-behind-prs-through-provider-branch/.agentplane/tasks/202608271538-T21JCA/blueprint/resolved-snapshot.json
- old_digest: bf6412e3d49da0bea86f3add5fbd4a74730f923069b0d97f7d3737c785393ad9
- current_digest: bf6412e3d49da0bea86f3add5fbd4a74730f923069b0d97f7d3737c785393ad9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608271538-T21JCA

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
