---
id: "202609071541-47TFVD"
title: "Propagate approved CI scope to external implementation commit guards"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bunx --no-install vitest run packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-07T15:43:03.727Z"
  updated_by: "HOST:local:USER"
  note: "host_user_decision=sha256:ef146c577485a6b22d161a24a52252ce05f3ec35aca5c11cc4a798c82bc49ce9"
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
    - "effect_security_boundary"
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
      - "security_boundary"
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
    writable_roots:
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Repair only CI permission propagation and its regression tests. Preserve all unrelated work."
    repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_security_boundary"
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
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:dd78233120b87709ee7d3f7371e86d4b901a4d1e47aa007a8da14b540850e661"
      escalation_reasons:
        - "effect_security_boundary"
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
      - "repository_effect:security_boundary"
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
    at: "2026-09-07T15:46:17.888Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-09-07T15:46:17.888Z"
doc_updated_by: "CODER"
description: "User approved this bounded recovery on 2026-09-07: repair the allowCI false defect blocking task 202609071444-7MNJXE and continue that task. Change external-agent-implementation-authority.ts and extend external-agent-implementation-recovery.test.ts. Permit CI commit guard access only after current WorkOrder scope validation and when the approved task execution contract allows the ci effect. Preserve rejection of unapproved protected paths. No external writes. This separate recovery task is needed because the original task is trapped in worktree resolution after commit rejection."
sections:
  Summary: |-
    Propagate approved CI scope to external implementation commit guards

    User approved this bounded recovery on 2026-09-07: repair the allowCI false defect blocking task 202609071444-7MNJXE and continue that task. Change external-agent-implementation-authority.ts and extend external-agent-implementation-recovery.test.ts. Permit CI commit guard access only after current WorkOrder scope validation and when the approved task execution contract allows the ci effect. Preserve rejection of unapproved protected paths. No external writes. This separate recovery task is needed because the original task is trapped in worktree resolution after commit rejection.
  Scope: |-
    - In scope: User approved this bounded recovery on 2026-09-07: repair the allowCI false defect blocking task 202609071444-7MNJXE and continue that task. Change external-agent-implementation-authority.ts and extend external-agent-implementation-recovery.test.ts. Permit CI commit guard access only after current WorkOrder scope validation and when the approved task execution contract allows the ci effect. Preserve rejection of unapproved protected paths. No external writes. This separate recovery task is needed because the original task is trapped in worktree resolution after commit rejection.
    - Out of scope: unrelated refactors not required for "Propagate approved CI scope to external implementation commit guards".
  Plan: "Prepare the exact two-file CI permission repair approved by the user. Validate positive and negative authorization behavior."
  Verify Steps: "Run bunx --no-install vitest run packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts. Expect approved CI scope to pass and unapproved CI scope to fail. Run git diff --check. Review that other protected path permissions remain denied."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:local:USER"
    approval_evidence_digest: "sha256:ef146c577485a6b22d161a24a52252ce05f3ec35aca5c11cc4a798c82bc49ce9"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:b49c73542b465edfd3cb72709d563fafe83e03f8b95d9a8c238c29d3d5b93b8b"
    digest: "sha256:114c10796438b054c834ad924ee68f35984cbda87491330bd5a293a751b2480c"
    grant_id: "8cb72146-9207-41c0-8527-d50a60341034"
    issued_at: "2026-09-07T15:43:03.727Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:403ebbcbf401ece1b648eae5788c7f46a311b8eb2ff4c685f1f6dc27dbe80eb0"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:53cd419f76eeae5209638c0cd0a685b24aea25d380c4d56eca7d81b2e1d82415"
    status: "active"
    task_id: "202609071541-47TFVD"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-07T15:43:03.727Z"
        approved_by: "HOST:local:USER"
        approved_digest: "sha256:5af17c4fe2ba8c0ae67a128bf88ff04bef68fa10d54fd06e764ddfd38bbcdb48"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-07T15:42:10.884Z"
      digest: "sha256:5af17c4fe2ba8c0ae67a128bf88ff04bef68fa10d54fd06e764ddfd38bbcdb48"
      proposal:
        assumptions:
          - "The task is the bounded repair already approved by the user. Do not publish or merge."
        planning_baseline:
          captured_at: "2026-09-07T15:41:36.076Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:8ac28c165a831686ac360e675eb5b6fd5c7c6129fed61773a6ce3820c65d29e2"
          dirty_paths:
            - ".agentplane/tasks/202609071412-9Q9KQN/README.md"
            - ".agentplane/tasks/202609071432-QCBB76/README.md"
            - ".agentplane/tasks/202609071501-VN1FN4/README.md"
            - ".agentplane/tasks/202609071541-47TFVD/README.md"
            - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
            - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
          git:
            kind: "commit"
            ref: null
            sha: "92efd467a7b045e7e784597168ac21bd41a975a1"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609071541-47TFVD"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx --no-install vitest run packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
              id: "regression"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "regression"
              description: "An approved CI implementation can pass commit protection after current WorkOrder path validation. An unapproved CI effect or path remains rejected. Other protected families remain denied."
              id: "approved-ci-only"
              required: true
          evidence_fingerprint: "sha256:1c343fcc1eb5feb497f1e15f0b448c66f54816219d1603dfc89f87a717aa7451"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "regression"
                  description: "An approved CI implementation can pass commit protection after current WorkOrder path validation. An unapproved CI effect or path remains rejected. Other protected families remain denied."
                  id: "approved-ci-only"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 100000
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                symbol_hints:
                  - "applyExternalImplementationResult"
                  - "assertExternalImplementationReturnState"
              depends_on: []
              expected_outputs:
                - "ci-permission-regression-evidence"
              id: "ci-permission"
              objective: "Derive the implementation commit CI permission from the approved execution contract and validated WorkOrder paths. Keep other protected path permissions false. Extend the existing recovery test suite to cover allowed CI and denied out-of-scope CI. Run the declared regression command."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx --no-install vitest run packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                    id: "regression"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "regression"
                    description: "An approved CI implementation can pass commit protection after current WorkOrder path validation. An unapproved CI effect or path remains rejected. Other protected families remain denied."
                    id: "approved-ci-only"
                    required: true
                evidence_fingerprint: "sha256:1c343fcc1eb5feb497f1e15f0b448c66f54816219d1603dfc89f87a717aa7451"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609071541-47TFVD"
    event_cursor: 3
    final_validation: null
    id: "202609071541-47TFVD"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bunx --no-install vitest run packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
          id: "legacy-1"
          required: true
      captured_at: "2026-09-07T15:41:25.338Z"
      constraints: []
      request: |-
        Propagate approved CI scope to external implementation commit guards

        User approved this bounded recovery on 2026-09-07: repair the allowCI false defect blocking task 202609071444-7MNJXE and continue that task. Change external-agent-implementation-authority.ts and extend external-agent-implementation-recovery.test.ts. Permit CI commit guard access only after current WorkOrder scope validation and when the approved task execution contract allows the ci effect. Preserve rejection of unapproved protected paths. No external writes. This separate recovery task is needed because the original task is trapped in worktree resolution after commit rejection.
      task_id: "202609071541-47TFVD"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 5
    schema_version: 1
    updated_at: "2026-09-07T15:46:17.888Z"
    work_items:
      ci-permission:
        attempt: 0
        claim_id: null
        id: "ci-permission"
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
      compatibility:sha256:91325a790beb8ac4da1c7c921b1dbb5de9595063dfe8e237c80f2e76c1a3e922:
        aggregate_digest: "sha256:1ee0ed7d1bfcf49249663bad5c3965753efaed9ede6c97fe8fa69406e91fd8b4"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T15:42:47.077Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_a2ee5cdbe4715087bc8f2b65"
          mutation_id: "compatibility:sha256:91325a790beb8ac4da1c7c921b1dbb5de9595063dfe8e237c80f2e76c1a3e922"
          plan_digest: "sha256:5af17c4fe2ba8c0ae67a128bf88ff04bef68fa10d54fd06e764ddfd38bbcdb48"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071541-47TFVD"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:91325a790beb8ac4da1c7c921b1dbb5de9595063dfe8e237c80f2e76c1a3e922"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609071541-47TFVD"
      compatibility:sha256:a499d54dd48fe4ff53cdca71a75ea0ab508463de7f7c8046617fa53fe5b6cc32:
        aggregate_digest: "sha256:9f8c8ed725513fa98e2c5f88aabd9f23c6e83304ee49c3216e4cfbd69b7ee68f"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T15:46:17.888Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_937c27a5d698e3491531f44c"
          mutation_id: "compatibility:sha256:a499d54dd48fe4ff53cdca71a75ea0ab508463de7f7c8046617fa53fe5b6cc32"
          plan_digest: "sha256:5af17c4fe2ba8c0ae67a128bf88ff04bef68fa10d54fd06e764ddfd38bbcdb48"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071541-47TFVD"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a499d54dd48fe4ff53cdca71a75ea0ab508463de7f7c8046617fa53fe5b6cc32"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609071541-47TFVD"
      compatibility:sha256:e91392eeabee066b3c3a63732827cc2caf85d5b85f9cef93d5a43d1b879c83de:
        aggregate_digest: "sha256:4d9ef45a5f0a9454fe704cc6d32382e29703b5772649d34be20f7b5b3c89d399"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T15:42:47.078Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_fead217bce4b48afd876421a"
          mutation_id: "compatibility:sha256:e91392eeabee066b3c3a63732827cc2caf85d5b85f9cef93d5a43d1b879c83de"
          plan_digest: "sha256:5af17c4fe2ba8c0ae67a128bf88ff04bef68fa10d54fd06e764ddfd38bbcdb48"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071541-47TFVD"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e91392eeabee066b3c3a63732827cc2caf85d5b85f9cef93d5a43d1b879c83de"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609071541-47TFVD"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "92efd467a7b045e7e784597168ac21bd41a975a1"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "92efd467a7b045e7e784597168ac21bd41a975a1"
    version: 1
