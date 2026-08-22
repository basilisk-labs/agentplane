---
id: "202608222129-K0TGS4"
title: "Propagate approved scope extension into task-centric WorkItem plan"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "regression"
  - "task-centric"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "quality.regression"
verify:
  - "bun run lint:core"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/task/scope-extend.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-22T21:31:17.573Z"
  updated_by: "USER"
  note: "Approved under autonomous regression-fix and v0.7.8 release authorization; exact plan digest sha256:351e69e3ef67b67702ce9037394f34a08eeeb6a8dfbf1e5e1aaa30e6ea8c6636."
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
      - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The failure is reproduced through a structured WorkItem and exact scope approval."
      - "The fix is isolated to scope-extension state transformation and its unit tests."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
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
          - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
          - "packages/agentplane/src/commands/task/scope-extend.test.ts"
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
      digest: "sha256:442c641816443d9417bdd093c2a3dc3a122182030460ca47faf089fc819a44ab"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
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
    at: "2026-08-22T21:31:27.184Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-22T21:31:27.184Z"
doc_updated_by: "CODER"
description: "Repair the proven task-centric regression where task scope extend updates the legacy execution contract but the next executor work order still uses the old current_plan WorkItem scope_roots. On exact state-bound USER approval, create and approve a new TaskPlanRevision that monotonically extends only the uniquely selected WorkItem scope, preserves all other WorkItems and runtime state, archives the prior revision, and leaves production behavior unchanged otherwise. Add focused unit coverage. Do not redesign planning, authority, context, release, or Knowledge Assimilation."
sections:
  Summary: |-
    Propagate approved scope extension into task-centric WorkItem plan

    Repair the proven task-centric regression where task scope extend updates the legacy execution contract but the next executor work order still uses the old current_plan WorkItem scope_roots. On exact state-bound USER approval, create and approve a new TaskPlanRevision that monotonically extends only the uniquely selected WorkItem scope, preserves all other WorkItems and runtime state, archives the prior revision, and leaves production behavior unchanged otherwise. Add focused unit coverage. Do not redesign planning, authority, context, release, or Knowledge Assimilation.
  Scope: |-
    - In scope: Repair the proven task-centric regression where task scope extend updates the legacy execution contract but the next executor work order still uses the old current_plan WorkItem scope_roots. On exact state-bound USER approval, create and approve a new TaskPlanRevision that monotonically extends only the uniquely selected WorkItem scope, preserves all other WorkItems and runtime state, archives the prior revision, and leaves production behavior unchanged otherwise. Add focused unit coverage. Do not redesign planning, authority, context, release, or Knowledge Assimilation.
    - Out of scope: unrelated refactors not required for "Propagate approved scope extension into task-centric WorkItem plan".
  Plan: "Create an exact USER-approved task-centric plan revision for the uniquely selected WorkItem when applying a blocked-result scope extension."
  Verify Steps: |-
    PLANNER fallback scaffold for "Propagate approved scope extension into task-centric WorkItem plan". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Propagate approved scope extension into task-centric WorkItem plan". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    digest: "sha256:df9eb76e1be33d9d05223fb17ce488ae5cadfee17ef217254cde0dd3e5ec635a"
    grant_id: "b8074c6d-564d-4d77-ac4d-3659649cdc09"
    issued_at: "2026-08-22T21:31:17.573Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:128db90defa6f336ff659e339351bcb694df72de5ef8954feb18dad2caea0b3e"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608222129-K0TGS4"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-22T21:31:17.573Z"
        approved_by: "USER"
        approved_digest: "sha256:351e69e3ef67b67702ce9037394f34a08eeeb6a8dfbf1e5e1aaa30e6ea8c6636"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-22T21:31:01.399Z"
      digest: "sha256:351e69e3ef67b67702ce9037394f34a08eeeb6a8dfbf1e5e1aaa30e6ea8c6636"
      proposal:
        assumptions:
          - "A scope-extension blocker leaves exactly one WorkItem schedulable for the retry; ambiguity must fail closed."
        planning_baseline:
          captured_at: "2026-08-22T21:29:59.820Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:4f20c075c4eca13d0727f144702525b635f68b3c419459d7632a7585d3a2ddbd"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608222129-K0TGS4/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608222129-K0TGS4"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/commands/task/scope-extend.test.ts"
              id: "check-focused"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run lint:core"
              id: "check-lint"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "check-typecheck"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "check-focused"
                - "check-lint"
                - "check-typecheck"
              description: "Focused scope-extension tests, lint, and typecheck pass."
              id: "criterion-regression-fixed"
              required: true
          evidence_fingerprint: "sha256:e14342a53b4a71b2d76e7a6dcacbed2a844c57658d531ce503de7cd52258a31d"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-scope-plan"
                  description: "A unique selected WorkItem receives the added roots in a newly digested and USER-approved plan revision while every other WorkItem and runtime entry is preserved."
                  id: "criterion-targeted-revision"
                  required: true
                -
                  check_ids:
                    - "check-scope-plan"
                  description: "Tasks without a task-centric aggregate retain the existing scope-extension behavior."
                  id: "criterion-legacy-preserved"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 131072
                optional_sources:
                  - "packages/core/src/tasks/task-centric/graph.ts"
                  - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
                required_sources:
                  - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                  - "packages/agentplane/src/commands/task/scope-extend.test.ts"
                symbol_hints:
                  - "applyApprovedTaskScopeExtension"
                  - "createTaskPlanRevision"
                  - "approveTaskPlan"
                  - "WorkItemScheduler"
              depends_on: []
              expected_outputs:
                - "task-centric-scope-extension-plan-revision"
              id: "propagate-scope-to-workitem-plan"
              objective: "On exact scope-extension approval, extend only the uniquely schedulable WorkItem in a new approved TaskPlanRevision and preserve aggregate runtime plus prior plan history."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/scope-extend.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                - "packages/agentplane/src/commands/task/scope-extend.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/task/scope-extend.test.ts"
                    id: "check-scope-plan"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "check-scope-plan"
                    description: "A unique selected WorkItem receives the added roots in a newly digested and USER-approved plan revision while every other WorkItem and runtime entry is preserved."
                    id: "criterion-targeted-revision"
                    required: true
                  -
                    check_ids:
                      - "check-scope-plan"
                    description: "Tasks without a task-centric aggregate retain the existing scope-extension behavior."
                    id: "criterion-legacy-preserved"
                    required: true
                evidence_fingerprint: "sha256:5847c997fe42620d217e82a7e76b8bf050a03283e6221d04502b2848196e7610"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608222129-K0TGS4"
    event_cursor: 0
    final_validation: null
    id: "202608222129-K0TGS4"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run lint:core"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bunx vitest run packages/agentplane/src/commands/task/scope-extend.test.ts"
          id: "legacy-3"
          required: true
      captured_at: "2026-08-22T21:29:52.149Z"
      constraints: []
      request: |-
        Propagate approved scope extension into task-centric WorkItem plan

        Repair the proven task-centric regression where task scope extend updates the legacy execution contract but the next executor work order still uses the old current_plan WorkItem scope_roots. On exact state-bound USER approval, create and approve a new TaskPlanRevision that monotonically extends only the uniquely selected WorkItem scope, preserves all other WorkItems and runtime state, archives the prior revision, and leaves production behavior unchanged otherwise. Add focused unit coverage. Do not redesign planning, authority, context, release, or Knowledge Assimilation.
      task_id: "202608222129-K0TGS4"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-22T21:31:17.573Z"
    work_items:
      propagate-scope-to-workitem-plan:
        attempt: 0
        claim_id: null
        id: "propagate-scope-to-workitem-plan"
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
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
    version: 1
