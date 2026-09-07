---
id: "202609071111-Y0Z0VQ"
title: "Repair confirmed Arkady Factory compatibility lifecycle defects sequentially"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recovery"
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-09-07T11:19:25.724Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:fa8df9000cb82ac6335ab8a723fcacdbc2aacc87b38bcec02c73c3bf65e443c8"
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
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/backends"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands"
      - "packages/agentplane/src/runner/usecases"
      - "packages/agentplane/src/runtime/task-routing"
      - "packages/core/src/runner"
      - "packages/core/src/tasks"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Changes are local and reversible; tests exercise authority without actual external effects."
      - "The user requested sequential fixes to confirmed lifecycle defects."
    repository_effects:
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/backends"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands"
      - "packages/agentplane/src/runner/usecases"
      - "packages/agentplane/src/runtime/task-routing"
      - "packages/core/src/runner"
      - "packages/core/src/tasks"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
      - "packages/core"
    changed_paths:
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
      - "packages/agentplane/src/cli/route-decision.testkit.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-reducer.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-finalization.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
      - "packages/agentplane/src/commands/task/plan-shared.ts"
      - "packages/agentplane/src/commands/task/plan.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
      - "packages/core/src/tasks/task-centric/compatibility.ts"
      - "packages/core/src/tasks/task-centric/index.ts"
      - "packages/core/src/tasks/task-centric/lifecycle.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
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
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/backends"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands"
          - "packages/agentplane/src/runner/usecases"
          - "packages/agentplane/src/runtime/task-routing"
          - "packages/core/src/runner"
          - "packages/core/src/tasks"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:9a8b92435ecd99f2296d64cc72e5a0a796077637388e31ef63a085d0d6509b4a"
      escalation_reasons:
        - "central_component:packages/core/src/runner"
        - "central_component:packages/core/src/tasks"
        - "central_path:packages/agentplane/src/cli/route-decision.testkit.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-branch.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-factory.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-reducer.ts"
        - "central_path:packages/core/src/tasks/task-centric/compatibility.ts"
        - "central_path:packages/core/src/tasks/task-centric/index.ts"
        - "central_path:packages/core/src/tasks/task-centric/lifecycle.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
          - "packages/core"
        changed_files:
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
          - "packages/agentplane/src/cli/route-decision.testkit.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-reducer.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-finalization.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
          - "packages/agentplane/src/commands/task/finish-shared.ts"
          - "packages/agentplane/src/commands/task/plan-shared.ts"
          - "packages/agentplane/src/commands/task/plan.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
          - "packages/core/src/tasks/task-centric/compatibility.ts"
          - "packages/core/src/tasks/task-centric/index.ts"
          - "packages/core/src/tasks/task-centric/lifecycle.ts"
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
  hash: "02571f0b69dcb3c0adf005c3de7a9f9708ac6237"
  message: "🚧 Y0Z0VQ task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: b4e33797aa13. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 4a79e46389fd. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 02571f0b69dc. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-07T11:19:37.534Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-07T11:25:20.567Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: b4e33797aa13. CLI accepted one state-bound external-agent semantic result."
    commit: "b4e33797aa138d279f72ba825fe5b0c8e7bcce0c"
  -
    type: "status"
    at: "2026-09-07T11:46:44.101Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 4a79e46389fd. CLI accepted one state-bound external-agent semantic result."
    commit: "4a79e46389fd5b6ff62357c674f43bb4be3f48a7"
  -
    type: "status"
    at: "2026-09-07T12:13:41.753Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 02571f0b69dc. CLI accepted one state-bound external-agent semantic result."
    commit: "02571f0b69dcb3c0adf005c3de7a9f9708ac6237"
