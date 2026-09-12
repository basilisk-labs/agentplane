---
id: "202609120744-G5Q9V0"
title: "Fail fast on incomplete ops task intent"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "ops-intent"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "pnpm --filter agentplane test -- run-cli.core.route-decision.test.ts"
  - "pnpm --filter agentplane test -- run-cli.core.tasks.create.test.ts"
  - "pnpm --filter agentplane typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-09-12T07:48:31.808Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:2739a30261ee4b7fc5e8153314187987bd4644c0fc163bfe83ec7f0f14780fa3"
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
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
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots: []
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
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:5cce438a0252ecd96091bc582c42af2d777ee0f2a627b7930089252831afd436"
      escalation_reasons: []
      execution_groups:
        - "core"
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
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-09-12T07:48:41.721Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-09-12T07:48:41.721Z"
doc_updated_by: "CODER"
description: "Make task new reject or materialize incomplete controlled ops intent before lifecycle approval, and expose structured intent fields in task brief so downstream host-operation guards are not the first failure point."
sections:
  Summary: |-
    Fail fast on incomplete ops task intent

    Make task new reject or materialize incomplete controlled ops intent before lifecycle approval, and expose structured intent fields in task brief so downstream host-operation guards are not the first failure point.
  Scope: |-
    - In scope: Make task new reject or materialize incomplete controlled ops intent before lifecycle approval, and expose structured intent fields in task brief so downstream host-operation guards are not the first failure point.
    - Out of scope: unrelated refactors not required for "Fail fast on incomplete ops task intent".
  Plan: "Implement early controlled-ops intent validation and expose the structured intent in task brief."
  Verify Steps: |-
    1. Run `pnpm --filter agentplane test -- run-cli.core.tasks.create.test.ts`. Expected: complete controlled ops intent is persisted and incomplete ops intent fails before task creation.
    2. Run `pnpm --filter agentplane test -- run-cli.core.route-decision.test.ts`. Expected: task brief exposes task_kind, mutation_scope, risk_flags, blueprint_request, and resolved blueprint_id.
    3. Run `pnpm --filter agentplane typecheck`. Expected: type checking passes.
    4. Inspect `git diff --check` and the final diff. Expected: only task-scoped source and test changes exist.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:2739a30261ee4b7fc5e8153314187987bd4644c0fc163bfe83ec7f0f14780fa3"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:fba971ef6a121384c40c5fc93d8592325723d6d58911d7f1df7633db663de72c"
    digest: "sha256:eb8eec37a6662dd5d84a0b3f90ab4fb665b45d1f014fcb8e2680236d951f87a7"
    grant_id: "7d14bc74-43af-4598-97d6-404629965c2c"
    issued_at: "2026-09-12T07:48:31.808Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:98923d15d05add36f3736bc7590302dac54e4947904b1de94c0b9786eb2af386"
    plan_revision: 3
    repository_identity: "sha256:4d4f122365e3b382519a58a42f4021d908a09e93d8b2a5709639f1843429d339"
    schema_version: 1
    scope_digest: "sha256:f2597e379e84d7b1cabc5d1fe65f4cdc98cc2387e3b61c1b60d7ce1c79cf0131"
    status: "active"
    task_id: "202609120744-G5Q9V0"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-12T07:48:31.808Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:545c3e90e67cd00c8e9e3b6ee8fcf7ced55e80a8e5f70b8575b2cc25aa5494e6"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-12T07:47:21.923Z"
      digest: "sha256:545c3e90e67cd00c8e9e3b6ee8fcf7ced55e80a8e5f70b8575b2cc25aa5494e6"
      proposal:
        assumptions:
          - "A controlled ops task must explicitly declare external_system risk because generic ops work is not always an external mutation."
        planning_baseline:
          captured_at: "2026-09-12T07:45:00.745Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:a8bfe1ec10640f536d746967ea409c7f6f664c6709f727ef1406fb684b4f6d25"
          dirty_paths:
            - ".agentplane/tasks/202609091457-5N53HA/README.md"
            - ".agentplane/tasks/202609120744-G5Q9V0/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "f774282d4a6ef8ce7da5bc08c8e2fd9abb99303d"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609120744-G5Q9V0"
        top_level_validation:
          checks: []
          criteria: []
          evidence_fingerprint: "sha256:a8bfe1ec10640f536d746967ea409c7f6f664c6709f727ef1406fb684b4f6d25"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "create-tests"
                  description: "task new rejects incomplete ops.approval intent before any task artifact is written, while a complete controlled ops declaration remains accepted."
                  id: "ops-intent-create"
                  required: true
                -
                  check_ids:
                    - "brief-tests"
                  description: "task brief prints task_kind, mutation_scope, risk_flags, blueprint_request, and the resolved blueprint."
                  id: "ops-intent-brief"
                  required: true
                -
                  check_ids:
                    - "create-tests"
                    - "typecheck"
                  description: "Non-ops task creation behavior and TypeScript type safety remain intact."
                  id: "compatibility"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 200000
                optional_sources:
                  - "packages/agentplane/src/commands/task/create.command.ts"
                  - "packages/agentplane/src/commands/blueprint/task-input.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/new.ts"
                  - "packages/agentplane/src/commands/task/brief-render.ts"
                symbol_hints:
                  - "sanitizeTaskNewParsed"
                  - "runTaskNewParsed"
                  - "reportTaskBriefText"
              depends_on: []
              expected_outputs:
                - "ops-intent-validation"
                - "structured-task-brief"
                - "focused-regressions"
              id: "implement-ops-intent-gate"
              objective: "Validate controlled ops intent before task creation, render the structured intent in task brief, and add focused CLI regressions."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "pnpm --filter agentplane test -- run-cli.core.tasks.create.test.ts"
                    id: "create-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "pnpm --filter agentplane test -- run-cli.core.route-decision.test.ts"
                    id: "brief-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "pnpm --filter agentplane typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "create-tests"
                    description: "Validate early ops intent handling."
                    id: "ops-intent-create"
                    required: true
                  -
                    check_ids:
                      - "brief-tests"
                    description: "Validate structured brief output."
                    id: "ops-intent-brief"
                    required: true
                  -
                    check_ids:
                      - "create-tests"
                      - "typecheck"
                    description: "Validate compatibility and type safety."
                    id: "compatibility"
                    required: true
                evidence_fingerprint: "sha256:a8bfe1ec10640f536d746967ea409c7f6f664c6709f727ef1406fb684b4f6d25"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609120744-G5Q9V0"
    event_cursor: 3
    final_validation: null
    id: "202609120744-G5Q9V0"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "pnpm --filter agentplane test -- run-cli.core.route-decision.test.ts"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "pnpm --filter agentplane test -- run-cli.core.tasks.create.test.ts"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "pnpm --filter agentplane typecheck"
          id: "legacy-3"
          required: true
      captured_at: "2026-09-12T07:44:47.830Z"
      constraints: []
      request: |-
        Fail fast on incomplete ops task intent

        Make task new reject or materialize incomplete controlled ops intent before lifecycle approval, and expose structured intent fields in task brief so downstream host-operation guards are not the first failure point.
      task_id: "202609120744-G5Q9V0"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 5
    schema_version: 1
    updated_at: "2026-09-12T07:48:41.721Z"
    work_items:
      implement-ops-intent-gate:
        attempt: 0
        claim_id: null
        id: "implement-ops-intent-gate"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events: []
    leases: []
    mutation_receipts:
      compatibility:sha256:3b7a8bea9f04706b4951b88115cedc5462db8c83d5b9d1c0305304229094bba2:
        aggregate_digest: "sha256:d99d753ebf920288812c3daf784f957276cb3cebf4206689a841a8a486196aa6"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T07:48:41.721Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_52e9509409b84effd59527ae"
          mutation_id: "compatibility:sha256:3b7a8bea9f04706b4951b88115cedc5462db8c83d5b9d1c0305304229094bba2"
          plan_digest: "sha256:545c3e90e67cd00c8e9e3b6ee8fcf7ced55e80a8e5f70b8575b2cc25aa5494e6"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609120744-G5Q9V0"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:3b7a8bea9f04706b4951b88115cedc5462db8c83d5b9d1c0305304229094bba2"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609120744-G5Q9V0"
      compatibility:sha256:c0bbd7e333bae4ac930e22284c14fc32c18528cc70d241af746ae69c0d73ec0e:
        aggregate_digest: "sha256:5cdebef7f323a36c60ffd483fe42b3242e3122e34171aeaf709b8068fa637b85"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T07:48:17.403Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_0cada646609c14c04e652bc6"
          mutation_id: "compatibility:sha256:c0bbd7e333bae4ac930e22284c14fc32c18528cc70d241af746ae69c0d73ec0e"
          plan_digest: "sha256:545c3e90e67cd00c8e9e3b6ee8fcf7ced55e80a8e5f70b8575b2cc25aa5494e6"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609120744-G5Q9V0"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:c0bbd7e333bae4ac930e22284c14fc32c18528cc70d241af746ae69c0d73ec0e"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609120744-G5Q9V0"
      compatibility:sha256:ff5652e317eba93f010773cc08b91f5459f4cddf1390d4ab4b1c3b5770ea0376:
        aggregate_digest: "sha256:8c2d3146d28082b093dc1f492950bfcce25e63173bbc18df1ac093b65599ea08"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T07:48:17.406Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_a23ce304a30c676837f5880b"
          mutation_id: "compatibility:sha256:ff5652e317eba93f010773cc08b91f5459f4cddf1390d4ab4b1c3b5770ea0376"
          plan_digest: "sha256:545c3e90e67cd00c8e9e3b6ee8fcf7ced55e80a8e5f70b8575b2cc25aa5494e6"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609120744-G5Q9V0"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ff5652e317eba93f010773cc08b91f5459f4cddf1390d4ab4b1c3b5770ea0376"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609120744-G5Q9V0"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "f774282d4a6ef8ce7da5bc08c8e2fd9abb99303d"
    repository_identity: "sha256:4d4f122365e3b382519a58a42f4021d908a09e93d8b2a5709639f1843429d339"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "f774282d4a6ef8ce7da5bc08c8e2fd9abb99303d"
    version: 1
id_source: "generated"
---
## Summary

Fail fast on incomplete ops task intent

Make task new reject or materialize incomplete controlled ops intent before lifecycle approval, and expose structured intent fields in task brief so downstream host-operation guards are not the first failure point.

## Scope

- In scope: Make task new reject or materialize incomplete controlled ops intent before lifecycle approval, and expose structured intent fields in task brief so downstream host-operation guards are not the first failure point.
- Out of scope: unrelated refactors not required for "Fail fast on incomplete ops task intent".

## Plan

Implement early controlled-ops intent validation and expose the structured intent in task brief.

## Verify Steps

1. Run `pnpm --filter agentplane test -- run-cli.core.tasks.create.test.ts`. Expected: complete controlled ops intent is persisted and incomplete ops intent fails before task creation.
2. Run `pnpm --filter agentplane test -- run-cli.core.route-decision.test.ts`. Expected: task brief exposes task_kind, mutation_scope, risk_flags, blueprint_request, and resolved blueprint_id.
3. Run `pnpm --filter agentplane typecheck`. Expected: type checking passes.
4. Inspect `git diff --check` and the final diff. Expected: only task-scoped source and test changes exist.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