id_source: "generated"
---
## Summary

Propagate approved scope extension into task-centric WorkItem plan

Repair the proven task-centric regression where task scope extend updates the legacy execution contract but the next executor work order still uses the old current_plan WorkItem scope_roots. On exact state-bound USER approval, create and approve a new TaskPlanRevision that monotonically extends only the uniquely selected WorkItem scope, preserves all other WorkItems and runtime state, archives the prior revision, and leaves production behavior unchanged otherwise. Add focused unit coverage. Do not redesign planning, authority, context, release, or Knowledge Assimilation.

## Scope

- In scope: Repair the proven task-centric regression where task scope extend updates the legacy execution contract but the next executor work order still uses the old current_plan WorkItem scope_roots. On exact state-bound USER approval, create and approve a new TaskPlanRevision that monotonically extends only the uniquely selected WorkItem scope, preserves all other WorkItems and runtime state, archives the prior revision, and leaves production behavior unchanged otherwise. Add focused unit coverage. Do not redesign planning, authority, context, release, or Knowledge Assimilation.
- Out of scope: unrelated refactors not required for "Propagate approved scope extension into task-centric WorkItem plan".

## Plan

Create an exact USER-approved task-centric plan revision for the uniquely selected WorkItem when applying a blocked-result scope extension.

## Verify Steps

PLANNER fallback scaffold for "Propagate approved scope extension into task-centric WorkItem plan". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Propagate approved scope extension into task-centric WorkItem plan". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
