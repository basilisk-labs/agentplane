---
id: "202608292218-3N0FBK"
title: "Prevent branch closeout while required WorkItems are incomplete"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "bootstrap-fix"
  - "task-centric"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run typecheck"
  - "bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-29T22:20:57.877Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:b037ed8bcba319902da153a6f28fe604e3bb18045cbd2721dfce51500a54aa9d"
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
      - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The fix changes central branch route selection and requires an isolated task branch plus hosted integration."
      - "The implementation is bounded to one route guard and its regression test."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
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
          - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
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
      digest: "sha256:daf6326288e611ec78b7593a35f3fe6f5bdd89b4883bf5fa5cfc62e96ca5be03"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/workflow-step-branch.ts"
        - "central_component:packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
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
    at: "2026-08-29T22:21:11.408Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-29T22:21:11.408Z"
doc_updated_by: "CODER"
description: "Fix branch_pr route selection so an approved task with any incomplete required canonical WorkItem returns to the bounded EXECUTOR WorkItem episode before verification, quality review, PR publication, or pre-merge closure. Add a regression test for a task that has stale verification, quality review, and commit evidence while a required WorkItem remains READY or PLANNED."
sections:
  Summary: |-
    Prevent branch closeout while required WorkItems are incomplete

    Fix branch_pr route selection so an approved task with any incomplete required canonical WorkItem returns to the bounded EXECUTOR WorkItem episode before verification, quality review, PR publication, or pre-merge closure. Add a regression test for a task that has stale verification, quality review, and commit evidence while a required WorkItem remains READY or PLANNED.
  Scope: |-
    - In scope: Fix branch_pr route selection so an approved task with any incomplete required canonical WorkItem returns to the bounded EXECUTOR WorkItem episode before verification, quality review, PR publication, or pre-merge closure. Add a regression test for a task that has stale verification, quality review, and commit evidence while a required WorkItem remains READY or PLANNED.
    - Out of scope: unrelated refactors not required for "Prevent branch closeout while required WorkItems are incomplete".
  Plan: "Prepared one bounded bootstrap WorkItem that restores canonical WorkItem precedence in branch_pr routing and adds a focused regression without broad route-engine refactoring."
  Verify Steps: |-
    PLANNER fallback scaffold for "Prevent branch closeout while required WorkItems are incomplete". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Prevent branch closeout while required WorkItems are incomplete". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    actor: "HOST:codex:USER"
    approval_evidence_digest: "sha256:b037ed8bcba319902da153a6f28fe604e3bb18045cbd2721dfce51500a54aa9d"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:70ed6a11c4681e24a4423891c598b9f46ebf72a1a07145d8c63e59fbfd65821c"
    grant_id: "c4583a2b-5b71-4f40-9a51-e499894daa82"
    issued_at: "2026-08-29T22:20:57.877Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:85fc9139210591bb1523b82327491413cf0ef79ca0ae8ae7cf0123dfc8134f5f"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608292218-3N0FBK"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-29T22:20:57.877Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:9803e91caef2d673b2ab7e7450e2618a323f73f1dd4c9db76a62914b9cbb6f22"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-08-29T22:20:23.712Z"
      digest: "sha256:9803e91caef2d673b2ab7e7450e2618a323f73f1dd4c9db76a62914b9cbb6f22"
      proposal:
        assumptions:
          - "Canonical WorkItem state in task extensions is the authority for whether semantic implementation remains outstanding."
          - "Existing downstream routing remains correct once every required WorkItem is COMPLETED or CANCELLED only when optional."
        planning_baseline:
          captured_at: "2026-08-29T22:18:58.538Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:186965e48140c0c5f8d11feaedce897b99f6937b21d293b831079c2a39f959d0"
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
            - ".agentplane/tasks/202608291005-33PHG4/README.md"
            - ".agentplane/tasks/202608291006-255K66/README.md"
            - ".agentplane/tasks/202608291006-2A6BJC/README.md"
            - ".agentplane/tasks/202608292218-3N0FBK/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "dbaf4bc2878eab7b50f8ea6d14179d8d91030159"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608292218-3N0FBK"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
              id: "check-route-regression"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "check-typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
          criteria:
            -
              check_ids:
                - "check-route-regression"
              description: "A branch_pr task with any incomplete required canonical WorkItem routes to a bounded EXECUTOR implementation episode even when commit, verification, and quality evidence exist."
              id: "criterion-route-priority"
              required: true
            -
              check_ids:
                - "check-route-regression"
              description: "Completed WorkItem tasks retain the existing verification, quality, PR, and pre-merge closure sequence."
              id: "criterion-no-closeout-regression"
              required: true
            -
              check_ids:
                - "check-typecheck"
              description: "The route selection change passes repository type checking."
              id: "criterion-types"
              required: true
          evidence_fingerprint: "sha256:7b2cc70b24d92bd87935143e4abf377e8f495e07d3e3c23960fb27546048aeaa"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-route-regression"
                  description: "A branch_pr task with any incomplete required canonical WorkItem routes to a bounded EXECUTOR implementation episode even when commit, verification, and quality evidence exist."
                  id: "criterion-route-priority"
                  required: true
                -
                  check_ids:
                    - "check-route-regression"
                  description: "Completed WorkItem tasks retain the existing verification, quality, PR, and pre-merge closure sequence."
                  id: "criterion-no-closeout-regression"
                  required: true
                -
                  check_ids:
                    - "check-typecheck"
                  description: "The route selection change passes repository type checking."
                  id: "criterion-types"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 160000
                optional_sources:
                  - "packages/agentplane/src/commands/task/finish-shared.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
                  - "packages/core/src/tasks/task-centric/model.ts"
                symbol_hints:
                  - "branchStep"
                  - "branchImplementationStep"
                  - "taskCentricAggregateFromExtensions"
              depends_on: []
              expected_outputs:
                - "branch-route-priority-fix"
                - "incomplete-workitem-regression-evidence"
              id: "prioritize-incomplete-required-work-items"
              objective: "Make branch_pr route selection return to the canonical WorkItem EXECUTOR episode before downstream verification, quality, PR, or closeout steps whenever a required WorkItem is incomplete."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                    id: "check-route-regression"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "check-typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "check-route-regression"
                    description: "A branch_pr task with any incomplete required canonical WorkItem routes to a bounded EXECUTOR implementation episode even when commit, verification, and quality evidence exist."
                    id: "criterion-route-priority"
                    required: true
                  -
                    check_ids:
                      - "check-route-regression"
                    description: "Completed WorkItem tasks retain the existing verification, quality, PR, and pre-merge closure sequence."
                    id: "criterion-no-closeout-regression"
                    required: true
                  -
                    check_ids:
                      - "check-typecheck"
                    description: "The route selection change passes repository type checking."
                    id: "criterion-types"
                    required: true
                evidence_fingerprint: "sha256:7b2cc70b24d92bd87935143e4abf377e8f495e07d3e3c23960fb27546048aeaa"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608292218-3N0FBK"
    event_cursor: 0
    final_validation: null
    id: "202608292218-3N0FBK"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-29T22:18:51.327Z"
      constraints: []
      request: |-
        Prevent branch closeout while required WorkItems are incomplete

        Fix branch_pr route selection so an approved task with any incomplete required canonical WorkItem returns to the bounded EXECUTOR WorkItem episode before verification, quality review, PR publication, or pre-merge closure. Add a regression test for a task that has stale verification, quality review, and commit evidence while a required WorkItem remains READY or PLANNED.
      task_id: "202608292218-3N0FBK"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-29T22:20:57.877Z"
    work_items:
      prioritize-incomplete-required-work-items:
        attempt: 0
        claim_id: null
        id: "prioritize-incomplete-required-work-items"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "dbaf4bc2878eab7b50f8ea6d14179d8d91030159"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "dbaf4bc2878eab7b50f8ea6d14179d8d91030159"
    version: 1
id_source: "generated"
---
## Summary

Prevent branch closeout while required WorkItems are incomplete

Fix branch_pr route selection so an approved task with any incomplete required canonical WorkItem returns to the bounded EXECUTOR WorkItem episode before verification, quality review, PR publication, or pre-merge closure. Add a regression test for a task that has stale verification, quality review, and commit evidence while a required WorkItem remains READY or PLANNED.

## Scope

- In scope: Fix branch_pr route selection so an approved task with any incomplete required canonical WorkItem returns to the bounded EXECUTOR WorkItem episode before verification, quality review, PR publication, or pre-merge closure. Add a regression test for a task that has stale verification, quality review, and commit evidence while a required WorkItem remains READY or PLANNED.
- Out of scope: unrelated refactors not required for "Prevent branch closeout while required WorkItems are incomplete".

## Plan

Prepared one bounded bootstrap WorkItem that restores canonical WorkItem precedence in branch_pr routing and adds a focused regression without broad route-engine refactoring.

## Verify Steps

PLANNER fallback scaffold for "Prevent branch closeout while required WorkItems are incomplete". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Prevent branch closeout while required WorkItems are incomplete". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