doc_version: 3
doc_updated_at: "2026-09-07T12:13:41.753Z"
doc_updated_by: "SUPERVISOR"
description: "Recheck current code against the Arkady Factory audit. Fix AP-02 premature closeout first, then AP-04 existing-result acceptance with AP-05 strict WorkItem result binding, AP-06 stale legacy plan routing, and AP-09 missing README discovery. Reproduce AP-01 revision divergence and AP-08 scoped deploy authority before changing them. Preserve existing AP-03 and AP-07 fixes. Add focused behavioral regressions for each confirmed defect. Do not modify Factory, fabricate product diffs, weaken verification, or publish externally. User requested sequential verification and fixes in the current conversation."
sections:
  Summary: |-
    Repair confirmed Arkady Factory compatibility lifecycle defects sequentially

    Recheck current code against the Arkady Factory audit. Fix AP-02 premature closeout first, then AP-04 existing-result acceptance with AP-05 strict WorkItem result binding, AP-06 stale legacy plan routing, and AP-09 missing README discovery. Reproduce AP-01 revision divergence and AP-08 scoped deploy authority before changing them. Preserve existing AP-03 and AP-07 fixes. Add focused behavioral regressions for each confirmed defect. Do not modify Factory, fabricate product diffs, weaken verification, or publish externally. User requested sequential verification and fixes in the current conversation.
  Scope: |-
    - In scope: Recheck current code against the Arkady Factory audit. Fix AP-02 premature closeout first, then AP-04 existing-result acceptance with AP-05 strict WorkItem result binding, AP-06 stale legacy plan routing, and AP-09 missing README discovery. Reproduce AP-01 revision divergence and AP-08 scoped deploy authority before changing them. Preserve existing AP-03 and AP-07 fixes. Add focused behavioral regressions for each confirmed defect. Do not modify Factory, fabricate product diffs, weaken verification, or publish externally. User requested sequential verification and fixes in the current conversation.
    - Out of scope: unrelated refactors not required for "Repair confirmed Arkady Factory compatibility lifecycle defects sequentially".
  Plan: |-
    Goal: Repair current AgentPlane defects from the Arkady Factory audit in one task with one active WorkItem at a time.

    Sequence: completion-route -> existing-result -> canonical-plan-routing -> task-discovery -> remaining-integrity-qualification.
    1. AP-02: Add a regression for required READY WorkItems with attempt=0 and successful legacy evidence. Correct route selection before closeout. Preserve finish validation.
    2. AP-04/AP-05: Reproduce zero-delta and identity failures. Implement exact WorkItem result binding and safe acceptance of an existing implementation with current supervisor evidence. Preserve replay safety and reject stale or ambiguous results.
    3. AP-06: Make an accepted canonical plan authoritative over stale legacy planning text without bypassing genuine material replanning.
    4. AP-09: Keep tasks discoverable when local README is absent using authoritative identity and existing checkout resolution. Report ambiguity without arbitrary branch selection or hidden repair.
    5. AP-01/AP-08: Reproduce revision divergence and scoped external-effect approval propagation on isolated fixtures. Fix only confirmed defects through existing atomic write and grant mechanisms. Preserve AP-03/AP-07 protections.

    Verification: For each WorkItem, first run the nearest existing regression suite with the new failing behavioral case, then implement the smallest correction and rerun it. Use bunx --no-install vitest --config vitest.workspace.ts run with project agentplane for command/backend tests, core for core tests, and cli-core for run-cli.core tests. Run bun run typecheck, targeted ESLint and Prettier checks on changed files, and git diff --check. Run bun run ci:local:full after all implementation WorkItems. Return exact observed results through each semantic result; AgentPlane owns verification persistence.

    Scope: Only the listed source roots and their adjacent tests. No Factory mutations, unrelated cleanup, schema proliferation, fabricated implementation delta, weakened checks, manual task/projection/receipt repair, or real external deployment. Local edits and isolated tests are authorized by the user. External publication and formal approval remain explicit boundaries. Stop on unresolved authority, material public recovery API design, or evidence incompatible with the current plan. Rollback: revert only the task implementation changes through the supported lifecycle.

    Completion evidence: Each confirmed defect has a behavior regression and passing relevant checks. Record non-reproduced claims as qualification limits. Review the final diff and tracked state. Do not claim historical Factory end-to-end recovery without running its supported isolated equivalent.
  Verify Steps: |-
    1. For each WorkItem, reproduce its defect in the nearest existing behavioral test before implementation. Run bunx --no-install vitest --config vitest.workspace.ts run with project agentplane for command/backend tests, core for core tests, and cli-core for run-cli.core tests. Expected: the regression fails before the correction and passes afterwards.
    2. Run bun run typecheck, targeted ESLint and Prettier checks on changed files, and git diff --check. Expected: all pass.
    3. After all implementation WorkItems, run bun run ci:local:full. Expected: all required checks pass.
    4. Verify stale result rejection, exact replay, unchanged implementation acceptance, canonical plan routing, missing projection discovery, revision integrity, and scoped authority using isolated fixtures. Do not execute actual external deployment.
    5. Review the final diff and git status --short --untracked-files=all. Report non-reproduced historical claims and unverified Factory runtime behavior explicitly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex:USER"
    approval_evidence_digest: "sha256:fa8df9000cb82ac6335ab8a723fcacdbc2aacc87b38bcec02c73c3bf65e443c8"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:e56f01a07537e5e356add0980ed2cb9f1e3eda790c1e8149342d2e700a736493"
    digest: "sha256:f23019d6bc516bfcc7d35b1d75ef4f0d958209ed4ed09fb6bbf46f20c32599d8"
    grant_id: "02ffb391-1d0a-4dc7-803d-bed38ae5474e"
    issued_at: "2026-09-07T11:19:25.724Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:212bad57a55da4e42bd0154a8838235a51218f317038e4d575725823adccaae3"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:60dd2df4fa0c1a4de5d6fc94bcf83e1bfc2f413a402478f353d689d54feacd57"
    status: "active"
    task_id: "202609071111-Y0Z0VQ"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-07T11:19:25.724Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:f62d6b4243b03500a561eed616f62fa95217e0a869442190a6db42e110af47b7"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-07T11:14:21.137Z"
      digest: "sha256:f62d6b4243b03500a561eed616f62fa95217e0a869442190a6db42e110af47b7"
      proposal:
        assumptions:
          - "One active WorkItem and sequential execution."
          - "Only local repository changes and isolated checks are authorized; no external publication."
          - "Historical Factory artifacts are evidence from the supplied audit, not proof that every issue reproduces on current main."
        planning_baseline:
          captured_at: "2026-09-07T11:11:29.850Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:b8e5ff25a15d76cb3a35f6e1cf7c0cf3bf7b52ef0f1b686f4c451d79a2c4558e"
          dirty_paths:
            - ".agentplane/tasks/202609071111-Y0Z0VQ/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "ca07204eed841a1aa245e3bb8d14832d7ea3ac30"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609071111-Y0Z0VQ"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              id: "final-checks"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "final-checks"
              description: "Confirmed defects are corrected with regressions and remaining uncertainty is explicit."
              id: "audit-completion"
              required: true
          evidence_fingerprint: "sha256:b8e5ff25a15d76cb3a35f6e1cf7c0cf3bf7b52ef0f1b686f4c451d79a2c4558e"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "completion-route-checks"
                  description: "Route and finish agree before and after WorkItem completion; no DONE is written on refusal."
                  id: "completion-route-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 100000
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step.test.ts"
                  - "packages/agentplane/src/commands/task/finish-shared.ts"
                symbol_hints: []
              depends_on: []
              expected_outputs:
                - "completion-route-result"
              id: "completion-route"
              objective: "AP-02: Reproduce READY attempt=0 with successful task verification and review. Make compatibility routing honor every required incomplete WorkItem before closeout. Preserve canonical finish guards and legacy tasks without structured plans."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "arkady-compatibility-repair"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends"
                - "packages/agentplane/src/runtime/task-routing"
                - "packages/agentplane/src/runner/usecases"
                - "packages/agentplane/src/cli"
                - "packages/core/src/tasks"
                - "packages/core/src/runner"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "completion-route-checks"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "completion-route-checks"
                    description: "Route and finish agree before and after WorkItem completion; no DONE is written on refusal."
                    id: "completion-route-acceptance"
                    required: true
                evidence_fingerprint: "sha256:b8e5ff25a15d76cb3a35f6e1cf7c0cf3bf7b52ef0f1b686f4c451d79a2c4558e"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "existing-result-checks"
                  description: "Valid existing implementation can complete its exact WorkItem after compatible replanning; stale plans, wrong claims, incompatible evidence and changed result replay are refused without mutation."
                  id: "existing-result-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 100000
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                symbol_hints: []
              depends_on:
                - "completion-route"
              expected_outputs:
                - "existing-result-result"
              id: "existing-result"
              objective: "AP-04 and AP-05: First reproduce result-binding and zero-delta failures. Bind issued and accepted results to the exact task, plan, WorkItem, attempt and claim; fail closed on missing or stale identity. Implement bounded acceptance of an existing implementation without artificial source changes, using supervisor-observed identity and current verification. Reuse current result and recovery primitives; distinguish operator adoption from observed episode execution."
              optional: false
              priority: 99
              required_inputs:
                - "completion-route-result"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "arkady-compatibility-repair"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends"
                - "packages/agentplane/src/runtime/task-routing"
                - "packages/agentplane/src/runner/usecases"
                - "packages/agentplane/src/cli"
                - "packages/core/src/tasks"
                - "packages/core/src/runner"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "existing-result-checks"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "existing-result-checks"
                    description: "Valid existing implementation can complete its exact WorkItem after compatible replanning; stale plans, wrong claims, incompatible evidence and changed result replay are refused without mutation."
                    id: "existing-result-acceptance"
                    required: true
                evidence_fingerprint: "sha256:b8e5ff25a15d76cb3a35f6e1cf7c0cf3bf7b52ef0f1b686f4c451d79a2c4558e"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "canonical-plan-routing-checks"
                  description: "Accepted structured plan gives the same route before and after restart despite stale textual projection; a material canonical replan request remains effective."
                  id: "canonical-plan-routing-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 100000
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/commands/shared/workflow-step-reducer.ts"
                  - "packages/agentplane/src/commands/task/plan.ts"
                symbol_hints: []
              depends_on:
                - "existing-result"
              expected_outputs:
                - "canonical-plan-routing-result"
              id: "canonical-plan-routing"
              objective: "AP-06: Reproduce contradictory legacy Plan and replan marker after structured plan acceptance. Route from the accepted canonical plan; keep genuinely unmigrated planning and material replan boundaries intact."
              optional: false
              priority: 98
              required_inputs:
                - "existing-result-result"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "arkady-compatibility-repair"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends"
                - "packages/agentplane/src/runtime/task-routing"
                - "packages/agentplane/src/runner/usecases"
                - "packages/agentplane/src/cli"
                - "packages/core/src/tasks"
                - "packages/core/src/runner"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "canonical-plan-routing-checks"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "canonical-plan-routing-checks"
                    description: "Accepted structured plan gives the same route before and after restart despite stale textual projection; a material canonical replan request remains effective."
                    id: "canonical-plan-routing-acceptance"
                    required: true
                evidence_fingerprint: "sha256:b8e5ff25a15d76cb3a35f6e1cf7c0cf3bf7b52ef0f1b686f4c451d79a2c4558e"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "task-discovery-checks"
                  description: "Task remains discoverable from base and owner checkout; missing projection and ambiguous owners are explicit; listing does not mutate canonical task state."
                  id: "task-discovery-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 100000
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
                  - "packages/agentplane/src/commands/task/list.ts"
                  - "packages/agentplane/src/commands/shared/task-backend.ts"
                symbol_hints: []
              depends_on:
                - "canonical-plan-routing"
              expected_outputs:
                - "task-discovery-result"
              id: "task-discovery"
              objective: "AP-09: Reproduce missing or malformed base README when a task has authoritative worktree identity. Reuse owner and worktree resolution to retain discoverability and report missing projection. Do not pick an arbitrary duplicate branch or repair task artifacts during listing."
              optional: false
              priority: 97
              required_inputs:
                - "canonical-plan-routing-result"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "arkady-compatibility-repair"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends"
                - "packages/agentplane/src/runtime/task-routing"
                - "packages/agentplane/src/runner/usecases"
                - "packages/agentplane/src/cli"
                - "packages/core/src/tasks"
                - "packages/core/src/runner"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "task-discovery-checks"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "task-discovery-checks"
                    description: "Task remains discoverable from base and owner checkout; missing projection and ambiguous owners are explicit; listing does not mutate canonical task state."
                    id: "task-discovery-acceptance"
                    required: true
                evidence_fingerprint: "sha256:b8e5ff25a15d76cb3a35f6e1cf7c0cf3bf7b52ef0f1b686f4c451d79a2c4558e"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "remaining-integrity-qualification-checks"
                  description: "Revision/evidence preservation and concurrency checks pass; scoped grant allows only its intended effect and resource while production or expanded scope is denied; non-reproduced cases are reported honestly."
                  id: "remaining-integrity-qualification-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 100000
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-projection.ts"
                  - "packages/agentplane/src/commands/task/update.ts"
                  - "packages/agentplane/src/runtime/task-routing/resolve.ts"
                  - "packages/core/src/tasks/plan-execution-grant.ts"
                symbol_hints: []
              depends_on:
                - "task-discovery"
              expected_outputs:
                - "remaining-integrity-qualification-result"
              id: "remaining-integrity-qualification"
              objective: "AP-01 and AP-08: Use isolated local fixtures to reproduce revision 10/7, replace-verify and concurrent writes, and approval-to-effective-contract propagation for scoped disposable deploy. Fix only a proven first diverging writer or grant propagation defect using existing CAS and authority primitives. Do not invent authority from plan prose or perform actual deployment. If a supported recovery API requires a material design decision, return that concrete decision instead of silently expanding the public API. Preserve AP-03 and AP-07 regressions."
              optional: false
              priority: 96
              required_inputs:
                - "task-discovery-result"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "arkady-compatibility-repair"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends"
                - "packages/agentplane/src/runtime/task-routing"
                - "packages/agentplane/src/runner/usecases"
                - "packages/agentplane/src/cli"
                - "packages/core/src/tasks"
                - "packages/core/src/runner"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "remaining-integrity-qualification-checks"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "remaining-integrity-qualification-checks"
                    description: "Revision/evidence preservation and concurrency checks pass; scoped grant allows only its intended effect and resource while production or expanded scope is denied; non-reproduced cases are reported honestly."
                    id: "remaining-integrity-qualification-acceptance"
                    required: true
                evidence_fingerprint: "sha256:b8e5ff25a15d76cb3a35f6e1cf7c0cf3bf7b52ef0f1b686f4c451d79a2c4558e"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609071111-Y0Z0VQ"
    event_cursor: 9
    final_validation: null
    id: "202609071111-Y0Z0VQ"
    intent:
      acceptance_criteria: []
      captured_at: "2026-09-07T11:11:12.756Z"
      constraints: []
      request: |-
        Repair confirmed Arkady Factory compatibility lifecycle defects sequentially

        Recheck current code against the Arkady Factory audit. Fix AP-02 premature closeout first, then AP-04 existing-result acceptance with AP-05 strict WorkItem result binding, AP-06 stale legacy plan routing, and AP-09 missing README discovery. Reproduce AP-01 revision divergence and AP-08 scoped deploy authority before changing them. Preserve existing AP-03 and AP-07 fixes. Add focused behavioral regressions for each confirmed defect. Do not modify Factory, fabricate product diffs, weaken verification, or publish externally. User requested sequential verification and fixes in the current conversation.
      task_id: "202609071111-Y0Z0VQ"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 13
    schema_version: 1
    updated_at: "2026-09-07T12:13:41.753Z"
    work_items:
      canonical-plan-routing:
        attempt: 0
        claim_id: null
        id: "canonical-plan-routing"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      completion-route:
        attempt: 1
        claim_id: null
        id: "completion-route"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:fee535d40c6402d88f0a5bd1f59ec0319c259a02055a422841095fb42dc318ae"
            id: "completion-route-result"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609071111-Y0Z0VQ"
              work_item_id: "completion-route"
            provenance:
              - "sha256:54575f8ed2609820994f35a9d5b0f6cd2b4f886395eaa17ec68000e4aed29e0f"
              - ".agentplane/tasks/202609071111-Y0Z0VQ/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5b095cd7ab07853e9c6260df17d7f0b161a0991e1889fefbb0271cfff826e6d6"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609071111-Y0Z0VQ/supervision/declared-checks.json"
              check_id: "completion-route-checks"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-07T11:25:21.892Z"
              repository_snapshot_digest: "sha256:5b095cd7ab07853e9c6260df17d7f0b161a0991e1889fefbb0271cfff826e6d6"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      existing-result:
        attempt: 1
        claim_id: null
        id: "existing-result"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:83361ed45ad6a56091a2780d22bb46e78a4923866a2f72e40dd5ba47c6379022"
            id: "existing-result-result"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609071111-Y0Z0VQ"
              work_item_id: "existing-result"
            provenance:
              - "sha256:d1814eb7a2e1c6708ff0145058f0566e9c809ba1eef5f85ddb8647aec200ba24"
              - ".agentplane/tasks/202609071111-Y0Z0VQ/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:25dcf880d4b16f5edefbef532e2957e4250ff9958e5a0625e1cc927ca993b9bc"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609071111-Y0Z0VQ/supervision/declared-checks.json"
              check_id: "existing-result-checks"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-07T11:46:46.381Z"
              repository_snapshot_digest: "sha256:25dcf880d4b16f5edefbef532e2957e4250ff9958e5a0625e1cc927ca993b9bc"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      remaining-integrity-qualification:
        attempt: 0
        claim_id: null
        id: "remaining-integrity-qualification"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      task-discovery:
        attempt: 0
        claim_id: null
        id: "task-discovery"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-07T11:25:21.896Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_88a84ebbf5d1593e21ea74bb"
        mutation_id: "external-result:work-order-202609071111-Y0Z0VQ-executor-d2d9ab823862076bb998ba9d"
        plan_digest: "sha256:f62d6b4243b03500a561eed616f62fa95217e0a869442190a6db42e110af47b7"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609071111-Y0Z0VQ"
        task_revision: 7
        work_item_id: "completion-route"
      -
        at: "2026-09-07T11:46:46.388Z"
        from: "PLANNED"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:573204e95fce56478e9283d62e831e8a789217c89241837a9913389fe85eeadd"
        entity: "work_item"
        id: "event_0d67a0b5f6b4e0481f946411"
        mutation_id: "external-result:work-order-202609071111-Y0Z0VQ-executor-e5f3653dde98a75e137b5e53"
        plan_digest: "sha256:f62d6b4243b03500a561eed616f62fa95217e0a869442190a6db42e110af47b7"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609071111-Y0Z0VQ"
        task_revision: 10
        work_item_id: "existing-result"
    leases: []
    mutation_receipts:
      compatibility:sha256:14390aacaebef441b3f13b3252eb75af222f335db856f7f72d565ba8ecf4c01d:
        aggregate_digest: "sha256:7827e03bb09b8d4d38b55d98cab22cbb801f8fe52c893353ab3e0ce1d3b48abb"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T12:13:41.753Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_8740656b27800c6838621b35"
          mutation_id: "compatibility:sha256:14390aacaebef441b3f13b3252eb75af222f335db856f7f72d565ba8ecf4c01d"
          plan_digest: "sha256:f62d6b4243b03500a561eed616f62fa95217e0a869442190a6db42e110af47b7"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071111-Y0Z0VQ"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:14390aacaebef441b3f13b3252eb75af222f335db856f7f72d565ba8ecf4c01d"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609071111-Y0Z0VQ"
      compatibility:sha256:46ad79fca94e6fd29950befdefcc4116b65ac17c18928c059243a8cb6465d8e4:
        aggregate_digest: "sha256:e320e7211ddbe7b659df7164d3ad49f7802fa128057298e244ab1f6567dd40fb"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T11:18:58.827Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_496f0cb82191e8b55f1e5467"
          mutation_id: "compatibility:sha256:46ad79fca94e6fd29950befdefcc4116b65ac17c18928c059243a8cb6465d8e4"
          plan_digest: "sha256:f62d6b4243b03500a561eed616f62fa95217e0a869442190a6db42e110af47b7"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071111-Y0Z0VQ"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:46ad79fca94e6fd29950befdefcc4116b65ac17c18928c059243a8cb6465d8e4"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609071111-Y0Z0VQ"
      compatibility:sha256:58f289e66a58e3ddea3c3b84873bf6012716c6c278bb15de7f1a71dc2a0a3ce8:
        aggregate_digest: "sha256:4daff06f2aeb936c1cd35b2af142ac27bf7764f5a75ea0cc8069c53122f589be"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T11:25:20.567Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_278f9635b0ecc048ad461ed0"
          mutation_id: "compatibility:sha256:58f289e66a58e3ddea3c3b84873bf6012716c6c278bb15de7f1a71dc2a0a3ce8"
          plan_digest: "sha256:f62d6b4243b03500a561eed616f62fa95217e0a869442190a6db42e110af47b7"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071111-Y0Z0VQ"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:58f289e66a58e3ddea3c3b84873bf6012716c6c278bb15de7f1a71dc2a0a3ce8"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609071111-Y0Z0VQ"
      compatibility:sha256:80c1ed5776fcdfc2580b5d0852d199646a5e090f215c72dae32575ce8dfd1ed0:
        aggregate_digest: "sha256:bee5565319e77f67e017938a1398e9b392aff8f3955f9711776641014b707ff5"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T11:19:37.534Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_a11338ad922166e5816a57f7"
          mutation_id: "compatibility:sha256:80c1ed5776fcdfc2580b5d0852d199646a5e090f215c72dae32575ce8dfd1ed0"
          plan_digest: "sha256:f62d6b4243b03500a561eed616f62fa95217e0a869442190a6db42e110af47b7"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071111-Y0Z0VQ"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:80c1ed5776fcdfc2580b5d0852d199646a5e090f215c72dae32575ce8dfd1ed0"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609071111-Y0Z0VQ"
      compatibility:sha256:8b7cba8fe97a2e021f102965d3a3823e896eddfc6b5f2e7175e1632e5bd265dc:
        aggregate_digest: "sha256:d3f239daf4c4b7b4e9b5ad344416e462373aacc7b909baf5102297b02ac3988f"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T11:25:20.567Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_d1200577634cb5515d774509"
          mutation_id: "compatibility:sha256:8b7cba8fe97a2e021f102965d3a3823e896eddfc6b5f2e7175e1632e5bd265dc"
          plan_digest: "sha256:f62d6b4243b03500a561eed616f62fa95217e0a869442190a6db42e110af47b7"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071111-Y0Z0VQ"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:8b7cba8fe97a2e021f102965d3a3823e896eddfc6b5f2e7175e1632e5bd265dc"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609071111-Y0Z0VQ"
      compatibility:sha256:cfd717d596847bab6e2cb9810c181347f332ec599399527d7cc799a65e5d06ac:
        aggregate_digest: "sha256:9b66b11e1c8ae9618597f4ea440542933ea660d940317115398369c550842640"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T12:13:41.753Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3704901c6f3422c1f615d2a5"
          mutation_id: "compatibility:sha256:cfd717d596847bab6e2cb9810c181347f332ec599399527d7cc799a65e5d06ac"
          plan_digest: "sha256:f62d6b4243b03500a561eed616f62fa95217e0a869442190a6db42e110af47b7"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071111-Y0Z0VQ"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:cfd717d596847bab6e2cb9810c181347f332ec599399527d7cc799a65e5d06ac"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609071111-Y0Z0VQ"
      compatibility:sha256:d23cd0b03edfddaa52a34ca0122b5b84c710d5fc13dce0af7dd551c598660ddc:
        aggregate_digest: "sha256:07c6bea5a8f0ead7ceb32f64343d898d69f06971ab7d4eddfa35790747bc0acd"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T11:46:44.101Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c0cead9c4c4e65e7ee361356"
          mutation_id: "compatibility:sha256:d23cd0b03edfddaa52a34ca0122b5b84c710d5fc13dce0af7dd551c598660ddc"
          plan_digest: "sha256:f62d6b4243b03500a561eed616f62fa95217e0a869442190a6db42e110af47b7"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071111-Y0Z0VQ"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d23cd0b03edfddaa52a34ca0122b5b84c710d5fc13dce0af7dd551c598660ddc"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609071111-Y0Z0VQ"
      compatibility:sha256:dfea1a613e31af37139706ce20fb87c4091fe3313d263054d1354bef61c04564:
        aggregate_digest: "sha256:a5c0af98e1414f1b293a6f60a78b486699bf7d606652d696113eef17e6dd3f5f"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T11:46:44.101Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_03ca71335e963c695e7c4a45"
          mutation_id: "compatibility:sha256:dfea1a613e31af37139706ce20fb87c4091fe3313d263054d1354bef61c04564"
          plan_digest: "sha256:f62d6b4243b03500a561eed616f62fa95217e0a869442190a6db42e110af47b7"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071111-Y0Z0VQ"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:dfea1a613e31af37139706ce20fb87c4091fe3313d263054d1354bef61c04564"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609071111-Y0Z0VQ"
      compatibility:sha256:e47c46c5249241f7b00585c94f1470341874f9607917e2793c7f22c6ffbcf5f9:
        aggregate_digest: "sha256:1b38b4cc788d9d5c52a9a8e390de8a651312d60f40db4ec8c1c9356f4aa84296"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T11:18:58.826Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_ba22aa63c3e8e541d9cbf413"
          mutation_id: "compatibility:sha256:e47c46c5249241f7b00585c94f1470341874f9607917e2793c7f22c6ffbcf5f9"
          plan_digest: "sha256:f62d6b4243b03500a561eed616f62fa95217e0a869442190a6db42e110af47b7"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071111-Y0Z0VQ"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:e47c46c5249241f7b00585c94f1470341874f9607917e2793c7f22c6ffbcf5f9"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609071111-Y0Z0VQ"
      external-result:work-order-202609071111-Y0Z0VQ-executor-d2d9ab823862076bb998ba9d:
        aggregate_digest: "sha256:21f68a466d81606a3e36ea9d1246cc0ee9479af064eb8e1bdf1ed82706aef0f5"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T11:25:21.896Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_88a84ebbf5d1593e21ea74bb"
          mutation_id: "external-result:work-order-202609071111-Y0Z0VQ-executor-d2d9ab823862076bb998ba9d"
          plan_digest: "sha256:f62d6b4243b03500a561eed616f62fa95217e0a869442190a6db42e110af47b7"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071111-Y0Z0VQ"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "completion-route"
        mutation_id: "external-result:work-order-202609071111-Y0Z0VQ-executor-d2d9ab823862076bb998ba9d"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609071111-Y0Z0VQ"
      external-result:work-order-202609071111-Y0Z0VQ-executor-e5f3653dde98a75e137b5e53:
        aggregate_digest: "sha256:91c5f58ef77d4f47526b52cfe3bdc0b43586333e6b3766360ae8ed41b4d0942d"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T11:46:46.388Z"
          cause_refs:
            - "semantic-result:sha256:573204e95fce56478e9283d62e831e8a789217c89241837a9913389fe85eeadd"
          entity: "work_item"
          from: "PLANNED"
          id: "event_0d67a0b5f6b4e0481f946411"
          mutation_id: "external-result:work-order-202609071111-Y0Z0VQ-executor-e5f3653dde98a75e137b5e53"
          plan_digest: "sha256:f62d6b4243b03500a561eed616f62fa95217e0a869442190a6db42e110af47b7"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071111-Y0Z0VQ"
          task_revision: 10
          to: "COMPLETED"
          work_item_id: "existing-result"
        mutation_id: "external-result:work-order-202609071111-Y0Z0VQ-executor-e5f3653dde98a75e137b5e53"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609071111-Y0Z0VQ"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "02571f0b69dcb3c0adf005c3de7a9f9708ac6237"
  task_execution_context:
    base_ref: "main"
    base_sha: "ca07204eed841a1aa245e3bb8d14832d7ea3ac30"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "ca07204eed841a1aa245e3bb8d14832d7ea3ac30"
    version: 1
