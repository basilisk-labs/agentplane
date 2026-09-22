---
id: "202609220826-DS03Q6"
title: "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "canonical-task"
  - "lifecycle"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bunx vitest run packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-22T08:27:48.060Z"
  updated_by: "USER"
  note: null
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
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-22T08:26:25.460Z"
doc_updated_by: "CODER"
description: "Fix the 0.7.11 lifecycle deadlock where next-action routes task.pre_merge_close for a canonical COMPLETED task but finish rejects the legacy mutation. Preserve quality, verification, branch identity, and fail-closed checks; add focused regression coverage."
sections:
  Summary: |-
    Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation

    Fix the 0.7.11 lifecycle deadlock where next-action routes task.pre_merge_close for a canonical COMPLETED task but finish rejects the legacy mutation. Preserve quality, verification, branch identity, and fail-closed checks; add focused regression coverage.
  Scope: |-
    - In scope: Fix the 0.7.11 lifecycle deadlock where next-action routes task.pre_merge_close for a canonical COMPLETED task but finish rejects the legacy mutation. Preserve quality, verification, branch identity, and fail-closed checks; add focused regression coverage.
    - Out of scope: unrelated refactors not required for "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation".
  Plan: "1. Execute approved WorkItem fix-canonical-pre-merge-closure."
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  task_execution_context:
    base_ref: "main"
    base_sha: "a2104636fe2522ebdcd79ce32e5ba59f23241a6f"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:2c849345f77df7a2932e5d743cf9b0854919ec9ffeb41c865ad75247356e60b4"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f3bea6a413ff289484d07ba2a4e2402c78299ee8d1981d0b0801caeab77aa3e5"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:0d28b53319fb37ac8b9591b8423a182e627ed28a13d402e680e502c019a22687"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "canonical-task-projection"
              - "pre-merge-closure"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609220826-DS03Q6"
            validation_requirements:
              - "bun run lint"
              - "bun run typecheck"
              - "bunx vitest run packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:0d28b53319fb37ac8b9591b8423a182e627ed28a13d402e680e502c019a22687"
        digest: "sha256:f3bea6a413ff289484d07ba2a4e2402c78299ee8d1981d0b0801caeab77aa3e5"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:0c175d9e7506059cfdad8bab3834b5713a04f809a3af167fa55247767b2bbdcd"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "canonical-task-projection"
                - "pre-merge-closure"
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "canonical-pre-merge-closure-source"
              - "canonical-pre-merge-closure-tests"
            id: "fix-canonical-pre-merge-closure"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609220826-DS03Q6"
      intent_digest: "sha256:16e7516e59284e421b6e8ae3c72c59be7347cede372a785c75da93252271b2fe"
      migration_receipts: []
      mutation_receipts:
        capture:202609220826-DS03Q6:
          after_revision: 1
          aggregate_digest: "sha256:a3dd2978a8cf3476ea1b58af0ecde288f6b7a241e50afd75e182621bb1662cf0"
          before_revision: 0
          command_digest: "sha256:bdbd09bd8a257d86935036af45ce4ded60b59752c058604dadda736f7a8873c2"
          effect_ids: []
          event_digests:
            - "sha256:b9fc69dc490273cddd28e8e25edfd87b8902b5b6e8c46d996545f3c62b89f89d"
          mutation_id: "capture:202609220826-DS03Q6"
        kernel_work_item_claim_required:sha256:01cdb39e6f3f95ba38b287b1261009539bf07c8282502c6b15598aa5a85adae9:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 5
          aggregate_digest: "sha256:3fd1eb3c5caf8d572bcf9a710391b42258c6cacc78366035f9516efd5dd563c2"
          before_revision: 4
          command_digest: "sha256:ecc9961b33da2c7ea6d192d58c4d9f362145fa334f7f8e771315208551f30327"
          effect_ids: []
          event_digests:
            - "sha256:0e6b7b3615ecdf0be5b455b9fdcc4a72acf219da92adb383fac2cae909100278"
          mutation_id: "kernel_work_item_claim_required:sha256:01cdb39e6f3f95ba38b287b1261009539bf07c8282502c6b15598aa5a85adae9:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_execution_required:sha256:06bbc46eee1cf31bb9fc59018ed719cebf159237e9124367c0073ac3d8f2ef41:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 6
          aggregate_digest: "sha256:98b4f62eff71f69d185378d84913c87afd1fedbd221967c0074e258ec4370444"
          before_revision: 5
          command_digest: "sha256:d7d176ce8a946fdefc802a98a8cb3ff3b438608bb3563df57a6f29f9e460223d"
          effect_ids: []
          event_digests:
            - "sha256:1509faace711969810a38fddcbcd11af41d25c06575ca27696538fdf8b14634e"
          mutation_id: "kernel_work_item_execution_required:sha256:06bbc46eee1cf31bb9fc59018ed719cebf159237e9124367c0073ac3d8f2ef41:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_materialization_required:sha256:c3362d07adf6b94b02820d90afe6ffb7379b14f6f738afad2d769bde69fafe8c:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 4
          aggregate_digest: "sha256:4ee0f6c1a8998d3e5daa00b4d4559d0189856edec43990185c04d91859b123f6"
          before_revision: 3
          command_digest: "sha256:91e7856b85e92c1c7adf112a63ecc70a619aedaac6901ead7132e6b788dcee28"
          effect_ids: []
          event_digests:
            - "sha256:c91204381943dbde5afe49353ddc96c360bfd815f83acebed9b86194c19a7ebd"
          mutation_id: "kernel_work_item_materialization_required:sha256:c3362d07adf6b94b02820d90afe6ffb7379b14f6f738afad2d769bde69fafe8c:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        result:sha256:fd493ed8af957f3ad6226fc9274ad728660f2c1f2614434dc23c5bf60e81b156:
          after_revision: 2
          aggregate_digest: "sha256:123921cf1a0ab9553afd9401f37f0259dbd20190f26aba748cd75c00eadf7d61"
          before_revision: 1
          command_digest: "sha256:c90a9f49e79411dcfeba2264718035b262d9e69d1609bf7e5370146ae5371e13"
          effect_ids: []
          event_digests:
            - "sha256:3cc7e663fc34193114ea2195772cea92a63a135148dfc6270a887ef49cdaeb77"
          mutation_id: "result:sha256:fd493ed8af957f3ad6226fc9274ad728660f2c1f2614434dc23c5bf60e81b156"
        sha256:5c051cb7d333aea39c9749b0d5b832461abbb99fa0641c7b5ed8d373a7ac6ae0:
          after_revision: 3
          aggregate_digest: "sha256:7db3fd867a7df59ac9cec980c01386bf3fe843ad1e9458b2a10afb4171564007"
          before_revision: 2
          command_digest: "sha256:9ce3be6a1fbd00abcf31c62da119b965809d146a635c1b73b3626408f5857a9d"
          effect_ids: []
          event_digests:
            - "sha256:e798d66cec527f240cfbebb68933dfc62e5e2743611975816f9f4c8c24a26a9b"
          mutation_id: "sha256:5c051cb7d333aea39c9749b0d5b832461abbb99fa0641c7b5ed8d373a7ac6ae0"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        fix-canonical-pre-merge-closure:
          attempt: 1
          claim_id: "sha256:390ca8e4c0d871784e1b974e8c35e30a5d3fa53a111da4af147743545be2ce40"
          definition:
            contract_digest: "sha256:0c175d9e7506059cfdad8bab3834b5713a04f809a3af167fa55247767b2bbdcd"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "canonical-task-projection"
                - "pre-merge-closure"
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "canonical-pre-merge-closure-source"
              - "canonical-pre-merge-closure-tests"
            id: "fix-canonical-pre-merge-closure"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:c46393b49dd6b9fc1ba5e52cb5c6d66a7b6d0ac1e7c0f281b5a11deae7e20bfd"
    documents:
      contracts:
        sha256:0c175d9e7506059cfdad8bab3834b5713a04f809a3af167fa55247767b2bbdcd:
          acceptance_criteria:
            - "A canonical COMPLETED task can record the pre-merge closure marker and required task artifacts through the routed finish operation."
            - "The operation preserves current verification, quality review, commit identity, branch checks, and canonical aggregate state."
            - "Legacy tasks retain their current finish behavior."
            - "The implementation remains fail-closed for stale review, invalid branch identity, missing authority, and semantic source drift."
            - "Provider publication, hosted checks, merge, hosted close, and cleanup remain outside the semantic WorkItem."
          objective: "Allow branch_pr pre-merge closure for an already completed canonical Task without attempting a forbidden legacy Task mutation."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
            - "bun run typecheck"
            - "bun run lint"
      intent:
        context: "Fix the 0.7.11 lifecycle deadlock where next-action routes task.pre_merge_close for a canonical COMPLETED task but finish rejects the legacy mutation. Preserve quality, verification, branch identity, and fail-closed checks; add focused regression coverage."
        objective: "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation"
    events:
      -
        command_digest: "sha256:bdbd09bd8a257d86935036af45ce4ded60b59752c058604dadda736f7a8873c2"
        id: "capture:202609220826-DS03Q6:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609220826-DS03Q6"
        occurred_at: "2026-09-22T08:26:25.401Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609220826-DS03Q6"
        task_revision: 1
      -
        command_digest: "sha256:c90a9f49e79411dcfeba2264718035b262d9e69d1609bf7e5370146ae5371e13"
        id: "result:sha256:fd493ed8af957f3ad6226fc9274ad728660f2c1f2614434dc23c5bf60e81b156:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:fd493ed8af957f3ad6226fc9274ad728660f2c1f2614434dc23c5bf60e81b156"
        occurred_at: "2026-09-22T08:27:36.078Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609220826-DS03Q6"
        task_revision: 2
      -
        command_digest: "sha256:9ce3be6a1fbd00abcf31c62da119b965809d146a635c1b73b3626408f5857a9d"
        id: "sha256:5c051cb7d333aea39c9749b0d5b832461abbb99fa0641c7b5ed8d373a7ac6ae0:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:5c051cb7d333aea39c9749b0d5b832461abbb99fa0641c7b5ed8d373a7ac6ae0"
        occurred_at: "2026-09-22T08:27:47.149Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609220826-DS03Q6"
        task_revision: 3
      -
        command_digest: "sha256:91e7856b85e92c1c7adf112a63ecc70a619aedaac6901ead7132e6b788dcee28"
        id: "kernel_work_item_materialization_required:sha256:c3362d07adf6b94b02820d90afe6ffb7379b14f6f738afad2d769bde69fafe8c:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:c3362d07adf6b94b02820d90afe6ffb7379b14f6f738afad2d769bde69fafe8c:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T08:27:56.203Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609220826-DS03Q6"
        task_revision: 4
      -
        command_digest: "sha256:ecc9961b33da2c7ea6d192d58c4d9f362145fa334f7f8e771315208551f30327"
        id: "kernel_work_item_claim_required:sha256:01cdb39e6f3f95ba38b287b1261009539bf07c8282502c6b15598aa5a85adae9:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:01cdb39e6f3f95ba38b287b1261009539bf07c8282502c6b15598aa5a85adae9:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T08:27:59.902Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609220826-DS03Q6"
        task_revision: 5
      -
        command_digest: "sha256:d7d176ce8a946fdefc802a98a8cb3ff3b438608bb3563df57a6f29f9e460223d"
        id: "kernel_work_item_execution_required:sha256:06bbc46eee1cf31bb9fc59018ed719cebf159237e9124367c0073ac3d8f2ef41:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:06bbc46eee1cf31bb9fc59018ed719cebf159237e9124367c0073ac3d8f2ef41:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T10:09:17.473Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609220826-DS03Q6"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation

Fix the 0.7.11 lifecycle deadlock where next-action routes task.pre_merge_close for a canonical COMPLETED task but finish rejects the legacy mutation. Preserve quality, verification, branch identity, and fail-closed checks; add focused regression coverage.

## Scope

- In scope: Fix the 0.7.11 lifecycle deadlock where next-action routes task.pre_merge_close for a canonical COMPLETED task but finish rejects the legacy mutation. Preserve quality, verification, branch identity, and fail-closed checks; add focused regression coverage.
- Out of scope: unrelated refactors not required for "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation".

## Plan

1. Execute approved WorkItem fix-canonical-pre-merge-closure.

## Verify Steps

PLANNER fallback scaffold for "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