id_source: "generated"
---
## Summary

Propagate approved CI scope to external implementation commit guards

User approved this bounded recovery on 2026-09-07: repair the allowCI false defect blocking task 202609071444-7MNJXE and continue that task. Change external-agent-implementation-authority.ts and extend external-agent-implementation-recovery.test.ts. Permit CI commit guard access only after current WorkOrder scope validation and when the approved task execution contract allows the ci effect. Preserve rejection of unapproved protected paths. No external writes. This separate recovery task is needed because the original task is trapped in worktree resolution after commit rejection.

## Scope

- In scope: User approved this bounded recovery on 2026-09-07: repair the allowCI false defect blocking task 202609071444-7MNJXE and continue that task. Change external-agent-implementation-authority.ts and extend external-agent-implementation-recovery.test.ts. Permit CI commit guard access only after current WorkOrder scope validation and when the approved task execution contract allows the ci effect. Preserve rejection of unapproved protected paths. No external writes. This separate recovery task is needed because the original task is trapped in worktree resolution after commit rejection.
- Out of scope: unrelated refactors not required for "Propagate approved CI scope to external implementation commit guards".

## Plan

Prepare the exact two-file CI permission repair approved by the user. Validate positive and negative authorization behavior.

## Verify Steps

Run bunx --no-install vitest run packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts. Expect approved CI scope to pass and unapproved CI scope to fail. Run git diff --check. Review that other protected path permissions remain denied.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