id_source: "generated"
---
## Summary

Repair confirmed Arkady Factory compatibility lifecycle defects sequentially

Recheck current code against the Arkady Factory audit. Fix AP-02 premature closeout first, then AP-04 existing-result acceptance with AP-05 strict WorkItem result binding, AP-06 stale legacy plan routing, and AP-09 missing README discovery. Reproduce AP-01 revision divergence and AP-08 scoped deploy authority before changing them. Preserve existing AP-03 and AP-07 fixes. Add focused behavioral regressions for each confirmed defect. Do not modify Factory, fabricate product diffs, weaken verification, or publish externally. User requested sequential verification and fixes in the current conversation.

## Scope

- In scope: Recheck current code against the Arkady Factory audit. Fix AP-02 premature closeout first, then AP-04 existing-result acceptance with AP-05 strict WorkItem result binding, AP-06 stale legacy plan routing, and AP-09 missing README discovery. Reproduce AP-01 revision divergence and AP-08 scoped deploy authority before changing them. Preserve existing AP-03 and AP-07 fixes. Add focused behavioral regressions for each confirmed defect. Do not modify Factory, fabricate product diffs, weaken verification, or publish externally. User requested sequential verification and fixes in the current conversation.
- Out of scope: unrelated refactors not required for "Repair confirmed Arkady Factory compatibility lifecycle defects sequentially".

## Plan

Goal: Repair current AgentPlane defects from the Arkady Factory audit in one task with one active WorkItem at a time.

Sequence: completion-route -> existing-result -> canonical-plan-routing -> task-discovery -> remaining-integrity-qualification.
1. AP-02: Add a regression for required READY WorkItems with attempt=0 and successful legacy evidence. Correct route selection before closeout. Preserve finish validation.
2. AP-04/AP-05: Reproduce zero-delta and identity failures. Implement exact WorkItem result binding and safe acceptance of an existing implementation with current supervisor evidence. Preserve replay safety and reject stale or ambiguous results.
3. AP-06: Make an accepted canonical plan authoritative over stale legacy planning text without bypassing genuine material replanning.
4. AP-09: Keep tasks discoverable when local README is absent using authoritative identity and existing checkout resolution. Report ambiguity without arbitrary branch selection or hidden repair.
5. AP-01/AP-08: Reproduce revision divergence and scoped external-effect approval propagation on isolated fixtures. Fix only confirmed defects through existing atomic write and grant mechanisms. Preserve AP-03/AP-07 protections.

Verification: For each WorkItem, first run the nearest existing regression suite with the new failing behavioral case, then implement the smallest correction and rerun it. Use bunx --no-install vitest --config vitest.workspace.ts run with project agentplane for command/backend tests, core for core tests, and cli-core for run-cli.core tests. Run bun run typecheck, targeted ESLint and Prettier checks on changed files, and git diff --check. Run bun run ci:local:full after all implementation WorkItems. Return exact observed results through each semantic result; AgentPlane owns verification persistence.

Scope: Only the listed source roots and their adjacent tests. No Factory mutations, unrelated cleanup, schema proliferation, fabricated implementation delta, weakened checks, manual task/projection/receipt repair, or real external deployment. Local edits and isolated tests are authorized by the user. External publication and formal approval remain explicit boundaries. Stop on unresolved authority, material public recovery API design, or evidence incompatible with the current plan. Rollback: revert only the task implementation changes through the supported lifecycle.

Completion evidence: Each confirmed defect has a behavior regression and passing relevant checks. Record non-reproduced claims as qualification limits. Review the final diff and tracked state. Do not claim historical Factory end-to-end recovery without running its supported isolated equivalent.

## Verify Steps

1. For each WorkItem, reproduce its defect in the nearest existing behavioral test before implementation. Run bunx --no-install vitest --config vitest.workspace.ts run with project agentplane for command/backend tests, core for core tests, and cli-core for run-cli.core tests. Expected: the regression fails before the correction and passes afterwards.
2. Run bun run typecheck, targeted ESLint and Prettier checks on changed files, and git diff --check. Expected: all pass.
3. After all implementation WorkItems, run bun run ci:local:full. Expected: all required checks pass.
4. Verify stale result rejection, exact replay, unchanged implementation acceptance, canonical plan routing, missing projection discovery, revision integrity, and scoped authority using isolated fixtures. Do not execute actual external deployment.
5. Review the final diff and git status --short --untracked-files=all. Report non-reproduced historical claims and unverified Factory runtime behavior explicitly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
